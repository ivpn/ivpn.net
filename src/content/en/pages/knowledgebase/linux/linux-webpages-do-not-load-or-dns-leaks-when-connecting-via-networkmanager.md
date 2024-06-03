---
title: Webpages do not load or DNS leaks when connecting via NetworkManager - IVPN Help
h1: Webpages do not load or DNS leaks when connecting via NetworkManager
url: /knowledgebase/linux/linux-webpages-do-not-load-or-dns-leaks-when-connecting-via-networkmanager/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 110
---
# Webpages do not load or DNS leaks when connecting via NetworkManager

When you connect to a VPN server using the NetworkManager, you might discover that it does not apply IVPN DNS IP address automatically. This may lead to either websites' domain names not resolving or your real DNS is being used, which is considered as a leak.

If you are more comfortable with NetworkManager, feel free to apply IVPN DNS IP addresses manually:

<div markdown="1" class="notice notice--warning">
Syntax may differ depending on your Linux distro, substitute where required
</div>

1.  Install the `resolvconf` package:

    ```
    #sudo apt-get install resolvconf
    ```

2.  Open **head** file..:

    ```
    #sudo nano /etc/resolvconf/resolv.conf.d/head
    ```

    ... and on the new line (without quotes) enter `nameserver 10.0.254.1` and on another line `nameserver 198.245.51.147`. `Ctrl+X` to save changes and exit the file.

3.  Restart your system to apply the DNS changes or edit the **resolv.conf** file to apply the DNS immediately:

    ```
    #sudo nano /etc/resolv.conf
    ```

    Add both of our DNS IP addresses:

    ```
    nameserver 10.0.254.1
    nameserver 198.245.51.147
    ```

    Remove or comment out (by adding '#' at the beginning of the line) lines containing your real DNS IP address  
    Using a different Internal IP addresses activates the AntiTracker:  
    * 10.0.254.1 = regular DNS with no blocking (OpenVPN)
    * 10.0.254.2 = standard AntiTracker to block advertising and malware domains
    * 10.0.254.3 = Hardcore Mode AntiTracker to also block Google and Facebook domains 

4.  Confirm that your system is now using IVPN DNS. Running the, e.g. **nslookup ivpn.net** command should provide you with the following output.  
    When disconnected from IVPN, your system should use `198.245.51.147` IP address:

    ```
    Server: 198.245.51.147
    Address: 198.245.51.147#53
    Non-authoritative answer:
    Name:	ivpn.net
    Address: 167.114.18.34
    ```

    When connected to IVPN, `10.0.254.1`:

    ```
    Server: 10.0.254.1
    Address: 10.0.254.1#53
    Non-authoritative answer:
    Name:	ivpn.net
    Address: 167.114.18.34
    ```

### Troubleshooting

1.  In some Linux distros, there may be multiple services affecting the DNS sub-system. If you see an entry like `nameserver 127.0.0.53` in the /etc/resolv.conf file after making the changes above and rebooting your computer system, you may have to disable the systemd-resolved service and reboot your system:

    ```
    sudo systemctl disable systemd-resolved.service
    ```

2.  Another way to put and keep DNS servers in the resolv.conf file involves creating a file and changing a file attribute to preserve the file and contents:

    ```
    sudo rm -i /etc/resolv.conf
    ```

    Add our DNS servers to the resolv.conf file:

    ```
    #sudo nano /etc/resolv.conf
    nameserver 10.0.254.1
    nameserver 198.245.51.147
    ```

    Press `Ctrl+X` to save and exit the **nano** editor, then change the file attribute to prevent writes or file changes:

    ```
    sudo chattr +i /etc/resolv.conf
    ```

    This file attribute change persists over a reboot. Undo this change with:

    ```
    sudo chattr -i /etc/resolv.conf
    ```

    ... then restart your computer system to allow the resolv.conf file to be populated automatically.
