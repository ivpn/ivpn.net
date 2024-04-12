---
title: VPN Setup guide for Asuswrt
listItem: Asuswrt WireGuard
url: /setup/router/asuswrt-wireguard/
section: Router Setup
platform: router
layout: setup-article
weight: 48
---
## Asuswrt WireGuard Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using Asus stock firmware v3.0.0.4.388_21732
</div>

### Configuring the VPN tunnel

1. [Generate and download](/account/wireguard-config) the .zip archive containing the WireGuard config file with the selected server and configuration

    <div markdown="1" class="notice notice--info">
    WireGuard config file generator is only available for accounts that were created after November 2020 (account ID format: i-XXXX-XXXX-XXXX). If you have an IVPN subscription created before this date (account ID format: ivpnXXXXXXXX), and wish to make use of the config file generator, contact our customer service to help you make the switch.
    </div>

2. Extract the archive, launch the web browser and enter the IP address of your router, which is usually `192.168.1.1`

3. Once logged in, navigate to `VPN` – `VPN Fusion` tab & click on the `Add profile` button

    ![](/images-static/uploads/asuswrt-wireguard-1.png)

4. Give the profile any name, select `WireGuard` from the **VPN type** drop list, click on the `Upload Config` button and import the extracted earlier config file

    ![](/images-static/uploads/asuswrt-wireguard-2.png)

5. Scroll down, remove the extra characters in the `Endpoint Port` field, leaving the port number selected in the config file generator and click on the `Apply and Enable` button

    ![](/images-static/uploads/asuswrt-wireguard-3.png)

6. To manage the connection, toggle the switch next to the created VPN profile On or Off

    ![](/images-static/uploads/asuswrt-wireguard-4.png)

### Final steps

1. Reboot your router and wait for a minute or two for everything to settle, then reboot your computer system

2. To confirm that you are connected to the IVPN network, check the connection status tool on our website and run a dns leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) from any devices connected to your Asus router