---
title: What is a VPN?
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/what-is-a-vpn/
section: Basic
weight: 70
articles: [
  {
    title: "Why use Tor with a VPN service?",
    url: "/privacy-guides/why-use-tor-with-a-vpn-service/"
  },
  {
    title: "Will a VPN Protect Me? Defining Your Threat Model",
    url: "/privacy-guides/will-a-vpn-protect-me/"
  }
]
date: 2015-09-30T07:41:31+00:00
layout: guides-details
---
## Introduction

The Internet is an incredible thing. Computers around the planet can communicate with each other through it. However, the Internet is public space. And in public spaces, bad things can sometimes happen. That's why we have private space, which we can secure and trust. But how can private space be created among widely separated computers, which can only reach each other through the Internet?

Virtual private network (VPN) connections make that possible. Superficially, they serve as private wormhole tunnels through the Internet. We'll unpack that description shortly. In any case, whatever VPNs actually are, they are used primarily in two ways. First, organizations and groups use VPNs to securely interconnect widespread locations. Second, they use VPNs to enable secure access by remote staff and customers.

This article focuses on **VPN services**, which provide enhanced security and privacy to their users. By default, users reach the Internet directly through [Internet Service Provider (ISP)][1] gateways, which they typically reach through dialup, DSL, cable, fiber, LTE or Wi-Fi:

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/Connection-No-VPN-light.png"
        srcset="/images-static/uploads/Connection-No-VPN-light.png 1x, /images-static/uploads/Connection-No-VPN-light@2x.png 2x"
        alt="Connection Without VPN" />
    <img class="features__image--dark" src="/images-static/uploads/Connection-No-VPN-dark.png"
        srcset="/images-static/uploads/Connection-No-VPN-dark.png 1x, /images-static/uploads/Connection-No-VPN-dark@2x.png 2x"
        alt="Connection Without VPN" />
</figure>
{{< / raw-html >}}

ISPs know what sites users are accessing. They can see and modify all content that's not end-to-end encrypted. For example, they can add [tracking supercookies][3]. They can also block or throttle traffic, based on destination, traffic type, aggregate bandwidth usage, or whatever.

Those concerns are not problematic, as long as ISPs are serving their users' interests, respecting their privacy, and adequately securing their networks. But they do become problematic when ISPs act against users' interests. For example, governments may pressure ISPs to block access to certain sites. They may require ISPs to log and report online activity. ISPs may even provide [full-traffic intercept capability][4].

VPN services route their users' Internet traffic through private tunnels to remote exit servers:

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/Connection-One-VPN-light.png"
        srcset="/images-static/uploads/Connection-One-VPN-light.png 1x, /images-static/uploads/Connection-One-VPN-light@2x.png 2x"
        alt="Connection With VPN" />
    <img class="features__image--dark" src="/images-static/uploads/Connection-One-VPN-dark.png"
        srcset="/images-static/uploads/Connection-One-VPN-dark.png 1x, /images-static/uploads/Connection-One-VPN-dark@2x.png 2x"
        alt="Connection With VPN" />
</figure>
{{< / raw-html >}}

There's nothing private beyond the exit server, just the Internet. Still, VPN services protect their users in three main ways. First, they protect users from voyeurs, trackers, hackers, censors and other adversaries who can access networks between the user and the VPN service. Such adversaries can detect the VPN tunnel, and they can measure traffic volume. They can block the tunnel, but it's all or none. And they can't see, modify or specifically block any traffic inside the tunnel, whether it's end-to-end encrypted or not.

Second, VPN services may allow users to bypass geographic access restrictions imposed by some websites. Websites normally see traffic coming from a user's [Internet Protocol (IP) address][6], which is assigned by their ISP. And they can get the geographical location of that IP address from services such as [MaxMind][7].{{< raw-html >}}<sup><a href="#note-1"><b>1</b></a></sup>{{< / raw-html >}} You can see your current IP address using [What Is My IP Address][8]. While you're using a VPN service, websites instead see the VPN service's IP address. And so you just pick a VPN exit server with an IP address that's acceptable to the website that you want to access.

