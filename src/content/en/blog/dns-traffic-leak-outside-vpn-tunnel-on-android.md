---
title: DNS traffic leak outside VPN tunnel on Android
url: /blog/dns-traffic-leak-outside-vpn-tunnel-on-android/
draft: false 
authors:
  - IVPN Staff
categories:
  - IVPN News
tags:
  - Apps
date: 2024-06-13T08:00:00.000Z
thumbnailImage: /images-static/uploads/vpn.png
---
Recently we were made aware of a potential DNS traffic leak outside the VPN tunnel on Android. Even with Android OS "Always-on VPN" and "Block connections without VPN" options enabled, [as per the report](https://issuetracker.google.com/issues/337961996) the plaintext DNS traffic can be observed outside the VPN tunnel.

During our investigation, we were able to confirm the issue when using different VPN apps on Android (including the IVPN app). The issue was reproduced in several different Android versions, including the latest Android 14.

A DNS leak can occur when an app (e.g. Chrome app) calls the `getaddrinfo` function to resolve domains. Note that `getaddrinfo` function can leak DNS even when the option "Block connections without VPN" is enabled. The issue [should be fixed](https://issuetracker.google.com/issues/337961996) in a future Android version. 

### Steps to reproduce
1. Enable "Block connections without VPN" in Android Settings -> VPN -> [provider] -> Settings
2. Start `tcpdump` and filter DNS traffic
3. Connect or reconnect VPN
4. Open or refresh a web page in the Browser
5. Check `tcpdump` for plaintext DNS traffic

### Recommendations
DNS leaks can seriously impact user privacy, resulting in potential exposure of browsing history and geolocation, or tracking and profiling. Depending on your threat model, consider avoiding using Android in situations where DNS leaks can impact your privacy, until the issue is fixed in a future Android OS version.
