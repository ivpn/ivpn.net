---
title: IVPN for iOS now offers DNS over HTTPS
url: /blog/ivpn-for-ios-now-offers-dns-over-https/
highlighted: false
draft: false
authors:
  - Viktor Vecsei
categories:
  - Releases
tags:
  - Apps
  - Open source
date: 2021-03-18T14:05:00.000Z
thumbnailImage: /images-static/uploads/thumb-2x.png
images:
---
We are introducing DNS over HTTPS with the latest version of IVPN for iOS (2.3.0), out now.  

What are the new options available?

* For existing Custom DNS settings, it is now possible to enable HTTPS or TLS protocol
* You can now configure a custom DNS over HTTPS server that is used when there is no VPN connection

<figure class="shadow">
    <img width="400px" src="/images-static/uploads/disc_customdns.jpg">
</figure>

To make use of these changes you need iOS 14 or later installed on your devices.

DNS over HTTPS is only available with OpenVPN and WireGuard protocols. For IKEv2 we had to disable this feature due to a bug in iOS 14 that prevents using NEDNSSettingsManager API and NEVPNManager API together from the same container app, resulting in identifier conflict error. We plan to enable the feature for future iOS releases as soon as Apple fixes this issue. 

Further changes in this version:

* WireGuard is now the default protocol.
* We have upgraded OpenVPN and OpenSSL to the latest version. 
