---
title: How to perform a VPN leak test
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/how-to-perform-a-vpn-leak-test/
section: Misc
weight: 20
date: 2016-02-24T13:48:40+00:00
layout: guides-details
---
OK, so you've setup your VPN client. It runs, and there are no error messages. You can reach the Internet. But how can you ensure that all of your traffic is routed through the VPN tunnel? And even if everything seems OK now, what will happen if the machine sleeps, and then resumes? What if there's an interruption in network connectivity? Or what if you're using Wi-Fi, and switch to a new access point and network? Or if you connect to a network that's fully IPv6 capable? This guide demonstrates how you can conduct a comprehensive VPN leak test.

First, verify that your computer has configured a VPN tunnel. In Windows, open a command prompt, and run `ipconfig /all`. You'll see an ethernet adapter section with the Description "TAP-Windows Adapter V9". The IPv4 Address will be something like `10.x.y.z`. In OSX and Linux, open a terminal, and run `ifconfig`. The VPN tunnel adapter is `utun0` in OSX, and `tun0` in Linux.

## Risks from Browser Fingerprinting and IPv6 Leaks

The only way to know whether all traffic is using the VPN tunnel is through testing. But there is some risk in testing for VPN leaks. Browsers can be fingerprinted in various ways. And so sites that you use in testing may see the same browser fingerprints from both your ISP-assigned IP address and your VPN exit IP address. Any adversary that learned your browser's fingerprints could later identify you, even if you were connecting through a VPN and/or Tor, as long as you were using the same browser. A [recent W3C draft guidance][1] states: "elimination of the capability of browser fingerprinting by a determined adversary through solely technical means that are widely deployed is implausible".

WebGL fingerprinting and IPv6 leaks are far worse. WebGL uses the GPU via the OS graphics driver. On a given system, it appears that all browsers with WebGL enabled will have the same WebGL fingerprint. When using VPN services, I recommend blocking WebGL. In Firefox, for example, open "about:config" and toggle "webgl.disabled" to "true". In NoScript options, check "Forbid WebGL" in the "Embeddings" tab.

It appears that systems using a given graphics driver can have the same WebGL fingerprint on hardware with a given GPU. So reinstalling a given OS, or even switching to another OS that uses the same graphics driver, won't change the WebGL fingerprint. This is clearly the case for VirtualBox VMs using the default virtual GPU. For example, browsers on Debian and Lubuntu VMs have the same WebGL fingerprint. But browsers on other OS (unrelated Linux distros, FreeBSD, Windows and OSX) have different WebGL fingerprints. However, the host and VMs use different GPUs (real vs virtual) so there is no overlap in WebGL fingerprints.

It's not uncommon for VPN clients to [leak IPv6 traffic][2]. That's serious, because IPv6 addresses are typically device-specific. And so it's prudent to disable IPv6 in both your OS and your LAN router. It's also prudent to use VPN clients that block IPv6 traffic, or block IPv6 in your firewall. And whenever you first connect through a new LAN or Wi-Fi network, [check IPv6 connectivity][3].

By the way, WebGL fingerprinting is a crucial issue when compartmentalizing across multiple VMs. It's true that you can easily block WebGL fingerprinting in browsers. But it's also prudent to compartmentalize across VMs with different WebGL fingerprints. Whonix instances are another good option, because Tor browser has been hardened to fully block WebGL fingerprinting.

## VPN Leak Test

While doing your VPN leak test, you can use tcpdump to check for traffic that's not using the VPN tunnel. In Windows, you'll need [wintee][4]. Just put a copy in your user folder. Now list network interface numbers:

Windows:

    WinDump -D

OSX:

    sudo tcpdump -D

Linux:

    sudo tcpdump -D

You want the physical network interface. It's typically "1". So to start capturing:

Windows: 

    WinDump -n -i 1 not host a.b.c.d 2&gt;&1 | wtee tcpdump.log

OSX: 

    sudo tcpdump -n -i 1 not host a.b.c.d 2&gt;&1 | tee tcpdump.log

Linux: 

    sudo tcpdump -n -i 1 not host a.b.c.d 2&gt;&1 | tee tcpdump.log

Host a.b.c.d is the VPN server that you're using. Keep the command/terminal window open while you do the following tests, and look for packets with addresses outside your local LAN and/or Wi-Fi networks.

