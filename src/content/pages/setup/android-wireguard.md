---
title: WireGuard setup guide for Android
url: /setup/android-wireguard/
layout: setup
platform: android
---
# WireGuard setup guide

<div markdown="1" class="notice notice--warning">
To use WireGuard on Android, we recommend downloading IVPN's <a href="/apps-android/">Android client</a>, which supports the protocol. Please follow the steps below if you would prefer to use the official WireGuard app for Android instead:
</div>

1.  Download and install the latest version of WireGuard from the [Play Store](https://play.google.com/store/apps/details?id=com.wireguard.android&hl=en_GB&gl=US).

2.  Launch the WireGuard application, tap on the `+` button in the bottom right > `Create from scratch`.  

3.  Give the new tunnel a `Name` with alphanumeric characters only (no spaces or punctuation) then click on the `Refresh` icon in the **Private key** field and note the generated **Public key**.<div markdown="1" class="notice notice--warning">
    Warning: Keep the PrivateKey a closely guarded secret, do not share it with anyone, and do not post it on the Internet.</div>

4. Log into the [Client Area](/account/login/#id). Navigate to `WireGuard` tab and click the `Add a new key` button<br></br>
![](/images-static/uploads/install-wireguard-openwrt-02.png)
Copy and paste the **Public key** obtained previously, give it any name, then click the `Add key` button and note the assigned IPv4 & IPv6 IP addresses<br></br>
![](/images-static/uploads/install-wireguard-android-01.png)

5. In the WireGuard app, **Interface** section paste the assigned IPv4 & IPv6 IP addresses separated with a comma and ending with /32 & /128 respectively.

6. Specify one of the following DNS servers in the `DNS servers` field:

    - *172.16.0.1* = regular DNS with no blocking
    - *10.0.254.2* = standard AntiTracker to block advertising and malware domains
    - *10.0.254.3* = Hardcore Mode AntiTracker to also block Google and Facebook 

7. Select the WireGuard server from our [Server Status](/status/) page and note its hostname and public key<br></br>
![](/images-static/uploads/install-wireguard-android-02.png)

8. Tap on the `Add peer` button and paste the selected server's public key into the `Public key` field and its hostname, ending with port `:2049`, into the `Endpoint` field.<div markdown="1" class="notice notice--info">The following ports are also available - 53, 2050, 30587, 41893, 48574, or 58237. All ports are equally secure</div>

9. Enter **0.0.0.0/0** & **::/0** into the `Allowed IPs` field separated with a comma.

10. (Optional). Tap on the `All Applications` button to configure a Split Tunnel and select the apps you want to bypass the WireGuard tunnel or the other way around.<br></br>
![](/images-static/uploads/install-wireguard-android-03.png)

11. Tap on the `Save` icon on the top right and toggle the switch On to connect.

12. Check [https://www.dnsleaktest.com](https://www.dnsleaktest.com) to verify the IP address your traffic is coming from (and that there are no leaks).

13. Toggle the switch Off to disconnect.
