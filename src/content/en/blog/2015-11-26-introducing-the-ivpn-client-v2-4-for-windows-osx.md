---
title: 'Introducing the IVPN client v2.4 for Windows & OSX'
authors: ["Ed Holden"]
categories: ["Releases"]
tags: ["Apps"]
draft: false
date: 2015-11-26T18:34:57+00:00
url: /blog/introducing-the-ivpn-client-v2-4-for-windows-osx/
comments:
  - author: Maarten Billemont
    date: 2015-11-30T22:27:45+01:00
    content: |
      Wonderful news!

      Are there any plans to publish the source code for these clients under a Free Software license so that we can build it ourselves and don't need to rely on pre-built binaries?
  - author: Mr. A. Dog
    date: 2015-12-15T11:46:54+01:00
    content: |
      I am very happy that you have the Firewall features in Mac OSX now. Bravo!
  - author: MK
    date: 2016-04-04T17:49:09+02:00
    content: |
      The firewall feature is excellent. Thank you! I now have version 2.6 on OSX, and I have 2 feature suggestions:

      1. If there were some way to see what the current upload / download speed is. Perhaps this could be done via mousing-over the iVPN icon (just as with the Tunnelblick icon).

      2. If it were possible to have a sound play upon connection and a (different) sound play up on disconnection. I liked this about Tunnelblick.
        
      Thank you!
  - author: Gerhard
    date: 2016-06-16T23:51:17+02:00
    content: |
      Please also brings a client for Ubuntu / Kubuntu &#8230; out.
  - author: SmallTownPleb
    date: 2016-07-26T12:26:34+02:00
    content: |
      Is macOS Sierra compatible with this client? I know this new OS broke my Logitech peripherals.
  - author: Ed Holden
    date: 2016-07-26T17:01:15+02:00
    content: |
      Not yet, we're still testing, a lot of new changes in Sierra which require updates to the OSX app. We will release updates ASAP to ensure full compatibility before release.
  - author: LKO
    date: 2016-11-05T15:54:35+01:00
    content: |
      Great work IVPN - very happy to see this!

      Are there plans to release an iOS app? At this stage the OpenVPN works but it's not reliable.
  - author: Dennis Kügler
    date: 2016-11-07T12:34:07+01:00
    content: |
      Yes, we're actively developing an iOS client and hoping to release v1 before the end of the year.
  - author: Liam
    date: 2016-11-07T16:49:04+01:00
    content: |
      Amazing! Thank you for your response. Keep up the great work - you've also kept me as a customer now.
  - author: Nick
    date: 2017-01-02T02:58:05+01:00
    content: |
      Is this fully open-source? If not, it hardly matters what features you put in, as it'll be untrustworthy at a fundamental level. The client does look sleek though - but where's the Linux version? Must say its strange to completely ignore Linux, but attempt to push out iOS versions. Also, what's the point of your "multi-hops" - which enemies are you trying to avoid? It seems like its just marketing, because the hops are done by the same company. So if someone was wiretapping IVPN, your multi-hops wouldnt do a thing to stop them, unless the traffic is tunnelled again, to hide the contents of it.
  - author: LKO
    date: 2017-01-09T19:29:09+01:00
    content: |
      Any updates on the iOS client?

---
We're thrilled to releasing major new updates to our IVPN client for Windows and OSX. We've listened carefully to customers and this release addresses almost every feature request we've had in the past year. We've put extra effort onto the OSX client as it has previously not received as much attention as the windows client. That's also changing as both clients are built from a common code base. All future releases of the IVPN client software will be for both OSX and Windows at the same time. To facilitate this we have aligned the OSX client version with that of the windows version, 2.4

## Full mesh Multi-hop network support

For both clients, we have introduced the capability to multi-hop on our <a href="/blog/multihop-v2-network-now-available/" target="_blank" rel="noopener noreferrer">new full mesh network</a>. When you connect to an entry server using multi-hop, your traffic will be routed securely and directly to the exit server for maximum performance (no intermediate servers). Both IVPN clients have updated versions of OpenVPN and the obfsproxy transport (useful if you're in China etc.) and a significant number of bugs have been squashed making this by far the most stable release we have published.

## IVPN Firewall - Robust leak protection for OSX

The OSX client has the same robust IVPN Firewall that we introduced for the Windows client earlier this year. The IVPN Firewall ensures full protection against data leaks by implementing low level firewall rules using OSX's native PF firewall. It doesn't matter if your connection drops or  your network configuration changes, the only exit for packets is through the VPN tunnel until it is explicitly disabled, providing a significant increase in your privacy and security.

The firewall is independent of the IVPN client so even if a component of the IVPN Client crashes filtering will continue uninterrupted. The IVPN Firewall can be configured to switch on automatically during VPN connection or you can enable it manually when you need it. You can even configure the 'always-on' IVPN Firewall so it starts before any other processes, ensuring that no traffic will bypass the VPN tunnel even during the boot up phase.

In addition, the IVPN Firewall protects against data leaks as a result of network configuration and routing table changes, IPv6 leaks and software crashes. For more information about how these types of leaks occur see our previous post on the <a href="/blog/new-ivpn-client-v2-0-windows/" target="_blank" rel="noopener noreferrer">IVPN Firewall for Windows</a>.

## New UI for OSX

![Home screen for IVPN Client](/images-static/uploads/osx-client-homescreen.png)

![IVPN client connected](/images-static/uploads/osx-client-connected.png)

![IVPN client - exit selection](/images-static/uploads/osx-client-exit-server.png)

![OSX client preferences](/images-static/uploads/osx-client-preferences.png)

## Download links

  * <a href="/apps-windows/" rel="noopener noreferrer">IVPN client for Windows 7/8/10</a> (<a href="https://github.com/ivpn/desktop-app-ui/blob/master/CHANGELOG_windows.md" target="_blank" rel="noopener noreferrer">changelog</a>)
  * <a href="/apps-macos/" rel="noopener noreferrer">IVPN client for OSX 10.7+</a> (<a href="https://github.com/ivpn/desktop-app-ui/blob/master/CHANGELOG_macos.md" target="_blank" rel="noopener noreferrer">changelog</a>)
