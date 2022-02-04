---
title: Onion SSH Hosts for Login Chaining
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/onion-ssh-hosts-for-login-chaining/
section: Misc
weight: 40
date: 2016-01-19T10:27:43+00:00
layout: guides-details
---
In [Will a VPN Protect Me? Defining your threat model][1] and [Adversaries and Anonymity Systems: The Basics][2], I discussed threats to anonymity, freedom, privacy and/or security, and how to choose appropriate setups to counter them. The most elaborate setup that I've described involves [nested chains of VPN services and Tor][3]. And that setup relies primarily on Tor for anonymity.

But perhaps that's insufficient. After all, the Tor Project does warn: `This is experimental software. Do not rely on it for strong anonymity.` It's well known that Tor is vulnerable to global adversaries. And there are occasional reports of Tor users and hidden service operators getting busted. However, as far as I know, no stronger anonymity system has yet been implemented at usable scale. So how could one get more stopping power?

I'm reminded of the situation back in the early 90s. Being anonymous on the Internet was nontrivial. There were no VPN services. Tor was a decade away. For email, there were Cypherpunk and Mixmaster anonymous remailers. And one could use them for mail lists and Usenet. But options for anonymous, low-latency Internet activity were extremely limited.

Remote login chaining was just about it. You needed to know several remote hosts, and have a valid username and password for each. The first step was dialup access to one of the remote hosts. If you had a portable computer or laptop, you could call from a payphone, using a modem with an acoustic coupler. Then you would [telnet][4] to another host. And then you would telnet to a third host. And so on. In order to identify you, adversaries would need to trace your path back through the chain.

However, telnet login chaining wasn't such a great approach. Telnet is not secure. There is no host authentication, and no content encryption, so snooping and MitM attacks are trivial. If enough network traffic got logged, the whole telnet chain (all plaintext) could be reconstructed. Since the late 90s, telnet has been superseded by [SSH][5].

That's what happened to [Kevin Mitnick][6], for example. It got him five years in the can. But the [session transcripts][7] are instructive. You can telnet to a series of ports, and relive Kevin's console experience. For example:

    $ telnet kevin-on-demand.takedown.com 4009

This guide takes the concept of remote login chaining, and implements it using anonymously leased VPS that are running onion SSH services. Perhaps one such SSH login could be pwned. But it would arguably be harder to pwn a chain of them. And in any case, it's a fun project.

I recommend working in Whonix, [reaching Tor through a nested VPN chain][3]. You'll need at least two small Linux VPS, leased via Tor using well-anonymized Bitcoin. It's a simple setup, the same for each VPS.

Create a 4096-bit RSA key in the Whonix workstation VM, with a strong passphrase. Then SCP the public key to your first VPS. Now SSH to the VPS. If necessary, add a user account. Set root and user passwords. Create /home/user/authorized_keys, and add the Whonix id_rsa.pub to it. Then edit /etc/ssh/sshd_config. Disable root login and password authentication. If you like, add one or more additional port lines, such as 5222, so that you can run multiple onion SSH services.

Then restart the SSH service, and check that you can login as user from a new terminal window, using the local id_rsa passphrase. Now create a 4096-bit RSA key in the VPS, with a passphrase.

Do apt-get update and dist-upgrade, and reboot. Then SSH to the VPS, and install iptables-persistent and fail2ban. Copy /etc/fail2ban/jail.conf to /etc/fail2ban/jail.local. Edit /etc/iptables/rules.v6, change defaults to `DROP`, and do ip6tables-restore. Restart fail2ban service, and test with `fail2ban-client ping`. The reply should be `pong`.

Now install tor, and edit /etc/tor/torrc:

    SocksPort 127.0.0.1:9050
    SocksPolicy accept 127.0.0.1/32
    SocksPolicy reject *
    VirtualAddrNetwork 10.192.0.0/10
    AutomapHostsOnResolve 1
    Log notice file /var/log/tor/notices.log
    RunAsDaemon 1
    DataDirectory /var/lib/tor
    HiddenServiceDir /var/lib/tor/ssh/
    HiddenServicePort 22 127.0.0.1:22

If you want to run multiple onion SSH services, do something like this:

    ...
    HiddenServiceDir /var/lib/tor/ssh0/
    HiddenServicePort 22 127.0.0.1:22
    HiddenServiceDir /var/lib/tor/ssh1/
    HiddenServicePort 22 127.0.0.1:5222

Then restart tor service, and check its status. If it's running, get the hidden service credentials:

    $ cat /var/lib/tor/ssh/hostname
    $ cat /var/lib/tor/ssh/private_key

