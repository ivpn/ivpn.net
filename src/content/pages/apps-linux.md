---
title: IVPN for Linux - Open-source VPN app for Linux
description: IVPN for Linux offers you comprehensive privacy leak protection with the IVPN firewall, automatic connection on insecure Wi-Fi and Multi-hop.
h1: IVPN for Linux
subtitle: In open beta - supports 64-bit Linux 3.10+
url: /apps-linux/
platform: linux
layout: apps-single
imageLight: /images-static/uploads/apps/linux-app-3.3.7-light@2x.png
imageDark: /images-static/uploads/apps/linux-app-3.3.7-dark@2x.png
contents:
- item:
    title: Features
    anchor: features
- item:
    title: Packages
    anchor: packages
- item:
    title: Install from IVPN Repository
    anchor: install
    subitems:
    - item:
        title: Ubuntu
        anchor: ubuntu
    - item:
        title: Debian
        anchor: debian
    - item:
        title: Mint
        anchor: mint
    - item:
        title: Fedora
        anchor: fedora
    - item:
        title: CentOS
        anchor: centos
    - item:
        title: Arch Linux
        anchor: arch
- item:
    title: Install from Binaries
    anchor: binaries
- item:
    title: Install from Source Code
    anchor: source
- item:
    title: Signature Verification
    anchor: signature-verification
- item:
    title: Useful Links
    anchor: useful-links
---
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

## Packages {#packages}

### Base Package  

Base package contains everything you need to connect to IVPN with command line interface. IVPN GUI app is provided as a separate package you can find below.  
[Base Package Daemon Changelog](https://github.com/ivpn/desktop-app-daemon/blob/master/CHANGELOG.md)  
[Base Package CLI Changelog](https://github.com/ivpn/desktop-app-cli/blob/master/CHANGELOG.md)  

### IVPN GUI App  

Please note: base package is required to be installed prior to installing GUI app.  
[GUI App Changelog](https://github.com/ivpn/desktop-app-ui2/blob/master/CHANGELOG.md)  

## Install from IVPN Repository {#install}

### Ubuntu {#ubuntu}

{{< highlight shell >}}
# Add IVPN's GPG key
$ curl -fsSL https://repo.ivpn.net/stable/ubuntu/generic.gpg | sudo apt-key add -
# Add the IVPN repository
$ curl -fsSL https://repo.ivpn.net/stable/ubuntu/generic.list | sudo tee /etc/apt/sources.list.d/ivpn.list
# Update APT repo info
$ sudo apt-get update
# To install IVPN software (CLI and UI)
$ sudo apt-get install ivpn-ui
# To install only IVPN CLI
$ sudo apt-get install ivpn
{{< /highlight >}}

### Debian {#debian}

{{< highlight shell >}}
# Add IVPN's GPG key
$ curl -fsSL https://repo.ivpn.net/stable/debian/generic.gpg | sudo apt-key add -
# Add the IVPN repository
$ curl -fsSL https://repo.ivpn.net/stable/debian/generic.list | sudo tee /etc/apt/sources.list.d/ivpn.list
# Update APT repo info
$ sudo apt-get update
# To install IVPN software (CLI and UI)
$ sudo apt-get install ivpn-ui
# To install only IVPN CLI
$ sudo apt-get install ivpn
{{< /highlight >}}

### Mint {#mint}

{{< highlight shell >}}
# Add IVPN's GPG key
$ curl -fsSL https://repo.ivpn.net/stable/mint/generic.gpg | sudo apt-key add -
# Add the IVPN repository
$ curl -fsSL https://repo.ivpn.net/stable/mint/generic.list | sudo tee /etc/apt/sources.list.d/ivpn.list
# Update APT repo info
$ sudo apt-get update
# To install IVPN software (CLI and UI)
$ sudo apt-get install ivpn-ui
# To install only IVPN CLI
$ sudo apt-get install ivpn
{{< /highlight >}}

### Fedora {#fedora}

{{< highlight shell >}}
# Add the IVPN repository
$ sudo dnf config-manager --add-repo https://repo.ivpn.net/stable/fedora/generic/ivpn.repo
# To install IVPN software (CLI and UI)
$ sudo dnf install ivpn-ui
# To install only IVPN CLI
$ sudo dnf install ivpn
{{< /highlight >}}

### CentOS {#centos}

{{< highlight shell >}}
# Install Yum-utils
$ sudo yum install yum-utils
# Add the IVPN repository
$ sudo yum-config-manager --add-repo https://repo.ivpn.net/stable/centos/generic/ivpn.repo
# To install IVPN software (CLI and UI)
$ sudo yum install ivpn-ui
# To install only IVPN CLI
$ sudo yum install ivpn
# Required for CentOS 8
$ sudo yum install libXScrnSaver
{{< /highlight >}}

### Arch Linux {#arch}

AUR - ArchLinux User Repository. Can be used by distributions based on ArchLinux: (e.g. ArchLinux, Manjaro ...)

Base package: [ivpn](https://aur.archlinux.org/packages/ivpn/)  
UI package: [ivpn-ui](https://aur.archlinux.org/packages/ivpn-ui/)  

## Install from Binaries {#binaries}

### .DEB

[Base package](https://repo.ivpn.net/stable/pool/ivpn_3.3.7_amd64.deb)  
SHA256: 6b32903eaedd3e5b922d1eb16cb97a88132cc7cce7a7793f31c50edbdadb1458  

[UI package](https://repo.ivpn.net/stable/pool/ivpn-ui_3.3.10_amd64.deb)  
SHA256: 6942ed6d18214b5767baa7145cdc05e6a2772d5eb2608c25e56ce4426224bd51  

### .RPM

[Base package](https://repo.ivpn.net/stable/pool/ivpn-3.3.7-1.x86_64.rpm)  
SHA256: 49b3aabccb7a4324006b7de8607a0870dee34f84d98c8657809fbebe1fa5c6db  

[UI package](https://repo.ivpn.net/stable/pool/ivpn-ui-3.3.10-1.x86_64.rpm)  
SHA256: 98d897e5c988ca58f3195b542342bc0e8f0e5de5982713a190f4eab53b90f78e  

## Install from Source Code {#source}

[Base package Daemon on GitHub](https://github.com/ivpn/desktop-app-daemon#linux)  
[Base package CLI on GitHub](https://github.com/ivpn/desktop-app-cli#linux-1)  
[UI package on GitHub](https://github.com/ivpn/desktop-app-ui2#installation)  

## Signature Verification {#signature-verification}

Each Linux binary is signed by a GPG key.

GPG key location:

* for DEB files: `<repository path>/generic.gpg` (example: `https://repo.ivpn.net/stable/ubuntu/generic.gpg`)
* for RPM files: `<repository path>/repo.gpg` (example: `https://repo.ivpn.net/stable/fedora/generic/repo.gpg`)

## Useful Links {#useful-links}

If you prefer not to use the IVPN app please follow the relevant setup guide below.

If you are using OpenVPN download the latest OpenVPN [UDP](/releases/config/ivpn-openvpn-config.zip) or [TCP](/releases/config/ivpn-openvpn-config-tcp.zip) configuration files. In most cases, you want to use the UDP Protocol.

* [OpenVPN using NetworkManager Setup Guide](/setup/linux-netman/)
* [OpenVPN using terminal Setup Guide](/setup/linux-terminal/)
* [Linux IPSec with IKEv2 Setup Guide](/setup/linux-ipsec-with-ikev2/)
* [WireGuard using terminal Setup Guide](/setup/linux-wireguard/)
* [WireGuard using NetworkManager Setup Guide](/setup/linux-wireguard-netman/)
