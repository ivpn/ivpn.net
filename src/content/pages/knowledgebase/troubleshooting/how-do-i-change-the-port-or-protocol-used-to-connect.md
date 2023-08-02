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

Different combinations are available for different VPN protocols:

1. OpenVPN: UDP:53, UDP:80, UDP:123, UDP:443, UDP:1194, UDP:2049, UDP:2050, TCP:80, TCP:443, TCP:1194, TCP:1443, TCP:2049, TCP:2050, TCP:30587, TCP:41893, TCP:48574, TCP:58237, and any UDP or TCP port within the 5500-19999, 30000-65000 range.
2. WireGuard: UDP:53, UDP:80, UDP:123, UDP:443, UDP:500, UDP:1194, UDP:2049, UDP:2050, UDP:4500, UDP:30587, UDP:41893, UDP:48574, UDP:58237, and any UDP port within the 5500-19999, 30000-65000 range.

### For Windows, macOS, Linux, iOS, and Android:

1. Open the IVPN client.
2. Click on the "Gear" icon at the top right to access `Settings`. 
3. Go to the `Connection` tab (`VPN protocol` on mobile clients).
4. Select a different Port/Protocol combination.
5. Retry the connection and repeat steps 1-4 as necessary.

### Using CLI:

Add the `-port` command argument `ivpn connect -port TCP:443 de.gw.ivpn.net` and try the connection again. You might have to try more than one combination to find the one best suited for your network.

### For manual connection on any other platforms that you connect using our config files:

#### OpenVPN
<br>

1. Open the .ovpn config file with any text editor and locate line 3 `proto udp` and line 4 `remote xx.gw.ivpn.net 2049`.
2. Change those values to, e.g. `proto tcp` and `remote xx.gw.ivpn.net 443` (see all available port combinations above).
3. Save the changes, (if required) create a new VPN profile in your OpenVPN client, and reconnect.
4. In case the issue persists, go back to step 1 and try a different port.

#### WireGuard
<br>

1. Open the WireGuard config file with any text editor.
2. Change the port number in the `Endpoint` field, e.g. `ua1.wg.ivpn.net:443` (see all available port combinations above).
3. Save the changes, (if required) create a new VPN profile in your WireGuard client, and reconnect.
4. In case the issue persists, go back to step 1 and try a different port.
