---
title: Why use Tor with a VPN service?
author: Ed Holden
url: /privacy-guides/why-use-tor-with-a-vpn-service/
section: Basic
weight: 80
articles: [
  {
    title: "Will a VPN Protect Me? Defining Your Threat Model",
    url: "/privacy-guides/will-a-vpn-protect-me/"
  },
  {
    title: "An Introduction to Privacy & Anonymity",
    url: "privacy-guides/an-introduction-to-privacy-anonymity/"
  },
]
date: 2018-10-25T13:55:43+00:00
layout: guides-details
---
## Introduction

The [Tor network][1] has been a useful tool for the privacy-aware internet users since 2002. While it has shown itself to be an invaluable tool in protecting one's privacy through anonymity, it is anything but a panacea. Today we are going to examine two of the known vulnerabilities in the Tor system and then see how using a trustworthy VPN service in conjunction with Tor can mitigate many of those vulnerabilities thus substantially reducing your privacy risk surface.

> Note: While Tor is decentralized and designed in a way that you don't have to trust a single entity, most VPN services are run by centralized organizations. This article assumes you have picked a VPN service after carefully vetting them and you trust its operators to honor no-logs promises. 
> See our guide on vetting VPN providers [here](https://www.ivpn.net/privacy-guides/18-questions-to-ask-your-vpn-service-provider/).  
> For an in-depth guide on using Tor with a VPN see [Advanced Privacy and Anonymity - Part 3](https://www.ivpn.net/privacy-guides/advanced-privacy-and-anonymity-part-3/). 


The first vulnerability we are going to examine is the scenario where the attacker is passively monitoring the connection of both the sender and recipient. For simplicity's sake, we will be using the common cryptographic archetypes of Alice and Bob et. al. If you are not familiar with these characters see the [wikipedia entry][2]. Additionally, we will be assuming that you have basic knowledge of how the Tor network functions.

## Scenario A 

In this first scenario, Alice is connecting to Bob's server over the Tor network. Additionally, Eve is positioned to passively monitor traffic coming both from Alice and to Bob. This is a scenario we know already exists at both the individual ISP level and at the level of major backbone interconnects through government access. It has been demonstrated since 2002 that Eve can [correlate traffic](https://www.onion-router.net/Publications/locating-hidden-servers.pdf) between Alice and Bob with a degree of accuracy that completely eliminates false positives. Further, this attack does not necessitate physical-level access to both Alice and Bob's individual networks. Because the Tor network allows anyone to run an end node, Mallory could simply have physical access to Alice's network and then run an end node herself. On the occasions when Alice's traffic is exiting the tor network from Mallory's end node (without regard to the locations and number of intermediate hops), there would be a functional replacement for the need to have physical access to Bob's network, as all traffic from Alice to Bob would pass through Mallory's node with all the intermediate encryption stripped off (assuming that Bob's server did not support end-to-end encryption, of course).

By using a VPN service that has a high enough Tor traffic volume, the ability of Eve or Mallory to correlate Alice and Bob's traffic is severely hindered. This ability could be further reduced if Alice were to concurrently generate traffic over the VPN connection to multiple Tor sites along with non-Tor traffic. Essentially what this accomplishes is padding Alice's connection to the VPN server with sufficient extra data that correlation becomes even more difficult.

## Scenario B

The second vulnerability to examine is referred to as the ['bad apple'](https://arxiv.org/abs/1103.1518) attack. Here, we will assume that Alice and Bob are communicating via bittorrent. Mallory injects traffic that triggers Alice to make a UDP connection to Mallory's server. By taking advantage of the fact that Tor only provides a secure TCP connection, Alice is then tricked into revealing her actual identity. By properly configuring one's VPN connection to tunnel all traffic and by applying the other padding strategies above, Alice is no longer vulnerable to this attack.

One of the most important features one should look for when shopping for VPN services is variable multi-hop capabilities. Here, one has the opportunity to bounce his encrypted traffic across multiple networks and jurisdictions, further reducing the possibility that traffic-analysis based attacks would be successful. Additionally, when needed, one can quickly choose a different multi-hop path for his traffic. Remember that in analysis attacks, padding is your friend and each individual encryption wrapper provides additional padding that can confound Mallory's attempts to correlate traffic.



 [1]: https://www.torproject.org/
 [2]: http://en.wikipedia.org/wiki/Alice_and_Bob
