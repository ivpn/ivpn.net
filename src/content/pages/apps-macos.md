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
            url: "https://repo.ivpn.net/macos/bin/IVPN-3.10.23.dmg"
        },
        {
            cta: Apple Silicon,
            url: https://repo.ivpn.net/macos/bin/IVPN-3.10.23-arm64.dmg
        }
    ],
    github: https://github.com/ivpn/desktop-app,
    changelog: https://github.com/ivpn/desktop-app/blob/master/CHANGELOG.md,
    checksum: [
        {
            title: SHA256 Intel,
            value: f53bb078f9c6d021dd28152b1de7c5ca63f38c8ce27a692a2f4fbf85cdfd4865
        },
        {
            title: SHA256 Apple Silicon,
            value: 690577eeaa47d8c44139dcac64acdf98c39becb4f68b191d594ca45325532507
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
- Pause VPN for when disabling VPN connection temporarily is required.
- Obfsproxy option to circumvent censorship.
- Custom DNS servers, with DoH.
- Auto-update.
- Auto-connect on launch / on joining insecure Wi-Fi.

## Manual Configuration

If you prefer not to use the IVPN app please follow the relevant setup guide below.

- [WireGuard](/setup/macos-wireguard/)
- [Tunnelblick (OpenVPN)](/setup/macos-openvpn-tunnelblick/)  
- [IPSec with IKEv2](/setup/macos-ipsec-with-ikev2/)   

## Signature Verification

The OpenSSL public key file has to be used for verification:

* `https://repo.ivpn.net/macos/keys/public.pem`

Next steps should be performed, to verify the signature (example):

1.  Download ‘installer' and it's signature (e.g. `https://repo.ivpn.net/macos/bin/IVPN-3.3.7.dmg` and `https://repo.ivpn.net/macos/bin/IVPN-3.3.7.dmg.sign.sha256.base64`)
2.  Download OpenSSL public key for verification `https://repo.ivpn.net/macos/keys/public.pem`
3.  Verification commands 

    {{< highlight shell >}}
    # Decode base64:
    $ openssl base64 -d -in IVPN-3.3.7.dmg.sign.sha256.base64 -out IVPN-3.3.7.dmg.sign.sha256
    # Check signature:
    $ openssl dgst -sha256 -verify public.pem -signature IVPN-3.3.7.dmg.sign.sha256 IVPN-3.3.7.dmg
    {{< /highlight >}}

## Download Legacy Version

Download [IVPN-2.12.17.dmg](https://cdn.ivpn.net/releases/osx/IVPN-2.12.17.dmg)  
SHA256: 0fd09967482f53c801dc55eaf23a88ad341da37f58d70d9c9e24c2e5aeb36c22  
