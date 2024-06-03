---
title: Insights about Apple App Store Rules for VPN Apps
# Example: /blog/this-is-a-good-post
url: /blog/insights-apple-app-store-rules-vpn-apps/
highlighted: false
draft: false
authors:
  - Juraj Hilje
categories:
  - Under the hood
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - apps
date: 2020-06-03T12:40:14.612Z
# 740px X 740px
thumbnailImage: /images-static/uploads/app_store.png
---
As VPN developers and maintainers of the iOS VPN app distributed on the App Store, we deal with App Review and many of its peculiarities on a weekly basis. In this post we will look at:

* What **unique requirements** VPN apps need to meet to be approved for App Store
* How Apple's App Review **affects release cycle** for VPN apps on the App Store
* Which **countries are not allowed** to distribute VPN apps
* Behind-the-scene insight on how Apple is **reviewing VPN apps** (good & the bad parts)

We’ll share some of my experiences and suggestions on how to handle the App Review process. Additionally, I will cover some unique requirements the App Review process holds for VPN apps.

## About the App Review Process

Every new app or update that is released in the App Store goes through a screening process called the App Review. Even though Apple uses automated tools to filter potential issues, there is also a manual review involved, conducted by an Apple Review Team member. This process has evolved over time, most noticeably in terms of reducing the review time (from a few weeks to under 24 hours), as well as defining clear rules and guidelines. One thing has stayed the same : it is fairly rigorous.

Though the App Review guidelines and process have changed over the years, the main purpose remained the same — creating a trustworthy ecosystem, a safe environment where the App Store customer can rest assured that all the apps sold there meet certain basic requirements.

For this same reason, Apple Review policies often create friction and overhead for app developers. Developing an app that looks and works great is a challenge in and of itself, but when you plan to release that app in the App Store, it also becomes a product that has to comply with high standards in other areas: appropriate content, customer privacy, special legal requirements, and many others.

Think of it in terms of pharmaceutical production — inventing a new type of medicine that does its job is not enough. Before you can place it on the market, it has to comply with FDA rules that ensure its safety and efficiency.

