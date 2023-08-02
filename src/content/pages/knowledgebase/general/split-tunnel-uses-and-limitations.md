---
title: Split Tunnel Uses and Limitations - IVPN Help
h1: Split Tunnel Uses and Limitations
url: /knowledgebase/general/split-tunnel-uses-and-limitations/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 590
---
# Split Tunnel Uses and Limitations

The IVPN App's split tunnel feature offers a way to bypass the VPN tunnel for select applications and services e.g. to access video streaming services or for gaming. This is a convenient way to protect your privacy while offering the convenience of accessing content and services that may not be friendly to VPN server IP addresses.

With any convenience, there is often a trade-off. For the split tunnel feature, the trade-off is an intentional leak. The IVPN App has been designed to prevent leaks, so please be aware that these intentional leaks present with the split tunnel feature may include unexpected behaviours. These are detailed below.

**Active Applications and Connections**

The split tunnel feature has an impact on applications and connections that are launched after the split tunnel is activated and the VPN is connected. Applications and connections that were already active before the split tunnel is enabled may still use the VPN connection instead of bypassing it.

For example, after the VPN is connected, when an already-open web browser is added to the split tunnel application list, that web browser will continue to use the VPN tunnel. Restart the web browser to make use of the split tunnel bypass.

Torrents present an interesting example. When the VPN connection is enabled and a torrent client is not part of the split tunnel bypass, all peer connections use the VPN connection. Add the torrent client to the split tunnel list and activate the bypass feature in the IVPN App and existing peer connections will continue to use the VPN while any new peer connections will bypass the VPN. Restart the torrent client to make sure all connections bypass the tunnel (if this is your preference).

Generally, restarting an application after enabling the split tunnel feature will make sure its traffic bypasses the VPN.

**Child Processes**

An application added to the split tunnel list might spawn child processes (additional programs running independently in-support-of or to-provide-extra-features-for the parent application). These child processes will make use of the tunnel based on the status of the parent process in the split tunnel application list.

Valve's Steam client is an example of a parent application that spawns child processes (the games themselves). When the Steam client is in the split tunnel application list, games launched will also make use of the bypass.

Other gaming launchers, like the Epic Games Launcher, may behave in a similar manner. One way to test for certain is to check ping times to gaming servers. Games that bypass the VPN will likely have lower ping times to servers that are geographically close. Games that use the VPN will likely have higher ping times due to the extra hop through the VPN server.

**DNS**

The Domain Name System (DNS) offers a way to turn a network hostname, like [ivpn.net](https://ivpn.net), into an IP address. Network communication relies on IP addresses and hostnames are offered to make accessing network clients easy for humans.

An application that uses the split tunnel feature in the IVPN App will likely rely on the operating system's DNS service, which is likely protected by the IVPN App's VPN connection. DNS queries from a web browser that uses the split tunnel, for example, may appear to come from the VPN server, which may have an impact on accessing some online content. Run a [DNS leak test](https://www.dnsleaktest.com/) to be certain.

Using an application's built-in DNS option, like [Mozilla Firefox's DNS-over-HTTPS feature](https://support.mozilla.org/en-US/kb/firefox-dns-over-https#w_manually-enabling-and-disabling-dns-over-https), offers a way to correct unexpected DNS-related issues.

The IVPN App includes a [Custom DNS](https://www.ivpn.net/knowledgebase/general/custom-dns/) feature that handles DNS requests for all applications on the system, whether they use the VPN tunnel or bypass it via the split tunnel.  Switching to a Custom DNS server in the IVPN App might help with applications that do not behave as expected, though please consider that all requests on the system will use this DNS and not the VPN server's DNS. 

**Multicast and UDP**

Applications designed to receive Multicast or UDP packets might end up dropping incoming packets depending on the local network interface binding and precedence. Testing is likely required to confirm whether an application or service behaves as expected when it is part of the split tunnel list and excluded from the VPN with respect to Multicast and UDP traffic.

**Privacy**

Bypassing the VPN tunnel for some applications and services means that your ISP and any observer can see the actual destination of some of your Internet traffic. The convenience of accessing content or improving a gaming experience is ultimately a choice.

Please consider the privacy implications when adding applications to the IVPN App's split tunnel application list.
