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
This guide was produced using OpenWrt v.19.07.8 and v.21.02.0
</div>

### Install required packages

1. In your router's webUI, navigate to `System` - `Software`, click `Update lists`

2. In the **Filter** field, type **WireGuard**, locate and install the **wireguard**, **wireguard-tools**, **kmod-wireguard**, and **luci-app-wireguard** packages.  Note: The **wireguard** package is included in version 21.02.<br></br>
![](/images-static/uploads/install-wireguard-openwrt-01.png)

3. Restart your router

### Generate WireGuard keypair

1. SSH into your router as 'root' ([OpenWrt Wiki](https://openwrt.org/docs/guide-quick-start/sshadministration)):<br></br>
    ># ssh root@192.168.1.1
2. Generate WireGuard keys:<br></br>
    ># wg genkey | tee privatekey | wg pubkey > publickey
    ># chmod 600 privatekey
3. Note your Private & Public keys, you will need them later:<br></br>
    ># cat privatekey
    ># cat publickey

### Obtain WireGuard IP address

1. Log into the [Client Area](/account/login/#id)
2. Navigate to `WireGuard` tab and click the `Add a new key` button<br></br>
![](/images-static/uploads/install-wireguard-openwrt-02.png)
3. Copy and paste the **Public key** obtained previously, give it any name, then click the `Add key` button and note the assigned IP address<br></br>
![](/images-static/uploads/install-wireguard-openwrt-03.png)

### Create an Interface

1. Navigate to `Network` - `Interface`, 
2. Click the `Add new interface...` button and enter the following configuration:

    * Name - give it any name, e.g. **ivpnAustria**
    * Protocol - **WireGuard VPN**

3. `Create interface`

4. In the `General Settings` tab:

    * Bring up on boot - **Checked**
    * Private Key - copy and paste the generated previously **Private key**
    * IP Address - enter the **WireGuard IP Address** obtained in the Client Area ending with **/32**, e.g. **172.27.123.169/32**<br></br>
![](/images-static/uploads/install-wireguard-openwrt-04.png)

5. In the `Advanced Settings` tab, set `MTU` to **1412**

6. In the `Peers` tab:

    * Description - give it any name, e.g. **Austria**
    * Public Key - the **IVPN WireGuard server public key**, available on the [IVPN server status page](https://www.ivpn.net/status)
    * Allowed IPs - **0.0.0.0/0**
    * Route Allowed IPs - **Checked**
    * Endpoint Host - an **IP address of IVPN WireGuard server**<br></br>
    Hostnames are available on the [IVPN server status page](https://www.ivpn.net/status). To turn the hostname of the server into an IP address use, e.g. the `nslookup at1.wg.ivpn.net` command in your computer's terminal:
	> $ nslookup at1.wg.ivpn.net  
	> ...  
	> Name:   at1.wg.ivpn.net  
	> Address: 185.244.212.69 
    * Endpoint Port - **53**, **80**, **443**, **1194**, **2049**, **2050**, **30587**, **41893**, **48574** or **58237**. All ports are equally secure
    * Persistent Keep Alive - **25** seconds is reasonable<br></br>
![](/images-static/uploads/install-wireguard-openwrt-05.png)

7. Click `Save` & `Save & Apply`

### Add a Firewall zone

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

3. In the `Advanced Settings` tab, uncheck the `Use DNS servers advertised by peer` and specify one of the following DNS servers in the `Use custom DNS servers` field:

    - *172.16.0.1* = regular DNS with no blocking
    - *10.0.254.2* = standard AntiTracker to block advertising and malware domains
    - *10.0.254.3* = Hardcore Mode AntiTracker to also block Google and Facebook<br></br>
![](/images-static/uploads/install-wireguard-openwrt-08.png)

4. Click the `Save` button.

5. For firmware version 21.02, repeat steps 2 to 4 for the **IVPN WireGuard** and **WAN6** interfaces.  For firmware version 19.07, repeat steps 2 to 4 for the **WAN6** interface.

6. Click the `Save & Apply` button.

### Final Steps

1. A device reboot is not required, though it may be useful to confirm that everything behaves as expected.
2. Run a leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) via one of the internal network clients attached to your OpenWRT router.
