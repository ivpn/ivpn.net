---
title: OPNSense OpenVPN Setup Guide
listItem: OPNsense OpenVPN
url: /setup/router/opnsense-openvpn/
section: Router Setup
platform: router
layout: setup-article
weight: 60
---
## OPNSense OpenVPN Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using OPNSense 21.7.1
</div>

### Add a Certificate

1. In your router's webUI, navigate to `System` > `Trust` > `Authorities` and click on the `+` button

2. Give it any name, i.e. "IVPN CA", select `Import an existing Certificate Authority`, then copy and paste the contents of our [ca.crt](/releases/config/ca.crt) file into the `Certificate Data` field

3. Click `Save`.

    ![](/images-static/uploads/install-openvpn-opnsense-01.png)

### Configure an OpenVPN Client

1. Choose an OpenVPN server from our [Server Status](/status/) page and make note of its hostname (this guide uses Ukranian server as an example - ua1.gw.ivpn.net)

2. Navigate to `VPN` > `OpenVPN` > `Clients`, click on the `+` button and enter the following configuration:

    *   Disabled - **Unchecked**
    *   Description - Give it any name, i.e. **IVPN Ukraine**
    *   Server Mode - **Peer to Peer (SSL/TLS)**
    *   Protocol - **UDP** or **TCP**
    *   Device mode - **tun**
    *   Interface - **WAN**
    *   Remote server - IVPN's server hostname, i.e. **ua1.gw.ivpn.net**
    *   Port - **2049** (or 53, 80, 443, 1194, 2050 for UDP and 80, 443, 1443 for TCP. All ports are equally secure)
    *   Username - Your IVPN account ID (**i-XXXX-XXXX-XXXX** or **ivpnXXXXXXXX** case-sensitive)
    *   Password - any string, i.e. **ivpn** <br></br>![](/images-static/uploads/install-openvpn-opnsense-02.png)<br></br>
    *   TLS Authentication - check the `Enable authentication of TLS packets` option then copy and paste the contents of our [ta.key](/releases/config/ta.key) file
    *   Peer Certificate Authority - **IVPN CA**
    *   Client Certificate - **None (Username and Password required)**
    *   Encryption algorithm - **CHACHA20-POLY1305 (256 bit key)** (AES-256-GCM & AES-256-CBC are also supported)
    *   Auth Digest Algorithm - **SHA1 (160bit)**
    *   Compression - **Legacy - Disabled LZO algorithm (--comp-lzo no)**<br></br>![](/images-static/uploads/install-openvpn-opnsense-03.png)<br></br>

3. Click `Save`.

### Create an Interface

1. Navigate to `Interfaces` > `Assignments`

2. Look for the interface with `ovpnc1` name, give it any description, i.e. "IVPNUkraine", then click on the `+` button and `Save`<br></br>![](/images-static/uploads/install-openvpn-opnsense-04.png)

3. Click on the newly added interface name, have the `Enable Interface` option checked and `Save` the changes.

### Configure Firewall

1. Navigate to `Firewall` > `NAT` > `Outbound`, select `Manual outbound NAT rule generation` and click `Save`

2. Click on the `+` button to add a new rule and fill in the following configuration:

    *   Disabled - **Unchecked**
    *   Interface - select the created earlier interface, i.e. **IVPNUkraine**
    *   Source Address - **LAN net**
    *   Translation / target - **Interface address**

3. Click `Save` and `Apply Changes`.<br></br>![](/images-static/uploads/install-openvpn-opnsense-06.png)

### DNS

1. Navigate to `Services` > `DHCPv4` > `[LAN]`

2. In the `DNS servers` field, specify one of the following DNS servers:

    * *10.0.254.1* = redular DNS with no blocking
    * *10.0.254.2* = standard AntiTracker to block advertising and malware domains
    * *10.0.254.3* = AntiTracker Hardcore Mode to also block Google and Facebook

3. Click `Save`.<br></br>![](/images-static/uploads/install-openvpn-opnsense-08.png)

### Final Steps

1. Restart your router device and check the status of the OpenVPN client in the `VPN` - `OpenVPN` - `Connection Status` area.<br></br>![](/images-static/uploads/install-openvpn-opnsense-10.png)

2. Check the conenction status and the assigned public IP address on our website and run a leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) from one of the devices connected to your OPNsense router.<br></br>![](/images-static/uploads/install-openvpn-opnsense-11.png)
