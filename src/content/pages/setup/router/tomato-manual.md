---
title: VPN Setup guide for a Tomato router
listItem: Tomato manual
url: /setup/router/tomato-manual/
section: Router Setup
platform: router
layout: setup-article
weight: 41
---
## Tomato Setup Guide

### Basic Tomato Setup

<div markdown="1" class="notice notice--warning">
This guide was produced using FreshTomato version 2020.3
</div>

1.  Launch the web browser and enter the IP address of your router - `http://192.168.1.1/`, by default.

2.  Navigate to `VPN Tunneling` > `OpenVPN Client` > `Basic`.

3.  Enter the following configuration:

    * **Start with WAN:** Check
    * **Interface Type:** TUN
    * **Protocol:** UDP
    * **Server Address/Port:** Enter a server name from the [server status](/status/) page, e.g. ua.gw.ivpn.net and Port 2049
    * **Firewall:** Automatic
    * **Create NAT on tunnel:** Check
    * **Inbound Firewall:** Check
    * **Authorization Mode:** TLS
    * **TLS control channel:** Outgoing Auth (1)
    * **Username/Password Authentication:** Check. Enter your account ID that begins with 'ivpn' and any password.
    * **Auth digest:** SHA1
    * Click `Save`.

    ![](/images-static/uploads/install-openvpn-tomato-010.png)

    <div markdown="1" class="notice notice--info">
    <strong>Please note:</strong> If you plan to use a Multi-hop setup please read <a href="/knowledgebase/general/how-can-i-connect-to-the-multihop-network/">this guide</a> and make the correct changes to your username in the steps above. IVPN Pro subscription is required to use Multi-hop.
    </div>

4.  Navigate to `Advanced` tab and enter the following configuration:

    *   **Poll interval:** 0
    *   **Redirect Internet traffic:** All
    *   **Accept DNS configuration:** Strict
    *   **Cipher Negotiation:** Enabled (with fallback)
    *   **Negotiable ciphers:** AES-256-GCM:AES-128-GCM:AES-256-CBC:AES-128-CBC
    *   **Legacy/fallback cipher:** Use Default
    *   **Compression:** None
    *   **TLS Renegotiation Time:** -1
    *   **Connection retry:** 30
    *   **Verify server certificate:** Unchecked
    *   **Custom Configuration:**
        ```
        tls-client
        tls-cipher TLS-DHE-RSA-WITH-AES-256-CBC-SHA
        key-direction 1
        resolv-retry infinite
        keepalive 10 60
        nobind
        persist-key
        persist-tun
        persist-remote-ip
        verb 3
        ```
        
    *   Click `Save`.

    ![](/images-static/uploads/install-openvpn-tomato-020.png)

5.  Proceed to `Keys` tab > copy and paste [Static Key](/releases/config/ta.key) and [Certificate Authority](/releases/config/ca.crt) into corresponding fields. Click `Save`.

    ![](/images-static/uploads/install-openvpn-tomato-030.png)

6.  Navigate to `Status` tab and click the `Start Now` button to connect.

    ![](/images-static/uploads/install-openvpn-tomato-040.png)

### Configuring DNS

1. Navigate to `Basic` - `Network`
2. Under **WAN Setting** set **DNS Server** to **Manual** and specify the following IVPN DNS IP addresses in the **DNS 1** & **DNS 2** fields respectively: `10.0.254.1` & `198.245.51.147`
3. Click `Save`.

### Configuring a Kill-Switch

1. Navigate to `Administration` > `Scripts` > `Firewall`
2. Enter the following: `iptables -I FORWARD -i br0 -o `nvram get wan_iface` -j DROP`
3. Click `Save` and reboot your router.
