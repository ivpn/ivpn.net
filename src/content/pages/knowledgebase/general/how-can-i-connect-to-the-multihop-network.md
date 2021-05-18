---
title: How can I connect to the Multi-hop network? - IVPN Help
h1: How can I connect to the Multi-hop network?
url: /knowledgebase/general/how-can-i-connect-to-the-multihop-network/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 170
---
# How can I connect to the Multi-hop network?

The Multi-hop network is compatible with any OpenVPN client, including Viscosity, Tunnelblick, OpenVPN Connect for iOS/Android etc.

<div markdown="1" class="notice notice--info">
These instructions are not required when using the official IVPN client. Simply select the Multi-hop tab on the main screen.
<p>Multi-hop is available on IVPN Pro accounts and limited to OpenVPN connections at this time.</p>
</div>

To use Multi-hop, you need to modify the IVPN Account ID you enter when connecting. You simply need to append an '@' symbol and a location code and your traffic will be routed through the specified exit location (regardless of which server you connect to).

For example, if you want your traffic to enter via the Romania server (ro.gw.ivpn.net) and exit via Switzerland, you would append **@ch** to your IVPN Account ID (e.g. **ivpnXXXXXXXX@ch** or **i-XXXX-XXXX-XXXX@ch**) and connect to Romania - that's it! If you connect to France with the same **@ch** IVPN Account ID,  the traffic will still exit in Switzerland.

To lookup the location codes, open the [server status](/status/) page. Note the server names are in the format XY.gw.ivpn.net where X is the location code and Y is a number uniquely identifying the server. Ignore the number (the entry server will automatically connect to the least loaded exit server) and use the code before the number. Below are some examples:

| Server | Location |
|---|---|
| ro1.gw.ivpn.net | ro |
| gb2.gw.ivpn.net | gb |
| us-nj1.gw.ivpn.net | 	us-nj |
