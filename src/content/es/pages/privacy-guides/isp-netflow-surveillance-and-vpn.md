---
title: Can ISPs NetFlow data be used to track traffic going through VPNs?
author: Solène Rapenne
url: /privacy-guides/isp-netflow-surveillance-and-vpn/
section: Basic
weight: 10
date: 2024-01-08T00:00:00+00:00
update: 2024-01-29T00:00:00+00:00
layout: guides-details
articles: [
  {
    title: "What is a VPN?",
    url: "/privacy-guides/what-is-a-vpn/"
  },
  {
    title: "Will a VPN Protect Me? Defining Your Threat Model",
    url: "/privacy-guides/will-a-vpn-protect-me/"
  },
  {
    title: "Tor vs I2P",
    url: "/privacy-guides/an-introduction-to-tor-vs-i2p/"
  }
]
---
## Introduction

This privacy guide will help you understand what information your [Internet Service Provider][isp] (ISP) can view regarding your network activity and the implications if you are using a [Virtual Private Network][what_is] (VPN). In fact, many ISPs utilize [NetFlow][netflow], a protocol developed by [Cisco][cisco], to store the data concerning the traffic they route throughout the day.

NetFlow allows the storage and efficient processing of network information including:

- Date and Time with millisecond resolution
- Source [IP][ip] address
- Destination [IP][ip] address
- IP protocol number (most common protocols are [TCP][tcp] and [UDP][udp])
- Source port
- Destination port
- IP field "[Type of Service][ToS]"

A NetFlow dataset does not include any [packets capture][pcap] data, it simply presents a list of the routing information, including the source and destination's addresses and ports, and when the routing occurred.

## Is a VPN vulnerable to NetFlow analysis?

As you may be aware, a VPN creates an encapsulated connection between your VPN client and the VPN server. All the [network traffic][network] between these two machines travels over the Internet in encrypted form, and your ISP can't use classic techniques such as [Deep Packet Inspection][dpi] for snooping the VPN content.

Nonetheless, it's crucial to note that, besides the encrypted data, your ISP obtains a lot of information about your VPN from the NetFlow data. As the VPN service providers IP ranges are well known, your ISP can easily figure you are using a VPN, in addition to knowing the time you connect, the amount of data you transfer over the VPN and the location of the remote VPN server.

Although this information may seem insignificant, it can be exploited. For instance, it's easy to determine your computer time habits, and potentially the number of people in your house, and how people consume the Internet.

Please note that it's impossible to hide your network activity from your ISP, as they are the ones who provide your connection to remote servers, but if you use a VPN, your ISP will only see a single encrypted connection.

## Internet is a giant puzzle

The Internet could be compared to a vast puzzle composed of many pieces, each representing an ISP. Every ISP has knowledge of its own part of the puzzle and the connections to other pieces.

If your VPN service provider is located in a different part of the puzzle than your own ISP, this means that your actions through the VPN cannot be accurately determined by your ISP. Similarly, the ISP of the VPN server has no way of identifying you using only your IP address, they would need to collaborate with your ISP to identify you.

![](/img/diagram-vpn-transit.png)

## Worldwide NetFlow database

Unfortunately, a 2022 [article from Vice][Augury] has reveled that a US-based private company has been collecting NetFlow exports from many ISPs worldwide in exchange for Threat Intelligence analysis. The number of involved ISPs suggests that, from the article, it may represent roughly ninety percent of the global Internet traffic. Information about [Team Cymru][cymru], the company that sells access to the consolidated NetFlows database, remains limited. It was found that their website contains a list of [facts and myths][cymru_facts] about their services, though their claims cannot be verified. Nevertheless, it is evident that they are working on NetFlow aggregation.

Using the puzzle analogy again, Team Cymru has access to most of the puzzle pieces. While a single piece doesn't hold enough information in the context of using a VPN, having many of them could potentially expose your Internet usage **if they receive NetFlow exports from both your ISP and your VPN provider ISP**. For example, traffic correlation using the packets timing becomes a lot easier when you know the delay between the user and their VPN provider acting as a proxy.

In 2024, the NSA [stated to a senator][senate] that they were buying NetFlow exports from ISPs as long as it involves traffic to or from the United States.

### NetFlow and anonymization

It is not possible to say which ISP shares their NetFlow data.

For European based ISPs, the [GDPR][gdpr] compliance dictates that personal data should not be shared. It is not our place to discuss if NetFlow datasets qualify as are personal data, but GDPR compliance implies that ISPs must not permit any third party to associate a NetFlow export with personal information such as names, addresses or, phone numbers.

Two possibilities exist regarding NetFlow exports:

