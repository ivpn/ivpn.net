---
title: My VPN connection is randomly disconnecting. What can I do? - IVPN Help
h1: My VPN connection is randomly disconnecting. What can I do?
url: /knowledgebase/troubleshooting/my-vpn-connection-is-randomly-disconnecting-what-can-i-do/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 50
---
# My VPN connection is randomly disconnecting. What can I do?

Disconnections are frustrating and can potentially compromise your privacy. It is very helpful to have a basic understanding of what causes a VPN to disconnect in order to troubleshoot the issue.

### What causes disconnections?

The client software and server both send each other a cryptographically signed ping packet every 10 seconds to inform the other side that they are active/alive. If the client doesn't receive this ping packet (or any other data) from the server for longer than 120 seconds it assumes the server is no longer available and disconnects.  This happens because the ping packets are being either lost or blocked on the path between your device and the server. This could be a software or hardware router filtering these packets or an unreliable Internet connection which is causing packet loss.

### What can you do?

1. Change the port of the VPN protocol you use to connect, see [how to change ports/protocols](/knowledgebase/troubleshooting/how-do-i-change-the-port-or-protocol-used-to-connect/).
2. Try WireGuard VPN protocol - available in all of our [native apps](/apps/) for macOS, iOS, Windows, Linux and Android.
3. Try IPSec with IKEv2 VPN protocol. Setup guides can be found [here](/apps/).
4. Try connecting to a different server, there may be an issue between your device and the server.
5. If you are connecting from a location where you think your connection may be censored, try enabling obfsproxy from within the IVPN client. See [how to enable obfsproxy](/knowledgebase/troubleshooting/i-cant-connect-from-china-or-vietnam-or-iran-etc-how-do-i-enable-obfsproxy/). Instructions for Linux users are available [here](/knowledgebase/linux/linux-how-can-i-circumvent-vpn-censorship-by-masking-the-vpn-traffic/).
6. Try connecting from another device to see if the issue is with the device. We support a large range of devices, see our [setup guides](/apps/).
7. Restart your router device. Check if there are available updates to your router's firmware - they might contain various fixes and improve the general performance and quality of the connection after installing it.
8. Try another internet connection as your connection may be unreliable, especially shared wireless connections (hotels, coffee shops), cellular (3G/4G/5G) etc.
9. Advanced users may want to read about MTU and experiment with adjusting the maximum UDP packet sizes for OpenVPN (using the tun-mtu, fragment and mssfix directives). More information can be found in the [OpenVPN manual](https://community.openvpn.net/openvpn/wiki/Openvpn23ManPage).
