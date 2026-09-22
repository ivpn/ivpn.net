---
title: A security incident on our Bitcoin payment server
url: /blog/security-incident-bitcoin-payment-server/
highlighted: true
draft: false
authors:
  - IVPN Staff
categories:
  - IVPN News
tags:
  - Security
  - Transparency
  - Open Source
date: 2026-08-11T08:00:00.000Z
---

**Summary: on 7 August a critical vulnerability was disclosed in BTCPay Server, the open-source software we self-host to accept Bitcoin payments. It was being exploited before disclosure, and we were among the merchants hit: an attacker extracted our Lightning node credentials and transferred out our operating funds. No customer data was accessed, no customer funds were lost, and no action is required from you. Lightning payments on [ivpn.net](https://www.ivpn.net) were unavailable from 7 to 10 August and are working again.**

We are publishing this because you are entitled to know when something goes wrong on infrastructure that handles your payments, whether or not it affected you directly.

## What was not affected

Taking this first, because it is the part that matters to you.

**Our VPN infrastructure was not involved.** The payment server is a separate system that handles Bitcoin invoicing only. The compromise was confined to the payment application on that one machine: no VPN gateways or other internal systems were affected. Your VPN connections, your traffic, and the servers handling them were never involved.

**No customer data was accessed.** The vulnerability allowed an attacker to read files from specific directories used by the payment application. Our customer database lives on separate infrastructure that the payment application has no access to. BTCPay Server's [own advisory](https://blog.btcpayserver.org/security-advisory-btcpay-server-2-4-2/) confirms that the attacks they analysed targeted Lightning wallet credential files specifically.

**No customer funds were lost.** The stolen Bitcoin was ours. It was our operating balance, held in our own Lightning channels.

**Your accounts and passwords were not involved.** The attack required no credentials and did not touch account authentication. You do not need to change anything.

## Why we run this ourselves

Understanding what happened requires knowing a little about how we accept Bitcoin, and why we do it the hard way.

Most companies that accept Bitcoin and Lightning payments use a third-party processor. The processor runs the node, handles the payments, and hands over the money. It's an easy option, as someone else carries the operational burden, and there is nothing to maintain.

We don't do this, because it would mean a third party seeing every Lightning payment made to us: amounts, timing, and the network-level metadata that comes with them. That would be a company you never chose to deal with, holding records of your payments to us. It's the type of arrangement we exist to help people avoid.

So we self-host: we run BTCPay Server, which is free, open source, and designed to be operated by the merchant rather than a service provider. Our own Bitcoin node, our own Lightning node, our own payment processing, nobody in the middle. We have used and financially supported the project for many years, because software like this is why non-custodial Bitcoin payments are possible for a company our size.

The consequence: self-hosting means we run the software, and when the software has a critical vulnerability, we are exposed to it. A merchant using a custodial processor was not affected by this, because they do not run the node and do not hold its keys. We were affected because we do.

We still think it's worth it, but this incident is what the downside looks like.

## What happened

[BTCPay Server](https://btcpayserver.org) disclosed a critical vulnerability on 7 August. It allowed an unauthenticated attacker to read files from the server without any credentials. It was already being exploited when it was disclosed, and we were one of several merchants hit that day.

In BTCPay's standard configuration, the credential file that grants control of a Lightning node sits in a directory the vulnerable component could read. An attacker retrieved ours, used it to close our Lightning channels, waited for the funds to settle on-chain, and transferred them out in two transactions totalling 0.6168 BTC.

This was not a targeted attack on IVPN. Our assessment is that it was indiscriminate scanning of publicly reachable BTCPay servers. The attackers were exploiting the vulnerability before it was publicly known, so every merchant running the affected software was a potential target.

## What we did

We saw the disclosure on the evening of 7 August, immediately shut down the payment stack, upgraded to the patched release and brought the server back up. We discovered the theft during the checks that followed. Lightning payments were disabled on our website within an hour of discovery, and in the payment server shortly after.

Over the following two days we investigated in detail. We established that the attacker never reached the underlying server: no logins during either theft window, no unauthorised API credentials, no unexpected accounts, scheduled jobs or system services. The compromise was confined to the payment application.

We then rebuilt rather than repaired. The old Lightning node was destroyed and a new one created from a new seed, making the stolen credential permanently useless. All credentials were regenerated, the publicly reachable Lightning API endpoint was closed, and a secondary web interface that BTCPay enables by default, which also had full control of the node, was disabled entirely.

## Reducing what is at risk

Patching the vulnerability was straightforward. The next question was how to make a potential future compromise cost less.

Our Lightning node held our operating balance, moved to cold storage periodically. We have replaced that with an automated process. The node now holds a small working Bitcoin balance, worth a few hundred USD, and anything above that is swept to hardware wallet storage within hours with no human involvement.

The same attack today would cost us a small fraction of what it cost on 7 August. We cannot prevent the next vulnerability in open-source software we depend on, but we can make sure it is not this expensive.

## On logs, and a decision we have upheld

One decision made this investigation harder, and it's worth explaining why we're sticking to it anyway.

We could not determine exactly which requests the attacker made, because there are no HTTP request logs on the affected server and never have been. BTCPay's Docker deployment ships with request logging disabled, and we have always kept it that way, because we do not log our customers' requests.

That won't change. Enabling logging on the payment path would mean collecting records of who pays us and when, on a server that has just demonstrated it can be compromised. Logs that exist can be stolen.

This has a real cost: we cannot fully reconstruct what the attacker did. But it also means the attacker left with Bitcoin and nothing else. No record of who pays us exists on that server, so there was none to steal.

## Payments during the outage

Lightning payments were unavailable between 7 and 10 August. On-chain Bitcoin, Monero, card and PayPal payments worked throughout.

If your subscription lapsed because you could not complete a Lightning payment in that window, contact support and we will extend it.

## What we are changing about detection

We monitor security announcements from the projects we depend on, which is how we learned about this. BTCPay published their advisory at 17:51 UTC on 7 August and we had shut down and patched the server within a few hours.

The limitation is that both thefts had already happened by then, at 03:32 and 17:20 UTC. The vulnerability was being exploited before it was public, so no amount of monitoring BTCPay's announcements would have helped. We learned of the compromise when BTCPay published, not when it occurred.

We are no longer relying on being told. We are adding our own alerting on the Lightning node itself, so that unexpected balance changes or channel activity raise an alarm regardless of whether anyone has disclosed anything. The automated sweeping already limits what can be taken; this ensures we know quickly if either the sweeping stops working or something else goes wrong.

## Report to the BTCPay team

BTCPay disclosed and patched this vulnerability quickly. We have sent their team a technical report on our incident: the transaction identifiers and destination addresses, which may help correlate our case with other victims, and three findings about the default configuration that we believe affect every deployment, not only ours.

## Where this leaves us

We could have avoided this entirely by handing Lightning payments to a processor. We won't, for the reason we run this ourselves in the first place: nobody but us sees who pays us. Occasionally absorbing the cost of a vulnerability in software we didn't write is part of that.

No customer data was exposed and no customer lost money. We'd still rather you heard this from us.

The IVPN Team
