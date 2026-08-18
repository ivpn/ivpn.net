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

## Step 3 — Register with the IVPN config generator and obtain the PSK

Open the IVPN [WireGuard Config Generator](/account/#wireguard-config) and log in. In the **Quantum Resistance** section, paste:

- The content of `kyber1024_public.b64` into **Quantum public key 1**.
- The content of `mceliece348864_public.b64` into **Quantum public key 2**.

<div class="notice notice--warning" markdown="1">
Classic McEliece public keys are large (~348 000 base64 characters). Copy the **entire** contents of `mceliece348864_public.b64` without truncation. The generator will reject a key with an incorrect length.
</div>

Complete the remaining configuration options and download the `.conf` file. The server registers your public keys, performs KEM encapsulation, and embeds the derived `PresharedKey` directly in the downloaded config.

---

## Step 4 — Use the downloaded config

The downloaded `.conf` already contains the correct `PresharedKey`:

```ini
[Interface]
PrivateKey = <your WireGuard private key>
Address    = <assigned IP>/32
DNS        = 172.16.0.1

[Peer]
PublicKey    = <IVPN server WireGuard public key>
PresharedKey = <server-derived PSK — already set in the downloaded file>
AllowedIPs   = 0.0.0.0/0, ::/0
Endpoint     = <server>:<port>
```

Use the file as downloaded without modifying the `PresharedKey` line.

---

## Key rotation

When you generate a new WireGuard keypair, run `gen_kem_keys.py` again to produce fresh KEM keypairs, re-register the new public keys in the config generator, and replace the old `.conf` file.
