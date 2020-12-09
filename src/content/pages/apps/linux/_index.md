---
title: IVPN for Linux - Open-source VPN app for Linux
description: IVPN for Linux offers you comprehensive privacy leak protection with the IVPN firewall, automatic connection on insecure Wi-Fi and Multi-hop.
url: /apps/linux/
section: IVPN for Linux
platform: linux
layout: setup-list
---
In open beta - supports 64-bit Linux 3.10+

{{< figure class="features__image--light" src="/images-static/uploads/apps/linux-app-light@2x.png" alt="IVPN for Linux - Open-source VPN app for Linux" >}}
{{< figure class="features__image--dark" src="/images-static/uploads/apps/linux-app-dark@2x.png" alt="IVPN for Linux - Open-source VPN app for Linux" >}}

### Base Package

Base package contains everything you need to connect to IVPN with command line interface. IVPN GUI app is provided as a separate package you can find below.

[View source on GitHub](https://github.com/ivpn/desktop-app-cli)  
[Changelog](https://github.com/ivpn/desktop-app-cli/blob/master/CHANGELOG.md)  

### IVPN GUI App

Please note: base package is required to be installed prior to installing GUI app.

[View source on GitHub](https://github.com/ivpn/desktop-app-ui2)  
[Changelog](https://github.com/ivpn/desktop-app-ui2/blob/master/CHANGELOG.md)  

## Features

* WireGuard or OpenVPN protocols.
* GUI or CLI (command-line interface).
* WireGuard privacy controls - Define automatic key and IP address rotation schedule.
* AntiTracker that blocks ads, adware, malicious websites and data harvesting trackers.
* Firewall / killswitch - Ability to configure as on-demand or always-on. Offers comprehensive protection against DNS, IPv6, disconnection and WebRTC leaks.
* Ability to define trusted Wi-Fi networks and create rules for automatic VPN connection/disconnection.
* Multi-hop VPN routes. Connect through multiple servers in separate jurisdictions for enhanced privacy.
* Allow LAN traffic when connected to VPN.
* Port forwarding for OpenVPN, reserved on all servers.
* Pause VPN for when disabling VPN connection temporarily is required.
* Obfsproxy option to circumvent censorship.

## Manual configuration

If you prefer not to use the IVPN app please follow the relevant setup guide below.

If you are using OpenVPN download the latest [OpenVPN configuration files](/releases/config/ivpn-openvpn-config.zip).

* [OpenVPN using NetworkManager Setup Guide](/setup/linux-netman/)
* [OpenVPN using terminal Setup Guide](/setup/linux-terminal/)
* [Linux IPSec with IKEv2 Setup Guide](/setup/linux-ipsec-with-ikev2/)
* [WireGuard using terminal Setup Guide](/setup/linux-wireguard/)
* [WireGuard using NetworkManager Setup Guide](/setup/linux-wireguard-netman/)
