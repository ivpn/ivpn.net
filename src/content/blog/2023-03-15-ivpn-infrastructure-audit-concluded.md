---
title: IVPN infrastructure security audit concluded
url: /blog/ivpn-infrastructure-audit-concluded/
draft: false 
authors:
  - Nick Pestell
categories:
  - IVPN News
tags:
  - Audit
  - Security
date: 2023-03-15T11:04:37.000Z
thumbnailImage: /images-static/uploads/audit.png
---
We're pleased to announce that an independent security audit of the new IVPN gateway infrastructure has concluded.

We recently decided it was necessary to upgrade our VPN gateway servers to a major new OS version which included many configuration changes. This provided a good opportunity to audit the new servers in our testing environment before deploying them to production for customer use.

## Audit results

Two senior members of the Cure53 team conducted the audit over 6 days in February 2023. The audit was divided into two work packages:

1. Penetration tests and configuration review of the VPN gateway server.
2. Source code-assisted penetration tests against the VPN server OS and OS setup. 

A white-box approach was used whereby the auditors had access to our public and private Github code repositories and a dedicated test environment. No access to production VPN servers or infrastructure was granted to members of the Cure53 team.

A total of 3 security vulnerabilities and 5 miscellaneous issues were discovered (1 medium, 6 low, 1 info). All issues have been remediated. As a result we are now planning the upgrade of our infrastructure with the new configuration. We have made the [Cure53 report](https://cure53.de/pentest-report_IVPN_2023.pdf) available for those interested in the details. For transparency we decided to publish the full report with only potentially sensitive information removed (internal hostnames etc).

## Commitments going forward

We believe that extensive regular audits are necessary to ensure our customer’s security and continued trust. We continue to commit to an annual security audit where we will focus on those parts of our infrastructure and apps that we believe to be the most critical.

IVPN Team