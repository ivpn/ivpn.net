---
title: Mikrotik WireGuard Setup Guide
listItem: Mikrotik WireGuard
url: /setup/router/mikrotik-wireguard/
section: Router Setup
platform: router
layout: setup-article
weight: 63
---
## Mikrotik WireGuard Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using RouterOS 7.19.1.<br>
A MikroTik router with RouterOS v7 or later is required. WireGuard is not available in earlier versions.
</div>

### Generating WireGuard config file

1. Navigate to our WireGuard [config file generator](/account/wireguard-config) page.

2. Click on the `Generate key` button, choose the VPN server with the preferred settings.

3. Download and extract the zip archive.
<div markdown="1" class="notice notice--info">
WireGuard config file generator is only available for accounts that were created after November 2020 (account ID format: i-XXXX-XXXX-XXXX). If you have an IVPN subscription created before this date (account ID format: ivpnXXXXXXXX) and wish to make use of the feature, contact our customer service to help you make the switch.
</div>

### Configuring WireGuard interface and peer

1. Log in to your router's web interface.

2. Navigate to `Files`, click the `Upload` button and select extracted previously WireGuard config file.<br></br>![](/images-static/uploads/install-wireguard-mikrotik-01.png)

3. In the `WireGuard` area, click on the `WG Import` and select the uploaded config file.<br></br>![](/images-static/uploads/install-wireguard-mikrotik-011.png)

4. In the `Peers` tab, double-click on the added Peer and enter the following configuration:

    * Name - give it any name, e.g., **IVPN_Ukraine**
    * Interface - the name of your WireGuard interface, **wg1** by default
    * Endpoint - the IP address of the VPN server (located in the generated WG config file, `Endpoint` field)
    * Port - the `Endpoint's` port, e.g., **2049**
    * Allowed Address - **0.0.0.0/0** and **::/0** below
    * Persistent Keepalive - **25**
    * Client DNS - enter WireGuard's regular DNS server IP address **172.16.0.1** or the one associated with the preferred [AntiTracker](/knowledgebase/troubleshooting/what-is-the-ip-address-of-your-dns-servers/) list

5. Hit `Apply` and `Okay`.<br></br>![](/images-static/uploads/install-wireguard-mikrotik-02.png)

6. Navigate to `IP` - `Addresses`, click `+` and enter the following:

    * Address - the assigned WireGuard interface IP address (found in the generated WG config file, `Address` field)
    * Interface - **wg1**

7. Hit `Apply` and `Okay`.<br></br>![](/images-static/uploads/install-wireguard-mikrotik-03.png)

### Configuring Routing and Firewall

1. Navigate to `Routing` - `Tables`, click `+` to create a new table. Give it any name, e.g. `WG-Table`, check the `FIB` option and `Apply` the changes.<br></br>![](/images-static/uploads/install-wireguard-mikrotik-04.png)

2. Navigate to `Routing` - `Rules`, click `+` to allow communication between devices on your LAN — including access to the router itself:

    * Src. Address - the IP address of your local network, e.g., **10.0.0.0/24**
    * Dst. Address - **10.0.0.0/24**
    * Action - **lookup**
    * Table - **main**

3. In the same section, click `+` again to add a second routing rule that sends all remaining traffic through the WireGuard interface. Make sure this rule is positioned below the previous rule to ensure local traffic is handled correctly. Configure the rule with the following fields:

    * Src. Address - the IP address of your local network, e.g., **10.0.0.0/24**
    * Action - **lookup only in table**
    * Table - **WG-Table**

4. Hit `Apply` and `Okay`.<br></br>![](/images-static/uploads/install-wireguard-mikrotik-05.jpeg)

5. In `IP` - `Routes`, click `+` to create a new route with the following configuration:

    * Dst.Address - **0.0.0.0/0**
    * Gateway - **wg1**
    * Routing Table - **WG-Table**

6. Hit `Apply` and `Okay`.<br></br>![](/images-static/uploads/install-wireguard-mikrotik-06.png)

7. In `IP` - `Firewall` - `NAT` tab, click `+` and fill in the following:

    * Chain - **srcnat**
    * Src. Address - the IP address of your local network, specified in step #2 (e.g. **10.0.0.0/24**)
    * Out. Interface - **wg1**
    * Action tab Action - **Masquerade**

8. Hit `Apply` and `Okay`.<br></br>![](/images-static/uploads/install-wireguard-mikrotik-07.png)

### Configuring DNS

1. In `IP` - `DNS`, enter WireGuard's regular DNS server IP address (172.16.0.1) or the one associated with the preferred [AntiTracker](/knowledgebase/troubleshooting/what-is-the-ip-address-of-your-dns-servers/) list into the `Servers` field and apply the changes.

2. In `IP` - `DHCP Server`, double-click on your local network and enter the same DNS IP address into the `DNS Servers` field.

3. `Apply` the changes.<br></br>![](/images-static/uploads/install-wireguard-mikrotik-08.png)

### Final Steps

1. Restart the router.

2. Check the connection status and the assigned public IP address on our website and run a DNS leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) from one of the devices connected to your Mikrotik router.
