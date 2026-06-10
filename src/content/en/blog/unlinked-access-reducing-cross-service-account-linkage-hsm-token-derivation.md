---
title: "Unlinked Access: reducing cross-service account linkage with HSM-backed token derivation"
url: /blog/unlinked-access-reducing-cross-service-account-linkage-hsm-token-derivation/
highlighted: true
draft: false
authors:
  - Juraj Hilje
categories:
  - Under the Hood
tags:
  - Open Source
  - Privacy
  - Security
date: 2026-07-10T09:00:00.000Z
---

IVPN subscriptions now include access to [additional services](/services/) such as Mailx for email aliasing, modDNS for DNS filtering, and Portmaster for application firewall control.

The standard way to handle multi-service access is account federation: one identity propagated to every service. For a privacy company, a shared identity layer is a problem, not the solution, so we chose a different approach.

Our account system is intentionally minimal. Users do not need an email address to create an IVPN account. The primary identifier is a random account ID. When we needed a way for an IVPN subscription to unlock access to Mailx, modDNS, and Portmaster, we did not want to solve that by propagating the IVPN account identifier into every downstream application.

In a conventional federated design, each downstream service ends up with a durable link back to the same user identity. Over time, that makes it easy to build an internal picture of which service accounts belong to which subscriber. Even if that linkage is only used operationally, it tends to spread into databases, logs, backups, and admin tooling.

We built Unlinked Access to avoid that. Unlinked Access authorises access based on entitlement, without distributing the IVPN account ID. We accepted more architectural complexity in exchange for stronger data-minimisation properties, and that is the right trade-off when adding services to a shared subscription.

## What Unlinked Access does

Unlinked Access works like this:

- IVPN derives a deterministic cryptographic token from the account ID using key material protected by a Fortanix HSM.
- During signup, IVPN creates a short-lived preauthorisation record and sends a temporary bootstrap session to the target service.
- For ongoing subscription sync, IVPN publishes a manifest containing token hashes and subscription state.
- A verifier running with the downstream service fetches that manifest, authenticates it, and updates local entitlement data by matching token hashes.

The privacy claim here is not perfect unlinkability, that would be an overclaim. The claim is narrower: the routine authorisation and subscription-sync path does not require sharing the IVPN account ID with downstream services. The published manifest contains token hashes and subscription data, not IVPN account identifiers. Synchronisation works through a pseudonymous token-derived layer rather than a direct IVPN-account foreign key in each downstream database.

## How the current implementation works

The production implementation is built around five services. The codebase is open source.

### 1. Token generation

The `token` service accepts an input string and derives a token by:

- hashing the input with `SHA-512`
- sending that digest to Fortanix
- asking Fortanix to compute an HMAC-SHA256 MAC using protected key material
- returning the resulting token as base64

The `SHA-512` prehash step means Fortanix receives blinded deterministic inputs rather than raw IVPN account IDs. That does not eliminate all metadata visibility at the provider level, but it does avoid sending raw account identifiers directly into the HSM operation.

IVPN account IDs follow the format `i-XXXX-XXXX-XXXX` (alphanumeric), which provides sufficient entropy for this property to hold. The key material never leaves Fortanix-backed cryptographic operations. The application handles inputs and outputs, but not the secret itself.

This mechanism is deterministic for the same input and key. The same account ID always produces the same token, which allows the system to regenerate it for manifest synchronisation without storing a mapping. Downstream services hash this token with `SHA-256`; that hash is the stable identifier they use for ongoing synchronisation.

The `token` service exposes this function over gRPC. Both the `generator` and `preauth` services call it as clients.

### 2. Preauthorisation for immediate signup

The `preauth` service exists so a user does not need to wait for the next manifest refresh before using a linked service.

When IVPN initiates signup:

- a token is generated for the account
- the token is hashed with `SHA-256`
- a short-lived preauthorisation record is stored in Redis containing the `token_hash`, active status, expiry, and tier
- a short-lived session object containing `preauth_id` and generated token is posted to the downstream service via authenticated API call

The preauthorisation record itself stores only the token hash plus subscription metadata.

Once the downstream service has stored the token-derived data it needs locally, ongoing subscription state is maintained through manifest synchronisation.

### 3. Manifest generation

The `generator` service runs hourly.

