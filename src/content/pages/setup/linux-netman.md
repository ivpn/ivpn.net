---
title: OpenVPN using NetworkManager Setup Guide
url: /setup/linux-netman/
layout: setup
platform: linux
---
# OpenVPN using NetworkManager Setup Guide

<div markdown="1" class="notice notice--warning">
Network Manager is designed to provide automatic connectivity, through whatever channels are available. Once a VPN connection is established, all traffic is routed through the tunnel. After network interruptions, Network Manager will normally automatically restart OpenVPN to reconnect.
<br><br>
However, Network Manager occasionally kills the OpenVPN process after network interruptions. High network loading seems to increase the risk. And when connectivity returns, Network Manager doesn't restart OpenVPN.
<br><br>
Therefore, to ensure that you have no leaks when using OpenVPN with Network Manager, it's crucial to have firewall (iptables) rules that restrict traffic to the VPN tunnel, and that allow direct connections only to the VPN server. It's also prudent to block all IPv6 traffic.
</div>

1. Install OpenVPN and the OpenVPN plugin for the Network Manager. Depending on your distro you may also require the `network-manager-openvpn-gnome` package.

   ```
   sudo apt-get install openvpn network-manager-openvpn
   ```

2. Download the [latest config files](/releases/config/ivpn-openvpn-config.zip) and extract contents to a temporary directory.

3. Click on the Network Manager icon (normally top right menubar) and select `Edit connections..` > `"+"` > `Import a saved VPN configuration..` > `Create`.

4. Select one of the .ovpn files you extracted from step 2 representing the server you would like to configure and click `Open` to import.

5. The VPN configuration window will open on the `VPN` tab. Under the `Authentication` heading update the `Type` to `Password`.

6. Enter your account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' and any password.

   <div markdown="1" class="notice notice--info">
   Only your account ID is used for authentication and is case-sensitive. The password field can be left empty or set to anything if your client software requires a non-blank password.
   </div>

7. Click on the Network Manager icon in the toolbar and select the newly configured server under `VPN Connections`.

8. Once connected you should see a a small lock next to the Network Manager icon. You can confirm that you are connected by checking your external IP in the terminal.

   ```
   curl ifconfig.co
   ```

### Troubleshooting

Most issues can be easily resolved by reviewing the OpenVPN logs. Network Manager normally writes to the syslog e.g. `/var/log/syslog` or `/var/log/messages`. You can filter the relevant logs by using grep e.g.

```
sudo grep VPN /var/log/syslog
```
