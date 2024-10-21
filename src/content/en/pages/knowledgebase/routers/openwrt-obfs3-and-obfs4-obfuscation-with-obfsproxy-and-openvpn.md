---
title: OpenWrt - OBFS3 and OBFS4 Obfuscation with Obfsproxy and OpenVPN - IVPN Help
h1: OpenWrt - OBFS3 and OBFS4 Obfuscation with Obfsproxy and OpenVPN
url: /knowledgebase/routers/openwrt-obfs3-and-obfs4-obfuscation-with-obfsproxy-and-openvpn/
sections:
    - routers
sectionTitle: Routers
layout: help-details
weight: 30
---
# OpenWrt - OBFS3 and OBFS4 Obfuscation with Obfsproxy and OpenVPN

In some countries (like China, Iran, Russia, Vietnam, etc.), the government utilizes a very restrictive firewall and enforces local ISPs to throttle and block the traffic via Deep Packet Inspection. Work around these restrictions with the help of `obfs4proxy` by masking the VPN traffic.  This article offers details on using OBFS3 or OBFS4 with a single-hop or Multi-hop **OpenVPN** connection over **TCP**.  The goal is to create a chain from the router's OpenVPN process, through the local `obfs4proxy` service, and on to the VPN server.

<div markdown="1" class="notice notice--info">
Prerequisite: Follow the OpenWrt <a href="/setup/router/openwrt-openvpn/">OpenVPN setup guide</a>.
</div>


1. Install the packages:

    1. In your router's web interface, navigate to `System` - `Software` and click `Update lists...`.
    
    1. In the **Filter** field, type **obfs**, locate and install the **obfs4proxy** package.
    
    1. In the **Filter** field, type **nano** or **vim** and install one of the **nano** or **vim** packages.  This is a personal preference for command-line text editing.
    
    1. In the **Filter** field, type **screen** or **tmux** and install one of the **screen** or **tmux** packages.  This allows a shell session to remain active even after disconnecting an active SSH connection. This is another personal preference; consider testing each terminal multiplexer on a Linux system to see which works best.
    
2. Use SSH to access your router's command line area.  This can typically be achieved using `ssh root@192.168.1.1`, though the IP address for your router might be different.

3. Create a helper script to set proxy variables and launch the `obfs4proxy` service.  Launch the text editor using `nano /root/obfs-helper.sh` and add the following lines:

    ```
    #!/bin/sh
    echo "Keep this running for the duration of the OpenVPN connection."
    echo "Use Ctrl+c two times to exit."
    mkdir -p /tmp/obfs
    export TOR_PT_CLIENT_TRANSPORTS=obfs3,obfs4
    export TOR_PT_MANAGED_TRANSPORT_VER=1
    export TOR_PT_STATE_LOCATION=/tmp/obfs
    /usr/bin/obfs4proxy
    ```

    Save the file and exit the editor.  Make the script executable with `chmod +x /root/obfs-helper.sh`.

    This script creates local proxy service transports for both OBFS3 and OBFS4.  Adjust the `export TOR_PT_CLIENT_TRANSPORTS=obfs3,obfs4` line if required (ie. `export TOR_PT_CLIENT_TRANSPORTS=obfs4` for OBFS4 only).


4. Activate a **screen** or **tmux** session on the router by typing `screen` or `tmux` in the SSH client and press `Enter`.  Launch the helper script using `/root/obfs-helper.sh` and the following output will appear:

    ```
    Keep this running for the duration of the OpenVPN connection.
    Use Ctrl+c two times to exit.
    VERSION 1
    CMETHOD obfs3 socks5 127.0.0.1:aaaaa
    CMETHOD obfs4 socks5 127.0.0.1:bbbbb
    CMETHODS DONE
    ```

    `aaaaa` is the port number for OBFS3 connections.

    `bbbbb` is the port number for OBFS4 connections.

    The port numbers are random and change each time `obfs4proxy` is launched (via the helper script).  The port numbers are used for the `socks-proxy` directive in the OpenVPN configuration (below).

