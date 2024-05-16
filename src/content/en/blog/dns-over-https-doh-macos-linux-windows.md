---
title: DNS over HTTPS (DoH) support on macOS, Linux and Windows
url: /blog/dns-over-https-doh-macos-linux-windows/
draft: false
authors:
  - IVPN Staff
categories:
  - Releases
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - Apps
  - Security
date: 2022-04-05T07:56:15.000Z
# 740px X 740px
thumbnailImage: /images-static/uploads/linux.png
---
IVPN offers custom DNS servers which, when accessed through the VPN ensure that your DNS queries are encrypted between your device and our DNS server. This is a necessity, as DNS queries are not encrypted by the DNS protocol and can be easily read by an adversary observing your traffic (even when using HTTPS for your web traffic). 

Our DNS servers are logless, audited and also offer an Anti-tracker solution, which blocks most 3rd party trackers. However, some customers have additional requirements which require DNS over HTTPS (DoH) support to securely use 3rd party DNS servers.  DNS over HTTPS encrypts your DNS queries using HTTPS (tunneled through the VPN) and appears just like any other web traffic.

You can now configure a custom DNS server which supports DNS over HTTPS from within the IVPN app on macOS, Linux and Windows 8, 10 or 11. Customers who do not require the use of a 3rd party DNS server (e.g. custom filtering lists) do not need to configure DNS over HTTPS. Doing so does not provide any additional security or privacy over the IVPN DNS server - unless you trust your DNS provider more than IVPN.

If you have any questions please don't hesitate to [reach out][1] to our technical support team.

IVPN Staff


 [1]: https://www.ivpn.net/contactus/
