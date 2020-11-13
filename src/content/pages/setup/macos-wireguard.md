---
title: WireGuard manual setup for macOS 10.14+
url: /setup/macos-wireguard/
layout: setup
platform: macos
---
# WireGuard Manual setup for macOS 10.14+

<div markdown="1" class="notice notice--warning">
To use WireGuard on macOS, we recommend downloading IVPN's <a href="/apps-macos/">macOS client</a>, which supports the protocol. Please follow the steps below if you would prefer to use the official WireGuard for macOS app instead:
</div>

1.  Download and install the latest version of WireGuard from the [App Store](https://itunes.apple.com/us/app/wireguard/id1451685025?ls=1&mt=12).

2.  Launch the WireGuard application, click the `+` button in the bottom left > `Add empty tunnel...`.  

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

4. If you would like your computer to automatically connect to the WireGuard server as soon as either (or both) Ethernet or Wi-Fi network adapter becomes active, check the relevant <strong>'On-Demand'</strong> checkboxes.

5.  Copy the <strong>Public key</strong> and go to the <strong>Client Area</strong> on the IVPN website to add the generated public key to the <strong>Key Management</strong> area. Make note of the IP address we assign to your public key. Beside the <strong>Address</strong> line in the new tunnel window, put a space after the <strong>'='</strong> sign, enter the IP address we have assigned, and add /32 to the end.

6.  Beside <strong>PublicKey</strong> in the <strong>[Peer]</strong> section, put a space after the <strong>'='</strong> sign, and enter an IVPN WireGuard server public key (available via the **WireGuard Server List** in the **Client Area**).

7. Beside <strong>Endpoint</strong> in the <strong>[Peer]</strong> section, put a space after the <strong>'='</strong> sign, enter an IVPN WireGuard server <strong>IP address:port</strong>. The IP address of the server is available via the **WireGuard Server List** in the **Client Area**. You can choose any of the following Port numbers - **2049**, **2050**, **53**, **30587**, **41893**, **48574**, **58237**.

    ![](/images-static/uploads/macos-wireguard-010.png)

    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> You are welcome to use whichever server you prefer. The <strong>Endpoint</strong> and <strong>PublicKey</strong> in the example above are specific to our server in Switzerland.
    </div>

7. `Save` the VPN profile, then click `Allow` on the <strong>'"WireGuard" Would Like to Add VPN Configurations'</strong> prompt.

8.  Click the `Activate` button to establish the connection.

9.  Check [https://www.dnsleaktest.com](https://www.dnsleaktest.com) to verify the IP address your traffic is coming from (and that there are no leaks).

10.  Click `Deactivate` to end the connection.
