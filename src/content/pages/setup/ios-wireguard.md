---
title: WireGuard setup guide for iOS
url: /setup/ios-wireguard/
layout: setup
platform: ios
---
# WireGuard setup guide

<div markdown="1" class="notice notice--warning">
To use WireGuard on iOS, we recommend downloading IVPN's <a href="/apps-ios/">iOS client</a>, which supports the protocol. Please follow the steps below if you would prefer to use the official WireGuard app for iOS instead:
</div>

1.  Download and install the latest version of WireGuard from the [App Store](https://apps.apple.com/us/app/wireguard/id1441195209).

2.  Launch the WireGuard application, tap on the `Add a tunnel` button > `Create from scratch`.  

3.  Give the new tunnel a `Name` with alphanumeric characters only (no spaces or punctuation) then tap on the `Generate keypair` button and note the generated **Public key**.<div markdown="1" class="notice notice--warning">
    Warning: Keep the PrivateKey a closely guarded secret, do not share it with anyone, and do not post it on the Internet.</div>

4. Log into the [Client Area](/account/login/#id). Navigate to `WireGuard` tab and click the `Add a new key` button<br></br>
![](/images-static/uploads/install-wireguard-openwrt-02.png)
Copy and paste the **Public key** obtained previously, give it any name, then click the `Add key` button and note the assigned IPv4 & IPv6 IP addresses<br></br>
![](/images-static/uploads/install-wireguard-ios-01.png)

5. In the WireGuard app, `Addresses` field, paste the assigned IPv4 & IPv6 IP addresses separated with a comma and ending with /32 & /128 respectively.

6. Specify one of the following DNS servers in the `DNS servers` field:

    - *172.16.0.1* = regular DNS with no blocking
    - *10.0.254.2* = standard AntiTracker to block advertising and malware domains
    - *10.0.254.3* = Hardcore Mode AntiTracker to also block Google and Facebook domains 

7. Select the WireGuard server from our [Server Status](/status/) page and note its hostname and public key<br></br>
![](/images-static/uploads/install-wireguard-android-02.png)

8. Tap on the `Add peer` button and paste the selected server's public key into the `Public key` field and its hostname, ending with port `:2049`, into the `Endpoint` field.<div markdown="1" class="notice notice--info">The following ports are also available - 53, 2050, 30587, 41893, 48574, or 58237. All ports are equally secure</div>

9. Enter **0.0.0.0/0** & **::/0** into the `Allowed IPs` field separated with a comma.<br></br>
![](/images-static/uploads/install-wireguard-ios-02.png)

10. Tap on the `Save` button on the top right and toggle the switch On to connect.

11. Check [https://www.dnsleaktest.com](https://www.dnsleaktest.com) to verify the IP address your traffic is coming from (and that there are no leaks).

12. Toggle the switch Off to disconnect.
