---
title: WireGuard Setup guide for pfsense
h2: pfSense® WireGuard® Setup Guide
listItem: pfSense WireGuard
url: /setup/router/pfsense-wireguard/
section: Router Setup
platform: router
layout: setup-article
weight: 31
contents:
- item:
    title: WireGuard Configuration
    anchor: config
- item:
    title: Interfaces
    anchor: interfaces
- item:
    title: Firewall
    anchor: firewall
- item:
    title: Static Routing
    anchor: routing
- item:
    title: DNS
    anchor: dns
- item:
    title: DNS Resolver
    anchor: resolver
- item:
    title: Final Steps
    anchor: final
---
<div markdown="1" class="notice notice--warning">
This guide was produced using pfSense v2.5.2.
</div>

### Set WireGuard Configuration {#config}

#### Install the Package

1. Click `System` > `Package Manager` and go to `Available Packages`.
2. Search for "wire" and install the **WireGuard** package.

#### Add a Tunnel

1. In your pfSense device, navigate  to `VPN` > `WireGuard` and click `+ Add Tunnel`.
2. Check `Enabled`.
3. Enter a `Description`, like **IVPN WG**.
4. Upload the **Public key** and obtain a client IP address:
    - In the `Tunnel Configuration` > `Interface Keys` section, click the `Generate` key button, copy the **Public key**, then go to the **IVPN Account Area** by logging in to the [ivpn.net website](https://www.ivpn.net/account/login/).
    - Click the `WireGuard` tab in the **IVPN Account Area** and click `Add a new key`.
    - Paste the **Public key** and click the `Add` button to obtain a **172.x.y.z** client IPv4 address and a **fd00:4956:504e:ffff::wxyz:wxyz** client IPv6 address.
5. Enter the client IP address into `Address` field.  For IPv4 addresses, like **172.x.y.z**, choose `32` from the subnet mask dropdown.  For IPv6 addresses, like **fd00:4956:504e:ffff::wxyz:wxyz**, choose `128` from the subnet mask dropdown.
    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> It is possible to use a "simplified" IPv6 address.  Use the IPv6 prefix and add the IPv4 address: <strong>fd00:4956:504e:ffff::172.x.y.z</strong>.  pfSense and other WireGuard clients accept both forms.
    </div>
6. Click the `Save Tunnel` button and click the `Apply Changes` button.
<div markdown="1" class="notice notice--warning">
Be sure to copy the <strong>Public Key</strong> and not the <strong>Private Key</strong>. The <strong>Private Key</strong> must always be kept a carefully guarded secret.
</div>

#### Add a Peer

1. On the new tunnel line (**tun_wg0**), click the `Add Peer` icon (head and shoulders with a + sign) under the **Actions** column and enter the following:
    * `Description`: Describe the VPN server, like **IVPN Ukraine**
    * `Dynamic Endpoint`: Unchecked.  
    * `Endpoint`: IP address or hostname of IVPN's WireGuard server, hostnames are available on the [IVPN server status page](https://www.ivpn.net/status)
	- To turn the hostname for the Ukraine server (ua.wg.ivpn.net) into an IP address (176.103.57.129), for example, run `nslookup ua.wg.ivpn.net` in a **Command Prompt** on Windows or **Terminal** on macOS or Linux or via `Diagnostics` > `Command Prompt` > `Execute Shell Command` in the pfSense web interface:  
	> $ nslookup ua.wg.ivpn.net  
	> ...  
	> Name:   ua.wg.ivpn.net  
	> Address: 176.103.57.129  
    * `Endpoint Port`: Choose one of 53, 2049, 2050, 30587, 41893, 48574, or 58237, all are equally secure
    * `Keep Alive`: 25 seconds is reasonable
    * `Public key`: IVPN WireGuard server's key, available on the [IVPN server status page](https://www.ivpn.net/status)
    * `Allowed IPs`: For IPv4 addresses, enter **0.0.0.0/0**.  For IPv6 addresses, enter **::/0**
2. Click the `Save Peer` button and click the `Apply Changes` button.

![](/images-static/uploads/pf-wg-10-peer.png)

### Interfaces {#interfaces}

1. Navigate to `Interfaces` > `Assignments` and click the `+ Add` button beside `Available networks ports: tun_wg0`.  The interface becomes **OPT1** (or another OPT*).
2. Click the `Save` button.
3. Click the `OPT1` interface name link and put a check mark beside `Enable`.
4. Change the `Description` from **OPT1** to **WG_IVPN**
5. IPv4:
    * Set `IPv4 Configuration Type` to **Static IPv4**
    * In the `Set IPv4 Configuration` section, set the `IPv4 Address` to the same **172.x.y.z** IP address that was assigned in the Account Area.  The subnet mask is **/32**
    * Beside `IPv4 Upstream Gateway`, click the `+ Add a new gateway` button
    * Change the `Gateway name` to **WG_IVPN_GWV4**
    * Set `Gateway IPv4` to same **172.x.y.z** IP address that was assigned in the IVPN website **Account Area**
    * Click the `+ Add` button on the **New Gateway** popup
6. IPv6:
    * Set `IPv6 Configuration Type` to **Static IPv6**
    * In the `Set IPv6 Configuration` section, set the `IPv6 Address` to the same **fd00:4956:504e:ffff::wxyz:wxyz** IP address that was assigned in the Account Area (or use the "simplified" IPv6 address).  The subnet mask is **/128**
    * Beside `IPv6 Upstream Gateway`, click the `+ Add a new gateway` button
    * Change the `Gateway name` to **WG_IVPN_GWV6**
    * Set `Gateway IPv6` to same **fd00:4956:504e:ffff::wxyz:wxyz** IP address that was assigned in the Account Area (or use the "simplified" IPv6 address)
    * Click the `+ Add` button on the **New Gateway** popup
7. Click the `Save` button and click the `Apply Changes` button.
8. Navigate to `Interfaces` > `LAN` and set `MSS` to **1412**
9. Click the `Save` button and click the `Apply Changes` button.

![](/images-static/uploads/pf-wg-15-interface.png)

### Firewall {#firewall}

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
    - `Address Family`: **IPv4**
    - `Protocol`: **Any**
    - `Source`: **LAN net**
    - Add an optional `Description`
    - Click `Extra Options` > `Display Advanced` and scroll down to `Gateway` and set it to the WG_IVPN gateway **WG_IVPN_GWV4**
2. Click the `Save` button and click the `Apply Changes` button.
3. If your LAN includes IPv6, create another firewall rule following step #1 above.  Set `Address Family` to **IPv6** and set `Advanced` > `Gateway` to **WG_IVPN_GWV6**, then click `Save` and `Apply Changes`.
4. Disable the default WAN access firewall rules on the  `Firewall` > `Rules` > `LAN` page:
    - Click the green check marks beside the `Default allow` rules for IPv4* and IPv6* to turn them off.
    - Click the `Apply Changes` button.

![](/images-static/uploads/pf-wg-30-fw-rules-lan.png)

#### Additional Kill Switch Configuration

1. Navigate to `Firewall` > `Rules` > `Floating`, click on the `Add` button and create the rule to reject all traffic on WAN interface:
    - `Action`: **Reject**
    - `Quick`: **Check**
    - `Interface`: **WAN**
    - `Direction`: **Any**
    - `Address Family`: **IPv4+IPv6**
    - `Protocol`: **Any**
    - `Description`: **Reject all WAN traffic**
    - `Save`
2. Click on the `Add (top)` button again and create another rule to allow the traffic from WAN interface to VPN server:
    - `Action`: **Pass**
    - `Quick`: **Check**
    - `Interface`: **WAN**
    - `Direction`: **Any**
    - `Address Family`: **IPv4**
    - `Protocol`: **Any**
    - `Destination` > `Single host or alias` > `176.103.57.129`
    - `Description`: **Allow traffic to VPN server**
    - `Save`
3. Ensure that 'Reject' rule resides below the 'Allow' one, otherwise drag it down manually.
4. Click the `Save` button and click the `Apply Changes` button.

![](/images-static/uploads/pf-wg-50-killswitch.png)

### Static Routing {#routing}

1. Navigate to `System` > `Routing` > `Static routes` tab.
2. Click the `Add` button and configure the routes as follows:
    - `Destination network`: The IP address of the WireGuard server `176.103.57.129`
    - `Gateway`: Your router's `WAN` gateway
    - `Description`: "WAN to VPN"
    - Click `Save`
3. Navigate to `System` > `Routing` > `Gateways` tab and set `Default gateway IPv4` to **WG_IVPN_GWV4** and set `Default gateway IPv6` to **WG_IVPN_GWV6**.
4. Click `Save` and `Apply changes`.

![](/images-static/uploads/pf-wg-35-routing.png)

### DNS {#dns}

1. Navigate to `System` > `General Setup` > `DNS` and set the `DNS Servers` > `Address` to one of the three internal DNS server options:
    - *172.16.0.1* = regular DNS with no blocking
    - *10.0.254.2* = standard AntiTracker to block advertising and malware domains
    - *10.0.254.3* = Hardcore Mode AntiTracker to also block Google and Facebook domains
2. Set the `Gateway` to the WG_IVPN gateway **WG_IVPN_WGV4**
3. Uncheck `DNS Server Override` and click the `Save` button.
![](/images-static/uploads/pf-wg-40-dns.png)
4. Navigate to `Services` > `DHCP Server` and set the `DNS Servers` > `DNS Server 1` to the DNS server you chose in step #1 above.
5. Click `Save`.

### DNS Resolver {#resolver}

1. Navigate to `Services` > `DNS Resolver` and have `Enable DNSSEC` checked.
2. Check `Enable Forwarding Mode` beside `DNS Query Forwarding`.
3. Click the `Save` button and click the `Apply Changes` button.

### Final Steps {#final}

1. A device reboot is not required, though it may be useful to confirm that everything behaves as expected.
2. Run a leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) via one of the internal network clients attached to your pfSense router.
3. Use `curl` on the pfSense router to confirm the router's traffic uses the VPN connection:
    - Go to `Diagnostics` > `Command Prompt`.
    - For IPv4, enter `curl -4 ifconfig.co` in the `Execute Shell Command` box, then press `Execute`.
    - For IPv6, enter `curl -6 ifconfig.co` in the `Execute Shell Command` box, then press `Execute`.
    - In both cases, the IP address on the last line of the shell output is the VPN server.

**Please note:** If you plan to use a Multi-hop setup please see [this guide](/knowledgebase/general/how-can-i-connect-to-the-multihop-network/) and make the required changes to the `Endpoint Address` port and `Peer Public Key`. 