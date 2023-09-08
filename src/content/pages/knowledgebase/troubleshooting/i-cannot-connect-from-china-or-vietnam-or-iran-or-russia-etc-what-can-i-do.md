---
title: I cannot connect from China / Vietnam / Iran / Russia etc. What can I do? - IVPN Help
h1: I cannot connect from China / Vietnam / Iran / Russia etc. What can I do?
url: /knowledgebase/troubleshooting/i-cannot-connect-from-china-or-vietnam-or-iran-or-russia-etc-what-can-i-do/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 130
---
# I cannot connect from China / Vietnam / Iran / Russia etc. What can I do?

If you are unable to connect from a country where there may be a restrictive national firewall we recommend enabling the **obfsproxy** or **V2Ray** options from within the IVPN client.

When using OpenVPN we offer two solutions, V2Ray and Obfsproxy. For WireGuard, only V2Ray is currently available.

Both solutions generally work well but you may find one solution is more performant and/or reliable depending on multiple variables relating to your location and the path your traffic takes to the VPN server. We recommend experimenting with both Obfsproxy and V2Ray options.

<div markdown="1" class="notice notice--info">
Please note that we do not have a solution for mobile devices running Android or iOS. Obfuscation protocols are currently supported only in the IVPN app for Windows, macOS and Linux.
</div>

### Graphical Interface for Windows, macOS, and Linux

1. Click on the `Settings` gear icon.
2. Click on the `Connection` tab.
3. Select the preferred obfuscation option from the `Obfuscation` drop-down list.
4. Back out of `Settings` and connect the VPN.

### Command-Line Interface for Windows, macOS, and Linux

Open a `Command Prompt` (Windows) or `Terminal` (macOS and Linux) and type one of the following commands.  Feel free to adjust the VPN protocol, obfuscation method and the server location as required:

```
ivpn connect -obfsproxy obfs4_iat1 -any Sweden
```
```
ivpn connect -v2ray quic -p wireguard -fastest
```

Help is available with more **obfsproxy** & **V2Ray** options:

```
ivpn connect -h
```

### Inter-Arrival Timing (IAT) Mode

This option is available for OBFS4 proxy and it is the elapsed time after receipt of a packet until the next packet arrives.  Three different options are available to determines packet segmentation rules:
- **0 = disabled**: packets are segmented by the network, network fingerprints could be detected
- **1 = enabled**: packets are segmented by the OBFS4 proxy, maximum payload is 1448 bytes, prevents re-assembly for analysis
- **2 = paranoid**: random packet size, prevents re-assembly for analysis, uncommon and may or may not offer benefits

There will likely be a performance decrease for the VPN connection with IAT-modes 1 and 2.

### V2Ray options

- **VMESS/QUIC**: a modern protocol designed to provide robust security and high performance, while reducing latency compared to traditional protocols. It makes your data appear as regular HTTPS traffic
- **VMESS/TCP**: a traditional, widely-used protocol that guarantees reliable, ordered data delivery. It makes your data appear as regular HTTP traffic.