And for any additional onion SSH services that you've configured. Now SSH to user@hostname. If you get in, close first SSH login. If not, check your work. Once you get in via the onion SSH service, create /etc/iptables/tight-rules.v4:

    *filter

    :INPUT DROP [0:0]
    :FORWARD DROP [0:0]
    :OUTPUT ACCEPT [0:0]

    -A INPUT -m state --state INVALID -j DROP
    -A INPUT -p tcp -m tcp --tcp-flags FIN,SYN,RST,PSH,ACK,URG FIN,SYN,RST,ACK -j DROP
    -A INPUT -p tcp -m tcp --tcp-flags FIN,SYN FIN,SYN -j DROP
    -A INPUT -p tcp -m tcp --tcp-flags SYN,RST SYN,RST -j DROP
    -A INPUT -f -j DROP
    -A INPUT -p tcp -m tcp --tcp-flags FIN,SYN,RST,PSH,ACK,URG FIN,SYN,RST,PSH,ACK,URG -j DROP
    -A INPUT -p tcp -m tcp --tcp-flags FIN,SYN,RST,PSH,ACK,URG NONE -j DROP

    -A INPUT -i lo -s 127.0.0.1/32 -d 127.0.0.1/32 -j ACCEPT
    -A INPUT -s 127.0.0.1/32 -d 127.0.0.1/32 -j ACCEPT
    -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
    -A INPUT -j DROP

    COMMIT

Those rules block all incoming connections, so only SSH via onion service will work. Do iptables-restore from those rules. You should still be connected. If not, rebooting from the hosting control panel will restore the open iptables rules. Once it's working, test:

    $ wget http://ipchicken.com
    $ cat index.html | less

You should see the VPS IPv4 address. Also test Tor:

    $ rm index.html
    $ torsocks wget http://check.torproject.org
    $ cat index.html | less

You should see `Congratulations. This browser is configured to use Tor.`

To prepare for use after reboot, just login via SSH onion, and load the tight iptables rules.

So let's say that you have two of these VPS, host0 and host1, with onion SSH hostnames `host0rpx2zt8vwu1.onion` and `host1cwdrau3qhja.onion`. And let's say that you plan to first SSH to host0, and then from host0 to host1. You'll need to add host0's public RSA key to ~/authorized_keys in host1. First do:

    $ scp user@host0rpx2zt8vwu1.onion:~/.ssh/id_rsa.pub ~/Downloads/host0_id_rsa.pub
    $ scp ~/Downloads/host0_id_rsa.pub user@host1cwdrau3qhja.onion:~/.ssh/

Then SSH to host1, add the host0 key to ~/authorized_keys, and exit.

Now SSH to host0. Then SSH from host0 to host1. If you hit the Internet directly from host1, sites will see its IP address. You can also use torsocks to hit the Internet from host1 via Tor. You can add additional hops, by SSHing from host1 to host2, and so on. But latency becomes unworkable after about three chained hosts.

OK, so it works. But does it actually increase anonymity? Routing Tor over Tor is generally [not recommended][8]: "Doing so produces undefined and potentially unsafe behavior. In theory, however, you can get six hops instead of three, but it is not guaranteed that you'll get three different hops - you could end up with the same hops, maybe in reverse or mixed order."

The warning about relay overlap with Tor over Tor seems overstated. The [hidden service protocol][9] involves two three-hop circuits. The user's Tor client builds a three-relay circuit to a rendezvous point, and then sends a connection request to one of the hidden service's introduction points. The hidden service's Tor client builds a three-relay circuit to the specified rendezvous point, and the connection is established. There are seven Tor relays in this connection, four picked by the user's client, and three picked by the hidden service's client.

I can't imagine that the user's client and the hidden service's client are sharing any information about circuit building. Given that, I don't get how the hidden service protocol can rigorously avoid relay overlap. And I don't see why routing Tor over Tor is more prone to relay duplication, as long as independent Tor clients are being used.

More instructive is the Tor Project's recommendation against [changing the default three-relay circuit length][10]: "We don't want to encourage people to use paths longer than this — it increases load on the network without (as far as we can tell) providing any more security. Remember that [the best way to attack Tor is to attack the endpoints and ignore the middle of the path][11]".

Tor developers are concerned that attackers can use long circuits to DoS the network. By DoSing honest relays, for example, attackers can direct clients to malicious relays. Relays restrict circuit length to eight relays. But routing Tor via Tor would circumvent that. Doing that is still possible in the current stable version (0.2.7.6). However, exit node to entry connections will apparently [not work][12] in the next release. However, there are no exit nodes involved in chaining onion SSH services, so the change shouldn't be problematic.

