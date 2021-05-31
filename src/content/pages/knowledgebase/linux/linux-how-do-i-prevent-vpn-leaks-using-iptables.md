---
title: Linux - How do I prevent VPN leaks using iptables? - IVPN Help
h1: Linux - How do I prevent VPN leaks using iptables?
url: /knowledgebase/linux/linux-how-do-i-prevent-vpn-leaks-using-iptables/
sections:
    - linux
    - troubleshooting
sectionTitle: Linux
layout: help-details
weight: 30
---
# Linux - How do I prevent VPN leaks using iptables?

<div markdown="1" class="notice notice--info">
We recommend using our <a href="/apps-linux/">Linux CLI app</a> that offers an easy-to-use built-in Firewall solution that protects you from both IP and traffic leaks. Read on, if you would like to have a more granular Firewall configuration or prefer to use NetworkManager or a different VPN client.
</div>

If you're using stock OpenVPN in Linux, especially with Network Manager, leaks are possible if the VPN connection fails, or is temporarily interrupted. Given that, it's prudent to have firewall (iptables) rules that: 1) restrict traffic to the VPN tunnel; 2) allow direct connections only to the VPN server.

There are many ways to manage iptables rules. The old-school standard is shell scripting. And indeed, OpenVPN has hooks to run scripts, for routing and iptables, when the VPN connects and disconnects. That's convenient, certainly, but it's also complicated, and it requires editing VPN configuration files. Most VPN services use the "redirect-gateway def1" option to handle routing, but they don't touch iptables. So you need to disable "redirect-gateway def1", and handle routing changes in your scripts.

For most customers we think using iptables-persistent is the better solution. The rules files are easy to understand, and there's no need for complicated rules chains with custom tables. It's easy to manage custom rules for particular circumstances (different locations, different VPNs, etc). And default rules load at reboot, which can be a lifesaver if you're working on remote servers.

However, this approach has limitations for VPN services that specify servers by hostname (for load-balancing, etc). First, iptables does not interpret hostnames in saved rules, only in scripts for creating rules. And so you must get IPv4 addresses (using the host command) and use them in your rules file(s). Second, to prevent DNS leaks, the recommended rules do not allow DNS requests, except through the VPN tunnel. To ensure that the VPN can reconnect after interruption, you must either specify servers in configuration files by IP address, or add entries for them to /etc/hosts.

<div markdown="1" class="notice notice--warning">
This guide uses eth0 for the network adapter name. Please check <strong>ip a</strong> output in a Terminal to confirm the adapter name in your distribution.
</div>

Start by installing iptables-persistent:

```
$ sudo su
# apt-get update
# apt-get -y install iptables-persistent
```

The current iptables rules are saved as `/etc/iptables/rules.v4` and `/etc/iptables/rules.v6`.

Then create new IPv4 rules for the VPN connection:

```
# nano /etc/iptables/vpn-rules.v4
```

<div class="highlight">
<pre>
<code class="language-shell" data-lang="shell">
<span># You can delete all of these comments, if you like.</span>
*filter

<span># You drop everything by default.</span>
:INPUT DROP [0:0]
:FORWARD DROP [0:0]
:OUTPUT DROP [0:0]

<span># Some local processes need to hear from other ones.</span>
-A INPUT -i lo -j ACCEPT

<span># If you are running a server on port N, and have enabled forwarding in your VPN account, you must allow inbound traffic on the VPN. You may also want to limit access to a particular IP address (a.b.c.d). There can be multiple rules, one for each permitted port and source address.</span>
-A INPUT -i tun0 -s a.b.c.d –dport N -j ACCEPT

<span># You may need to allow traffic from local DHCP servers. If using Wi-Fi, use “wlan0” instead of “eth0”. This isn’t needed if your router provides persistent leases.</span>
-A INPUT -i eth0 -s 255.255.255.255 -j ACCEPT

<span># Then you allow related/established traffic, and drop everything else, without acknowledgement to peers.</span>
-A INPUT -m state –state RELATED,ESTABLISHED -j ACCEPT
-A INPUT -j DROP

<span># Your device isn’t a router, so don’t allow forwarding. In any case, you’d also need to allow that using sysctl.</span>
-A FORWARD -j DROP

<span># Some local processes need to talk to other ones.</span>
-A OUTPUT -o lo -j ACCEPT

<span># You need rule(s) to allow connecting to VPN server(s). You must use IP addresses. If also using Wi-Fi, add another rule, with “-o wlan0”, instead of “-o eth0”. There can be multiple rules, one for each server.</span>
-A OUTPUT -o eth0 -d e.f.g.h -j ACCEPT

<span># You need a rule to allow outbound traffic through the VPN tunnel.</span>
-A OUTPUT -o tun0 -j ACCEPT

<span># You may want rule(s) to allow LAN access. There can be multiple rules, one for each LAN that you use. If also using Wi-Fi, add another rule, with “-o wlan0”, instead of “-o eth0”.</span>
-A OUTPUT -o eth0 -d x.y.z.0/24 -j ACCEPT

<span># Allow outgoing traffic to local DHCP servers. If using Wi-Fi, use “wlan0” instead of “eth0”. This isn’t needed if your router provides persistent leases.</span>
-A OUTPUT -o eth0 -d 255.255.255.255 -j ACCEPT

<span># Then you allow related/established traffic, and drop everything else, without acknowledgement to peers.</span>
-A OUTPUT -m state –state RELATED,ESTABLISHED -j ACCEPT
-A OUTPUT -j DROP

COMMIT
</code>
</pre>
</div>

Then load the IPv4 VPN rules:

```
# iptables-restore < /etc/iptables/vpn-rules.v4
```

Now connect (or reconnect) the VPN. If it doesn't connect, restore the default rules:

```
# iptables-restore < /etc/iptables/rules.v4
```

If the VPN connects now, there must be errors in the iptables rules.
