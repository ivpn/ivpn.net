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
    *   **Encryption cipher:** AES-256 CBC
    *   **Hash Algorithm:** SHA1
    *   **User Pass Authentication:** Enable (If this option does not exist you will need to follow the steps in the appendix).  
        Enter your account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' and any password.     
        <div markdown="1" class="notice notice--info">
        Only your account ID is used for authentication. The password field can be left empty or set to anything if your client software requires a non-blank password.
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

5.  Click on the `Management` tab and then on the `Reboot router` button at the bottom of the page. The router will reboot and then automatically attempt to connect to the VPN gateway. This may take up to 5 mins from the time you reboot depending on the speed of the router. You can view the status of the OpenVPN connection by navigating to `Status` > `OpenVPN`.  
    The router will route all traffic through the VPN. You must configure clients with trusted DNS servers or you can configure the DHCP server on the DD-WRT router to enable this configuration automatically on all clients.  
    **Please note:** If you plan to use a Multi-hop setup please see [this guide](/knowledgebase/general/how-can-i-connect-to-the-multihop-network/) and make the correct changes to your account ID in *Step 6*.

### Appendix

If you do not have the **User Pass Authentication** field in your DD-WRT version please follow the steps below:

1.  Add the following line to your `Additional Config` field:

    ```
    auth-user-pass /tmp/auth.conf
    ```

2.  Save your configuration by clicking on the `save` button.

3.  Click on the `Adminstration` tab and then the `Commands` tab. Enter the text shown in the box below **replacing the username and password in quotes with your account ID (starts with 'ivpn') and any password**. Click on `Save startup` to continue.

    ```
    #!/bin/sh
    touch /tmp/auth.conf
    echo "username" > /tmp/auth.conf
    echo "password" >> /tmp/auth.conf
    ```

4.  If the previous command worked correctly you should now see the contents above in a new section on the same page called `Startup`.
