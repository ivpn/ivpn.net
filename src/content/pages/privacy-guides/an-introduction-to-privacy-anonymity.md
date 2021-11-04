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
  {
    title: "Creating a VM within a hidden truecrypt partition",
    url: "/privacy-guides/creating-a-vm-within-a-hidden-truecrypt-partition/"
  }
]
date: 2013-10-23T12:42:14+00:00
layout: guides-details
---
## Introduction

Living in today's interconnected world has brought with it significant advantages. Most apparently, the velocity of communication and information interchange has opened new avenues for the propagation of ideas and new businesses in ways that were in the domain of science fiction only a few generations ago. However, along with the benefits this new world provides, there are significant new challenges raised. The same technology that allows families to communicate in realtime across continents also enables widespread cataloguing of those conversations' contents. The same technology that allows online retailers to customize your shopping experiences in such a way as to give you exactly what you want from the comfort of your own home also allows data clearinghouses to form a highly detailed profile of you, including not only information you have provided but also private facts about yourself that they can statistically deduce with startling accuracy based on the massive amounts of consumer data they hold.

## Privacy vs Anonymity

This complex system that we find ourselves in demands precision of thought and language to ensure that we are able to achieve our individual privacy goals. It is therefore important to analyze and differentiate between two different, though closely intertwined notions: privacy vs. anonymity.

### Privacy

Privacy lies at the intersection of two fundamental social notions: control and trust. That is, who has control over information about you, and do you trust him or her to keep that information secret? When a student enters university, he knows that the university will be cataloging his performance in class. That catalogue of performance can function as a proxy for the student's intelligence, his work ethic, or even just his interest (or lack thereof) in a given field of study. This is intimate data about an individual that a person rightfully would like to be kept private. Unfortunately for the student, he lacks control of this data - it exists in his university's database. However, due to local laws and contractual obligations, the student knows that the university would face substantial sanctions and liability were it to reveal his private data to others without his prior authorization.

### Trust

Because of these safeguards, the student has `trust` that his private information will be protected by the university; their interests are aligned with his through threat of consequence. The student then can say that his grades or marks at university are still `private.` The fact of the matter is that we face situations like this every day. We often are coerced, either out of convenience, law, or some other force, into giving up some element of control over our private information. In the case of our student above, the only way for him to receive some sort of certification as to his confidence in a given field is to submit to the system of the university. Usually this is marked with some assurances that the information will only be used for agreed-upon purposes: we enter a trust relationship with the entity to whom we give control of our information. Unfortunately, many of these entities have shown themselves to be less than trustworthy. Whether it is governments wiretapping its own citizens without following the legal requirements to do so, or your ISP selling your browsing history to marketers and data-collectors, it becomes apparent that an individual cannot trust those to whom he is coerced into giving control of his private information.

### Anonymity

We are now faced with a predicament: how do we maintain our privacy when we are forced to give up control of our private information and we know that we cannot trust the entities to whom we give the information? Here is where the idea of anonymity comes into play. Consider a political dissident posting blog entries that are critical of the regime currently in control of his nation. In any nation, it can be assumed that there is at a subset of the population that does not support the current leadership, this is not the significant problem. The difficulty comes into play when the dissident's ISP provides the government with log data tying the blog post to his home internet connection. If he could somehow bifurcate his physical-world identity from his blog entries, then the fact that he cannot trust his ISP ceases to be relevant. This could be as simple as using open Wi-Fi access points from which to make his posts, but this can be risky as one tries to avoid patterns of access that cou ld give clues to one's identity.

### VPN services

Essentially, we see that anonymity allows us to extract the need for control and trust from all of our private information and consolidate it into one very special piece of information: our identity. The dissident blogger does not care if his government knows that there are those who oppose them - as long as they do not know that he is one of them. Anonymity, then, can be thought of as a function applied to a given set of private data. It factors out the term of `identity` from the set of data to which it is applied. However, just as a factored term can be multiplied back into a mathematical equation easily, so can the `identity` that has been factored out from a set of data. Given that routing on the internet is a complicated process and there are no guarantees of trust along the way, it makes sense to drop the `identity` term as quickly as possible from the equation in order to permanently bifurcate who you are from your information. This is the value of VPN services. By using shared pools of IP addresses and keeping only anonymized logs, one's identity is stripped from one's internet data very early in transit, providing the greatest likelihood that anyone sitting in the middle of one's traffic cannot tie it back to the specific individual.

As you choose technical safeguards to put in place to protect your privacy online, remember that there are significant economic and political entities who are trying to catalogue your every action online: everything from your latest email to your grandmother to the anonymous (or so you thought) report you made as a whistleblower to your nation's trade commission. If you are looking for a VPN service, ask questions such as the following:

  1. `Can I exit onto the internet from a country other than my own?`
  2. `What nation is the VPN company incorporated in and what are that nation's data privacy laws?`
  3. `What does my VPN provider know about me? Just my email address or do they have my credit card number too?`

The answers you find to these and similar questions will help ensure you choose services that legitimately help protect your privacy.
