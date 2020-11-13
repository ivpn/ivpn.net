---
title: Introducing WireGuard, fully automated.
# Example: /blog/this-is-a-good-post
url: /blog/introducing-wireguard-fully-automated/
draft: false
authors:
  - Nick Pestell
categories:
  - Releases
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - Apps
  - Protocols
  - Security
  - WireGuard
date: 2018-12-11T14:05:43.000Z
# 740px X 740px
thumbnailImage: /images-static/uploads/wireguard.png
---
In November 2009, almost 10 years ago IVPN was launched. We knew that in order to become the most trusted provider we had to demonstrate our security expertise and execute flawlessly and consistently over many years. On day one we launched a full mesh multi-hop network using Linux policy based routing with all VPN gateways passing strict CIS benchmark compliance, an industry first. In January 2015 we introduced the IVPN firewall which is integrated deep into the OS using Microsoft's WFP API and independent from the app itself. Even if the app crashed we could guarantee no data leaks. In September 2016 we took a strong stance against corrupt 'pay for play' affiliates. In the past few years we have launched dozens of new features specifically to improve our customer's security. Today we are more excited than ever to launch what we believe is the future of VPN technology, [WireGuard][1]

WireGuard is an extremely fast, secure and simple protocol relative to OpenVPN, the default that we use in our current apps. Its simplicity and size ensure a much smaller attack surface relative to other protocols (roughly 1% of OpenVPN). This greatly enhances its ability to be peer reviewed and audited. It uses state-of-the-art cryptography, employing the <a class="external-link" href="http://www.noiseprotocol.org/" rel="nofollow">Noise protocol framework</a>, <a class="external-link" title="Curve25519" href="https://en.wikipedia.org/wiki/Curve25519" rel="nofollow">Curve25519</a> for <a class="external-link" title="Key exchange" href="https://en.wikipedia.org/wiki/Key_exchange" rel="nofollow">key exchange</a>, <a class="external-link" title="ChaCha20" href="https://en.wikipedia.org/wiki/ChaCha20" rel="nofollow">ChaCha20</a> for encryption, <a class="external-link" title="Poly1305" href="https://en.wikipedia.org/wiki/Poly1305" rel="nofollow">Poly1305</a> for authentication and <a class="external-link" title="BLAKE2s" href="https://en.wikipedia.org/wiki/BLAKE2s" rel="nofollow">BLAKE2s</a> for hashing. WireGuard has excellent documentation, we strongly recommend reviewing the conceptual overview on the [homepage][1] and the [white-paper][2] for the more technically inclined.

In our own testing we have seen consistent speed improvements with WireGuard over OpenVPN. To continually ensure our customers security and privacy one of IVPN's design goals is to increase the time customers spend connected to the VPN, that some customers don't remain connected 24/7 may surprise our more hardcore privacy users. Customers have repeatedly told us that one of the reasons for disconnecting is the requirement for their maximum line speed for certain applications. We strongly believe that WireGuard's speed will increase the time customers spend connected and therefor their security and privacy.

This simplicity of WireGuard requires that certain functions are left out of the protocol and up to the user to implement, such as key and IP address management. For VPN providers this is a major technical challenge as encryption keys have to be securely generated within the VPN client and distributed to all VPN gateways, an IP address has to be leased from a pool and sent to the client, all before the user can connect to the VPN server. Current VPN services offering WireGuard require that the user manually generate the keys and upload them to specific servers through the control panel on their website. To continue demonstrating our expertise we set the bar high and have built a fully automated solution that securely generates keys within the client, uploads them to an IVPN server which then distributes them to all VPN gateways in our infrastructure within seconds. Using WireGuard on the client couldn't be easier, the user simply has to select it and will be able to connect immediately.

As part of our initiative to become increasingly open and to advance the industry we plan to open-source the code that manages all this complexity. Our hope is that VPN providers integrate this code into their infrastructure and continually improve it for the benefit of all. We are also sponsoring WireGuard development and encourage all customers to [make a donation][3] if they are able.

**WARNING: The WireGuard protocol is currently under heavy development and should be considered experimental. At this time we do not recommend using WireGuard except for testing or in situations where security is not critical. Our Wireguard VPN servers are completely separate from our OpenVPN servers to ensure no security risks. We welcome all customers to begin testing, simply select the protocol from within the IVPN client.** 

_27/04/2020 update: Since its merge into Linux Kernel (v5.6) and the release of WireGuard 1.0, we consider the protocol to be ready for wide-scale use. We now offer WireGuard to all our subscribers._

_More information:_ [https://ivpn.net/wireguard/][4]

We look forward to hearing your feedback!

Nick Pestell

CEO, IVPN

 [1]: https://www.wireguard.com/
 [2]: https://www.wireguard.com/papers/wireguard.pdf
 [3]: https://www.wireguard.com/donations/
 [4]: /wireguard/