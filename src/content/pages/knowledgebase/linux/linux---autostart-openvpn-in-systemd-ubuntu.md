---
title: Linux - Autostart OpenVPN in systemd (Ubuntu) - IVPN Help
h1: Linux - Autostart OpenVPN in systemd (Ubuntu)
url: /knowledgebase/linux/linux---autostart-openvpn-in-systemd-ubuntu/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 10
---
# Linux - Autostart OpenVPN in systemd (Ubuntu)

In order to configure OpenVPN to autostart for systemd, complete the following steps:

1.  Run the command:

    ```
    # sudo nano /etc/default/openvpn
    ```

    and uncomment, or remove, the "#" in front of

    ```
    AUTOSTART="all"
    ```

    then press 'Ctrl X' to save the changes and exit the text editor.

2.  Move the .ovpn file with the desired server location to the '/etc/openvpn' folder:

    ```
    # sudo cp /location/whereYouDownloadedConfigfilesTo/Germany.ovpn /etc/openvpn/    
    ```

3.  Edit the .ovpn file you copied in the previous step and change the line 'auth-user-pass' to 'auth-user-pass pass':

    ```
    # sudo nano /etc/openvpn/Germany.ovpn
    ```

    then press 'Ctrl X' to save the changes and exit the text editor.

4.  In the '/etc/openvpn' folder, create a text file called pass:

    ```
    # sudo nano /etc/openvpn/pass
    ```

    and enter your IVPN Account ID (starts with 'ivpn') on the first line and any non-blank text on the 2nd line, then press 'Ctrl X' to save the changes and exit the text editor.

5.  (Optional) Change the permissions on the pass file to protect the credentials:

    ```
    # sudo chmod 400 /etc/openvpn/pass
    ```

6.  Rename the .ovpn file to 'client.conf':

    ```
    # sudo cp /etc/openvpn/Germany.ovpn /etc/openvpn/client.conf
    ```

7.  On Ubuntu 16.04 LTS, OpenVPN installs and initiates a service by default. If you are using Ubuntu 16.04 LTS, skip to step 10.  
    For Ubuntu 18.04 LTS and up, enable the OpenVPN service to run while booting:

    ```
    # sudo systemctl enable openvpn@client.service
    ```

8.  Reload the daemons:

    ```
    # sudo systemctl daemon-reload
    ```

9.  Start the OpenVPN service:

    ```
    # sudo service openvpn@client start
    ```

10. Reboot and test if it is working by checking the external IP:

    ```
    # curl ifconfig.co
    ```

    If curl is not installed:

    ```
    # sudo apt install curl
    ```
