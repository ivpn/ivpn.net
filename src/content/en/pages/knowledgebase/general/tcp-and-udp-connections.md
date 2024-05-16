---
title: TCP and UDP Connections - IVPN Help
h1: TCP and UDP Connections
url: /knowledgebase/general/tcp-and-udp-connections/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 590
---
# TCP and UDP Connections

Generally, UDP traffic is more a efficient protocol compared to TCP due to the simpler design. UDP is a lightweight protocol with no ordering of messages, no connection tracking, and fewer packets for overhead. TCP is a heavyweight protocol with more overhead required for the initial handshake and every subsequent packet.

UDP is typically used for video streaming and Internet service providers have a tendency to employ traffic shaping techniques to keep the massive quantities of video traffic under control. This shaping can catch UDP-based VPN traffic accidentally, which may result in a slower connection that expected. Switching to the TCP protocol may result in a connection with better performance.

By default, IVPN apps and our [OpenVPN configuration files](/openvpn-config) use a UDP connection to take advantage of the benefits and efficiency of the protocol. We offer OpenVPN connections on UDP 53, 80, 443, 1194, 2049, 2050 and TCP 80, 443, 1443. Since all networks are different, our IVPN apps makes it easy to [change the protocol and port](/knowledgebase/troubleshooting/how-do-i-change-the-port-or-protocol-used-to-connect/) for the connection.

For manual OpenVPN connections, you can also generate and download TCP-based [OpenVPN configuration files](/openvpn-config).

Currently, IPSec and WireGuard only use UDP-based connections, so there are fewer tuning options. IPSec is the least configurable because it only accepts connections on UDP port 500. WireGuard can accept connections on any UDP port. We offer ports 53, 80, 443, 1194, 2049, 2050, 30587, 41893, 48574, and 58237 for WireGuard connections.
