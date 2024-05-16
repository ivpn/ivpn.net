---
title: Cannot import .ovpn config file - IVPN Help
h1: Cannot import .ovpn config file
url: /knowledgebase/linux/linux-cannot-import-ovpn-config-file/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 50
---
# Cannot import .ovpn config file

If you try to import the [OpenVPN config files](/openvpn-config) and receive the `'-----.ovpn' could not be read or does not contain recognized VPN connection information. Error: unknown PPTP file extension.` error, then you likely do not have the `network-manager-openvpn-gnome` package installed.

1.  Install `network-manager-openvpn-gnome` package:

    ```
    sudo apt-get install openvpn network-manager-openvpn network-manager-openvpn-gnome
    ```

2.  Restart the networking service:

    ```
    sudo service network-manager restart
    ```
