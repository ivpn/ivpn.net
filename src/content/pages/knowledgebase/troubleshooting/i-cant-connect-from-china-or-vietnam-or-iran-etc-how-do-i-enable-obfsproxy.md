---
title: I can't connect from China / Vietnam / Iran etc. - How do I enable obfsproxy? - IVPN Help
h1: I can't connect from China / Vietnam / Iran etc. - How do I enable obfsproxy?
url: /knowledgebase/troubleshooting/i-cant-connect-from-china-or-vietnam-or-iran-etc-how-do-i-enable-obfsproxy/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 130
---
# I can't connect from China / Vietnam / Iran etc. - How do I enable obfsproxy?

If you are unable to connect from a country where there may be a restrictive national firewall we recommend enabling the **obfsproxy** option from within the IVPN client.

<div markdown="1" class="notice notice--info">
Please note that we do not have a solution for mobile devices running Android or iOS. We only support obfsproxy in the IVPN client for Windows, macOS and Linux.
</div>

### Graphical Interface for Windows, macOS, and Linux

1. Click on the `settings` gear icon.
1. Click on the `connection` tab.
1. Select OpenVPN.
1. Check the box for `Use obfsproxy`.
1. Back out of `settings` and connect the VPN.

### Command-Line Interface for Windows, macOS, and Linux

Open a `Command Prompt` (Windows) or `Terminal` (macOS and Linux) and type the following command.  Feel free to adjust the server location; Sweden is used as an example:

```
ivpn connect -obfsproxy obfs4_iat1 -any Sweden
```

Help is available with more **obfsproxy** options:

```
ivpn connect -h
```

### Inter-Arrival Timing (IAT) Mode

This option is available for OBFS4 proxy and it is the elapsed time after receipt of a packet until the next packet arrives.  Three different options are available to determines packet segmentation rules:
- **0 = disabled**: packets are segmented by the network, network fingerprints could be detected
- **1 = enabled**: packets are segmented by the OBFS4 proxy, maximum payload is 1448 bytes, prevents re-assembly for analysis
- **2 = paranoid**: random packet size, prevents re-assembly for analysis, uncommon and may or may not offer benefits

There will likely be a performance decrease for the VPN connection with IAT-modes 1 and 2.
