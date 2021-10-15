---
title: WireGuard using NetworkManager Setup Guide
url: /setup/linux-wireguard-netman/
layout: setup
platform: linux
---
# WireGuard NetworkManager setup guide

WireGuard support was added to NetworkManager in v1.16. This guide was created with NetworkManager v1.20.4-1 on Manjaro with KDE and verified on openSUSE Tumbleweed with KDE with NetworkManager v1.18.2-1.1. Generally, KDE's implementation of NetworkManager supports WireGuard, though other desktop environments might not.

### Configure your environment

1.  [Install WireGuard](https://www.wireguard.com/install/) for your distribution.

    Install additional packages for Debian/Ubuntu/Mint:

    ```
    $ sudo apt install resolvconf curl
    ```

2.  Generate your private and public keys and store them in a safe place.

    ```
    $ cd ~
    $ mkdir wireguard
    $ cd wireguard
    $ wg genkey | tee privatekey | wg pubkey > publickey
    $ chmod 600 privatekey
    $ cat privatekey
    abcdefghijklmnopqrstuvwxyz0123456789=
    $ cat publickey
    9876543210zyxwvutsrqponmlkjihgfedcba=
    ```

    Note: The keys above are examples only.

### Setup WireGuard to use IVPN

1.  Log in to the [IVPN Account Area](/account/login/).

2.  From the `Account` page, click the `WireGuard` tab. Go to `WireGuard Key Management` located under `Tools`. Click the `Add New Key` button. Copy the contents of the public key file and paste them into the `Public Key:` field. Add a comment, like `Linux` if you prefer, and click the `Add Key` button.

    <div markdown="1" class="notice notice--warning">
    Be sure to copy the PUBLIC key and not the PRIVATE key. The PRIVATE key must always be kept a carefully guarded secret.
    </div>

3.  Make note of the `IP Address` beside your newly added public key on the WireGuard tab in the Account Area. This is the IP address your computer system will have on our internal network. It will be in the form `172.x.y.z`.

4.  Open the NetworkManager `Configure network connections` window. This is often available via an icon in the system tray near the clock, though each Linux distribution may be different.

5.  Click the `+` to add a new connection. Select `WireGuard` from the list, then click the `Create` button.

6.  The `Connection name:` field should reflect the server location and will be used as the network interface name. Alphanumeric characters and dashes may be good choices, which easily reflect the names of our servers (ie. ca1, de1, us-ga1).

    Enter your private key in the `Private Key:` field on the `WireGuard Interface` tab.

    ![](/images-static/uploads/wg-nm-10-new-connection1.png)

7.  Click the `Peers...` button on the `WireGuard Interface` tab and add the following:

    <div markdown="1" class="notice notice--info">
    <strong>Public key:</strong> = WireGuard server public key available on the <strong>WireGuard Server List</strong> page in the Account Area<br>
    <strong>Allowed IPs:</strong> = 0.0.0.0/0<br>
    <strong>Endpoint address:</strong> = WireGuard server address available on the <strong>WireGuard Server List</strong> page in the Account Area<br>
    <strong>Endpoint port:</strong> = choose one of the ports we offer: 53, 2049, 2050, 30587, 41893, 48574, 58237
    </div>

    Click `OK`.

    ![](/images-static/uploads/wg-nm-20-peer1.png)

8.  On the IPv4 tab, set `Method:` to **Manual**. The DNS server can be one of three options:

    <div markdown="1" class="notice notice--info">
    <strong>172.16.0.1</strong> = regular DNS with no blocking<br>
    <strong>10.0.254.2</strong> = standard AntiTracker to block advertising and malware domains<br>
    <strong>10.0.254.3</strong> = Hardcore Mode AntiTracker to also block Google and Facebook
    </div>

    Click the `+ Add` button to add the IP address we have assigned your account in step 3 above. The Netmask is 255.255.255.255 and the Gateway is 0.0.0.0.

    ![](/images-static/uploads/wg-nm-30-IPv4-1.png)

9.  On the **IPv6** tab, set `Method:` to **Ignored**.

10. Click the `Save` button.

### Connecting and Disconnecting

1.  To connect, click the `NetworkManager` icon in the system tray and click `Connect` beside the newly created WireGuard connection.

2.  Check the connection status.

    ![](/images-static/uploads/wg-nm-40-connection-status1.png)

3.  Check [https://www.dnsleaktest.com](https://www.dnsleaktest.com) to verify the IP address your traffic is coming from (and that there are no leaks).

4.  To disconnect, click the `NetworkManager` icon in the system tray and click the `Disconnect` button next to the active connection.

    ![](/images-static/uploads/wg-nm-50-disconnect1.png)
