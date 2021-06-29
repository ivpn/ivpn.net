---
title: WireGuard using terminal Setup Guide
url: /setup/linux-wireguard/
layout: setup
platform: linux
---
# Linux WireGuard terminal Setup Guide

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

1.  Log in to the [IVPN Client Area](/account/login/).

2.  On the `VPN Accounts` page, click the `WireGuard` tab. Go to `WireGuard Key Management` located under `Tools`. Click the `Add New Key` button. Copy the contents of the public key file and paste them into the `Public Key:` field. Add a comment, like `Linux` if you prefer, and click the `Add Key` button.

    <div markdown="1" class="notice notice--warning">
    Be sure to copy the PUBLIC key and not the PRIVATE key. The PRIVATE key must always be kept a carefully guarded secret.
    </div>

3.  Make note of the `IPv4 address` and `IPv6 address` beside your newly added public key on the WireGuard tab in the Client Area. These are the IP addresses your computer system will have on our internal network that will be in the `172.x.y.z` & `fd00:4956:504e:ffff::aaaa:bbbb` format respectively.

4.  WireGuard uses the UDP protocol and IVPN offers different ports to connect on. Choose a port:

    ```
    udp 2049
    udp 2050
    udp 53
    udp 30587
    udp 41893
    udp 48574
    udp 58237
    ```

5.  Choose a WireGuard server to connect to from our **[Server Status](/status/)** page. Remember the hostname and the public key of the server.

6.  To create a WireGuard configuration file for the connection you will need the following information:

    Your private key from step #2 of the environment configuration.

    ```
    $ cat ~/wireguard/privatekey
    abcdefghijklmnopqrstuvwxyz0123456789=
    ```

    Your assigned IP addresses from step #3 above.

    ```
    172.x.y.z, fd00:4956:504e:ffff::aaaa:bbbb
    ```

    The server port from step #4 above.

    ```
    2049
    ```

    The server `hostname` and server `public_key` from step #5 above.

    ```
    us-tx1.wg.ivpn.net
    JPT1veXLmasj2uQDstX24mpR7VWD+GmV8JDkidkz91Q=
    ```

7.  Create the WireGuard configuration file.

    ```
    $ sudo mkdir /etc/wireguard
    $ sudo touch /etc/wireguard/us-tx1.conf
    $ sudo chmod 600 /etc/wireguard/us-tx1.conf
    $ sudo nano /etc/wireguard/us-tx1.conf
    ```

    Use Nano or your favorite text editor to edit the configuration file. Enter the details accordingly

    ```
    [Interface]
    PrivateKey = abcdefghijklmnopqrstuvwxyz0123456789=
    Address = 172.x.y.z/32, fd00:4956:504e:ffff::x:y/128
    DNS = 172.16.0.1
    [Peer]
    PublicKey = JPT1veXLmasj2uQDstX24mpR7VWD+GmV8JDkidkz91Q=
    Endpoint = us-tx1.wg.ivpn.net:2049
    AllowedIPs = 0.0.0.0/0, ::/0
    ```

    Press `Ctrl + x` to save the file and exit from the nano editor.

    <div markdown="1" class="notice notice--info">
    - Add '/32' & '/128' to the end of your assigned IPv4 and IPv6 addresses respectively.<br>
    - Add the chosen port at the end of the hostname with a prefix of ':'
    </div>

8.  You are now ready. To connect run:

    ```
    $ sudo wg-quick up us-tx1
    ```

9.  Check the contents of `/etc/resolv.conf` to confirm that the `wg-quick` program updated the DNS server in your system.

    ```
    $ cat /etc/resolv.conf
    nameserver 172.16.0.1
    ...
    ```

    You may have to manually add an entry for our internal DNS IP address.

    ```
    $ sudo nano /etc/resolv.conf
    nameserver 172.16.0.1
    ...
    ```

    Press `Ctrl + x` to save the file and exit from the nano editor.

10. Check your external IPv4 & IPv6 IP addresses to verify that you are connected to IVPN.

    ```
    $ curl ifconfig.co
    $ curl -6 ifconfig.co
    ```

11. To disconnect run:

    ```
    $ sudo wg-quick down us-tx1
    ```

    <div markdown="1" class="notice notice--warning">
    Be sure to undo the manually applied changes to <code>/etc/resolv.conf</code> if any changes were required.
    </div>
