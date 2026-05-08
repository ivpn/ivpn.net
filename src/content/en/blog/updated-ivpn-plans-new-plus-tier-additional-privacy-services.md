---
title: IVPN plan changes - new Plus tier, increased device limits, additional privacy services
url: /blog/ivpn-plan-changes-new-plus-tier-increased-device-limits-additional-privacy-services/
highlighted: true
draft: false
authors:
  - IVPN Staff
categories:
  - IVPN News
tags:
  - Subscriptions
date: 2026-05-08T08:00:00.000Z
---

## In short

- IVPN plans are available in three tiers: Standard ($60/year), Plus ($80/year), and Pro Suite ($100/year)
- Standard VPN plan now includes Multi-hop and a 5-device limit
- IVPN Plus includes all features from Standard, plus access to the new services Mailx and modDNS 
- IVPN Pro Suite offers a 10-device limit, and access to all additional services, including Portmaster Pro (Windows/Linux)
- No price changes on existing Standard and Pro plans, Pro is now Pro Suite

## New plans overview

IVPN now offers three distinct plans:

| | Standard | Plus | Pro Suite |
|---|---|---|---|
| IVPN with Multi-Hop | 5 devices | 5 devices | 10 devices |
| Mailx | - | Included | Included |
| modDNS | - | Included | Included |
| Portmaster Pro | - | - | Included |
| Price / week | $2 | $3 | $4 |
| Price / month | $6 | $8 | $10 |
| Price / year | $60 | $80 | $100 |

## For existing customers

If you have an IVPN Standard plan, it now includes Multi-hop and a 5-device limit, up from 2.

If you have an IVPN Pro plan, it is now IVPN Pro Suite. Device limit increases from 7 to 10. You also have access to Mailx, modDNS, and Portmaster Pro at no additional cost.

No action is required as these changes apply automatically. Pricing is unchanged for both plans.

## Additional services

Plus and Pro Suite subscribers can access open-source privacy services built and operated by the IVPN team. These work independently of the VPN, no active connection is required. Full feature comparison on the [Services overview](/services/) page.

### Mailx (Plus, Pro Suite)

[Mailx](https://mailx.net) is an email aliasing and forwarding service. Create unique addresses for each service you sign up to. Mail is forwarded to your real inbox without exposing your address to third parties. Wildcard aliases and PGP encryption are supported. Custom domains and a browser extension are in active development.

### modDNS (Plus, Pro Suite)

[modDNS](https://moddns.net) is a DNS filtering service with configurable blocklists and custom rules. Blocks ads, trackers, and malicious domains at the DNS level. Provides more granular control than the built-in IVPN AntiTracker: you can combine blocklists, define custom allow and deny rules, and optionally enable query logging for troubleshooting. Supports DNS over HTTPS, TLS, and QUIC.

### Portmaster (Pro Suite, Linux and Windows only)

[Safing Portmaster](https://safing.io) is an application firewall that monitors every network connection by process. You can set per-app rules for domains, IPs, countries, and ports. Portmaster Pro includes [SPN](https://safing.io/spn/), a multi-hop onion-routing network that assigns a separate path to each connection. SPN is a VPN alternative for threat models that require per-connection path diversity. Different applications exit through different nodes, so a destination server sees a different IP address for each connection.

You can use IVPN, modDNS, and Portmaster together on supported systems. Configuration details for DNS and routing are available in the [privacy services compatibility](/knowledgebase/privacy/how-do-ivpns-privacy-services-work-together/) article.

## How to activate additional services

1. Log in to your IVPN [Account Area](https://www.ivpn.net/account/)
2. Navigate to "Additional Services"
3. Click "Set up" next to the service you want to activate
4. A new tab opens where you create credentials for that service

Each service has its own account and credentials. IVPN accounts do not require an email address, but Mailx needs one for email forwarding and modDNS for account recovery. Because additional services are not linked to your IVPN account ID (see Unlinked Access), our staff cannot recover them using your IVPN account details.


## Unlinked Access

With Unlinked Access, Mailx, modDNS, and Portmaster verify your subscription and keep it current without your IVPN account ID.

When you activate an additional service included in your plan, IVPN generates a cryptographic token derived from your account ID. That token is sent to the service during activation, not your account ID. Each service stores a hash of that token, not the token itself.

Subscription status, such as plan, active state, and expiry, is synchronised regularly through a distributed manifest containing the hashes.

For more details, including limitations, consult the [Unlinked Access](/unlinked-access/) explainer.

## Legacy accounts

The Plus tier and additional services are available for IVPN accounts created after November 2020. If your account predates this, [contact support](https://www.ivpn.net/contactus/) to discuss migration options. Legacy accounts receive the device limit upgrades (2 to 5 for Standard, 7 to 10 for Pro).

## Useful links

- [Services overview](/services/): feature descriptions and plan comparison for all tiers
- [Subscription tiers FAQ](/knowledgebase/billing/ivpn-subscription-tiers-explained-plan-differences-billing-and-service-management/): upgrades, downgrades, billing, and expiry
- [Privacy services compatibility](/knowledgebase/privacy/how-do-ivpns-privacy-services-work-together/): VPN, modDNS, and Portmaster interaction, AntiTracker vs modDNS, platform support
- [Unlinked Access](/unlinked-access/): how subscription verification works across services

IVPN Staff