5. Generate a single-hop OpenVPN configuration file using the [IVPN OpenVPN configuration generator](https://www.ivpn.net/openvpn-config).  In step 2 of the configuration generator, choose any **TCP** port for `Protocol / Port`, select `Use IP addresses`, and `OpenVPN 2.5`.

6. Navigate to the `VPN` - `OpenVPN` area in your router.  Click the `stop` button to halt the active VPN process.  To make the edits mentioned below, click the blue `Edit` button next to the imported VPN profile to change the OpenVPN configuration.  Choose one configuration for your connection:

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

    Use the IP address from line 4 of the OpenVPN configuration to replace `xx.xx.xx.xx` and use your network's default gateway IP address to replace `yy.yy.yy.yy` in the `route` directive above.  Run `ip route | grep default` on the router via the command line to identify the default gateway IP address for your system.
    
    Click the green `Save` button.  One more line needs to be added related to OpenVPN's `socks-proxy` directive.  Details are below.

7. **OBFS4 Only** - Create a  `socks5_auth` file:

    This file contains the VPN server's public key/certificate and the Inter-Arrival Timing (IAT) mode (elapsed time after receipt of a packet until the next packet arrives).

    **cert=...;** use the `OBFS 4 Public Key` from the [server status page](https://www.ivpn.net/status) for the server your traffic exits from (expand a server to reveal the extra details).  A semi-colon at end of line is required.

    **iat-mode=** can be 0, 1, or 2 and determines packet segmentation rules:  
    - **0 = disabled**: packets are segmented by the network, network fingerprints could be detected  
    - **1 = enabled**: packets are segmented by the OBFS4 proxy, maximum payload is 1448 bytes, prevents re-assembly for analysis  
    - **2 = paranoid**: random packet size, prevents re-assembly for analysis, uncommon and may or may not offer benefits  

    There will likely be a performance decrease for the VPN connection with IAT-modes 1 and 2.

    Example: `socks5_auth` file with IAT-mode 0:

    ```
    cert=abcdefghijklmnopqrstuvwxyz0123456789;
    iat-mode=0
    ```

    Save the file to a convenient location (ie. `/etc/openvpn/socks5_auth_pl1`).

8. Direct local traffic to the proxy service's port:
    
    Replace `aaaaa` and `bbbbb` in the commands below with the actual port numbers obtained from launching the helper script above.  Add the `socks-proxy` directive to the OpenVPN configuration (after `verb 3`).

    **OBFS3 single-hop or Multi-hop**:
    ```
    socks-proxy 127.0.0.1 aaaaa
    ```

    **OBFS4 single-hop**:
    ```
    socks-proxy 127.0.0.1 bbbbb /etc/openvpn/socks5_auth_fr1
    ```

    **OBFS4 Multi-hop**, the `socks5_auth` file is for the exit server:
    ```
    socks-proxy 127.0.0.1 bbbbb /etc/openvpn/socks5_auth_pt1
    ```
    
    Click the green `Save` button.

9. Navigate to the `VPN` - `OpenVPN`  area in your router.  Click the `start` button to restore the VPN process.

10. **[Optional]** Verify in the OpenVPN logs that a connection is established. Navigate to `Status` - `System Log` and look for similar details.

    A client connection to the proxy service listener (`127.0.0.1:...`) instead of the VPN server's public IP address:

    ```
    openvpn(PolandTCP)[3230]: TCP_CLIENT link remote: [AF_INET]127.0.0.1:45857
    openvpn(PolandTCP)[3230]: TLS: Initial packet from [AF_INET]127.0.0.1:45857, ...
    ...
    openvpn(PolandTCP)[3230]: [pl1.gw.ivpn.net] Peer Connection Initiated with [AF_INET]127.0.0.1:45857
    ```
    
    The interface is up:

    ```
    netifd: Network device 'tun0' link is up
    netifd: Interface 'ivpnPoland' has link connectivity
    netifd: Interface 'ivpnPoland' is setting up now
    netifd: Interface 'ivpnPoland' is now up
    ```
    
    OpenVPN connection is complete:

    ```
    openvpn(PolandTCP)[3230]: Initialization Sequence Completed
    ```

11. Run a [DNS leak test](https://www.dnsleaktest.com/) to verify the connection.

### Handling a Router Reboot

After a router reboot, the `obfs4proxy` process is no longer running, so no traffic will flow through the VPN connection.  Follow these steps, based on some of the steps above, to restore the proxy service and the VPN connection:
1. SSH into the router.
1. Activate `screen` or `tmux`.
1. Launch the helper script (ie. `/root/obfs-helper.sh`)
1. Obtain the new proxy service port (ie. `aaaaa` or `bbbbb`)
1. Navigate to `VPN` - `OpenVPN` and `stop` the VPN connection.
1. Edit the VPN configuration to update the port for the `socks-proxy` directive, then `Save` the configuration.
1. Navigate back to `VPN` - `OpenVPN` and `start` the VPN connection.
1. Check client Internet access: [DNS leak test](https://www.dnsleaktest.com/)

### Consideration for Nested TCP Connections

The `obfs4proxy` service relies on a **TCP** connection to the VPN server.  Some Internet activities rely on TCP traffic (ie. web browsing or SSH).  If there is any packet loss, the TCP acknowledgment/wait [timer mechanism](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Timeout-based_retransmission) to stabilize the traffic could end up grinding the connection to a halt.  

When a packet is lost, the wait timer is increased, which means that the process (ie. the proxy service or a web browser) waits for the missing packet to show up or, after sending a resend request, waits for the replacement packet.  As the wait timer increases with more and more packet loss, the performance of and responsiveness of the connection will feel slower and slower.  

The issue in compounded because the outer TCP connection (the proxy service) and the inner TCP connection (web browser or SSH) both manage lost packets with wait timers.  Double the wait timers means double the waiting (or worse, exponentially worse), which will cause the connection to suffer more quickly.  

It may help to regularly restart the router's OpenVPN connection as a way to reset the wait timers involved.  Navigate to the `VPN` - `OpenVPN`  area in your router.  Click the `stop` button, wait a moment, then click the `start` button to restart the VPN process.  
