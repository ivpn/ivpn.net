---
title: Linux - OBFS3 and OBFS4 Obfuscation with Obfsproxy to Circumvent Censorship - IVPN Help
h1: Linux - OBFS3 and OBFS4 Obfuscation with Obfsproxy to Circumvent Censorship
url: /knowledgebase/linux/linux-obfs3-and-obfs4-obfuscation-with-obfsproxy-to-circumvent-censorship/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 9
---
# OBFS3 and OBFS4 Obfuscation with Obfsproxy to Circumvent Censorship

In some countries (like China, Iran, Vietnam, etc.), the government utilizes a very restrictive firewall and enforces local ISPs to throttle and block the traffic via Deep Packet Inspection. Work around these restrictions with the help of obfs4proxy by masking the VPN traffic.  This article offers details on using OBFS3 or OBFS4 with a single-hop or Multi-hop OpenVPN connection over TCP.

<div markdown="1" class="notice notice--info">
Our IVPN Linux client includes obfsproxy support. Check it out <a href="/apps-linux/">here</a>
</div>


1. Install the OBFS4 proxy package:

    **Debian, Ubuntu, Mint**: `sudo apt install obfs4proxy`

    **Fedora**: `sudo dnf install obfs4`

    **openSUSE**: `sudo zypper install obfs4`

    **Arch, Manjaro**: https://aur.archlinux.org/packages/obfs4proxy


1. Create a helper script to set proxy variables and launch the `obfs4proxy` service:

    ```
    $ nano /path/to/obfs-helper.sh

    #!/bin/bash
    echo "Keep this running for the duration of the OpenVPN connection."
    echo "Use Ctrl+c two times to exit."
    mkdir -p /tmp/obfs
    export TOR_PT_CLIENT_TRANSPORTS=obfs3,obfs4
    export TOR_PT_MANAGED_TRANSPORT_VER=1
    export TOR_PT_STATE_LOCATION=/tmp/obfs
    /usr/bin/obfs4proxy
    ```

    Press `Ctrl+x` to save and exit the `nano` editor.  Make the script executable with `chmod +x /path/to/obfs-helper.sh`.  Be sure to use a real file location (not `/path/to/`).

    This script creates a local proxy service for both OBFS3 and OBFS4.  Adjust the `export TOR_PT_CLIENT_TRANSPORTS=obfs3,obfs4` line if required (ie. `export TOR_PT_CLIENT_TRANSPORTS=obfs4` for OBFS4 only).


1. Generate a single-hop OpenVPN configuration file:

    IVPN OpenVPN configuration generator: https://www.ivpn.net/openvpn-config

    In step 2 of the configuration generator, choose any **TCP** port for `Protocol / Port` and select `Use hostnames`.


1. Edit the OpenVPN configuration file (ie. using `nano`, `vim`, or any text editor you prefer):

    **OBFS3 single-hop**: Change line 4 port to `5145`

    **OBFS4 single-hop**: Change line 4 port to `5146`

    **OBFS3 Multi-hop**:
    - Change line 4 port to the exit server's `OBFS 3 MultiHop Port` from the [server status page](https://www.ivpn.net/status) (ie. fr1 = 23402, jp2 = 20831, us-ca3 = 21302)
    - Change line 16 `name-prefix` to match the exit server (ie. fr, jp, us-ca)

    **OBFS4 Multi-hop**:
    - Change line 4 port to the exit server's `OBFS 4 MultiHop Port` from the [server status page](https://www.ivpn.net/status) (ie. fr1 = 23403, jp2 = 20832, us-ca3 = 21303)
    - Change line 16 `name-prefix` to match the exit server (ie. fr, jp, us-ca)

    **For all connections** (OBFS3, OBFS4, single-hop, Multi-hop), add four lines after `verb 3`:

    ```
    tls-timeout 4
    txqueuelen 1024      # Linux only
    connect-retry-max 3  # adjust as required
    route xx.xx.xx.xx 255.255.255.255 yy.yy.yy.yy
    ```

    Use the IP address from line 4 of the OpenVPN configuration file to replace `xx.xx.xx.xx` and use your network's default gateway IP address to replace `yy.yy.yy.yy`.  Run `ip route | grep default` to identify the default gateway IP address for your system.

    Save the file (ie. `Taiwan-obfs4.ovpn`).


