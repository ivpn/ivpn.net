---
title: Kill Switch and WireGuard Multi-hop added to IVPN for iOS
url: /blog/kill-switch-and-wireguard-multi-hop-added-to-ivpn-for-ios/
highlighted: false
draft: false
authors:
  - Juraj Hilje
categories:
  - Releases
tags:
  - Apps
  - Security
date: 2021-11-09T08:00:00.000Z
thumbnailImage: /images-static/uploads/thumb-2x.png
---
Kill Switch and WireGuard Multi-hop options are now available in the latest version of our iOS app (v2.5.0).  

The Kill Switch protects from leaking data outside of the VPN by preventing network connections if the tunnel is unavailable. When you enable the IVPN Kill Switch, iOS forces your network traffic over the VPN tunnel. This includes connections to certain Apple services that otherwise [bypass the tunnel](https://nakedsecurity.sophos.com/2020/03/30/apples-ios-13-4-hit-by-vpn-bypass-vulnerability/). When connected to the VPN, if the tunnel becomes unavailable for any reason, the system drops all network connections immediately. Disconnecting manually from the service will not activate the Kill Switch, i.e. non-tunnelled connections will work as expected. 

Kill Switch is currently available for WireGuard and OpenVPN protocols only, as a [bug in iOS](https://developer.apple.com/forums/thread/653116) prevents faultless implementation for IKEv2.

This iOS release also includes WireGuard Multi-hop support. Multi-hop routes your traffic through two VPN servers, offering improved privacy.
