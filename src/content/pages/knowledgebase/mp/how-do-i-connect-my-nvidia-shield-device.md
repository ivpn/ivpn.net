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

The OpenVPN for Android app should work because its functionality is limited to just the VPN connection. We offer a guide for the [OpenVPN for Android app](/setup/android-openvpn-for-android/).

This app should be available from the Play Store on your NVIDIA device. You will have to find a way to transfer the OpenVPN configuration files from step #1 to your device.

Alternatively, you can consider setting up the VPN connection on the router, which will let all devices that connect to it share this VPN connection, including your NVIDIA Shield.

We officially support pfSense, OPNsense, Asus-wrt, OpenWRT, DD-WRT, and Tomato router firmware.  Check our [router setup guides](/setup/router/) for details.

Generally, it is also possible to connect other routers that have **OpenVPN** or **WireGuard** client support and you can try using the setup guides above as a reference.  If your router accepts a configuration file, file generators are available for [OpenVPN](/openvpn-config) and [WireGuard](/account/wireguard-config).

As a final option, you can also order a router with preconfigured IVPN on it from, e.g. [Vilfo](https://www.vilfo.com/providers/ivpn) or [Flashrouters](https://www.flashrouters.com/vpn-types/ivpn).
