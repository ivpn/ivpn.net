---
title: New 'trusted Wi-Fi networks' feature for IVPN apps
authors: ["Ed Holden"]
categories: ["Releases"]
tags: ["Apps", "Privacy", "Security"]
draft: false
date: 2018-07-23T12:57:04+00:00
url: /blog/new-trusted-wi-fi-networks-feature-for-ivpn-apps/
comments:
  - author: Simon
    date: 2018-12-12T08:55:09+01:00
    content: |
      What about iOS?

---
Today we're releasing a new 'trusted Wi-Fi networks' feature for our desktop and Android apps. Some customers have different security requirements depending on whether they trust the specific Wi-Fi network they are connected to or not. For example, customers who use our VPN exclusively for Wi-Fi security often only want to be connected to the VPN when they are on untrusted networks e.g. public hotspot. Ideally they would like the VPN client to automatically establish a connection on networks they don't trust and disconnect on those they do. Another use case is customers who use the VPN for privacy but who have VPN routers on trusted networks they connect to - in this case they don't want to connect whilst connected to this network or they would establish nested VPN tunnels which perform very poorly.

Our new feature allows customers to set a trust status for all Wi-Fi networks that they have connected to (trusted, untrusted, none) and then define what actions should be taken automatically when joining a network with the defined trust status. When connecting to a untrusted network you can choose whether to automatically connect to the VPN and/or enable the firewall. Conversely, when connecting to a trusted network you can choose whether to automatically disconnect from the VPN and/or disable the firewall. In addition you can specify the default trust status of all new Wi-Fi networks that are joined (trusted, untrusted, none) so in most cases you don't need to do anything when joining a new network (we recommend setting the default as 'untrusted').

## macOS demo

![Trusted networks on macOS](/images-static/uploads/trusted-networks-macos.gif)

## Windows demo

![Trusted networks on Windows](/images-static/uploads/trusted-networks-windows.gif)

## Android demo

![Trusted networks on Android](/images-static/uploads/trusted-networks-droid.gif)
