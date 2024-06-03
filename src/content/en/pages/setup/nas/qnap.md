---
title: VPN Setup guide for the QNAP NAS
listItem: QNAP
url: /setup/nas/qnap/
section: NAS Setup
platform: nas
layout: setup-article
weight: 20
---
## QNAP NAS Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using QTS v4.3.6
</div>

1.  Download and extract the IVPN [.ovpn config files](/openvpn-config) to your computer system.

2.  In the QNAP web interface, open the `AppCenter` and search for **qvpn**.

    ![](/images-static/uploads/install-qnap-1.png)

3.  Click the `+ Install` button to add the `QVPN Service` app to your device if it is not installed already.

4.  Open the `QVPN Service` app and under the the `VPN Client` area, click `VPN Connection Profiles`. Click the `Add` button and choose `OpenVPN`.

    ![](/images-static/uploads/install-qnap-2.png)

5.  Use the file picker dialogue box to choose the VPN server location you prefer and click `OK`.

6.  Enter your account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' and any password in the credential fields and (optionally) change the **Profile Name** to something different. Click the `Apply` button.

    <div markdown="1" class="notice notice--info">
    Only your account ID is used for authentication and is case-sensitive. The password field can be left empty or set to anything if your client software requires a non-blank password.
    </div>

    ![](/images-static/uploads/install-qnap-3.png)

    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> You are free to choose whichever server location you prefer. Our Japan server is used here only as an example.
    </div>

7.  Add as many VPN server profiles as you would like.

8.  Click the `Connect` icon under the `Actions` column. The connection may take 10 to 30 seconds and the `Status` indicator will turn green when the connection is successful.

    ![](/images-static/uploads/install-qnap-4.png)

9.  Click the `Use VPN as NAS Default Gateway` button for extra settings related to the default gateway and failover.

    ![](/images-static/uploads/install-qnap-5.png)

    <div markdown="1" class="notice notice--info">
    If you check the <code>Allow other network devices in the same subnet to connect to the VPN through the NAS</code> option, change the default gateway on your computer system to the local network IP address of the QNAP device to route all of the Internet traffic on your computer through the NAS VPN.<br>
    Use our standard DNS server <strong>10.0.254.1</strong>, our AntiTracker DNS <strong>10.0.254.2</strong>, or our Hardcore Mode AntiTracker <strong>10.0.254.3</strong> on your computer system to complete the routing setup.
    </div>

    ![](/images-static/uploads/install-qnap-6.png)

10. Instead of using servers separated by a great distance, you might prefer to use a location with multiple servers. This may offer a more seemless and familiar network experience if failover occurs:

    ```
    ca1.gw.ivpn.net
    ca2.gw.ivpn.net
    de1.gw.ivpn.net
    de2.gw.ivpn.net
    us-ga1.gw.ivpn.net
    us-ga2.gw.ivpn.net
    ```

    You will have to make a copy of the .ovpn file and edit the server hostname prior to importing both files. Any text editor, like WordPad or TextEdit, will handle the editing. The server hostname is on line 4.  
    Our [server status page](/status/) lists all of our servers.

