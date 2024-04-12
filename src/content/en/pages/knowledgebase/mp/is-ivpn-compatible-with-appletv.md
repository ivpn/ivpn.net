---
title: Is IVPN compatible with AppleTV? - IVPN Help
h1: Is IVPN compatible with AppleTV?
url: /knowledgebase/mp/is-ivpn-compatible-with-appletv/
sections:
    - mp
sectionTitle: Media Players
layout: help-details
weight: 40
---
# Is IVPN compatible with AppleTV?

Currently, the AppleTV device has no capability to have a VPN client set up on it. One way to achieve getting a VPN-based connection on an AppleTV is to setup a router with a VPN connection, which the AppleTV connects through. This method provides a VPN connection to all the devices on your network.

Apple networking devices, like AirPlay and AirPort, are severely limited in how they can be configured -- especially with VPN configurations. No Apple-based routers are capable of supporting a VPN connection that is compatible with the services we offer, but many off-the-shelf routers are capable of supporting a connection like this.

We officially support DD-WRT and Tomato firmware, Asuswrt Merlin plus pfSense, so if your router already has this firmware or has the capability to run this firmware, then our VPN service is fully compatible. We provide setup guides for these custom firmware projects in our [router setup guide section](/setup/router/).

If your router does not have one of the types firmware mentioned above, it may be possible to flash the firmware onto the router. Please note that you assume all risk in flashing your device. You can buy "pre-flashed" routers online from several companies if you prefer not to do this yourself.

* [FlashRouters](https://www.flashrouters.com/vpn-types/ivpn)
* [VPN Routers](https://www.vpnrouters.com/vpn-providers/ivpn-vpn-routers.html)

Some routers feature a built-in OpenVPN client and we offer [OpenVPN configuration files](/openvpn-config), so it is possible to connect to our servers this way.

Vilfo offers a dedicated VPN router with IVPN pre-configured. When you receive the router all you need to do is enter your IVPN Account ID (starts with ivpn) to connect.

* [Vilfo router](https://www.vilfo.com/providers/ivpn?ref=ivpn) - Please note that if you purchase a router from Vilfo we receive a commission.
