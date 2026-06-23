---
title: Annual security audit scheduled for 2026
url: /blog/annual-security-audit-scheduled-2026/
highlighted: true
draft: false
authors:
  - Nick Pestell
categories:
  - IVPN News
tags:
  - Audit
  - Transparency
  - Security
date: 2026-06-19T08:00:00.000Z
thumbnailImage: /images-static/uploads/audit.png
---
Consistent with our commitment to [regular independent security audits](https://www.ivpn.net/en/blog/tags/audit/), we have scheduled our eighth annual security audit with [Cure53](https://cure53.de/), to be conducted over the course of two weeks in July.

As in previous years, audits target systems and services that have undergone significant updates and where review provides the most value to customers in terms of security and auditability.

The most relevant addition since the previous audit is Unlinked Access, the system that allows IVPN Plus and Pro Suite subscriptions to grant access to Mailx, modDNS, and Portmaster without propagating IVPN account identifiers to those services. Read the [Unlinked Access overview](/unlinked-access/) and the [technical deep-dive](/blog/unlinked-access-reducing-cross-service-account-linkage-hsm-token-derivation/) for details.

Scope of the audit includes the cryptography and privacy model and the following services: generator, token and preauth, verifier and distributor.

**A note on no-logs audits**

Our last and only no-logs audit was conducted by [Cure53 in March 2019](/blog/ivpn-no-logging-claim-verified-by-independent-audit/). We have not repeated this format since.

Claims around 'no-logs' audits can be misleading, or at best ambiguous to customers. Audits are a snapshot in time: any VPN service receiving a 'no-logs' stamp from independent evaluators can update its systems and start collecting sensitive data the following day. We have also seen some VPN providers cite such audits as a marketing tool that creates a false sense of security. For these reasons, we will not commission further no-logs audits.

**Previous audit results**

Results from the 2025 audit covering Mailx and modDNS are published:

- [modDNS audit results](https://www.ivpn.net/blog/moddns-beta-audited-dns-filtering-granular-controls/)
- [Mailx audit results](https://www.ivpn.net/blog/mailx-beta-audited-open-source-email-aliasing/)

Nicholas Pestell<br>
CEO<br>
IVPN

