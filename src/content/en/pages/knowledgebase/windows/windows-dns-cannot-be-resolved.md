---
title: Windows - "DNS Cannot be resolved" - IVPN Help
h1: Windows - "DNS Cannot be resolved"
url: /knowledgebase/windows/windows-dns-cannot-be-resolved/
sections:
    - windows
sectionTitle: Windows
layout: help-details
weight: 70
---
# Windows - "DNS Cannot be resolved"

What if your browser cannot load any web pages and it receives 'DNS cannot be resolved' error when connected to IVPN? Most of the time this is happening because of 3rd-party software altering the DNS server configuration on your computer. To work around this, check the following steps:

1. Make sure IVPN Firewall is enabled (assuming you use our [official software](/apps-windows/))
2. Open your Network Management (hit 'Windows' button - > Type 'ncpa.cpl' - > 'Enter') and find 'Tap-Windows' device - > Double click on it - > Properties - > Double click 'IPv4' - > Make sure you have 'Obtain DNS server address automatically' checked
3. Reconnect to IVPN

When you establish the VPN connection, IVPN pushes and applies our DNS IP-address to your system if the network adapter is configured to set the DNS automatically. In case the latter is not happening, the installed Antivirus/Firewall or various Network Filtering software can prevent that from happening and it is advised to have the IVPN client whitelisted there to avoid the aforementioned issue.
