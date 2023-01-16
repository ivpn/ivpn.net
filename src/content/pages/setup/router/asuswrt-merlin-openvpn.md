---
title: VPN Setup guide for Asuswrt-Merlin
listItem: Asuswrt-Merlin OpenVPN
url: /setup/router/asuswrt-merlin-openvpn/
section: Router Setup
platform: router
layout: setup-article
weight: 49
---
## Asuswrt-Merlin OpenVPN Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using Asuswrt-Merlin firmware v388.1
</div>

### Configuring the VPN tunnel

1. [Generate and download](/openvpn-config) the .zip archive containing the OpenVPN config file with the selected server and configuration

2. Extract the archive, launch the web browser and enter the IP address of your router, which is usually `192.168.1.1`

3. Once logged in, navigate to `VPN` – `VPN Client` tab - `OpenVPN`

4. Click on the `Choose file` button. Open the extracted earlier .ovpn config file, hit the `Upload` button and select the following configuration:
    
    * Put any name into the `Description` field
    * `Accept DNS Configuration` - **Exclusive** (this option ensures that only DNS server provided by the VPN server is used)
    * `Redirect Internet traffic through tunnel` - **Yes (all)**
    * (optional) `Automatic start at boot time` - **Yes**
    * (optional) `Killswitch - Block routed clients if tunnel goes down` - **Yes**

5. Enter your IVPN account id into the `Username` field (i-XXXX-XXXX-XXXX or ivpnXXXXXXXX) and any string into the `Password` field, e.g. 'ivpn'. Click `Apply`

6. Toggle `Service state` switch On to connect.

    ![](/images-static/uploads/asuswrt-merlin-openvpn-1.png)

### Final steps

1. Reboot your router and wait for a minute or two for everything to settle, then reboot your computer system

2. To confirm that you are connected to the IVPN network, check the connection status tool on our website and run a dns leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) from any devices connected to your Asus router