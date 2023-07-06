---
title: I lose Internet connection when I disconnect from IVPN. Why? - IVPN Help
h1: I lose Internet connection when I disconnect from IVPN. Why?
url: /knowledgebase/troubleshooting/i-lose-internet-connection-when-i-disconnect-from-ivpn-why/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 240
---
# I lose Internet connection when I disconnect from IVPN. Why?

Most likely, you have IVPN Firewall (Kill switch) enabled. It was designed to ensure that all traffic is routed strictly through the VPN tunnel to prevent any possible leaks or your real IP address getting exposed. Given the latter, it will also block the Internet connection if you disconnect from the IVPN network.

To regain access to the Internet, you must either disable the IVPN Firewall or reconnect to any of the IVPN servers. You may also control its behavior within the app's `Settings` area - `IVPN Firewall` tab.

You can read more about how our Firewall works [here](/knowledgebase/general/do-you-offer-a-kill-switch-or-vpn-firewall/)
