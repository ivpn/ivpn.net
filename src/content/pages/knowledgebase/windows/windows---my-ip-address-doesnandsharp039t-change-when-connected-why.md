---
title: Windows - My IP address doesn't change when connected, why? - IVPN Help
h1: Windows - My IP address doesn't change when connected, why?
url: /knowledgebase/windows/windows---my-ip-address-doesnandsharp039t-change-when-connected-why/
sections:
    - windows
sectionTitle: Windows
layout: help-details
weight: 20
---
# Windows - My IP address doesn't change when connected, why?

If geolocation websites such as [dnsleaktest.com](https://www.dnsleaktest.com/) are showing your personal IP instead of the IP of the VPN server then you have a serious privacy leak. Fortunately this is not possible with the IVPN client as it has a firewall that protects against these types of leaks. However if you are using the community edition of OpenVPN then read on.

It really helps to have a basic understanding of the issue to resolve it. Your computer maintains a 'routing table' that lists the routes to particular network destinations. Most personal computers simply forward all outbound traffic to the Internet Service Provider (ISP) so the routing table is very simple. When the VPN client software connects to the VPN server it needs to update the routing table to override the existing entry which routes all traffic to the ISP. If the VPN client software is unable to update the routing table then even although there is an active connection to the VPN server (green shield), traffic will NOT be routed through it and you will see your own IP on geolocation websites. On Windows computers this is almost always due to insufficient permissions to update the routing table. This is the reason why the VPN client prompts you for administrative permission when you start it.

### How can I fix it?

1.  Check that when you start the OpenVPN application it prompts you with the message "Do you want to allow the following program from an unknown publisher to make changes to your computer?". You must answer YES to this prompt. If you do not see this prompt then you may have disabled UAC. Right click on the desktop OpenVPN icon and select `Properties`. Click on the `Compatibility` tab and select `Run this program as an administrator`.

2.  To confirm that the routing table has not been updated click on `Start` and type `cmd.exe` and click on the icon for the command prompt. Type `route print` and hit enter. Under the heading "IPv4 Route Table" the top two entries should both have a network destination of '0.0.0.0' with one of them having a netmask of '128.0.0.0'. If you only have a single entry with a destination of '0.0.0.0' then the routing table has not been updated.

3.  If you are using Windows 8.x there is an obscure bug that may cause the routes to not be correctly installed. To workaround this open the Network Adapter Applet (Control Panel\Network and Internet\Network Connections) before you start the VPN connection. This has to be done once after each reboot.