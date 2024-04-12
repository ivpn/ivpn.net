---
title: Connecting to IVPN on Amazon Fire TV - IVPN Help
h1: Connecting to IVPN on Amazon Fire TV
url: /knowledgebase/mp/connecting-to-ivpn-on-amazon-fire-tv/
sections:
    - mp
sectionTitle: Media Players
layout: help-details
weight: 20
---
# Connecting to IVPN on Amazon Fire TV

The IVPN App is not currently compatible with the Amazon implementation of Android.  If you would like to use IVPN on your Amazon Fire TV Stick, follow the instructions below to setup a connection using the OpenVPN for Android app.

### Install the OpenVPN for Android app

1. On your Fire device, navigate to `Settings` -> `Developers Options` and enable `Apps from Unknown Sources` and `ADB Debugging`.
2. Install ES File Explorer app on the Fire device.
3. Open ES File Explorer and download the latest version of OpenVPN for Android from [here](http://plai.de/android/ics-openvpn-latest-stable.apk)

### Transfer the OpenVPN configuration files

1. Install an FTP client on your computer system.
2. Generate and download the [IVPN configuration files](/openvpn-config) on your computer system and extract the .ovpn files from the .zip file into a sub-folder.
3. Open ES File Explorer on the Fire device and navigate to `Network` -> `Remote Manager` on the sidebar.
4. Enable `Remote Manager` and make sure it gives an IP address for the FTP server.
5. Enter the FTP server IP address from Remote Manager into the FTP client on the computer system. It may work best if the Fire device and the computer system are on the same network.
6. Upload the sub-folder with the .ovpn files from your computer system to the Downloads folder on the Fire device via the FTP client.
7. Disable the `Remote Manager` in the Fire device after the transfer is complete.
8. In the ES File Explorer, navigate to `Local` -> `Download`. The OpenVPN configuration files should be inside the sub-folder.

### Import the configuration

1. Launch the OpenVPN for Android app.
2. Follow our [OpenVPN for Android Setup Guide](/setup/android-openvpn-for-android/) starting on step #3.
3. For the import in step #4, select the ES File Explorer as the navigator and go to the Download folder.
