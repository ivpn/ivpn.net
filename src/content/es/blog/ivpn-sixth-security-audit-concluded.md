---
title: IVPN web infrastructure security audit concluded
url: /blog/ivpn-sixth-security-audit-concluded/
highlighted: true
draft: false
authors:
  - Nick Pestell
categories:
  - IVPN News
tags:
  - Audit
  - Apps
  - Transparency
date: 2024-04-11T08:53:00.000Z
thumbnailImage: /images-static/uploads/audit.png
---
We're pleased to announce that a sixth annual independent security audit has concluded. The assessment focused on Web UI, backend components, API endpoints, underlying web servers, and web infrastructure. 

We'd like to share two key excerpts from the report:

> “The IVPN Customer website and underlying servers presented a substantially secure posture during the assessment. This is reflected in the limited findings identified within this report, consisting solely of two Low-severity vulnerabilities and two general weaknesses. The successful mitigation of a wide range of common web application risks is a testament to the effectiveness of the security measures implemented by the project overseers.”

> “To finalize, Cure53 is undeniably impressed with the overall security posture of the IVPN Customer website and its underlying infrastructure. The codebase exhibits assured standards of quality, while the implemented architecture and frameworks demonstrate a strong foundation in secure design principles.”

## Audit results

The Cure53 team conducted the audit over 8 days in March 2024. The audit was divided into three work packages:

- White-box pentests & code audits against IVPN Customer website UI
- White-box pentests & code audits against IVPN Customer website API
- Gray-box pentests & scans against related IVPN web-servers & infrastructure

A white-box approach was used whereby the auditors had access to our public and private Github code repositories and a dedicated test environment. No access to production servers or infrastructure was granted to members of the Cure53 team.

A total of two vulnerabilities (low severity) and two general issues (info level) were identified. All vulnerabilities have been remediated. 

We have made the [Cure53 report][1] available for those interested in the details. For transparency we decided to publish the full report with only potentially sensitive information redacted (e.g. internal hostnames).

## Commitments going forward 

We believe that extensive regular audits are necessary to ensure our customer’s security and continued trust. We continue to commit to an annual security audit where we will focus on those parts of our infrastructure and apps that we believe to be the most critical.

IVPN Team

[1]: https://cure53.de/pentest-report_IVPN_2024.pdf