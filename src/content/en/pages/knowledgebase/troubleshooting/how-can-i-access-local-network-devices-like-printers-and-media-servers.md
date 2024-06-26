---
title: 'How Can I Access Local Network Devices like Printers and Media Servers? - IVPN Help'
h1: 'How Can I Access Local Network Devices like Printers and Media Servers?'
url: /knowledgebase/troubleshooting/how-can-i-access-local-network-devices-like-printers-and-media-servers/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 170
---
# How Can I Access Local Network Devices like Printers and Media Servers?

By default, the IVPN App's [kill switch firewall](/knowledgebase/general/do-you-offer-a-kill-switch-or-vpn-firewall/) blocks access to local networks and local devices to prevent leaks.

Check the IVPN App's `Settings > IVPN Firewall` area and enable the `Allow LAN traffic` and `Allow Multicast` options to gain access to local network devices, like your printer, media server, or other systems.

Not all network services require **Multicast** access, so feel free to experiment with this option to see if it is required or not.

If your computer system travels to other networks, we recommend disabling the two `Allow...` options for security.  Not only are outgoing connections permitted, like to access a printer, but incoming connections are permitted as well.
