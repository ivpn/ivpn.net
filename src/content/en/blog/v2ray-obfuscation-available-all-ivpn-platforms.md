---
title: V2Ray Obfuscation Now Available on All IVPN Platforms
url: /blog/v2ray-obfuscation-available-all-ivpn-platforms/
highlighted: true
draft: false
authors:
  - Viktor Vecsei
categories:
  - Releases
tags:
  - Apps
  - Protocols
  - WireGuard
date: 2025-11-28T08:53:00.000Z
---

With the recent release of V2Ray support for Android, IVPN now offers this method of obfuscation across all supported platforms: Windows, macOS, Linux, iOS, and Android. This completes our commitment to supporting customers in countries with restrictive internet policies, or who connect from networks that block VPN traffic.

V2Ray masks WireGuard connections to appear as standard HTTPS or HTTP traffic, making it harder for network censors to detect and block VPN usage. Both VMESS/QUIC and VMESS/TCP protocols are now available in the IVPN app across all platforms.

## Bypassing censorship with V2Ray

Network-level censorship identifies and blocks VPN traffic patterns by examining data packets to detect protocol signatures. For example, WireGuard connections have identifiable characteristics that firewalls can recognize and block, which help countries like China, Iran, and Russia to deploy filtering systems that detect unobfuscated VPN traffic.

Obfuscation addresses this by wrapping VPN traffic in protocols that censors typically allow. [V2Ray's][5] VMess protocol disguises WireGuard connections as ordinary web traffic, reducing the likelihood of detection. This doesn't make connections invisible, but it does make them harder to identify and block at scale.

VPN obfuscation masks the connection between your device and the IVPN server. It does not hide the fact that you're using a VPN from websites you visit. Your exit IP address remains an IVPN server IP, which services can detect if they choose to block VPN users.

## Options and limitations

V2Ray obfuscation is integrated directly into the IVPN app across all platforms. Two protocol variants are supported:

**V2Ray (VMESS/QUIC):** Uses QUIC with TLS and SRTP header to obfuscate traffic as encrypted QUIC/TLS.   

**V2Ray (VMESS/TCP):** Uses TCP with HTTP request headers to disguise traffic as normal web browsing.

Both protocols work with WireGuard connections, including single-hop and multi-hop configurations.

Obfuscation introduces performance overhead. Beyond the latency of the additional proxy layer, wrapping WireGuard packets inside V2Ray headers increases packet size. This can lead to data fragmentation (MTU issues), resulting in lower throughput and occasional instability compared to a standard connection. We recommend enabling V2Ray only when necessary to bypass censorship.

If V2Ray doesn't work in your environment, Obfsproxy remains available on Desktop as an obfuscation option for OpenVPN connections. 

## Getting started 

We have added V2Ray support for WireGuard in IVPN Desktop and iOS apps earlier. The recent [Android implementation][1] completes cross-platform availability. V2Ray is also available for OpenVPN connections in our Desktop apps. 

Enabling V2Ray obfuscation requires a few steps. Disconnect from the VPN before changing obfuscation settings to avoid connection conflicts.

**On desktop (Windows/macOS/Linux):** Open Settings → Connection tab → Obfuscation dropdown. Select either V2Ray (VMESS/QUIC) or V2Ray (VMESS/TCP).

**On iOS:** Open Settings → Set protocol to WireGuard → Navigate to Obfuscation in Protocol Settings → Toggle the V2Ray option on and select the preferred protocol.

**On Android:** Open Settings → VPN Protocol → Set protocol to WireGuard → In Protocol Settings select either V2Ray (VMESS/QUIC) or V2Ray (VMESS/TCP).

Performance and reliability vary depending on your location, network path to IVPN servers, and local censorship methods. We recommend testing both VMESS/QUIC and VMESS/TCP to determine which works better in your environment. QUIC generally offers lower latency, but TCP may be more stable depending on how censorship systems handle QUIC traffic.

For detailed setup instructions see our [knowledgebase guide][2] for restricted regions.

For users who want to verify V2Ray traffic masking, we have a [self-audit guide][3] available with instructions on inspecting V2Ray packets.

## Help us improve

Censorship environments vary. What works in one network or country may fail in another. 

If you're using V2Ray to evade restrictions, we would like to hear from you. Does it work reliably in your location? Which protocol variant performs better? Your reports help us understand where V2Ray succeeds and what needs improvement.

[Contact us][4] with technical details about your environment (country, ISP, network type, error messages).

IVPN Staff

[1]: https://github.com/ivpn/android-app/pull/391
[2]: https://www.ivpn.net/knowledgebase/troubleshooting/i-cannot-connect-from-china-or-vietnam-or-iran-or-russia-etc-what-can-i-do/
[3]: https://www.ivpn.net/privacy-guides/self-audit-series-part2/
[4]: https://www.ivpn.net/contactus/
[5]: https://github.com/v2fly/v2ray-core


