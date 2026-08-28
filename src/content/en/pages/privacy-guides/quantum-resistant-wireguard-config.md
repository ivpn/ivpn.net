---
title: Generating quantum-resistant WireGuard keys manually
url: /privacy-guides/quantum-resistant-wireguard-config/
section: Misc
weight: 10
date: 2026-08-06T00:00:00+00:00
layout: guides-details
articles: [
  {
    title: "Quantum-Resistant VPN connections",
    url: "/knowledgebase/general/quantum-resistant-vpn-connections/"
  },
  {
    title: "Quantum resistance FAQ",
    url: "/knowledgebase/general/quantum-resistance-faq/"
  },
]
---

IVPN apps generate quantum-resistant WireGuard keys automatically. If you are configuring WireGuard manually — on a router, with a native WireGuard client, or from a script — you can generate the KEM keypairs yourself using open-source tools and register them with IVPN to obtain the `PresharedKey` (PSK).

This guide uses [liboqs](https://github.com/open-quantum-safe/liboqs) via its Python bindings.

## Background

IVPN uses a **hybrid** quantum-resistance scheme: the standard WireGuard key exchange is supplemented by a `PresharedKey` derived from two post-quantum Key Encapsulation Mechanisms (KEMs):

| Slot | Algorithm | NIST Level | Public-key size |
|------|-----------|-----------|----------------|
| KEM 1 | **Kyber-1024** | 5 | 1 568 bytes |
| KEM 2 | **Classic-McEliece-348864** | 1 | 261 120 bytes |

The PSK derivation is a **two-party** process and requires both sides:

1. The client generates a KEM keypair for each algorithm and keeps the private keys secret.
2. The client sends both public keys to the IVPN server.
3. The server runs KEM encapsulation against each public key, producing one **ciphertext** and one **shared secret** per algorithm.
4. The server derives `PSK = SHA-256(shared_secret_1 ‖ shared_secret_2)`, stores it alongside the WireGuard public key, and returns it to the client.

Because step 3 uses cryptographically random nonces, the PSK **cannot** be derived locally before the server has performed its encapsulation — each run produces different ciphertexts and therefore different shared secrets.

---

## Prerequisites

**Python 3.8+** and the official liboqs Python bindings:

```
pip install liboqs-python
```

If `pip install liboqs-python` fails on your platform, follow the [manual build instructions](https://github.com/open-quantum-safe/liboqs-python#installation).

Verify the installation and confirm both algorithms are present:

```python
import oqs
assert "Kyber1024" in oqs.get_enabled_kem_mechanisms()
assert "Classic-McEliece-348864" in oqs.get_enabled_kem_mechanisms()
print("liboqs ready")
```

---

## Step 1 — Generate the WireGuard keypair

If you do not already have a WireGuard keypair, generate one with the standard `wg` tool:

```bash
wg genkey | tee wg_private.key | wg pubkey > wg_public.key
chmod 600 wg_private.key
```

---

## Step 2 — Generate the KEM keypairs

Save the following script as `gen_kem_keys.py` and run it once per WireGuard key rotation.

```python
#!/usr/bin/env python3
import base64, oqs


def generate_keypair(alg_name):
    with oqs.KeyEncapsulation(alg_name) as kem:
        pub_bytes = kem.generate_keypair()
        sec_bytes = kem.export_secret_key()
    return base64.b64encode(bytes(pub_bytes)).decode(), base64.b64encode(bytes(sec_bytes)).decode()


pub1_b64, sk1_b64 = generate_keypair("Kyber1024")
pub2_b64, sk2_b64 = generate_keypair("Classic-McEliece-348864")

with open("kyber1024_public.b64",      "w") as f: f.write(pub1_b64)
with open("mceliece348864_public.b64", "w") as f: f.write(pub2_b64)
with open("kyber1024_secret.b64",      "w") as f: f.write(sk1_b64)
with open("mceliece348864_secret.b64", "w") as f: f.write(sk2_b64)

print("Kyber-1024 public key saved:          kyber1024_public.b64")
print("Classic-McEliece public key saved:    mceliece348864_public.b64")
```

Run it:

```
python gen_kem_keys.py
```

Protect the private key files:

```bash
chmod 600 kyber1024_secret.b64 mceliece348864_secret.b64
```

<div class="notice notice--warning" markdown="1">
Keep the private key files (`*_secret.b64`). They are needed in the optional verification step and for any future key re-registration.
</div>

---

## Step 3 — Register with the IVPN config generator and save the cipher keys

Open the IVPN [WireGuard Config Generator](/account/#wireguard-config) and log in. In the **Quantum Resistance** section, paste:

- The content of `kyber1024_public.b64` into **Quantum public key 1**.
- The content of `mceliece348864_public.b64` into **Quantum public key 2**.

<div class="notice notice--warning" markdown="1">
Classic McEliece public keys are large (~348 000 base64 characters). Copy the **entire** contents of `mceliece348864_public.b64` without truncation. The generator will reject a key with an incorrect length.
</div>

After submitting, the config generator displays two **cipher keys** returned by the server:

- **Kyber-1024 Cipher (KEM 1)** — a 1 568-byte ciphertext, base64-encoded (2 092 characters)
- **Classic-McEliece-348864 Cipher (KEM 2)** — a 96-byte ciphertext, base64-encoded (128 characters)

Save both cipher keys; you will need them in the next step to derive your `PresharedKey`.

```bash
# Paste the values shown in the config generator
echo "<kyber_cipher>"    > kem_cipher1.b64
echo "<mceliece_cipher>" > kem_cipher2.b64
```

---

## Step 4 — Derive the PresharedKey from the cipher keys {#step-4}

The server ran KEM encapsulation against your public keys and produced the cipher keys above. Run the following script to decapsulate them with your private keys and derive the `PresharedKey`.

Save it as `derive_psk.py`:

```python
#!/usr/bin/env python3
import base64, hashlib, oqs


def decapsulate(alg_name, cipher_b64, secret_key_b64):
    """Decapsulate a server-provided cipher to recover the shared secret."""
    cipher = base64.b64decode(cipher_b64.strip())
    secret_key = base64.b64decode(secret_key_b64.strip())
    with oqs.KeyEncapsulation(alg_name, secret_key) as kem:
        shared_secret = kem.decap_secret(cipher)
    return bytes(shared_secret)


# Load your private keys (generated in Step 2)
with open("kyber1024_secret.b64")      as f: sk1_b64 = f.read().strip()
with open("mceliece348864_secret.b64") as f: sk2_b64 = f.read().strip()

# Load cipher keys from the config generator (saved in Step 3)
with open("kem_cipher1.b64") as f: cipher1_b64 = f.read().strip()
with open("kem_cipher2.b64") as f: cipher2_b64 = f.read().strip()

# Decapsulate each cipher to recover its shared secret
ss1 = decapsulate("Kyber1024",              cipher1_b64, sk1_b64)
ss2 = decapsulate("Classic-McEliece-348864", cipher2_b64, sk2_b64)

# Derive PSK = SHA-256(shared_secret_1 || shared_secret_2)
psk_b64 = base64.b64encode(hashlib.sha256(ss1 + ss2).digest()).decode()

with open("preshared.key", "w") as f: f.write(psk_b64)
print("PresharedKey:", psk_b64)
```

Run it:

```
python derive_psk.py
```

<div class="notice notice--warning" markdown="1">
The `PresharedKey` is derived from the cipher keys and your private keys together. Running the script again with different cipher keys (from a new key registration) will produce a different PSK.
</div>

---

## Step 5 — Build the WireGuard config

Insert the PSK from `preshared.key` into the `[Peer]` section of your downloaded config:

```ini
[Interface]
PrivateKey = <content of wg_private.key>
Address    = <assigned IP>/32
DNS        = 172.16.0.1

[Peer]
PublicKey    = <IVPN server WireGuard public key>
PresharedKey = <content of preshared.key>
AllowedIPs   = 0.0.0.0/0, ::/0
Endpoint     = <server>:<port>
```

---

## Key rotation

When you generate a new WireGuard keypair, run `gen_kem_keys.py` again to produce fresh KEM keypairs, re-register the new public keys in the config generator to receive fresh cipher keys, re-run `derive_psk.py` to derive the new PSK, and replace the old `.conf` file.
