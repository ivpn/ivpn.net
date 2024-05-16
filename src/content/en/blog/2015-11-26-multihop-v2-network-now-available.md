---
title: Multi-hop v2 network now available
authors: ["Ed Holden"]
categories: ["Releases"]
tags: ["Apps", "Privacy"]
draft: false
date: 2015-11-26T18:30:19+00:00
url: /blog/multihop-v2-network-now-available/
comments:
  - author: Adam vij
    date: 2017-01-02T03:00:06+01:00
    content: |
      I would like to see what you think about:

      <a href="https://airvpn.info/topic/15854-airvpn-must-offer-multi-hop-double-vpn-and-tor-overvpn-in-openvpn-config/?p=52124" rel="nofollow ugc">https://airvpn.info/topic/15854-airvpn-must-offer-multi-hop-double-vpn-and-tor-overvpn-in-openvpn-config/?p=52124</a>

      Since I am considering signing up for IVPN, but your multi-hop seems a bit.. pointless?
  - author: John
    date: 2017-04-21T06:48:22+02:00
    content: |
      i think the multi hop is great and the only reason I will join.
  - author: Micheal
    date: 2018-09-07T09:55:45+02:00
    content: |
      Taking guidance from a blog about <a href="https://www.bestvpnguru.com/best-multi-hop-vpn-chain/" rel="nofollow">Multi Hop VPN</a> and comparing your features with it&#8230;. I think it will be a good idea to join in.. Thanks a lot.
  - author: Oliver
    date: 2020-04-02T17:11:05+02:00
    content: |
      Multi hop is a amazing feature and everyone should try this :)

---
We're extremely excited to launch the much anticipated multi-hop v2 network today. This new network has been built from scratch to offer the highest levels of performance and privacy based on our experience running a VPN network over the last 6 years.

Every server in the network is now both an entry and exit server. When you connect you can choose both where your data will enter into our network and where it will exit providing significantly more flexibility over our existing 3 location setup. Multi-hop is an important privacy  technology as it makes traffic analysis significantly more difficult for adversaries to correlate traffic entering our network with that exiting it. Adversaries would at a minimum require access to the data centers in two different jurisdictions at them same time to identify the source of a connection.

We've invested significant time developing a full mesh network so all connections between servers are direct (unlike a hub and spoke model), thereby ensuring the maximum possible speed whilst relaying traffic through multiple servers. Multi-hop servers are located in different countries so it does however come with the cost of higher latency and lower speeds. Customers should therefor <a href="/privacy-guides/will-a-vpn-protect-me/" target="_blank" rel="noopener noreferrer">carefully consider their threat model</a> when deciding whether it is necessary to use the new multi-hop network over the existing singlehop network which will always be the fastest.

To use the new multi-hop network you can use our <a href="/blog/introducing-the-ivpn-client-v2-4-for-windows-osx/" target="_blank" rel="noopener noreferrer">latest IVPN v2.4 client</a> launching today or any OpenVPN compatible client. When using a non-IVPN client simply append the short name (2 letter country code) of the exit server to your username e.g. if you connect to the UK server with the username **ivpn123456@ro** then your traffic will enter the VPN in the UK and exit in Romania. Of course if you are using the latest IVPN client v2.4 then this configuration is fully transparent.

The DNS servers for multi-hop connections are now positioned in the exit location. Previously if you connected to UK->NL your DNS requests would be resolved by a DNS server based in the location where you connected i.e. the UK. Now your requests will be forwarded through the tunnel to a DNS server in the exit location (in this case NL). This again mitigates the risk of traffic analysis thereby improving your security.

As mentioned in the <a href="/blog/port-forwarding-reservations-now-available/" target="_blank" rel="noopener noreferrer">previous blog update</a>, we now have a reservation based port forwarding system so you can keep the same port number for as long as you want. In addition to port forwarding on the standard singlehop network you can also use port forwarding on the multi-hop network. So if you activate port forwarding and connect to UK->NL, any traffic sent to the server in NL on your assigned port will be forwarded through the VPN to the UK server and then through the VPN to your device.

We hope you're as excited about these developments as we are. If you have any feedback we'd love to hear it - <feedback@ivpn.net>.
