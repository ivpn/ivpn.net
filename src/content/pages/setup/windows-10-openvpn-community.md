---
title: OpenVPN Manual setup for Windows 10
url: /setup/windows-10-openvpn-community/
layout: setup
platform: windows
---
# Windows 10 - OpenVPN Manual Installation

This guide demonstrates how to install the community edition of OpenVPN for Windows.

<div markdown="1" class="notice notice--warning">
If you are using IVPN to protect your privacy/anonymity this software does not offer any DNS leak protection, you may wish to install the scripts from <a href="https://www.dnsleaktest.com">www.dnsleaktest.com</a> to implement DNS leak prevention. In addition if the VPN connection is dropped for any reason, traffic may leak unencrypted through your default gateway. You may want to configure firewall software to mitigate this risk. For these reasons we recommend installing the IVPN client.
</div>

1.  Download the latest OpenVPN installer from the [OpenVPN community downloads](http://openvpn.net/index.php/download/community-downloads.html) page. Ensure that you download the correct version for your architecture i.e. 32 or 64 bit (If you're not sure see [here](http://windows.microsoft.com/en-us/windows7/find-out-32-or-64-bit)).

2.  Run the installer and answer the required prompts to install the software. Select the default set of components to install. If you have not installed OpenVPN before you may be asked to install the TAP drivers. Check the box "Always trust software from OpenVPN" and click `Install`.

3.  Download the [OpenVPN configuration files](/releases/config/ivpn-openvpn-config.zip).

4.  Extract the zip file and copy the contents of the `ivpn-openvpn-config` folder (the .ovpn files) to the `config` folder within the OpenVPN installation directory (Usually C:\Program Files (x86)\OpenVPN\config on 32-bit systems and C:\Program Files\OpenVPN\config on 64-bit systems).

5.  Right click on the OpenVPN shortcut on the desktop and choose `Properties`, switch to the `Compatibility` tab and enable `Run this program as an administrator`.

6.  Start the OpenVPN GUI by double-clicking the shortcut on the desktop. You must allow the application to run as administrator if it requests permission (This is required to update the local routing table).

7.  Right click on the OpenVPN system tray icon (two small monitors in bottom right corner, click the up arrow if icon is hidden) and select the server you wish to connect to and click on `Connect`. Enter your account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' and any password when prompted.

    <div markdown="1" class="notice notice--info">
    Only your account ID is used for authentication. The password field can be left empty or set to anything if your client software requires a non-blank password.
    </div>

8.  When the tray icon turns green you are connected to the IVPN network. Right click to disconnect.
