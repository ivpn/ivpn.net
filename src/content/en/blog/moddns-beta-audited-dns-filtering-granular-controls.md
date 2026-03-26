---
title: modDNS beta - audited DNS filtering with granular controls
url: /blog/moddns-beta-audited-dns-filtering-granular-controls/
highlighted: true
draft: false
authors:
  - Maciej Tomczuk
  - Viktor Vecsei
categories:
  - Releases
tags:
  - Audit
  - Open Source
date: 2026-03-18T08:53:00.000Z
thumbnailImage: /images-static/uploads/moddns_thumb.png
---
## In short

modDNS is now available in beta for select IVPN customers. This standalone DNS service developed by the IVPN team blocks ads, trackers, and malicious domains at the DNS level with granular filtering controls.

Starting today, IVPN Pro customers with at least one year remaining on their accounts can access modDNS beta at no additional cost. Check your account dashboard for the modDNS tab to get started. 

## Why modDNS

DNS queries reveal browsing behavior to ISPs and help third-party tracking networks to build profiles of your activity. IVPN's built-in AntiTracker addresses this issue by filtering common tracking domains using pre-defined blocklist combinations. modDNS extends this protection with configurable blocklists, custom rules, and optional query logging.

You can set up modDNS system-wide on any operating system, within IVPN apps, or directly in browsers. The service supports DNS-over-HTTPS (DoH), DNS-over-TLS (DoT), and DNS-over-QUIC (DoQ) for encrypted DNS traffic.

## modDNS features

modDNS provides control over DNS filtering through several features:

**Blocklists** > Choose from curated combinations or add community-compiled lists such as Hagezi, OISD, AdGuard, StevenBlack, etc. Enable or disable lists based on preferred balance between protection and potential breakage.

**Custom Rules** > Add specific domains to your Allowlist or Denylist. Allowlist entries override active blocklists for better control over what you want to access. Denylist entries block domains not covered by existing lists.

**DNS Profiles** > Create multiple configurations for different use cases. Each profile has a unique identifier for device setup, allowing different blocking rules for separate devices.

**Query Logging**  > Optional logging (disabled by default) with configurable retention periods. Device identifiers can be appended to logs for better visibility and troubleshooting options.

<figure class="center">
    <img width="760px" src="/images-static/uploads/moddns_screen.png"> 
</figure>

## Open-source and audited

The entire modDNS codebase is available on [GitHub][1] for verification.

Further, an independent security audit by Cure53 was completed in 2025 before beta launch.

The audit identified three findings: one medium-severity vulnerability related to TOTP backup code generation, one low-severity rate-limiting issue on 2FA verification, and one info level finding about password complexity checks during updates. All issues were addressed before release.

No high or critical severity vulnerabilities were discovered during the six-day assessment by four senior testers.

From the [audit report][2]:

> “The tested scope was found to demonstrate a solid security foundation, with only minor weaknesses being identified across the entire application stack during this assignment. The development team has implemented effective security practices in order to avoid conventional web application vulnerabilities, with most attack vectors being successfully defended against through good design and implementation choices."



## What is coming

Several improvements are planned as modDNS moves toward full release. The exact order will depend on beta feedback and technical considerations, but here's what we're working on:

- Expanding server coverage to improve DNS resolution speed outside of North America and Europe

- Ongoing network routing and performance optimizations

- Blocking specific services (Facebook, Amazon, Google, etc.)

- Blocking specific categories (adult, gambling, etc.)

- Statistics page

- ipv6 support


## Beta disclaimer

modDNS is in active development. You may encounter occasional downtime or unexpected changes as we improve the service. Do not rely on modDNS for critical workflows until full release.



## Getting started

Visit your [IVPN My Account page][3] and look for the modDNS tab. IVPN Pro customers with at least one year remaining on their accounts can sign up for the service via a unique registration link.

After registration, modDNS-related identifiers are removed from IVPN systems to prevent association between accounts. modDNS will remain free for beta participants after launch as long as they maintain an active IVPN subscription.


## Feedback

Send your feedback about the service to [moddns@ivpn.net](mailto:mmoddns@ivpn.net), or open an issue on [GitHub][1]. We are particularly interested in blocklists tests, performance feedback, and feature requests that would improve your DNS filtering workflow.

Thank you for testing modDNS with us!

IVPN Staff

[1]: https://github.com/ivpn/moddns
[2]: /resources/IVP-08-report.pdf
[3]: https://www.ivpn.net/en/account/

