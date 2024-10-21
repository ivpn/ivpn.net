---
title: Self audit your VPN - Pt3. - OpenVPN Configuration and Leaks
author: Solène Rapenne
url: /privacy-guides/self-audit-series-part3/
section: Misc
weight: 12
date: 2024-08-21T12:00:00+00:00
layout: guides-details
articles: [
  {
    title: "Self audit your VPN - Pt1. - Getting started for the series",
    url: "/privacy-guides/self-audit-series-part1/"
  },
  {
    title: "Self audit your VPN - Pt2. - WireGuard Configuration and Leaks",
    url: "/privacy-guides/self-audit-series-part2/"
  },
]
---
This guide is [part of a series](/privacy-guides/self-audit-series-part1/) that will show you how to self-audit a VPN tunnel for data leak.

[Part two](/privacy-guides/self-audit-series-part2/) of the series was about WireGuard. The current guide is the part three and focuses on OpenVPN.

This guide assumes you know the basics of Wireshark, covered in part one. If you need a refresher, please [read part one](/privacy-guides/self-audit-series-part1/) before continuing.

## How to verify if the network traffic is going through your OpenVPN VPN tunnel

This section explains how to identify network traffic that does not pass through the VPN tunnel when it should, such case implies a VPN leak and a potential risk for your privacy. At the same time, you will be able to verify the OpenVPN connection is established with the server of your choice.

The first step is to identify the IP address of the chosen server, protocol and port used by your VPN, you can refer [to the first part](/privacy-guides/self-audit-series-part1/) of the series to learn how to find this information.

Using Wireshark, start capturing the network traffic on the physical interface connected to the Internet. Be careful to not capture the network traffic on the VPN interface otherwise the results will not be useful.

