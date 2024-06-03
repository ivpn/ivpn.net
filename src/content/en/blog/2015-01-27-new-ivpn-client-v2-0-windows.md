---
title: The all new IVPN Client v2.0 for Windows
authors: ["Fedir Nepyivoda"]
categories: ["Releases"]
tags: ["Apps"]
draft: false
date: 2015-01-27T15:28:31+00:00
url: /blog/new-ivpn-client-v2-0-windows/
comments:
  - author: JJ
    date: 2015-02-14T04:18:36+01:00
    content: |
      Great job guys, really nice program, but small problem relating to the old DNS issue like <a href="/knowledgebase/troubleshooting/my-vpn-is-connected-but-i-cannot-browse-the-internet-why/" rel="nofollow ugc">/knowledgebase/troubleshooting/my-vpn-is-connected-but-i-cannot-browse-the-internet-why/</a>

      I used to have to tick box to stop IVPN from setting dns and input opendns but now I have not an option for this, so I can connect but not use IVPN, unless I re-enter dns everytime.

      Thanks for the good work.
  - author: Anonymous
    date: 2015-03-06T13:52:02+01:00
    content: |
      Nice move, IVPN team! I've set it on always-on. Works flawlessly.
  - author: Anonymous
    date: 2015-05-25T19:05:41+02:00
    content: |
      Hurry it up on the Mac version will ya? XP Can we get an ETA on it please??

---
After much hard work we are proud to present our new [IVPN Client for Windows][1]. Behind the completely reworked user interface and improved stability we are thrilled to introduce the IVPN Firewall. When enabled it completely protects your data from leaking outside of the secure VPN tunnel, no matter what.

__Please note__ that this release is for Windows only, we are already working on a similar update for the Mac OSX IVPN client that should be available in the next few months.

![Windows](/images-static/uploads/ivpn-main-window.png)

## IVPN Firewall — Complete leak protection implemented properly

Once enabled the IVPN Firewall integrates deep into the OS using Microsoft's own WFP API ([Windows Filtering Platform API][2]) and filters all network packets. The Firewall is independent of the IVPN client so even if a component of the IVPN Client crashes filtering will continue uninterrupted.

The IVPN Firewall can be configured to switch on automatically during VPN connection or you can enable it manually when you need it. You can even configure the 'always-on' IVPN Firewall to protect the system all the time even before Windows is booted. This will ensure that no traffic will bypass the VPN tunnel even during the boot up phase.

To get a better idea how data is protected by the IVPN Firewall let's review the weak points of any VPN software.

### Network configuration and routing table changes

VPN security relies heavily on the integrity of a systems network configuration, most importantly the routing table. This presents a significant risk if the network configuration and/or routing table is changed inadvertently. This may lead to some or all traffic bypassing the VPN tunnel silently and a complete loss of privacy and anonymity.

A few examples of events that could cause the network to be reconfigured suddenly and without notice:

  * Disconnection from or connection to Wi-Fi or wired network.
  * Weak Wi-Fi signal which causes Wi-Fi to reconnect.
  * Awaking from Sleep and/or Hibernation states.
  * Network errors that force the network adapter to reset.
  * Third-party security software that reconfigures the routing table for its own needs.
  * Reboot or configuration change of the network router you are connected to.
  * Static route addition by the DHCP server.
  * &#8230; and many others.

The IVPN Firewall completely eliminates these threats by only allowing traffic through the VPN tunnel.

### Boot time protection

Native and third-party Windows services can use your internet connection even before the system is fully booted. Any application installed on your system has the opportunity to connect to a server on the Internet and to exchange data long before you are able to connect to a VPN. However the IVPN Firewall can be configured to protect your system all the time, ensuring that no traffic will leak outside the VPN tunnel even when the IVPN Client, its service, or even Windows is not fully booted. Such traffic will just be filtered out until everything finishes loading and the connection with the VPN is established.

### IPv6

As IPv6 becomes more popular, more and more ISP's and Wi-Fi hotspots around the world allocate an IPv6 subnetwork for their clients along with an IPv4 address.

According to the [Google IPv6 adoption statistics][3] 14.5% of all US traffic is IPv6. Some countries such as Belgium have an adoption rate exceeding 30%.

Its important to understand that when IPv6 is enabled on the network you are connected to it will take precedence over IPv4 for all of connections to hosts with IPv6 support.

This IPv6 traffic will most likely silently bypass your VPN tunnel.

As a result if you have no control over the configuration of the router you are connected to (e.g. a public Wi-Fi hotspot), or when the default configuration of your router is set to announce any IPv6 network your ISP has allocated to you and you haven't disabled IPv6 in your Windows OS (which is enabled by default), you may find that you have IPv6 support which is a major potential threat to your privacy.

When the IVPN Firewall is enabled its impossible for any IPv6 traffic to leak outside of the VPN tunnel, giving you absolute peace of mind.

### Software stability and crashes

All software has bugs and may crash for a variety of reasons. For example, out of memory errors will crash practically any foreground application.

Software designed for security must fail safe in the event of a crash, fully maintaining the security of the host system.

The IVPN Firewall ensures that if the VPN client, any part of the tunnel or Windows OS crashes, no traffic will leave the computer until IVPN Firewall is disabled manually or a new VPN tunnel is established.

### A few screenshots of the new UI

![IVPN Client connected to the VPN with IVPN Firewall enabled.](/images-static/uploads/ivpn-main-connected.png)

![Selecting a server for a VPN connection.](/images-static/uploads/ivpn-server-list.png)

![IVPN Firewall configuration](/images-static/uploads/ivpn-settings-firewall.png)

Try IVPN today by [signing up for one of our subscription plans][4]. We offer a full 7 day unconditional money back guarantee if you are not satisfied.

To download the IVPN Client 2.0 for all versions of Windows please visit the [setup page][1].

 [1]: /apps/
 [2]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa366510(v=vs.85).aspx
 [3]: http://www.google.com/intl/en/ipv6/statistics.html#tab=per-country-ipv6-adoption
 [4]: /signup/
