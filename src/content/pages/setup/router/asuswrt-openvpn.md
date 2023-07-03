---
title: VPN Setup guide for Asuswrt
listItem: Asuswrt OpenVPN
url: /setup/router/asuswrt-openvpn/
section: Router Setup
platform: router
layout: setup-article
weight: 47
---
## Asuswrt OpenVPN Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using Asus stock firmware v3.0.0.4.388_21732
</div>

### Configuring the VPN tunnel

1. [Generate and download](/openvpn-config) the .zip archive containing the OpenVPN config file with the selected server and configuration

2. Extract the archive, launch the web browser and enter the IP address of your router, which is usually `192.168.1.1`

3. Once logged in, navigate to `VPN` – `VPN Fusion` tab & click on the `Add profile` button

    ![](/images-static/uploads/asuswrt-openvpn-1.png)

4. Give the profile any name, select `OpenVPN` from the **VPN type** drop list, click on the `Import .ovpn file` button and open the extracted earlier .ovpn config file

5. Enter your IVPN account id in the `Username` field (i-XXXX-XXXX-XXXX or ivpnXXXXXXXX) and any string into the `Password` field, e.g. 'ivpn'. Click `Apply and Enable`

    ![](/images-static/uploads/asuswrt-openvpn-2.png)

6. To manage the connection, toggle the switch next the created VPN profile On or Off

    ![](/images-static/uploads/asuswrt-openvpn-3.png)

### DNS

1. Navigate to `LAN` - `DHCP Server`

2. Set `Advertise router's IP in addition to user-specified DNS` to **No**

3. Enter one of the following DNS servers in the `DNS Server 1` field:

    * 10.0.254.1 = redular DNS with no blocking (10.0.254.101 for Multi-hop connections)
    * 10.0.254.2 = standard AntiTracker to block advertising and malware domains
    * 10.0.254.3 = AntiTracker Hardcore Mode to additionally block all domains owned by Google and Facebook

4. Click `Apply`

    ![](/images-static/uploads/asuswrt-openvpn-4.png)

### Final steps

1. Reboot your router and wait for a minute or two for everything to settle, then reboot your computer system

2. To confirm that you are connected to the IVPN network, check the connection status tool on our website and run a dns leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) from any devices connected to your Asus router