Use the following text into Wireshark display filter input, adapt the variables (written in capital letters): `(ip or ipv6) and not (ip.addr == SERVER_IP and udp.port == SERVER_PORT) and not (icmpv6 or llmnr or dhcp or mdns) and not (ip.host matches ".255$" or ip.addr == 224.0.0.0/4)`. As OpenVPN supports both TCP and UDP, you may need to replace `udp.port` with `tcp.port` depending on the protocol used to connect to the remote VPN server. If obfuscation is in use, V2RAY VMESS/QUIC uses UDP while V2Ray VMESS/TCP and [obfs](https://github.com/Yawning/obfs4/blob/master/doc/obfs4-spec.txt) use TCP.

Here is the filter explained:

* `(ip or ipv6)`: match Internet Protocol (IPv4 and IPv6) packets. This discards other protocols such as [ARP](https://en.wikipedia.org/wiki/Address_Resolution_Protocol) or [Ethernet](https://en.wikipedia.org/wiki/Ethernet) that are not relevant for the current scenario.
* `not (ip.addr == SERVER_IP and udp.port == SERVER_PORT)`:
  * `not`: match the opposite of the condition following it.
  * `ip.addr == SERVER_IP`: matches all packets exchanged with the server with the address SERVER_IP.
  * `udp.port == SERVER_PORT`: matches all packets exchanged on the UDP port SERVER_PORT.
  * The combination of the two will remove all UDP traffic from your VPN server on the VPN port, it hides all the VPN traffic from the display.
* `not (icmpv6 or llmnr or dhcp or mdns)`:
  * `not`: match the opposite of the condition following it.
  * `(icmpv6 or llmnr or dhcp or mdns)`: contains a list of protocols.
  * The combination of the two removes the packets matching any protocol in the list. These protocols are not meant to be routed to the Internet and will not be carried over the VPN, so we filter them to not appear as false positives.
* `not (ip.host matches ".255$" or ip.addr == 224.0.0.0/4)`:
  * `not`: match the opposite of the condition following it.
  * `ip.host matches ".255$"`: matches all IP addresses ending with `255`, those are [multicast addresses](https://en.wikipedia.org/wiki/Multicast_address).
  * `ip.addr == 224.0.0.0/4`: matches [IPv4 broadcast](https://en.wikipedia.org/wiki/Broadcast_address#IP_networking) traffic.
  * The combination of the two removes all broadcast and multicast packets, they are not useful because they are not meant to be tunneled through a VPN, so we filter them to not appear as false positives.

This display filter restricts the display content to IP traffic that is not from your VPN, it excludes a certain number of packets that are not routable.

Ideally, with this filter, you should not have lines in the Wireshark packet list (main display). If a line appears in the list, ask yourself the following questions:

* Is the VPN disconnected and my firewall not blocking non-VPN traffic?
* Is this local network traffic? If both the source and destination IP belong to your LAN, it is LAN traffic and does not belong to a VPN tunnel.
* Does it occur regularly? If so, close all the programs on your computer and check if you see it again. If not, start the programs one by one until you see the pattern again, one of them may be bound to a configured network interface and bypass the VPN routing rules.
* What protocol is it? Is it expected? At this point, you will need to understand exactly what happens on your system.
* Are there multiple connected VPNs on my system? You may be auditing the one that is encapsulated in another VPN.
* Are SERVER_IP and SERVER_PORT correct?

To illustrate this filter, here is a screenshot of Wireshark showing packets that did not go through a VPN. The first line corresponds to my computer LAN IP `10.137.0.30` querying `9.9.9.9` DNS server about the domain `eff.org`. On the second line, the server `9.9.9.9` is replying to my computer with the query answer.

![Wireshark screenshot](/img/capture_wg_restricted.png)

## How to verify your system firewall effectiveness

In this scenario, you will learn how to ensure the system firewall is working effectively and blocking all traffic when the VPN is not connected.

In order to check the firewall, you will monitor the network transmitted from your computer to the Internet while the VPN is disconnected. If the firewall is properly configured, there should not be any [data egress](https://aviatrix.com/learn-center/cloud-security/egress-and-ingress/).

For this scenario, you need to find the IP of your computer on the local network, most of the time it looks like `192.168.y.x`.

If you do not know how to find your computer local network IP, here are guides explaining how to do so:

* [On Microsoft Windows](https://support.microsoft.com/en-us/windows/find-your-ip-address-in-windows-f21a9bbc-c582-55cd-35e0-73431160a1b9)
* [On Apple macOS](https://www.wikihow.com/Find-Your-IP-Address-on-a-Mac)
* [On Linux](https://www.addictivetips.com/ubuntu-linux-tips/find-ip-address-on-linux/)

**Disconnect the VPN** and make sure your firewall is enabled before continuing.

In Wireshark, start the capture on the non-VPN network interface and use the following display filter: `ip and ip.src == YOUR_LAN_IP`. This filter will limit the display to IP packets that correspond to your computer IP source address.

If you use IPv6, you need a different filter which must include all your IPv6 addresses in addition to your IPv4 address: `(ip or ipv6) and (ip.src == YOUR_LAN_IPV4 or ipv6.src == YOUR_LAN_IPV6 or ipv6.src == YOUR_PUBLIC_IPV6) and not icmpv6`. This filter will limit the display to IPv4 and IPv6 packets whose source is one of your IPs, and hide the ICMPv6 protocol generating a lot of local traffic.

While the capture is running, run programs needing a network connection like a web browser, email client or instant messaging software. They should not work and there should be no displayed lines in Wireshark either.

Now, if you establish the VPN connection, you should not see any change in the Wireshark display.

If you have lines displayed, this could mean that:

* the source IP may be allowed by the firewall
* your system firewall is misconfigured
* your VPN app software (if any) configuring the firewall is misconfigured

If you use the app of your VPN provider, you may see traffic related to the provider API, the app may have a setting to block this traffic. For instance, IVPN users may see network packets addressed to `198.50.177.220` or `2607:5300:203:1735::8` which are the addresses of the server `api.ivpn.net` (as of August 2024). By default, the IVPN app allows traffic to IVPN servers, but this behavior can be disabled in the app firewall settings.

## How to verify obfuscation is enabled

In this scenario, you will learn how to verify that obfuscation [V2Ray](https://www.v2ray.com/en/) or [obfs](https://2019.www.torproject.org/docs/pluggable-transports) are working effectively. Obfuscation algorithms such as V2Ray can disguise OpenVPN packets as [QUIC](https://en.wikipedia.org/wiki/QUIC) or HTTP traffic, making it appearing as a legitimate non-VPN traffic, even when observing it with [deep packet inspection](https://en.wikipedia.org/wiki/Deep_content_inspection) (DPI). On the other hand, obfs obfuscation dynamically adjusts the timing and size of encrypted data packets, producing a seemingly random traffic pattern.

These obfuscation methods have a performance penalty and should only be used when you are not able to connect using a genuine OpenVPN tunnel.

The first step to verify if obfuscation is effective is to identify the IP address of the chosen server, you can refer to [the first part of the series](/privacy-guides/self-audit-series-part1/#identify-the-vpn-server-ip) to learn how to proceed. IVPN users connecting with V2RAY will need to find the server public IP in the API since V2Ray is exposed on a separate IP.

### V2Ray obfuscation (VMESS/QUIC)

Start the network traffic capture in Wireshark before enabling the VPN, then use the following filter: `ip.addr == SERVER_IP and udp.port == SERVER_PORT`. Replace `SERVER_IP` and `SERVER_PORT` by your VPN server connection information.

This filter restricts the capture display to the packets exchanged with the VPN server. From there, you need to configure Wireshark to force decode packets using the QUIC protocol and see if it succeeds. In Wireshark, if the packets appear of protocol "QUIC" and the values in the column "Notes" are not all "Protected payload", it means obfuscation is working.

The method to configure Wireshark to decode the packets as QUIC is explained in the [first part of the series](/privacy-guides/self-audit-series-part1/#force-wireshark-to-decode-packets-using-a-given-protocol).

In Wireshark packets list, if the column "Info" displays "Protected Payload" for all packets, this indicates the packets can not be decoded as QUIC successfuly. But if you see most packets have the text "Retry" it means you are looking at QUIC packets and obfuscation is working.

Further verification can be done by looking at the protocol details on a packet, either at the bottom of the display or in a popup window by double-clicking on a packet.

A QUIC packet should look like the following picture, within "QUIC Connection information" there are some source and destination information.

![](/img/self-audit-quic-is-quic.png)

If the packet is an OpenVPN packet, there will be no QUIC information.

![](/img/self-audit-wg-is-quic.png)

If you have no packet in the list, either OpenVPN is configured to use TCP, or the VPN is not connected.

### V2Ray obfuscation (VMESS/TCP)

Start the network traffic capture with Wireshark before enabling the VPN, then use the following filter: `ip.addr == SERVER_IP and tcp.port == SERVER_PORT and http`, replace SERVER_IP and SERVER_PORT by your VPN server connection information.

This filter restricts the capture display to HTTP packets exchanged with the VPN server.

Now, right-click on a result line, choose **Follow** → **TCP Stream**, this will open a popup window showing the content of all the packets of this TCP session. As this is a plain text HTTP connection, you should see readable text at the top of the data. It should look roughly like the example below (exact format will depend on the obfuscation implementation):

```
GET / HTTP/1.1
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: www.inet-telecom.com
Pragma: no-cache
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36
```

The data below this is binary data containing the real OpenVPN traffic.

The fact that you exchange HTTP data with the VPN server on the VPN port shows that the obfuscation is working effectively.

### obfs obfuscation

Obfuscation done with obfs can not be directly identified using deep packet inspection. Obfs obfuscation effectively hides traffic, making it look like random internet data. On the other hand, V2Ray disguises traffic by masking it as common protocols.

It is possible to leverage this randomness to guess obfs traffic using DPI.

#### obfs detection explained

Here is a simple method using packet capture to guess if a network traffic is using obfs.

If the packets of a network capture meet all the following criteria, there is a high chance your VPN is using obfs:

1. The packets are used to tunnel your network traffic.
2. The TCP protocol is used.
3. The packets are exchanged with your VPN provider server.
4. The packets do not contain plain text data.
5. The packets can not be classified as OpenVPN or SSH traffic.

This first criteria is crucial, as it eliminates all protocols that are not commonly used for traffic tunneling. Without this, detecting obfuscation with DPI becomes significantly more challenging, especially without prior knowledge of the network traffic. Although, in a [blog post about blocking obfs bridges](https://www.hackerfactor.com/blog/index.php?/archives/889-Tor-0day-Burning-Bridges.html), a cybersecurity expert explains that identifying obfs is possible using DPI, even in a [black box environment](https://qualysec.com/black-box-penetration-testing/).

#### Detecting obfs with Wireshark

Start the network traffic capture with Wireshark before enabling the VPN, then use the following filter: `ip.addr == SERVER_IP and tcp`, replace `SERVER_IP` by your VPN server connection information.

If Wireshark shows packets, it means you connected to the server using a TCP protocol.

Verify if the packets contain clear text data: right-click on a result line, choose **Follow** → **TCP Stream**, a popup window will open, showing the content of all the packets of this TCP session. If you can distinguish words in the display (you do not need to read through all the data), this mean the content is not encrypted nor random and therefore the stream is not using obfs. On the other hand, if you can not find readable text, the content is encrypted and you can continue your investigation.

As traffic is encrypted, you need to try to decode (as explained in the [first part of the series](/privacy-guides/self-audit-series-part1/#force-wireshark-to-decode-packets-using-a-given-protocol)) the packets using different protocols to see if one matches. First, try using the OpenVPN protocol and see if Wireshark can identify it, if there is no result, try the SSH and TLS (may appear as "SSL") protocols. If Wireshark can not identify any of the previous protocols, it is likely the tunnel is obfuscated using obfs.

In case your VPN provider publishes information related to its obfs implementation, you could use it to verify if your finding is correct. For instance, [IVPN API](https://api.ivpn.net/v5/servers.json) announces the TCP port of each VPN server dedicated for obfs.

## How to verify the OpenVPN tunnel is using perfect forward secrecy?

In this scenario, you will learn how to verify that your OpenVPN VPN is connected using [perfect forward secrecy](https://en.wikipedia.org/wiki/Forward_secrecy) (PFS).

The PFS information can be obtained from the TLS negotiation stage, when OpenVPN connects to the VPN server. During this negotiation, the client and server both agree on the cipher suite to use for the tunnel lifetime.

TLS 1.3 inherently provides PFS, eliminating the need for further validation. However, when using TLS 1.2, ensure the selected cipher suite employs Diffie-Hellman (DH) key exchange to achieve PFS.

If your VPN provider is using the OpenVPN option `tls-crypt` it will not be possible to analyze the TLS negotiation as it is encrypted, however, as we will demonstrate later in this guide, it is possible to read the OpenVPN logs.

You only need to capture the first packets used when the VPN is establishing. In order to proceed, make sure the VPN is not connected and start the capture on Wireshark, then connect to the OpenVPN server. You can stop the capture after a few seconds.

Use the following filter: `ip.addr == SERVER_IP and tcp.port == SERVER_PORT`, replace `SERVER_IP` and `SERVER_PORT` by your VPN server connection information.

This filter restricts the capture display to the packets exchanged with the VPN server. From there, you need to configure Wireshark to force decode packets using the OpenVPN protocol and see if it succeeds.

The method to configure Wireshark to decode the packets as OpenVPN is explained in the [first part of the series](/privacy-guides/self-audit-series-part1/#force-wireshark-to-decode-packets-using-a-given-protocol).

In Wireshark packet list, if you find in the column "Protocols" values like "OpenVPN" and "TLS", it means the TLS negotiation capture worked. But if there are packets with the protocol "SSL" and the "Infos" column contains the text `Continuation Data`, it means `tls-crypt` is in use. In that case, you can still use the OpenVPN logs to determine if PFS is enabled as explained in the next section.

If there is a TLS negotiation in the capture, add `and tls.handshake` to the current Wireshark display filter to only display packets related to the TLS negotiation between the OpenVPN client and the VPN server. With this new filter, you should only see a couple of entries in the packet list. In the column "Info", find a packet with the text `Client Key Exchange, Change Cipher Spec`. Click on it to expand its TLS related information about `Client Key Exchange` until you find an entry about Diffie-Hellman parameters. There is a detailed screenshot below showing the results. If the TLS negotiation contains Diffie-Hellman parameters, PFS is effective.

![Wireshark showing the cipher suite accepted by the remote VPN server](/img/self-audit-part3-dh-params.png)

## Using OpenVPN logs

If your VPN provider uses `tls-crypt`, the only way you can verify if PFS is enabled is to check at OpenVPN logging information.

In the log file, search the text `Control Channel:` and check the TLS version number:

* If you find `TLSv1.3`, PFS is enabled because it is a requirement defined by TLS version 1.3 specifications.
* If you find `TLSv1.2`, look at the cipher suite in the same line. A cipher suite looks like a few acronyms tied together with a dash character (i.e. `DHE-RSA-AES256-GCM-SHA384`). If it contains `DHE` or `ECDHE`, this indicates PFS was used to establish the session.

## Decrypt the tunnel traffic with Wireshark

If you want to verify the network traffic passing through the OpenVPN tunnel, you do not need to decrypt the tunnel as you can use Wireshark directly on the VPN network interface.

It is possible to use Wireshark to decrypt the OpenVPN tunnel network traffic in real time, given you have to cryptographic key used by the TLS session. To date, there are no straightforward methods to obtain the key, although [a recent paper published in 2024](https://hal.science/hal-04446027/document) explains how the research team successfully extracted the keys of TLS sessions on a Linux system. The implementation used within the paper is [provided as open source](https://github.com/eurecom-s3/x-ray-tls).
