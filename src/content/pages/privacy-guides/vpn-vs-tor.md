---
title: VPN vs Tor
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/vpn-vs-tor/
section: Basic
weight: 60
articles: [
  {
    title: "What is a VPN?",
    url: "/privacy-guides/what-is-a-vpn/"
  },
  {
    title: "Why use Tor with a VPN service?",
    url: "/privacy-guides/why-use-tor-with-a-vpn-service/"
  },
  {
    title: "Will a VPN Protect Me? Defining Your Threat Model",
    url: "/privacy-guides/will-a-vpn-protect-me/"
  }
]
date: 2015-09-30T07:56:13+00:00
layout: guides-details
---
{{< raw-html >}}
<table class="table--data vpnprotocols">
  <tr>
    <th style="padding: 5px 5px 5px 5px;" width="20%">
    </th>
    <th style="padding: 5px 5px 5px 25px;" width="40%">
      <b>VPN Services</b>
    </th>
    <th style="padding: 5px 5px 5px 25px;" width="40%">
      <b>Tor</b>
    </th>
  </tr>
  <tr>
    <td>
      <strong>Design</strong>
    </td>
    <td>
      VPN protocols were developed in the 80s-90s for securing government and commercial networks. The first VPN services appeared in the mid 90s. They provide secure, private wormhole tunnels through the public Internet from client apps to VPN servers.
    </td>
    <td>
      Tor is a second-generation onion-routing anonymity system. It was developed at the U.S. Naval Research Laboratory in the early 00s, and then released into the public domain. It's now managed by an NGO, the Tor Project.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Source(s) of Funding</strong>
    </td>
    <td>
      VPN services are generally private firms or NGOs.
    </td>
    <td>
      The Tor Project has been <a href="https://www.torproject.org/about/sponsors.html.en">funded</a> primarily by U.S. government programs.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Number of Hops to Exit</strong>
    </td>
    <td>
      Most are one-hop. A few are two- or three-hop.
    </td>
    <td>
      Normally, there are three hops. For onion (aka `hidden`) services, clients and servers each use three-hop circuits to reach rendezvous nodes.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Number of Independent Hops</strong>
    </td>
    <td>
      One, because one provider runs them all.
    </td>
    <td>
      Three by design, but collusion is possible.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Number of Servers</strong>
    </td>
    <td>
      There are typically 10-100, but some services claim as many as a few hundred.
    </td>
    <td>
      There are <a href="https://metrics.torproject.org/relayflags.html">over 6000</a>.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Number of Possible Routes through System</strong>
    </td>
    <td>
      For even the largest VPN services, there are at most a few hundred distinct routes.
    </td>
    <td>
      That depends on <a href="https://metrics.torproject.org/relayflags.html">relay availability</a>. With ~1700 entry guards, ~1000 exit relays and ~2300 non-entry/non-exit relays, about four billion distinct circuits are possible.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Frequency of Route Change</strong>
    </td>
    <td>
      That depends on the provider. For most providers, it's done manually, either in custom clients or by users. A few VPN providers offer custom clients that change routes automatically.
    </td>
    <td>
      Each connection by an app uses a new, dedicated circuit. And circuits are replaced at ten minute intervals, unless they've been pinned open by active connections.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Chance of Getting Recently-Used Routes</strong>
    </td>
    <td>
      There are few possible routes, so reuse is likely on a scale of days (or at most weeks, for the largest providers).
    </td>
    <td>
      With billions of possible routes, reuse is unlikely on a scale of months, or even years.
    </td>
  </tr>
  <tr>
    <td>
      <strong>What does your ISP know?</strong>
    </td>
    <td>
      It knows only that you're using a VPN service.
    </td>
    <td>
      It knows only that you're using Tor.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Anonymity: Who knows what about you?</strong>
    </td>
    <td>
      VPN providers: 1) know that you have an account; 2) know your IP address when you connect; and 3) know what Internet sites you visit. And they can see all content that's not end-to end encrypted with Internet sites. However, reputable (and prudent) providers don't look at traffic, keep logs, or associate entry and exit activity.
    </td>
    <td>
      There are normally three relays in a circuit. All traffic is encrypted between users and exit relays. So like VPN providers, exit relay operators can see all content that's not end-to end encrypted with Internet sites. However, only entry relays (aka entry guards) know your IP address, and they don't see your Internet destinations, other metadata, or content. Middle relays isolate entry guards and exit relays. Their operators don't know your IP address. And they also don't see your Internet destinations, other metadata, or content.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Distribution of Trust</strong>
    </td>
    <td>
      You must trust the VPN provider.
    </td>
    <td>
      Although the code is freely available for review, virtually all users must trust the system design, and some mix of those who implemented it and those who reviewed it. By design, there's no need to trust any particular resource contributor. But collectively, you must trust the group that manages core directory servers for relays and onion servers. And you must trust that enough relay operators are honest, and not colluding with each other to deanonymize you. And finally, you must trust that system attacks will be detected and mitigated.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Security and Privacy:</strong> Who can see and mess with your data?
    </td>
    <td>
      As long as the service uses the <a href="https://www.ivpn.net/pptp-vs-l2tp-vs-openvpn">secure IPSec or OpenVPN protocols</a>, adversaries between you and the VPN server can't see or alter your traffic. They can block it, of course. But the connection is encrypted with <a href="https://en.wikipedia.org/wiki/Forward_secrecy">perfect forward secrecy</a>. Even if an adversary somehow manages to decrypt some of the VPN traffic, that won't allow them to easily decrypt past or future traffic. The VPN provider, of course, can see traffic that it's handling. And your traffic is exposed after it leaves the VPN exit. So it's important to employ end-to-end encryption with Internet destinations (e.g., HTTPS for websites, and TLS for email).
    </td>
    <td>
      Tor connections are multiply encrypted, all with <a href="https://en.wikipedia.org/wiki/Forward_secrecy">perfect forward secrecy</a>. Your connection to the exit relay is encrypted. So is your connection to the middle relay, which is relaying traffic to the exit relay. And so is your connection to the entry guard, which is relaying traffic to the middle relay, and so on. Given that, only the exit relay operator can see and mess with your data. And as with VPN services, your traffic is exposed after it leaves the exit. So it's important to employ end-to-end encryption with Internet destinations (e.g., HTTPS for websites, and TLS for email).
    </td>
  </tr>
  <tr>
    <td>
      <strong>Ease of Use</strong>
    </td>
    <td>
      VPN services are the simplest type of anonymity system that's secure and reliable. VPN servers automatically proxy all of the client's Internet traffic. There's no need to configure apps. They're usually very easy to setup, with client software (or perhaps just configuration files) from providers.
    </td>
    <td>
      <a href="https://www.torproject.org/projects/torbrowser.html.en">Tor browser</a> is very easy to install, but only browser traffic uses Tor. It's not designed to easily route other apps via Tor. And using the plain Tor client is complicated, and not well documented for new users. Other options include the <a href="https://tails.boum.org/">Tails LiveDVD</a>, and <a href="https://www.whonix.org/">Whonix</a>, which is a pair of VirtualBox VMs. Both include numerous apps. Using Whonix, even misconfigured apps cannot bypass Tor.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Speed and Latency</strong>
    </td>
    <td>
      VPN services are typically very fast, only slightly worse than plain ISP uplinks. Latency (time delay) depends on the distance to the VPN server, and network conditions. But it's generally less than 0.1 second, which is not very noticeable (except for some gameplay).
    </td>
    <td>
      Speed varies greatly, depending on the capabilities of intervening relays, and how much traffic they're handling. Also, for better security, each client now chooses just one entry guard at first run, and it sticks with that choice for about six months. Although the system excludes slow relays as entry guards, entry guards can become overloaded. It may be necessary to delete the Tor configuration, in order to force the selection of a new entry guard. Latency (time delay) is much greater than with VPNs, sometimes as great as 0.5 second (or even 1 second). That is especially problematic for websites that do a lot of back-and-forth with browsers. Blocking ads and Javascript typically helps.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Potential Pitfalls, and Mitigation</strong>
    </td>
    <td>
      VPN connection may drop, and while it's reconnecting, traffic may reach Internet sites directly - some VPN client apps prevent that - and one can also block bypass using firewall rules - also potential for DNS leaks - VPN server tells your client app what DNS servers to use - but your computer also knows about DNS servers from your ISP - so when the VPN is connected, it may access ISP-associated DNS servers - and that may reveal your VPN exit IP address to your ISP - some VPN client apps also prevent that - and one can also block DNS bypass using firewall rules
    </td>
    <td>
      If your apps and/or Tor are misconfigured, you'll be accessing the Internet directly, at least in part. And it's all too easy to get caught, by not knowing what to worry about. A classic example is using BitTorrent via Tor. It's very hard to force all BitTorrent connections to use Tor. That's because BitTorrent apps are designed for speed, and not for security. Given the risks in using the <a href="https://www.torproject.org/projects/torbrowser.html.en">Tor browser</a>, it's best to use either the <a href="https://tails.boum.org/">Tails LiveDVD</a> or <a href="https://www.whonix.org/">Whonix</a>. Also see <a href="https://www.torproject.org/download/download-easy.html.en#warning">Want Tor to really work?</a>
    </td>
  </tr>
  <tr>
    <td>
      <strong>Conclusion</strong>
    </td>
    <td>
      VPN services are an excellent choice where speed, and privacy from local adversaries, are most important. They also provide limited anonymity on the Internet, but that's vulnerable to adversaries who can coerce providers, or snoop on their servers. See <a href="privacy-guides/will-a-vpn-protect-me/">Will a VPN Protect Me?</a> and <a href="privacy-guides/adversaries-and-anonymity-systems-the-basics/">Adversaries and Anonymity Systems</a>. They're easy to install and use. Once setup properly, they reliably handle all Internet traffic.
    </td>
    <td>
      When the Tor client starts, it displays a warning: `This is experimental software. Do not rely on it for strong anonymity.` But there's arguably no better alternative. See <a href="/privacy-guides/adversaries-and-anonymity-systems-the-basics/">Adversaries and Anonymity Systems</a>. And so Tor is the best choice when anonymity is most important. But Tor is much slower than VPN services. And you must <a href="https://www.torproject.org/download/download-easy.html.en#warning">use it properly</a>.
    </td>
  </tr>
</table>
{{< / raw-html >}}