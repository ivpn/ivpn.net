---
title: Obfuscation with V2Ray on iOS - IVPN Help
h1: Obfuscation with V2Ray on iOS
url: /knowledgebase/ios/v2ray/
sections:
    - ios
sectionTitle: iOS
layout: help-details
weight: 50
---
# Obfuscation with V2Ray on iOS

VPN obfuscation is a technique that masks VPN traffic to make it appear like standard internet traffic, helping to evade detection and bypass internet restrictions or censorship.

When using WireGuard we offer the powerful V2Ray proxy protocol. It is available in two variants, you may find one is more performant and/or reliable depending on multiple variables relating to your location and the path your traffic takes to the VPN server. We recommend experimenting with both variants.

## V2Ray protocols

**V2Ray (VMESS/QUIC)** is a modern protocol designed to provide robust security and high performance, while reducing latency compared to traditional protocols. It makes your data appear as regular HTTPS traffic.

**V2Ray (VMESS/TCP)** is a traditional, widely-used protocol that guarantees reliable, ordered data delivery. It makes your data appear as regular HTTP traffic.

## Supported features on iOS

* VPN protocols: WireGuard
* V2Ray protocols: VMESS/QUIC, VMESS/TCP
* Single and multi hop
* WiFi and cellular networks

### Will V2Ray obfuscation stop websites from detecting a VPN connection?

No.

The obfuscation only exists between your device and the VPN server and the mechanism is not designed to bypass VPN blocks on websites, like for video streaming, gambling, or anything with geo-location restrictions.  The IP address on the VPN server for outgoing traffic remains the same whether V2Ray is active or not.
