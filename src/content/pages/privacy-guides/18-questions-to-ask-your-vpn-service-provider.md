---
title: 18 Questions to ask your VPN Service provider
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/18-questions-to-ask-your-vpn-service-provider/
section: Basic
weight: 10
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
date: 2021-10-26T10:46:16+00:00
layout: guides-details
---
### Introduction

Choosing a VPN service can be a nerve–wracking ordeal. You've probably read about the Snowden leaks and NSA related revelations. You probably don't trust your ISP to protect your privacy (and as the [FTC recently concluded](https://www.ftc.gov/system/files/documents/reports/look-what-isps-know-about-you-examining-privacy-practices-six-major-internet-service-providers/p195402_isp_6b_staff_report.pdf), you really shouldn't). Perhaps you don't trust your government. You may even distrust all governments and corporations.

Indeed, you may not trust this guide, and think that it's just an advertorial. While that's an understandable concern, I invite you to read on, and judge for yourself. I also invite you to read this in the context of my other writings about VPNs, Tor and such, primarily on [Wilders Security Forums][1] and [Tor.StackExchange][2].

If you're especially concerned about privacy, you may want to obscure your research about VPN providers. Although many people use VPN services, extensive research might flag you as someone with something important to hide. You can mitigate that risk by using a free VPN service at this step (such as [Calyx VPN](https://calyxinstitute.org/projects/digital-services/vpn)) and free webmail (such as [VFEmail](https://vfemail.net/)). For even better privacy, you can add the [Tor Browser Bundle][3] to tunnel Tor through CalyxVPN, and use [VFEmail's hidden service][4].

Relatively little reliable and trustworthy information about VPN services is available online. It's generally best to ignore 'best VPN' and 'VPN review' sites. Most feature paid reviews, and some are protection rackets, featuring bad reviews for VPN services that refuse to buy favorable reviews. Even the honest ones are typically just popularity contests, dominated by clueless torrent users and wannabe 'hackers'. If you ever need to get information from a dedicated VPN review source look for those that don't use affiliate parameters on outgoing links (or even better, remove referer information).


### TorrentFreak's Surveys

TorrentFreak's VPN surveys are notable exceptions to the norm. In late 2011, it became clear that Luzlsec member 'Recursion' had been identified and arrested based on connection logs that the VPN service HideMyAss provided to the FBI. TorrentFreak responded by publishing ['Which VPN Service Providers Really Take Anonymity Seriously?'][5] (now rephrased as "Which VPN Providers Really Take Privacy Seriously?"). This Q&A has been updated yearly since the original version, now supplying unedited answers to 12 privacy-related questions.

These are the following (as of 2021): 

1. Do you keep (or share with third parties) ANY data that would allow you to match an IP-address and a timestamp to a current or former user of your service? If so, exactly what information do you hold/share and for how long?
2. What is the name under which your company is incorporated (+ parent companies, if applicable) and under which jurisdiction does your company operate?
3. What tools are used to monitor and mitigate abuse of your service, including limits on concurrent connections if these are enforced?
4. Do you use any external email providers (e.g. Google Apps), analytics, or support tools ( e.g Live support, Zendesk) that hold information provided by users?
5. In the event you receive a DMCA takedown notice or a non-US equivalent, how are these handled?
6. What steps would be taken in the event a court orders your company to identify an active or former user of your service? How would your company respond to a court order that requires you to log activity for a user going forward? Have these scenarios ever played out in the past?
7. Is BitTorrent and other file-sharing traffic allowed on all servers? If not, why? Do you provide port forwarding services? Are any ports blocked?
8. Which payment systems/providers do you use? Do you take any measures to ensure that payment details can’t be linked to account usage or IP-assignments?
9. What is the most secure VPN connection and encryption algorithm you would recommend to your users?
10. Do you provide tools such as “kill switches” if a connection drops and DNS/IPv6 leak protection? Do you support Dual Stack IPv4/IPv6 functionality?
11. Are any of your VPN servers hosted by third parties? If so, what measures do you take to prevent those partners from snooping on any inbound and/or outbound traffic? Do you use your own DNS servers?
12. In which countries are your servers physically located? Do you offer virtual locations?

Introducing their results, they note:

> Choosing the right VPN can be a tricky endeavor. There are hundreds of VPN services out there, all promising to keep you private but some are more private than others. To help you pick the best one for your needs, we asked dozens of VPNs to detail their logging practices, how they handle torrent users, and what else they do to keep you as anonymous as possible.

This is arguably a fairly comprehensive starting list. TorrentFreak staff seem dedicated and knowledgeable, and their earlier surveys attracted the attention of many providers that had been omitted. But there are two key limitations. First, more obscure and low-key privacy-friendly VPN services don't appear on the TorrentFreak lists (e.g. cryptostorm). Some providers don't cater to BitTorrent users and have no motivation to appear on this list. Second, TorrentFreak is, for the most part, merely summarizing VPN providers' responses, and has not verified any of their claims. Comments in both reviews are also worth reading, by the way, but can't always be taken seriously.

Even so, revelations about three providers – EarthVPN.com, Proxy.sh and PureVPN – demonstrate the risk of relying on providers' privacy claims. In early 2013, an EarthVPN customer was reportedly arrested based on logs kept by its hosting provider in the Netherlands. EarthVPN denied responsibility, maintaining that they 'do not keep logs', and said that they no longer use that provider. Although the actual dialog between EarthVPN and its customer ([here](http://lowendtalk.com/discussion/11348/problems-with-my-life-situation/) and [here](http://lowendtalk.com/discussion/11348/problems-with-my-life-situation/p2)) is no longer openly accessible, there are quotes and discussion in the [AirVPN](https://airvpn.org/topic/9958-importance-of-partition-of-trust-for-critical-data-exchanges/)  forums.  Also, keep in mind that ISPs can log as easily as hosting providers can.

In TorrentFreak's 2011 and 2013 surveys, Proxy.sh responded: 'No information whatsoever is being recorded or held in our facilities. Our services are run from RAM and all our system services come with state-of-the-art configuration that ensures nothing is left after usage.' However, in late September 2013, they installed Wireshark on one of their US servers, and retained packet captures for several hours. This was reportedly a voluntary response to complaints about hacking and harassment by one of their customers. For more specifics, see these TorrentFreak articles ([here](https://torrentfreak.com/proxy-sh-vpn-provider-monitored-traffic-to-catch-hacker-130930/) and [here](https://torrentfreak.com/vpns-is-it-ok-to-monitor-bad-users-on-ethical-grounds-131006/)). In TorrentFreak's 2014 survey, Proxy.sh answered as follows to the first question:

> We do not keep any logs and we do not record any IP-address, headers or anything. In terms of time stamp, we only record those associated with support tickets creation and update (invoices and renewals are only recorded by date) for management purposes. The only personal information we do record is an email address and a payment type, that corresponds to either the word “Money” or “Bitcoin”. This is made clear in our privacy policy. Our system will also hold services credentials, namely the account password and network login/password pair. All this data can be permanently removed at any time on customer’s request. All other data and information involved in our operations (connections, traffic, etc.) is neither monitored nor recorded.

A more recent example of VPN provider caught lying about keeping no logs came in 2017. As reported in [BleepingComputer](https://www.bleepingcomputer.com/news/security/cyberstalking-suspect-arrested-after-vpn-providers-shared-logs-with-the-fbi/) the FBI have arrested a cyberstalking suspect with the help of IP address logs obtained from PureVPN. PureVPN claimed (and still claims) they keep no logs about customer activities. 

Conversely, these incidents also demonstrate that news spreads very quickly on the Internet. With all of that in mind, I recommend starting with VPN services that meet the following criteria:

  1. It appears in TorrentFreak's survey (adding others to your shortlist that you think were improperly omitted).
  2. It's not listed as logging in TorrentFreak's surveys.
  3. It has been in business for at least three years.
  4. An hour or so of Web searching reveals no evidence of privacy violations.

Further positive signals you can look for:

  5. Open source VPN applications.
  6. Publicly available audit results from independent, third-party auditors that investigate no-logs claims. Audits however, are constrained by their scope and provide only a temporary view, they are not persistent proofs about claims. 

All of the VPN services in TorrentFreak's recent survey deny keeping persistent logs. Assessing the plausibility of such claims in the context of pursuant data-retention requirements is a can of worms. Claims that there are no data-retention requirements in the US seem laughable in light of NSA documents released by Edward Snowden. The situation in Europe is complicated since the passing of GDPR and tensions between the 1995 Data Protection Directive and national legislations. The exact extent of NSA spying and EU collaboration with US operations is unknown and adds more uncertainty. For more about this issue generally, see [EFF's summary page][7].

### Presales Questions

In focusing your search, it's important to select VPN providers that support your specific privacy goals. I recommend carefully browsing providers' websites, and carefully reading their terms of service and privacy policy. Look for clear and unambiguous language, and be suspicious of legalese boilerplate.

For example, if you plan to share copyrighted media via BitTorrent, it's obviously best to avoid providers that explicitly discourage such use. If the availability of numerous exit IP addresses is important, choose accordingly, but consider the tension between variety and security. It's arguably more likely that providers with numerous exits are using virtual private servers.

In contacting providers with presales questions, start with basic questions, such as #1, #3, #5 and #7 from the TorrentFreak list. It's generally best to ask questions for which you have reliable and independent answers. However, at least initially, it's also best to ask without revealing what you've already learned.

How prospective VPN providers answer your questions can be as informative as the answers they give. You want answers that are prompt, complete, clear and accurate. Vague or incorrect answers to technical questions imply dishonesty and/or incompetence. Delayed answers don't bode well for future customer support.

Here are some additional questions that you might ask, followed by expected answers and explanations. For technical questions, the OpenVPN [manual][9] and [How-to][10], and WireGuard's (official page)[https://www.wireguard.com] are useful resources.

  1. [Is there a monthly bandwidth-usage limit?][11]
  2. [Do you throttle connections that use excessive bandwidth?][12]
  3. [How many concurrent connections are allowed per account?][13]
  4. [How many hops are there in your VPN connections?][14]
  5. [What type(s) of VPN encryption do you use? Why?][15]
  6. [Do you support perfect forward secrecy? If so, how?][16]
  7. [Do you provide users with Diffie Hellman key files?][17]
  8. [How do you authenticate clients – certificates/keys, or usernames/passwords?][18]
  9. [Do you employ HMAC-Based TLS Authentication? If so, why?][19]
 10. [Do you ever email usernames and passwords to customers?][20]
 11. [Does each customer have a unique client certificate and key?][21]
 12. [Are your VPN gateway servers hosted, co-located or in-house?][22]
 13. [Are any of your VPN gateway servers running on VPS or cloud servers?][23]
 14. [How are your VPN gateway servers protected?][24]
 15. [Where is user account information stored?][25]
 16. [How is communication between servers secured?][26]
 17. [Do you allow port forwarding by users?][27]
 18. [Are all client ports ever forwarded by default? If so, on which servers?][28]

### Answers

  1. {{< raw-html >}} {{< raw-html >}} <a name="q1"></a> {{< / raw-html >}}  {{< / raw-html >}} **Is there a monthly bandwidth-usage limit?** This restriction has become less common in recent years. Some providers use them for free tiers so prospective customers can sample their service before committing to a paid plan.  Usage limits for paid subscriptions are more common for VPN resellers, so it's probably best to avoid providers that impose them.
  2. {{< raw-html >}} <a name="q2"></a> {{< / raw-html >}} **Do you throttle connections that use excessive bandwidth?** The best answer here depends on your goals. It's natural to want the fastest possible connections. However, if you have a very fast ISP link, you might be moving far more traffic than anyone else sharing your VPN exit. And that reduces your anonymity.
  3. {{< raw-html >}} <a name="q3"></a> {{< / raw-html >}} **How many concurrent connections are allowed per account?** For VPN services with many exits, it's sometimes convenient to simultaneously work as multiple pseudonyms, each using its own exit. Also, you may want to simultaneously connect from multiple devices. However, this also facilitates account-sharing abuse, which may overload VPN servers and slow your connections.
  4. {{< raw-html >}} <a name="q4"></a> {{< / raw-html >}} **How many hops are there in your VPN connections?** Most VPN services offer just one-hop connections. That is, you connect to a VPN gateway server, and your traffic exits to the Internet from the same server, or perhaps from another server on the same local network. With one-hop connections, it's easy for adversaries to log traffic entering and leaving the VPN server.
  5. {{< raw-html >}} <a name="q5"></a> {{< / raw-html >}} **What type(s) of VPN encryption do you use? Why?** OpenVPN can operate in two distinct modes. One authenticates and encrypts using a shared static key. While that's very simple to set up, key compromise allows an adversary to decrypt all prior traffic. No reputable provider uses this. But if you receive just one key file from a provider, open it in a text editor, and look at the last line. If it includes 'CERTIFICATE', you're OK. But if it includes 'KEY', request a refund.The other OpenVPN mode uses SSL/TLS as a control channel, and encrypts the data channel with periodically changing static keys. If an adversary manages to compromise one of those data-channel keys, they can decrypt only that traffic, and not any past or future traffic. In other words, there is 'perfect forward secrecy'. By default, OpenVPN uses 1024-bit RSA for the certificates that authenticate SSL/TLS control-channel handshakes, and BF-CBC (128-bit) as the data-channel cipher. This is probably good enough in most cases, given perfect forward secrecy. However, it's arguable that providers using 2048-bit RSA and AES-256-CBC (256-bit) are generally more security conscious. 
  Both BF-CBC and AES-256-CBC operate in Cipher Block Chaining (CBC) mode. If your provider uses something else (CFB, OFB, etc) they're either incompetent or have some very good reason. Ask them.\
  New-kid-on-the-block VPN protocol WireGuard has seen a rapid adoption among VPN providers recently. The protocol was not designed with commercial VPN services and their privacy considerations in mind. Capable providers need to demonstrate they have solutions to the following problems: 1. Public IP address of peers are stored in memory (e.g. adding key management that deleted/reinstates configuration) 2. Tunnel IP address allocation/rotation (e.g. using backend calls generating new IP adresses that are distributed to all servers) 3. No perfect forward secrecy (e.g. use automatic key pair regeneration in regular time intervals).
  6. {{< raw-html >}} <a name="q6"></a> {{< / raw-html >}} **Do you support perfect forward secrecy? If so, how?** Any provider using OpenVPN in SSL/TLS mode provides perfect forward secrecy. Additional hand waving beyond that should make you suspicious. As noted before, WireGuard implementation requires specific measures to support forward secrecy. 
  7. {{< raw-html >}} <a name="q7"></a> {{< / raw-html >}} **Do you provide users with Diffie Hellman key files?** T his is a trick question. It's true that OpenVPN uses static Diffie Hellman key files in providing perfect forward secrecy. But that static Diffie Hellman key file ('dh1024.pem' or 'dh2048.pem') is needed only on the server. Any provider that supplies them to users is incompetent.
  8. {{< raw-html >}} <a name="q8"></a> {{< / raw-html >}} **How do you authenticate clients – certificates/keys, or usernames/passwords?** In SSL/TLS mode, OpenVPN clients authenticate servers by checking whether a server has a certificate signed by the certificate authority certificate ('a.crt') that the provider has given them. OpenVPN supports two methods for servers to authenticate clients. One relies on certificates and keys (such as 'client.crt' and 'client.key'). The other relies on usernames and passwords (via auth-user-pass). Servers can use both, but that borders on overkill. For point-to-point connections, where full network access may be at stake, it's very important for servers to authenticate clients using certificates and keys. For VPN services, that's not an issue, because clients just get to see the Internet. Also, for VPN services, giving each client a unique certificate is a privacy risk.
  9. {{< raw-html >}} <a name="q9"></a> {{< / raw-html >}} **Do you employ HMAC-Based TLS Authentication? If so, why?** With TLS authentication enabled (via tls-auth), servers ignore SSL/TLS handshake packets from clients that lack the correct HMAC signature. This feature protects VPN servers from DoS attacks, port scanning and other exploits. If implemented, providers may supply a key (typically 'ta.key') or one can be negotiated on the fly. This is partly a trick question. Any provider claiming that this is essential for perfect forward secrecy is either dishonest or incompetent.
  10. {{< raw-html >}} <a name="q10"></a> {{< / raw-html >}} **Do you ever email usernames and passwords to customers?** This is a dangerous practice, but primarily for the provider. Adversaries that compromise usernames and passwords in transit can obtain free access, or even lock out paying users by changing passwords. There's also the risk that adversaries could implicate users in criminal activity.Even so, if you successfully change your password immediately after receipt, you're safe. If you can't login to change the password, complain and demand a new account. For providers that are otherwise attractive, I don't consider this a fatal error.
  11. {{< raw-html >}} <a name="q11"></a> {{< / raw-html >}} **Does each customer have a unique client certificate and key?** This is another trick question. Privacy-friendly answers are using the same client certificate for all customers, or not providing one at all, and relying on username and password for authentication.It might seem like a good idea for each user to have their own certificate and key. And that's true in an enterprise context. But for VPN services it's very dangerous, because it potentially links user accounts to logged traffic. Some providers explain that they issue unique client certificates in order to facilitate nuking evil clients. However, it's just as easy to do that with usernames, and usernames are arguably more readily repudiated than certificates If this is a key issue for you, it's easy to test by purchasing two short-term subscriptions, paying with Bitcoins via Tor, and using temporary email addresses from [anonbox](https://anonbox.net/) etc.
  12. {{< raw-html >}} <a name="q12"></a> {{< / raw-html >}} **Are your VPN gateway servers hosted, co-located, or in-house?** This is partially a trick question. I would be very suspicious of any VPN provider claiming that its servers are managed in-house. You could ask how they cover the cost of maintaining facilities with high-speed uplinks in multiple countries. The best plausible answer is that they build their own servers, and ship them to co-location facilities. Give extra points for server hardening. Typical physical hardening measures include embedding RAM in silicone rubber or thermal adhesive, and disabling USB ports.The most likely acceptable answer is that they use hosted dedicated servers. Give extra points for server hardening, such as using full-disk encryption, and keeping short-term logs in RAM (tempfs).
  13. {{< raw-html >}} <a name="q13"></a> {{< / raw-html >}} **Are any of your VPN gateway servers running on VPS or cloud servers?** Providers should never deploy VPN gateway servers on virtual private servers (VPS) or cloud servers. Being virtual machines, they are fully controlled by the host operating system, and all activity and data is readily available through the host. Providers should always use dedicated servers that have been properly secured against unauthorized access.
  14. {{< raw-html >}} <a name="q14"></a> {{< / raw-html >}} **How are your VPN gateway servers protected?** VPN services typically need servers playing three roles. There are gateway servers that establish VPN connections with clients, and also route client traffic to the Internet. For one-hop connections, one server may handle all of that. There are servers that host the service's website. And there are servers that manage user account information, and provide authentication services to gateway servers and web servers. All client traffic is routed through the gateway servers. Unless those servers are adequately secured, adversaries could compromise them, and so compromise users' privacy by logging their traffic. VPN gateway servers should be hardened according to industry standards such as the [CIS benchmarks][30] or the [NSA baseline guides][31].Most importantly, VPN gateway servers should not be running other network services, such as website hosting, or user accounting and authentication. Doing so substantially increases VPN gateway servers' attack service. You can verify what ports and services are accessible on a VPN gateway by using a port scanner such as nmap. However, keep in mind that many providers expose VPN servers on non-standard ports such as 80 (HTTP) and 443 (HTTPS) to evade firewall blocking.
  15. {{< raw-html >}} <a name="q15"></a> {{< / raw-html >}} **Where is user account information stored?** Providers should ideally be storing this information on colocated or in-house servers that are suitably encrypted, hardened and protected against adversaries. Also, they should be segregating authentication data, which must be available to gateway servers, from accounting data, which may include users' private information, such as usage logs, email addresses and payment records.
  16. {{< raw-html >}} <a name="q16"></a> {{< / raw-html >}} **How is communication between servers secured?** Well designed VPN services comprise networks of specialized servers with distinct roles that communicate securely with each other. For example, gateway servers must contact authentication servers to verify that users are authorized to connect. There are also backend provisioning systems that use rely on sales data from websites to create and update user accounts, and then update the authentication servers. Given the sensitivity of this data, and its value to adversaries, all communication among these servers must be securely encrypted. Most commonly, this relies on persistent OpenVPN or IPSec tunnels between servers.
  17. {{< raw-html >}} <a name="q17"></a> {{< / raw-html >}} **Do you allow port forwarding by users?** When you are connected to a VPN service, the VPN gateway server protects your device from potentially hostile incoming connections in the same way that your LAN router or firewall does. However, allowing incoming connections on particular ports is essential for operating servers, or for participating in P2P networks where your node must be visible to other nodes. That process is called port forwarding. When port forwarding is enabled, your device is directly exposed to the Internet on the ports that have been forwarded, with no protection by the VPN service. An adversary may successfully exploit a vulnerability in a service that's listening on a forwarded port, and compromise your device. In addition to typical consequences such as botnet membership and data theft, an adversary may compromise your privacy and anonymity by 'phoning home' when when you're not using the VPN service.
  18. {{< raw-html >}} <a name="q18"></a> {{< / raw-html >}} **Are all client ports ever forwarded by default? If so, on which servers?** Some VPN services forward all client ports by default. Some do so only on designated servers. For some services, it appears that port forwarding varies among servers with no pattern or documentation. Although it's possible to check for this using port scanning, it's complicated by the fact that many different clients using the same exit IP address may have the same ports forwarded.

 [1]: https://www.wilderssecurity.com/
 [2]: https://tor.stackexchange.com/
 [3]: https://www.torproject.org/projects/torbrowser.html.en
 [4]: http://344c6kbnjnljjzlz.onion/
 [5]: https://torrentfreak.com/which-vpn-providers-really-take-anonymity-seriously-111007/
 [7]: https://www.eff.org/issues/mandatory-data-retention/
 [9]: https://openvpn.net/index.php/open-source/documentation/manuals/65-openvpn-20x-manpage.html
 [10]: https://openvpn.net/index.php/open-source/documentation/howto.html
 [11]: #q1
 [12]: #q2
 [13]: #q3
 [14]: #q4
 [15]: #q5
 [16]: #q6
 [17]: #q7
 [18]: #q8
 [19]: #q9
 [20]: #q10
 [21]: #q11
 [22]: #q12
 [23]: #q13
 [24]: #q14
 [25]: #q15
 [26]: #q16
 [27]: #q17
 [28]: #q18
 [30]: https://benchmarks.cisecurity.org/en-us/?route=downloads.browse.category.benchmarks.os.linux.redhat
 [31]: https://nsacyber.github.io/publications.html
