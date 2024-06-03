---
title: WireGuard Kill Switch - IVPN Help
h1: WireGuard Kill Switch
url: /knowledgebase/linux/linux-wireguard-kill-switch/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 80
---
# WireGuard Kill Switch

To ensure no traffic leaks outside and your real IP address is revealed in case the WireGuard VPN tunnel accidentally goes down, you can set up the Kill Switch which is configured using the **PostUp** and **PreDown** WG syntax.

1.  Open the WireGuard config file with any text editors:

    ```
    $ sudo nano /etc/wireguard/wg0.conf
    ```

2.  Add the following two lines to the [Interface] section:

    ```
    PostUp  =  iptables -I OUTPUT ! -o %i -m mark ! --mark $(wg show %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT && ip6tables -I OUTPUT ! -o %i -m mark ! --mark $(wg show %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT
    PreDown = iptables -D OUTPUT ! -o %i -m mark ! --mark $(wg show  %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT && ip6tables -D OUTPUT ! -o %i -m mark ! --mark $(wg show  %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT
    ```

3.  Here's how the WG config file should look like afterwards:

    ```
    [Interface]
    PrivateKey = abcdefghijklmnopqrstuvwxyz0123456789=
    Address = 172.x.y.z/32
    DNS = 172.16.0.1
    PostUp  =  iptables -I OUTPUT ! -o %i -m mark ! --mark $(wg show %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT && ip6tables -I OUTPUT ! -o %i -m mark ! --mark $(wg show %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT
    PreDown = iptables -D OUTPUT ! -o %i -m mark ! --mark $(wg show  %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT && ip6tables -D OUTPUT ! -o %i -m mark ! --mark $(wg show  %i fwmark) -m addrtype ! --dst-type LOCAL -j REJECT
    [Peer]
    PublicKey = JPT1veXLmasj2uQDstX24mpR7VWD+GmV8JDkidkz91Q=
    Endpoint = us-tx1.wg.ivpn.net:2049
    AllowedIPs = 0.0.0.0/0
    ```

### Testing

1.  One way to test a down tunnel is to delete the IP address from the WireGuard network interface, like this via the Terminal:

    ```
    sudo ip a del [IP address] dev [interface]
    ```

    In this example, it's possible to remove 172.x.y.z from the wg0 interface:

    ```
    sudo ip a del 172.x.y.z/32 dev wg0
    ```

    The PostUP iptables rule from step 2 above restricts all traffic to the tunnel and all outgoing attempts to get traffic out fail. To gracefully recover from this, you will likely have to use the **wg-quick** command to take the connection down, then bring it back up.
