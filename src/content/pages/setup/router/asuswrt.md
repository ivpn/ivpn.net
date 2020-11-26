---
title: VPN Setup guide for Asuswrt-Merlin
listItem: Asuswrt-Merlin
url: /setup/router/asuswrt/
section: Router Setup
platform: router
layout: setup-article
weight: 50
---
## Asuswrt-Merlin OpenVPN Setup Guide

### Basic Asuswrt-Merlin Setup.

<div markdown="1" class="notice notice--warning">
The list of supported models can be viewed <a href="https://asuswrt.lostrealm.ca/about">here</a>
</div>

1.  Download and extract the IVPN [.ovpn config files](/releases/config/ivpn-openvpn-config.zip) to your PC.

2.  Launch the web browser and enter the IP address of your router, which is usually `192.168.1.1`.

3.  Once logged in, navigate to `VPN` – `OpenVPN Clients` tab & click on the `Browse` button.

    ![](/images-static/uploads/install-openvpn-asuswrt-010.png)

4.  Look for the extracted earlier configuration files, select the one with the preferred server location and click on the `Upload` button.

5.  Enter your IVPN account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' and any password in the **Username** & **Password** fields accordingly.

    <div markdown="1" class="notice notice--info">
    Only your account ID is used for the authentication. The password field can be empty or set to anything, like <strong>"ivpn"</strong>, if your client requires a non-blank password.
    </div>

6.  Set the **Accept DNS Configuration** to **Strict**. In the **Custom Configuration** fill in the following:

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

7.  Click on `Apply` on the bottom of the page and your router should now be connected to IVPN. To confirm the latter, check the **Online status** tool on our website or visit the [dnsleaktest.com](https://dnsleaktest.com/).

### Configuring DNS

1. On your router, navigate to `WAN` - `Internet Connection`
2. Under **WAN DNS Setting** set **Connect to DNS Server automatically** to **No**
3. Specify the following IVPN DNS IP addresses in the **DNS Server1** & **DNS Server2** fields accordingly: `10.0.254.1` & `198.245.51.147`
4. Hit `Apply` to save the changes.

### Configuring a Kill-Switch

1.  Navigate to `VPN` -> `OpenVPN Client`
2.  Under **Advanced Settings** select **Redirect Internet Traffic: Policy Rules**
3.  Have the **Block routed clients if tunnel goes down** option **Enabled**
4.  In the **Rules for routing client traffic through the tunnel** add your local network:  
    * **Description** - give it any name
    * **Source IP** - e.g. 192.168.1.0/24 (substitute with your real local network's IP address)
    * **Destination IP** - blank
    * **Iface** - VPN
