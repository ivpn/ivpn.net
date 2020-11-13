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
This guide was produced using DD-WRT v39715.
</div>

1.  Navigate to the home page of your router - By default `192.168.1.1`.

2.  Go to `Setup` > `Tunnels` > and click the `Add Tunnel` button. Choose **Enable** and select WireGuard from the dropdown menu.

3.  Click the `Generate Key` button and go to the `Client Area` on the IVPN website to add the generated public key to the `Key Management` area. Make note of the **IP address** we assign to your public key and add it to the IP address field and enter 255.255.255.255 in the **Subnet Mask** field.

    <div markdown="1" class="notice notice--info">
    <strong>Hint:</strong> After clicking <code>Generate Key</code>, it may or may not be possible to copy the public key displayed on the <code>Tunnels</code> page. Click the <code>Save</code> and <code>Apply Settings</code> buttons, then go to <code>Administration</code>  > <code>Commands</code>  and enter wg in the <code>Commands</code>  box, then click <code>Run Commands</code> . This will display details of the WireGuard connection including the public key, which can be easily copied.<br><br>
    <img src="/images-static/uploads/install-openvpn-ddwrt-wireguard-010.png">
    </div>

4.  Click the `Add Peer` button and enter the following peer configuration (as also shown in the screen shot below):

    *   **Peer Tunnel IP:** 0.0.0.0
    *   **Peer Tunnel DNS:** 172.16.0.1
    *   **Endpoint:** Enable
    *   **Endpoint Address:** Enter an IVPN WireGuard server IP address (available via the **WireGuard Server List** in the Client Area) and choose a port:
        ```
        udp 2049
        udp 2050
        udp 53
        udp 30587
        udp 41893
        udp 48574
        udp 58237
        ```
    *   **Allowed IPs:** 0.0.0.0/0
    *   **Persistent Keepalive:** 25
    *   **Peer Public Key:** Enter an IVPN WireGuard server public key (available via the **WireGuard Server List** in the Client Area)
    *   **Use Pre-shared Key:** Disable

    ![](/images-static/uploads/install-openvpn-ddwrt-wireguard-020.png)

    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> You are welcome to use whichever server you prefer. The <strong>Endpoint Address</strong> and <strong>Peer Public Key</strong> in the example above are specific to our server in Sweden.
    </div>

5.  Click the `Save` button, then click the `Apply Settings` button.

6.  In `Administration` > `Commands`, enter the following:  
    
    #### Save Startup:
    ```
    sleep 30
    echo "Update route table on startup..."
    WGSERVER=$(/usr/sbin/nvram get oet1_rem0)
    WANGW=$(/usr/sbin/nvram get wan_gateway)
    WANIF=$(/usr/sbin/nvram get wan_iface)
    route add -host $WGSERVER gw $WANGW dev $WANIF
    route del default
    route add default dev oet1
    ip route flush cache
    mkdir -p /tmp/etc/config
    ln -s /tmp/custom.sh /tmp/etc/config/wg-route-fix.wanup
    echo "... Done route table update."
    ```

    #### Save Firewall:
    ```
    WANIF=$(/usr/sbin/nvram get wan_iface)
    iptables -t nat -I POSTROUTING -o oet1 -j MASQUERADE
    iptables -I FORWARD -i br0 -o $WANIF -m state --state NEW -j REJECT --reject-with icmp-host-prohibited
    iptables -I FORWARD -i br0 -p tcp -o $WANIF -m state --state NEW -j REJECT --reject-with tcp-reset
    ```

    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> The iptables commands above create a kill-switch firewall to prevent leaks. The routing table in DD-WRT is reset every time the <code>Apply Settings</code> button is clicked anywhere in the web interface and it takes time for the <strong>Custom Script</strong> to reapply the routing. If you prefer or do not mind leaks, please only enter
    <pre>
    iptables -t nat -I POSTROUTING -o oet1 -j MASQUERADE
    </pre>
    in the <strong>Save Firewall</strong> area.
    </div>

    #### Save Custom Script:
    ```
    #!/bin/sh
    sleep 5
    echo "Update route table on wanup ..."
    WGSERVER=$(/usr/sbin/nvram get oet1_rem0)
    WANGW=$(/usr/sbin/nvram get wan_gateway)
    WANIF=$(/usr/sbin/nvram get wan_iface)
    route add -host $WGSERVER gw $WANGW dev $WANIF
    route del default
    route add default dev oet1
    ip route flush cache
    echo "... Done route table update."
    ```

7.  In `Setup` > `Basic Setup`, you might consider setting IVPN DNS servers in the **Network Address Server Settings (DHCP)** area:

    * **Static DNS 1:** 172.16.0.1
    * **Static DNS 2:** 198.245.51.147

8.  Click the `Save` button, then click the `Apply Settings` button.

9.  Reboot your router and wait for a minute or two for everything to settle, then reboot your computer system.
