---
title: WireGuard setup guide for DD-WRT routers
listItem: DD-WRT WireGuard
url: /setup/router/ddwrt-wireguard/
section: Router Setup
platform: router
layout: setup-article
weight: 13
---
## DD-WRT WireGuard Setup Guide

<div markdown="1" class="notice notice--warning">
The DD-WRT UI is constantly evolving and there are multiple variations depending on the specific build and version of the firmware. You may not see the exact same options in the same order as below.<br><br>
This guide was produced using DD-WRT v46772.
</div>

1.  Navigate to the home page of your router - By default `192.168.1.1`.

2.  Go to `Setup` > `Tunnels` > and click the `Add Tunnel` button. Choose **Enable** and select WireGuard from the dropdown menu.

3.  Set the `MTU` value of the WireGuard tunnel to `1412`. 

4.  Click the `Generate Key` button and go to the `Client Area` on the IVPN website to add the generated public key to the `Key Management` area. Make note of the **IP address** we assign to your public key and add it to the IP address field followed by a `/32` subnet mask.

    <div markdown="1" class="notice notice--info">
    <strong>Hint:</strong> After clicking <code>Generate Key</code>, it may or may not be possible to copy the public key displayed on the <code>Tunnels</code> page. Click the <code>Save</code> and <code>Apply Settings</code> buttons, then go to <code>Administration</code>  > <code>Commands</code>  and enter wg in the <code>Commands</code>  box, then click <code>Run Commands</code> . This will display details of the WireGuard connection including the public key, which can be easily copied.<br><br>
    <img src="/images-static/uploads/install-openvpn-ddwrt-wireguard-010.png">
    </div>

5.  You might consider setting `Kill Switch` to `Enable`.  This will prevent out-bound traffic if the vpn connection is disconnected.

6.  Click the `Add Peer` button and enter the following peer configuration (as also shown in the screen shot below):

    *   **Peer Tunnel IP:** 0.0.0.0
    *   **Peer Tunnel DNS:** 172.16.0.1
    *   **Endpoint:** Enable
    *   **Endpoint Address:** Enter an IVPN WireGuard server hostname (available via the **WireGuard Server List** in the Client Area) and choose a port:
        ```
        udp 2049
        udp 2050
        udp 53
        udp 30587
        udp 41893
        udp 48574
        udp 58237
        ```
    *   **Allowed IPs:** 0.0.0.0/1,128.0.0.0/1
    *   **Route Allowed IP's via tunnel**: Enable
    *   **Persistent Keepalive:** 25
    *   **Peer Public Key:** Enter an IVPN WireGuard server public key (available via the **WireGuard Server List** in the Client Area)
    *   **Use Pre-shared Key:** Disable

    ![](/images-static/uploads/install-openvpn-ddwrt-wireguard-020.png)

    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> You are welcome to use whichever server you prefer. The <strong>Endpoint Address</strong> and <strong>Peer Public Key</strong> in the example above are specific to our server in Sweden.
    </div>

7.  Click the `Save` button, then click the `Apply Settings` button.

8.  In `Setup` > `Basic Setup`, you might consider setting IVPN DNS servers in the **Network Address Server Settings (DHCP)** area:

    * **Static DNS 1:** 172.16.0.1
    * **Static DNS 2:** 198.245.51.147

9.  Click the `Save` button, then click the `Apply Settings` button.

10.  Reboot your router and wait for a minute or two for everything to settle, then reboot your computer system.
