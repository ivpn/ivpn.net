---
title: OpenVPN for iPhone Setup Guide
url: /setup/iphone-openvpn-connect/
layout: setup
platform: ios
---
# iPhone - OpenVPN Setup Guide

OpenVPN Connect is the official iOS client from OpenVPN Technologies.

1.  Install app from the [iTunes store](https://apps.apple.com/us/app/openvpn-connect/id590379981).

    ![](/images-static/uploads/install-openvpn-connect-iphone-010-320x480.png)

2.  Download the [IVPN config files](/releases/config/ivpn-openvpn-config.zip) to your Mac/PC and unzip. Within the extracted folder are the config files which represent each server in the IVPN network. You will need one or more of these files in the next step depending on whether you want to connect to a server in a single location or wish to have all the locations available on your iPhone.

3.  To upload the configurations file/s into OpenVPN Connect, you have to either upload them to a cloud storage service such as dropbox or email them to yourself (or use AirDrop if you know how to use it).

    To use dropbox, upload the config file/s to your dropbox account. On the iPhone, open Dropbox and select a config file. Click on the share icon (square with an arrow pointing up) in the top right corner. Tap on the `Open in` icon and then tap `Copy to OpenVPN`.

    To email, send the config file/s to an email address that is accessible on your device. Open the email and tap the icon of the configuration file in your email. Choose the option `Copy to OpenVPN`.

4.  Tap the green "+" button to add the server.

    ![](/images-static/uploads/install-openvpn-connect-iphone-020-320x480.png)

5.  Enter your account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' and any password.

    <div markdown="1" class="notice notice--info">
    Only your account ID is used for authentication and is case-sensitive. The password field can be left empty or set to anything if your client software requires a non-blank password.
    </div>

    Click on the `save` slider if you wish to save your credentials. Click on the `Connection` slider (under the disconnected button) to initiate the connection.

    ![](/images-static/uploads/install-openvpn-connect-iphone-030-320x480.png)

6.  If you see a message asking you whether to "Allow OpenVPN to enable VPN connection" click `Yes`.

    ![](/images-static/uploads/install-openvpn-connect-iphone-040-320x480.png)

7.  Once connected you will see the new status `Connected` and also a VPN status bar icon. You can click on the `+` symbol to see more information about your connection.

    ![](/images-static/uploads/install-openvpn-connect-iphone-050-320x480.png)
