---
title: What is port forwarding? - IVPN Help
h1: What is port forwarding?
url: /knowledgebase/general/what-is-port-forwarding/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 180
---
# What is port forwarding?

When you are connected to a VPN service, the VPN gateway server protects your device from potentially hostile incoming connections in the same way that your LAN router or firewall does. However, allowing incoming connections on particular ports is essential for operating servers, or for participating in P2P networks where your node must be visible to other nodes. That process is called port forwarding.

When port forwarding is enabled, your device is directly exposed to the Internet on the ports that have been forwarded, with no protection by the VPN service. An adversary may successfully exploit a vulnerability in a service that's listening on a forwarded port, and compromise your device. In addition to potential threats such as botnet membership and data theft, an adversary may compromise your privacy and anonymity by being able to check when you're not using the VPN service. For these reasons port forwarding is disabled by default on all customer accounts. See [how do I activate port forwarding](/knowledgebase/general/how-do-i-activate-port-forwarding/)?
