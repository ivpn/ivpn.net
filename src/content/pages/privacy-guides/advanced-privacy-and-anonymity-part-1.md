---
title: Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 1
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/advanced-privacy-and-anonymity-part-1/
section: Advanced
weight: 10
nextArticles:
  - /privacy-guides/advanced-privacy-and-anonymity-part-2/
  - /privacy-guides/advanced-privacy-and-anonymity-part-3/
  - /privacy-guides/advanced-privacy-and-anonymity-part-4/
date: 2013-10-23T12:33:33+00:00
layout: guides-details
---
## Introduction

If you're here, you may be using (or considering) a VPN service to provide online privacy and anonymity, and perhaps to circumvent Internet censorship. This series of guides goes far beyond that. It explains how to obtain vastly greater freedom, privacy and anonymity through [compartmentalization][1] (aka [compartmentation][2]) and [isolation][3], by using multiple virtual machines (VMs) with Internet access through nested chains of VPNs and Tor.

These are advanced guides, and the full setup will require at least a few days of focused work. Before choosing which aspects to implement, it's best to consider your [threat model][4]. Start by reading [An Introduction to Privacy & Anonymity](/privacy-guides/an-introduction-to-privacy-anonymity/) and [Applying Risk Management to Privacy][5]. What are you protecting? Who are you protecting it from? What might happen if you were compromised?

> **Note:** I wrote this series in 2013, well over six years ago. Although I've updated stuff a few times since, it's been a while. I'll be doing a total rewrite soon, but that will take some time.
> 
> So for now, I just have a few comments. First, pfSense has changed considerably since my last update. The basic approach still works, and I still use it. But much of Part 6 needs revised. Second, privacy in meatspace is basically dead, given increasingly pervasive surveillance. So there's a lot in Part 7 to be revised. Using giftcards, mailing cash, etc are far more risky. Also, Electrum is now the best Bitcoin wallet in Linux. And I have updated recommendations for Bitcoin mixers.

The key threats, and corresponding defenses, are:

{{< raw-html >}}
<table class="table--data">
  <tr>
    <th>
      Threat
    </th>
    <th>
      Defense
    </th>
  </tr>
  <tr>
    <td>
      Tracking and profiling
    </td>
    <td>
      Compartmentalize and isolate activity using multiple pseudonyms, workspace VMs, VPN services and Tor. Block WebGL to prevent VM graphics fingerprinting. Diversify VMs, choosing OS with different video drivers.
    </td>
  </tr>
  <tr>
    <td>
      Leaks and exploits that circumvent VPNs or Tor
    </td>
    <td>
      Compartmentalize and isolate workspace and networking in separate VMs.
    </td>
  </tr>
  <tr>
    <td>
      VPN compromise via traffic analysis or provider collusion
    </td>
    <td>
      Compartmentalize Internet access and distribute trust using nested chains of VPNs and Tor.
    </td>
  </tr>
  <tr>
    <td>
      Heightened surveillance of Tor users
    </td>
    <td>
      Connect to Tor network through VPN(s).
    </td>
  </tr>
  <tr>
    <td>
      Heightened surveillance of VPN users
    </td>
    <td>
      Connect to VPN server(s) via secure, private proxies (not yet included in these guides).
    </td>
  </tr>
  <tr>
    <td>
      Unauthorized local access
    </td>
    <td>
      Use full disk encryption (FDE) on host machines (and VMs).
    </td>
  </tr>
  <tr>
    <td>
      Forensic detection of encrypted data
    </td>
    <td>
      Use <a title="Creating a VM within a hidden truecrypt partition" href="/privacy-guides/creating-a-vm-within-a-hidden-truecrypt-partition/" target="_blank" rel="noopener noreferrer">hidden Truecrypt volumes</a> for plausible deniability (not included in these guides).
    </td>
  </tr>
</table>
{{< / raw-html >}}

For example, if you just want to circumvent Internet censorship and data retention by your ISP, you don't need more than a good VPN service (unless consequences of getting caught are serious). If you just want to circumvent commercial tracking and behavioral marketing, you don't need the full setup described here. However, if you want better privacy and anonymity than browser extensions can provide, you might consider a basic setup (covered in Part 2) to compartmentalize your activities using VMs and VPN services.

