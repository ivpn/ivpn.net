---
title: 'An Introduction to Privacy & Anonymity'
author: Ed Holden
url: /privacy-guides/an-introduction-to-privacy-anonymity/
section: Basic
weight: 30
articles: [
  {
    title: "An Introduction to Tor vs I2P",
    url: "/privacy-guides/an-introduction-to-tor-vs-i2p/"
  },
  {
    title: "Applying Risk Management to Privacy",
    url: "/privacy-guides/applying-risk-management-to-privacy/"
  },
]
date: 2021-10-30T12:42:14+00:00
layout: guides-details
---
## Introduction

Living in today's interconnected world has brought with it significant advantages. Most apparently, the velocity of communication and information interchange has opened new avenues for the propagation of ideas and new businesses in ways that were in the domain of science fiction only a few generations ago. However, along with the benefits this new world provides, there are significant new challenges raised. The same technology that allows families to communicate in realtime across continents also enables widespread cataloguing of those conversations' contents. The same technology that allows online retailers to customize your shopping experiences in such a way as to give you exactly what you want from the comfort of your own home also allows data brokers a form a highly detailed profile of you. These are constructed not just by using information you have provided, but the massive amounts of consumer data they harvest and acquire from other partners. Data has been dubbed the new oil and the most important resource to harvest. Its availability, abundance and usefuleness is increasing, and business models built on exploiting these trends have generated trillions of dollars in market capitalisation for a handful of companies. 

## Privacy vs Anonymity

This complex system that we find ourselves in demands precision of thought and language to ensure that we are able to achieve our individual privacy goals. It is therefore important to analyze and differentiate between two different, though closely intertwined notions: privacy vs. anonymity.

### Privacy

Privacy lies at the intersection of two fundamental social notions: control and trust. That is, who has control over information about you, and do you trust him or her to keep that information secret? When students enter a university, they know that the university will be cataloging their performance in class. That catalogue of performance can function as a proxy for a student's intelligence, work ethic, or even just their interest (or lack thereof) in a given field of study. This is intimate data about an individual that a person rightfully would like to be kept private. Unfortunately for the students, they lack control of this data - it exists in their university's database. However, due to local laws and contractual obligations, the student is aware that the university would face substantial sanctions and liability were it to reveal their private data to others without their prior authorization.   

### Trust

Because of these safeguards, the student has 'trust' that their private information will be protected by the university; interests are aligned. The students then can say that their grades or marks at university are still 'private'. The fact of the matter is that we face situations like this every day. We often are coerced, either out of convenience, law, or some other force, into giving up some element of control over our private information. In the case the students above, their only way to receive some sort of certification in their field is to submit to the system of the university. Usually this is marked with some assurances that the information will only be used for agreed-upon purposes: we enter a trust relationship with the entity to whom we give control of our information. Unfortunately, many of these entities have shown themselves to be less than trustworthy. Whether it is governments [wiretapping its own citizens][1] without following necessary legal requirements, social media corporations playing [fast and loose][1] when interpreting privacy policies, or your ISP [selling your browsing history][2] to marketers and data brokers, we cannot trust those gain control of our private information through coercion.

### Anonymity

We are now faced with a predicament: how do we maintain our privacy when we are forced to give up control of our private information and we know that we cannot trust the entities to whom we give the information? Here is where the concept of anonymity comes into play. Consider a political dissident posting blog entries that are critical of the regime currently in control of their nation. In any nation, it can be assumed that there is at a subset of the population that does not support the current leadership. The difficulty comes into play when the dissident's ISP provides the government with logs tying the blog post to the their home internet connection. If they could somehow bifurcate their physical-world identity from their blog entries, then the fact that he cannot trust their ISP ceases to be relevant. This could be as simple as using open Wi-Fi access points from which to make their posts - this can be risky however, as one tries to avoid patterns of access that could give clues to one's identity. While the outcomes you might face from the loss of privacy are possibly different or less grave, this concept can be adapted to your specific situation.

### Regaining control

Essentially, we see that anonymity allows us to extract the need for control and trust from all of our private information and consolidate it into one very special piece of information: our identity. The dissident blogger does not care if his government knows that there are those who oppose them - as long as they do not know that he is one of them. Anonymity, then, can be thought of as a function applied to a given set of private data. It factors out the term of 'identity' from the set of data to which it is applied. However, just as a factored term can be multiplied back into a mathematical equation easily, so can the 'identity' that has been factored out from a set of data. Given that routing on the internet is a complicated process and there are no guarantees of trust along the way, it makes sense to drop the 'identity' term as quickly as possible from the equation in order to permanently bifurcate who you are from your information. 

Achieving this separation and attaining 'anonimity' online is becoming harder with the increase in range and effectiveness of capabilities to identify you. To get started with basic steps you can consult EFF's [Surveillance Self-Defense documents][3]. As a next step we recommend reading the rest of our [Privacy Guides][4], working your way up to Advanced guides that discuss compartmentalization and isolation using virtual machines, nested VPN chains and Tor.

As you choose technical safeguards to put in place to protect your privacy online, remember that there are significant economic and political entities who are trying to catalogue your every action online: everything from your latest email to your grandmother to the anonymous (or so you thought) report you made as a whistleblower to your nation's trade commission. Vigilance is advised. 



[1]: https://www.ftc.gov/news-events/press-releases/2021/10/ftc-staff-report-finds-many-internet-service-providers-collect
[2]: https://www.nationalreview.com/2017/05/nsa-illegal-surveillance-americans-obama-administration-abuse-fisa-court-response/
[3]: https://ssd.eff.org
[4]: https://www.ivpn.net/privacy-guides/
