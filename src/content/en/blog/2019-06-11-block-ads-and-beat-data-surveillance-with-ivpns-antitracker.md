---
title: Block ads and beat data surveillance with IVPN's AntiTracker
authors: ["Viktor Vecsei"]
categories: ["Releases"]
tags: ["Apps", "Privacy"]
draft: false
date: 2019-06-11T12:25:33+00:00
url: /blog/block-ads-and-beat-data-surveillance-with-ivpns-antitracker/
comments:
  - author: Two Bits
    date: 2019-06-13T10:54:48+02:00
    content: |
      Great job. You guys have effectively copied Perfect Privacy.
  - author: Anonymous
    date: 2019-06-15T21:22:15+02:00
    content: |
      You're saying that like it's the only VPN giving this feature. PP is not the only VPN out there, and it's also not the only one offering this as a feature.
  - author: Anon
    date: 2019-06-17T17:25:05+02:00
    content: |
      You Guys are amazing!!! Thanks a lot! :-).
  - author: Jack
    date: 2019-06-18T03:54:22+02:00
    content: |
      The new AntiTracker feature is awesome, thank you! I previously used a popular browser-based ad-blocker but I never liked the idea of having a browser plug-in needing to analyze all of my browsing data to determine what to block (which is how browser-based ad blockers work). Network level tracker-blocking and ad-blocking is definitely the better way to do it (for efficiency, privacy, and security). Also, another problem I've had with browser-based ad-blockers is that they can "break" certain websites, but I haven't had this problem with AntiTracker. Again, thank you for this great new feature!
  - author: Aero
    date: 2019-06-19T01:03:32+02:00
    content: |
      Could we get user selectable Hardcore mode, particularly if more companies get added? That is, I'm still too embedded in the Google eco-system to be able to go hardcore on them. I would love to go hardcore on Facebook, though.
  - author: JPL_anon
    date: 2019-06-19T04:13:51+02:00
    content: |
      AntiTracker is an awesome new feature and it works great! I no longer need to use and maintain ad blockers in my browsers anymore (that all have settings and whitelists etc that take some time to maintain). Kudos to an excellent new feature. Thank you from a very happy customer!
  - author: Viktor Vecsei
    date: 2019-06-19T12:10:03+02:00
    content: |
      Thanks for the feedback! We are collecting requests like this and we'll evaluate the options for improving this feature.
  - author: Anonymous
    date: 2019-06-19T16:36:10+02:00
    content: |
      Of course there are others out there, Anonymous, but the striking resemblance to TrackStop is quite noteworthy! Coincidence? lol
    
      Perfect Privacy rolled this out in 2016, and yes, you are correct, many other VPNs (including IVPN) have followed their lead.
  - author: Anonymous
    date: 2019-06-19T16:37:45+02:00
    content: |
      Perfect Privacy has this. It's a custom filter for all social media domains. Give it a shot.
  - author: Anon_223
    date: 2019-06-24T19:50:14+02:00
    content: |
      Could you publish the Android app with the antiTracker on F-droid so it can be kept up-to-date easier?
  - author: Viktor Vecsei
    date: 2019-06-24T23:22:55+02:00
    content: |
      Thanks for the recommendation, we will explore this.
  - author: IVPN FAN
    date: 2019-07-14T19:29:44+02:00
    content: |
      Please have some toggles for websites hardcore mode. Like I'd never use google search, google maps or facebook, but I'd need Youtube. Great job btw, make IVPN great again!
  - author: WubbaLubbaDubDub
    date: 2019-08-20T20:15:09+02:00
    content: |
      Is this based on Pi Hole on your backend DNS server? Or have you implemented it using HOSTS file blocking or something else?
  - author: Viktor Vecsei
    date: 2019-08-21T09:24:50+02:00
    content: |
      A curated block list is applied on our DNS servers (no relation to Pi-Hole, similar logic) ->
    
      <a href="/knowledgebase/general/antitracker-faq/" rel="nofollow ugc">https://www.ivpn.net/knowledgebase/general/antitracker-faq/</a>
  - author: Stephen
    date: 2019-08-30T07:50:15+02:00
    content: |
      it would be good if you guys do what Trackstop do and mess with the device fingerprint. apparently it is so sophisticated the power to be can track you with this alone
    
      ps finished the 3 day trial and it was great. $100 US is expensive when converted to australian dollar

---
IVPN's core mission is to help people control what information they share with others. Our VPN service solves a key privacy problem by encrypting your traffic, making it inaccessible to your ISP and anyone else who may wish to surveil your online activity.

However, there is a lot more going on in terms of privacy violations when you are connected to the Internet. Thousands of companies track your movement across websites, profile your activities and sell that information to advertisers or the highest bidding data brokers.


Adding an ad blocker to our core service provides multiple benefits. First, it makes the browsing experience faster and less overwhelming. IVPN's DNS-based blocking solution doesn't allow calls to ad services to go through when visiting websites, fulfilling this need much more effectively compared to browser extensions.

This feature also has the added benefit of blocking the data trackers that companies use to build a profile of you by tracking your browsing behavior. An enhanced privacy protection is what we work towards at IVPN, we consider this even more valuable than ad blocking; so naming the tool 'AntiTracker' seemed a logical choice. This way every user of our VPN service can block not only unwanted ads, adware and malicious websites, but also data tracking operations.

### Hardcore Mode: block Google and Facebook domains

Privacy-conscious individuals are becoming increasingly frustrated by the complete disregard for, and empty promises about privacy from the flagship bearers of the surveillance economy: Google and Facebook. As an ethical [Tracking Free company][1] we strive to support anyone who plans to cut ties with them.

One major step towards that goal is enabling the optional 'Hardcore Mode' of our AntiTracker feature to make the majority of their services inaccessible, and block domains for Facebook and Google services. This is particularly useful in two scenarios:

  1. To receive the best protection available against their tracking methods and trying to go 'off the grid' from their pervasive scanning.
  2. To wean yourself off their services and start looking for alternatives, contributing to a profiling-free and more competitive Internet.

Keep in mind that URLs, services and dependencies from these two companies will likely not work when you go 'all in' with Hardcore Mode.

We believe our solution has arrived at a critical time, not only due to the overwhelming success of data surveillance business models - which make it ever harder to preserve your privacy online without extra safeguards - but because the key players are [making it increasingly harder][2] to fight back with conventional methods. IVPN's AntiTracker feature goes one step towards a future in which no one can be surveilled, profiled and discriminated against by governments [based on what they do online][3].

### Get started

You can use the AntiTracker tool right now by downloading the [latest versions][4] of the IVPN application from our website.  
Please note that some websites might not be accessible when using this tool - you can learn more about common questions and tips in our related [Knowledge Base article][5].  
For Android users this feature won't be available in the Play Store distributed app version due to Google policies (surprise, surprise) and we recommend downloading the latest version [directly from our website][6].

We would also like to invite you to give feedback on our AntiTracker tool after testing it by [sending us a message][7].  
   
Thank you for supporting the vision of a tracking free future!

 [1]: /blog/ivpn-is-now-a-tracking-free-provider/
 [2]: https://www.cnet.com/news/google-holds-firm-on-chrome-changes-that-may-break-ad-blockers/
 [3]: https://www.bbc.com/news/world-us-canada-48486672
 [4]: /apps/
 [5]: /knowledgebase/general/antitracker-faq/
 [6]: /apps-android/
 [7]: /contactus/
