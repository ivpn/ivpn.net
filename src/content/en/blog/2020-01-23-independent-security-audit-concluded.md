---
# Example: /blog/this-is-a-good-post
url: /blog/independent-security-audit-concluded/
highlighted: true
draft: false
authors:
  - Nick Pestell
date: 2020-01-23T16:27:01.000Z
# 740px X 740px
thumbnailImage: /images-static/uploads/audit.png
comments:
  - author: John Ivpnuser
    date: 2020-01-29T05:15:33.000Z
    content: |
      I can't seem to access the report!?
  - author: John Doe
    date: 2020-01-31T00:09:18.000Z
    content: >
      Thank you to everyone involved in the audit and being transparent about
      it. I understand that not every minor detail cannot be covered, but it's
      good to at least know that you guys are making an effort to show things
      are being done. Again thank you, I don't see much activity in regards to
      promotion of your services but I hope I prosperous new year to you all and
      that you keep this transparency up in the future.
  - author: Viktor Vecsei
    date: 2020-02-05T08:31:48.000Z
    content: >
      The link is working on our end. Please contact our customer service team
      here if you still can't access it: <a href="/contactus/" rel="nofollow
      ugc">/contactus</a> - they are ready to send it to you directly through
      other channels.
  - author: cure69
    date: 2020-03-04T10:05:31.000Z
    content: |
      great to see, thanks for doing this =)
  - author: Jorge
    date: 2020-03-14T14:43:41.000Z
    content: >
      I am not that IT literate; So how if at all does this audit correlate to
      logging" either network or user related?
  - author: spinon
    date: 2020-03-15T00:22:40.000Z
    content: >
      The total number of issues found in the Cure53 audit (9) does not tally
      with the sum of the numbers in parentheses. Why the glaring discrepancy?
  - author: Viktor Vecsei
    date: 2020-04-14T10:16:18.000Z
    content: >
      No-logs claim specifically was scrutinized in an earlier audit: <a
      href="/blog/ivpn-no-logging-claim-verified-by-independent-audit/"
      rel="nofollow
      ugc">https://www.ivpn.net/blog/ivpn-no-logging-claim-verified-by-independent-audit/</a>
  - author: Viktor Vecsei
    date: 2020-04-14T10:22:37.000Z
    content: >
      The number of low errors indicated in the original blog post (1) was
      incorrect. It is actually 3 - as visible in the full audit PDF linked. So
      the total issue count was shown correctly, while we made a basic addition
      error on that specific type. This is now fixed. Sorry.
title: Independent security audit concluded
categories:
  - IVPN News
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - Audit
  - Transparency
socalUrls:
  redditUrl: https://www.reddit.com/r/IVPN/comments/f1oyw6/extensive_independent_security_audit_of_the_ivpn/
---
We're pleased to announce that an independent security audit of the IVPN service conducted by Cure53 has concluded. The audit was conducted by 6 members of the Cure 53 team over 21 man-days in late November and December. 

The purpose of the audit was to evaluate the security of our information systems by measuring how well they conform to a set of security best practices. The audit identifies vulnerabilities that may affect the security or privacy of our customers and provides recommendations on how to resolve them. However, an audit only provides a snapshot of the systems in scope during the period in which it was conducted. We hope that publishing the results of these audits increases our customer's confidence in the security of our systems and demonstrates our commitment to operating transparently wherever possible.

The scope of the audit was very extensive and included our public VPN service infrastructure, our internal backend servers supporting our VPN service and penetration testing of our public web servers. A white-box approach was used whereby Cure53 was given full access to all our code repositories and a dedicated audit environment created to replicate our exact production environment. No access to production VPN servers or infrastructure was granted to members of the cure53 team.

A total of 9 issues (3 high, 2 medium, 3 low, 1 info) were discovered, all of which were either immediately resolved or have since been resolved. Although the general assessment concludes the audit on the positive note and the vast majority of infrastructure was shown to be designed with high levels of security, the audit identified two vulnerabilities which we'd like to expand on below.

1. **Disabled CSRF token**

During the audit it was identified that CSRF protection middleware on the IVPN website was commented out.

Although it was re-enabled immediately, it showed that our development process failed to protect us from this code being deployed in the first place. We believe that the code disabling CSRF was pushed to production accidentally by a developer with intention to debug some transient issue on staging and then merged it to production branch.

The attacker would yield no personal data (beyond what would be required to be already known for the attack to succeed) or affect the privacy or security of the customers VPN service in any way. The only possible adverse effect would be locking the user out of their account by modifying their password. Regardless, we take this vulnerability very seriously and have already done the following to ensure this vulnerability can't be exposed again:

  * Created strict rules within our deployment process to peer-review code before deployment (and configured branch permissions to ensure this).
  * Added automated tests to ensure this specific vulnerability cannot be deployed.

**2. Add-on modules vulnerabilities**

We have a legacy system from the early years of our business which contained modules with various security issues. This system has multiple levels of protection and were only accessible to someone

  * with access to our internal network
  * with valid access credentials to the legacy server
  * with 2FA authentication set up on the legacy server

Although only a few people in the company could theoretically exploit these modules, we acknowledge that they should have been removed earlier and it shows that we had a blind spot in the legacy part of our infrastructure. To resolve this issue we immediately deactivated the insecure modules.

### Commitments going forward {#Commitments-going-forward-2020-and-beyond}

We believe that extensive regular audits are necessary to ensure our customer's security and continued trust. We are committed to conducting an annual audit of all our infrastructure. We will initiate another comprehensive audit of similar scope towards the end of this year and every 12 months after that.

We have made available the [Cure53 report][1] for those interested in more detail. For transparency we decided to publish the full report with only the details about the vulnerabilities removed to ensure sensitive information about our infrastructure was not exposed (internal hostnames, code snippets etc).

IVPN Team

 [1]: https://cure53.de/summary-report_ivpn_2019.pdf