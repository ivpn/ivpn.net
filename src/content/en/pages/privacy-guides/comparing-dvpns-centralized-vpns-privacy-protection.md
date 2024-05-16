---
title: "Comparing dVPNs and centralized VPNs for privacy protection"
author: Viktor Vecsei
url: /privacy-guides/comparing-dvpns-centralized-vpns-privacy-protection/
section: Basic
weight: 10
articles: [
  {
    title: "18 Questions to ask your VPN Service provider",
    url: "privacy-guides/18-questions-to-ask-your-vpn-service-provider/"
  },
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 1",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-1/"
  },
  {
    title: "How to perform a VPN leak test",
    url: "/privacy-guides/how-to-perform-a-vpn-leak-test/"
  }
]
date: 2021-02-11T06:33:33+00:00
layout: guides-details
---

This introductory guide compares two type of VPN services: a legacy model built by centralized businesses, and distributed VPNs that have come to the market recently with a goal of disrupting it.
As we have covered in earlier [blog posts][1] and [guides][2] the most important reason to use a VPN service from a privacy perspective is to obscure your internet traffic and browsing history from your ISP. Internet service providers and mobile network operators are incentivized to log, analyze, reuse and [sell this information][3], and/or are bound by data retention [requirements from governments][4]. Routing your traffic through a VPN on untrusted networks and masking your IP when accessing websites and services can offer further privacy benefits.

Most commercial, centralized VPNs are designed to fulfil these use cases, and they are fit for purpose if (and only if) you trust your VPN provider more than your ISP. A recent wave of blockchain based projects promise to improve on the centralized VPN model by offering better transparency, multi-hop functionality, distributed nodes to connect to and pay-per-use compensation models. In this post we take a deeper look at both approaches to evaluate their pros and cons. The aim of this writeup is to help you decide if going with a decentralized solution makes sense for you.

### What is not addressed in this guide?
Commercial VPN services and other tools that shift your IP location and encrypt your traffic have other use cases besides privacy protection and evading dragnet surveillance. Chief among these are enabling connection to websites and services that are blocked by censorship or a firewall. Another benefit is the ability to unlock streaming content restricted to one geographical area. In these scenarios a decentralized VPN might do well, or perform better than a centralized service. This post focuses on the privacy protection aspects of VPNs. 

### Introduction to dVPNs
dVPNs use blockchain technology to operate a network of distributed nodes to connect to, and aim to improve on VPN service design in [other ways][5]. Current solutions promise proven inability for centralized logging, distribution of trust without one entity making decisions, and more fair payment systems. They aim for these improvements and highlight them as selling points while [promising to deliver][6] the same benefits as a centralized VPN service.

