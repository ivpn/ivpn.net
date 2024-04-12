---
title: Collection of User Data by ISPs and Telecom Providers, and Sharing with Third Parties
authors: ["mirimir"]
categories: ["Privacy & Security"]
tags: ["Privacy"]
draft: false
date: 2018-03-15T08:47:49+00:00
url: /blog/collection-of-user-data-by-isps-and-telecom-providers-and-sharing-with-third-parties/
comments:
  - author: Customer
    date: 2018-03-21T15:27:49+01:00
    content: |
      Your open vpn settings dont include a certificate- this is lnt secure and needs to be adressed

---
There are some age-old questions among Internet users, especially those concerned about privacy. Basically, "Is my ISP watching me?", and "Is it sharing data about my online activity, such as search and browsing history, with third parties?" And back in the day, the analogous question was "Is the phone company listening?" Indeed, Bell Labs reportedly [suppressed][1] the telephone answering machine for 60 years, because it feared that recording technology would frighten away its customers.

Any service that provides Internet access (ISPs, Wi-Fi hotspots, and telecom providers) can obviously see what resources users are accessing. Unless data is encrypted, providers can also see the content. And even with encryption, [traffic patterns][2] provide some information about activity. Finally, all bets are off when the NSA, or another similarly resourceful TLA, is interested.

If you're living in China, especially in such areas of unrest as Tibet or Xinjiang, online privacy is an [fantasy][3]. But what about the US and EU, where privacy is supposedly protected?

Well, there's this funny difference between US and EU attitudes toward privacy. In the US, there's relatively little concern about commercial use of private data. I mean, consider the information that credit reporting services buy and sell. The massive [Equifax Data Breach][4] made that very clear. Also, providers of credit cards [sell user data][5] to online advertising firms. [Google][6] and [Facebook][7], for example, use such data to link online and meatspace activity.

On the other hand, there <u>is</u> concern about warrantless government access to such data. There's the Fourth Amendment. By law, Social Security numbers were not to be used as IDs. And there is no national ID card. Since 9/11, there's been government pressure for explicit access to more and more data. However, legislative efforts have failed, and there is still [no mandatory requirement][8] for data retention by Internet and telecom providers. Or by VPN providers, by the way. However, the government can access any data that has been retained, through normal warrants, or non-disclosable [National Security Letters][9] (NSLs).

Conversely, in the EU, there is great concern about commercial use of private data. There's the [Right to Be Forgotten][10]. And the [General Data Protection Regulation][11] (GDPR) will go into effect on May 25, 2018. It "was designed to harmonize data privacy laws across Europe, to protect and empower all EU citizens data privacy and to reshape the way organizations across the region approach data privacy." And "[i]t applies to all companies processing and holding the personal data of data subjects residing in the European Union, regardless of the company's location." Such personal data includes "name, a photo, an email address, bank details, posts on social networking websites, medical information, or a computer IP address." Basically, anything "that can be used to directly or indirectly identify the person." And consent must be unambiguous, not buried in "long illegible terms and conditions full of legalese".

However, there's far less concern about government access to such data. The 2006 [Data Retention Directive][12] (DRD) "compels all ISPs and telecommunications service providers operating in Europe to collect and retain a subscriber's incoming and outgoing phone numbers, IP addresses, location data, and other key telecom and Internet traffic data for a period of 6 months to 2 years." But in 2014, the EU Court of Justice [annulled][13] the 2006 DRD.

In response, the UK [enacted][14] the Data Retention and Investigatory Powers Act (DRIPA) in 2014. The EU Court of Justice also annulled that in 2016, and the UK proposed [amendments][15]. However, in January 2018, the court [ruled][16] those amendments insufficient.