Third, VPN services allow users to be more anonymous. That's because users are typically sharing a particular VPN exit server with many other users. And they can easily switch to a different VPN exit server. However, websites can identify and track users in many ways.{{< raw-html >}}<sup><a href="#note-2"><b>2</b></a></sup>{{< / raw-html >}} The Wall Street Journal published an excellent [series on tracking][9] in 2010-2012. You may have seen a [No Not Track][10] option in your browser. However, [`by and large, the advertising industry ignores them`][11]. The W3C Technical Architecture Group (TAG) has published its opinion that [`unsanctioned tracking`][12] is harmful to the Web.

Of course, users are vulnerable to VPN services in the same ways that they're vulnerable to ISPs. But there's a crucial distinction: People have far more freedom and discretion in choosing VPN services. Let's say that your government censors and/or monitors Internet access. And let's say that it has compromised all available ISPs. Even if that's so, you can choose a VPN service in another jurisdiction. And you can choose one where it's much harder for your government to compromise things and obtain information.

## What Are VPNs?

OK, so what <u>is</u> a virtual private network? As you probably discovered before finding this page, there's a lot out there about VPNs. Unfortunately, most of it is either highly technical, or highly simplistic. Worse, much of the technical material is dated and/or misguided, and much of the simplistic material merely promotes a particular VPN service. This article takes a middle course. It does mention various technical issues, but for the most part leaves that to linked resources.

First, what is a <u>network</u>? In this context, a network is a system of computers and other devices that are interconnected by communications links. Those links may be wires, coaxial cables, optical fibers, microwave beams, and so on. Most simply, one may consider networks to include just the communications links and terminating gateways. The gateways mediate and regulate connections by other devices.

