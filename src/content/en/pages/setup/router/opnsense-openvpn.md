---
title: OPNsense OpenVPN Setup Guide
listItem: OPNsense OpenVPN
url: /setup/router/opnsense-openvpn/
section: Router Setup
platform: router
layout: setup-article
weight: 60
---
## OPNsense OpenVPN Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using OPNsense 24.1.6
</div>

### Adding a CA certificate

1. In your router's webUI, navigate to `System` > `Trust` > `Authorities` and click on the `+` button.

2. Give it any name, i.e. "IVPN CA", select `Import an existing Certificate Authority`, then copy and paste the contents of our [ca.crt](/releases/config/ca.crt) file into the `Certificate Data` field.

3. Click `Save`.

    ![](/images-static/uploads/install-openvpn-opnsense-01.png)

### Adding a Static key

1. Navigate to `VPN` > `OpenVPN` > `Instances` > `Static Keys` tab and click on the `+` button.

2. Give it any name, i.e. "IVPN TLS Key", set `Mode` to `auth (Authenticate control channel packets)`, then copy and paste the contents of our [ta.key](/releases/config/ta.key) file into the `Static Key` field.

3. Click `Save`.

    ![](/images-static/uploads/install-openvpn-opnsense-instance-02.png)

### Creating an OpenVPN Client Instance

1. Navigate to the `Instances` tab, click on the `+` button, toggle the `Advanced mode` switch on and enter the following configuration:

    *   Role - **Client**
    *   Description - give it any name, i.e. **IVPN Ukraine**
    *   Enabled - **Toggled on**
    *   Protocol - **UDP** or **TCP**
    *   Type - **tun**
    *   Keep alive interval - **10**
    *   Keep alive timeout - **60**
    *   Remote - [choose](/status/) the server and enter its hostname with the port number separated with a colon, e.g. `ua2.gw.ivpn.net:2049` (available ports can be found [here](/knowledgebase/troubleshooting/how-do-i-change-the-port-or-protocol-used-to-connect/))
    *   Certificate Authority - **IVPN CA**
    *   TLS static key - **[auth] IVPN TLS Key**
    *   Auth - **SHA1 (160-bit)**
    *   Username - your IVPN account ID (**i-XXXX-XXXX-XXXX** or **ivpnXXXXXXXX**. Note, the ID is case-sensitive)
    *   Password - any string, i.e. **ivpn** <br></br>![](/images-static/uploads/install-openvpn-opnsense-instance-03.png)<br></br>

2. Click `Save`.

### Creating an Interface

1. Navigate to `Interfaces` > `Assignments`

2. Look for the interface with `ovpnc1` name, give it any description, i.e. "IVPNUkraine", then click on the `+` button and `Save`<br></br>![](/images-static/uploads/install-openvpn-opnsense-04.png)

3. Click on the newly added interface name, have the `Enable Interface` option checked and `Save` the changes.

### Configuring a Firewall

1. Navigate to `Firewall` > `NAT` > `Outbound`, select `Manual outbound NAT rule generation` and click `Save`

2. Click on the `+` button to add a new rule and fill in the following configuration:

    *   Disabled - **Unchecked**
    *   Interface - select the created earlier interface, i.e. **IVPNUkraine**
    *   Source Address - **LAN net**
    *   Translation / target - **Interface address**

3. Delete the other rule(s) containing your local network subnet that exist via WAN. This will ensure that traffic does not leak if the VPN tunnel accidentally goes down.

4. Click `Save` and `Apply Changes`.<br></br>![](/images-static/uploads/install-openvpn-opnsense-06.png)

### DNS

1. Navigate to `Services` > `ISC DHCPv4` > `[LAN]`

2. In the `DNS servers` field, enter the OpenVPN regular DNS server IP address (10.0.254.1) or the one associated with the preferred [AntiTracker](/knowledgebase/troubleshooting/what-is-the-ip-address-of-your-dns-servers/) list.

3. Click `Save`.<br></br>![](/images-static/uploads/install-openvpn-opnsense-instance-06.png)

### Final Steps

1. Restart your router and check the status of the OpenVPN client in the `VPN` - `OpenVPN` - `Connection Status` area.<br></br>![](/images-static/uploads/install-openvpn-opnsense-instance-04.png)

2. Check the conenction status and the assigned public IP address on our website and run a leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) from one of the devices connected to your OPNsense router.<br></br>![](/images-static/uploads/install-openvpn-opnsense-instance-05.png)

**Please note:** If you plan to use a Multi-hop setup please see [this guide](/knowledgebase/general/how-can-i-connect-to-the-multihop-network/) and replace the port number in **Configuring an OpenVPN Client** section, `Remote` field with the chosen Exit-hop server Multi-hop port. 
