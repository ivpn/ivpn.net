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

IVPN apps generate quantum-resistant WireGuard keys automatically. If you are configuring WireGuard manually on a router, with a native WireGuard client, or from a script,  you can generate the full set of keys yourself using the same open-source tools and derive the `PresharedKey` (PSK) entirely offline.

This guide uses [liboqs](https://github.com/open-quantum-safe/liboqs) via its Python bindings. Every step runs locally; no network connection is required.

## Background

IVPN uses a **hybrid** quantum-resistance scheme: the standard WireGuard key exchange is supplemented by a `PresharedKey` derived from two post-quantum Key Encapsulation Mechanisms (KEMs):

| Slot | Algorithm | NIST Level | Public-key size |
|------|-----------|-----------|----------------|
| KEM 1 | **Kyber-1024** | 5 | 1 568 bytes |
| KEM 2 | **Classic-McEliece-348864** | 1 | 261 120 bytes |

The PSK derivation works as follows:

1. A KEM keypair is generated for each algorithm; the private keys stay local.
2. KEM encapsulation is run against each public key, producing one ciphertext per algorithm.
3. KEM decapsulation is run against each ciphertext with the matching private key, recovering the same shared secrets as encapsulation.
4. The PSK is derived as `SHA-256(ciphertext_1 ‖ ciphertext_2)`.

Both the encapsulation and decapsulation steps run locally in the script below.

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

## Step 2 — Generate the KEM keypairs and derive the PSK

Save the following script as `gen_psk.py` and run it once per WireGuard key rotation. The script generates both KEM keypairs, runs the full encapsulation/decapsulation round, and derives the PSK — all locally.

```python
#!/usr/bin/env python3
import base64, hashlib, oqs


def kem_exchange(alg_name):
    """Generate a keypair, encapsulate, decapsulate, return (pub_b64, ciphertext, secret_key)."""
    with oqs.KeyEncapsulation(alg_name) as kem:
        pub_bytes = kem.generate_keypair()
        sec_bytes = kem.export_secret_key()

    # Encapsulation (server role): produces ciphertext + shared secret
    with oqs.KeyEncapsulation(alg_name) as encap:
        ciphertext, ss_server = encap.encap_secret(pub_bytes)

    # Decapsulation (client role): recovers the same shared secret from the ciphertext
    with oqs.KeyEncapsulation(alg_name, sec_bytes) as decap:
        ss_client = decap.decap_secret(ciphertext)

    assert ss_server == ss_client, f"Shared secrets do not match for {alg_name}"

    pub_b64 = base64.b64encode(bytes(pub_bytes)).decode()

    return pub_b64, bytes(ciphertext), bytes(sec_bytes)


# --- Kyber-1024 ---
pub1_b64, ct1, sk1 = kem_exchange("Kyber1024")

# --- Classic-McEliece-348864 ---
pub2_b64, ct2, sk2 = kem_exchange("Classic-McEliece-348864")

# --- Derive PSK = SHA-256(ciphertext_1 || ciphertext_2) ---
psk_b64 = base64.b64encode(hashlib.sha256(ct1 + ct2).digest()).decode()

# --- Persist all keys ---
with open("kyber1024_public.b64",      "w") as f: f.write(pub1_b64)
with open("mceliece348864_public.b64", "w") as f: f.write(pub2_b64)
with open("kyber1024_secret.b64",      "w") as f: f.write(base64.b64encode(sk1).decode())
with open("mceliece348864_secret.b64", "w") as f: f.write(base64.b64encode(sk2).decode())
with open("preshared.key",             "w") as f: f.write(psk_b64)

print("Kyber-1024 public key saved to:        kyber1024_public.b64")
print("Classic-McEliece public key saved to:  mceliece348864_public.b64")
print()
print("PresharedKey:", psk_b64)
```

Run it:

```
python gen_psk.py
```

Protect the private key files and the PSK:

```bash
chmod 600 kyber1024_secret.b64 mceliece348864_secret.b64 preshared.key
```

<div class="notice notice--warning" markdown="1">
The private key files (`*_secret.b64`) are required to re-run decapsulation if you ever need to reproduce the PSK from existing ciphertexts. Treat them with the same care as your WireGuard private key.
</div>

---

## Step 3 — Supply the public keys to the IVPN config generator

Open the IVPN [WireGuard Config Generator](/account/#wireguard-config) and log in. In the **Quantum Resistance** section, paste:

- The content of `kyber1024_public.b64` into **Quantum public key 1**.
- The content of `mceliece348864_public.b64` into **Quantum public key 2**.

<div class="notice notice--warning" markdown="1">
Classic McEliece public keys are large (~348 000 base64 characters). Copy the **entire** contents of `mceliece348864_public.b64` without truncation. The generator will reject a key with an incorrect length.
</div>

Proceed through the generator to download the configuration file. The server and port values for the `Endpoint` field are shown in the downloaded `.conf`.

---

## Step 4 — Build the WireGuard config

Insert the locally derived PSK into the `[Peer]` section:

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

When you generate a new WireGuard keypair, run `gen_psk.py` again to produce fresh KEM keypairs and a new PSK, then register the new public keys in the config generator and update your config file.