1. **OBFS4 Only** - Create a  `socks5_auth` file:

    This file contains the VPN server's public key/certificate and the Inter-Arrival Timing (IAT) mode (elapsed time after receipt of a packet until the next packet arrives).

    **cert=...;** use the `OBFS 4 Public Key` from the [server status page](https://www.ivpn.net/status) for the server your traffic exits from.  A semi-colon at end of line is required.

    **iat-mode=** can be 0, 1, or 2 and determines packet segmentation rules:  
    - **0 = disabled**: packets are segmented by the network, network fingerprints could be detected  
    - **1 = enabled**: packets are segmented by the OBFS4 proxy, maximum payload is 1448 bytes, prevents re-assembly for analysis  
    - **2 = paranoid**: random packet size, prevents re-assembly for analysis, uncommon and may or may not offer benefits  

    There will likely be a performance decrease for the VPN connection with IAT-modes 1 and 2.

    Example: `socks5_auth` with IAT-mode 0:

    ```
    cert=abcdefghijklmnopqrstuvwxyz0123456789;
    iat-mode=0
    ```

    Save the file to a convenient location (ie. `~/socks5_auth_fr1`, `/path/to/socks5_auth_us-ca3`).


1. Launch the helper script and keep it running (ie. do not close the terminal window):

    ```
    $ /path/to/obfs-helper.sh
    Keep this running for the duration of the OpenVPN connection.
    Use Ctrl+c two times to exit.
    VERSION 1
    CMETHOD obfs3 socks5 127.0.0.1:aaaaa
    CMETHOD obfs4 socks5 127.0.0.1:bbbbb
    CMETHODS DONE
    ```

    `aaaaa` is the port number for OBFS3 connections.

    `bbbbb` is the port number for OBFS4 connections.

    The port numbers are random and change each time `obfs4proxy` is launched (via the helper script).


1. Start the OpenVPN connection and keep the terminal window open:
    
    Replace `aaaaa` and `bbbbb` in the commands below with the actual port numbers from the step above.

    **OBFS3 single-hop or Multi-hop**:
    ```
    sudo openvpn --config /path/to/France-obfs3.ovpn --socks-proxy 127.0.0.1 aaaaa
    ```

    **OBFS4 single-hop**:
    ```
    sudo openvpn --config /path/to/France-obfs4.ovpn --socks-proxy 127.0.0.1 bbbbb ~/socks5_auth_fr1
    ```

    **OBFS4 Multi-hop**, the `socks5_auth` file is for the exit server:
    ```
    sudo openvpn --config /path/to/France2Portugal-obfs4.ovpn --socks-proxy 127.0.0.1 bbbbb /path/to/socks5_auth_pt1
    ```

    **Note**:  Use a chained command with a variable to determine the random port to help with scripts and automation instead of manually replacing `aaaaa` and `bbbbb`:
    ```
    OBFS3PORT=$(ss -ltp | grep obfs4proxy | grep "fd=3" | awk '{ print $4 }' | awk -F":" '{ print $2 }')
    OBFS4PORT=$(ss -ltp | grep obfs4proxy | grep "fd=4" | awk '{ print $4 }' | awk -F":" '{ print $2 }')
    ```

1. Run a [DNS leak test](https://www.dnsleaktest.com/) to verify the connection.


1. Disconnect the OpenVPN connection first by using `Ctrl+c` in the OpenVPN terminal.  Stop the proxy service by using `Ctrl+c` twice in the other terminal.


### Troubleshooting:

- [DNS leak](https://www.ivpn.net/knowledgebase/linux/linux-webpages-do-not-load-or-dns-leaks-when-connecting-via-networkmanager/)

- IPv6 leak:

    - Use a firewall to allow connection to TCP port `5145` (OBFS3, single-hop), `5146` (OBFS4, single-hop), and/or any required `2xxxx` port for Multi-hop using [iptables](https://www.ivpn.net/knowledgebase/linux/linux-how-do-i-prevent-vpn-leaks-using-iptables/) or [ufw](https://www.ivpn.net/knowledgebase/linux/linux-kill-switch-using-the-uncomplicated-firewall-ufw/).  

    - Disable IPv6:  

    ```
    echo 'net.ipv6.conf.all.disable_ipv6=1' | sudo tee -a /etc/sysctl.conf
    echo 'net.ipv6.conf.default.disable_ipv6=1' | sudo tee -a /etc/sysctl.conf
    echo 'net.ipv6.conf.lo.disable_ipv6=1' | sudo tee -a /etc/sysctl.conf
    sudo sysctl -p
    ```

    **Note**: Change the three `disable_ipv6=1` to `disable_ipv6=0` to re-enable IPv6.
