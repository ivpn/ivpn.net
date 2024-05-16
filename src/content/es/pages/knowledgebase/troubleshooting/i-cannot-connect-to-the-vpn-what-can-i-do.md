---
title: I cannot connect to the VPN. What can I do? - IVPN Help
h1: I cannot connect to the VPN. What can I do?
url: /knowledgebase/troubleshooting/i-cannot-connect-to-the-vpn-what-can-i-do/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 20
---
# I cannot connect to the VPN. What can I do?

Most connection failures are caused by something blocking the connection to our servers.  Before you begin troubleshooting a blocked connection please check the following:

* Verify that your internet connection is working whilst disconnected from the VPN. Try loading a website or pinging a web address such as `8.8.8.8` or `1.1.1.1`. See [how to run the ping command](/knowledgebase/troubleshooting/how-to-run-the-ping-command/). If you are using the IVPN client, ensure that the IVPN firewall is not activated. If your connection is still not working then you will need to contact your ISP to resolve the issue.
* Verify that the server you are connecting to is online and available on the [server status](/status/) page.
* Double-check that you are using the correct IVPN Account ID (ivpnXXXXXXXX or i-XXXX-XXXX-XXXX). For more info see [I receive an 'authentication failure' message. What can I do?](/knowledgebase/troubleshooting/i-receive-an-andsharp039authentication-failureandsharp039-message--what-can-i-do/).

Once you have verified all of the above, proceed to troubleshoot the connection as follows:

1. Try connecting using a different OpenVPN port. See [how to change ports/protocols](/knowledgebase/troubleshooting/how-do-i-change-the-port-or-protocol-used-to-connect/).
2. Try WireGuard VPN protocol - available in all of our [native apps](/apps/) for macOS, iOS, Windows, Linux and Android.
3. Try IPSec with IKEv2 VPN protocol. Setup guides can be found [here](/apps/).
4. Enable the [Obfsproxy](/knowledgebase/troubleshooting/i-cant-connect-from-china-or-vietnam-or-iran-etc-how-do-i-enable-obfsproxy/) feature and retry the connection.
5. Temporarily disable any firewalls or antivirus software on your computer and retry the connection.
6. Try another internet connection, some types of connections are particularly problematic such as public hotspots, cellular hotspots and hotel internet connections.
7. Try another device as there may be an issue with your local device. Our service works with many different devices, see our [setup guides](/apps/).

Still can't connect? Please see [how to submit VPN diagnostic logs to IVPN](/knowledgebase/troubleshooting/how-to-submit-openvpn-diagnostic-data-to-ivpn/) so we can help you diagnose the issue.
