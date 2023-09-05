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
            cta: Accrescent,
            url: https://accrescent.app/app/net.ivpn.client
        },
        {
            cta: .APK file,
            url: https://www.ivpn.net/releases/android/IVPNv2.10.3site.apk
        }
    ],
    github: https://github.com/ivpn/android-app,
    changelog: https://github.com/ivpn/android-app/blob/main/CHANGELOG.md,
    checksum: [
        {
            title: .apk SHA256,
            value: 936d4b6520d93e1fee06d334b4fec4a4185e8d8c1059d23fa322b4005b718179
        },
        {
            title: .apk sign cert SHA256,
            value: 88a6b40fc97fdc842f231f50eb12de116f5b759e3c5b38aaccaf6a7b393c85bb
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
- Custom DNS servers, DoT via Android native Private DNS.
- Mock location for GPS.
- Tapjacking protection.

## Manual configuration

If you prefer not to use the IVPN app please follow the relevant setup guide below.

- [WireGuard](/setup/android-wireguard/)
- [OpenVPN for Android](/setup/android-openvpn-for-android/)  
- [IPSec with IKEv2](/setup/android-ipsec-with-ikev2/)  