Conversely, if you're a political dissident who might suffer serious consequences if compromised, using the full setup (covered in Parts 3-8) would be prudent. The approaches described there would probably protect against non-targeted surveillance by national-scale government agencies. For such agencies with limited resources, they might even protect against targeted surveillance.

Although it appears that global-scale intelligence agencies intercept virtually all Internet traffic, the approaches described here _might_ protect against routine non-targeted surveillance, given the need to correlate traffic through multiple VPN tunnels and Tor. While there's no way to be sure of that, it's clear that nothing less would suffice.

However, it's unlikely that even the full setup described here would protect against directed surveillance by global-scale intelligence agencies. That would require far more resources and expertise than most nations (let alone individuals) possess.

### Using Tor

As I write this, the Tor network is under extreme stress. Since August 20, [the number of Tor clients][6] has increased from about 0.5 million to over 4.0 million. Based on reports from [Fox-IT][7] and [TrendLabs][8], it appears that the approximately 3.5 million new Tor clients are part of a Mevade botnet. So far, these Mevade bots are not sending much traffic, and are stressing Tor primarily by querying its directory servers. See [this Tor Project blog post][9] for more.

At this point, this has probably not reduced the level of anonymity that Tor can provide. It's just made Tor slower and less reliable. However, if more than a few thousand of these bots were to become [relays][10], there would be cause for concern, because they could collude to deanonymize other Tor users. A recent paper by Tor researchers, [Johnson et al (2013) Users Get Routed: Traffic Correlation on Tor by Realistic Adversaries][11] analyzes the network's vulnerability to potential adversaries. I recommend periodically checking [the Tor Project blog][12] for status updates, and also checking Tor [client][6] and [relay][13] counts.

### Summary

{{< raw-html >}}
<table class="table--data">
  <tr>
    <th>
      <a title="Part 2 - Basic Setup Using VMs, VPNs and Tor" href="/privacy-guides/advanced-privacy-and-anonymity-part-2/" target="_blank" rel="noopener noreferrer">Part 2 - Basic Setup Using VMs, VPNs and Tor</a>
    </th>
  </tr>
  <tr>
    <td>
      This guide covers a basic setup to protect online privacy and anonymity. There are multiple workspace VMs to compartmentalize and isolate activity. Each VM has its own Internet connectivity, and firewall rules to prevent leaks. It uses simple nested chains of VPNs and Tor to mitigate risks of tracking and profiling, and to distribute trust among multiple providers. But it does not protect against exploits that circumvent VPNs, Tor and/or firewall rules by isolating workspace and networking in separate VMs. Using diverse OS for workspace VMs, with different video drivers, is crucial to prevent association through WebGL fingerprinting.
    </td>
  </tr>
  <tr>
    <th>
      <a title="Part 3 - Planning Advanced VM and VPN Setup" href="/privacy-guides/advanced-privacy-and-anonymity-part-3/" target="_blank" rel="noopener noreferrer">Part 3 - Planning Advanced VM and VPN Setup</a>
    </th>
  </tr>
  <tr>
    <td>
      This guide presents relevant considerations for planning an advanced setup to protect online privacy and anonymity. As in the basic setup, there are multiple workspace VMs to compartmentalize and isolate activity, and each VM has its own Internet connectivity. The nested chains of VPNs and Tor are more complex, to better mitigate risks of tracking and profiling, and to distribute trust among more providers. The setup isolates workspace and networking in separate VMs to defeat exploits that circumvent VPNs, Tor and/or firewall rules.
    </td>
  </tr>
  <tr>
    <th>
      <a title="Part 4 - Setting Up Secure Host Machines" href="/privacy-guides/advanced-privacy-and-anonymity-part-4/" target="_blank" rel="noopener noreferrer">Part 4 - Setting Up Secure Host Machines</a>
    </th>
  </tr>
  <tr>
    <td>
      This guide explains how to set up Linux host machines for securely running numerous VMs. Linux distributions are open-source and free, so there's less risk of <a href="https://en.wikipedia.org/wiki/Backdoor_%28computing%29">backdoors</a>, and no money trail to one's <a href="https://en.wikipedia.org/wiki/True_Names">true name</a>. With clean installations, there's little (if any) risk from prior compromise. <a href="https://en.wikipedia.org/wiki/RAID">RAID arrays</a> provide faster disk I/O, greater capacity and better reliability. Using full disk encryption (FDE) prevents forensic analysis, unless the host is accessed while in use.
    </td>
  </tr>
  <tr>
    <th>
      <a title="Part 5 - Installing VirtualBox and Creating Linux VMs" href="/privacy-guides/advanced-privacy-and-anonymity-part-5/" target="_blank" rel="noopener noreferrer">Part 5 - Installing VirtualBox and Creating Linux VMs</a>
    </th>
  </tr>
  <tr>
    <td>
      This guide covers installing VirtualBox, and creating Linux workstation VMs and read-only LiveCD VMs. Using diverse OS for workspace VMs, with different video drivers, is crucial to prevent association through WebGL fingerprinting.
    </td>
  </tr>
  <tr>
    <th>
      <a title="Part 6 - Creating pfSense VMs as VPN Clients" href="/privacy-guides/advanced-privacy-and-anonymity-part-6/" target="_blank" rel="noopener noreferrer">Part 6 - Creating pfSense VMs as VPN Clients</a>
    </th>
  </tr>
  <tr>
    <td>
      This guide covers creating pfSense router/firewall VMs, and configuring them as secure VPN clients, with routing and firewall rules to prevent leaks. It also explains how to test for leaks using Wireshark.
    </td>
  </tr>
  <tr>
    <th>
      <a title="Part 7 - Paying Anonymously with Cash and Bitcoins" href="/privacy-guides/advanced-privacy-and-anonymity-part-7/" target="_blank" rel="noopener noreferrer">Part 7 - Paying Anonymously with Cash and Bitcoins</a>
    </th>
  </tr>
  <tr>
    <td>
      This guide explains how to anonymously buy VPN services using cash by mail and anonymized Bitcoins. It also covers how to buy Bitcoins, and how to anonymize them using Multibit clients and mixing services, with all connections via Tor.
    </td>
  </tr>
  <tr>
    <th>
      <a title="Part 8 - Creating Nested Chains of VPNs and Tor" href="/privacy-guides/advanced-privacy-and-anonymity-part-8/" target="_blank" rel="noopener noreferrer">Part 8 - Creating Nested Chains of VPNs and Tor</a>
    </th>
  </tr>
  <tr>
    <td>
      This tutorial explains how to create arbitrarily complex nested chains of VPNs and Tor through virtual networking, with pfSense VPN-client VMs and Tor-client VMs.
    </td>
  </tr>
