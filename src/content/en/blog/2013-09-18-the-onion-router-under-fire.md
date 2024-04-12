---
title: The Onion Router under fire
authors: ["Dennis Kügler"]
categories: ["Privacy & Security"]
tags: ["Privacy"]
draft: false
date: 2013-09-18T19:06:59+00:00
url: /blog/the-onion-router-under-fire/
heroImage: /images-static/uploads/Tor-Proje.png
thumbnailImage: /images-static/uploads/Tor-Proje.png

---
Anonymity tool The Onion Router (TOR) has had a pretty rough few months, following confirmation that the FBI used an security flaw in the Tor Browser Bundle to install malware on its users' computers.

Despite offering our own privacy platform we're big supporters of TOR and think it's generally a secure platform to use (you can take a look at [some of our guides on TOR right here][1]). But this week's confirmation that [the FBI hacked TOR servers as part of an investigation][2] into child pornography is a good reminder that the platform does have its vulnerabilities. 

The target of the FBI's investigation was Irish-US citizen Eric Marques. The FBI described Marques as the "largest faciliator of child porn on the planet." According to the FBI, Marques operated Freedom Hosting, which hosted more than 100 child porn sites, which in turn supported thousands of members who had collectively posted millions of images. Freedom Hosting offered ".onion" domains that could only be reached via the Tor network.

In July the FBI seized control of Freedom Hosting and modified its sites to serve malware that targeted users of the [Tor Browser Bundle][3] (a version of Firefox customised for TOR use). The malware appeared to transmit the unique MAC address of infected PCs, allowing the FBI to identify users' IP addresses.

**TOR popular with bot nets**

The TOR Browser Bundle has since been fixed to protect users from the security flaw the FBI exploited. But TOR has faced more bad press with a report from the University of Luxembourg, which analysed TOR's traffic types. The [researchers used another exploit in TOR][4], which allowed the researchers to collect data on TOR users and see kind of content they were accessing via the network. The researchers say they achieved this "with only a moderate amount of resources."

The security flaw was fixed a few months ago, but the results of the research were not good publicity for TOR, which mainly promotes itself as a tool for online freedom activists and people living under censorious regimes. The researchers found the top five most popular TOR addresses belonged to botnet command and control servers. The researchers also found that in total there was balance between the number of hidden services with illegal content/activites and those devoted to human rights and freedom of speech. It's also worth noting that the research was only counting hidden TOR services. Many TOR users will obviously be using the platform to access regular, non-hidden, websites.

**Stay vigilant** 

Hopefully TOR hasn't been too damaged by these revelations and can continue to gain the trust of its users by rapidly fixing flaws and addressing concerns. But it's worth remembering that pretty much every privacy tool will have its vulnerabilities. If you want to achieve a great level of protection you should [probably look into combining platforms like TOR with a VPN][5].

 [1]: /privacy-guides/an-introduction-to-tor-vs-i2p/
 [2]: http://www.wired.com/threatlevel/2013/09/freedom-hosting-fbi/
 [3]: https://www.torproject.org/projects/torbrowser.html.en
 [4]: http://www.technologyreview.com/view/519186/security-flaw-shows-tor-anonymity-network-dominated-by-botnet-command-and-control/
 [5]: /privacy-guides/why-use-tor-with-a-vpn-service/