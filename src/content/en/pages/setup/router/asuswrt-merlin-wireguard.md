---
title: VPN Setup guide for Asuswrt-Merlin
listItem: Asuswrt-Merlin WireGuard
url: /setup/router/asuswrt-merlin-wireguard/
section: Router Setup
platform: router
layout: setup-article
weight: 50
---
## Asuswrt-Merlin WireGuard Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using Asuswrt-Merlin firmware v388.1
</div>

### Configuring the VPN tunnel

1. [Generate and download](/account/wireguard-config) the .zip archive containing the WireGuard config file with the selected server and configuration

    <div markdown="1" class="notice notice--info">
    WireGuard config file generator is only available for accounts that were created after November 2020 (account ID format: i-XXXX-XXXX-XXXX). If you have an IVPN subscription created before this date (account ID format: ivpnXXXXXXXX), and wish to make use of the config file generator, contact our customer service to help you make the switch.
    </div>

2. Extract the archive, launch the web browser and enter the IP address of your router, which is usually `192.168.1.1`

3. Once logged in, navigate to `VPN` – `VPN Client` tab - `WireGuard`

4. Click on the `Choose file` button. Select the extracted earlier config file, and hit the `Upload` button

5. Put any name into the `Description` field, set `Enable WireGuard` to **Yes**, and click `Apply`
    
    ![](/images-static/uploads/asuswrt-merlin-wireguard-1.png)

6. Navigate to `VPN` - `VPN Director` area, scroll down, and click on the `+` icon to add a new rule for routing devices on your local network via the WireGuard interface

    ![](/images-static/uploads/asuswrt-merlin-wireguard-2.png)

7. Fill in the following configuration:

    * `Interface` - select the recently created WireGuard interface
    * `Enable` - check
    * `Description` - give it any name
    * `Local IP` - the address of your local network (e.g. 192.168.1.0/24) or IP address/es of your local network device/s separated with a comma if you wish to use VPN only on specific device/s

    ![](/images-static/uploads/asuswrt-merlin-wireguard-3.png)

8. Click `OK` and `Apply`

### Final steps

1. Reboot your router and wait for a minute or two for everything to settle, then reboot your computer system

2. To confirm that you are connected to the IVPN network, check the connection status tool on our website and run a dns leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) from any devices connected to your Asus router