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

1.  [Download](https://www.wireguard.com/install/) and install the latest version of the WireGuard client from the official WireGuard website

2.  Navigate to our [config file generator](/account/wireguard-config)

3.  Choose `Generate key` or `Add key` manually

4.  Select the required `Single` or `Multi-hop` server configuration(s), `Port`, `Internet protocol` and hit `Download zip archive`

5.  Extract the downloaded .zip file, launch the WireGuard app, click on the `Add Tunnel` button in the bottom left > `Import Tunnel(s) from File...` and select the extracted config file(s)

6.  Click on the `Activate` button and check your connection status on our website:<br></br>
![](/images-static/uploads/connection-status-tool.png)
