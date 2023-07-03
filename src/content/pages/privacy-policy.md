---
title: IVPN Privacy Policy
description: Its important our customers fully understand what private information we collect, store and process. Read our clear and simple policy to get the facts you need.
url: /privacy/
layout:
canonical:
---
# Privacy Policy

We're built for privacy. Internally, we know what exactly that means; we use privacy as a filter for decision-making. If a choice needs to be made between one practice that deepens a user's privacy, and another that would diminish it but accelerate our growth, we'll always take the slower, more private option. If you'd like to know more about our principles and beliefs that drive our choices, please see our [team](/team/) and [ethics](/ethics/) pages.

We realize how important it is that our customers fully understand what we
mean by privacy. This policy gives you an overview of;

* What we mean by "logless"

* What information we collect, how it's stored, and how it's used

* What happens in the case we are subpoenaed, receive a court order or DMCA copyright infringement notice

* What we do with information relating to cancelled or dormant accounts

* How we handle subject access requests

We've tried our best to make this policy human-readable so you can get the facts you need quickly.

### Zero user information is our goal

As a privacy service we believe it's crucially important to collect the minimum information required to operate our service. Many companies require at least an email address so they can push subscription renewals and enable other customer growth strategies.  When you sign up for IVPN, you will not be asked for any personal information e.g. email address, name etc. We will also not log any personally identifiable information e.g. IP address. 

This also means that we have no way to contact you in the event of any account issues, network downtime etc. If you wish to provide us with an email address so we can contact you about future issues, you can optionally add one in the client area after sign-up.

### What data don't you log?

We do not log any data relating to a user's VPN activity (while connected or connecting to the VPN).

* No traffic logging

* No connection timestamp or connection duration (except when port forwarding is enabled, explained below)

* No DNS request logging

* No logging of user bandwidth

* No logging of customer IP addresses

* No logging of any account activity except active total simultaneous connections (explained below) 

### What data do you log on sign-up?

When a new account is created, we store the following data: (please note that we are using simplified field names and formatting below to highlight the relevant information)

<div class="table-container-mobile">

| ID | Created at | Product | Max devices |
|---|---|---|---|
| i-XXXX-XXXX-XXXX | 2020-09-21 05:03:13 | IVPN Pro | 7 |

</div>

### What information is logged when making a payment using a credit card, PayPal, Cash, cryptocurrency or voucher code?

When you add time to your account, the following information is stored:

<div class="table-container-mobile">

| Payment ID | Account ID | Amount | Currency | Timestamp | Transaction ID |
|---|---|---|---|---|---|
| xxx | xxx | 100 | USD | 2020-10-2 14:01:11 | xxx |

</div>

Some payment information may be related to your account, for example, if PayPal is used a PayPal transaction ID will be associated with your account, as well as a subscription ID to set up a PayPal subscription. If payment is made using our BTCPay server, then the BTCPay transaction ID will be associated with your account (note that we operate our own BTCPay server). If you add time with voucher code, it is stored in our system and associated with your account ID for 30 days after redemption, then deleted. 

For credit card payments, we use Braintree as our payment processor, and store a Braintree transaction ID against your account. If you elect to enable auto-renew for card payments, a subscription ID will also be stored.

This is the data we store for a credit card payment:

<div class="table-container-mobile">

| Payment ID | Account ID | Amount | Currency | Timestamp |
|---|---|---|---|---|---|
| xxx | xxx | 100 | USD | 2018-10-2 14:01:11 |

</div>

In order to process your payment, Braintree and PayPal will request additional information. Braintree requires collection of your card details to process your payment, and PayPal will require name, email and address information to create a new PayPal account as well as agreement to their terms of service. These additional data points are not stored by IVPN, though Braintree and PayPal are required to retain them for many years. No third-party payment provider has access to your IVPN account ID.

In short, where we can offer anonymous payment methods we will, and we collect as little information as possible to process them. However, centralised or third-party payment systems and their data processing and storage are out of our control.

Please select cash or cryptocurrency payments should this be of concern.

### Why do you store transaction_id and subscription_id?

To be able to process refunds for our 30-day money-back guarantee and resolve other payment issues, as well as to enable auto-renewal of subscription.

### What information is logged when I enable port forwarding?

If, and only if port forwarding is enabled for your account we store a timestamp for the last connection event that occurred. We use this data to release unused ports after 14 days of inactivity.

We don’t log any other information, such as connecting IP address, server connected to, bandwidth, DNS requests or other traffic related data.

This is the data we store in relation to port forwarding:

<div class="table-container-mobile">

| Port | Account ID | Created on| Last used | 
|---|---|---|---|
| xxx | xxx | 2020-05-01 11:05:11 | 2020-05-02 14:01:11 |

</div>

### What information is logged when I visit the IVPN website?

