---
title: Do you offer a kill switch or VPN firewall? - IVPN Help
h1: Do you offer a kill switch or VPN firewall?
url: /knowledgebase/general/do-you-offer-a-kill-switch-or-vpn-firewall/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 150
---
# Do you offer a kill switch or VPN firewall?

Yes, the IVPN apps on Windows, macOS, Linux and iOS (15.1+) have an integrated firewall that offers the 'kill switch' solution ensuring your privacy is protected in every possible scenario. If you are interested in knowing more about our kill switch please continue reading.

An Internet kill switch is a mechanism to prevent data from leaking outside of the VPN tunnel when the tunnel fails for any reason. Traditionally the kill switch software will monitor the Internet connection of the computer on which it is running and either block all traffic or disconnect the network connection if it detects that the VPN has failed.

IVPN has implemented a secure and robust mechanism called the IVPN firewall. Once enabled the IVPN Firewall integrates deep into the operating system (using Microsoft’s own WFP API on Windows, pf on macOS & iptables on Linux) and filters all network packets. The Firewall is independent of the IVPN client, so even if a component of the IVPN Client crashes filtering will continue uninterrupted. The IVPN Firewall can be configured to switch on automatically during a VPN connection, or you can enable it manually when you need it. You can also set the 'always-on' IVPN Firewall to protect the system all the time, even before the OS is booted. This will ensure that no traffic will bypass the VPN tunnel even during the boot-up phase.

Many events could cause the network to be reconfigured suddenly and without notice which could expose your personal IP address. For example;

- Disconnection from or connection to Wi-Fi or wired network.
- Weak Wi-Fi signal which causes Wi-Fi to reconnect.
- Awaking from Sleep and/or Hibernation states.
- Network errors that force the network adapter to reset.
- Third-party security software that reconfigures the routing table for its own needs.
- Reboot or configuration change of the network router you are connected to.
- Static route addition by the DHCP server.
- … and many others.

A traditional kill switch solution needs to react to all of these events and do so fast enough that not a single packet is leaked before the connection is blocked/disconnected. The IVPN Firewall completely eliminates these threats by only allowing traffic through the VPN tunnel. Everything else is blocked.

### Boot time protection

Native and third-party services can use your internet connection even before the system is fully booted. Any application installed on your system has the opportunity to connect to a server on the Internet and to exchange data long before you are able to connect to a VPN. However, the IVPN Firewall can be configured to protect your system all the time, ensuring that no traffic will leak outside the VPN tunnel even when the IVPN Client, its service, or even the operating system is not fully booted. Such traffic will just be filtered out until everything finishes loading, and the connection with the VPN is established. When using a traditional kill switch, it is only effective once the operating system starts the application.

### IPv6

As IPv6 becomes more popular, more and more ISP’s and Wi-Fi hotspots around the world allocate an IPv6 subnetwork for their clients along with an IPv4 address.

According to the Google IPv6 adoption statistics, 14.5% of all US traffic is IPv6. Some countries, such as Belgium have an adoption rate exceeding 30%.

It is important to understand that when IPv6 is enabled on the network you are connected to it will take precedence over IPv4 for all of the connections to hosts with IPv6 support.

This IPv6 traffic will most likely silently bypass your VPN tunnel.

As a result if you have no control over the configuration of the router you are connected to (e.g. a public Wi-Fi hotspot), or when the default configuration of your router is set to announce any IPv6 network your ISP has allocated to you and you haven’t disabled IPv6 in your OS (which is enabled by default), you may find that you have IPv6 support which is a major potential threat to your privacy.

When the IVPN Firewall is enabled it is impossible for any IPv6 traffic to leak outside of the VPN tunnel, giving you absolute peace of mind.

### DNS

When you connect using our native apps your system's DNS is replaced with IVPN's DNS servers. This is done to ensure that neither your ISP nor anyone else can eavesdrop on what websites you visit.

However, some 3rd-party applications or web browsers are configured to use their own DNS. When using such apps, your system's DNS is generally ignored, essentially causing a DNS leak. 

The IVPN Firewall adds rules to your system to block all DNS queries that are sent to a non-IVPN DNS server making any DNS leaks impossible.

### WebRTC

WebRTC (Web Real-Time Communication) is an API drafted by the W3C that supports browser-to-browser applications for voice calling, video chat, and P2P file sharing (without the need of either internal or external plugins). WebRTC implements STUN (Session Traversal Utilities for NAT), a protocol that allows the discovery of your externally assigned IP address (to facilitate the applications above).

In some cases, the request to the STUN server may leak outside of the VPN and expose your ISP issued IP address. However, if you are using our kill switch, then these leaks will be blocked.

### Software stability and crashes

All software has bugs and may crash for a variety of reasons. For example, out of memory errors will crash practically any foreground application.

Software designed for security must fail-safe in the event of a crash, fully maintaining the security of the host system.

The IVPN Firewall ensures that if the VPN client, any part of the tunnel or your desktop OS crashes, no traffic will leave the computer until IVPN Firewall is disabled manually or a new VPN tunnel is established.

### Conclusion

Using the IVPN firewall enhances your security and privacy steps further. From ensuring your privacy at boot time to blocking IPv6 and protecting against IP, DNS and traffic leaks during a software crash.
