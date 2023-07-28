---
title: My VPN is slow, what can I do to make it faster? - IVPN Help
h1: My VPN is slow, what can I do to make it faster?
url: /knowledgebase/troubleshooting/my-vpn-is-slow-what-can-i-do-to-make-it-faster/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 10
---
# My VPN is slow, what can I do to make it faster?

The Internet is a large and dynamic network routing data packets between billions of devices. When the computers routing this data fail certain routes become unavailable and traffic has to be temporarily routed over an alternate path causing congestion on the new route (much like a road traffic system). Speed issues are therefore often temporary and will resolve themselves automatically as new routes are added, repaired and optimized.

A VPN is dependant on the speed of your connection to the Internet. Whatever the speed of the connection is, the VPN cannot be faster. In fact, you should expect a small loss in speed when connecting to any VPN service due to the software having to encrypt every packet of data. This loss should be small, usually 10-20% when compared with your connection without a VPN.

If you have a persistent speed issue consider the following troubleshooting steps.

1.  ### Change servers
    Selecting a server that is geographically close to you will normally result in increased performance (due to lower latency). In addition, changing to a server in another location may bypass any congestion issues depending on how close the congestion is to your location. See our [server status](/status/) page for a list of locations where we have servers.

2.  ### Change VPN port/protocol
    Your VPN software connects to our servers on a specific port number (e.g. 443) using a specific protocol (UDP or TCP). Some networks restrict the speed of certain ports or protocols.  Try changing the port/protocol until you identify the fastest combination. See [how to change ports and protocols](/knowledgebase/troubleshooting/how-do-i-change-the-port-or-protocol-used-to-connect/).

3.  ### Use a wired connection
    Your speed may be limited by your Wi-Fi connection. Wireless connections rely on a shared channel to transmit data between multiple devices which may result in increased latency and slower speeds. Wired connections normally support much higher speeds and are always preferable if you have access to one.

4.  ### Switch devices
    Certain devices are not capable of providing high speeds due to the heavy encryption overhead of a VPN tunnel.  These devices often include routers, NAS, older Android devices and early generation iOS devices.  If you are using one of these devices then your only solution is to switch to a device with a more capable processor.

5.  ### Restart your Modem/Router
    Over time your modem or router may slow down due to memory leaks etc. Restarting your modem/router may increase the speed of your connection and thus the VPN.

6.  ### Try WireGuard
    OpenVPN connections may be restricted or throttled on some networks. Using WireGuard may result in a faster connection. WireGuard is available on our [native apps](/apps/) for macOS, iOS, Windows, Linux and Android.

7.  ### Temporarily disable local security software
    Firewall or antivirus software can slow down VPN traffic by filtering or scanning outgoing packets. Try temporarily disabling your security software to determine if the security software is the cause of the performance issue.

8.  ### Restart your Device
    Over time many devices experience "fatigue" due to running out of free memory or resources. Restarting your device may help your connection speed.

9.  ### Install the latest device updates
    Install the latest device updates Check if your device has available firmware updates - they might contain various fixes and improve the general performance and quality of the connection after installing it.

10. ### Connecting from another location
    It may be that there is an issue with your connection to your ISP. You can easily check this by connecting to the Internet from another location e.g. Coffeeshop / Neighbour etc.

### Advanced options

1. To locate the congestion or network hop which is delaying your traffic, run a traceroute. Try tracerouting to the host you are trying to reach both with and without the VPN active.
2. Override the DNS with 3rd party DNS servers. We always advise customers to use our DNS servers to prevent DNS privacy leaks. However, you may wish to test whether our DNS servers are the cause of your performance issues.
3. Adjust the MTU. You'll need to read up about how to determine the best MTU for your network. If you change the network you are connecting from in the future don't forget that you may need to change the MTU again.
