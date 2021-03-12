---
title: IVPN apps security audit concluded
url: /blog/ivpn-apps-security-audit-concluded/
draft: false 
authors:
  - Nick Pestell
categories:
  - IVPN News
tags:
  - Audit
  - Security
date: 2021-03-12T10:54:37.000Z
thumbnailImage: /images-static/uploads/audit.png
---
We're pleased to announce that an independent security audit of the IVPN apps conducted by Cure53 has concluded. 

Since open sourcing our apps more than a year ago, our focus has been on a complete rewrite of our desktop apps for Windows and macOS. The goal was to deliver a more robust, secure and intuitive app experience using a single unified code base for all OSs including Linux.

One of the security requirements was a full code audit and pen test by an independent 3rd party. This enabled discovering and fixing all vulnerabilities and issues before releasing the new desktop apps to customers. Since that process has successfully concluded, we expect to release the new IVPN desktop app in the next two weeks. The auditors have also reviewed the latest versions of our mobile apps for iOS and Android. 

It's important to note an audit only provides a snapshot of the code in scope during the period in which it was conducted. We hope that publishing the results increases our customer's confidence in the security of our systems and shows our commitment to operating transparently wherever possible.

## Audit results
Five members of the Cure53 team conducted the audit over 18 person-days in late February and early March. A white-box approach was used whereby the auditors had access to our public Github code repositories and a dedicated test environment for backend services. No access to production VPN servers or infrastructure was granted to members of the Cure53 team.

A total of 4 vulnerabilities (2 critical, 2 medium) were discovered, all in the new unreleased desktop app and which were immediately resolved. 10 miscellaneous issues were discovered, 8 of which were immediately resolved and 2 of which we deemed the risk very low and are investigating solutions for. We have made the [Cure53 report](https://cure53.de/pentest-report_IVPN.pdf) available for those interested in the details. For transparency we decided to publish the full report with only potentially sensitive information removed (internal hostnames, code snippets etc).

## Commitments going forward 
We believe that extensive regular audits are necessary to ensure our customer's security and continued trust. We are committed to conducting an annual security audit where we will focus on those parts of our infrastructure and apps that we believe to be the most important.

IVPN Team
