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
            url: https://f-droid.org/packages/net.ivpn.client/
        },
        {
            cta: .APK file,
            url: https://www.ivpn.net/releases/android/IVPNv2.1.0site.apk
        }
    ],
    github: https://github.com/ivpn/android-app,
    changelog: https://github.com/ivpn/android-app/blob/master/CHANGELOG.md,
    checksum: [
        {
            title: SHA256 .apk,
            value: b07512e5e27b336bd7a9f5098b2f9db76ec481d40236416dc417671724c3e05e
        }
    ]
}]
---
## Features

- WireGuard and OpenVPN protocols.
- WireGuard privacy controls - Define automatic key and IP address rotation schedule.
- AntiTracker that blocks ads, adware, malicious websites and data harvesting trackers.
- Ability to define trusted Wi-Fi networks and create rules for automatic VPN connection/disconnection
- Multi-hop VPN routes. Connect through multiple servers in separate jurisdictions for enhanced privacy.
- Port forwarding for OpenVPN, reserved on all servers.
- Supports defining custom DNS servers.

## Manual configuration

If you prefer not to use the IVPN app please follow the relevant setup guide below.

If you are using OpenVPN download the latest [OpenVPN configuration files](/releases/config/ivpn-openvpn-config.zip).

- [OpenVPN for Android v4.0+ Setup Guide](/setup/android-openvpn-for-android/)  
- [OpenVPN for Android v2.1+ Setup Guide](/setup/android-featvpn/)  
- [Android IPSec with IKEv2 Setup Guide](/setup/android-ipsec-with-ikev2/)  
