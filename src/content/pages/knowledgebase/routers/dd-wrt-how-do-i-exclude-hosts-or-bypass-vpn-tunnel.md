---
title: DD-WRT - How do I exclude hosts / bypass VPN tunnel? - IVPN Help
h1: DD-WRT - How do I exclude hosts / bypass VPN tunnel?
url: /knowledgebase/routers/dd-wrt-how-do-i-exclude-hosts-or-bypass-vpn-tunnel/
sections:
    - routers
    - troubleshooting
sectionTitle: Routers
layout: help-details
weight: 10
---
# DD-WRT - How do I exclude hosts / bypass VPN tunnel?

<div markdown="1" class="notice notice--warning">
We do not provide support in getting this functionality working on your DD-WRT router. You agree to use these scripts at your own risk.
</div>

### WireGuard

1. Go to `SETUP` / `TUNNELS`

2. Set **Advanced settings**: Enable

3. Set **Policy Based Routing**: Enter the IP address list in a CIDR notation.

![](/images-static/uploads/ddwrt-pbr.png)

<div markdown="1" class="notice notice--info">
The hosts with the IP addresses specified in the Policy Based Routing (PBR) field will be routed via the WireGuard interface. Everything else will bypass the VPN tunnel and use the WAN interface instead.<br><br>
The IP addresses are entered in a CIDR notation as a comma delimited list (no comma at the beginning and at the end).<br><br>
When the list starts with a '#' symbol, all entries are ignored and PBR is disabled. This allows you to preserve the list for future use.<br><br>
You can also specify a range of IPs by entering, e.g. - 192.168.1.64/26.
</div>

### OpenVPN

1.  Go to `ADMINISTRATION` / `COMMANDS` / `COMMAND SHELL`. Enter the following commands whilst substituting the IPs you wish to bypass the VPN (each IP separated by a space character):

    ```
    nvram set no_vpn_lst="192.168.1.5 192.168.1.6 192.168.1.7"
    nvram commit
    ```

2.  Copy the script from below into the COMMAND SHELL and click on `Save Custom Script`

    ```
    #!/bin/sh
    sleep 30
    NO_VPN_LST=`nvram get no_vpn_lst`
    [ -z "$NO_VPN_LST" ] && exit 0
    WAN_GWAY="0.0.0.0"
    while [ $WAN_GWAY == "0.0.0.0" ]; do
    sleep 3
    WAN_GWAY=`nvram get wan_gateway`
    done
    ip route add default via $WAN_GWAY table 10
    for ipa in $NO_VPN_LST; do
    ip rule add from $ipa table 10
    done
    ip route flush cache
    exit 0
    ```

3.  Reboot. Now the devices with the IPs on your list will be routed outside the OpenVPN tunnel.
