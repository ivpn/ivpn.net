---
title: IVPN for Android - Open-source VPN app for your Android
description: The IVPN app for Android offers you comprehensive privacy leak protection with the IVPN firewall, automatic connection on insecure Wi-Fi and Multi-hop.
h1: IVPN for Android
subtitle: Supports Android 7.1+
url: /en/apps-android/
aliases: ['/apps-android/']
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
            url: https://www.ivpn.net/releases/android/IVPNv2.10.10site.apk
        }
    ],
    github: https://github.com/ivpn/android-app,
    changelog: https://github.com/ivpn/android-app/blob/main/CHANGELOG.md,
    checksum: [
        {
            title: .apk SHA256,
            value: 484ede3adabda94bc78768d3f3b1dc12732cbb76eb886216bc693850a469f5fe
        },
        {
            title: .apk sign cert SHA256,
            value: 88a6b40fc97fdc842f231f50eb12de116f5b759e3c5b38aaccaf6a7b393c85bb
        }
    ],
    note: 'Note: A vulnerability in Android might cause a DNS leak on all VPN connections, no matter which VPN service you use. Review [our blog post](https://www.ivpn.net/blog/dns-traffic-leak-outside-vpn-tunnel-on-android/) for more information.'
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
