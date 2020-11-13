---
title: My VPN is connected but I cannot browse the Internet, why? - IVPN Help
h1: My VPN is connected but I cannot browse the Internet, why?
url: /knowledgebase/troubleshooting/my-vpn-is-connected-but-i-cannot-browse-the-internet-why/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 40
---
# My VPN is connected but I cannot browse the Internet, why?

The most common reason you cannot browse the internet when connected to the VPN is a **DNS configuration issue**. Please perform the following steps to see if the issue is related to DNS:

1. Ping an external IP such as **`1.1.1.1`** and **`8.8.8.8`** to verify that you have Internet connectivity. See [how to run the ping command](/knowledgebase/troubleshooting/how-to-run-the-ping-command/).
2. If you see replies from the ping above this indicates your connection is working and your issue is likely DNS related, continue to the "resolving DNS issues" section below.
3. If you do not get a reply (e.g. "Request timeout") this indicates something is blocking the VPN connection, see [I cannot connect to the VPN, what can I do?](/knowledgebase/troubleshooting/i-cannot-connect-to-the-vpn-what-can-i-do/)

### Resolving DNS Issues

1. The first step is to reset your DNS settings. Disconnect from the VPN and follow the steps in [How to reset your DNS settings](/knowledgebase/troubleshooting/how-can-i-reset-my-dns-settings/). Try connecting again and browsing.
2. If the above does not resolve the issue then you can configure OpenDNS to resolve your DNS. Follow the relevant instructions on the [OpenDNS setup](https://support.opendns.com/forums/21618384) page. (Please note that by configuring OpenDNS servers your DNS requests will be sent to OpenDNS, which may be considered a leak).
3. If you are using Linux please ensure that you are running commands as root using the `sudo` command or the DNS resolver may not be updated correctly.
4. If you have configured a proxy, please ensure that it is disabled.  This usually needs to be done via your browser settings.
5. If you have another browser installed (Firefox, Chrome, Safari, Opera, Brave, Edge) try browsing with that browser and see if you have the same issue. You should also attempt to start your browser in 'safe mode' with all addons/plugins disabled. In Chrome, you simply have to open an 'incognito' window. If any of these methods allow you to browse the Internet then the issue lies with your Internet browser configuration. 

Still can't connect? Please see [how to submit VPN diagnostic logs to IVPN](/knowledgebase/troubleshooting/how-to-submit-openvpn-diagnostic-data-to-ivpn/) so we can help you diagnose the issue.
