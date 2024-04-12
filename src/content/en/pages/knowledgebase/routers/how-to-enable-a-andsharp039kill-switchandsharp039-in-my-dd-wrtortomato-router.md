---
title: How to enable a 'Kill switch' in my DD-WRT/Tomato router? - IVPN Help
h1: How to enable a 'Kill switch' in my DD-WRT/Tomato router?
url: /knowledgebase/routers/how-to-enable-a-andsharp039kill-switchandsharp039-in-my-dd-wrtortomato-router/
sections:
    - routers
sectionTitle: Routers
layout: help-details
weight: 30
---
# How to enable a 'Kill switch' in my DD-WRT/Tomato router?

To enhance your security and prevent any possible traffic leaking outside VPN tunnel whenever you are unexpectedly disconnected from IVPN, you need to slightly adjust firewall settings in a router you use:

## DD-WRT

### WireGuard:

1.  Go to `Setup` - > `Tunnels`

2.  Check **Kill Switch**

3.  Click the `Save` button, then click the `Apply Settings` button.

4.  Reboot your router.

 <div markdown="1" class="notice notice--info">
    This option will block the traffic only from clients connected via br0 interface. If you have made your own unbridged interfaces you have to add additional rules to your router's iptables firewall accordingly.<br><br>
    If you use PBR (Policy Based Routing), the Killswitch rules will only apply to IP addresses you have specified in the PBR field. When PBR is disabled, then all LAN clients connected to br0 are blocked from accessing WAN.</div>

### OpenVPN:

1.  Go to `Administration` - > `Commands`

2.  Add the following rules:
    ```
    iptables -I FORWARD -i br0 -o tun0 -j ACCEPT
    iptables -I FORWARD -i tun0 -o br -j ACCEPT
    iptables -I FORWARD -i br0 -o $(nvram get wan_iface) -j DROP
    iptables -I INPUT -i tun0 -j REJECT
    iptables -t nat -A POSTROUTING -o tun0 -j MASQUERADE
    ```

3.  Click on `Save Firewall` and Reboot router. 

## Tomato

1.  Go to `Administration` -> `Scripts` > `Firewall`

2.  Add the following rules:  
    ```
    iptables -I FORWARD -i br0 -o tun0 -j ACCEPT
    iptables -I FORWARD -i tun0 -o br -j ACCEPT
    iptables -I FORWARD -i br0 -o $(nvram get wan_iface) -j DROP
    iptables -I INPUT -i tun0 -j REJECT
    iptables -t nat -A POSTROUTING -o tun0 -j MASQUERADE
    ```

3.  Save the rule and reboot router.
