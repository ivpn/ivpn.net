---
title: Tunnelblick - Why is the DNS server incorrect? - IVPN Help
h1: Tunnelblick - Why is the DNS server incorrect?
url: /knowledgebase/macos/tunnelblick---why-is-the-dns-server-incorrect/
sections:
    - macos
    - troubleshooting
sectionTitle: macOS
layout: help-details
weight: 20
---
# Tunnelblick - Why is the DNS server incorrect?

Tunnelblick will automatically configure your macOS to use our private DNS servers when a VPN connection is established. If you are using DHCP, please ensure that you check the `Set nameserver` checkbox.

However, if you have manually configured DNS servers, then regardless of the state of `Set nameserver`, your manually configured DNS servers will always be the only ones used. We strongly recommend that you configure your device to use DHCP and use the `Set nameserver` option to ensure that your privacy is not compromised due to DNS leaks.
