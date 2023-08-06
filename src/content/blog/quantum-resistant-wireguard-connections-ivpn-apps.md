---
title: Introducing quantum resistant WireGuard connections in IVPN apps
url: /blog/quantum-resistant-wireguard-connections-ivpn-apps/
highlighted: false
draft: false
authors:
  - Alexandr Stelnykovych
  - Viktor Vecsei
categories:
  - Releases
tags:
  - Apps
  - WireGuard
  - Security
date: 2023-08-07T08:35:00.000Z
thumbnailImage: /images-static/uploads/quantum-resistant.png

---
Quantum computing poses a threat to VPN security due to its potential to break traditional encryption algorithms much faster.

In an attempt to mitigate this risk and provide quantum resistance, a PresharedKey (PSK) is now used in addition to existing encryption. A PresharedKey (PSK) is a secret key that is shared between the VPN client and server before establishing a connection. 

This adds an extra layer of symmetric encryption to the connection, making it more difficult for potential quantum attackers to break the encryption. Using a Key Encapsulation Mechanism (KEM) with a PresharedKey (PSK) can increase the quantum resistance of a WireGuard connection, if the KEM is based on a post-quantum cryptographic algorithm. 

Note, this approach doesn't make the connection entirely quantum-proof as it still relies on classical cryptographic primitives.

Starting with the latest version of all IVPN apps, quantum-resistant WireGuard connections are initiated by default. No manual action is required to enable this feature. Quantum resistance does not affect the latency or the speed of the connection.

For more details read our explainer about [quantum resistant VPN connections][1], or consult our [FAQ article][2] that addresses common questions. 

Quantum resistant connections are available only with IVPN apps at this time, we will assess offering similar functionality for manual connections using a router or the native WireGuard client.

 [1]: knowledgebase/general/quantum-resistant-vpn-connections/
 [2]: knowledgebase/general/quantum-resistance-faq/
 
