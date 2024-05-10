---
title: OPNSense WireGuard Setup Guide
listItem: OPNsense WireGuard
url: /setup/router/opnsense-wireguard/
section: Router Setup
platform: router
layout: setup-article
weight: 61
---
## OPNSense WireGuard Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using OPNSense 24.1.6
</div>

### Adding a WireGuard Peer

1. Navigate to the [Server Status](/status) page, select the WireGuard server you want to connect to and note its **Hostname** (xx.wg.ivpn.net) with the **WireGuard Public Key**.

2. In your router's webUI, navigate to `VPN` - `WireGuard` - `Instances` - `Peers` tab, click on the `+` button and fill in the following configuration:

    * Enabled - **Checked**
    * Name - give it any name, e.g. **WG_Austria**
    * Public key - the public key of the selected WireGuard server
    * Allowed IPs - **0.0.0.0/0**, **::/0**
    * Endpoint address - the hostname of the selected WireGuard server
    * Endpoint port - **2049** (available ports can be viewed [here](/knowledgebase/troubleshooting/how-do-i-change-the-port-or-protocol-used-to-connect/))
    * Keepalive interval - **25**

3. Click `Save`.<br></br>![](/images-static/uploads/install-wireguard-opnsense-01.png)

### Creating a WireGuard Instance

1. In the `Instances` tab, click on the `+` button.

2. Toggle the `Advanced mode` switch on and hit the `Gear` icon next to the `Public key` to generate a new WireGuard keypair. Copy the **Public key**.

3. Log in to your [Account area](/account/login/), navigate to the `WireGuard` tab, click on the `Add new public key` button, paste the copied previously key into the `Public key` field, add any comment and click `Add`.

4. Enter the assigned IPv4 and IPv6 IP addresses into your router's WireGuard instance `Tunnel address` field and fill in the following fields:

    * Enabled - **Checked**
    * Name - give it any name, e.g. **WG_Interface**
    * Listen port - **51820**
    * MTU - **1412**
    * DNS servers - enter the WireGuard regular DNS server IP address (172.16.0.1) or the one associated with the preferred [AntiTracker](/knowledgebase/troubleshooting/what-is-the-ip-address-of-your-dns-servers/) list
    * Peers - select created previously WireGuard Peer

5. Click `Save`.

6. Have the `Enable WireGuard` checked and click `Apply`.<br></br>![](/images-static/uploads/install-wireguard-opnsense-02.png)

### Configuring Interfaces

1. Navigate to `Interfaces` - `Assignments`.

2. Add any description to the WireGuard interface, e.g. **WG** and click `Add`<br></br>![](/images-static/uploads/install-wireguard-opnsense-03.png)

3. Click on the newly added WireGuard interface, check the `Enable Interface` checkbox and click `Save`.

4. Click on the `LAN` interface, set `MSS` to `1412` and click `Save`.

### Configuring a Firewall

1. Navigate to `Firewall` > `NAT` > `Outbound`, select `Manual outbound NAT rule generation` and click `Save`

2. Click on the `+` button to add a new rule and fill in the following configuration:

    *   Disabled - **Unchecked**
    *   Interface - select the created earlier interface, i.e. **WG**
    *   Source Address - **LAN net**
    *   Translation / target - **Interface address**

3. Delete the other rule(s) containing your local network subnet that exist via WAN. This will ensure that traffic does not leak if the VPN tunnel accidentally goes down.

4. Click `Save` and `Apply Changes`.<br></br>![](/images-static/uploads/install-wireguard-opnsense-04.png)

### DNS

1. Navigate to `Services` > `ISC DHCPv4` > `[LAN]`

2. In the `DNS servers` field, enter the DNS server IP address specified in the created previously WireGuard Instance.

3. Click `Save`.<br></br>![](/images-static/uploads/install-openvpn-opnsense-instance-06.png)

### Final Steps

1. Restart your router and check the connection status of the WireGuard client in the `VPN` - `WireGuard` - `Status` area.<br></br>![](/images-static/uploads/install-wireguard-opnsense-05.png)

2. Check the conenction status and the assigned public IP address on our website and run a leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) from one of the devices connected to your OPNsense router.<br></br>![](/images-static/uploads/install-wireguard-opnsense-06.png)

**Please note:** If you plan to use a Multi-hop setup please see [this guide](/knowledgebase/general/how-can-i-connect-to-the-multihop-network/) and replace the port number in **Adding a WireGuard Peer** section, `Endpoint port` field with the chosen Exit-hop server Multi-hop port.