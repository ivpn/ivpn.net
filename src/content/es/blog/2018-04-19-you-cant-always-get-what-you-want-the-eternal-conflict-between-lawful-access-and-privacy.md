---
title: "You can't always get what you want: the eternal conflict between lawful
  access and privacy"
# Example: /blog/this-is-a-good-post
url: /blog/you-cant-always-get-what-you-want-the-eternal-conflict-between-lawful-access-and-privacy/
draft: false
authors:
  - mirimir
categories:
  - Privacy & Security
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - Privacy
date: 2018-04-19T20:47:36.000Z
# 740px X 740px
thumbnailImage: /images-static/uploads/law-vs-privacy.png
---
In late March, the US Clarifying Lawful Overseas Use of Data Act (CLOUD Act) [took effect][1]. And predictably, the US Supreme Court [just dismissed][2] United States v. Microsoft Corp. In that case, Microsoft was fighting a subpoena for data stored in an Irish data center. And now its objection is moot, because the CLOUD Act stipulates:

> A [service provider] shall comply with the obligations of this chapter to preserve, backup, or disclose the contents of a wire or electronic communication and any record or other information pertaining to a customer or subscriber within such provider's possession, custody, or control, regardless of whether such communication, record, or other information is located within or outside of the United States.

This is bad news, for sure. But it's no surprise, in the current environment. With all those terrorists and criminals to worry about. And when it's the feds vs Microsoft, Congress can just change the law. And this is obviously not just about the US. Russia demanded access to encrypted Telegram messages, Telegram refused, and now Russia has [blocked][3] Telegram, plus many other services and websites that rely on Google and Amazon hosting.

Anyway, the CLOUD Act was arguably the US response to [outreach][4] from the EU:

> A senior Commission official said on Thursday (9 November) that the EU executive suggested creating a new EU-US arrangement that would allow police to access data from companies that may be located in other jurisdictions. EU officials made that proposal to US Attorney General Jeff Sessions in June, during a joint EU-US justice ministerial meeting in Malta last June, but have not yet received a response from Sessions' office.

Although the EU doesn't have its new rules yet, it just released a [detailed proposal][5]. In contrast to the 2006 Data Retention Directive, which the EU Court of Justice [annulled][6] in 2014, the current proposal would reportedly mandate preservation <u>only</u> of specific data, upon order of [judicial authorities][7]. It would also enable said judicial authorities to issue EU-wide production orders, requiring response "within 10 days, and within 6 hours in cases of emergency". And one expects that this fast-track data sharing will soon include the US.

So in 1996, John Perry Barlow issued "A Declaration of the Independence of Cyberspace". And in 2016, he [said][8]:

> I will stand by much of the document as written. I believe that it is still true that the governments of the physical world have found it very difficult to impose their will on cyberspace. Of course, they are as good as they ever were at imposing their will on people whose bodies they can lay a hand on, though it is increasingly easy, as it was then, to use technical means to make the physical location of those bodies difficult to determine.

Perhaps understandably, "the governments of the physical world" are concerned. I mean, terrorists and criminals! And so there's an NGO for that, the [Internet & Jurisdiction Policy Network][9]:

> The Internet & Jurisdiction Policy Network addresses the tension between the cross-border nature of the internet and national jurisdictions. Its Paris-based Secretariat facilitates a global multistakeholder process to enable transnational cooperation. Participants in the Policy Network work together to preserve the cross-border nature of the Internet, protect human rights, fight abuses, and enable the global digital economy. Since 2012, the Internet & Jurisdiction Policy Network has engaged more than 200 key entities from six stakeholder groups around the world.

Whatever role the I&J Policy Network plays in practice, their [Retrospect][10] database is very informative:

> Retrospect is the flagship, open-access publication of the Internet & Jurisdiction policy network, documenting policy developments, judicial decisions, international agreements, and other cases that reflect jurisdictional tensions on the cross-border internet. Retrospect is supported by the I&J Observatory.

Police count on their ability to intercept the communications of suspects. In the US, that supposedly requires a search warrant, which judges issue based on other evidence. For the US Postal Service, this is called a ["mail cover"][11]. Sealed domestic first-class mail supposedly can't be opened without a search warrant. But only administrative approval is required for inspection of other mail, and all external information (addresses, postmarks, etc) can be recorded. International mail has often been opened for inspection, however.

