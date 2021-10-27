---
title: Kill switch added to iOS app
url: /blog/kill-switch-added-to-ios-app/
highlighted: false
draft: false
authors:
  - Juraj Hilje
categories:
  - Releases
tags:
  - Apps
  - Security
date: 2021-10-17T08:00:00.000Z
thumbnailImage: /images-static/uploads/thumb-2x.png
---
Kill switch option is now available in the latest version of our iOS app (v2.5). It protects from leaking data outside of the VPN  by preventing network connections if the tunnel is unavailable.

With the IVPN Kill Switch is enabled, iOS will force all your network traffic over the VPN tunnel. This includes connections to some Apple services that would [bypass the tunnel](https://nakedsecurity.sophos.com/2020/03/30/apples-ios-13-4-hit-by-vpn-bypass-vulnerability/) otherwise. When connected to the VPN, if the tunnel becomes unavailable for any reason, the system drops all network connections immediately. Disconnecting manually from the service will not activate the kill switch, i.e. non-tunnelled connections will work normally. 

Kill switch is currently available for WireGuard and OpenVPN protocols, as a [bug in iOS](https://developer.apple.com/forums/thread/653116) prevents faultless implementation for IKEv2.
