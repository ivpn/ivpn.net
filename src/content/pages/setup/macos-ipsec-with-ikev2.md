---
title: IPSec IKEv2 for macOS Setup Guide
url: /setup/macos-ipsec-with-ikev2/
layout: setup
platform: macos
---
# macOS - IPSec with IKEv2 Setup Guide

This guide will help you set up an IPSec connection using IKEv2

1. In the dock click `System Preferences`

2. In System Preferences click `Network`

3. In Network click the `+` symbol on the bottom left

4. Select `Interface` VPN
   
   Select `VPN Type` IKEv2
   
   Give this a `Service Name` to identify it by and click `Create`

   ![](/images-static/uploads/mac-osx-ipsec-with-ikev2-004.png)

5. In Network fill in the `Server Address` using the address of one of the servers from the [server status](/status/) list (depending on which country you want to connect to). The `Remote ID` should be the same as the Server Address

   ![](/images-static/uploads/mac-osx-ipsec-with-ikev2-005.png)

6. Click `Authentication Settings ...`. Select `Username`. Fill in your IVPN Account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX' (case-sensitive) and the following password - `ivpn`. Click `OK`

   ![](/images-static/uploads/mac-osx-ipsec-with-ikev2-006.png)

7. In Network click `Apply`

8. To connect, in network click on the adaptor created above then click `Connect`

   ![](/images-static/uploads/mac-osx-ipsec-with-ikev2-008.png)

9. To Disconnect, in network click on the adaptor and then click `Disconnect`.

   ![](/images-static/uploads/mac-osx-ipsec-with-ikev2-009.png)
