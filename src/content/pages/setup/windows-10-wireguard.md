---
title: WireGuard Manual setup for Windows 10
url: /setup/windows-10-wireguard/
layout: setup
platform: windows
---
# WireGuard setup guide for Windows 10

<div markdown="1" class="notice notice--warning">
To use WireGuard on Windows, we recommend downloading IVPN's <a href="/apps-windows/">Windows client</a>, which supports the protocol. Please follow the steps below if you would prefer to use the official WireGuard app for Windows instead:
</div>

1.  Download and install the WireGuard installer from the [official WireGuard website](https://www.wireguard.com/install/).  

2.  Launch the WireGuard application and click the `down arrow` beside the `Add Tunnel` button and click `Add empty tunnel...`.  

3.  Give the new tunnel a `Name` with alphanumeric characters only (no spaces or punctuation) and add the following text below the `PrivateKey` entry in the new tunnel window.

    ```
    Address = 
    DNS = 172.16.0.1 
    [Peer] 
    PublicKey = 
    Endpoint = 
    AllowedIPs = 0.0.0.0/0 
    ```

    <div markdown="1" class="notice notice--warning">
    Warning: Keep the PrivateKey a closely guarded secret, do not share it with anyone, and do not post it on the Internet.
    </div>

4.  Copy the `Public key` and go to the `Client Area` on the IVPN website to add the generated public key to the `Key Management` area. Make note of the IP addresses we assign to your public key. Beside the `Address` line in the new tunnel window, put a `space` after the = sign, enter the IPv4 and IPv6 IP addresses we have assigned separated with a comma and ending with /32 & /128 respectively.

5.  Beside `Endpoint` in the `[Peer]` section, put a space after the = sign, enter an IVPN WireGuard server hostname (available on the **[Server Status](/status/)** page), and choose a port:

    ```
    udp 2049
    udp 2050
    udp 53
    udp 30587
    udp 41893
    udp 48574
    udp 58237
    ```

6.  Beside PublicKey in the [Peer] section, put a space after the = sign, and enter an IVPN WireGuard server public key (available on the **[Server Status](/status/)** page).

7.  Choose whether or not you prefer to use the **kill-switch** feature by leaving or removing the check mark at the bottom of the new tunnel window and click the `Save` button.

    ![](/images-static/uploads/windows-10-wireguard-010.png)

    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> You are welcome to use whichever server you prefer. The <strong>Endpoint</strong> and <strong>PublicKey</strong> in the example above are specific to our server in Switzerland.
    </div>

8.  Click the `Activate` button to establish the connection.

9.  Check [https://www.dnsleaktest.com](https://www.dnsleaktest.com) to verify the IP address your traffic is coming from (and that there are no leaks).

10.  Click `Deactivate` to end the connection.
