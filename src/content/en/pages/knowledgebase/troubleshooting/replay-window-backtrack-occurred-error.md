---
title: '"Replay-window backtrack occurred" - error - IVPN Help'
h1: '"Replay-window backtrack occurred" - error'
url: /knowledgebase/troubleshooting/replay-window-backtrack-occurred-error/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 170
---
# "Replay-window backtrack occurred" - error

This error is generally caused by network congestion and latency when using the UDP protocol. Essentially packets are being dropped or received by the server in the wrong order. This is often seen when connecting to Wi-Fi networks with a poor signal or 3G/4G networks.

The best solution is to switch to using the TCP protocol. You can do this by selecting the TCP protocol option from within the IVPN app or editing the relevant OpenVPN configuration file.
