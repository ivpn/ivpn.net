---
title: Why you don't need a VPN
# Example: /blog/this-is-a-good-post
url: /blog/why-you-dont-need-a-vpn/
highlighted: false
draft: false
authors:
  - Viktor Vecsei
categories:
  - VPN worst practices
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - privacy
  - security
date: 2020-05-19T06:22:00.000Z
# 1920px X 500px
heroImage: ""
images: ["/images-static/uploads/don-t-need-vpn.png"]
# 740px X 740px
thumbnailImage: /images-static/uploads/don-t-need-vpn.png
socalUrls:
  redditUrl: https://www.reddit.com/r/IVPN/comments/gmodf9/why_you_dont_need_a_vpn_first_post_in_vpn_worst/
---

If you have to ask: 'do I need a VPN for this problem?', the answer is no, most of the time.

Let us forget the ‘Family Online Safety' TV inserts and the thirteen 'Best Fastest Secure VPN’ ads on a single search result page. They exist to answer this question with a loud "yes, definitely, all the time". They also want you to stop looking for the correct solution.

Commercial VPNs are not useful or not alone sufficient for:

* providing better [security when 'working from home'](/blog/most-people-dont-need-a-commercial-vpn-to-work-from-home-securely/)
* achieving anonymity
* defending yourself from hackers ("Mr. Robot") when at home
* solving all privacy issues, like unwanted profiling by social networks or search engines
* protecting your passwords
* hiding your mobile phone location (GPS)
* helping you avoid data breaches on services you use online
* defending against "cyber threats" and identity theft
* preventing your medical information or family photos getting in the wrong hands

Do you see these issues popping up in ads for leading VPN brands? No surprise.

![private internet access printer malfunction](/images-static/uploads/1.png)

People want quick assurance and safety. Just give me a one-step solution and let's consider the matter solved. Old-school locks keep people from going through your basement door and they are easy to use, yet burglars can break in the windows. Face masks can protect you and others in a pandemic, but if you shake hands and touch your eyes, they become useless. The promise of one service to solve all information security and privacy issues sounds comforting - but it does not exist.

Hundreds of VPN companies exploit the need for safety by pushing their solutions as a cure-all for various digital ailments. "Protecting your privacy" or "securing your data" are frequently not their primary motivations. In the pursuit of growth and profits, they desperately need new problems to solve with an existing solution. There is serious money in exploiting fear, uncertainty and doubt, and the barrier of entry to this game is very low.

- - -

A lot has changed in the past 10 years. Using a VPN then protected you from the most pressing privacy and security threats online. Websites logging your visits and ISPs monitoring your browsing history were principal issues. Attacks on privacy through undisclosed or unconsented data collection are more pervasive now. Social sites, data brokers and ad networks are all after your intimate personal details; the list of companies building a profile of you is much longer.

Regarding security issues, one often overlooked fact is a VPN only encrypts your connection between your device and the providers server. This protects you from rogue Wi-Fi operators, ISPs with malicious intent or hackers on the same network. Your data, however, gets decrypted when leaving the server and reaches further nodes in the network as secures as it was when it entered the VPN network.