</table>
{{< / raw-html >}}

### Acknowledgement

These guides reflect my participation at [Wilders Security Forums][14] for the past few years. I acknowledge the administrators and moderators for the venue, and for their care and guidance. But mostly I acknowledge the Wilders' user community (especially fellow privacy lovers) for great answers, tough questions, and lively discussions.

I also acknowledge [IVPN][15] for invaluable support and encouragement.

Finally, I acknowledge the global open source community, without which none of this would have been possible.

 [1]: https://en.wikipedia.org/wiki/Compartmentalization_%28information_security%29
 [2]: http://www.cl.cam.ac.uk/~rja14/Papers/SE-08.pdf
 [3]: http://theinvisiblethings.blogspot.ru/2008/09/three-approaches-to-computer-security.html
 [4]: https://en.wikipedia.org/wiki/Threat_model
 [5]: /privacy-guides/applying-risk-management-to-privacy/
 [6]: https://metrics.torproject.org/users.html?graph=direct-users&start=2013-01-01&end=2013-12-31&country=all&events=off#direct-users
 [7]: http://blog.fox-it.com/2013/09/05/large-botnet-cause-of-recent-tor-network-overload/
 [8]: http://blog.trendmicro.com/trendlabs-security-intelligence/the-mysterious-mevade-malware/
 [9]: https://blog.torproject.org/blog/how-to-handle-millions-new-tor-clients
 [10]: https://metrics.torproject.org/network.html?graph=networksize&start=2013-01-01&end=2013-12-31#networksize
 [11]: http://www.ohmygodel.com/publications/usersrouted-ccs13.pdf
 [12]: https://blog.torproject.org/blog/
 [13]: https://metrics.torproject.org/network.html?graph=networksize&start=2013-01-01&end=2013-12-31#networksize
 [14]: https://www.wilderssecurity.com/
 [15]: /
