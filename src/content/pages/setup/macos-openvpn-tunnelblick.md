---
title: Tunnelblick (OpenVPN) for macOS Setup Guide
url: /setup/macos-openvpn-tunnelblick/
layout: setup
platform: macos
---
# macOS - OpenVPN Tunnelblick Setup Guide

1. Download the [latest stable release](https://tunnelblick.net/downloads.html). If you are using a pre-release version of macOS then you may need to download the beta release. Unless your version of macOS is not supported by the current stable release we always recommend using the stable release.

2. Double-click the downloaded `.dmg` file to open the disk image. Double-click the `Tunnelblick.app` icon to install into your applications folder. You may see a warning about Tunnelblick being downloaded from the Internet - Click `open` to continue. When the installer asks if you want to launch or quit Tunnelblick, click `Quit`.

3. Download the [IVPN config files](/releases/config/ivpn-openvpn-config.zip). Unzip the downloaded file and then open the new `ivpn-openvpn-config` folder. Select all the files, right-click one of them and select `open with` / `tunnelblick.app`.

4. Select whether you want to enable the connections for only yourself or for all users of your computer. Next you will be asked to enter your macOS password to import the configurations.

5. You will notice a new status menu icon that looks like a tunnel. Click this icon and you will be presented with a list of VPN servers that you have imported. Click on a VPN server to connect.

6. Enter your account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' and any password.

   <div markdown="1" class="notice notice--info">
   Only your account ID is used for authentication. The password field can be left empty or set to anything if your client software requires a non-blank password.
   </div>

   Click `Save in keychain` to save the credentials for that server. Click `OK` to continue. You should see the status menu icon running some animation effects as it connects to the IVPN network.

7. If the tunnel has gone dark you are connected! Click the Tunnelbick icon and you will see your active connections in the list. Click the same VPN server entry to disconnect.
