---
title: IVPN apps security audit for 2022 concluded
url: /blog/ivpn-apps-security-audit-2022-concluded/
draft: false 
authors:
  - Nick Pestell
categories:
  - IVPN News
tags:
  - Audit
  - Security
date: 2022-04-06T10:04:37.000Z
thumbnailImage: /images-static/uploads/audit.png
---
We’re pleased to announce that an independent security audit of the IVPN apps conducted by Cure53 has concluded.

Since our last audit 12 months ago we have made significant updates to apps on all platforms and judged that a new audit with similar scope is necessary this year.

It’s important to note an audit only provides a snapshot of the code in scope during the period in which it was conducted. We hope that publishing the results increases our customer’s confidence in the security of our apps and shows our commitment to operating transparently wherever possible.

## Audit results

Three senior members of the Cure53 team conducted the audit over 13 days in February and early March. A white-box approach was used whereby the auditors had access to our public Github code repositories and a dedicated test environment for backend services. No access to production VPN servers or infrastructure was granted to members of the Cure53 team.

A total of 8 vulnerabilities (1 high, 6 medium, 1 info) were discovered. All except one issue has been resolved, the remaining issue (IVP-04-014 WP, Medium) is complex to resolve without significantly affecting the user experience. The issue relates to how the daemon authenticates requests (from the user interface), which could lead to a malicious app being able to manipulate the VPN tunnel e.g. disconnect. We believe the probability of this being exploited is low, but are committed to finding a solution.

12 miscellaneous issues were discovered, 9 of which have already been resolved and 3 of which we deemed to be very low risk and have accepted it. The [Cure53 report][1] is available for those interested in the details. For transparency we decided to publish the full report with only potentially sensitive information removed (internal hostnames, code snippets etc).

*Update: 
We have addressed a vulnerability (IVP-04-014 WP) mentioned in the audit report relating to how the daemon authenticates requests (from the UI), which could lead to a malicious app being able to manipulate the VPN tunnel e.g. disconnect without the users consent. We believe the probability of this being exploited is low, but we committed to finding a solution. Today we’re releasing a new version of the desktop app (3.8.7) with Enhanced App Authentication (EAA) which significantly mitigates this vulnerability.* 

*EAA implements an additional authentication factor between the IVPN app (UI) and the daemon that manages the VPN tunnel. To enable it you will be required to define a separate password and will then be required to manually enter this password when starting the app. This functionality can be configured from the new ‘Advanced’ tab within the GUI or Command-line interface (see 'ivpn eaa --help).*


## Commitments going forward 

We believe that extensive regular audits are necessary to ensure our customer’s security and continued trust. We are committed to conducting an annual security audit where we will focus on those parts of our infrastructure and apps that we believe to be the most important.

IVPN Team

[1]: https://cure53.de/pentest-report_IVPN_2022.pdf