It reads account and subscription data from the IVPN database, regenerates the deterministic token for each account, hashes each token with `SHA-256`, and builds a manifest containing:

- manifest ID
- creation time
- validity window
- a list of token hashes with subscription fields such as `is_active`, `active_until`, and `tier`

The current implementation sets manifest validity to three hours and shuffles the subscription list before writing it. The shuffling is deliberate: ordering in one manifest cannot be correlated with the ordering in the next.

Subscription expiry times are rounded to 12:00 UTC on their respective dates rather than preserving the original timestamp. This is a countermeasure against timestamp-based correlation.

The resulting manifest is then cryptographically authenticated: the JSON payload is hashed with `SHA-256`, that digest is base64-encoded, and the `token` service is used again to generate a Fortanix-backed MAC over it.

### 4. Manifest distribution

The `distributor` service serves the current manifest from disk.

Access is protected by IP filtering and a bearer pre-shared key.

In this implementation, the distributor serves a shared manifest containing token hashes and subscription state, not IVPN account identifiers.

### 5. Manifest verification and local sync

The `verifier` service fetches the manifest regularly, checks that it is still within the validity window, recomputes the manifest digest, and asks Fortanix to verify the MAC via its own Fortanix SDK client, separate from the token service.

If that check succeeds, it updates the downstream subscription table by matching local `token_hash` values against the token hashes in the manifest.

Each downstream service ends up with local subscription state keyed by token-derived hashes. It knows which local accounts are active, at what tier, and until when. It does not need the user's IVPN account ID to keep that authorisation state current.

## What Unlinked Access does not do

Unlinked Access solves one problem: multi-service access that does not require multi-service identity propagation.

It does not claim:

- perfect unlinkability against every attacker model
- elimination of all forms of traffic or metadata correlation
- immunity to logging mistakes or operational mistakes
- that cloud HSM providers learn nothing at all

In the current implementation, Fortanix receives deterministic blinded inputs rather than raw IVPN account IDs, which is better than sending the raw identifiers directly. But a provider can still observe cryptographic operations and blinded inputs over time.

The system also relies on operational controls beyond cryptography: bearer PSKs and IP-based filtering for service-to-service authentication, Redis TTLs on preauthorisation records, and authenticated webhooks for preauthorisation completion.

## Compromise scenarios

Unlinked Access is a reduction in direct cross-service identity coupling, not a universal unlinkability guarantee.

- A compromise of a single downstream service database exposes that service's local data and token-derived hashes, but not the user's IVPN account ID from that database alone.
- A compromise of multiple downstream service databases could allow correlation across those services by matching token-derived hashes.
- A compromise of the IVPN account database exposes account IDs and subscription data, but not a ready-made downstream service mapping inside that database alone.
- Intercepting a manifest reveals the token hashes and subscription metadata contained in that manifest, but not IVPN account IDs.
- Access to HSM key material would materially weaken the system, but full correlation would still require access to candidate IVPN account IDs, such as the IVPN account database.

Unlinked Access reduces the amount of direct identity linkage built into the routine authorisation path. It changes what data has to exist in downstream service databases.

## Closing

Unlinked Access reduces cross-service identity coupling, and it does so without requiring downstream services to receive the user's IVPN account ID during routine authorisation and subscription synchronisation.

Mailx, modDNS, and Portmaster can maintain local entitlement state using token-derived data and manifest synchronisation. None of that requires a conventional shared identity layer.

We decided how much cross-service correlation we were willing to create, and the architecture follows from that.

## Resources

- Unlinked Access overview: [ivpn.net/en/unlinked-access/](/unlinked-access/)
- Unlinked Access repository: [github.com/ivpn/unlinked-access](https://github.com/ivpn/unlinked-access)
- Fortanix DSM architecture: [support.fortanix.com/docs/fortanix-data-security-manager-architecture](https://support.fortanix.com/docs/fortanix-data-security-manager-architecture)
- Fortanix DSM: message authentication codes: [support.fortanix.com/docs/message-authentication-codes](https://support.fortanix.com/docs/message-authentication-codes)
- Fortanix DSM API: MAC compute operation: [support.fortanix.com/apidocs/compute-a-message-authentication-code](https://support.fortanix.com/apidocs/compute-a-message-authentication-code)
