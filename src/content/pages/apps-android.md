---
title: IVPN for Android - Open-source VPN app for your Android
description: The IVPN app for Android offers you comprehensive privacy leak protection with the IVPN firewall, automatic connection on insecure Wi-Fi and Multi-hop.
h1: IVPN for Android
subtitle: Supports Android 5.0+
url: /apps-android/
platform: android
layout: apps
image: apps/android-app
releases: [{
    cta: Download,
    downloads: [
        {
            cta: Google Play,
            url: "https://play.google.com/store/apps/details?id=net.ivpn.client"
        },
        {
            cta: F-Droid,
            url: https://f-droid.org/en/packages/net.ivpn.client/
        },
        {
            cta: .APK file,
            url: https://www.ivpn.net/releases/android/IVPNv2.8.1site.apk
        }
    ],
    github: https://github.com/ivpn/android-app,
    changelog: https://github.com/ivpn/android-app/blob/master/CHANGELOG.md,
    checksum: [
        {
            title: SHA256 .apk,
            value: ddcff86bfa3035cae3f4af3ce7fc4d699caa0a5eba849f8526c94f8a7fe4bf03
        }
    ]
}]
---
## Features

- WireGuard and OpenVPN protocols.
- WireGuard privacy controls - Define automatic key and IP address rotation schedule.
- AntiTracker that blocks ads, adware, malicious websites and data harvesting trackers.
- Ability to define trusted Wi-Fi networks and create rules for automatic VPN connection/disconnection.
- Split tunnel to allow some apps to bypass the VPN.
- Multi-hop VPN routes. Connect through multiple servers in separate jurisdictions for enhanced privacy.
- Port forwarding for WireGuard and OpenVPN, reserved on all but US-based servers.
- Supports defining custom DNS servers.
- Supports Mock location for GPS.
- Tapjacking protection.

## Manual configuration

If you prefer not to use the IVPN app please follow the relevant setup guide below.

- [WireGuard](/setup/android-wireguard/)
- [OpenVPN for Android](/setup/android-openvpn-for-android/)  
- [IPSec with IKEv2](/setup/android-ipsec-with-ikev2/)  
