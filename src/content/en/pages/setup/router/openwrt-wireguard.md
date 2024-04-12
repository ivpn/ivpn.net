---
title: WireGuard Setup guide for OpenWrt
listItem: OpenWrt WireGuard
url: /setup/router/openwrt-wireguard/
section: Router Setup
platform: router
layout: setup-article
weight: 21
---
## OpenWrt WireGuard Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using OpenWrt v.23.05
</div>

### Installing required packages

1. In your router's webUI, navigate to `System` - `Software`, click `Update lists`.

2. In the **Filter** field, type **WireGuard**, locate and install the **wireguard-tools**, **kmod-wireguard**, and **luci-proto-wireguard** packages.<br></br>
![](/images-static/uploads/openwrt-wireguard-0.png)

3. Restart your router.

### Creating an Interface

1. [Generate](/account/wireguard-config) a WireGuard config file with the preferred server and parameters. Extract the archive, open the file with any text editors and copy its contents.

    <div markdown="1" class="notice notice--info">
    WireGuard config file generator is only available for accounts that were created after November 2020 (account ID format: i-XXXX-XXXX-XXXX). If you have an IVPN subscription created before this date (account ID format: ivpnXXXXXXXX) and wish to make use of the feature, contact our customer service to help you make the switch.
    </div>

2. In OpenWRT, navigate to `Network` - `Interfaces`, click on the `Add new interface`. Give it any name, e.g. **ivpnAustria**, set `Protocol` to `WireGuard VPN`, then click on the `Create interface` button.

3. In the `General Settings` tab, click on the `Load configuration...` button, paste the contents of the WireGuard config file from step 1 and click on the `Import settings` button.<br></br>
![](/images-static/uploads/openwrt-wireguard-1.png)

4. In the `Advanced Settings` tab, set `MTU` to `1412`.

5. In the `Peers` tab, click `Edit` next to the imported peer configuration, check the `Route Allowed IPs` option, set `Persistent Keep Alive` to `25` and click `Save`.<br></br>
![](/images-static/uploads/openwrt-wireguard-2.png)

6. Click `Save & Apply`.

### Adding a Firewall zone

1. Navigate to `Network` - `Firewall`

2. Click the `Add` button and enter the following configuration:

    * Name - Give it any name, e.g. **ivpn_fw**
    * Input - **Reject**
    * Output - **Accept**
    * Forward - **Reject**
    * Masquerading - **Checked**
    * MSS clamping - **Checked**
    * Covered networks - select the previously created VPN tunnel interface, e.g. **ivpnAustria**
    * Allow forward to destination zones - **Unspecified**
    * Allow forward from source zones - **lan**<br></br>
![](/images-static/uploads/install-wireguard-openwrt-06.png)<br></br>

3. Click `Save` & `Save & Apply`

### Configuring a Kill-switch (optional)

To ensure the traffic on your LAN devices travels strictly via the VPN tunnel and to prevent any possible leaks if the router disconnects from the VPN server for any reason, edit your lan firewall zone and remove **WAN** from the `Allow forward to destination zones` field, then click `Save` & `Save & Apply` buttons.<br></br>
![](/images-static/uploads/install-wireguard-openwrt-07.png)

### DNS

1. Navigate to `Network` - `Interfaces`

2. Click on the `Edit` button next to the **WAN** interface

3. In the `Advanced Settings` tab, uncheck the `Use DNS servers advertised by peer` and enter the WireGuard regular DNS server IP address (172.16.0.1) or the one associated with the preferred [AntiTracker](/knowledgebase/troubleshooting/what-is-the-ip-address-of-your-dns-servers/) list.<br></br>
![](/images-static/uploads/install-wireguard-openwrt-08.png)

4. Click `Save`.

5. If your ISP additionally provides you with an IPv6 IP address, repeat steps 2 to 4 for the **WAN6** interface.

6. Click `Save & Apply`.

### Final Steps

1. A device reboot is not required, though it may be useful to confirm that everything behaves as expected.
2. Run a leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) via one of the internal network clients attached to your OpenWRT router.