---
title: OPNSense WireGuard Setup Guide
listItem: OPNsense
url: /setup/router/opnsense/
section: Router Setup
platform: router
layout: setup-article
weight: 60
---
## OPNSense WireGuard Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using OPNSense 20.1.
</div>

### Configure Your Environment

1.  Navigate to the home page of your router - By default `192.168.1.1`.

2.  Install system updates: `System > Firmware > Updates`

3.  Install the WireGuard plugin via `System > Firmware > Plugins` and scroll down to **os-wireguard**, then click the `+` to install. Reboot via `Power > Reboot` to make sure WireGuard is applied to the system.

    ![](/images-static/uploads/opns-wg-1-3-wg-plugin.png)

### Add an Endpoint (Server Location /Peer)

1.  Log in to the [IVPN Client Area](/account/).

2.  Choose a WireGuard server to connect to from our list. To see our server list go to the `VPN Accounts` page in the Client Area, click the `WireGuard` tab. Go to `WireGuard Server List`, which is located under **Tools**. Make note of the hostname and the public key of the server.

3.  In the OPNSense web interface, go to `VPN > WireGuard > Endpoints` and click the `+` to add a VPN server location (Endpoint/Peer):

    <div markdown="1" class="notice notice--info">
    <strong>Name:</strong> A short interface name, like ivpnJapan or ivpnSeattle.<br>
    <strong>Public Key:</strong> The server public key is available from the server list in the step above.<br>
    <strong>Shared Secret:</strong> Leave it blank.<br>
    <strong>Alloweb IPs:</strong> 0.0.0.0/0<br>
    <strong>Endpoint Address:</strong> The server IP address is available from the server list in the step above.<br>
    <strong>Endpoint Port:</strong> IVPN offers different ports to connect on: 53, 2049, 2050, 30587, 41893, 48574, and 58237<br>
    <strong>Keepalive:</strong> 25
    </div>

    ![](/images-static/uploads/opns-wg-2-3-edit-endpoint.png)

4.  Click the `Save` button to add the **Endpoint** to your OPNSense system.

### Add a Local Interface

1.  In the OPNSense web interface, go to `VPN > WireGuard > Local` and click the `+` to add a local interface:

    <div markdown="1" class="notice notice--info">
    <strong>Name:</strong> A short interface name, like ivpn.<br>
    <strong>Listen Port:</strong> Default value is likely fine.<br>
    <strong>DNS Server:</strong> The DNS server can be one of three options:<br><br>
    <i>172.16.0.1</i> = regular DNS with no blocking<br>
    <i>10.0.254.2</i> = standard AntiTracker to block advertising and malware domains<br>
    <i>10.0.254.3</i> = Hardcore Mode AntiTracker to also block Google and Facebook<br><br>
    <strong>Tunnel Address:</strong> Enter a temporary placeholder address, like 10.9.9.9<br>
    <strong>Peers:</strong> Choose the <strong>Endpoint</strong> (VPN server location) you created in the previous step.
    </div>

    Click the `Save` button to generate your **Public** and **Private** keys.

2.  Click the pencil icon to edit the local interface you created in the previous step and make note of your **Public Key**.

    ![](/images-static/uploads/opns-wg-3-2-local-interface.png)

3.  On the `VPN Accounts` page in the Client Area on our website, click the `WireGuard` tab. Go to `WireGuard Key Management` located under **Tools**. Click the `Add New Key` button. Copy the contents of the **Public Key** from OPNSense and paste them into the **Public Key**: field. Add a comment, like OPNSense if you prefer, and click the `Add Key button`.

    <div markdown="1" class="notice notice--warning">
    Be sure to copy the <strong>Public Key</strong> and not the <strong>Private Key</strong>. The <strong>Private Key</strong> must always be kept a carefully guarded secret.
    </div>

4.  Make note of the IP Address beside your newly added public key on the WireGuard tab in the Client Area. This is the IP address your computer system will have on our internal network. It will be in the form **172.x.y.z**.

5.  Go back to the OPNSense web interface and the local interface that is being edited. Remove the temporary placeholder from the **Tunnel Address** field and enter the IP address from the step above plus the /32 netmask **(172.x.y.z/32)**.

    ![](/images-static/uploads/opns-wg-3-5-edit-local-interface.png)

6.  Click the `Save` button.

### Connecting

1.  Go to the `VPN > WireGuard > General` tab and put a check mark beside **Enable WireGuard** on the General tab, then click the `Save` button.

2.  Check the ``VPN > WireGuard > List Configuration`` and `Handshakes` tabs to see connection details.

3.  To let you internal network clients go through the tunnel, add a **NAT entry**. Go to `Firewall > NAT > Outbound` and click `+Add` to add a rule. Check that rule generation is set to **Manual** or **Hybrid**. Add a rule and select **Wireguard** as `Interface`. `Source Address` should be **LAN net** and set `Translation / target` to **Interface address**.

    ![](/images-static/uploads/opns-wg-4-3-nat-rule.png)

4.  Click the `Save` button, click the `Apply Changes` button, then reboot the OPNSense router.

5.  Run a leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com/) via one of the internal network clients attached to your OPNSense router.
