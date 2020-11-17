---
title: Windows - How to establish RDP connection to a computer running IVPN? - IVPN Help
h1: Windows - How to establish RDP connection to a computer running IVPN?
url: /knowledgebase/windows/windows-how-to-establish-rdp-connection-to-a-computer-running-ivpn/
sections:
    - windows
sectionTitle: Windows
layout: help-details
weight: 60
---
# Windows - How to establish RDP connection to a computer running IVPN?

If you would like to expose RDP on a system that is connected to our VPN you need to use Port Forwarding.

1.  Activate [Port Forwarding](/knowledgebase/general/how-do-i-activate-port-forwarding/). You will be assigned a random port number which you can view in the Client Area. As an example lets use `44897`.

2.  Choose a server to connect to from our [server list](/status/). Connect to the VPN server and identify the IP address you are assigned when VPN connection is established. You can do this by visiting a site such as [dnsleaktest.com](https://www.dnsleaktest.com/). For example lets say it is `178.162.222.40`.

3.  Change the RDP listening port on your host from the standard port of 3089 to the port you were assigned above (44897 in our example).

4.  Click the Windows button. Type `regedit`. Navigate to `HKEY_LOCAL_MACHINES\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp`. Right-click `Port Number` and click `Modify`. Fill in new port number value.

5.  Add an exception rule to your firewall to allow the connection. Click the Windows button. Type `wf.msc`. Click on `Inbound rules` in the left sidebar. Click on `New Rule` on the right sidebar. In the wizard that appears check `Port` and then `Next` and `Apply rule for TCP` and then enter your new RDP listening port number in the specific Local ports and `Allow the connection`. Then Apply the rule for both Private & Public networks. Give it a name and finish the wizard.

6.  You should now be able to establish RDP connection to your computer that is connected via `178.162.222.40:44897`.
