---
title: I cannot access devices on my local network. Why? - IVPN Help
h1: I cannot access devices on my local network. Why?
url: /knowledgebase/troubleshooting/i-cannot-access-devices-on-my-local-network-why/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 210
---
# I cannot access devices on my local network. Why?

Whenever you use any of our desktop apps ([Windows](/apps-windows/), [macOS](/apps-macos/) or [Linux](/apps-linux/)) with the [IVPN Firewall](/knowledgebase/general/do-you-offer-a-kill-switch-or-vpn-firewall/) enabled, please, keep in mind that all traffic is routed strictly through the VPN tunnel. This will prevent access to network printers, print servers, media servers, IP cameras, and all other devices on your local network.

If you want to access and use a printer (or any other device) that resides on your local network – in the IVPN client, navigate to `Settings` - `IVPN Firewall` tab and check both `Allow LAN traffic when IVPN Firewall is enabled` and `Allow Multicast...` options.

<div markdown="1" class="notice notice--warning">
Note: Enabling these options will allow traffic only between devices that reside on the same local network and subnet mask. If you are unable to access them despite having these options checked, verify the IPs on both devices belong to the same local network and subnet mask.
</div>