On the brighter side, the level of default encryption for your connection and data traveling on the internet has improved. Most websites [use HTTPS by default](https://news.umich.edu/how-lets-encrypt-doubled-the-internets-percentage-of-secure-websites-in-four-years/) (indicated by that padlock in your browser's address bar). DNS over HTTPS, providing further protection against eavesdropping by encrypting DNS requests, is [rolled out in browsers](https://blog.mozilla.org/blog/2020/02/25/firefox-continues-push-to-bring-dns-over-https-by-default-for-us-users/)[.](https://blog.mozilla.org/blog/2020/02/25/firefox-continues-push-to-bring-dns-over-https-by-default-for-us-users/.) These developments limit the possibilities for snooping, even if you don’t use a VPN. They do not make such services useless, but further put 'VPNs are indispensable for online security' claims into question.

![nordvpn credit card theft on subway underground](/images-static/uploads/2.png)

Most VPN companies refuse to educate their customers about the limitations of their service. They don't just ignore developments detrimental to the ‘marketability’ of their product, they claim VPNs solve a whole set of new, unrelated issues. The same lock for your basement door secures your whole house and prevents strangers peeking through the window. Sometimes, turning the key can make you and all your belongings magically disappear.

Companies making such claims not only fail to fulfill their stated mission of securing your data and privacy. They harm by offering a false sense of security. Getting people to pay 30 bucks for a lifetime access to The Security Button is easy. Building trust through transparency, educating customers on threat models and suggesting complementary tools for better protection are hard. These steps are essential, however, as a VPN alone won't provide complete security, perfect privacy and will certainly not make you anonymous.

![expressvpn promise of anonymity](/images-static/uploads/3.png)

So when do you need a VPN?\
"Never use them", [warn some](https://gist.github.com/joepie91/5a9909939e6ce7d09e29), disillusioned with VPN providers and their practices. We believe that is a misstatement. Commercial VPNs can be useful if you use them for specific jobs they can help with. These are:

1. Keeping some control over your privacy. They hide your real IP address from websites you visit and peer-to-peer nodes you connect to. It also prevents ISPs and mobile network operators from tracking the domains and IPs you visit.
2. Protecting your connection from '[Man in the Middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)' and [other common attacks](https://en.wikipedia.org/wiki/Evil_twin_(wireless_networks)) on networks you don’t trust. Useful when connected to Wi-Fi in airports, hotels, cafes and libraries.
3. Circumventing censorship or geographical blocks on websites and content. Some VPNs can help you retrieve information and media otherwise inaccessible.

That's it.

One last note: please remember that if you use a commercial VPN, your internet traffic goes through the VPN provider’s network. Whoever is in control of the servers can see and log anything you do online, if they choose to. You better trust the service you are signing up for - we will get to that in a future post of VPN Worst Practices.

> Update: We have published a tool called ['Do I need a VPN'](https://www.doineedavpn.com).\
> It builds on the key points of this blog posts to help evaluate whether a VPN is a right choice for you.\
> The project is [open source](https://github.com/ivpn/doineedavpn.com) - please pass it along an help us improve it.

- - -

*Disclaimer: This post addresses commercial VPNs marketed for 'regular users'. Corporate VPNs set up by organizations for their staff serve a different purpose; use them when required by your company. This post is not applicable for users with non-regular threat models: journalists, activists living under repressive regimes, or anyone at risk of being targeted by resourceful individuals or state actors. If any of that applies to you, you need a VPN as part of your security and privacy toolkit. We recommend starting [here](<https://freedom.press/training/>) and using tools recommended by[ PrivacyTools.io](http://PrivacyTools.io) to protect yourself.*

Useful resources in this matter (not always correct):\
<https://schub.wtf/blog/2019/04/08/very-precarious-narrative.html>\
<https://drewdevault.com/2019/04/19/Your-VPN-is-a-serious-choice.html>\
<https://krebsonsecurity.com/tag/vpn/>\
<https://www.youtube.com/watch?v=WVDQEoe6ZWY> (we are happy to sponsor your video, Tom)

Screencap sources:\
<https://www.youtube.com/watch?v=jXwX-VTJoFw> - [archived version ](https://web.archive.org/web/20200424044453/https://www.youtube.com/watch?v=jXwX-VTJoFw)\
<https://www.ispot.tv/ad/IU7h/nordvpn-terrible-at-secrets> - [archived version ](https://archive.is/16Wsn)\
<https://www.ispot.tv/ad/IlT0/nordvpn-online-privacy-made-easy-299> - [archived version ](https://archive.is/BzqPX)\
<https://www.facebook.com/192711594106057/videos/726462231019564/>
