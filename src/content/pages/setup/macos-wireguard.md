---
title: WireGuard manual setup for macOS 10.14+
url: /setup/macos-wireguard/
layout: setup
platform: macos
---
# WireGuard setup guide for macOS 10.14+

<div markdown="1" class="notice notice--warning">
To use WireGuard on macOS, we recommend downloading IVPN's <a href="/apps-macos/">macOS client</a>, which supports the protocol. Please follow the steps below if you would prefer to use the official WireGuard app for macOS instead:
</div>

1.  [Download](https://itunes.apple.com/us/app/wireguard/id1451685025?ls=1&mt=12) and install the latest version of WireGuard client from Apple's App Store.

2.  Navigate to our [config file generator](/account/wireguard-config)

3.  Choose `Generate key` or `Add key` manually

4.  Select the required `Single` or `Multi-hop` server configuration(s), `Port`, `Internet protocol` and hit `Download zip archive`

5.  Extract the downloaded .zip file, launch the WireGuard app, click on the `+` button in the bottom left > `Import Tunnel(s) from File...` and select the extracted config file(s)

6.  Click on the `Activate` button and check your connection status on our website:<br></br>
![](/images-static/uploads/connection-status-tool.png)
