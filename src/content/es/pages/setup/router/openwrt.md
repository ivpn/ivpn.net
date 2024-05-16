---
title: OpenVPN Setup guide for OpenWrt
listItem: OpenWrt OpenVPN
url: /setup/router/openwrt-openvpn/
section: Router Setup
platform: router
layout: setup-article
weight: 20
---
## OpenWrt OpenVPN Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using OpenWrt v.19.07.2
</div>

### Install required packages

1. In your router's webUI, navigate to `System` - `Software`, click `Update lists`

2. In the **Filter** field, type **OpenVPN**, locate and install **openvpn-openssl** & **luci-app-openvpn** packages<br></br>
![](/images-static/uploads/install-openvpn-openwrt-01.png)
    
3. Restart your router
    <div markdown="1" class="notice notice--info">
    If you receive an error while attempting to install the 'luci-app-openvpn' package, check the 'Overwrite files from other package(s)' checkbox
    </div>

### Create a VPN profile

1. Download and extract our [config files](/openvpn-config) to your computer

2. In your router, navigate to `VPN` - `OpenVPN`

3. Under the **OVPN configuration file upload** section, `Browse` for the .ovpn config file with the VPN server you would like to connect to, give it any name, then click `Upload`

4. Click the `Edit` button next to the created OpenVPN instance and enter your IVPN account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' (case-sensitive) and any password (e.g. ivpn) in 2 separate lines in the text box at the bottom

5. Append the credentials file path to the **auth-user-pass** line in the first text box. The full path is visible just above the second text box, e.g. - `auth-user-pass /etc/openvpn/Austria.auth`. Click `Save`<br></br>
![](/images-static/uploads/install-openvpn-openwrt-02.png)

6. Replace the hostname of the VPN server in line 4 with its IP address - `remote 185.244.212.66 2049`.<br></br>
To turn the hostname of the server into an IP address use, e.g. the `nslookup at.gw.ivpn.net` command in your computer's terminal:
	> $ nslookup at.gw.ivpn.net  
	> ...  
	> Name:   at.gw.ivpn.net  
	> Address: 185.244.212.66

7. Click `Save`. Return to main `OpenVPN` section, check the `Enabled` checkbox and click on the `Save & Apply` button. 

### Create an Interface

1. Navigate to `Network` - `Interfaces`

2. Click on the `Add new interface` button and enter the following configuration:

    * Name - Give it any name, e.g. **ivpnAustria**
    * Protocol - **Unmanaged**
    * Interface - **tun0**<br></br>
![](/images-static/uploads/install-openvpn-openwrt-03.png)

3. `Create interface`

4. In the interface properties window, ensure that **Bring up on boot** is checked, then click `Save` & `Save & Apply` buttons.

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
![](/images-static/uploads/install-openvpn-openwrt-04.png)<br></br>
3. Click `Save` & `Save & Apply` buttons.

### Configure a Kill-switch (optional)

To ensure the traffic on your LAN devices travels strictly via the VPN tunnel and to prevent any possible leaks if the router disconnects from the VPN server for any reason, edit your lan firewall zone and remove **WAN** from the `Allow forward to destination zones` field, then click `Save` & `Save & Apply` buttons.<br></br>
![](/images-static/uploads/install-openvpn-openwrt-05.png)

### DNS

1. Navigate to `Network` - `Interfaces`

2. Click on the `Edit` button next to the **WAN** interface

3. In the `Advanced Settings` tab, uncheck the `User DNS servers advertised by peer` and specify one of the following DNS servers in the `Use custom DNS servers` field:

    - *10.0.254.1* = regular DNS with no blocking
    - *10.0.254.2* = standard AntiTracker to block advertising and malware domains
    - *10.0.254.3* = Hardcore Mode AntiTracker to also block Google and Facebook domains<br></br>
![](/images-static/uploads/install-openvpn-openwrt-06.png)

3. Click `Save` & `Save & Apply` buttons.

### Final Steps

1. A device reboot is not required, though it may be useful to confirm that everything behaves as expected.
2. Run a leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) via one of the internal network clients attached to your OpenWRT router.

**Please note:** If you plan to use a Multi-hop setup please see [this guide](/knowledgebase/general/how-can-i-connect-to-the-multihop-network/) and make the required changes in the .ovpn config file. 