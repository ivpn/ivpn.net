---
title: Linux - Autostart OpenVPN in systemd (Fedora) - IVPN Help
h1: Linux - Autostart OpenVPN in systemd (Fedora)
url: /knowledgebase/linux/linux-autostart-openvpn-in-systemd-fedora/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 100
---
# Linux - Autostart OpenVPN in systemd (Fedora)

In order to configure OpenVPN to autostart for systemd, complete the following steps:

1.  Move the .ovpn file with the desired server location to the '/etc/openvpn' folder:

    ```
    # sudo cp /location/whereYouDownloadedConfigfilesTo/Germany.ovpn /etc/openvpn/
    ```

2.  Edit the .ovpn file you copied in the previous step and change the line 'auth-user-pass' to 'auth-user-pass pass':

    ```
    # sudo nano /etc/openvpn/Germany.ovpn
    ```

    If nano is not installed:

    ```
    # sudo yum install nano
    ```

3.  In the '/etc/openvpn/client' folder, create a text file:

    ```
    # sudo nano /etc/openvpn/client/pass
    ```

    and enter your  IVPN Account ID (starts with 'ivpn') on the first line and any non-blank text on the 2nd line, then press 'Ctrl X' to save the changes and exit the text editor.

4.  (Optional) Change the permissions on the pass file to protect the credentials:

    ```
    # sudo chmod 400 /etc/openvpn/client/pass
    ```

5.  Rename and move the .ovpn file to 'client.conf':

    ```
    # sudo cp /etc/openvpn/Germany.ovpn /etc/openvpn/client/client.conf
    ```

6.  Enable the OpenVPN service to run while booting:

    ```
    # sudo systemctl enable openvpn-client@client.service
    ```

7.  Reload the daemons:

    ```
    # sudo systemctl daemon-reload
    ```

8.  Start the OpenVPN service:

    ```
    # sudo service openvpn-client@client.service start
    ```

9.  Reboot and test if it is working by checking the external IP:

    ```
    # curl ifconfig.co
    ```
