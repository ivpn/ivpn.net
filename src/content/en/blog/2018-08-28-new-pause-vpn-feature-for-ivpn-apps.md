---
title: New 'Pause VPN' feature for IVPN apps
authors: ["Ed Holden"]
categories: ["Releases"]
tags: ["Apps"]
draft: false
date: 2018-08-28T10:25:22+00:00
url: /blog/new-pause-vpn-feature-for-ivpn-apps/

---
We've recently released new versions of our desktop and Android apps with a new 'Pause VPN' feature. Based on feedback from customers, we discovered that some were disconnecting temporarily from the VPN in order to connect to various services that were blocked whilst connected e.g. some payment gateways etc. When disconnected these customers were sometimes forgetting to reconnect after completing their task, leaving them in an insecure state until they remembered to manually reconnect. This could be hours or more, representing a serious privacy threat. Whilst being disconnected for even a few seconds is unacceptable for many of our hardcore privacy customers (who we don't expect to use this feature) we felt it was important to mitigate the risk of being left insecure for those who want to disconnect and understand the risk of doing so.

In response we developed the 'Pause VPN' button which, when pushed, gives you the option to immediately pause the VPN for a configurable amount of time. When you do this, the VPN remains connected but your data is routed through your default ISP connection instead of our VPN gateways. To ensure that you are aware of this, we have a model window above all other windows (see below) that shows you the state of the connection and the time remaining until the VPN connection automatically resumes. Whenever you want, you can instantly resume your VPN privacy or if required add additional time to the pause VPN auto-resume timer.

## macOS demo

![Pause VPN on macOS](/images-static/uploads/pause-resume-vpn-macos.gif)

## Windows demo

![Pause VPN on Windows](/images-static/uploads/pause-resume-vpn-windows.gif)

## Android demo

![Pause VPN on Android](/images-static/uploads/pause-resume-droid.gif)