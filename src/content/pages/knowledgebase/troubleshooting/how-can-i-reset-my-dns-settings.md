---
title: How can I reset my DNS settings? - IVPN Help
h1: How can I reset my DNS settings?
url: /knowledgebase/troubleshooting/how-can-i-reset-my-dns-settings/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 60
---
# How can I reset my DNS settings?

The following instructions will reset your DNS configuration to that provided by your router/ISP. This is necessary if a VPN client or a DNS leak protection script has crashed and left an unusable DNS configuration. You need to do this if you have Internet connectivity but are unable to browse to any websites i.e. your DNS is most likely not working.

### Windows 10

1. Right click the Start menu, then select `Network Connections`.
2. Click `Change Adapter Options` below 'Change your network settings'.
3. Right click on the network connection you're using and select `Properties`.
4. Click on `Internet protocol Version 4 (TCP/IP v4)` and then on the `Properties` button.
5. Make sure that you have `Obtain IP Address automatically` and `Obtain DNS Server Automatically` selected. This will configure your device to acquire the settings directly from your modem/router.
6. Click `OK` and exit all the windows.
7. Follow the instructions in [How to flush my DNS cache](/knowledgebase/troubleshooting/how-do-i-clear-my-dns-cache/) to flush your DNS resolver cache.

### Windows 8

1. Select the `Desktop` from the Start menu.
2. From the Desktop window, right click the `Networks` icon in the system try and select `Open Network and Sharing Center`.
3. Under 'Active Networks' click on the active connection name, usually `Ethernet` or `Local area connection`.
4. Click on the `Properties` button. This should take you to the `Network Connections Properties` window.
5. Click on `Internet protocol Version 4 (TCP/IP v4)` and then on the `Properties` button.
6. Make sure that you have `Obtain IP Address automatically` and `Obtain DNS Server Automatically` selected. This will configure your device to acquire the settings directly from your modem/router.
7. Click `OK` and exit all the windows.
8. Follow the instructions in [How to flush my DNS cache](/knowledgebase/troubleshooting/how-do-i-clear-my-dns-cache/) to flush your DNS resolver cache.

### macOS

1. Go to `System Preferences`.
2. Click on `Network`.
3. Select the first connection in your list and click `Advanced`.
4. Select the `DNS` tab.
5. Select any addresses in the list and attempt to remove them using the `-` button. If you cannot select them or the `-` is not active then you are already using your routers DHCP assigned DNS servers.
6. Click `OK` and exit all the windows.
7. Follow the instructions in [How to flush my DNS cache](/knowledgebase/troubleshooting/how-do-i-clear-my-dns-cache/) to flush your DNS resolver cache.
