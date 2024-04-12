---
title: Introducing split tunnelling to IVPN for Windows
url: /blog/introducing-split-tunnelling-to-ivpn-for-windows/
highlighted: false
draft: false
authors:
  - Viktor Vecsei
categories:
  - Releases
tags:
  - Apps
  - Privacy
date: 2021-09-14T05:00:00.000Z
thumbnailImage: /images-static/uploads/split.png
---
Split tunnels enable you to remain connected to your VPN while simultaneously accessing specific apps and services directly, bypassing the VPN tunnel.  With this solution you can protect your privacy and connect to services that restrict or block customers who use commercial VPNs. This can be very useful when you need to access banking, streaming or gaming providers using your personal IP address.

Split tunnels were previously supported on IVPN for Android, today we are adding this functionality to our Windows app, with Linux support coming later. Currently this feature is in beta and may still contain some bugs although it has been extensively tested internally.

To enable split tunnelling update to the latest app version (v3.3.40) and define which applications you want to exclude from the tunnel. For example, to connect to Steam directly while using IVPN, add the Steam app to the list of Excluded Applications in the IVPN settings before launching it. If you plan to use split tunnelling to access local libraries of streaming services, follow the steps laid out in our [dedicated guide](/knowledgebase/general/can-i-access-hulu-or-netflix-or-bbc-iplayer-using-ivpn/).

Note that these benefits come with risks. A split tunnel creates an intentional leak and so depending on your threat model we suggest reviewing our [Split Tunnel Uses and Limitations](/knowledgebase/general/split-tunnel-uses-and-limitations/) article to learn about potential issues and how to mitigate them.

If you have any questions or feedback about split tunnels, [reach out to us](/contactus/).

IVPN Staff