For communications generally, this process is termed [lawful intercept][12]. The US [Communications Assistance for Law Enforcement Act (CALEA)][13] mandates that telecommunication service providers must support lawful intercept (aka wiretap) for telephone, VoIP, email and other Internet traffic. Telecommunication equipment generally includes built-in interfaces to support CALEA.

In the early 1990s, when CALEA was enacted, that was enough. But in the 1970s, academic research into strong cryptography had [accelerated][14]. It was no longer the province of government agencies. And by the mid 1990s, with the microcomputer revolution, strong encryption was on the way to becoming the norm for telecommunications.

CALEA had grown out of concerns about communications "going dark", given the shift to digital telephony, and the resulting technical complexity of wiretaps. They were no longer just about telephone wires and alligator clips. But now everyone and their little yellow dog can use strong encryption. What's an honest cop to do?

The answer was [key escrow][15]. We could all have our securely encrypted telecommunications, but governments (and employers, but that's a separate issue) would have the private keys, enabling lawful intercept. In the US, the NSA developed the [Clipper chip][16], to implemented key escrow. The Clinton administration [supported][17] it: "Our policy is designed to provide better encryption to individuals and businesses while ensuring that the needs of law enforcement and national security are met."

But the Electronic Privacy Information Center (EPIC) and the Electronic Frontier Foundation (EFF) — and more generally, the nascent Silicon Valley sector — opposed the Clipper chip. They argued that development and commercialization of the Internet depended on privacy through secure encryption. And if the US hobbled its Internet sector, it would lose out to foreign competitors. And that was enough to kill the proposal.

After the Clipper Chip went down, it seems that LEA took another track. They got friendlier with the NSA. In 1982, the Reagan administration created the [South Florida Drug Task Force][18], comprising agents from the DEA, FBI, "the Customs Service, the Coast Guard and other agencies". Just what those "other agencies" were isn't clear. But in 1994, the DEA created the [Special Operations Division (SOD)][19]. And it clearly includes the NSA. For more about SOD, see [Online Privacy Through OPSEC and Compartmentalization: Part 3][20].

Also, based on documents from Edward Snowden's trove, it appears that the NSA redoubled efforts to [compromise][21] commercial encryption systems, and to [weaken][22] the encryption standards that underlie them. For example, it's been claimed that the NSA influenced the RSA Corp. to [weaken][23] the "extended random" feature in RSA's BSAFE crypto library.

In any case, the debate over the conflicting needs for lawful intercept and telecommunications privacy has continued. Also, in recent years, strong encryption on devices, especially iPhones, has become far more common. And police, of course, expect lawful access to everything. Just as they've always had lawful access to safes. Because there's no safe that can't be brute forced. So governments still want [key escrow][24]. In 2011, the FBI launched the ["Going Dark"][25] initiative. And, notwithstanding the evident insecurity of key escrow, they seek some [magical][26] alternative. FBI Director Christopher Wray denies that "it's impossible" to solve "going dark" while protecting privacy. Congress is [working][27] on it. But the NSA is still there as backup, and now it's [not even a secret][28].

So hey, keep your eye on the I&J Policy Network's [Retrospect][10] database.

**Edit**

A few hours after this post went live, I searched Google, to see if it had been indexed yet. And I found this 2016 [paper][29] by Stephanie K. Pell: "You Can't Always Get What You Want: How Will Law Enforcement Get What it Needs in a Post-CALEA, Cybersecurity-Centric Encryption Era?" Sadly, I didn't find it while researching the post. Because it's a great paper. And she has great taste in titles. I only found it because I searched for "you can't always get what you want lawful access privacy".

She's a former prosecutor from Florida. Her paper uses, as an example, a case that she handled in ~2000, involving gun smuggling by the IRA. She argues that investigators have become accustomed to getting electronic data through CALEA etc. And more and more, that this has amounted to electronic mass surveillance. 

She agrees with security experts that maintaining such lawful access, against pervasive "strong" encryption, would require the introduction of vulnerabilities. Such as backdoors or key escrow. And that this would expose users to malicious adversaries. She points out that the privacy vs lawful access debate is really just about competing perspectives on security. And that it's unclear "what law enforcement actually needs".

Her paper came out before the The Shadow Brokers dumped all those hacking tools from the NSA. And that's the canonical example. If the bloody NSA can't keep its stuff secured, what hope would there be for securely maintaining massive key-escrow databases? There could be a system-wide encryption compromise. She argues that this would be an unacceptable risk, and that investigators will need to get data on a case-by-case basis. Just as they did when she was a prosecutor.

She does raise disturbing aspects of IoT devices.

> Moreover, the IoT adds to the metadata-rich investigative environment available to law enforcement. Because most metadata is difficult to encrypt and is likely to remain unencrypted for the foreseeable future, it will continue to enhance law enforcement capabilities.

Basically, she points out that IoT devices are user-installed bugs. 

> IoT and its ever-expanding networked sensors may provide platforms and apertures for viewing activities and recording communications content.

She argues that investigators can compel access to IoT data held by providers. And indeed, Amazon [released][30] Echo data last year to investigators in Arkansas, regarding a murder case. She also notes the potential for "lawful hacking" of insecure IoT devices. Consider the [Mirai botnet][31].

She also raises the possibility of lawful hacking for smartphones, "infecting them with malware capable of capturing voice communications and keystrokes before they are encrypted." And that brings to mind the FBI's use of [network investigative techniques][32]. And of course, all those NSA tools.

But that's better, she argues, than mass surveillance. And I can't help but agree.

 [1]: https://www.eff.org/deeplinks/2018/03/responsibility-deflected-cloud-act-passes
 [2]: https://www.supremecourt.gov/opinions/17pdf/17-2_1824.pdf
 [3]: https://www.nytimes.com/2018/04/18/world/europe/russia-telegram-shutdown.html
 [4]: https://www.euractiv.com/section/data-protection/news/commission-wants-to-extend-law-for-police-data-access-to-the-us/
 [5]: http://europa.eu/rapid/press-release_IP-18-3343_en.htm
 [6]: https://www.europarl.europa.eu/legislative-train/theme-area-of-justice-and-fundamental-rights/file-data-retention-directive-annulled
 [7]: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2616397
 [8]: https://www.economist.com/news/international/21690200-internet-idealism-versus-worlds-realism-how-john-perry-barlow-views-his-manifesto
 [9]: https://www.internetjurisdiction.net/
 [10]: https://www.internetjurisdiction.net/publications/retrospect
 [11]: https://en.wikipedia.org/wiki/Mail_cover
 [12]: https://en.wikipedia.org/wiki/Lawful_interception
 [13]: https://en.wikipedia.org/wiki/Communications_Assistance_for_Law_Enforcement_Act
 [14]: https://en.wikipedia.org/wiki/History_of_cryptography
 [15]: https://en.wikipedia.org/wiki/Key_escrow
 [16]: https://en.wikipedia.org/wiki/Clipper_chip
 [17]: https://epic.org/crypto/clipper/gore_statement_feb_94.html
 [18]: https://www.nytimes.com/1986/09/04/us/4-year-fight-in-florida-just-can-t-stop-drugs.html
 [19]: http://www.reuters.com/article/us-dea-sod-idUSBRE97409R20130805
 [20]: /privacy-guides/online-privacy-through-opsec-and-compartmentalization-part-3/
 [21]: https://www.spiegel.de/international/germany/inside-the-nsa-s-war-on-internet-security-a-1010361.html
 [22]: https://www.propublica.org/article/the-nsas-secret-campaign-to-crack-undermine-internet-encryption
 [23]: https://blog.cryptographyengineering.com/2017/12/19/the-strange-story-of-extended-random/
 [24]: https://www.publicsafety.gc.ca/cnt/rsrcs/pblctns/fv-cntry-mnstrl-2017/index-en.aspx
 [25]: https://www.fbi.gov/services/operational-technology/going-dark
 [26]: https://arstechnica.com/tech-policy/2018/03/fbi-again-calls-for-magical-solution-to-break-into-encrypted-phones/
 [27]: https://www.theregister.co.uk/2018/04/09/us_encryption_backdoors/
 [28]: https://www.theregister.co.uk/2017/01/12/obama_nsa_sigint_fbi_dea/
 [29]: https://scholarship.law.unc.edu/cgi/viewcontent.cgi?article=1306&context=ncjolt
 [30]: https://www.pbs.org/newshour/nation/amazon-releases-echo-data-murder-case-dropping-first-amendment-argument
 [31]: https://blog.cloudflare.com/inside-mirai-the-infamous-iot-botnet-a-retrospective-analysis/
 [32]: https://en.wikipedia.org/wiki/Network_Investigative_Technique