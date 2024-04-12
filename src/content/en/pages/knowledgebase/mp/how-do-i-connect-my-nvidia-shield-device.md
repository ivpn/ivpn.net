---
title: How do I connect my Nvidia Shield device? - IVPN Help
h1: How do I connect my Nvidia Shield device?
url: /knowledgebase/mp/how-do-i-connect-my-nvidia-shield-device/
sections:
    - mp
sectionTitle: Media Players
layout: help-details
weight: 50
---
# How do I connect my Nvidia Shield device?

The NVIDIA Shield and other similar devices use a limited implementation of Android. Our IVPN App has extra features that work well with the full version of Android, but not so well with limited versions.

The OpenVPN for Android app should work because it's functionality is limited to just the VPN connection. We offer a guide for the [OpenVPN for Android app](/setup/android-openvpn-for-android/).

This app should be available from the Play Store on your NVIDIA device. You will have to find a way to transfer the OpenVPN configuration files from step #1 to your device.

Alternatively, you can consider setting up the VPN connection on the router, which will let all devices that connect to it share this VPN connection, including your Nvidia Shield.

Here, at IVPN, we officially support pfSense, Asus-wrt, OpenWRT, DD-WRT & Tomato router firmware and if your device is one of the latter (or compatible to be flashed with either, which is always done at your own risk) you are very welcome to review our [router setup guides](/setup/router/).

Generally, it is also possible to connect other routers that have **OpenVPN client** support & you can try using the setup guides above as a reference.

Alternatively, you can also order a router with preconfigured IVPN on it from, e.g. [Vilfo](https://www.vilfo.com/providers/ivpn), [Flashrouters](https://www.flashrouters.com/vpn-types/ivpn) or [VPNrouters](https://www.vpnrouters.com/vpn-providers/ivpn-vpn-routers.html).
