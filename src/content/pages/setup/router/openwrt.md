---
title: VPN Setup guide for OpenWrt
listItem: OpenWrt
url: /setup/router/openwrt/
section: Router Setup
platform: router
layout: setup-article
weight: 20
---
## OpenWrt OpenVPN Setup Guide

<div markdown="1" class="notice notice--warning">
This guide was produced using OpenWrt v.18.06.2
</div>

1.  Open the terminal on your computer and log in to your router via the SSH:

    ```
    # ssh root@192.168.1.1
    ```

    The router’s username and IP address above are default. Substitute accordingly if yours are different.

2.  Install OpenVPN package:

    ```
    # opkg update
    # opkg install openvpn-openssl
    ```

    ..and LuCI-component of OpenVPN (optional, if you prefer to manage OpenVPN profile from your router's Web UI later on):

    ```
    # opkg install install luci-app-openvpn
    ```

3.  Enable OpenVPN to start on boot:

    ```
    # /etc/init.d/openvpn enable
    ```

4.  Download and unzip [.IVPN config files](/releases/config/ivpn-openvpn-config.zip) to your computer. Open the .ovpn config file with the VPN server location you wish to connect to using any text editors and adjust `auth-user-pass` line to `auth-user-pass pass`. Save the changes.

5.  Change the extension of the .ovpn config file to .conf and transfer it over to your router’s **"/etc/openvpn/"** folder using **"scp"** command in the separate terminal instance (or WinSCP program for Windows):

    ```
    # scp ~/Downloads/Germany.ovpn root@192.168.1.1:/etc/openvpn/Germany.ovpn
    ```

    Adjust the path with your .ovpn file location and router’s username/ip address accordingly

6.  Back in the router’s CLI, create the file with your IVPN credentials:

    ```
    # cat > /etc/openvpn/pass << EOF
    # yourIVPNaccountID
    # anyPasswordHere
    # EOF
    ```

    <div markdown="1" class="notice notice--info">
    Only your account ID is used for authentication. The password field can be left empty or set to anything if your client software requires a non-blank password.
    </div>

    Set correct permissions:

    ```
    # chmod 0400 /etc/openvpn/pass
    ```

7.  Specify the filename in **"/etc/config/openvpn"**:

    ```
    # uci set openvpn.ivpn=openvpn
    # uci set openvpn.ivpn.enabled='1'
    # uci set openvpn.ivpn.config='/etc/openvpn/Germany.ovpn'
    # uci commit openvpn
    ```

8.  Create network interface:

    ```
    # uci set network.ivpntun=interface
    # uci set network.ivpntun.proto='none'
    # uci set network.ivpntun.ifname='tun0'
    # uci commit network
    ```

9.  Create Firewall zone and add forwarding rule from LAN to VPN:

    ```
    # uci add firewall zone
    # uci set firewall.@zone[-1].name='vpnfirewall'
    # uci set firewall.@zone[-1].input='REJECT'
    # uci set firewall.@zone[-1].output='ACCEPT'
    # uci set firewall.@zone[-1].forward='REJECT'
    # uci set firewall.@zone[-1].masq='1'
    # uci set firewall.@zone[-1].mtu_fix='1'
    # uci add_list firewall.@zone[-1].network='ivpntun'
    # uci add firewall forwarding
    # uci set firewall.@forwarding[-1].src='lan'
    # uci set firewall.@forwarding[-1].dest='vpnfirewall'
    # uci commit firewall
    ```

10. Configure IVPN DNS on your router’s WAN interface:

    ```
    # uci set network.wan.peerdns='0'
    # uci del network.wan.dns
    # uci add_list network.wan.dns='10.0.254.1'
    # uci add_list network.wan.dns='198.245.51.147'
    # uci commit
    ```

11. Enable a Kill-switch by adding the following script into the “/etc/firewall.user” file (under the commented lines) using any text editors (vi, ee, nano, etc..):

    ```
    # This file is interpreted as shell script.
    # Put your custom iptables rules here, they will
    # be executed with each firewall (re-)start.
    # Internal uci firewall chains are flushed and recreated on reload, so
    # put custom rules into the root chains e.g. INPUT or FORWARD or into the
    # special user chains, e.g. input_wan_rule or postrouting_lan_rule.
    if (! ip a s tun0 up) && (! iptables -C forwarding_rule -j REJECT); then
            iptables -I forwarding_rule -j REJECT
    fi
    ```

12. Connect to the VPN:

    ```
    # service openvpn start
    ```

    Check the online status tool on our website to confirm you are connected to IVPN or visit [https://dnsleaktest.com](https://dnsleaktest.com)

    You can now also manage the OpenVPN service in your router’s WebUI:

    ![](/images-static/uploads/install-openvpn-openwrt-010.png)