But what about those attacks on endpoints? From Tor's [threat model][11]: "In low-latency anonymity systems that use layered encryption, the adversary's typical goal is to observe both the initiator and the responder. By observing both ends, passive attackers can confirm a suspicion that Alice is talking to Bob if the timing and volume patterns of the traffic on the connection are distinct enough; active attackers can induce timing signatures on the traffic to force distinct patterns. Rather than focusing on these traffic confirmation attacks, we aim to prevent traffic analysis attacks, where the adversary uses traffic patterns to learn which points in the network he should attack".

Neither traffic confirmation attacks nor traffic analysis attacks necessarily depend on explicitly learning circuit paths. However, some of the classic deanonymization attacks on users and hidden services do involve their entry guards. Given all that, using hidden services is arguably less likely traceable than simply using websites via Tor, because there are two linked circuits to deanonymize. And chaining two hidden services is arguably even less likely traceable.

Traffic confirmation attacks depend on matching traffic patterns at connection endpoints. And traffic patterns also play a role in traffic analysis to identify those endpoints. So maybe adding jitter to the connection would be useful. Using VPN services on the onion SSH hosts will accomplish that, because all Tor connections will go through the VPN server. Multi-hop VPN services will do a better job of that. VPN services also hide onion SSH hosts from their entry guards, which might end up controlled by adversaries.

Anyway, get a VPN service subscription, and download Linux setup files. Don't use any of the VPN service accounts that you use locally. Purchase via Tor, and pay with thoroughly anonymized Bitcoin. Then SCP zipped linux setup files to host0. SSH to host0, and install openvpn. Edit /etc/default/openvpn and change AUTOSTART to `none`. Unzip and copy the setup files to /etc/openvpn/, and remove read rights for group and other. If you have an openvpn configuration with the extension `.ovpn`, change that to `.conf`. You may need to tweak your openvpn configuration file (let's say `vpnroute.conf`).

However, you can't just start the openvpn service. That's because, once it connects, your SSH connection to this VPS will die. Normally, you could add a route command to the openvpn configuration for the IP address of your management device, to bypass the VPN tunnel. But that isn't workable when you're SSHing via tor, unless you want to specify a particular exit node. Also, the tor process will exit when openvpn starts, so using the SSH onion service won't help.

The solution is to create a shell script that stops tor, waits, starts openvpn, waits, and then starts tor:

    $ nano /etc/openvpn/start-vpn.sh
      #!/bin/sh

      systemctl stop tor.service
      sleep 60
      systemctl start openvpn@vpnroute.service
      sleep 60
      systemctl start tor.service
    $ chmod +x /etc/openvpn/start-vpn.sh

That's not quite enough, though, because your SSH login will die as soon as openvpn connects, and then the script will stop executing. To prevent that, you must have the script ignore the HUP (hangup) signal when the SSH login dies:

    $ nohup /etc/openvpn/start-vpn.sh

Your SSH login will still die when tor stops. But just wait a few minutes, giving openvpn and tor time to reconnect, and then connect to the SSH onion service. If it doesn't work, just reboot the VPS from the hosting control panel. The openvpn service won't restart, so you'll be able to SSH again.

As with the tight iptables rules, you can only connect to the SSH onion service. But in this case, it's because everything is routed through the VPN service. The VPN exit has tight iptables rules, and it doesn't forward SSH back to your VPS.

To setup the VPS for use after reboot, login via the SSH onion service, load tight iptables rules, and run `nohup start-vpn.sh`. Wait a few minutes, and then login via the SSH onion service.

So hey, enjoy your hosts. But do recall that your VPS providers and intervening ISPs may be logging. Remember Kevin! Always use end-to-end encryption for sensitive content, and [be prudent about sites that you're connecting to][13].

 [1]: /privacy-guides/will-a-vpn-protect-me/
 [2]: /privacy-guides/adversaries-and-anonymity-systems-the-basics/
 [3]: /privacy-guides/advanced-privacy-and-anonymity-part-8/
 [4]: https://en.wikipedia.org/wiki/Telnet
 [5]: https://en.wikipedia.org/wiki/Secure_Shell
 [6]: https://en.wikipedia.org/wiki/Kevin_Mitnick
 [7]: https://shinnok.com/rants/2009/01/27/kevin-mitnicks-hacking-telnet-session-transcripts/
 [8]: https://trac.torproject.org/projects/tor/wiki/doc/TorifyHOWTO#ToroverTor
 [9]: https://web.archive.org/web/20120505002508/https://www.torproject.org/docs/hidden-services.html.en
 [10]: https://web.archive.org/web/20141225122111/https://www.torproject.org/docs/faq.html.en#ChoosePathLength
 [11]: https://svn.torproject.org/svn/projects/design-paper/tor-design.html#subsec:threat-model
 [12]: https://trac.torproject.org/projects/tor/ticket/2667
 [13]: https://www.whonix.org/wiki/DoNot
