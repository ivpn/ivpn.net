---
title: OpenVPN for Android v2.1+ Setup Guide
url: /setup/android-featvpn/
layout: setup
platform: android
---
# FeatVPN for Android v2.1+ Setup Guide

[FeatVPN](http://www.featvpn.com/) implements the OpenVPN protocol and is compatible with all versions of Android. However if you are using Android 4.x or later we recommend using [Openvpn for Android](/setup/android-openvpn-for-android/).

1.  Navigate to [www.featvpn.com](http://www.featvpn.com/) from your device, download and install the app. When the installation is complete tap `Open`.

2.  Download the [OpenVPN config files](/releases/config/ivpn-openvpn-config.zip) either directly to your android device or to a seperate PC and unzip the file. If using a PC, transfer thecontents to your Android device via USB/SD-card/dropbox.

3.  Tap `Setup` to run a series of tests to check that your phone is capable of running FeatVPN.

    ![](/images-static/uploads/install-featvpn-android-010-281x500.png)

4.  Wait for the tests to complete. If all tests complete successfully, tap `exit` to continue.

    ![](/images-static/uploads/install-featvpn-android-020-281x500.png)

5.  Tap `Tunnels` to add a VPN connection.

    ![](/images-static/uploads/install-featvpn-android-030-281x500.png)

6.  Tap `Add`.

    ![](/images-static/uploads/install-featvpn-android-040-281x500.png)

7.  Under Configuration, tap `Load`.

    ![](/images-static/uploads/install-featvpn-android-050-281x500.png)

8.  Navigate to the location where you saved the configuration files and choose the server you wish to configure.

9.  Tap the `back` button.

    ![](/images-static/uploads/install-featvpn-android-070-281x500.png)

10. The server for the configuration file you selected will be listed. Tap the connection to connect.

    ![](/images-static/uploads/install-featvpn-android-080-281x500.png)

11. Enter your account ID that begins with letters 'ivpn' and any password.

    <div markdown="1" class="notice notice--info">
    Only your account ID is used for authentication. The password field can be left empty or set to anything if your client software requires a non-blank password.
    </div>

    Tap `OK`.

    ![](/images-static/uploads/install-featvpn-android-090-281x500.png)

12. After a few seconds you should notice that the connection has been established.

    ![](/images-static/uploads/install-featvpn-android-100-281x500.png)

13. Repeat steps 5-13 to create any additional VPN server connections.
