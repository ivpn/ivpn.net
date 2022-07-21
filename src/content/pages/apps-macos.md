---
title: IVPN for macOS - Open-source VPN app for your Mac
description: IVPN for macOS offers you comprehensive privacy leak protection with the IVPN firewall, automatic connection on insecure Wi-Fi and Multi-hop.
h1: IVPN for macOS
subtitle: Supports macOS 10.14+
url: /apps-macos/
platform: macos
layout: apps
image: apps/macos-app
releases: [{
    cta: Download,
    downloads: [
        {
            cta: Intel,
            url: "https://repo.ivpn.net/macos/bin/IVPN-3.9.0.dmg"
        },
        {
            cta: Apple Silicon,
            url: https://repo.ivpn.net/macos/bin/IVPN-3.9.0-arm64.dmg
        }
    ],
    github: https://github.com/ivpn/desktop-app,
    changelog: https://github.com/ivpn/desktop-app/blob/master/CHANGELOG.md,
    checksum: [
        {
            title: SHA256 Intel,
            value: 1401aebc95034a9f4ec78fec99cac37ea8af9f0723e2ad40848f02414c0749c8
        },
        {
            title: SHA256 Apple Silicon,
            value: 68f44e4bdc734cf659268ab4905d09384b7c7d7899f3a71fba6ae71732579bb4
        }
    ]
}]
---
## Features

- Supports WireGuard or OpenVPN protocols.
- Supports GUI or CLI (command-line interface).
- WireGuard privacy controls - Define automatic key and IP address rotation schedule.
- AntiTracker that blocks ads, adware, malicious websites and data harvesting trackers.
- Firewall / killswitch - Ability to configure as on-demand or always-on. Offers comprehensive protection against DNS, IPv6, disconnection and WebRTC leaks.
- Ability to define trusted Wi-Fi networks and create rules for automatic VPN connection/disconnection.
- Multi-hop VPN routes. Connect through multiple servers in separate jurisdictions for enhanced privacy.
- Allow LAN traffic when connected to VPN.
- Port forwarding for WireGuard and OpenVPN, reserved on all but US-based servers.
- Pause VPN for when disabling VPN connection temporarily is required.
- Obfsproxy option to circumvent censorship.
- Auto-update.
- Auto-connect on launch / on joining insecure Wi-Fi.

## Manual configuration

If you prefer not to use the IVPN app please follow the relevant setup guide below.

- [WireGuard](/setup/macos-wireguard/)
- [Tunnelblick (OpenVPN)](/setup/macos-openvpn-tunnelblick/)  
- [IPSec with IKEv2](/setup/macos-ipsec-with-ikev2/)   

## Download legacy version

Download [IVPN-2.12.17.dmg](https://cdn.ivpn.net/releases/osx/IVPN-2.12.17.dmg)  
SHA256: 0fd09967482f53c801dc55eaf23a88ad341da37f58d70d9c9e24c2e5aeb36c22  
