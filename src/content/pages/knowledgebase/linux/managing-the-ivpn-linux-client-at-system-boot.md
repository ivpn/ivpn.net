---
title: Managing the IVPN Linux CLI client at System Boot - IVPN Help
h1: Managing the IVPN Linux CLI client at System Boot
url: /knowledgebase/linux/managing-the-ivpn-linux-client-at-system-boot/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 130
---
# Managing the IVPN Linux CLI client at System Boot

<div markdown="1" class="notice notice--warning">
This article applies to the IVPN Linux CLI client.  The GUI client includes both Always-On and On-Demand firewall settings.
</div>


The IVPN Linux CLI client does not currently offer support for a persistent firewall or automatically connecting at system boot, though these features are planned for future releases.

Using standard Linux features, it is possible to manage both the automatic connect and the firewall settings at system boot at either the user-level via **crontab** or the system-level using a **systemd unit file**.

Please use only one of these options to avoid conflicts.

### User-level: crontab

<div markdown="1" class="notice notice--info">
No root-level or sudo-style permissions are required for this option.
</div>

1.  Create a Bash script to first wait for the **ivpn-service** to become ready, then apply the connection options:

    ```
    $ nano /home/user/bin/auto-conn-ivpn.sh
    #!/bin/bash
    while ! ps -e | grep ivpn-service > /dev/null ; do
        sleep 1
    done
    /usr/local/bin/ivpn firewall -on
    /usr/local/bin/ivpn connect -p wg -antitracker Denmark
    ```

    Press `Ctrl+x` to save the file and exit from the `nano` editor.

    <div markdown="1" class="notice notice--info">
    Note: The script above uses a WireGuard connection to our server in Denmark. Please feel free to use whichever connection settings you prefer. Our <a href="/knowledgebase/general/command-line-client-faq/">Command Line Client FAQ</a> has details.
    </div>

2.  Make the script executable:

    ```
    $ chmod +x /home/user/bin/auto-conn-ivpn.sh
    ```

3.  Edit the **crontab** and add a line with the `@reboot` timing directive plus the path to the script above. Logging is optional:

    ```
    $ crontab -e
    @reboot /home/user/bin/auto-conn-ivpn.sh > /home/user/auto-conn-ivpn.log
    ```

4.  Reboot your system to confirm the IVPN Linux client connects automatically.

5.  Check the log file to see the connection details:

    ```
    $ cat /home/user/auto-conn-ivpn.log
    ```

To adjust the connection settings, edit the `/home/user/bin/auto-conn-ivpn.sh` script. No changes to the **crontab** are required.

To de-activate this automatic boot-time connection, edit the **crontab** and comment out or remove the `@reboot /home/...` line.

### System-level: systemd

<div markdown="1" class="notice notice--info">
Root-level or sudo-style access is required for this option.
</div>

1.  Create a Bash script with the connection options:

    ```
    $ sudo nano /usr/local/bin/ivpn-autoconnect.sh
    #!/bin/bash
    /usr/local/bin/ivpn firewall -on
    /usr/local/bin/ivpn connect -p ovpn -antitracker Singapore
    ```

    Press `Ctrl+x` to save the file and exit from the `nano` editor.

    <div markdown="1" class="notice notice--info">
    Note: The script above uses an OpenVPN connection to our server in Singapore. Please feel free to use whichever connection settings you prefer. Our <a href="/knowledgebase/general/command-line-client-faq/">Command Line Client FAQ</a> has details.
    </div>

2.  Make the script executable:

    ```
    $ sudo chmod +x /usr/local/bin/ivpn-autoconnect.sh
    ```

3.  Create a **systemd unit file** to control the autoconnect service:

    ```
    $ sudo nano /lib/systemd/system/ivpn-autoconnect.service
    [Unit]
    Description=IVPN autoconnect service.
    After=network.target ivpn-service.service
    Requires=network-online.target ivpn-service.service

    [Service]
    Type=oneshot
    ExecStartPre=sleep 2
    ExecStart=/bin/bash /usr/local/bin/ivpn-autoconnect.sh
    ExecStop=ivpn disconnect
    RemainAfterExit=yes

    [Install]
    WantedBy=multi-user.target
    ```

    Press `Ctrl+x` to save the file and exit from the `nano` editor.

4.  Enable the autoconnect service:

    ```
    $ sudo systemctl enable ivpn-autoconnect.service
    ```

5.  Reboot your system to confirm the IVPN Linux client connects automatically.

6.  Check the autoconnect service status:

    ```
    $ sudo systemctl status ivpn-autoconnect.service
    ```

To adjust the connection settings, edit the `/usr/local/bin/ivpn-autoconnect.sh` script. No changes to the **systemd unit file** are required.

To de-activate this automatic boot-time connection, disable the autoconnect service:

```
$ sudo systemctl disable ivpn-autoconnect.service
```
