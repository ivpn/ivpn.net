---
title: OpenVPN for Android v4.0+ Setup Guide
url: /setup/android-openvpn-for-android/
layout: setup
platform: android
---
# OpenVPN for Android setup guide

[OpenVPN for Android](https://play.google.com/store/apps/details?id=de.blinkt.openvpn&hl=en) is an open source client compatible with all versions of Android 4.x (Ice Cream Sandwich) and later. Most devices released since 2012 are running Android 4.x or later.

1.  Download the [OpenVPN config files](/releases/config/ivpn-openvpn-config.zip) either directly to your android device or to a seperate PC and unzip the file. If using a PC, transfer the contents to your Android device via USB/SD-card/Dropbox.

2.  Open the Google Play Store and install `openvpn for android` by Arne Schwabe. When the installation is complete tap `Open`.

3.  Tap on the `+` icon.

    ![](/images-static/uploads/install-openvpn-for-android-010-281x500.png)

4.  Tap on the `import` button.

    ![](/images-static/uploads/install-openvpn-for-android-020-281x500.png)

5.  Navigate to the folder location where you copied the files in step 1 and tap on the name of the server that you wish to connect to (the server config files end with .ovpn).

    ![](/images-static/uploads/install-openvpn-for-android-030-281x500.png)

6.  You will see confirmation that the config file has been imported. Tap the `save to disk` icon in the bottom right area.

    ![](/images-static/uploads/install-openvpn-for-android-040-281x500.png)

7.  You will see the server is now available in the profiles tab. Tap the server name to connect.

    ![](/images-static/uploads/install-openvpn-for-android-050-281x500.png)

8.  Grant the application permission by clicking `I trust this application` and `OK`.

    ![](/images-static/uploads/install-openvpn-for-android-060-281x500.png)

9.  Enter your account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' and any password.

    <div markdown="1" class="notice notice--info">
    Only your account ID is used for authentication and is case-sensitive. The password field can be left empty or set to anything if your client software requires a non-blank password.
    </div>

    Tap the `Save Password` box if you do not wish to enter credentials everytime you connect. Tap the `OK` button.

    ![](/images-static/uploads/install-openvpn-for-android-070-281x500.png)

10. Once successfully connected you should see a lock icon in the notification area at the top. If you pull down your notification bar you should see the 'OpenVPN for Android' app listed showing that you are connected. If you tap on this button you should see statistics about the connection incl option to disconnect.

    ![](/images-static/uploads/install-openvpn-for-android-080-281x500.png)

11. Repeat steps 3-6 if you need to create any additional VPN server connections.
