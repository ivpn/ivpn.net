---
title: IVPN no-logging claim verified by independent audit
# Example: /blog/this-is-a-good-post
url: /blog/ivpn-no-logging-claim-verified-by-independent-audit/
draft: false
authors:
  - Nick Pestell
categories:
  - IVPN News
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - Audit
  - Security
date: 2019-03-21T16:15:26.000Z
# 740px X 740px
thumbnailImage: /images-static/uploads/audit.png
comments:
  - author: Liz_siz
    date: 2019-08-03T05:48:02+02:00
    content: |
      Bravo, excellent idea
  - author: Adilalhawa
    date: 2019-08-09T06:11:11+02:00
    content: |
      Hello world
  - author: yizakqsdux
    date: 2019-12-09T18:57:58+01:00
    content: |
      I diverse these this prepackaged (fit the most part)
  - author: Anonymous
    date: 2019-12-10T15:32:19+01:00
    content: |
      Well done on passing the audit! Although it should be noted that this audit did not investigate all of your systems. Basically, this audit only covers yours servers. It doesn't cover your client software (ie apps) nor your other systems, such as customer support and billing. Do you have any plans to have those audited?
  - author: Viktor Vecsei
    date: 2019-12-10T20:28:15+01:00
    content: |
      Thanks for your comment! A comprehensive audit is under way right now. Please see more here: <a href="/blog/ivpn-to-undergo-extensive-security-audit/" rel="nofollow ugc">https://www.ivpn.net/blog/ivpn-to-undergo-extensive-security-audit/</a>


---
From the start of IVPN, almost 10 years ago, we engineered our systems to not log any data that could be tied to an individual user account. Until now our customers had no way to verify this but today we're proud to announce the results of an independent audit conducted by [Cure53][1].

Below is an excerpt from the conclusion ([Download][2] the full unredacted report from Cure53's website)

> "To conclude this Cure53 audit and verification of the IVPN privacy-related claims yielded very positive results. The outcomes of this March 2019 audit, paired with fluent communications as well as the general handling of every aspect discussed during the assessment, attest to the considerable dedication to privacy matters at the IVPN project. Based on the findings, it is safe to say that all of the IVPN's privacy statements could be verified as truthful within the defined scope. The requirements for both general security claims to be considered appropriate were successfully well met for all VPN gateways."

The scope of the audit was to verify the no-logging claims made in our privacy policy and included all IVPN systems that are involved in serving a customers VPN connection, including the VPN gateway servers and authentication servers. A total of 3 auditors spent 7 days performing the audit during March 2019. 

When we setup IVPN and configured the our systems not to log, it required a lot more than directing logs to the null device. We have a complex configuration of scripts that set up and tear down dynamic configurations for port forwarding, multi-hop etc. These scripts communicate and store state information without persisting any data to disk, one of many design decisions we've made as a security-focused company. 

Cure53 was able to identify only one issue which they classified as 'low' impact and which they said "does not negatively impact this conclusion". The issue was that our DNS servers temporarily cache their responses to improve performance however none of this data is related to a customer IP address or user account in any way and is only stored temporarily until the cache timeout. This means that if an adversary had access to a DNS server they could see what domains had been recently resolved but not which customer IP had sent the request. Regardless we decided to disable the caching so this issue has been fully mitigated. 

We expect this report to provide another strong signal that we take our customers privacy and security very seriously and are dedicated to being as transparent as possible. If you have any questions relating to this audit please do not hesitate to [contact us][3].

 [1]: https://cure53.de/
 [2]: https://cure53.de/audit-report_ivpn.pdf
 [3]: /contactus/
