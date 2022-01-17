---
title: VPN Setup guide for DD-WRT routers using the manual method
listItem: DD-WRT OpenVPN manual
url: /setup/router/ddwrt-manual/
section: Router Setup
platform: router
layout: setup-article
weight: 12
---
## DD-WRT OpenVPN Manual Setup Guide

<div markdown="1" class="notice notice--warning">
The DD-WRT UI is constantly evolving and there are multiple variations depending on the specific build and version of the firmware. You may not see the exact same options in the same order as below.
</div>

1.  Navigate to the home page of your router - By default `192.168.1.1`.

2.  Click on the `Services` tab. You may be asked to enter your router username and password.

3.  Click on the `VPN` tab and then click on the `Start OpenVPN Client` button.

4.  Enter the following configuration (as also shown in the screen shot below):

    <div markdown="1" class="notice notice--warning">
    Where we do not specify a value leave the default value in place.
    </div>

    *   **Server IP/Name:** Enter a server name from the [server status](/status/) page e.g. **ch.gw.ivpn.net**
    *   **Port:** 2049
    *   **Tunnel Device:** TUN
    *   **Tunnel Protocol:** UDP

    <div markdown="1" class="notice notice--info">You can also use ports UDP: 53, 80, 443, 1194, 2050 & TCP: 80, 443, 1443</div>

    *   **Encryption cipher:** AES-256 CBC
    *   **Hash Algorithm:** SHA1
    *   **User Pass Authentication:** Enable (If this option does not exist you will need to follow the steps in the appendix).  
        Enter your account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' and any password.     
        <div markdown="1" class="notice notice--info">
        Only your account ID is used for authentication and is case-sensitive. The password field can be left empty or set to anything if your client software requires a non-blank password.
        </div>

    *   **Advanced options:** Enable
    *   **TLS cipher:** None
    *   **LZO Compression:** No
    *   **NAT:** Enable
    *   **Firewall Protection:** Enable
    *   **Tls Auth Key:** Download and paste the contents of the [TLS-auth](/releases/config/ta.key) file.
    *   **Additional Config:**  
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
        
    *   **CA Cert:** Download and paste the contents of the [CA cert](/releases/config/ca.crt) file.

    ![](/images-static/uploads/install-dd-wrt-manual-010-579x1450.png)

5.  Click the `Save` button, then click the `Apply Settings` button.

### DNS

1. Navigate to `Setup` > `Basic Setup`.

2. Specify one of the following DNS servers in the `Static DNS 1` field:

    * *10.0.254.1* = redular DNS with no blocking
    * *10.0.254.2* = standard AntiTracker to block advertising and malware domains
    * *10.0.254.3* = AntiTracker Hardcore Mode to also block Google and Facebook

    ..and *198.245.51.147* in the `Static DNS 2` field.

3. Click `Save` & `Apply Settings`.

### Final steps

1. Reboot your router and wait for a minute or two for everything to settle, then reboot your computer system and check the status of the OpenVPN client in the `Status` > `OpenVPN` area.

2. Check the assigned public IP address on our website and run a leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com) from one of the devices connected to your DD-WRT router.

**Please note:** If you plan to use a Multi-hop setup please see [this guide](/knowledgebase/general/how-can-i-connect-to-the-multihop-network/) and replace the port number in *Step 4* with the chosen Exit-hop server Multi-hop port. 
    
### Appendix

If you do not have the **User Pass Authentication** field in your DD-WRT version please follow the steps below:

1.  Add the following line to your `Additional Config` field:

    ```
    auth-user-pass /tmp/auth.conf
    ```

2.  Save your configuration by clicking on the `save` button.

3.  Click on the `Adminstration` tab and then the `Commands` tab. Enter the text shown in the box below **replacing the username and password in quotes with your account ID ('ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX') and any password**. Click on `Save startup` to continue.

    ```
    #!/bin/sh
    touch /tmp/auth.conf
    echo "username" > /tmp/auth.conf
    echo "password" >> /tmp/auth.conf
    ```

4.  If the previous command worked correctly you should now see the contents above in a new section on the same page called `Startup`.
