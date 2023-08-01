---
title: Removal of kill switch from our iOS app due to Apple IP leak issue
url: /blog/removal-of-kill-switch-from-our-ios-app-due-to-apple-ip-leak-issue/
highlighted: false
draft: false
authors:
  - Juraj Hilje
  - Viktor Vecsei
categories:
  - Apps
tags:
  - Apps
  - Privacy
date: 2023-08-01T12:00:00.000Z
thumbnailImage: /images-static/uploads/thumb-2x.png
---
**When using Apple services on iOS 16+, a VPN connection does not fully protect your privacy  against Apple. Even with an active VPN connection and kill switch enabled, traffic from your iOS 16+ device to Apple servers can leak outside the VPN tunnel and expose your local IP address. For this reason, during the next release we are removing the kill switch feature from the IVPN iOS app.**

## Leak issue

During recent tests of Apple's 'includeAllNetworks' feature, also known as kill switch, we found that the functionality is not working as expected, leading to some traffic leaking outside the VPN tunnel to Apple's servers.

This means that, even when the VPN is connected, using Apple's services like Apple Maps or Apple Push Notifications may result in traffic bypassing the VPN tunnel, allowing Apple servers you connect to to see the user's local IP address.

## Background

The iOS VPN bypass issue was initially discovered in iOS 13.3.1. To resolve the problem, Apple introduced the ['includeAllNetworks'](https://developer.apple.com/documentation/networkextension/nevpnprotocol/3131931-includeallnetworks) feature in iOS 14+, which was designed to force all network traffic through the VPN tunnel.

Recent tests [conducted by security researchers](https://restoreprivacy.com/latest-ios-found-to-bypass-vpn-connection-for-some-services/) revealed that on iOS 16.1+ devices, network traffic to Apple's servers still leaks outside the VPN tunnel, even when 'includeAllNetworks' is enabled.

## Next steps by IVPN

In our next iOS app release, we will remove the kill switch feature for iOS 16+ devices. This step is required to avoid providing a false sense of security to customers. 

The feature will continue to be available for iOS 15 devices, as we have confirmed that 'includeAllNetworks' works effectively on those devices.

Further, we are filing a bug report with Apple and will closely monitor this issue in future iOS versions.
