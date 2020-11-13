---
title: IVPN for Linux - Open-source VPN app for Linux
description: IVPN for Linux offers you comprehensive privacy leak protection with the IVPN firewall, automatic connection on insecure Wi-Fi and Multi-hop.
h1: IVPN for Linux
subtitle: In open beta - supports 64-bit Linux 3.10+
url: /apps-linux/
platform: linux
layout: apps
image: apps/linux-app
releases: [
    {
        title: Base Package,
        description: "Base package contains everything you need to connect to IVPN with command line interface. IVPN GUI app is provided as a separate package you can find below.",
        cta: Download,
        downloads: [
            {
                cta: Download .DEB file,
                url: https://cdn.ivpn.net/releases/linux/2.12.8/ivpn_2.12.8_amd64.deb
            },
            {
                cta: Download .RPM file,
                url: https://cdn.ivpn.net/releases/linux/2.12.8/ivpn-2.12.8-1.x86_64.rpm
            }
        ],
        github: https://github.com/ivpn/desktop-app-cli,
        changelog: https://github.com/ivpn/desktop-app-cli/blob/master/CHANGELOG.md,
        checksum: [
            {
                title: SHA256 .deb,
                value: c2ff205408d7c3e4fe74310e9a19ea7617e68215986c01b499f329d7744ee83b
            },
            {
                title: SHA256 .rpm,
                value: bd7b7a16830013388f0f8712464fc1ed63d46f2fa3dc8704f5ba645df0e3ebc0
            }
        ]
    },
    {
        title: IVPN GUI App,
        description: "Please note: base package is required to be installed prior to installing GUI app.",
        cta: Download,
        downloads: [
            {
                cta: Download .DEB file,
                url: https://cdn.ivpn.net/releases/linux/ui/3.2.0/ivpn-ui_3.2.0_amd64.deb
            },
            {
                cta: Download .RPM file,
                url: https://cdn.ivpn.net/releases/linux/ui/3.2.0/ivpn-ui-3.2.0-1.x86_64.rpm
            },
            {
                cta: Download .AppImage file,
                url: https://cdn.ivpn.net/releases/linux/ui/3.2.0/ivpn-ui-3.2.0.AppImage
            }
        ],
        github: https://github.com/ivpn/desktop-app-cli,
        changelog: https://github.com/ivpn/desktop-app-ui2/blob/master/CHANGELOG.md,
        checksum: [
            {
                title: SHA256 .deb,
                value: 2f1a33920ff6826be485c1d420083e2e2df45f220b903f8083bad5fea5940dab
            },
            {
                title: SHA256 .rpm,
                value: 6eaf4333be05c86a15f6eda442305484afef484214264dadc4005841c4866b00
            },
            {
                title: SHA256 .AppImage,
                value: 537ea33aab4dd375700387d4187663c1551172e600dc68b9e5832f851e503de3
            }
        ]
    }
]
---
## Features

- WireGuard or OpenVPN protocols.
- GUI or CLI (command-line interface).
- WireGuard privacy controls - Define automatic key and IP address rotation schedule.
- AntiTracker that blocks ads, adware, malicious websites and data harvesting trackers.
- Firewall / killswitch - Ability to configure as on-demand or always-on. Offers comprehensive protection against DNS, IPv6, disconnection and WebRTC leaks.
- Ability to define trusted Wi-Fi networks and create rules for automatic VPN connection/disconnection.
- Multi-hop VPN routes. Connect through multiple servers in separate jurisdictions for enhanced privacy.
- Allow LAN traffic when connected to VPN.
- Port forwarding for OpenVPN, reserved on all servers.
- Pause VPN for when disabling VPN connection temporarily is required.
- Obfsproxy option to circumvent censorship.

## Manual configuration

If you prefer not to use the IVPN app please follow the relevant setup guide below.

If you are using OpenVPN download the latest [OpenVPN configuration files](/releases/config/ivpn-openvpn-config.zip).

- [OpenVPN using NetworkManager Setup Guide](/setup/linux-netman/)  
- [OpenVPN using terminal Setup Guide](/setup/linux-terminal/)  
- [Linux IPSec with IKEv2 Setup Guide](/setup/linux-ipsec-with-ikev2/)  
- [WireGuard using terminal Setup Guide](/setup/linux-wireguard/)  
- [WireGuard using NetworkManager Setup Guide](/setup/linux-wireguard-netman/)  
