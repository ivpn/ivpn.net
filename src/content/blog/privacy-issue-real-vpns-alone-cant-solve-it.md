---
title: The privacy issue is real and you can't solve it with just a VPN
url: /blog/privacy-issue-real-vpns-alone-cant-solve-it/
highlighted: false
authors:
  - Viktor Vecsei
categories:
  - VPN worst practices
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - privacy
date: 2020-08-13T11:25:00.000Z
# 740px X 740px
thumbnailImage: /images-static/uploads/screenshot-2020-08-13-at-14.57.09.png
# Ratio 1:1, example 500x500
images:
  - /images-static/uploads/image-from-rawpixel-id-323097-jpeg-1-.jpg
---
In the two previous posts in our series we have discussed even though mainstream VPN providers [over-promise on their services](https://www.ivpn.net/blog/why-you-dont-need-a-vpn/ "https\://www.ivpn.net/blog/why-you-dont-need-a-vpn/"), VPNs are useful and [necessary tools](https://www.ivpn.net/blog/vpn-imperfect-necessary-privacy-enhancing-tools/ "https\://www.ivpn.net/blog/vpn-imperfect-necessary-privacy-enhancing-tools/") for privacy protection. This third post looks beyond promises of VPNs to examine why and how sensitive data is accumulated of our lives, and what can we do about it. 

In short, while some tools for surveillance resistance are useful to protect your privacy, we must take further actions to enact systemic changes.

- - -

## Privacy is a new, but fundamental human concept

Ever since chimneys made fireplaces possible, the potential of having a private, safe space you can call a home fundamentally changed how humans relate to themselves and each other. Walls and closed doors shut out prying eyes, and the possibility of not sharing every detail of our lives [strengthened our agency](https://edri.org/evolution-concept-privacy/ "https\://edri.org/evolution-concept-privacy/") and helped [individual thinking flourish](https://constitutioncenter.org/blog/contraception-marriage-and-the-right-to-privacy "https\://constitutioncenter.org/blog/contraception-marriage-and-the-right-to-privacy"). Having multiple devices connected 24/7 to the Internet in your home is dismantling this status quo, as intimate details of your activities are shared with those you don’t even know. Very little you do on your phone escapes monitoring by multiple entities, microphones are listening in on your home, while police [have access](https://www.newsweek.com/amazon-ring-drones-monitor-protests-1523856) to cameras looking at your front lawn. There is no escape from surveillance.

![privacy shielded by your home](/images-static/uploads/image-from-rawpixel-id-459469-jpeg-1-.jpg)

Privacy, as a commonly accepted social convention, was unknown a thousand years ago. Now life in a true, thriving democracy cannot be complete without it. Lacking privacy, the possibility of experimentation and progress become stunted because of [chilling effects](https://www.socialcooling.com/ "https\://www.socialcooling.com/"). Discrimination and human rights abuses face [less obstacles](https://www.tandfonline.com/doi/full/10.1080/23738871.2016.1228990 "https\://www.tandfonline.com/doi/full/10.1080/23738871.2016.1228990"). Long arms of a government following an authoritarian vision can label, [locate, harass and discredit](https://www.theatlantic.com/magazine/archive/2020/09/china-ai-surveillance/614197/ "https\://www.theatlantic.com/magazine/archive/2020/09/china-ai-surveillance/614197/") anyone not following an agenda. Profit driven data collection [drives your profiling](https://www.salon.com/2020/06/20/were-losing-the-war-against-surveillance-capitalism-because-we-let-big-tech-frame-the-debate/ "https\://www.salon.com/2020/06/20/were-losing-the-war-against-surveillance-capitalism-because-we-let-big-tech-frame-the-debate/") with information from multiple sources chained together - mapping out your past, monitoring your present, directing your future. We established in our [earlier post ](https://www.ivpn.net/blog/vpn-imperfect-necessary-privacy-enhancing-tools/ "https\://www.ivpn.net/blog/vpn-imperfect-necessary-privacy-enhancing-tools/")even if you think have nothing to hide, those profiling you hold power over you.

## Small breaches of trust set up large violations

Here is why the privacy issue is so hard to pin down: most actions that end up causing privacy violations happen ‘in the dark’ and without us realising their long-term effect. A piece of data collected is seemingly harmless - but small increments in loss of control set us up for an enormous leap in violations. Google storing [thousands](https://www.theguardian.com/commentisfree/2018/mar/28/all-the-data-facebook-google-has-on-you-privacy "https\://www.theguardian.com/commentisfree/2018/mar/28/all-the-data-facebook-google-has-on-you-privacy") of personal data points on me? No problem, they are just building a better product. Facebook having [hundreds of pictures](https://www.businessinsider.com/instagram-facing-500-billion-in-fines-in-facial-recognition-lawsuit-2020-8?r=US&IR=T) of all your family members to [train their machine learning algorithm](https://bgr.com/2019/07/05/facebook-outage-reveals-ai-catalogs-every-photo-you-upload/ "https\://bgr.com/2019/07/05/facebook-outage-reveals-ai-catalogs-every-photo-you-upload/")? Everyone does that, it’s normal (no, they don’t, and [it’s not](https://www.cnet.com/news/amazon-google-and-microsoft-sued-over-photos-in-facial-recognition-database/?mkt_tok=eyJpIjoiTmpobE1EYzJZekJrTWpReCIsInQiOiJJSTgyWUZQZ3hEZU9xQnR5MEpuYUEzRmE4UWNWVDM4NmhkbzF0VERMWXF0VDl0VittTGtHdVB5SEFwdFVHYktmWDJQXC9kMzBiK1NhZmVHZW9XdmhpTzAya051XC9QNVk0NXBSRWlPS3BiVzQ5N0M2dm1TZXVWczJUWHpQeHh3ZFBTIn0%3D "https\://www.cnet.com/news/amazon-google-and-microsoft-sued-over-photos-in-facial-recognition-database/?mkt_tok=eyJpIjoiTmpobE1EYzJZekJrTWpReCIsInQiOiJJSTgyWUZQZ3hEZU9xQnR5MEpuYUEzRmE4UWNWVDM4NmhkbzF0VERMWXF0VDl0VittTGtHdVB5SEFwdFVHYktmWDJQXC9kMzBiK1NhZmVHZW9XdmhpTzAya051XC9QNVk0NXBSRWlPS3BiVzQ5N0M2dm1TZXVWczJUWHpQeHh3ZFBTIn0%3D")).

Corporate entities whose business model rests on violating your privacy log your actions, thoughts, secrets and desires. They predict your future steps through these violations, [nudging you](https://theintercept.com/2018/04/13/facebook-advertising-data-artificial-intelligence-ai/ "https\://theintercept.com/2018/04/13/facebook-advertising-data-artificial-intelligence-ai/") into directions you might not explore by your own volition. Your government might [get access](https://www.wsj.com/articles/u-s-government-contractor-embedded-software-in-apps-to-track-phones-11596808801 "https\://www.wsj.com/articles/u-s-government-contractor-embedded-software-in-apps-to-track-phones-11596808801") to [this information](https://theintercept.com/2020/07/09/twitter-dataminr-police-spy-surveillance-black-lives-matter-protests/) (perhaps in an ‘all access backdoor’ form) to use it as they please. Your [credit score may tank](https://www.chron.com/opinion/article/Data-isn-t-just-being-collected-from-your-phone-15449776.php "https\://www.chron.com/opinion/article/Data-isn-t-just-being-collected-from-your-phone-15449776.php"), proper healthcare might [go out of reach](https://www.propublica.org/article/health-insurers-are-vacuuming-up-details-about-you-and-it-could-raise-your-rates "https\://www.propublica.org/article/health-insurers-are-vacuuming-up-details-about-you-and-it-could-raise-your-rates"), you might not get that job or police just knocks on your door [after a lawful protest](https://theintercept.com/2020/07/09/twitter-dataminr-police-spy-surveillance-black-lives-matter-protests/) - because of [privacy violating profiling](https://www.nytimes.com/interactive/2019/12/21/opinion/location-data-democracy-protests.html "https\://www.nytimes.com/interactive/2019/12/21/opinion/location-data-democracy-protests.html"). Global crises offer a [handy](https://www.politico.eu/article/coroanvirus-covid19-surveillance-data/ "https\://www.politico.eu/article/coroanvirus-covid19-surveillance-data/") opportunity for shortcuts leading to normalization of privacy issues. This is not just a problem under authoritarian regimes, but [becoming](https://www.jpost.com/israel-news/israelis-underestimating-gravity-of-govt-surveillance-expert-warns-624891 "https\://www.jpost.com/israel-news/israelis-underestimating-gravity-of-govt-surveillance-expert-warns-624891") [the](https://monitor.civicus.org/updates/2019/07/22/new-mass-surveillance-system-chile/ "https\://monitor.civicus.org/updates/2019/07/22/new-mass-surveillance-system-chile/") [norm](https://www.opendemocracy.net/en/opensecurity/big-democracy-big-surveillance-indias-surveillance-state/ "https\://www.opendemocracy.net/en/opensecurity/big-democracy-big-surveillance-indias-surveillance-state/") in stable democracies around the world.

> Information is power. But like all power, there are those who want to keep it for themselves.\
> *Aaron Swartz*

The slippery privacy slope we found ourselves on came about organically because of familiar forces that shape our world: money and power. Those raking in the cash and carry out invasive monitoring for control have [no real incentives](https://www.theverge.com/2019/7/12/20692524/facebook-five-billion-ftc-fine-embarrassing-joke "https\://www.theverge.com/2019/7/12/20692524/facebook-five-billion-ftc-fine-embarrassing-joke") to curb their behavior. Capabilities and purpose are both aligned for effective tech companies in monopolistic positions and states with vast resources dismantling checks and balances. While the means are similar for the two groups, their goals are different.\
For the former, monetisation of the [behavioral surplus](https://sciencenode.org/feature/shoshana-zuboff,-part-two-rendering-reality.php "https\://sciencenode.org/feature/shoshana-zuboff,-part-two-rendering-reality.php") derived from personal information through advertising is the goal. For the latter, dragnet surveillance and bulk data collection provide insights to actions of their citizens, enabling effective monitoring and control. There is no reason to change the status quo: the scope of data collection [will just keep increasing](https://www.idc.com/getdoc.jsp?containerId=prUS45213219 "https\://www.idc.com/getdoc.jsp?containerId=prUS45213219").

## All watched over by machines of data collection

It was a daunting task for us even to contemplate the scope of data harvested from our lives for this post. How does this work in action? Where does data originate? Who is collecting it and what information they derive from it?

![we are all profiled carefully](/images-static/uploads/image-from-rawpixel-id-323097-jpeg-1-.jpg)

1. On the micro-level, [trackers collect](https://petsymposium.org/2020/files/papers/issue2/popets-2020-0038.pdf "https\://petsymposium.org/2020/files/papers/issue2/popets-2020-0038.pdf") individual data points from a distinct source and group it together, representing a sequence or a session
2. Data processors and their partners [trade, sell and acquire](https://www.ft.com/content/f1590694-fe68-11e8-aebf-99e208d3e521 "https\://www.ft.com/content/f1590694-fe68-11e8-aebf-99e208d3e521") these batches for analysis and other use
3. By correlating different data sets with matching pieces of personally identifiable information (email address, name, physical address, unique sequence of actions), companies and adversaries match them to [your individual profile](https://www.fastcompany.com/90310803/here-are-the-data-brokers-quietly-buying-and-selling-your-personal-information "https\://www.fastcompany.com/90310803/here-are-the-data-brokers-quietly-buying-and-selling-your-personal-information") with high confidence. They create a chain of events that mirror your life spanning across days, weeks and years.
4. For targeting purposes, the processors attach labels and flags to profiles that represent your household income, religion, [political preferences](https://twitter.com/VickerySec/status/1292721157888598017 "https\://twitter.com/VickerySec/status/1292721157888598017"), sexual identity and potentially a thousand plus other [inferred data points](https://privacyinternational.org/sites/default/files/2018-04/data%20points%20used%20in%20tracking_0.pdf "https\://privacyinternational.org/sites/default/files/2018-04/data%20points%20used%20in%20tracking_0.pdf").
5. This information is then used to identify you for [law enforcement purposes](https://www.latimes.com/opinion/story/2020-07-27/lapd-big-data-policing-palantir), to influence your vote or to target you with advertisements carrying the right content, at the right place, at the right time. This is happening with such precision that you might think platforms are now [tapping your phone](https://newatlas.com/computers/facebook-not-secretly-listening-conversations/ "https\://newatlas.com/computers/facebook-not-secretly-listening-conversations/") to figure out your intimate thoughts.

Where is your information leaking? While giving a complete picture is difficult, here are the key sources and channels where data derived from our actions originate and flow through:

| Source                                            | Method                                                                                                                                                               | Information (sample)                                                                       | Sensitive knowledge (e.g.)                                       |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Internet Service Provider, Cell Provider          | Logging through DNS and [deep packet inspection](https://security.stackexchange.com/questions/155057/my-isp-uses-deep-packet-inspection-what-can-they-observe)       | IP address; websites visited; length of visit                                              | Political affiliation, medical conditions                        |
| Online services and apps (incl. Facebook, Google) | [Trackers in app](https://petsymposium.org/2020/files/papers/issue2/popets-2020-0017.pdf); customer profiles sold                                                    | IP address, email address,  location information,  customer preferences, generated content | Political affiliation, groups you belong to, what you believe in |
| Websites you visit                                | [Trackers on website](https://petsymposium.org/2020/files/papers/issue2/popets-2020-0038.pdf); analytics services passing data                                       | IP address, actions taken on website, device information, email address                    | Content preferences, medical conditions, 'risky' research        |
| Mobile location                                   | [Collecting GPS, cell tower information](https://arstechnica.com/tech-policy/2020/08/beware-of-find-my-phone-wi-fi-and-bluetooth-nsa-tells-mobile-users/)            | Location attached to device ID/phone number                                                | Who you associate with, identity of friends, where do you work   |
| Credit card purchases                             | [Sharing purchase history ](https://www.forbes.com/sites/petercohan/2018/07/22/mastercard-amex-and-envestnet-profit-from-400m-business-of-selling-transaction-data/) | Date, vendor, item, amount                                                                 | Travel habits, activism support, adult content consumption       |
| Email provider                                    | Scanning email content [and selling insights](https://www.techradar.com/news/your-email-provider-might-be-selling-your-personal-data)                                | Email content analysis, contacts, metadata                                                 | Secrets, desires, purchase habits, travel habits                 |
| Health trackers                                   | Logging and selling [biometric data](https://techcrunch.com/2020/02/20/google-gobbling-fitbit-is-a-major-privacy-risk-warns-eu-data-protection-advisor/)             | Heart rate, workout habits                                                                 | Health issues, private life                                      |
| Connected devices                                 | [Collecting voice](https://www.the-ambient.com/features/how-amazon-google-apple-use-smart-speaker-data-338), device usage data                                       | Search queries, apartment layout, consumption habits                                       | Details on your home, private conversation with family           |
| Out-of-home                                       | CCTV, facial recognition, workplace monitoring                                                                                                                       | Date/time and location correlated                                                          | Where you are and when, travel habits, daily routine             |

*Selling in the context of ‘Method’ might mean used for monetisation and profit extraction within the same corporate ecosystem. Google and Facebook can safely say ‘We never sell customer information, we care about user privacy’. That is technically correct, but they sell your attention to the highest bidder using private information gathered from you across their different services. Google Analytics, for example, is present on [87% of the 10.000](https://petsymposium.org/2020/files/papers/issue2/popets-2020-0038.pdf "https\://petsymposium.org/2020/files/papers/issue2/popets-2020-0038.pdf") most visited websites.*

## Change is possible, and it starts with you

There are concrete steps you can take today to protect your privacy first, then extend that change to help others do the same. As we discussed [before](https://www.ivpn.net/blog/why-you-dont-need-a-vpn/ "https\://www.ivpn.net/blog/why-you-dont-need-a-vpn/"), in most cases a VPN is not a sufficient solution to tackle privacy issues. To give you pointers for moving beyond one tool, we have collected what can you do to address the key problems:

| Source                                            | Tools for resistance                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------ |
| Internet Service Provider, Cell Provider          | VPN; Tor                                                                 |
| Online services and apps (incl. Facebook, Google) | Use privacy respecting services; email forwarding services               |
| Websites you visit                                | Ads and tracker blockers (extensions, VPN)                               |
| Mobile location                                   | Turn off location sharing; selective permissions; burner phone           |
| Credit card purchases                             | Card masking services; stick to prepaid cards, cryptocurrency or cash    |
| Email provider                                    | Use a paid email provider with no-logs policy and no ads (e.g. Tutanota) |
| Health trackers                                   | Turn off logging and sharing; pick a product with privacy safeguards     |
| Connected devices                                 | Buy non-connected devices; ditch smart speakers                          |
| Out-of-home                                       | Wear masks; support anti-FRT legislation.                                |

As you can see, using a VPN only solves one part of the entire issue, and partly helps with another. If you want to improve your privacy protection significantly, you need to do more.

## Further challenges we cannot solve alone

Most issues can be mitigated or solved with tactics or tools, others are complex or hard to resist. Examples of issues with no simple solutions:

**Device fingerprinting online** 

When visiting a website, the combination of the characteristics of your device, settings and browser information (e.g. user agent information, operating system, fonts and plugins installed) makes you unique and [personally identifiable](https://petsymposium.org/2020/files/papers/issue2/popets-2020-0041.pdf "https\://petsymposium.org/2020/files/papers/issue2/popets-2020-0041.pdf"). You can use a browser that’s [trying](https://brave.com/whats-brave-done-for-my-privacy-lately-episode-4-fingerprinting-defenses-2-0/) to counter this issue. Disabling JavaScript and using tools like Tails and CanvasBlocker might help. But in most cases, the more measures you take to hide yourself, the more unique your ‘fingerprint’ will become.

**Mobile phone location based on cell tower data**

To connect to your phone network, your device must communicate with cell towers that generate [logs at your mobile provider](https://petsymposium.org/2020/files/papers/issue2/popets-2020-0041.pdf "https\://petsymposium.org/2020/files/papers/issue2/popets-2020-0041.pdf"). Burner phones are a solution, but in certain countries you cannot legally get a SIM card without a photo ID.

**Facial recognition through police cameras, CCTV**

Masks are [somewhat efficient](https://www.vox.com/recode/2020/7/28/21340674/face-masks-facial-recognition-surveillance-nist "https\://www.vox.com/recode/2020/7/28/21340674/face-masks-facial-recognition-surveillance-nist") and you can [buy gear](https://www.businessinsider.com/clothes-accessories-that-outsmart-facial-recognition-tech-2019-10?r=US&IR=T "https\://www.businessinsider.com/clothes-accessories-that-outsmart-facial-recognition-tech-2019-10?r=US&IR=T") designed for countering this threat, but there is no perfect solution.

**Compromised hardware layer**

Malware and backdoors in hardware [you cannot trust](https://theprivacyissue.com/government-surveillance/pwned-on-arrival-hardware-supply-chain "https\://theprivacyissue.com/government-surveillance/pwned-on-arrival-hardware-supply-chain") are hard to detect and can cause leakage of sensitive data even if [other layers](https://twitter.com/cburniske/status/1269712449243975680 "https\://twitter.com/cburniske/status/1269712449243975680") are secure.

**Services that don’t respect your privacy, but you ‘must’ use**

If you cannot find [suitable substitutes](https://www.reddit.com/r/degoogle/ "https\://www.reddit.com/r/degoogle/") for Google Maps, peer pressure is too much for you to leave Facebook or other snooping services are mandatory for your work, your privacy will suffer.

## Education, activism and resistance shows the path forward

To solve each problem above, you can go ‘off the grid’. If you are living in the woods without a phone or any connected device, typing the next activist manifesto on an air-gapped machine - no-one can violate your privacy. Most of us, however, wish to stay and take part in our communities without the pressure of surveillance, as free individuals who can choose what they share and who they share it with.

![wrestling the surveillance octopus](/images-static/uploads/image-from-rawpixel-id-543749-jpeg.jpg)

There is a small minority who won’t settle for the new data collection status quo. Activists, journalists, academics, lawyers and tool makers are working on uncovering issues, bringing those ‘steps in the dark’ to light. They piece minor violations together and apply pressure on those grinding their way to more money and more power. Their contributions bring on [congressional hearings](https://www.wilmerhale.com/insights/client-alerts/20190314-senate-judiciary-committee-holds-hearing-on-gdpr-and-ccpa "https\://www.wilmerhale.com/insights/client-alerts/20190314-senate-judiciary-committee-holds-hearing-on-gdpr-and-ccpa"), [privacy legislations](https://www.velaw.com/insights/ccpa-2-0-the-california-privacy-rights-act-is-on-november-ballot/), and creation of [new tools of resistance](https://ssd.eff.org/en/module-categories/tool-guides). Here is what you can do to join this movement, start protecting yourself and further the bigger cause:

**Education**

Understanding the underlying issues better help put the problem into proper context and sets you off towards finding solutions. There are great resources on privacy issues, ranging from [blogs](https://teachprivacy.com/privacy-security-training-blog/ "https\://teachprivacy.com/privacy-security-training-blog/") through [books](https://www.theguardian.com/technology/2019/jan/20/shoshana-zuboff-age-of-surveillance-capitalism-google-facebook "https\://www.theguardian.com/technology/2019/jan/20/shoshana-zuboff-age-of-surveillance-capitalism-google-facebook") to [podcasts](https://theprivacyissue.com/privacy-and-society/download-privacy-security-podcasts "https\://theprivacyissue.com/privacy-and-society/download-privacy-security-podcasts"). We have published well-received [privacy guides](https://www.ivpn.net/privacy-guides/ "https\://www.ivpn.net/privacy-guides/") where you can start.

**Activism**

Experienced and motivated people actively work on privacy and surveillance related problems using technology, law and political channels. Join them and donate money or your time - start with [Tor](https://donate.torproject.org/ "https\://donate.torproject.org/"), [EFF](https://supporters.eff.org/donate/30for30--S "https\://supporters.eff.org/donate/30for30--S"), [NOYB](https://support.noyb.eu/join "https\://support.noyb.eu/join") and [Tactical Tech](https://tacticaltech.org/#/donate "https\://tacticaltech.org/#/donate").

**Using tools of resistance** 

As highlighted above, you can counter various privacy harms by using tools designed for your problems. Use open-source and paid products, donate to their creators. The best place to find alternatives to your current setup is the [PrivacyGuides](https://www.privacyguides.org/ "https\://www.privacyguides.org/") website and their [community](https://www.reddit.com/r/privacyguides/ "https\://www.reddit.com/r/privacyguides/"). Techlore also has great [guides](https://www.youtube.com/c/Techlore/playlists "https\://www.youtube.com/c/Techlore/playlists") (and a Discord channel) if video is your preferred format for learning.\
Are you working on privacy enhancing tools and services? Contact us and we will do our best to amplify them.

- - -

Protecting personal privacy in the age of perpetual surveillance might seem like a Sisyphean task, but one thing to keep in mind is you are not alone in this. Many of us have similar needs, share your feelings of injustice and ready to work on solving the issues. Let us work together towards that future by using every mean available: education, activism that pushes for legislation, and building tools of resistance against this present day dystopia.

*Illustrations displayed in the post are under public domain C00 license.*
