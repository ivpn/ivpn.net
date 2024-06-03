---
title: IPv6 (over IPv4) available for testing
url: /blog/ipv6-over-ipv4-available-for-testing/
highlighted: false
draft: false
authors:
  - Nick Pestell
categories:
  - Releases
tags:
  - Apps
  - WireGuard
date: 2021-06-29T07:05:00.000Z
---
We now provide the option to receive an IPv6 address when connecting to our servers using WireGuard. This enables those with only an IPv4 address to access the IPv6 Internet. Access to IPv6 to connect to our servers using IPv6 is under development, and not yet included in this update.

IPv6 over IPv4 is now available in all IVPN apps. If required, enable the option to see your assigned IPv6 address after connecting as well as the geolocation for both the IPv4 and IPv6 address. These two might be different in some due to how geolocation providers collect and publish this information. If you have a native IPv6 connection this feature will also display your IPv6 information when disconnected from the VPN.

All our backend infrastructure (e.g. authentication servers) are IPv6 enabled which also allows us to better bypass blocks that previously prevented some customers from being able to login to the app. Similarly in cases where a website or service has blocked our IPv4 address, customers may have success in accessing the service over IPv6.

Its important to note that when using this feature you will have both an IPv4 and IPv6 address i.e. dual-stack and will have effectively no control over which protocol is chosen when both IPv4 and IPv6 DNS records are returned for a host. Operating systems implement [RFC 6724](https://datatracker.ietf.org/doc/html/rfc6724) to varying degrees but applications can also implement their own logic which mostly follows the ‘Happy Eyeballs’  algorithm as defined in [RFC 8305](https://datatracker.ietf.org/doc/html/rfc8305). Happy Eyeballs attempts to optimize the user experience by trying both connections in parallel and using the first connection returned. For example, if you visit the IVPN website after enabling IPv6 in the app you will see in the header which protocol your browser has selected for our website (either an IPv4 or IPv6 address).

If you have any questions about this feature please reach out to our support team.
