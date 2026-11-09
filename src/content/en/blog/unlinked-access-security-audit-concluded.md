---
title: Unlinked Access security audit concluded
url: /blog/unlinked-access-security-audit-concluded/
highlighted: true
draft: false
authors:
  - Viktor Vecsei
  - Juraj Hilje
categories:
  - IVPN News
tags:
  - Audit
  - Transparency
  - Security
date: 2026-11-06T10:00:00.000Z
thumbnailImage: /images-static/uploads/audit.png
---
We're pleased to announce that our eighth annual independent security audit has concluded. The assessment focused on [Unlinked Access][1], the system that lets IVPN Plus and Pro Suite accounts access Mailx, modDNS and Portmaster without passing IVPN account identifiers to those services.

A few excerpts from the report:

> “The cryptographic foundation is built on state-of-the-art primitives that are naturally resilient to misuse, while the privacy-preserving unlinked architecture itself is thoughtfully and robustly designed.”

> “The codebase is compact, readable, and internally consistent. The selected primitives grant scant opportunity for misuse, while the privacy and unlinkability model that motivates the feature is thoughtfully constructed.”

## Audit results

The Cure53 team conducted the audit over 10 days in July 2026. The audit was divided into four work packages:

- White-box pentests & audits against IVPN token & pre-auth services
- White-box pentests & code audits against IVPN distribution services
- White-box pentests & code audits against IVPN verifier & clients
- White-box pentests & code audits against IVPN crypto & privacy model

A white-box approach was used whereby the auditors had access to the [Unlinked Access source code][2] and supporting test material.

A total of five vulnerabilities (one high, three medium and one low severity) and seven general weaknesses (one high, two medium and four low severity) were identified. All vulnerabilities were remediated in August 2026.

We have made the full [Cure53 report][3] available.

## Commitments going forward

As before, we believe that extensive regular audits are necessary to ensure our customers' security and continued trust. We continue to commit to annual security audits where we will focus on those parts of our infrastructure and apps that we believe to be the most critical.

IVPN Team

[1]: /unlinked-access/
[2]: https://github.com/ivpn/unlinked-access
[3]: /resources/IVP-09-report.pdf
