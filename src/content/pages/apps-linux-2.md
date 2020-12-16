---
title: IVPN for Linux - Open-source VPN app for Linux
description: IVPN for Linux offers you comprehensive privacy leak protection with the IVPN firewall, automatic connection on insecure Wi-Fi and Multi-hop.
url: /apps-linux-2/
platform: linux
layout: apps-single
---
# IVPN for Linux

In open beta - supports 64-bit Linux 3.10+

* [Ubuntu](#ubuntu)  
* [Debian](#debian)  
* [Raspbian](#raspbian)  
* [Fedora](#fedora)  
* [CentOS](#centos)  
* [RHEL](#rhel)  
* [OpenSUSE](#opensuse)  
* [Arch Linux](#arch-linux)  
* [Source Code and Changelog](#source)  
* [Features](#features)  
* [Manual configuration](#manual-configuration)  

## Ubuntu {#ubuntu}

**Instructions** 
```
curl -fsSL https://repo.ivpn.net/stable/ubuntu/generic.gpg | sudo apt-key add -
curl -fsSL https://repo.ivpn.net/stable/ubuntu/generic.list | sudo tee /etc/apt/sources.list.d/ivpn.list
sudo apt-get update
sudo apt-get install ivpn
sudo apt-get install ivpn-ui
```

## Debian {#debian}

**Instructions**  
```
curl -fsSL https://repo.ivpn.net/stable/debian/generic.gpg | sudo apt-key add -
curl -fsSL https://repo.ivpn.net/stable/debian/generic.list | sudo tee /etc/apt/sources.list.d/ivpn.list
sudo apt-get update
sudo apt-get install ivpn
sudo apt-get install ivpn-ui
```

## Raspbian {#raspbian}

**Instructions**  
```
curl -fsSL https://repo.ivpn.net/stable/raspbian/generic.gpg | sudo apt-key add -
curl -fsSL https://repo.ivpn.net/stable/raspbian/generic.list | sudo tee /etc/apt/sources.list.d/ivpn.list
sudo apt-get update
sudo apt-get install ivpn
sudo apt-get install ivpn-ui
```

## Fedora {#fedora}

**Repo file to install**  
```
https://repo.ivpn.net/stable/fedora/generic/ivpn.repo
```

**Instructions**  
```
sudo dnf config-manager --add-repo https://repo.ivpn.net/stable/fedora/generic/ivpn.repo
sudo dnf install ivpn
sudo dnf install ivpn-ui
```

## CentOS {#centos}

**Repo file to install**  
```
https://repo.ivpn.net/stable/centos/generic/ivpn.repo
```

**Instructions**  
```
sudo yum install yum-utils
sudo yum-config-manager --add-repo https://repo.ivpn.net/stable/centos/generic/ivpn.repo
sudo yum install ivpn
sudo yum install libXScrnSaver
sudo yum install ivpn-ui
```

## RHEL {#rhel}

**Repo file to install**

```
https://repo.ivpn.net/stable/rhel/8/ivpn.repo
```

## OpenSUSE {#opensuse}

**Repo file to install**

```
https://repo.ivpn.net/stable/opensuse/generic/ivpn.repo
```

## Arch Linux {#arch-linux}

AUR - ArchLinux User Repository. Can be used by distributions based on ArchLinux: (e.g. ArchLinux, Manjaro ...)

Base package: [ivpn](https://aur.archlinux.org/packages/ivpn/)  
UI package [ivpn-ui](https://aur.archlinux.org/packages/ivpn-ui/)  

## Source Code and Changelog {#source}

### Base Package

Base package contains everything you need to connect to IVPN with command line interface. IVPN GUI app is provided as a separate package you can find below.

[View source on GitHub](https://github.com/ivpn/desktop-app-cli)  
[Changelog](https://github.com/ivpn/desktop-app-cli/blob/master/CHANGELOG.md)  

### IVPN GUI App

Please note: base package is required to be installed prior to installing GUI app.

[View source on GitHub](https://github.com/ivpn/desktop-app-ui2)  
[Changelog](https://github.com/ivpn/desktop-app-ui2/blob/master/CHANGELOG.md)  

## Features {#features}

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

{{< figure class="features__image--light" src="/images-static/uploads/apps/linux-app-light@2x.png" alt="IVPN for Linux - Open-source VPN app for Linux" >}}
{{< figure class="features__image--dark" src="/images-static/uploads/apps/linux-app-dark@2x.png" alt="IVPN for Linux - Open-source VPN app for Linux" >}}

## Manual configuration {#manual-configuration}

If you prefer not to use the IVPN app please follow the relevant setup guide below.

If you are using OpenVPN download the latest [OpenVPN configuration files](/releases/config/ivpn-openvpn-config.zip).

* [OpenVPN using NetworkManager Setup Guide](/setup/linux-netman/)
* [OpenVPN using terminal Setup Guide](/setup/linux-terminal/)
* [Linux IPSec with IKEv2 Setup Guide](/setup/linux-ipsec-with-ikev2/)
* [WireGuard using terminal Setup Guide](/setup/linux-wireguard/)
* [WireGuard using NetworkManager Setup Guide](/setup/linux-wireguard-netman/)
