---
title: Windows 10 - Set IVPN DNS servers manually - IVPN Help
h1: Windows 10 - Set IVPN DNS servers manually
url: /knowledgebase/windows/windows-10-set-ivpn-dns-servers-manually/
sections:
    - windows
sectionTitle: Windows
layout: help-details
weight: 110
---
# Windows 10 - Set IVPN DNS servers manually

In some cases, it may be beneficial to set DNS servers on your system manually. The IVPN App does this automatically, though this can he helpful with some manual VPN connection.

1.  Open the `Control Panel` by clicking the Start menu icon and typing `control panel`

2.  Click `Network and Internet` followed by `Network and Sharing Centre`

3.  Click `Change Adapter settings`

4.  Right-click the icon for the Ethernet or Wi-Fi network adapter and choose `Properties`

5.  Click `Internet Protocol Version 4 (TCP/IPv4)` and click the `Properties` button

    ![](/images-static/uploads/050-adapter-properties-window-ipv4.png)

6.  Switch to `Use the following DNS server addresses` and enter the IVPN addresses. We offer different internal options plus one public DNS servers:

    ```
    10.0.254.1 = regular DNS with no blocking
    10.0.254.2 = standard AntiTracker to block advertising and malware domains
    10.0.254.3 = Hardcore Mode AntiTracker to also block Google and Facebook
    198.245.51.147 = public, validating, non-logging, recursive DNS server
    ```

    ![](/images-static/uploads/060-manual-dns-addresses.png)

7.  Click `OK` on the IPv4 properties window. Click `Close` on the network adapter properties window
