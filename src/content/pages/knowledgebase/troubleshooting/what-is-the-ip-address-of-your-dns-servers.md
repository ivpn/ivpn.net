---
title: What is the IP address of your DNS servers? - IVPN Help
h1: What is the IP address of your DNS servers?
url: /knowledgebase/troubleshooting/what-is-the-ip-address-of-your-dns-servers/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 150
---
# What is the IP address of your DNS servers?

The IVPN DNS servers clients use when connected to our VPN servers are not publicly accessible from the Internet. They are internal and can be used only when connected to an IVPN server. To work out the address of the closest DNS server, simply look at the IP assigned to you when you connect. The DNS servers are in the format **10.x.y.1**. For example, if the VPN address you receive is **10.16.4.66** then the DNS will be on **10.16.4.1**. The following DNS is used when you connect to a WireGuard server - **172.16.0.1**

When you connect using our [native apps](/apps/), IVPN DNS is automatically applied to your system. If you connect using a different VPN client or a platform, like routers, you can specify the one of the following DNS IP-addresses:

* **10.0.254.1** = regular DNS with no blocking (OpenVPN only) (use **10.0.254.101** for Multi-hop connections).
* **10.0.254.2** = standard AntiTracker to block advertising and malware domains (OpenVPN + WireGuard) (use **10.0.254.102** for Multi-hop connections).
* **10.0.254.3** = Hardcore Mode AntiTracker to also block Google and Facebook domains (OpenVPN + WireGuard) (use **10.0.254.103** for Multi-hop connections).

We also provide a public, validating, non-logging, recursive DNS server available at **`198.245.51.147`**.  No IVPN connection -- or account -- required.
