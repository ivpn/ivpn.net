---
title: Windows support and privacy improvements for WireGuard
# Example: /blog/this-is-a-good-post
url: /blog/windows-support-and-privacy-improvements-for-wireguard/
draft: false
authors:
  - Nick Pestell
categories:
  - Releases
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - Apps
  - Protocols
  - Privacy
  - WireGuard
date: 2019-07-11T07:56:15.000Z
# 740px X 740px
thumbnailImage: /images-static/uploads/windows.png
---
When picking a VPN service there are multiple criteria for evaluation, starting with questions like [who owns the company][1] behind it, whether your [provider keeps logs][2] and [what happens with the data][3] you share. Two further measures are usually on the top of the remaining list: the type of security the service provides and the connection speed you can achieve while using it. 

On these two fronts, a newcomer protocol, [WireGuard][4], offers the possibility for significant improvements to existing solutions for VPN services. While it is still in its test phase, and requires formal reviews and further audits before being ready for prime time, WireGuard clearly offers improved security and better speeds over currently-preferred protocols like OpenVPN.   


Implementing WireGuard in our applications and offering its use through our service was a key priority for us last year. In a pioneering move [we integrated][5] it in our Android, iOS and macOS apps last December. Since then, feedback from our subscribers who have tested the solution have been overwhelmingly positive. As Windows was not officially supported by WireGuard at the time of our initial launch, adding the option to our app remained on our to-do list. After a recent release by the team behind the protocol, we are now happy to offer the test use of WireGuard in all of our applications.

**WARNING: The WireGuard protocol is currently under heavy development and should be considered experimental. At this time we do not recommend using WireGuard except for testing or in situations where security is not critical. We keep our WireGuard VPN servers completely separate from our OpenVPN servers to ensure there are no security risks.**

_27/04/2020 update: Since its merge into Linux Kernel (v5.6) and the release of WireGuard 1.0, we consider the protocol to be ready for wide-scale use. We now offer WireGuard to all our subscribers._  

_More information:_ [https://www.ivpn.net/wireguard/][10]

Existing subscribers can start testing WireGuard simply by downloading the latest version of our Windows application and enabling WireGuard in the Settings (please see our [guide][6] and [FAQ][7] for more information). If you are not using IVPN yet, you can take advantage of our 3-day obligation-free trial option to test the service. 

We have further news regarding our WireGuard implementation: As a VPN provider with a chief focus on privacy protection, we have considered and evaluated the possible risks of using the protocol during our tests. Security experts in our team have identified and solved multiple issues – including users' public IP being stored in memory indefinitely, the lack of real dynamic IP allocation and no 'identity-hiding forward secrecy' offered – and have taken significant steps towards eventually recommending WireGuard as a default VPN protocol to use. If you are curious about these technical solutions please review our article [Using WireGuard for Privacy Protection][8].  


If you have any feedback, questions or concerns about WireGuard for IVPN, our [team is standing by][9] for your message.

Looking forward to hearing your test impressions.  


Nick Pestell &  
the IVPN team

 [1]: /facts
 [2]: /blog/ivpn-no-logging-claim-verified-by-independent-audit/
 [3]: /privacy/
 [4]: https://www.wireguard.com/
 [5]: /blog/introducing-wireguard-fully-automated/
 [6]: /setup/windows-10-wireguard/
 [7]: /knowledgebase/general/wireguard-faq/
 [8]: /knowledgebase/general/using-wireguard-for-privacy-protection/
 [9]: /contactus/
 [10]: /wireguard/