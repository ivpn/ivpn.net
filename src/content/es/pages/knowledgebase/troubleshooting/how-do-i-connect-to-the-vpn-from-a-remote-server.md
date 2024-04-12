---
title: How do I connect to the VPN from a remote server - IVPN Help
h1: How do I connect to the VPN from a remote server
url: /knowledgebase/troubleshooting/how-do-i-connect-to-the-vpn-from-a-remote-server/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 200
---
# How do I connect to the VPN from a remote server

If you attempt to connect to the VPN from a server that you are remotely connected to, you will lose the connection to the server as soon as the VPN connects. This is because the VPN server pushes a new default route that sends the return traffic through the VPN. To prevent this, you'll need to edit the OpenVPN config file for the server you are connecting to and add the line below:

```
route A.B.C.D 255.255.255.255 net_gateway
```

where A.B.C.D is the IP address of the device you are connecting from.

If you don't want to route all traffic through the VPN you can reject the default route pushed by the server by adding the directive below to the config file. You will then need to add your own static routes for the addresses you do want to route through the VPN.

```
route-nopull
```
