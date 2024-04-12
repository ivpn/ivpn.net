---
title: Error 424 public key not found - IVPN Help
h1: Error 424 public key not found
url: /knowledgebase/android/error-424-public-key-not-found/
sections:
    - android
sectionTitle: Android
layout: help-details
weight: 20
---
# Error 424 public key not found

Try logging out from the IVPN app and back in to force the app to resync with our WireGuard key management servers - this may resolve the issue with generating WireGuard keys.

You can also try regenerating WireGuard keys manually. In the IVPN app, navigate to `Settings` - `VPN protocol`, select `WireGuard`, tap on the `WireGuard details` -> `Re-generate keys`.

To additionally rule out any software-related issues with the app, try clearing its cache in your phone's Settings - Applications area, then uninstall the app, restart your device and install it back.

In case the issue persists, high chances are that your current network is blocking the calls to our key management servers. If nothing from the above works, you may try connecting from a different, less-restrictive network or try connecting to our OpenVPN servers instead.