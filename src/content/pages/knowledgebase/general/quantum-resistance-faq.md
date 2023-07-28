---
title: Quantum Resistance FAQ - IVPN Help
h1: Quantum Resistance FAQ
url: /knowledgebase/general/quantum-resistance-faq/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 10
---
# Quantum Resistance FAQ

### Do you offer any protection against quantum computing attacks?

Yes, all IVPN apps provide quantum-resistant WireGuard connections enabled by default.

### How can the VPN tunnel become resistant to quantum computer attacks?

The WireGuard configuration includes an optional parameter called "PresharedKey", which can be used to enhance the security of the VPN connection.
    
A PresharedKey (PSK) is a secret key that is shared between the VPN client and server before establishing a connection. The PSK is used to add an additional layer of symmetric encryption, making it more difficult for attackers to break the connection.
    
Using a Key Encapsulation Mechanism (KEM) with a PresharedKey (PSK) can potentially increase the quantum resistance of a WireGuard connection, provided that the KEM is based on a post-quantum cryptographic algorithm.
    
We make use of the [liboqs](https://github.com/open-quantum-safe/liboqs) library and the following KEM algorithms for exchanging keys:
    
- desktop apps: [Kyber-1024](https://pq-crystals.org/kyber/) + [Classic-McEliece-348864](https://classic.mceliece.org/)
- mobile apps: [Kyber-1024](https://pq-crystals.org/kyber/)
        
For more details read about [quantum resistant vpn connections](/knowledgebase/general/quantum-resistant-vpn-connections/).

### How often is PresharedKey rotated?

A new PresharedKey is generated together with the new WireGuard key pair. The frequency at which the keys are rotated can be adjusted from 1 to 30 days.

### Which platforms is quantum resistance available on?

Quantum resistance is available in IVPN apps for all platforms.

### Which servers are quantum-resistant?

All WireGuard servers.

### How can I verify that quantum resistance is enabled?

On desktop apps, navigate to `Settings` - `Connection` - `WireGuard key information` area:

![](/images-static/uploads/desktop-verify-quantum.png)
    
On mobile apps, navigate to `Settings` - `WireGuard` - `WireGuard details`:
   
<img width="390px" src="/images-static/uploads/mobile-verify-quantum.png"> 

### Is it compatible with other IVPN features like Multi-hop and AntiTracker?

Yes.

### Will it reduce my speed, increase latency?

No, it does not affect the latency or the speed of the connection.

### Can I enable quantum resistance for manual connections using a native WireGuard client or router?

Quantum resistant connections are available only with IVPN apps at this time.

