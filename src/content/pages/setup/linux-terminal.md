---
title: OpenVPN using terminal Setup Guide
url: /setup/linux-terminal/
layout: setup
platform: linux
---
# Linux OpenVPN Terminal Setup Guide

1.  Install OpenVPN using your package manager if it is not installed already:

    #### Debian, Ubuntu, Mint:

    ```
    sudo apt-get install openvpn
    ```

    #### Fedora, CentOS:

    ```
    sudo yum install openvpn
    ```

    or

    ```
    sudo dnf install openvpn
    ```

    #### Arch, Manjaro:

    ```
    sudo pacman -S openvpn
    ```

    #### openSUSE:

    ```
    zypper install openvpn
    ```

2.  Download the [OpenVPN config files](/releases/config/ivpn-openvpn-config.zip) to your home directory and extract the contents to a known location.

    ```
    wget -O ivpn.zip "https://www.ivpn.net/releases/config/ivpn-openvpn-config.zip"
    unzip ivpn.zip
    Archive:  ivpn.zip
        creating: ivpn-openvpn-config/
        inflating: ivpn-openvpn-config/Austria.ovpn
        inflating: ivpn-openvpn-config/Australia.ovpn
        ...
    cd ivpn-openvpn-config/
    pwd
    /home/user/ivpn-openvpn-config
    ```

    In this case, the configuration files are in the `ivpn-openvpn-config/` sub-folder of the **user** home folder. The full path is `/home/user/ivpn-openvpn-config/`.

    <div markdown="1" class="notice notice--info">
    Note: Unless your Linux user account is called user the full path will likely be different on your computer system.
    </div>

3.  You can initiate an OpenVPN connection by specifying the configuration file you wish to use. You will need to manually enter your account ID that begins with letters 'ivpn' and any password.
   
    <div markdown="1" class="notice notice--info">
    Only your account ID is used for the authentication. The password can be anything, like "ivpn", if your client requires a non-blank password.
    </div>

    ```
    sudo openvpn --config /home/user/ivpn-openvpn-config/Austria.ovpn
    ```

    or

    ```
    cd /home/user/ivpn-openvpn-config/
    sudo openvpn --config Austria.ovpn
    ```

    <div markdown="1" class="notice notice--info">
    Note: If you close the Terminal window with an active VPN connection, the VPN will be disconnected. Please keep the Terminal window open. You can also disconnect the VPN by pressing `Ctrl+c` in the Terminal window. You will see a few extra lines as the connection cleans up.
    </div>

4.  It is possible to create a file to store your credentials, which saves from entering them for each connection. Create a file called `pass` in a known location. This known location might be the same `ivpn-openvpn-config/` from the previous steps. Enter your account ID (starts with 'ivpn') on the first line and any password on the second line:

    ```
    nano /home/user/ivpn-openvpn-config/pass
    ivpnADCdef123
    anyPasswordHere
    ```

    Press `Ctrl+x` to save the file and exit from the `nano` editor.

5.  Protect your credentials from other users on your computer system:

    ```
    chmod 400 home/user/ivpn-openvpn-config/pass
    ```

6.  Update the .ovpn files to point to your credential file. A single file can be edited manually:

    ```
    nano /home/user/ivpn-openvpn-config/Austria.ovpn
    ```

    Change the `auth-user-pass` line to `auth-user-pass /home/user/ivpn-openvpn-config/pass`. Press `Ctrl+x` to save the file and exit from the nano editor.

    All of the .ovpn files can be changed at the same time:

    ```
    cd /home/user/ivpn-openvpn-config/
    sed -i 's:auth-user-pass:auth-user-pass /home/user/ivpn-openvpn-config/pass:' *.ovpn
    ```

7.  After connecting to one of our OpenVPN servers, the internal DNS server for the VPN connection can be automatically added to the `/etc/resolv.conf` file if you have either the `resolvconf` or `openresolv` package installed. When the VPN connection is established, the `resolvconf` package will create a temporary backup of your computer system's `/etc/resolv.conf` file and replace the contents with our internal DNS server. This is automatic on most distributions, but some Debian-based distros have trouble with the extra DNS.

    A temporary fix is to edit the /etc/resolv.conf file to make sure the only DNS server present is ours. First, find the VPN server IP address:

    ```
    ip a | grep tun
    tun0: <POINTOPOINT...
        inet 10.x.y.z/22 ...
    ```

    The corresponding DNS server for this `10.x.y.z` IP address is `10.x.y.1`. You could also use our global internal IP address: `10.0.254.1`. Comment out all non-blank lines and add one for our DNS server:

    ```
    sudo nano /etc/resolv.conf
    # a comment is a line that starts with '#'
    #
    #nameserver 192.168.0.1
    #search domain
    nameserver 10.x.y.1
    ```

    Press `Ctrl+x` to save the file and exit from the `nano` editor.

    You can undo the changes to the `/etc/resolv.conf` file by editing it with the `nano` editor and reversing the changes. The file will also be restored to the original state if you reboot your computer system.

8.  A more permanent DNS fix is available via [this guide](/knowledgebase/linux/linux---webpages-do-not-load-or-dns-leaks-when-connecting-via-networkmanager/).

9.  If you wish to have the OpenVPN connection establish automatically with the system start, please see the following guides for [Ubuntu](/knowledgebase/linux/linux---autostart-openvpn-in-systemd-ubuntu/) and [Fedora](/knowledgebase/linux/linux---autostart-openvpn-in-systemd-fedora/).

10. Check your external IP to verify that you are connected:

    ```
    curl https://api.ivpn.net/v4/geo-lookup
    ```

    If you have the `jq` JSON parser program installed, it looks a little friendlier:

    ```
    curl https://api.ivpn.net/v4/geo-lookup | jq
    ```

### Troubleshooting

1.  Most issues can be easily resolved by reviewing the logs. The diagnostic logging for the connection is available in the same Terminal window that you executed the connection command from. Some distributions will write OpenVPN logs to the syslog e.g. `/var/log/syslog` or `/var/log/messages`. You can filter VPN connection details with the `grep` command:

    ```
    grep -i vpn /var/log/syslog
    ```
