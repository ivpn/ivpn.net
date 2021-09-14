---
title: Android IPSec with IKEv2 Setup Guide
url: /setup/android-ipsec-with-ikev2/
layout: setup
platform: android
---
# Android IPSec with IKEv2 Setup

1.  On your Android device, go to `Google Play`, search and install `strongSwan VPN Client` app.

2.  Launch the app, click on the `Add VPN Profile` button and fill in the following configuration:

    **Server** - choose any from the [server list](/status/) (i.e. **gb.gw.ivpn.net**)  
    **VPN Type** – IKEv2 EAP (Username/Password).  
    **Username** – your IVPN account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' (case-sensitive).  
    **Password** – `ivpn`.  
    **CA certificate** – check `Select automatically`.  
    **Profile name** – give it any name you prefer.  
    **Server identity** (check Show advanced settings) – same as the `Server` field.  
    Hit `Save`.  

    ![](/images-static/uploads/android-ipsec-with-ikev2-002.jpg)

3.  You have successfully created a new VPN profile. Tap on it to connect or disconnect.

    ![](/images-static/uploads/android-ipsec-with-ikev2-003.jpg)
