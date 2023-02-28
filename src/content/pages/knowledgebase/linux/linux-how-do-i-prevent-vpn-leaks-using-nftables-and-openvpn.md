---
title: Linux - How do I prevent VPN leaks using nftables and OpenVPN? - IVPN Help
h1: Linux - How do I prevent VPN leaks using nftables and OpenVPN?
url: /knowledgebase/linux/linux-how-do-i-prevent-vpn-leaks-using-nftables-and-openvpn/
sections:
    - linux
    - troubleshooting
sectionTitle: Linux
layout: help-details
weight: 30
---
# Linux - How do I prevent VPN leaks using nftables and OpenVPN?

<div markdown="1" class="notice notice--info">
We recommend using our <a href="/apps-linux/">Linux app</a> that offers an easy-to-use built-in Firewall solution that protects you from both IP and traffic leaks. Read on, if you would like to have a more granular Firewall configuration or prefer to use NetworkManager or a different VPN client.
</div>

As the successor to [iptables](/knowledgebase/linux/linux-how-do-i-prevent-vpn-leaks-using-iptables/), **nftables** is supported by the [netfilter project](https://www.netfilter.org/) and provides flexibility, scalability, plus performance improvements with firewall rules.  In this article, we present a script with a set of **nftables** firewall commands and rules to create a kill switch for a manual OpenVPN connection.


### nftables Basics

Install the `nftables` package as required.

Disable the **iptables** service and enable the **nftables** service (if required) to automatically load firewall rules when the system boots:
```
sudo systemctl disable --now iptables
sudo systemctl enable --now nftables
```

The system-wide configuration for **nftables** might be stored in one of the following locations based on your Linux distribution:
```
/etc/nftables.conf
/etc/sysconfig/nftables.conf
```

Check the current **nftables** rules:
```
sudo nft list ruleset
```

Flush the current **nftables** rules (ie. to start over):
```
sudo nft flush ruleset
sudo nft list ruleset
```

The rules in the script below can be stored in an `nft` script file and loaded into the system for testing.  The `/tmp/` folder is used as an example; please feel free to use a more permanent location if you reboot your system regularly:
```
sudo nft --file /tmp/killswitch.nft
sudo nft list ruleset
```

Testing with **nftables** is relatively friendly.  For example, there is an optional rule in the script below to allow outbound access to the local network.  This rule is commented out by default.  Load the script below (`sudo nft --file ...`) and verfy that LAN access is not available.  Uncomment the line from the `nft` script, save the changes, then load the script again and check that LAN access is available.

Once the testing is complete, copy the script to the system-wide configuration location mentioned above:
```
sudo cp /etc/nftables.conf /etc/nftables.conf.ORIGINAL
sudo cp /tmp/killswitch.nft /etc/nftables.conf
```

Reboot the system and check the current **nftables** rules to confirm the desired boot-time behaviour.

<div markdown="1" class="notice notice--warning">
Please check the "define" lines at the top of the script below and adjust them based on your system's network interface names, LAN details, preferred VPN server location, preferred NTP sources, etc.  Rules marked OPTIONAL are not required, though they may add extra functionality.  Please consider your threat model prior to enabling these optional rules.
</div>


### nftables Rules Script

Add the script below to a file using the text editor of your choice:

```
nano /tmp/killswitch.nft
vi /tmp/killswitch.nft
vim /tmp/killswitch.nft
ed /tmp/killswitch.nft
```

<div class="highlight">
<pre>
<code class="language-shell" data-lang="shell">
<span>#!/usr/sbin/nft -f</span>

<span>## FLUSH existing rules and create a table called "killswitch".</span>
flush ruleset
add table inet killswitch

<span>## NETWORK interfaces: Run "ip a" to confirm local interface device names.</span>
define INET_DEV = eth0
define VPN_DEV  = tun0

<span>## VPN servers: Switzerland in this case.  Adjust accordingly: ivpn.net/status </span>
<span>## dig +short ch{1,3}.gw.ivpn.net</span>
define VPN_SERVERS = { 141.255.166.194, 185.212.170.138 }

<span>## NTP servers: Adjust for your server pool.</span>
<span>## dig +short {0..1}.pool.ntp.org | sort -h</span>
define NTP_SERVERS = { 62.108.36.235, 85.214.96.5, 129.70.132.32, 136.243.202.118, 144.91.116.85, 185.242.112.53, 193.203.3.170, 213.160.74.205 }

<span>## LAN: Adjust for your local LAN.</span>
<span># define LAN_CLIENTS = { 192.168.0.2, 192.168.0.4-192.168.0.6 }</span>
define LAN_CLIENTS = 192.168.0.0/24

<span>## OPTIONAL: PORT FORWARDING: 5-digit port number available in the Account Area on ivpn.net with IVPN Pro.</span>
<span>#define FORWARDED_PORT = 71234</span>

<span>## OPTIONAL: PORT FORWARDING: Internet client IP address list allowed to access forwarded service.</span>
<span>#define PF_CLIENTS = { a.b.c.d, e.f.g.h }</span>

<span>## DROP everything by default for all chains ("INPUT", "FORWARD", "OUTPUT").</span>
add chain inet killswitch INPUT { type filter hook input priority 0 ; policy drop ; }
add chain inet killswitch FORWARD { type filter hook forward priority 0 ; policy drop ; }
add chain inet killswitch OUTPUT { type filter hook output priority 0 ; policy drop ; }

<span>## LOOPBACK: Some local processes need to hear from other ones.</span>
add rule inet killswitch INPUT iifname "lo" counter accept

<span>## LAN BROADCAST: You may need to allow traffic from local DHCP servers.</span>
add rule inet killswitch INPUT iifname $INET_DEV ip saddr 255.255.255.255 counter accept

<span>## OPTIONAL: Allow incoming SSH (22/TCP) from LAN.  Uncomment and adjust for other services as required or add additional rules.</span>
<span>#add rule inet killswitch INPUT iifname $INET_DEV tcp dport 22 counter accept</span>

<span>## OPTIONAL PORT FORWARDING: Uncomment one rule of the three listed below.</span>
<span>## 1. Allow all incoming Internet IP addresses</span>
<span>#add rule inet killswitch INPUT iifname $VPN_DEV meta l4proto {tcp, udp} th dport $FORWARDED_PORT counter accept</span>
<span>## 2. Allow all incoming Internet IP addresses with logging</span>
<span>#add rule inet killswitch INPUT iifname $VPN_DEV meta l4proto {tcp, udp} th dport $FORWARDED_PORT counter log prefix "NFT PF: " accept</span>
<span>## 3. Allow defined list of Internet IP addresses to access forwarded service</span>
<span>#add rule inet killswitch INPUT iifname $VPN_DEV ip saddr $PF_CLIENTS meta l4proto {tcp, udp} th dport $FORWARDED_PORT counter accept</span>

<span>## ALLOW related/established traffic and drop everything else without acknowledgement to peers.</span>
add rule inet killswitch INPUT ct state related,established accept
add rule inet killswitch INPUT counter drop

<span>## FORWARDING: Your device is not a router, so do not allow forwarding.  Enable logging just in case.  Note: Not related to port forwarding from above.</span>
add rule inet killswitch FORWARD counter log prefix "NFT drop fwd: " drop

<span>## LOOPBACK: Some local processes need to talk to other ones.</span>
add rule inet killswitch OUTPUT oifname "lo" counter accept

<span>## NTP: Allow outbound NTP requests because OpenVPN's certificate system is sensitive to time discrepancies.</span>
add rule inet killswitch OUTPUT oifname $INET_DEV ip daddr $NTP_SERVERS udp dport 123 counter accept

<span>## VPN: Allow outbound traffic to VPN servers defined above.</span>
add rule inet killswitch OUTPUT oifname $INET_DEV ip daddr $VPN_SERVERS counter accept

<span>## VPN: Allow outbound traffic through the VPN tunnel.</span>
add rule inet killswitch OUTPUT oifname $VPN_DEV counter accept

<span>## LAN BROADCAST: You may need to allow traffic to local DHCP servers.</span>
add rule inet killswitch OUTPUT oifname $INET_DEV ip daddr 255.255.255.255 counter accept

<span>## OPTIONAL: Allow outbound traffic to local network.</span>
<span>#add rule inet killswitch OUTPUT oifname $INET_DEV ip daddr $LAN_CLIENTS counter accept</span>

<span>## ALLOW related/established traffic.</span>
add rule inet killswitch OUTPUT ct state related,established accept

<span>## DROP everything else, without acknowledgement to peers.</span>
<span>## LOGGING is useful for testing, though may consume log files over time.  Choose one rule or the other from below.</span>
add rule inet killswitch OUTPUT counter log prefix "NFT drop out: " drop
<span>#add rule inet killswitch OUTPUT counter drop</span>
</code>
</pre>
</div>


### Verifying

Stop the OpenVPN connection, then check access to Internet sites, LAN, etc., using `ping` or other methods.  If logging is enabled on the **DROP** rule, check the system log (`dmesg | grep "NFT drop"`) to confirm outgoing traffic is blocked.


### Handling IPv6

The ruleset in the script above ends up blocking IPv6 traffic.  Link local IPv6 addresses are pingable from the local system (ie. `fe80:...`), though IPv6 traffic to other systems, like LAN and Internet destinations, is blocked.  This might be enough for your threat model, though there are other ways to block IPv6 traffic.

- For OpenVPN 2.5 and up, the `block-ipv6` directive is available.  Edit the OpenVPN configuration file you use for your VPN connection and add the following directives above the `verb` line:
```
ifconfig-ipv6 fd15:53b6:dead::2/64 fd15:53b6:dead::1
redirect-gateway ipv6
block-ipv6
```

The `fd15:53b6:dead:` prefix and the three lines above are taken from the OpenVPN 2.5 man page.  The prefix is part of the IPv6 local range (`fd00::/8`) and is not routable over the Internet.

- Disable IPv6 on the local system.  Unless you make use of local network IPv6 resources, it may be simplest to disable IPv6 entirely.  Run these commands:
```
echo 'net.ipv6.conf.all.disable_ipv6=1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv6.conf.default.disable_ipv6=1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv6.conf.lo.disable_ipv6=1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

To undo the change and restore IPv6 on your system, change the `disable_ipv6=1` bits to `disable_ipv6=0` or manually edit the `/etc/sysctl.conf` file and remove the three `disable_ipv6=1` lines, then run `sudo sysctl -p`.  A system reboot may or may not be required after re-enabling IPv6.