IVPN have selected [Matomo](https://matomo.org) as their web analytics platform. Web analytics allow us to understand our users engagement with our site to understand where it delivers value, and where it can be improved in terms of usability, simplicity and speed. It also helps us to understand where our site visitors originate, and audit those referring sites to ensure they aren't making unfounded or exaggerated claims.

Matomo is open source software that is hosted on our own server infrastructure to ensure your privacy (unlike platforms such as Google Analytics). For example, the Center for Data Privacy Protection in France (CNIL) recommended Matomo as the only tool that can easily ensure full compliance with privacy regulations. Matomo is used to analyse in aggregate information about our website visitors.

When your web browser loads a page on our site, a small snippet of JavaScript code is executed within your browser which submits information such as;

* your browser user-agent,

* language,

* screen resolution,

* referring website,

* IP address.

To ensure your privacy, IVPN discards the last two octets of the IP address. Matomo may also set a web cookie to facilitate the identification of users who revisit the site.

### Where is my data stored and who has access to it?

IVPN is subject to EU law and is in compliance with the EU Data Protection Directive (Directive 95/46/EC), which prohibits companies transferring data to overseas jurisdictions with weaker privacy laws. IVPN will not locate servers in countries where it's forced to break this compliance. Due to the nature of our logging practices, VPN servers do not contain any personally identifiable information and thus, if seized, could not be used to identify users.

No third-parties have access to any of your data. We always use first or third-party tools we can host on our own servers in a protected and secure environment.

### How do you limit simultaneous connections?

To authenticate customers, our VPN servers send a request to a central authentication server, containing the customers account ID. The authentication server holds a temporary record of all connected customer ID's. When a customer connects to a VPN gateway, the authentication server checks how many active authentication records are already in the table for the account ID, if it exceeds the allowed number of simultaneous connections, then authentication is denied. When a user disconnects, the relevant record is permanently deleted. If an adversary was able to gain access to this data, they could only determine which account ID's were logged into the VPN network at that exact moment in time.

As this data is only stored for the duration of the VPN session, if you or anyone requests to know how many connections you had at a specific time in the past, we couldn't tell you because we don't store it.

### What information is retained when I stop using your service?
When a VPN account is terminated on our network due to the subscription ending, non-payment or for any other reason, all data associated with that VPN account including the account itself (with the exception of the accounting data below) is automatically deleted after 90 days. After the account is deleted, the remaining accounting data below has no link to any past account ID. If you want to delete your data immediately, simply click on the 'delete account' button within the client area.

<div class="table-container-mobile">

| Date of payment | Amount | Payment method | Transaction ID | Subscription ID |
|---|---|---|---|---|
| 2020-01-24 | $100 | Paypal | XXX | XXX |

</div>

### How can I get access to the data you store on my behalf via a subject access request?

In accordance with GDPR legislation, reasonable requests for release of a specific user's data will be honoured within 28 days of an acceptable request from a user or person with a provable legal relationship with that user.

We reserve the right to refuse or charge for requests that are manifestly unfounded or excessive. Any refused subject access requests will be responded to without undue delay including the refusal reason as well as recourse to refer to the supervisory authority.

Subject access requests should be made in writing to sar@ivpn.net

### Where is the regulatory authority that oversees the jurisdiction in which IVPN operates under GDPR?

IVPN is registered in Gibraltar, and as such the GDPR regulatory body is the [Gibraltar Regulatory Authority](http://www.gra.gi/).

### What happens if you receive a legal notice such as a DMCA for copyright material that I have downloaded?

Since our customers are using an IVPN issued IP address when using our service, such notices are directed to IVPN and our legal department will issue an appropriate response. Since we store no connection logs, we couldn't associate a request with a customer identity even if legally compelled to do so.

### How do you react when requested by an authority for information relating to a customer?

The company is incorporated in Gibraltar. If a court order is received from a recognised legal authority with jurisdiction over IVPN, then the company will comply with that order. However, the company cannot be compelled to hand over information which it does not have. When a customer signs up, we request no personal information. If it ever becomes required by law for us to keep a persistent log of our customers connections or any personal data relating to their network activity, we will immediately notify our customers and do everything in our power to move jurisdictions or close the service to protect those who entrust their privacy to us.

### What happens if laws change?

IVPN is committed to keeping its customers informed of any serious legislative threats to our service. If the laws in our jurisdiction change in way that prevents us from upholding our privacy policy, we will always inform our customers before those laws are enacted. We will also allow customers to cancel their subscription and will refund any fees that cover the remainder of their subscription period.

### Crash Logs

By default, if one of our mobile apps crashes while you're using it, anonymized data about the crash will be collected on the device to help us identify the cause of the crash and hopefully fix it in a future update. These "crash logs" contain information such as the state of the app, operating system, and device at the time of the crash, but no personally identifiable information.

Crash logs for our desktop apps are only sent when the user manually confirms the action. For our mobile apps, you can opt-out of crash log reporting by disabling it in user preferences. 

Crash logs are sent to a server hosted and managed by IVPN and no third-party vendors or cloud services.

### Device permissions for Personal Data access

IVPN Android and iOS apps may request certain permissions that allow it to access the user's device data as described below.

These permissions must be granted by the user before the respective information can be accessed. Once the permission has been given, it can be revoked by the user at any time in device settings.

Please note that revoking of such permissions might impact the proper functioning of the app.

#### Android App

Background location permission (continuous):  
Required to access the current Wi-Fi SSID, when the Network Protection feature is enabled.

Camera permission:  
Used to scan QR code with an account ID.

#### iOS App

Permission to save VPN profile:  
Required to access the current Wi-Fi SSID, when the Network Protection feature is enabled.

Camera permission:  
Used to scan QR code with an account ID.

### Changes to policy

IVPN reserves the right to change this privacy policy at any time. In such cases, we will take every reasonable step to ensure that these changes are brought to your attention by posting all changes prominently on the IVPN website for a reasonable period of time, before the new policy becomes effective as well as emailing our existing customers.

If you have any questions or comments regarding this policy, please do not hesitate to contact us.
