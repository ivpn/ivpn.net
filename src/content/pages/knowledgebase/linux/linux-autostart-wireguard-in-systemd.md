---
title: Linux - Autostart WireGuard in systemd - IVPN Help
h1: Linux - Autostart WireGuard in systemd
url: /knowledgebase/linux/linux-autostart-wireguard-in-systemd/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 40
---
# Linux - Autostart WireGuard in systemd

These steps are mostly distribution agnostic and have been tested on Debian unstable and Fedora.

1.  Generate a valid and working WireGuard configuration file `/etc/wireguard/wg0.conf`. Our [setup guide](/setup/linux-wireguard/) offers details.

    <div markdown="1" class="notice notice--warning">
    Note: You may have to replace the <strong>Endpoint</strong> hostname with the WireGuard server IP address in the WireGuard configuration file. DNS may or may not be applied when systemd brings the wg0 interface up.
    </div>

2.  Add the WireGuard service to systemd:

    ```
    sudo systemctl enable wg-quick@wg0.service
    sudo systemctl daemon-reload
    ```

3.  Start the new service immediately:

    ```
    sudo systemctl start wg-quick@wg0
    ```

4.  Reboot your computer system to verify the automatic connection on startup works as expected.

5.  Check the service status:

    ```
    systemctl status wg-quick@wg0
    ```

6.  To remove the service and clean up the system:

    ```
    sudo systemctl stop wg-quick@wg0
    sudo systemctl disable wg-quick@wg0.service
    sudo rm -i /etc/systemd/system/wg-quick@wg0*
    sudo systemctl daemon-reload
    sudo systemctl reset-failed
    ```