It appears that EU members are generally reconciling their data retention laws for consistency with GDPR. However, notwithstanding annulment of the DRD, the EU apparently [won't apply][17] GDPR to law enforcement: "The European Commission hopes to set an international standard with its upcoming proposal to give police easier access to data from tech companies, and has already asked the United States to cooperate."

So anyway, let's focus on the US, where data retention by Internet and telecom providers directly exposes users to commercial exploitation, and indirectly exposes them to the government. ISPs have typically [retained][18] logs of IP address assignments, to insure that IP addresses can be linked to users.

Back in the day, it's my impression that traditional ISPs didn't retain very much data about users' online activity. Maybe it cost too much to store, and there weren't opportunities to monetize it. Or maybe they were afraid of customer backlash. But over the past decade or so, that has clearly changed. Development of the online advertising industry, which targets ads based on pervasive behavioral tracking, has provided opportunities. And it has [changed][19] everyone's expectations. With the rise of smartphones, [cell providers][20] know "where you are, what you're searching for and what you like". That is valuable data for advertisers, and Internet providers want to profit.

In late 2016, after many years of lobbying by privacy advocates, the Federal Communications Commission (FCC) agreed to [regulate][21] data use by ISPs and telecom providers. Use of such private data as browsing history and app usage would have required prior consent, but IP and MAC addresses would have remained fair game.

But in early April 2017, Congress and President Trump [repealed][22] those rules, months before they would have taken effect. Major ISPs and telecom providers supported the repeal, arguing that such firms as Google and Facebook would have remained unregulated. So now everyone can do as they like, subject only to public opinion, and complaints to the FCC.

That does work, sometimes. For example, MoviePass CEO Mitch Lowe [bragged][23] at the 2018 Entertainment Finance Forum that "We watch how you drive from home to the movies. We watch where you go afterwards." That generated considerable upset among privacy advocates. And shortly thereafter, MoviePass announced that it had [removed][24] those capabilities from its iOS app. Similarly, in late 2017, after protests and an [FTC complaint from EPIC][25], Uber [stopped][26] tracking its users after rides. But that's arguably less reliable than regulation. People can choose whether or not to use MoviePass or Uber, but there's typically little choice about Internet access, outside large cities.

Some major ISPs and telecom providers (AT&T, Comcast and Verizon) quickly [reassured][27] the public that they will not sell, and have never sold, users' private data. Of course, as noted above, they will provide it to the government as required by warrants and NSLs. But that's not why they fought for the right to collect it. Like Google and Facebook, they want to make money in the behaviorally targeted advertising market.

Third Door Media has this [chilling prediction][28] for 2018:

> In 2018, a growing threat to Google, and to a somewhat lesser extent Facebook, will be the ISPs and wireless providers such as AT&T, Charter, Comcast, Sprint, T-Mobile and Verizon. Verizon, with its ownership of Oath (the combination of AOL's ad tech and content properties and Yahoo's remnants), is probably best positioned to take advantage of the new anti-regulatory climate. Net neutrality was an obvious gift late this year. But the gifts started coming this past spring. In March, the Senate voted to reverse FCC privacy rules that would have limited ISP's ability to sell user data without consent — for ad targeting and other purposes. FCC Chairman (and former Verizon lawyer) Ajit Pai argued consumers would be confused if ISPs were held to different privacy standard than companies like Google and Facebook.
> 
> The breadth of data ISPs have on users through their internet and mobile behaviors is wide. It includes geolocation data, browsing data, listening and watching data, app usage data and other non-personally identifiable information (PII) that can be used to inform highly detailed user profiles. It's a marketer's dream playground, a privacy-minded consumer's nightmare.

Also, contrary to assurances, telecom providers are indeed [selling][29] "customers' personal information and real-time location to third parties". The unsecured APIs for data access have been taken down, but the [initial report][30] remains a frightening read:

> But what these services show us is even more alarming: US telcos appear to be selling direct, non-anonymized, real-time access to consumer telephone data to third party services — not just federal law enforcement officials — who are then selling access to that data.
> 
> Given the trivial "consent" step required by these services and unlikely audit controls, it appears that <u>these services could be used to track or de-anonymize nearly anyone with a cell phone in the United States with potentially no oversight</u>. [emphasis added]

And yes, [the FCC's action to end net neutrality][31] in December 2017 was another gift to Internet providers. Indeed, Internet access in the US may change dramatically this year. That's arguably a distinct issue from privacy, although it may be instrumental in the evolving role of ISPs and telecom providers in the online ad industry. That is, they can now [block][32] (or at least, slow) particular Internet traffic, affecting both content and ads. It further [strengthens][33] their position vs content providers, including Google etc. And against users.

So what can we do to protect our privacy?

Well, using a VPN service will prevent Internet providers from tracking and monetizing users' online activity. Because all they see is encrypted VPN packets. It will also prevent them from throttling or blocking particular websites or traffic types, except based on traffic volume and patterns. Internet providers could throttle or block VPN traffic, but VPN providers can obfuscate connections in various ways. Some providers use SSH or SSL tunneling. IVPN uses the obfsproxy framework, developed by the Tor Project to penetrate the Great Firewall of China (GFW) and such. It seems unlikely that US Internet providers will go as far as China does to block VPNs.

That's the good news. But perhaps the focus on throttling and blocking is misguided. There have been instances of that, following on [disputes][34] over peering fees and such. And VPNs could obviously protect against that, using obfuscation if necessary. However, it appears that AT&T's plans focus on [preferential treatment][35] of traffic from "data sponsors". While AT&T [claims][36] that it's "not interested in creating fast lanes and slow lanes on anyone's internet", other Internet providers haven't made such assurances about paid prioritization. It's hard to imagine how VPNs could help with that. Unless VPN providers paid for prioritization. Or unless VPNs <u>became</u> Internet providers. We can dream, right?

So anyway, by all means, use a VPN. If you really care about your privacy, use [nested VPN chains][37]. Plus Whonix for Tor, if it matters a lot. And [study OPSEC][38].

 [1]: https://io9.gizmodo.com/5691604/how-ma-bell-shelved-the-future-for-60-years
 [2]: https://en.wikipedia.org/wiki/Traffic_analysis
 [3]: https://www.engadget.com/2018/02/22/china-xinjiang-surveillance-tech-spread/
 [4]: https://clark.com/tag/equifax-data-breach/
 [5]: http://www.businessinsider.com/credit-cards-sell-purchase-data-to-advertisers-2013-4?IR=T
 [6]: https://www.washingtonpost.com/news/the-switch/wp/2017/05/23/google-now-knows-when-you-are-at-a-cash-register-and-how-much-you-are-spending/
 [7]: https://www.technologyreview.com/s/603283/how-facebook-learns-about-your-offline-life/
 [8]: https://www.eff.org/issues/mandatory-data-retention/us
 [9]: https://www.eff.org/issues/national-security-letters
 [10]: https://mashable.com/2018/02/27/right-to-be-forgotten-google-transparency-report/
 [11]: https://www.eugdpr.org/
 [12]: https://www.eff.org/issues/mandatory-data-retention/eu
 [13]: http://www.europarl.europa.eu/legislative-train/theme-area-of-justice-and-fundamental-rights/file-data-retention-directive-annulled
 [14]: http://www.legislation.gov.uk/ukpga/2014/27/contents/enacted
 [15]: https://www.theguardian.com/technology/2017/nov/30/police-to-lose-phone-and-web-data-search-authorisation-powers
 [16]: https://www.theguardian.com/uk-news...ruled-unlawful-appeal-ruling-snoopers-charter
 [17]: https://www.euractiv.com/section/data-protection/news/commission-wants-to-extend-law-for-police-data-access-to-the-us/
 [18]: https://torrentfreak.com/how-long-does-your-isp-store-ip-address-logs-120629/
 [19]: https://mashable.com/2008/01/03/isps-behavioral-advertising/
 [20]: http://money.cnn.com/2013/12/16/technology/mobile/wireless-carrier-sell-data/index.html
 [21]: https://www.epic.org/privacy/intl/data_retention.html
 [22]: https://www.usatoday.com/story/tech/news/2017/04/04/isps-can-now-collect-and-sell-your-data-what-know-internet-privacy/100015356/
 [23]: https://beta.techcrunch.com/2018/03/05/moviepass-ceo-proudly-says-the-app-tracks-your-location-before-and-after-movies/
 [24]: https://9to5mac.com/2018/03/07/moviepass-ios-privacy-update/
 [25]: https://epic.org/privacy/internet/ftc/uber/Complaint.pdf
 [26]: https://arstechnica.com/tech-policy/2017/08/uber-to-stop-tracking-customers-after-ride-is-over/
 [27]: https://www.engadget.com/2017/03/31/atandt-comcast-and-verizon-explain-that-they-dont-sell-your-brow/
 [28]: https://marketingland.com/digital-advertising-2018-trends-230473
 [29]: https://www.csoonline.com/article/3233211/security/mobile-carriers-sell-users-personal-information-to-third-parties.html
 [30]: https://medium.com/@philipn/want-to-see-something-crazy-open-this-link-on-your-phone-with-wifi-turned-off-9e0adb00d024
 [31]: https://www.theverge.com/2017/12/14/16776154/fcc-net-neutrality-vote-results-rules-repealed
 [32]: http://www.alistdaily.com/technology/net-neutrality-marketing/
 [33]: http://adage.com/article/opinion/end-net-neutrality-good-advertisers/311399/
 [34]: https://www.vox.com/cards/network-neutrality/how-does-netflixs-recent-peering-dispute-with-comcast-affect-net
 [35]: https://www.att.com/att/sponsoreddata/en/index.html
 [36]: https://www.attpublicpolicy.com/consumer-broadband/lets-take-action-and-enact-a-federal-consumer-bill-of-rights/
 [37]: /privacy-guides/advanced-privacy-and-anonymity-part-1/
 [38]: /privacy-guides/online-privacy-through-opsec-and-compartmentalization-part-1/