When evaluating dVPNs, we consider the follow criteria as a baseline implementation:
1. Traffic encryption between end points using the latest, verifiable cryptographic standards and protocols
2. Many (ideally thousands of) nodes available for connections, not controlled by the same/small number of entities
3. After connecting, traffic goes through at least three nodes - entry, relay and exit peers acting in coordination for their VPN traffic routing. An ideal dVPN setup mirrors [Tor's implementation][7], where the entry server you connect to knows who you are (IP address), but not what you do, since your traffic is encrypted and passed on to the next peer. The relay server(s) have no information about data source and its content. The exit server receives the encrypted traffic, decrypts it and routes it to the destination, knowing what you do, but not who you are. Having this three node implementation as a baseline is important for future evaluations, as it's a necessary to deliver on the promise of 'no logging is possible due to decentralized network design'.

For the sake of comparison, we assume solutions meeting the above criteria are available on the market. In the upcoming sections we will discuss whether this assertion is true. 

As a starting point, we will discuss the characteristics of a good VPN service for privacy protection, taking the properties we recommend people to look at when picking a solution. These are, in rough order of importance:

### 1. Trust

When picking a centralized VPN a key consideration is whether you can trust those running the service. Do they operate transparently with declared ownership? Do they have a long track record of doing their job without any problems and slip-ups? Do they have clear policies and legal guidelines to protect customers from undue scrutiny? These questions are important, as the answers will decide the trustworthiness of the service. This trust is required as you won’t be able to monitor with total certainty what the company is doing with the data you are passing on to them. If you can’t trust the operators of centralised VPN service, you should not use their product.

The lack of need to trust one entity is one of the selling points of dVPNS. While this idea has merits due to their infrastructure design with no centralized entity capable of logging, your data does pass through one or more nodes in the system that are operated by companies or individuals that might be untrustworthy. They can observe the source and content of your traffic, or both, depending on their position in the network. The issue is that while the design of the most popular dVPNs (Orchid, Sentinel, Mysterium) rely on the multi-hop model described earlier for distributed trust, current implementation of these services default to direct connection to one node. In this setup you rely on a single node; most services don’t even offer multi-hop functionality. 

With a single node acting as an entry and exit node, you need to know and trust its operator to not log your activities. Exit nodes can use the decrypted data for observation, identification and correlation attacks in cooperation with other entities. The Tor network, where your connection is routed through four nodes, suffer from unknown actors running [hundreds of malicious relays][8]. These potential drawbacks are even more prominent if a distributed network has many nodes, but a low number of users connecting to them. Crowding effects due to VPN users sharing the same exit IP make identification [more difficult][9]. Some dVPNs attempt to solve the issue of malicious nodes by routing your traffic to a new node with each new initiated connection, or by connecting to multiple nodes for [different requests][10]. Another approach to improve node trust, used by Orchid, is to enable and curate lists of "trusted nodes", but in that case you either need to vet nodes yourself, or outsource the assessment to a [third party][11]. The latter is not dissimilar to the trust you have to put into a centralized provider ‘curating’ their own list of servers after vetting infrastructure partners. 

Regarding trust, we can conclude the design of dVPN infrastructure can provide a setup where trust in a centralized entity is not required, which would make it a better choice than centralized VPNs. On the other hand, dVPN exit node operators have the ability to keep detailed logs of your activities, which makes current implementations of the concept sub-par. Specifically with one-node setups, your IP address and unencrypted data is available for observation. In contrast, server hosting providers for centralized VPNs (ideally) don’t have direct access to data stored on servers, and thus cannot simply start monitoring connection and user activity. However, if they have physical access to the servers, with sufficient motivation and resources they can get access to the data.

Since all dVPN providers we have looked at (Orchid, Sentinel, Mysterium and Deeper) default to a one-hop connection as of February 2022, we can state dVPNs are currently not better choices from trust perspective. Some providers go as far as promising ["hiding your IP from everyone"][12], which is a misconception.


### 2. Sound technical implementation

No matter how much you trust the operators of a centralized service, if their competence does not meet the requirements to run a VPN your privacy will be at risk. Implementation and upgrade of proven VPN protocols and standards are important criteria to evaluate against. We consider the minimum to be OpenVPN with SHA-256 authentication, RSA-2048 handshakes or better, AES-256 ciphers, or implementation of WireGuard, along with added [perfect forward secrecy][13]. Certainty around backend and infrastructure design that ensures no activity logging is critical. Centralized VPNs often fall short in demonstrating whether this condition is met; open sourced applications, regular audits and pentest reports are positive signals. Audits, however, are just a snapshot in time, and there is no way to verify the running code of a centralized service. This is where step 1. comes into play: you need sufficient trust towards the service.

For decentralized VPNs soundness of implementation can be verified by you or an analyst you trust. dVPNs default to transparency, come with open source code and [open infrastructure design][5]. You can check against the claims of no system-wide logging or backdoors existing in the network, which makes the node behavior the only remaining aspect of the service you can't verify. Analyzing specific services is beyond the scope of this guide, we assume that years after launching there are services that deliver on their promises without obvious security flaws. As always, do your own research before using a service.

### 3. Stability and Speed

For centralized providers, stability comes from proper infrastructure design and fast resolution of networking issues in tandem with hosting providers that house their servers. Availability and uptime depend on these factors. You can only rely on the past performance of the network to judge whether it provides you with the level of resilience you need.
Speed is another an important consideration - centralized VPNs that don't oversell their services can achieve minimal drops in speed even on a gigabit connection for customers located close to one of the server locations. This is a high bar, and many providers onboard too many users, creating a supply problem for capacity. If you choose to go with centralized services, it is a good idea to test multiple VPN providers for stability and speed before long-term commitments.

In a decentralized network if one or even a large number of nodes go down your traffic is routed through different ones. This means that a well-designed dVPN network cannot be taken down as long as there are available nodes. The stability of the service with a working-as-intended decentralized infrastructure with a high number of available nodes could only be compromised because of issues with the application you use to interface with the network.

Using the three-hop, ideal setup as a starting point for assessing speed, a degradation of speed is inevitable due to packets having to travel in different physical locations. Tor suffers from a similar user experience problem and speed issues are often cited in [assessments of the network][14]. Further, most dVPNs utilise residential nodes, often end-users in their networks, to act as peers. Bandwidth for retail customers [is improving][15], but limited compared to what professional infrastructure providers can offer to centralized VPN nodes. This is one potential reason why dVPN providers currently default to one-hop setups in their apps to improve usability and speed, even though they undermine the distributed trust promise in the process. One provider mitigates the issue by admitting that '10mbps to 40mbps' is the realistically achievable [average speed][16], while others partner with VPN services to act as exit (or single) nodes to [improve on this aspect][17].
We can conclude that for speed, a centralized VPN has a good chance to win out against dVPNs. Making a similar comparison between a multi-hop setup of a centralized VPN and a three-hop dVPN is less straightforward. We can also argue that a centralized, capable provider who controls the servers in hand-picked location can better optimize for speed; results will vary based on your location, infrastructure and network conditions. In terms of resilience, in theory, dVPNs should perform better with regards to downtime and network-wide failures.

### 4. Price

Most commercial VPN services use a monthly/yearly recurring payment model. Some have flat pricing, some use discounts, but most get users to pay an annual fee. Such an approach can put customers with intermittent use or short-term plans at a disadvantage, having to overpay for a service they don't utilize or don't wish to commit to long term. Recurring subscriptions can also result in renewal payments for unused services that are not noticed.

Decentralized providers, to improve fairness use a "pay per use" method, which, for most services is  heavily subsidised to be free or cheap. While we can find examples of this model getting adopted in the ‘meatspace', such as with gas pumps and calling cards, we suggest that the actual usability for a VPN service is subpar and unlikely to be an improvement over recurring subscriptions. Most customers don't know how much traffic they need, and rather not spend time topping up regularly. Having said that, if providers can nail better usability for purchases, this approach can result in fair pricing for customers. 

One potential improvement over the centralized VPN model is the lack of personal data required when subscribing to dVPNs - you just need some tokens to use them. This upside is limited by the fact that multiple centralized VPNs don’t even need an email address to sign up, while also [accepting cryptocurrencies and cash][24]. 


|            dVPN network            |                          Hops (default)                          |                                                           Exit nodes                                                          |        Data costs        | Device required  |                           Logs                          |
|:----------------------------------:|:-------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|:------------------------:|:-----------------:|:-------------------------------------------------------:|
| Deeper Network                     | 1 (with 'Full routing') | Each node is an exit by default. Mandatory for mining and full routing.  | 1 TB = 1 DPN ≈ $0,13     | Yes               | Exit nodes keep logs [on device][23]  |
| Sentinel VPN                     | 1 - No multi-hop                                                      | Dedicated, incentivised, open to anyone.                                                                                       | Free                     | No                | No centralized logging, nodes can keep logs             |
| OrchidVPN                          | 1 - Optional multi-hop                                | Whitelisted partners (VPN and hosting companies)                                                                              | 1 GB ≈ 0,06$             | No                | No centralized logging, nodes can keep logs             |
| Mysterium                          | 1 - No multi-hop option                                                     | Dedicated, incentivised, open to anyone                                                                                       | 1 GB ≈ 0,01 MYST ≈ 0,04$ | No                | No centralized logging, nodes can keep logs             |

### Further considerations for dVPNs

The following points do not apply to all services, but are important to mention when evaluating distributed VPNs.

1. As discussed before, exit nodes are important participants in a distributed VPN network, responsible for the decryption and routing of data packets to their next destination. For this reason they are liable for any abuse happening on the network, as their IP address will be associated with any such activity exiting through them. Depending on network design and go-to-market strategy, dVPNs approach them in different ways:
    1. They incentivise end-users to acts as exit nodes, earning money or credits (Sentinel, Mysterium). These providers distribute guides for participants on how to deal with the ['exit node problem'][18]. 
    2. Use 'trusted partners' as exit nodes, for example VPN providers and hosting companies to provide exit nodes (Orchid). Orchid's choice points to an issue of residential nodes acting as exits: when the law enforcement comes knocking, a decentralized network won't take end-user liability or provide legal assistance. Activists running exit nodes for Tor have been battling with this issue since the [inception of the network][19]. We recommend assessing whether the system is sustainable if exit node operators are not protected from or don't understand the ramifications of potential abuse.
2. Certain dVPNs prioritise other use cases over privacy and don’t mask your IP address by default. One example is Deeper Network, where only connection requests that the system deems qualifying pass through the nodes in the network ("smart route"). Masking of your IP and encrypted connection can be achieved only by switching to a "DPN full route" mode, which forces you to become an exit node, resulting in a [tricky tradeoff][20]. The "smart route" option might come handy for P2P downloading and geo shifting for streaming services, but their design choices show that Deeper Network is not a good choice for privacy.
3. When you are evaluating centralized VPNs, it's important to keep in mind that in most cases if the service is free, your data is the product sold to someone else. While this warning might not apply to all dVPNs, they reward nodes with token distribution and customers with free access when they are starting out. As the service matures and supply and demand starts to grow organically, there is no need for incentivisation. However, if there is no money coming into a closed system it cannot sustain itself for long - subscription fees are an obvious solution for this. Don't pick a service just because it's free right now.
4. Some dVPNs, like the Deeper network rely on [proprietary devices][21] that sit between your modem and your device/router. If you need a VPN solution on the road their solution might not be a good fit.

### Comparison summary 

With centralized VPNs you have to trust those running the service that the implementation of all parts of their system reflect their privacy-protecting promises. This trust is the key point of failure: you don't need to additionally consider details like traffic routing rules and potential malicious nodes. In case of dVPN, you don't need to trust a central entity, but you face challenges of achieving a practical multi-hop setup and vetting of nodes (or list of nodes).

Decentralized VPNs offer a vision where trust in a single entity is not required, making them potentially better choices for evading ISP and dragnet surveillance. Current solutions in this segment, however, fall short of these promises because of implementation choices around one-hop routing, questions around exit node trust and liability and [low adoption rates][22]. For privacy protection, a centralized VPN service is a better choice if you are ready to trust a provider with handling your data. If that trust leap is too big for you, or you care deeply about decentralisation, going with a dVPN is a better idea - just consider the tradeoffs detailed in this guide.

[1]:https://www.ivpn.net/blog/vpn-imperfect-necessary-privacy-enhancing-tools/
[2]:https://www.ivpn.net/privacy-guides/will-a-vpn-protect-me/
[3]:https://www.ftc.gov/news-events/press-releases/2021/10/ftc-staff-report-finds-many-internet-service-providers-collect
[4]:https://privacyinternational.org/sites/default/files/2017-12/Data%20Retention_2017.pdf
[5]:https://docs.sentinel.co/assets/files/whitepaper-513665f81a5d6c4b462e111926d26f57.pdf
[6]:https://blog.orchid.com/everything-you-need-to-know-about-centralized-decentralized-and-opensource-vpns/
[7]:https://www.eff.org/pages/what-tor-relay
[8]:https://tech.slashdot.org/story/21/12/03/2237223/a-mysterious-threat-actor-is-running-hundreds-of-malicious-tor-relays
[9]:https://www.ivpn.net/knowledgebase/general/do-you-offer-dedicated-or-static-ip-addresses/
[10]:https://www.orchid.com/whitepaper/english.pdf
[11]:https://blog.orchid.com/orchids-network-random-selection-stake-weighting/
[12]:https://www.mysteriumvpn.com/post/unblocking-the-internet
[13]:https://privacyguides.org/vpn/
[14]:https://support.torproject.org/tbb/tbb-22/
[15]:https://www.nngroup.com/articles/law-of-bandwidth/
[16]:https://deeper-network.medium.com/a-101-on-dpns-bd5e2b7c9e25
[17]:https://blog.orchid.com/orchid-partners-with-liquidvpn/
[18]:https://dvpnalliance.org/exit-node/
[19]:https://www.accessnow.org/a-torifying-tale-our-experiences-building-and-running-tor-servers/
[20]:https://deepernetwork.cc/d/273-advice-on-settings-for-browsing-anonymity-and-security/10
[21]:https://shop.deeper.network/buy
[22]:https://stats.sentinel.co/stats
[23]:https://deeper-network-inc.gitbook.io/deeper-connect-knowledge-base/atom-os-functions/device/device-log
[24]:https://mullvad.net/en/blog/2017/1/13/clarifying-our-no-logging-policy/