Start by checking your IP address. It's safest to use your VPN provider's website. If they don't report IP address, the next safest bet is arguably [check.torproject.org][5]. If you intend to test for VPN leaks using other sites, I recommend using Tor browser, because it's been hardened to block WebGL fingerprinting, and to otherwise report the same fingerprints for all users. But for now, it's OK to use your default browser. Anyway, you should see your VPN exit IP address.

You also want an ongoing source of network traffic. In a second command/terminal window:

Windows:

    ping -t a.b.c.d 2&gt;&1 | wtee ping.log

OSX:

    ping -n a.b.c.d 2&gt;&1 | tee ping.log

Linux: 

    ping -n a.b.c.d 2&gt;&1 | tee ping.log

If you want pinging with timestamps in Windows or OSX, hacks (more or less ugly) are required:

[Windows:][6]

    ping -t a.b.c.d | cmd /q /v /c "(pause&pause)&gt;nul & for /l %a in () do (set /p "data=" && echo(!time! !data!)&ping -n 2 localhost&gt;nul" 2&gt;&1 | wtee ping.log
  
[OSX:][7]
  
    ping -n a.b.c.d | while read pong; do echo "$(date): $pong"; done 2&gt;&1 | tee ping.log
    
Linux:

    ping -D -n a.b.c.d 2&gt;&1 | tee ping.log
      
Custom clients of some VPN providers block pings to their servers through their VPN tunnels. If you see no output, hit Ctrl-C and try pinging a.b.c.1 instead. If that also doesn't work, try 38.229.72.16 (torproject.org). In the traffic capture window, you should see no packets with addresses outside your local LAN and/or Wi-Fi networks (i.e., no non-local traffic captures).
      
Now disconnect the machine from the network. That will prevent pings from completing. In Windows, you will see "Request timed out." In IOS and Linux, ping output will just stop. Then reconnect the machine to the network. If all goes well, ping replies should start appearing again. Refresh the IP-check site in your browser. You should still see your VPN exit address. In the traffic capture window, you should still see no non-local captures. In Windows, you may see lots of local traffic. To check more thoroughly, you can view tcpdump.log in a test editor.
      
## Failure Modes and Options
      
Failure shows up in a few main ways. Most blatantly, the openvpn process (not just the VPN connection) may die after loss of network connectivity. So after network connectivity is restored, the IP-check site will report your ISP-assigned IP address. And you will see numerous non-local traffic captures. Network Manager in Linux is prone to this failure mode, by the way, and should be avoided.

Less blatantly, but more insidiously, the VPN client may reconnect after network connectivity is restored, and the IP-check site will still report your VPN exit IP address. You might not notice any interruption. But you will see non-local traffic captures, generated by pings that succeeded before the VPN tunnel came back up. Just one leaked packet is enough to reveal your ISP-assigned IP address.
      
Plain vanilla OpenVPN tends to fail in a way that's somewhat easier to manage, but still dangerous. If a network interruption lasts long enough to kill the VPN connection, OpenVPN can't reestablish the connection. As long as OpenVPN is running, all traffic is routed through the VPN gateway, which is dead. And so there's no network connectivity. Pings will fail, and you will see no traffic captures. Default routing isn't restored until the openvpn process is killed. So one could close apps accessing sensitive network resources, kill the openvpn process, and then reconnect the VPN. Or one could just reboot. But those are tedious hacks, and prone to error.
      
You can use the same approach to see how your VPN client responds to other perturbations. Sleep and resume. Change Wi-Fi access points. Use a network with full IPv6 connectivity. Whatever. Inspection of tcpdump.log and ping.log should reveal any leaks.
      
If you find that your VPN client leaks, one option is to try another VPN provider, and test their client. I haven't managed to make iVPN's Windows and IOS clients leak. But iVPN doesn't have a Linux client. However, blocking leaks in Linux is easy with [adrelanos' vpn-firewall][8]. I recommend using it with the built-in openvpn service, not Network Manager. Basically, it allows all apps to use the VPN tunnel, and blocks everything on the physical interface except for connections to the VPN server. You can use the same firewall logic in Windows and OSX. In Windows, you can just use Windows Firewall. In OSX, you can use [IceFloor][9], which is a GUI front end for OpenBSD's PF firewall.
      
## Other Kinds of Leaks
      
