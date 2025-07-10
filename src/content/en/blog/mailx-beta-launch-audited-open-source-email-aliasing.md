---
title: Mailx beta launch - Audited, open-source email aliasing service
url: /blog/mailx-beta-audited-open-source-email-aliasing/
highlighted: true
draft: false
authors:
  - Juraj Hilje
  - Viktor Vecsei
categories:
  - Releases
tags:
  - Audit
  - Open Source
date: 2025-07-14T08:53:00.000Z
thumbnailImage: /images-static/uploads/mailx_thumb.png
---
## In short

Today we are launching Mailx, an email aliasing and forwarding service built and operated by the IVPN Team. Mailx is in closed beta, first available free to IVPN Pro customers with at least one year of remaining time on their account, with new invite rounds to follow. To get started, log in to your IVPN account and navigate to the "Email beta" tab. Source code and results of the first security audit of the service are now available. Details below.

## About Mailx

Earlier this year [we announced][1] the IVPN team is working on multiple new products to complement our existing VPN service. An email aliasing tool that helps hide your original email from the services you use was an obvious choice for two reasons:

1. Your email address is a universal identifier used to track your activity across services. An aliasing service mitigates this issue, while protecting you from spam and phishing.

2. We offered a similar tool to early IVPN customers as a closed-end experiment which we planned to relaunch one day.

The following features are available in Mailx beta:

- Create and manage email aliases 
- Use one or multiple recipients for forwarded emails
- Instantly create new aliases on the fly with Wildcard aliases 
- Protect email content with PGP encryption
- Review email forwarding statistics 

<figure class="center">
    <img width="760px" src="/images-static/uploads/mailx_demo.png"> 
</figure>

Planned in Q3/Q4 this year:

- Additional domains available for aliases
- Optional logs for delivery issues
- Custom domain option 
- Bulk import and export of aliases


## Trust and transparency

Trust is the number one factor when assessing a privacy-focused service. We believe trust is earned through transparency:

- Mailx code is [fully open source][2]. Anyone can inspect our code to verify our claims.
- Clear privacy policy. We designed the service from the ground up to retain the least possible amount of data.
- Proactive security audit. We commissioned the independent security auditing firm [Cure53][3] to identify vulnerabilities to fix before launch.

Audit results are available [here][4].

The Cure53 team conducted the audit over eight days in May 2025. A total of six vulnerabilities (one Critical, three High, one Medium and one Low severity) and one general issue (info level) were identified. All vulnerabilities have been remediated before beta release.

Excerpts from the audit report:

> “The backend was found to demonstrate solid security practices in several areas, including proper cryptographic methods for session token generation, and most access control checks correctly validating user permissions with appropriate user ID filtering. The Go framework utilized has also provided inherent type safety protections against various injection attacks.”

> “Overall, while a Critical severity vulnerability was identified during this engagement, the application was still found to demonstrate a solid foundation, with evidence of security awareness and proper implementation in many components. Further, the identified weaknesses were found to be concentrated in specific areas, rather than representing systemic failures.”


## Get started

Mailx is first available for testing for IVPN Pro customers with at least one year remaining on their account.

To get started:

- Log in to your [IVPN account][5]
- Navigate to 'Mailx beta' tab
- Follow the steps outlined to create your free Mailx account

When you sign up, a temporary Mailx signup link is generated in the IVPN database. Once the Mailx signup is completed, the link and corresponding identifiers are removed from the IVPN database to prevent any association between Mailx and IVPN accounts. 

We will update this post and our threads on social channels when new rounds of invites become available. 

## Feedback

Send your feedback to [mailx@ivpn.net](mailto:mailx@ivpn.net), or open an issue on [GitHub][2]. 

Thank you for testing Mailx with us!

IVPN Staff

[1]: https://www.ivpn.net/blog/ivpn-year-in-review-plans-for-2025/
[2]: https://github.com/ivpn/mailx
[3]: https://cure53.de/
[4]: NEEDS_LINK
[5]: https://www.ivpn.net/account/]


