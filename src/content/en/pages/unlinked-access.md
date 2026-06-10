---
title: Unlinked Access by IVPN
description: Unlinked Access is a system developed by IVPN that lets Mailx, modDNS, and Portmaster grant and synchronise subscription access without receiving or storing your IVPN account ID.
url: /en/unlinked-access/
aliases: ['/unlinked-access/']
---
# Unlinked Access by IVPN

## Subscription access without sharing your IVPN account ID

Unlinked Access is a system developed by IVPN that lets Mailx, modDNS, and Portmaster grant and synchronise subscription access without receiving or storing your IVPN account ID.

## The problem with bundled service access

Most platforms that bundle multiple services under one subscription use account federation: one identity tied to every product you access. Each service ends up with a stored link back to the same user. Even when that linkage is only used operationally, it tends to spread into databases, logs, backups, and admin tooling. Over time, it creates a cross-service profile.

IVPN accounts are intentionally minimal. No email address is required to create one, and the primary identifier is a random account ID. When we added Mailx, modDNS, and Portmaster to IVPN plans, we did not want to solve the multi-service access problem by propagating that account ID into each service.

## How Unlinked Access works

When you activate a service through your account area, IVPN generates a cryptographic token derived from your account ID. That token is sent to the target service during activation, not your IVPN account ID. Each service stores a hash of that token, not the token itself.

For ongoing synchronisation, additional services use a stored hash of the token rather than the IVPN account ID. Subscription status, such as plan, active state, expiry is synchronised regularly through a distributed manifest containing the hashes.

This means Mailx, modDNS, and Portmaster can confirm that you are entitled to access the service and keep your subscription status current without needing your IVPN account ID to do so.

## What this means for you

- Mailx, modDNS, and Portmaster do not store your IVPN account ID.
- A compromise of one service database does not by itself reveal your IVPN account ID or a direct mapping to your other service accounts.
- Subscription synchronisation is automatic. You do not need to manually reauthorise access when your IVPN plan renews.

## What Unlinked Access does not cover

Unlinked Access solves one specific problem: direct cross-service account linking through shared identifiers.

It does not address every possible correlation risk, such as:

- IP address correlation
- usage pattern analysis
- timing-based inference
- browser- or device-level fingerprinting
- operational mistakes outside the Unlinked Access design itself

Those are separate threat-model considerations outside the direct scope of Unlinked Access.

The implementation is open source. Review the source code on GitHub (https://github.com/ivpn/unlinked-access) or read the [technical deep-dive](/blog/unlinked-access-reducing-cross-service-account-linkage-hsm-token-derivation/) for a detailed walkthrough of the cryptographic design and threat model.

## Frequently asked questions

### Can IVPN staff link my IVPN account to my Mailx, modDNS, or Portmaster account?

Not from the data the services store. Additional services use token-derived hashes rather than IVPN account IDs, and they do not contain a direct mapping back to your IVPN account. IVPN staff with access only to a service database cannot identify which IVPN account you hold.

That said, Unlinked Access is not a guarantee of perfect unlinkability. The token derivation is deterministic. Recovering the link between an IVPN account and a service account would require access to multiple separate systems, not just the service database itself.


### Does Unlinked Access protect me from tracking across these services completely?

No. Unlinked Access eliminates the most direct form of internal correlation: sharing the IVPN account identifier across additional services. It does not claim to eliminate every possible form of cross-service correlation under every compromise scenario.

What Unlinked Access prevents most directly is a straightforward lookup from a Mailx, modDNS, or Portmaster database back to your IVPN account ID.

### If Mailx, modDNS, or Portmaster is compromised, does my IVPN account get exposed?

A compromise of one service database does not by itself reveal your IVPN account ID. A compromise would typically expose the data that service stores for its own operation, along with token-derived data used for subscription synchronisation

Unlinked Access is designed so that subscription synchronisation does not require your IVPN account ID to be present in additional service databases.

### Why do Mailx and modDNS require an email address if my IVPN account doesn’t?

IVPN does not use a shared identity layer between services. That means additional services manage their own account and recovery requirements independently. IVPN staff can't routinely recover your Mailx or modDNS accounts through a linked identity.

For Mailx, you need real access to the email inbox, since that's the address the service delivers to. For modDNS, the email requirement is for account recovery, but you can use the service without verifying it. Portmaster supports an email address for account recovery, but it is not mandatory.

### How does my additional service access stop when my IVPN subscription expires?

IVPN publishes updated authorisation data on a regular schedule. When subscription state changes, additional services fetch the latest manifest and update their local authorisation state.

Any service-specific behaviour after expiry is handled by the service itself.

There is a 14-day limited-access window after expiry for additional services. Mailx continues to forward mail, modDNS continues to resolve queries. Changes to aliases and profiles are not accepted during this window. Portmaster reverts to Portmaster Free immediately after the account expires.
