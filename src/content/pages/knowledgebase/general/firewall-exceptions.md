---
title: Firewall Exceptions - IVPN Help
h1: Firewall Exceptions
url: /knowledgebase/general/firewall-exceptions/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 470
---
# Firewall Exceptions

The IVPN App for Windows, macOS, and Linux includes a feature to allow IP addresses and subnets to bypass the app's kill switch firewall.  This can be useful to access local network devices that are outside of the range of the current LAN.  It can also be useful if a corporate VPN is required to run concurrently with the IVPN App.  It is also possible to include the IP address for a website in the firewall exception list and traffic to that website will bypass the VPN connection, like a split tunnel for a specific website.

To make use of this feature, adding a firewall exception to the IVPN App is the first step and adding a static route to the computer system is the second step.  The firewall exception instructs the IVPN App to allow the traffic to bypass its firewall and the static route instructs the computer system to route the traffic outside of the VPN tunnel.

To add a firewall exception, go to IVPN App's `Settings > IVPN Firewall > Exceptions` area and enter an IP address or a subnet.

To add a static route, three details are required:
1. The IP address or subnet from the exception
1. The subnet mask for #1 above as an IP address or in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation)
1. The IP address for the computer system's default gateway (i.e. the local router)

In the examples below, `a.b.c.d` represents the default gateway and needs to be replaced with the actual local default gateway IP address.

<div markdown="1" class="notice notice--warning">
Note: These static routes are temporary and will have to be added after each reboot.
</div>

### Windows

Open a Command Prompt via the **Run as administrator** option.

Show the routing table:
```
route PRINT
```

Add a static route for subnet `192.168.100.0/24`:
```
route ADD 192.168.100.0 MASK 255.255.255.0 a.b.c.d
```

Delete the route:
```
route DELETE 192.168.100.0 MASK 255.255.255.0 a.b.c.d
```


### macOS

Show the routing table:
```
netstat -rn
```

Add a static route for subnet `192.168.192.0/20`:
```
sudo route -n add -net 192.168.192.0/20 a.b.c.d
```

Delete the route:
```
sudo route -n delete -net 192.168.192.0/20
```


### Linux

Show the routing table:
```
route
routel
ip route
```

Add a static route for IP address `192.168.111.111`:
```
sudo ip route add 192.168.111.111/32 via a.b.c.d
```

Delete the route:
```
sudo ip route del 192.168.111.111/32
```


### Example of a Website Exception

Connect the VPN and visit a website to check the current IP address: [https://www.dnsleaktest.com](https://www.dnsleaktest.com)

Determine a website's IP address using one of these commands:
```
nslookup dnsleaktest.com
dig +short dnsleaktest.com
```

Add an exception to the IVPN App's firewall for that website's IP address using the `/32` CIDR notation subnet mask.

Add a static route to the system for the website's IP address using the `/32` or `255.255.255.255` subnet mask.

Refresh the page.

This may offer a way to access a site that uses one or two IP addresses for hosting, though for larger sites with complicated infrastructure, like streaming sites and those that rely on redirects to content delivery networks, this type of exception might not behave as expected.