Even if all traffic is being routed through your VPN, it's possible that [DNS requests][10] are going to a DNS server that's operated by, or associated with, your ISP. Even though your requests are coming from the VPN exit, an adversary observing both the DNS server and your ISP traffic could correlate activity. If the VPN server uses the same IP address for access and exit, correlation becomes trivial. Now the adversary knows what sites you are accessing.
      
The HTML5 Geolocation API enables a potentially serious leak. It caches and reports available location data. Perhaps you've provided your location, in order to get local weather information. If you use Wi-Fi, your location can be triangulated from accessible access points. If you're using a smartphone, the ID of the base station locates you approximately. And maybe you have GPS turned on. But there's no problem as long as only IP address information is available. The simplest option is to disable geolocation, as explained at [Digital Adda][11].
      
WebRTC is another indiscreet HTML5 feature. If enabled in the browser, it reports local IP address. And if IPv6 is functional, it reports local IPv6 address, which is typically device-specific. So it's prudent to prevent WebRTC leaks by installing the "WebRTC Control" browser addon. Also, as noted above, it's prudent to disable IPv6 in the OS, and to block all IPv6 traffic in the firewall.
      
Sites that you visit can also estimate the number of intervening routers by inspecting received SYN packets. The default initial time to live (TTL) for SYN packets varies by OS. The browser User-Agent string identifies the OS. And the TTL value is decreased each time the packet passes through a router. The difference between expected and observed TTL provides an estimate for the number of intervening routers.
      
If you intend to test for leaks using other third-party sites, I recommend using Tor browser, because it's been hardened to block WebGL fingerprinting, and otherwise to report the same fingerprints for all users. But you obviously don't want to use Tor while testing your VPN. First, download [Tor browser][12] for your OS. Do that with your VPN connected, so your ISP doesn't see. After extracting, start Tor browser. You can probably accept all defaults. Go to advanced network settings, and select "No proxy". Browse about:config, and toggle both "extensions.torlauncher.start_tor" and "network.proxy.socks_remote_dns" to "false". Then browse [check.torproject.org][13]. You should see "Sorry. You are not using Tor." and your VPN exit IP address.
      
It's true that you can't investigate WebGL and other fingerprinting using Tor browser. If you choose to test using other browsers, you should be very careful. As noted above, all WebGL-capable browsers on a given system will have the same WebGL fingerprint. So you should avoid using the same system with and without a VPN connected. You should also avoid using different VPN services, unless you don't care that the system will be associated with both. Furthermore, if you use VMs, you should not use related operating systems with and without a VPN, or with different VPN services.
      
## Summary
      
Bottom line, here are the key tests, and the results that you should get:

* [IPv6 address test][14]: browser unable to connect
* [IP address test][15]: expected IP addresses with and without VPN connected
* [Geolocation test][16]: browser doesn't support geolocation API
* [Java test][17]: not found, or disabled
* [WebGL test][18]: WebGL blocked by NoScript
* [WebRTC test][19]: not enabled
* [Panopticlick][20]: browser protects from fingerprinting
* [DNS Leak Test (use extended test)][21]: different DNS server(s) with and without VPN connected

 [1]: https://w3c.github.io/fingerprinting-guidance/
 [2]: http://www.eecs.qmul.ac.uk/%7Ehamed/papers/PETS2015VPN.pdf
 [3]: http://whatismyv6.com/
 [4]: https://code.google.com/archive/p/wintee/
 [5]: https://check.torproject.org/
 [6]: https://stackoverflow.com/questions/24906268/ping-with-timestamp
 [7]: https://stackoverflow.com/questions/10679807/how-to-timestamp-every-ping-result
 [8]: https://github.com/adrelanos/VPN-Firewall
 [9]: http://www.hanynet.com/icefloor/
 [10]: https://en.wikipedia.org/wiki/Domain_Name_System
 [11]: http://www.baatkar.com/2015/04/how-to-fake-your-location-in-google.html
 [12]: https://www.torproject.org/download/download
 [13]: https://check.torproject.org/
 [14]: http://ipv6.whatismyv6.com/
 [15]: https://www.browserleaks.com/whois
 [16]: https://www.browserleaks.com/geo
 [17]: https://www.browserleaks.com/java
 [18]: https://www.browserleaks.com/webgl
 [19]: https://www.browserleaks.com/webrtc
 [20]: https://panopticlick.eff.org/
 [21]: https://dnsleaktest.com/
