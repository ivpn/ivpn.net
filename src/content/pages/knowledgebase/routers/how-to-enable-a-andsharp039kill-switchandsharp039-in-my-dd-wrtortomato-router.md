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

In **DD-WRT:**

1.  Go to 'Administration' - > 'Commands'

2.  Add the following rules:
    ```
    iptables -I FORWARD -i br0 -o tun0 -j ACCEPT
    iptables -I FORWARD -i tun0 -o br -j ACCEPT
    iptables -I FORWARD -i br0 -o $(nvram get wan_iface) -j DROP
    iptables -I INPUT -i tun0 -j REJECT
    iptables -t nat -A POSTROUTING -o tun0 -j MASQUERADE
    ```

3.  Click on "Save Firewall" and Reboot router. 

**Tomato**:

1.  Go to Administration -> Scripts > Firewall

2.  Add the following rules:  
    ```
    iptables -I FORWARD -i br0 -o tun0 -j ACCEPT
    iptables -I FORWARD -i tun0 -o br -j ACCEPT
    iptables -I FORWARD -i br0 -o $(nvram get wan_iface) -j DROP
    iptables -I INPUT -i tun0 -j REJECT
    iptables -t nat -A POSTROUTING -o tun0 -j MASQUERADE
    ```

3.  Save the rule and reboot router.
