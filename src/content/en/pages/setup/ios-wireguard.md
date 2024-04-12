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

2.  Navigate to our [config file generator](/account/wireguard-config)

3.  Choose `Generate key` or `Add key` manually

4.  Select the required `Single` or `Multi-hop` server configuration, `Port`, `Internet protocol` and hit `Generate QR code`

5.  Launch the WireGuard app, tap on the `Add a tunnel` button in the middle > `Create from QR-code`. Give it any name and tap on the `Create Tunnel`

6. `Allow` the "WireGuard would like to add VPN configurations" prompt

7.  Toggle the connect switch on and check your connection status on our website:<br></br>
![](/images-static/uploads/connection-status-tool.png)
