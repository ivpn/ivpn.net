---
title: IVPN Subscription Tiers Explained / Plan Differences, Billing, and Service Management - IVPN Help
h1: IVPN Subscription Tiers Explained / Plan Differences, Billing, and Service Management
url: /knowledgebase/billing/ivpn-subscription-tiers-explained-plan-differences-billing-and-service-management/
sections:
    - billing
sectionTitle: Billing
layout: help-details
weight: 10
---
# IVPN Subscription Tiers Explained / Plan Differences, Billing, and Service Management
IVPN subscriptions are available in three tiers: Standard, Plus, and Pro Suite.

Standard includes the VPN service with Multi-hop, AntiTracker, and up to five devices. Plus features everything in Standard and adds [Mailx](https://www.mailx.net) and [modDNS](https://www.moddns.net/). Pro Suite includes everything in Plus and adds [Portmaster Pro](https://safing.io/pricing/), with VPN device limit increased to 10. A full comparison is available on the [Services Overview](/services) page.

If you had an existing IVPN Standard or Pro plan before May 2026: Standard now includes Multi-hop and a five-device limit, up from two. Pro is now the Pro Suite with access to [additional services](/services) and a ten-device limit, up from seven. Pricing is unchanged and no action is required on your part. Details of these changes are covered in the [announcement blog post](/blog/ivpn-plan-changes-new-plus-tier-increased-device-limits-additional-privacy-services/).


1. ### How do I get access to Additional Services after purchase?
    Log into the Account Area on the ivpn.net website, locate the "Additional Services" area near the bottom of the page, and click the "Set up" button to enable a service.  A new browser tab will open to add credentials to the account for the service.

1. ### When I click "Set up" for Mailx or modDNS, do I get a separate credential I also need to save?
    Yes. Services have no knowledge of any other service, so separate credentials are required.  IVPN accounts require no email address, but both Mailx and modDNS require a valid email address. You have the option to use passkeys or passwords for these services, and 2-factor authentication is available.

1. ### Can I upgrade mid-subscription? Is the price difference prorated?
    Yes, and yes. Cash and Apple/Google in-app payments are not available for upgrades.

1. ### When will my account renew after upgrading?
    The original IVPN account expiry date is unchanged after upgrade.

1. ### How do I downgrade? Can I do it at any time?
    Contact support to initiate an IVPN account downgrade. You will be presented with a choice to receive either a prorated refund, or a time extension on the existing expiry date, based on the time remaining and the new product selected.
    
    For cash and Apple/Google in-app payments, only the time extension option is available.
    
    If you have used a variety of payment methods over the history of the IVPN account, the most recent payment method governs the available options to handle the downgrade reimbursement.

1. ### If I downgrade, will I have to set up the VPN again?
    A downgrade from the IVPN Pro Suite to either Plus or Standard resets all IVPN App sessions, and the app will require a login on all devices. A downgrade from IVPN Plus to Standard has no impact on the IVPN App's sessions, so no logging back in is required.
    
    Manually generated and added WireGuard keys remain intact in all scenarios, so no action is required with manual connections where the IVPN App is not involved, like routers.

1. ### What happens to my Additional Services and devices when I downgrade?
    Access to extra services will be immediately removed after the downgrade is complete.  You will be asked to confirm your downgrade choice before the process is performed.
    
    Export data from Mailx and modDNS before confirming the downgrade request to prevent data loss.
    
    The Mailx and modDNS accounts will no longer be associated with your IVPN account and will be purged from our systems. Once removed, access cannot be restored.
    
    Portmaster Pro will revert to Portmaster Free.

1. ### What happens to my Additional Services if my IVPN account expires?
    Limited access will be available to give time to restore access with a payment.
    
    Mailx will continue to forward mail, and modDNS will continue to resolve queries during the limited access period.  No changes to either service will be accepted, like creating new mail aliases or modifying custom DNS entries.
    
    After the limited access period for the Mailx and modDNS services, only the export option will be available.  Accounts inactive after the limited access period will be automatically deleted.
    
    Portmaster Pro reverts to Portmaster Free when the account expires. SPN access and detailed bandwidth history are not available on the Free tier.

1. ### If I lose the Mailx or modDNS credentials, what happens to my aliases and DNS config? How do I recover the accounts?
    The Mailx aliases and modDNS profiles will remain active as long as the IVPN account is active.
    
    Account recovery using your IVPN Account ID is not possible due to the privacy-first design of [Unlinked Access](/unlinked-access). Contact support to reset access to Mailx and modDNS, which will enable you to create fresh accounts for these services.
    
    After reset, previous Mailx and modDNS accounts will not receive expiry date synchronization updates from the active IVPN account, and will be purged from our systems.
    
    We recommend that you store your Mailx and modDNS access details in a secure place to avoid this scenario. You can also set up multiple login methods (i.e. a passkey alongside email and password) as a failsafe. You might also prefer to regularly export data from your accounts to mitigate the recovery time from this scenario.

