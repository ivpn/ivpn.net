---
title: Key rotation issue fix in IVPN iOS app – update required
url: /blog/key-rotation-issue-fix-in-ivpn-ios-app/
highlighted: false
draft: false
authors:
  - Viktor Vecsei
categories:
  - Releases
tags:
  - Apps
  - Security
  - Transparency
  - WireGuard
date: 2025-02-18T10:00:00.000Z
---

**In summary: We identified a potential DNS leak issue affecting our iOS app during the brief intervals during WireGuard key regeneration. We advise IVPN customers using the IVPN iOS app to update to the latest version (v2.12.5) as soon as possible.**

## Details of the issue

When IVPN iOS app rotates WireGuard keys while VPN is connected, the app calls the asynchronous method `setTunnelNetworkSettings` to update VPN tunnel with new configuration. At both the start and completion of `setTunnelNetworkSettings` , the IVPN app does not register the VPN tunnel as disconnected. A DNS leak test identifies a brief window where the VPN tunnel temporarily disconnects., causing network traffic to bypass the tunnel.

To fix this issue,  an additional `reasserting: Bool` flag is now implemented when calling the `setTunnelNetworkSettings` method. This signals to the OS/device that VPN tunnel is being updated - setting this flag prevents any network traffic from bypassing the VPN tunnel.

## Next actions for customers

Customers using IVPN's iOS apps may be affected. This issue does not affect IVPN apps on other platforms.

If you rely on the IVPN app for iOS, we recommend updating to the latest version (v2.12.5) immediately:

- If you update your iOS apps manually, visit [https://apps.apple.com/nl/app/ivpn-secure-vpn-for-privacy/id1193122683](https://apps.apple.com/nl/app/ivpn-secure-vpn-for-privacy/id1193122683) to update your IVPN app
- If automatic app updates are enabled in your App Store settings, visit [https://apps.apple.com/nl/app/ivpn-secure-vpn-for-privacy/id1193122683](https://apps.apple.com/nl/app/ivpn-secure-vpn-for-privacy/id1193122683) to confirm you have the latest version (v2.12.5) installed.
