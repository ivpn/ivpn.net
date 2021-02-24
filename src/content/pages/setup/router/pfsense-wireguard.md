---
title: WireGuard Setup guide for pfsense
listItem: pfSense WireGuard
url: /setup/router/pfsense-wireguard/
section: Router Setup
platform: router
layout: setup-article
weight: 31
---
## pfSense® WireGuard® Setup Guide

### Set WireGuard Configuration

#### Add a Tunnel

1. In your pfSense device, navigate  to `VPN` > `WireGuard` and click `+ Add Tunnel`.
2. Check `Enabled`.
3. Enter a `Description`, like **IVPN WG**.
4. Upload the **Private key** and obtain a client IP address:
    - Click the `Generate` key button, copy the **Public key**, then go to the **IVPN Account Area** by logging in to the [ivpn.net website](https://www.ivpn.net/account/login/).
    - Click the `WireGuard` tab in the **IVPN Account Area** and click `Add a new key`.
    - Paste the **Public key** and click the `Add` button to obtain a **172.x.y.z** client IP address.
5. Enter the client IP address into `Address` field with `/32` appended, like **172.x.y.z/32**
<div markdown="1" class="notice notice--warning">
Be sure to copy the <strong>Public Key</strong> and not the <strong>Private Key</strong>. The <strong>Private Key</strong> must always be kept a carefully guarded secret.
</div>

#### Add a Peer

1. Click the `+ Add peer` button and enter the following:
    * `Description`: Describe the VPN server, like **IVPN Ukraine**
    * `Endpoint`: IP address of IVPN's WireGuard server, hostnames are available on the [IVPN server status page](https://www.ivpn.net/status).
	- To turn the hostname for the Ukraine server (ua.wg.ivpn.net) into an IP address (176.103.57.129), for example, run `nslookup ua.wg.ivpn.net` in a **Command Prompt** on Windows or **Terminal** on macOS or Linux or via `Diagnostics` > `Command Prompt` > `Execute Shell Command` in the pfSense web interface:  
	> $ nslookup ua.wg.ivpn.net  
	> ...
	> Name:   ua.wg.ivpn.net  
	> Address: 176.103.57.129  
    * `Endpoint Port`: Choose one of 53, 2049, 2050, 30587, 41893, 48574, or 58237, all are equally secure
    * `Keep Alive`: 25 seconds is reasonable
    * `Public key`: IVPN WireGuard server's key, available on the [IVPN server status page](https://www.ivpn.net/status).
    * `Allowed IPs`: Enter **0.0.0.0/0**
    * `Peer WireGuard Address`: IVPN WireGuard server's default gateway, **172.16.0.1**
2. Click the `Update` button on the `Peer` pop-up and click the `Save` button.

![](/images-static/uploads/pf-wg-10-peer.png)

### Interfaces

1. Navigate to `Interfaces` > `Assignments` and click the `+ Add` button beside `Available networks ports: wg0`.  The interface becomes **OPT1** (or another OPT*).
2. Click the `Save` button.
3. Click the `OPT1` interface name link and put a check mark beside `Enable`.
4. Change the `Description` from **OPT1** to **WG_IVPN**
5. Click the `Save` button and click the `Apply Changes` button.
6. Navigate to `Interfaces` > `LAN` and set `MSS` to **1412**
7. Click the `Save` button and click the `Apply Changes` button.

### Firewall

#### NAT

1. Navigate to `Firewall` > `NAT` > `Outbound` and change the mode to **Manual**.
2. Click the `Save` button and click the `Apply Changes` button.
3. Look for the entry that contains your local network subnet (the one that does not contain port "500" or IP address "127.0.0.0" entries, this might be 192.168.1.0/24) and click on the `Pen icon (Edit mapping)`.
4. Change `Interface` to **WG_IVPN** and change `Description` to mention the VPN, like **LAN to IVPN**.
5. Click the `Save` button and click the `Apply Changes` button.
6. Delete the other rule(s) containing your local network subnet that exist via WAN, (keep the 127.0.0.0). This will ensure that traffic does not leak if the VPN tunnel accidentally goes down.
7. Click the `Apply Changes` button.

![](/images-static/uploads/pf-wg-20-fw-nat-outbound.png)

#### Rules

1. Navigate to `Firewall` > `Rules` > `LAN`, click the `Add (top)` button and set the following:
    - `Action`: **Pass**
    - `Interface`: **LAN**
    - `Protocol`: **Any**
    - `Source`: **LAN net**
    - Add an optional `Description`
    - Click `Extra Options` > `Display Advanced` and scroll down to `Gateway` and set it to the WG_IVPN gateway **WG_IVPN_WGV4**
2. Click the `Save` button and click the `Apply Changes` button.
3. Disable the default WAN access firewall rules on the  `Firewall` > `Rules` > `LAN` page:
    - Click the green check marks beside the `Default allow` rules for IPv4* and IPv6* to turn them off.
    - Click the `Apply Changes` button.

![](/images-static/uploads/pf-wg-30-fw-rules-lan.png)

#### Additional Kill switch configuration

1. Navigate to `Firewall` > `Rules` > `Floating`, click on the `Add` button and create the rule to block all traffic on WAN interface:
    - `Action`: **Reject**
    - `Quick`: **Check**
    - `Interface`: **WAN**
    - `Direction`: **Any**
    - `Address Family`: **IPv4+IPv6**
    - `Protocol`: **Any**
    - `Description`: **Block all WAN traffic**
    - `Save`
2. Click on the `Add (top)` button again and create another rule to allow the traffic from WAN interface to VPN server:
    - `Action`: **Pass**
    - `Quick`: **Check**
    - `Interface`: **WAN**
    - `Direction`: **Any**
    - `Address Family`: **IPv4+IPv6**
    - `Protocol`: **Any**
    - `Destination` > `Single host or alias` > `176.103.57.129`
    - `Description`: **Allow traffic to VPN server**
    - `Save`
3. Ensure that 'Reject' rule resides below the 'Allow' one, otherwise drag it down manually.
4. Click the `Save` button and click the `Apply Changes` button.

![](/images-static/uploads/pf-wg-50-killswitch.png)

### Static routing

1. Navigate to `System` > `Routing` > `Static routes` tab
2. Click the `Add` button and configure the routes as follows:
    - `Destination network`: The IP address of the WireGuard server `176.103.57.129`
    - `Gateway`: your router's `WAN` gateway
    - `Description`: "WAN to VPN"
    - Click `Save`
3. Navigate to `System` > `Routing` > `Gateways` tab and set `Default gateway IPv4` to `WG_IVPN_WGV4`
4. Click `Save` and `Apply changes`.

![](/images-static/uploads/pf-wg-35-routing.png)

### DNS

1. Navigate to `System` > `General Setup` > `DNS Server Settings` and set the `DNS Servers` > `Address` to `172.16.0.1`
2. Set the `Gateway` to the WG_IVPN gateway **WG_IVPN_WGV4**
3. Uncheck `DNS Server Override` and click the `Save` button.
![](/images-static/uploads/pf-wg-40-dns.png)
4. Navigate to `Services` > `DHCP Server` and set the `DNS Servers` > `DNS Server 1` to one of the three internal IVPN DNS server options:

    - *172.16.0.1* = regular DNS with no blocking
    - *10.0.254.2* = standard AntiTracker to block advertising and malware domains
    - *10.0.254.3* = Hardcore Mode AntiTracker to also block Google and Facebook
5. Click `Save`.

### DNS Resolver

1. Navigate to `Services` > `DNS Resolver` and have `Enable DNSSEC` checked.
2. Check `Enable Forwarding Mode` beside `DNS Query Forwarding`.
3. Click the `Save` button and click the `Apply Changes` button.

### Final Steps

1. A device reboot is not required, though it may be useful to confirm that everything behaves as expected.
2. Run a leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) via one of the internal network clients attached to your pfSense router.
