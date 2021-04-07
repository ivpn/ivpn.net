---
title: IVPN for Windows - Open-source VPN app for your Windows PC
description: IVPN for Windows offers you comprehensive privacy leak protection with the IVPN firewall, automatic connection on insecure Wi-Fi and Multi-hop.
h1: IVPN for Windows
subtitle: For Windows 8 / 10
url: /apps-windows/
platform: windows
layout: apps
image: apps/windows-app
releases: [{
    cta: Download,
    download: https://repo.ivpn.net/windows/bin/IVPN-Client-v3.3.5.exe,
    github: https://github.com/ivpn/desktop-app-ui2,
    changelog: https://github.com/ivpn/desktop-app-ui2/blob/master/CHANGELOG.md,
    checksum: [
        {
            title: SHA256,
            value: 922e1d3db02d2a791a03880771173e22997dceab4106c31e3dff66c76778a7f9
        }
    ]
}]
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
- Auto-update.
- Auto-connect on launch / on joining insecure Wi-Fi.

## Manual Configuration

If you prefer not to use the IVPN app please follow the relevant setup guide below.

If you are using OpenVPN download the latest OpenVPN [UDP](/releases/config/ivpn-openvpn-config.zip) or [TCP](/releases/config/ivpn-openvpn-config-tcp.zip) configuration files. In most cases, you want to use the UDP Protocol.

- [WireGuard Manual setup for Windows 10](/setup/windows-10-wireguard/)  
- [OpenVPN Manual setup for Windows 10](/setup/windows-10-openvpn-community/)  
- [Windows 10 IPSec IKEv2 Setup Guide](/setup/windows-10-ipsec-with-ikev2/)  
- [OpenVPN Manual setup for Windows 8](/setup/windows-8-openvpn-community/)  

## Signature Verification

The OpenSSL public key file has to be used for verification:

* `https://repo.ivpn.net/windows/keys/public.pem`

Next steps should be performed, to verify the signature (example):

1.  Download ‘installer' and it's signature (e.g. `https://repo.ivpn.net/windows/bin/IVPN-Client-v3.3.1.exe` and `https://repo.ivpn.net/windows/bin/IVPN-Client-v3.3.1.exe.sign.sha256.base64`)
2.  Download OpenSSL public key for verification `https://repo.ivpn.net/windows/keys/public.pem`
3.  Verification commands 

    {{< highlight shell >}}
    # Decode base64:
    $ openssl base64 -d -in IVPN-Client-v3.3.1.exe.sign.sha256.base64 -out IVPN-Client-v3.3.1.exe.sign.sha256
    # Check signature:
    $ openssl dgst -sha256 -verify public.pem -signature IVPN-Client-v3.3.1.exe.sign.sha256 IVPN-Client-v3.3.1.exe
    {{< /highlight >}}

## Download Legacy Version

Download [IVPN-2.12.17.exe](https://cdn.ivpn.net/releases/win/IVPN-Client-v2.12.17.exe)  
SHA256: 7dce2cd90a2828f308c5c9063776d05af6074d974c57ee69a7ea79030640149a  
