---
title: How do I change the port or protocol used to connect? - IVPN Help
h1: How do I change the port or protocol used to connect?
url: /knowledgebase/troubleshooting/how-do-i-change-the-port-or-protocol-used-to-connect/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 70
---
# How do I change the port or protocol used to connect?

Changing the port/protocol you use to connect to the VPN can increase your performance in some cases or unblock the connection if a certain port/protocol combination is blocked.  You may need to try multiple combinations to find the ideal setup for your connection.

Different combinations are available for different VPN protocols.

1. OpenVPN: UDP:53, UDP:80, UDP:443, UDP:1194, UDP:2049, UDP:2050, TCP:443, TCP:1443, TCP:80
2. WireGuard: UDP:53, UDP:80, UDP:443, UDP:1194, UDP:2049, UDP:2050, UDP:30587, UDP:41893, UDP:48574, UDP:58237

### For Windows, macOS, Linux, iOS, and Android:

1. Open the IVPN client.
2. Click the `Settings` / `Preferences` button. 
3. Go to the `Connection` tab (`VPN protocol` on mobile clients).
4. Select a different Port/Protocol combination.
5. Retry the connection and repeat steps 1-4 as necessary.

### For the Linux CLI app:

Add the `-port` command argument `ivpn connect -port TCP:443 de.gw.ivpn.net` and try the connection again. You might have to try more than one combination to find the one best suited for your network.

### For manual connection on any other platforms that you connect using our .ovpn config files:

1. Open .ovpn config file you use to connect with any text editor and find line 3 `proto udp` & line 4 `remote xx.gw.ivpn.net 2049`
2. Adjust those values to, e.g. `proto tcp` & `remote xx.gw.ivpn.net 443` (you can also use tcp 80, tcp 1443, udp 53, udp 80, udp 443, udp 1194 or udp 2050).
3. Save the file, create a new VPN profile in your OpenVPN client and reconnect.
4. In case the issue persists, go back to step 1 and try a different port.
