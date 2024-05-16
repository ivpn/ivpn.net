---
title: DD-WRT Router Setup Guide
listItem: DD-WRT
url: /setup/router/ddwrt/
section: Router Setup
platform: router
layout: setup-article
weight: 10
---
## DD-WRT Router Setup Guide

Our service is compatible with routers running DD-WRT. However please note:

1. If you do not already have a compatible router or do not wish to risk bricking it, we recommend [FlashRouters](http://www.flashrouters.com/routers/vpn-types/ivpn/) who offer a variety of custom-built DD-WRT routers specially configured for IVPN. We receive no commission from sales but we highly recommend them as they have the expertise to support DD-WRT with its constantly evolving firmware and associated bugs.
2. If you already have a router FlashRouters [offer support](https://www.flashrouters.com/services/support-plans) plans where they will remotely install the correct firmware on your router and configure it to connect to our VPN service.
3. We do not provide support in getting DD-WRT or Tomato firmware installed on your router. You [install DD-WRT](http://www.dd-wrt.com/wiki/index.php/Installation) at your own risk. We take no responsibility if you brick/damage your router in the process.
4. Please ensure that you are using the latest version of the DD-WRT firmware. There are multiple bugs relating to OpenVPN and DNS in older versions.
5. Our DD-WRT OpenVPN scripts **will not work with MINI or MICRO versions of DD-WRT. You must install the BIG or MEGA versions of the DD-WRT firmware** (Some customers have reported STD versions working).

### Setup guides

* [DD-WRT OpenVPN Automated Setup Guide](/setup/router/ddwrt-auto/)  
  (Only compatible with BIG or MEGA versions of DD-WRT)
* [DD-WRT OpenVPN Manual Setup Guide](/setup/router/ddwrt-manual/)
* [DD-WRT WireGuard Setup Guide](/setup/router/ddwrt-wireguard/)