The first computer networks were all <u>private</u>, comprising devices located in private space, such as a building or an institutional campus. For such [Local Area Networks (LANs)][13] in private spaces, physical access control may provide sufficient security. But private LANs are nontrivial for geographically widespread devices. Dedicated connections are expensive, and they [don't scale well][14]. And so it's generally necessary to share long-distance communications links. Today, that pretty much means connecting through the Internet.

If you need secure and private connections, that's a serious problem. In [devising network communication protocols][15], engineers at first assumed that connected devices (and their users) could trust each other, and could also trust the network itself. That was an acceptable assumption for private LANs, operated by the military. But it becomes iffy for shared networks. And it fails utterly for the Internet. The Internet is an utterly public network, and it cannot prudently be trusted.{{< raw-html >}}<sup><a href="#note-3"><b>3</b></a></sup>{{< / raw-html >}}

The solution was [virtual][16] private network (VPN) connections through the untrusted Internet. Efforts in the 80s to secure government and commercial networks culminated in the [Internet Protocol Security suite (IPsec)][17]. It was the first secure VPN technology. IPSec and other VPNs rely on [encapsulation][18].

In the early 90s, Netscape spearheaded development of the Secure Sockets Layer (SSL) protocol for secure (authenticated and encrypted) web browsing. It's been largely replaced by the more-secure [Transport Layer Security (TLS) protocol][19]. Three notable open-source VPN packages now implement network tunneling with SSL/TLS for security: [OpenVPN][20], [OpenConnect][21] and [SoftEther][22]. Many VPN services provide IPsec combined with a tunneling protocol (L2TP) that simplifies setup. L2TP/IPsec works best on iOS and Android. However, it's apparently more vulnerable than OpenVPN to [exploitation by the NSA and friends][23]. Microsoft introduced its Point-to-Point Tunneling Protocol (PPTP) in Windows NT and Windows 95. It is [not very secure][24]. Please see this [comparison of PPTP, L2TP/IPSec and OpenVPN][25] .

To reiterate, encrypted traffic between a VPN server and a client creates a virtual armored cable between them. Intermediaries (and adversaries with access) can see the virtual cable, but they can't see the data that it carries. VPNs are actually more like very tough yet elastic hoses, which change `diameter` depending on how much data is flowing through them. That provides adversaries with some information about online activity, but not actual traffic data.

## Why Do We Need VPNs When We Have HTTPS? {#toc_2}

The [TLS protocol][19] in [Secure HTTP (HTTPS)][26] provides solid transport security. That is, it protects ongoing connections from adversaries. But otherwise, HTTPS is fatally flawed. It's fatally flawed because server authentication depends on hierarchical systems of certificate authorities, starting with trusted root certificates bundled in browsers. That's a problem. Consider the Superfish adware that Lenovo [included on consumer notebooks][27]. By adding its own root certificate to browsers, Superfish could intercept HTTPS connections, and replace websites' ads with its own ones. In other words, it carried out [man-in-the-middle (MitM) attacks][28] on Lenovo customers.

But it's far from the worst problem. Let's say that you visit <https://search.disconnect.me/>. How does your browser know that it's connected directly to that site, and that the connection hasn't been intercepted in a MitM attack? Supposedly, the browser knows because it can follow a chain of trust from the site's certificate through various intermediate certificate authorities, back to one of the root certificates that it trusts. But trust chains are typically very long and complex. And if one of those intermediate certificate authorities has [done something foolish][29] or [been compromised][30], websites can be spoofed or MitM'ed.

Using a VPN service, you get certificates from the provider. Once you've securely obtained them, there is no ambiguity when client apps authenticate the provider's VPN servers. A client won't connect unless a server proves that it has the requisite [certificate authority (CA) certificate][31]. There are no intermediate certificate authorities that must be trusted. And so MitM attacks are [much harder][32]. Even so, VPNs only protect against adversaries between a user and a VPN server.

## There Are Bigger Problems

Even after decades of security hardening, the Internet remains vulnerable in fundamental ways through unwarranted trust. There are two key vulnerabilities. First, let's say that you want to use [Google][33]. In order to load the page, your browser must translate _www.google.com_ into a suitable IP address. Google has many server clusters, in data centers around the world. The name servers specified in Google's domain registration are the best source for the IP address of a nearby Google server that's not too busy. But if everyone hit Google's primary name servers directly, they would crash and burn. And so there is a hierarchical global network of name servers, known as the [Domain Name System (DNS)][34], which forward and temporarily cache that information.

The process begins with name servers that your computer knows about. By default, those typically belong to your ISP. Google being so popular, those name servers will likely have the answer. But if they didn't, they would ask their ISP's name servers. And so on up the hierarchy to Google's primary name servers. Although the system works well for the most part, it is [vulnerable to spoofing and denial of service (DOS) attacks][35] by adversaries.

For example, let's say that your government doesn't want you to use Google. And so it requires all domestic ISPs to point _www.google.com_ at some non-Google IP address. That's called [DNS spoofing (or cache poisoning)][36]. And it's a common practice.{{< raw-html >}}<sup><a href="#note-4"><b>4</b></a></sup>{{< / raw-html >}} There is an easy workaround: just configure your computer to use [third party DNS servers][37].{{< raw-html >}}<sup><a href="#note-5"><b>5</b></a></sup>{{< / raw-html >}} However, that isn't always sufficient, because traffic to those DNS servers can also be blocked or misdirected.

Second, there is a [fundamental vulnerability][38] in the Internet [Border Gateway Protocol (BGP)][39]. Once your browser knows a website's IP address, BGP enables your ISP (and other intervening ISPs) to properly route your traffic to that destination. What's problematic is that BGP foolishly assumes that Internet routers can [trust each other][40]. But that [doesn't always work out][41].

Sometimes it's just mistakes. In June-2015, [Telekom Malaysia][42] announced routes to much of southeast Asia and Australia, and then it promptly choked on the massive traffic that ensued. That is, Telekom Malaysia's mistake prevented people in London (for example) from accessing sites in Singapore, Hong Kong, Sydney and so on. But sometimes one wonders. In 2010, China Telecom [`hijacked` a large chunk of the Internet][43]. Although there's no proof, the Chinese might have monitored and logged on a massive scale. Or instead, they could have just [null routed][44] everything.

VPN services can mitigate at least some DNS vulnerabilities, by tunneling beyond area controlled by an adversary. Most countries use DNS spoofing (cache poisoning) to deny access to forbidden websites. But most countries can't poison the entire DNS hierarchy. For example, in 2014 [the Turkish government banned Twitter and YouTube through DNS poisoning][45]. And then, as users started using Google's DNS servers to get around the ban, it blocked access to them as well. However, all of those blocks were implemented through Turkish ISPs. So VPN users could reach routes and DNS servers that were not under Turkish control.

## But VPNs Aren't Perfect {#toc_4}

ISPs can also block VPN connections. Iran and China notoriously do. It's not hard to detect VPNs. The [OpenVPN][46] and [IPSec][47] protocols are both distinctive. ISPs can just look at packet types, sequences and patterns. That's known as [deep packet inspection][48]. Also, their systems test suspected VPN servers for VPN-specific response patterns.

One can hide ([encapsulate][49]) VPN traffic in other tunnels. There are good introductions [here][50] and [here][51]. Open-source tools include [SSH][52], [SSL][53] (_e.g._, [stunnel][54]) and [obfsproxy][55] (developed by the Tor Project). There is also a [patch for OpenVPN][56]. And some VPN services use various methods that are proprietary and closed-source. However, the shape of the initial connection dialog between client and server is [distinctive][57]. And that's hard to obfuscate without [padding][58]. But padding wastes bandwidth, so there's a trade-off.{{< raw-html >}}<sup><a href="#note-6"><b>6</b></a></sup>{{< / raw-html >}}

If your ISP is hijacking BGP, you can bypass using VPNs. As long as they're not blocked, anyway. More generally, that's the case whenever you're inside of some controlled space (_e.g._, corporate and university networks) or subject to a national firewall. As long as the VPN exit is outside the controlled space, it doesn't see the BGP hijacking.

Otherwise, it's hard to get around BGP hijacking. Consider [Telekom Malaysia's mistake][42]. Let's say that there's a VPN provider with servers in London and Singapore. If another route existed from London to Singapore that didn't pass through Telekom Malaysia, that VPN provider could hard-code it into their servers. Even though Telekom Malaysia was hijacking BGP to Singapore, traffic through the London-Singapore VPN tunnel would ignore it. However, unless such problems persisted, it's unlikely that VPN providers would route around them manually. But corporate, academic and government VPNs might.

{{< raw-html >}}
<div class="footnotes">
<h2>Footnotes</h2>

<ol>
<li id="note-1">
  Geolocation based on IP address isn't perfect. That's because services like MaxMind typically report central addresses of ISPs, rather than the actual addresses of ISP customers. But they get the country right, and that's enough to enforce geographic access restrictions.
</li>
<li id="note-2">
  Smartphones are especially vulnerable to tracking. Users have far less control over app behavior on smartphones. And there are multiple data sources for accurate geolocation, including GPS, cell towers and Wi-Fi hotspots.
</li>
<li id="note-3">
  Indeed, not even fundamental Internet links can be reliably secured over long distances. Cables are cut <a href="http://time.com/tag/internet-cable-cuts/">on land</a> and <a href="http://subtelforum.com/articles/category/cable-faults/">under oceans</a>. And they are <a href="http://www.theatlantic.com/international/archive/2013/07/the-creepy-long-standing-practice-of-undersea-cable-tapping/277855/">tapped</a>.
</li>
<li id="note-4">
  The US FBI uses DNS poisoning for so-called <a href="https://www.indolering.com/chilling-effects-domain-names">domain name seizures</a>, and the Motion Picture Association of America (MPAA) wants to <a href="https://www.bvsystems.com/WordPress/?tag=dns-takedown">take down sites hosting pirated content</a>. Various countries use DNS poisoning to <a href="http://www.smh.com.au/digital-life/digital-life-news/8888-the-four-digits-that-could-thwart-australias-antipiracy-websiteblocking-regime-20150624-ghw7kc.html">ban Interpol's `worst of the worst` list</a>. The Cyberspace Administration of China (CAC) does one better: it <a href="http://blog.crowdstrike.com/cyber-kung-fu-great-firewall-art-dns-poisoning/">redirects users</a> from banned sites to other sites that it wants to attack.
</li>
<li id="note-5">
  Some malware also does that for <a href="https://www.fbi.gov/news/stories/2011/november/malware_110911">ad injection</a> or <a href="http://www.securityweek.com/cybercriminals-use-dns-poisoning-brazilian-boleto-fraud-scheme">fraud</a>.
</li>
<li id="note-6">
  See Chapter 5 of <a href="http://www.cs.columbia.edu/~angelos/Papers/theses/sambuddho_thesis.pdf">Sambuddho Chakravarty's thesis</a>.
</li>
</ol></div>
{{< / raw-html >}}

 [1]: https://en.wikipedia.org/wiki/Internet_service_provider
 [2]: /images-static/uploads/Connection-No-VPN.png
 [3]: http://motherboard.vice.com/read/here-are-the-mobile-companies-still-tracking-you-across-the-web
 [4]: http://www.nytimes.com/2015/08/16/us/politics/att-helped-nsa-spy-on-an-array-of-internet-traffic.html
 [5]: /images-static/uploads/Connection-One-VPN.png
 [6]: https://en.wikipedia.org/wiki/IP_address
 [7]: https://www.maxmind.com/en/home
 [8]: https://whatismyipaddress.com/
 [9]: http://www.wsj.com/public/page/what-they-know-digital-privacy.html
 [10]: https://www.eff.org/issues/do-not-track
 [11]: http://www.theregister.co.uk/2015/07/29/dnt_dead_in_the_water/
 [12]: http://www.w3.org/2001/tag/doc/unsanctioned-tracking/
 [13]: https://en.wikipedia.org/wiki/Local_area_network
 [14]: http://www.uh.edu/engines/nycandwires.jpg
 [15]: http://arstechnica.com/tech-policy/2011/03/the-essence-of-the-net/
 [16]: http://www.merriam-webster.com/dictionary/virtual
 [17]: https://en.wikipedia.org/wiki/IPsec
 [18]: https://en.wikipedia.org/wiki/Encapsulation_%28networking%29
 [19]: https://en.wikipedia.org/wiki/Transport_Layer_Security
 [20]: https://openvpn.net/index.php/open-source/333-what-is-openvpn.html
 [21]: https://www.infradead.org/openconnect/
 [22]: https://www.softether.org/
 [23]: http://www.spiegel.de/media/media-35529.pdf
 [24]: http://www.schneier.com/paper-pptpv2.html
 [25]: /pptp-vs-l2tp-vs-openvpn
 [26]: https://en.wikipedia.org/wiki/HTTPS
 [27]: http://arstechnica.com/security/2015/02/lenovo-pcs-ship-with-man-in-the-middle-adware-that-breaks-https-connections/
 [28]: https://en.wikipedia.org/wiki/Man-in-the-middle_attack
 [29]: http://googleonlinesecurity.blogspot.co.nz/2015/03/maintaining-digital-certificate-security.html?m=1
 [30]: http://csrc.nist.gov/groups/SMA/forum/documents/october-2012_fcsm_pturner.pdf
 [31]: https://openvpn.net/index.php/open-source/documentation/howto.html#pki
 [32]: http://security.stackexchange.com/questions/73469/tls-authentication-openvpn-mitm-attacks-on-public-wifi
 [33]: https://www.google.com/
 [34]: https://en.wikipedia.org/wiki/Domain_Name_System
 [35]: https://developers.google.com/speed/public-dns/docs/security?hl=en
 [36]: https://en.wikipedia.org/wiki/DNS_spoofing
 [37]: https://www.wikileaks.org/wiki/Alternative_DNS
 [38]: https://www.blackhat.com/docs/us-15/materials/us-15-Remes-Internet-Plumbing-For-Security-Professionals-The-State-Of-BGP-Security-wp.pdf
 [39]: https://en.wikipedia.org/wiki/Border_Gateway_Protocol
 [40]: https://blog.opendns.com/2015/06/18/bgp-and-the-system-of-trust-that-runs-the-internet-pt-1/
 [41]: https://www.bgpmon.net/blog/
 [42]: https://www.bgpmon.net/massive-route-leak-cause-internet-slowdown/
 [43]: http://www.bgpmon.net/chinese-isp-hijacked-10-of-the-internet/
 [44]: https://en.wikipedia.org/wiki/Null_route
 [45]: http://googleonlinesecurity.blogspot.com/2014/03/googles-public-dns-intercepted-in-turkey.html
 [46]: https://wiki.wireshark.org/OpenVPN
 [47]: https://blog.barracuda.com/2015/03/24/understanding-internet-protocol-security-ipsec/
 [48]: https://en.wikipedia.org/wiki/Deep_packet_inspection
 [49]: http://www.tcpipguide.com/free/t_IPDatagramEncapsulation.htm
 [50]: http://www.ab9il.net/crypto/openvpn-cloaking.html
 [51]: https://www.bestvpn.com/blog/5919/how-to-hide-openvpn-traffic-an-introduction/
 [52]: http://www.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man1/slogin.1?query=ssh&sec=1
 [53]: https://www.openssl.org/docs/manmaster/apps/openssl.html
 [54]: https://www.stunnel.org/index.html
 [55]: https://www.torproject.org/projects/obfsproxy.html.en
 [56]: https://forums.openvpn.net/topic12605.html
 [57]: https://www.wilderssecurity.com/threads/ways-to-obfuscate-vpn-connections.363059/
 [58]: https://en.wikipedia.org/wiki/Padding_%28cryptography%29
