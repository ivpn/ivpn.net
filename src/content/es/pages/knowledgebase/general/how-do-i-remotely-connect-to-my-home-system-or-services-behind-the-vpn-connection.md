---
title: How do I remotely connect to my home system or services behind the VPN connection? - IVPN Help
h1: How do I remotely connect to my home system or services behind the VPN connection?
url: /knowledgebase/general/how-do-i-remotely-connect-to-my-home-system-or-services-behind-the-vpn-connection/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 13
---
# How do I remotely connect to my home system or services behind the VPN connection?

When you are connected to a VPN service, the VPN gateway server protects your device from potentially hostile incoming connections in the same way that your router or firewall does.

Remote access to services and devices (like media, file, web servers, etc.) or the system itself running behind a VPN becomes impossible without opening the port on the server and forwarding the traffic to the recipient – a service called Port Forwarding which is [not available](/blog/gradual-removal-of-port-forwarding) with IVPN.

One way to solve this is to enable and configure Port Forwarding on the router, though this often requires owning a static IP address provided by your ISP with the router connected directly to the Internet (not behind NAT).

Another way is to use an open-source software called [Tailscale](https://tailscale.com/) that interconnects your devices into a single, secure peer-to-peer WireGuard mesh network allowing you to access your services and resources from anywhere on the Internet, even those behind IVPN or ISP NAT.

The service is free to individuals and supported on plethora of popular operating systems and devices. To explore this solution we suggest reviewing documentation and setup guides published by Tailscale [here](https://tailscale.com/kb/1017/install/).