---
title: What is the default encryption cipher for VPN connections? - IVPN Help
h1: What is the default encryption cipher for VPN connections?
url: /knowledgebase/general/what-is-the-default-encryption-cipher-for-vpn-connections/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 510
---
# What is the default encryption cipher for VPN connections?

If you use OpenVPN 2.4 or later and do not specify a cipher in your OpenVPN configuration file, then `AES-256-GCM` is used by default. If use a version of OpenVPN older than v2.4 then `AES-256-CBC` will be used as the default.  For OpenVPN 2.5 and up, `ChaCha20-Poly1305` is also available.

If you use WireGuard, `ChaCha20` is in place to encapsulate packets.