1. ISPs sharing anonymized NetFlow datasets.
2. ISPs sharing customer information.

In the first case, the network activity for a VPN user would appear as follows: [anonymous IP A] connected to [anonymous IP B] web server on [date] via a VPN of type [protocol] on [anonymous IP C].

In the second case, the network activity would be much more specific: [identified person A] connected to [identified company B]'s web server on [date] through a VPN of type [protocol] on [identified company C].

## Possible mitigation

With someone able to view most of the global Internet traffic, as previously mentioned, a VPN alone would be insufficient to protect your privacy. Does it render VPNs useless? VPNs are effective at protecting against data snooping while using public networks, bypassing firewalls or preventing your ISP to know what you use Internet for, but its efficacy can be limited against a state-level actor.

In the worst case scenario of a NetFlow analysis, the data passing through the VPN remains encrypted and unusable, but it may be possible to reveal to which servers you connected, the protocol you used (HTTPS, emails etc.) and maybe infer visited websites.

However, using a VPN service offering multiple hops passing through different countries/ISPs can still protect your privacy, but only if the ISPs do not all share their NetFlow data. In order to increase the NetFlow analysis resistance, at the cost of both higher latency and reduced bandwidth, it's possible to chain multiple VPNs from different VPN providers, but at the condition that the VPN providers are trustworthy and that their servers aren't all part of the NetFlow exports.

To protect your privacy efficiently, it's important that you [define your threat model][threat_model] and check if it suits your needs.

An alternative mitigation would be to use the [I2P protocol][i2p_wiki], although its usage is a bit restrictive, [contrary to Tor][tor_vs_i2p]. I2P is intended to be used as a "network layer on top of the Internet", rather than a substitute for a VPN. For more information, visit the [official project website][i2p].

A more realistic mitigation would be the use of a [mix network](https://www.ivpn.net/privacy-guides/adversaries-and-anonymity-systems-the-basics/#anonymity-systems), but as of the time of writing, they are complicated to use and require blockchain tokens to work, which is a challenge to buy anonymously. We also lack feedback about their efficiency in a real world usage.

## Exercise: monitor your own network activity

For our readers with some network skills, here is a simple experiment to understand what your ISP can observe from your VPN usage. You can assess your own VPN activity by monitoring the network traffic on your local VPN interface using software such as [Wireshark][wireshark] (a graphical tool), [ntopng][ntopng] (web-based, mostly used on routers) or [tcpdump][tcpdump] (a command line tool). These software are available on most operating systems (Windows, macOS, Linux, Android, dd-wrt, *BSD), however their usage is not within the scope of this guide.

[isp]: https://en.wikipedia.org/wiki/Internet_service_provider
[netflow]: https://en.wikipedia.org/wiki/NetFlow
[network]: https://en.wikipedia.org/wiki/Network_traffic
[dpi]: https://www.fortinet.com/resources/cyberglossary/dpi-deep-packet-inspection
[wireshark]: https://www.wireshark.org/
[tcpdump]: https://en.wikipedia.org/wiki/Tcpdump
[ntopng]: https://www.ntop.org/products/traffic-analysis/ntop/
[tcp]: https://en.wikipedia.org/wiki/Transmission_Control_Protocol
[udp]: https://en.wikipedia.org/wiki/User_Datagram_Protocol
[ip]: https://en.wikipedia.org/wiki/IP_address
[ToS]: https://en.wikipedia.org/wiki/Type_of_service
[Augury]: https://www.vice.com/en/article/y3pnkw/us-military-bought-mass-monitoring-augury-team-cymru-browsing-email-data
[pcap]: https://en.wikipedia.org/wiki/Pcap
[i2p_wiki]: https://en.wikipedia.org/wiki/I2P
[i2p]: https://geti2p.net/en/about/intro
[tor_vs_i2p]: https://www.ivpn.net/privacy-guides/an-introduction-to-tor-vs-i2p/
[cisco]: https://www.cisco.com/
[cymru]: https://www.team-cymru.com/
[what_is]: https://www.ivpn.net/privacy-guides/what-is-a-vpn/
[threat_model]: https://www.ivpn.net/privacy-guides/will-a-vpn-protect-me/
[cymru_facts]: https://www.team-cymru.com/post/team-cymru-myth-vs-fact
[gdpr]: https://en.wikipedia.org/wiki/General_Data_Protection_Regulation
[senate]: https://www.wyden.senate.gov/news/press-releases/wyden-releases-documents-confirming-the-nsa-buys-americans-internet-browsing-records-calls-on-intelligence-community-to-stop-buying-us-data-obtained-unlawfully-from-data-brokers-violating-recent-ftc-order