As daunting as they may sometimes be, these Guidelines provide safety for all parties involved. Once your app is available on the App Store, your customers are sure that your product complies at least with a minimum quality the App Store policies require. That means they’ll be more likely to purchase your app, and [purchase it at a higher average price](https://appleinsider.com/articles/19/07/03/apples-app-store-generated-80-more-revenue-than-google-play-with-a-third-as-many-installs-in-first-half-of-2019 "https\://appleinsider.com/articles/19/07/03/apples-app-store-generated-80-more-revenue-than-google-play-with-a-third-as-many-installs-in-first-half-of-2019").

## Specific Rules for VPN Apps

In June 2019, Apple made a separate section for VPN apps in App Store Review Guidelines. The primary goal of this change is to purge the App Store of VPN apps that share user data to 3rd parties. Though this rule is supposed to improve privacy for VPN app users, Apple seems to be struggling with its implementation.

To this day, a [large percentage of VPN apps](https://www.top10vpn.com/research/investigations/free-vpn-ios-apps-data-sharing/ "https\://www.top10vpn.com/research/investigations/free-vpn-ios-apps-data-sharing/") on the App Store do not comply with this rule. For many of these apps, you don’t need to conduct an audit or a deep-level analysis to determine they’re in breach of this rule — reading their privacy policy is enough.

Let’s take a look at some of the prerequisites and recommendations a VPN app has to meet in order to get approved by the App Store.

### User Data Collection

After Guidelines update in June 2019, Apple clearly prohibits 3rd-party data sharing for VPN apps.

It can be expected that, over a perceivable period of time, the App Store will begin weeding these apps out. The new VPN apps that have a privacy policy which doesn’t comply with this rule won’t be approved. As for the VPN apps currently sold on the App Store, they may experience problems with pushing an update, or Apple may remove the app from the App Store and its owner from Apple Developer Program.

To make sure your VPN app complies with this rule, you have to clearly state what user data your app collects, how it uses it, and you have to state that you don’t share user info with third parties. Furthermore, you have to familiarize your users with this information before they purchase or start using the service. In other words, before your user can connect to your VPN service, your app has to show them a separate screen containing the privacy policy that complies with this App Store rule.

### Countries where VPNs are Illegal or Restricted

It is common for countries to invest in methods of blocking known VPN service providers. In some countries with repressive governments, using a VPN is even restricted or illegal. At the time of writing this article (May 2020), these countries are Belarus, Iraq, Oman, Turkmenistan, North Korea, China, Turkey, The UAE, Russia, and Iran.

If a new VPN app, or an update of an existing one, is made available in mentioned App Store territories, the App Store will reject the app/update.

However, sometimes the App Store Review team fails to check this and releases a VPN app in one of these countries. When this happens, you can expect that the App Review team will file a rejection at some point for one of your subsequent updates, demanding you pull the app from countries where VPNs are illegal.

### App Review Reliability for VPN Apps

The App Review process relies on manual work from an employee that has to do [50 to 100 app reviews per day](https://www.cnbc.com/2019/06/21/how-apples-app-review-process-for-the-app-store-works.html "https\://www.cnbc.com/2019/06/21/how-apples-app-review-process-for-the-app-store-works.html"). This makes it close to impossible for the review team to test and screen every detail and use-case in your app. Sometimes, they approve an app that doesn’t comply with one of their rules. This may lead to inconsistency with reinforcing App Store rules and guidelines. It often happens that they approve one app with a certain feature, while they reject another with the exact same feature.

If you feel that the App Review team misunderstood your feature and just blindly quoted the Guidelines, make your case by stating the reasons behind it. This approach will most likely result with an approval — if it was indeed a misunderstanding and not a violation of the rules.

But even when you manage to squeeze an app that doesn’t comply with the rules and guidelines past the review team and onto the App Store, you’re not permanently in the clear. The App Review team might notice their mistake the next time you try to push an update.

### Grey Areas

Continuing with inconsistencies, an interesting example is ads- and content-blocking, and how Apple is dealing with approving or rejecting this feature. It is usually implemented using a public iOS API (NEPacketTunnelProvider) to configure a VPN tunnel and filter the outgoing DNS requests.

There have been reports (for example [here](https://adguard.com/en/blog/adguard-pro-discontinued.html "https\://adguard.com/en/blog/adguard-pro-discontinued.html") and [here](https://www.fastcompany.com/90236881/apple-tightlipped-on-removal-of-freedom-and-other-content-blocking-apps "https\://www.fastcompany.com/90236881/apple-tightlipped-on-removal-of-freedom-and-other-content-blocking-apps")) of apps that were pulled from App Store, with rejection response from App Review: "Guideline 2.5.1 - Performance - Software Requirements: Your app uses a VPN profile or root certificate to block ads or other content in a third-party app, which is not allowed on the App Store."

In July 2019, in IVPN iOS app we introduced a similar feature called “[AntiTracker](https://www.ivpn.net/blog/block-ads-and-beat-data-surveillance-with-ivpns-antitracker/ "https\://www.ivpn.net/blog/block-ads-and-beat-data-surveillance-with-ivpns-antitracker/")”, that is used to block ads and data trackers across the entire device. But at some point in the future, Apple could demand that we remove this feature in order to be approved for App Store.

## Conclusion

App Review for VPN apps is usually more strict than the one for apps in some other categories, which is understandable, given the sensitive nature of the services provided by VPNs. Eventually, I expect there’ll be little to no room to veer around Apple’s rules and guidelines in this realm.

If you are an iOS developer or perhaps a stakeholder that plans to distribute a VPN app on the App Store, do your best to follow good practices:

**Don't share user data with 3rd-party services**

At some point, Apple will surely weed out VPN apps that violate 3rd-party data sharing or other rules. Be careful with using any 3rd-party services and libraries in your app.

**Be transparent with your users**

VPN users will value clear and honest communication in release notes, new feature announcements and system status notifications, rather than vague and clever marketing quotes.

**Have a clear business model**

It looks like shady free VPN apps on the App Store are [coming to an end](https://appleinsider.com/articles/20/03/09/apple-removed-sensor-tower-vpn-ad-blocking-apps-for-gathering-user-data "https\://appleinsider.com/articles/20/03/09/apple-removed-sensor-tower-vpn-ad-blocking-apps-for-gathering-user-data"). Earn user trust with honesty and transparency, and base your business model on paid subscriptions.

- - -

### Further sources

*[https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/ "https\://developer.apple.com/app-store/review/guidelines/")*\
*[https://developer.apple.com/app-store/review/](https://developer.apple.com/app-store/review/ "https\://developer.apple.com/app-store/review/")*[\
*https://www.technadu.com/apples-new-vpn-guidelines-havent-changed-app-store/70249/*](https://www.technadu.com/apples-new-vpn-guidelines-havent-changed-app-store/70249/ "https\://www.technadu.com/apples-new-vpn-guidelines-havent-changed-app-store/70249/")
