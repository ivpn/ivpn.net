---
title: IPSec IKEv2 for iPad Setup Guide
url: /setup/iphone-ipsec-ikev2/
layout: setup
platform: ios
---
# iPhone IKEv2 Setup Guide

This guide will help you set up an IPSec connection using IKEv2.

1.  On your iOS device, navigate to `Settings` -> `VPN` and click on the `Add VPN Configuration` button.

2.  Enter the following configuration:

    **Type** - IKEv2  
    **Description** - Any description to identify VPN server  
    **Server** - Choose any from the server list (i.e. gb.gw.ivpn.net)  
    **Remote ID** - Same as the Server field  
    **Local ID** - Empty  
    **User Authentication type** - Username  
    **Username** - Your IVPN account ID (starts with ‘ivpnXXXXXXX’)  
    **Password** - ivpn  
    **Proxy settings** - Off  

    ![](/images-static/uploads/ios-ipsec-with-ikev2-01.jpg)

3.  Tap `Done` to finalize the setup.

4.  Your newly created VPN configuration is now available. Tap on the switch button to connect or disconnect.

    ![](/images-static/uploads/ios-ipsec-with-ikev2-02.jpg)
