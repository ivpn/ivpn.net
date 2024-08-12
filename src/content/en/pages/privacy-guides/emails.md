---
title: The Technical Realities of Email Privacy
author: Solène Rapenne
url: /privacy-guides/email-and-privacy/
section: Basic
weight: 10
date: 2024-07-23T00:07:00+00:00
update: 2024-07-23T00:07:00+00:00
layout: guides-details
articles: [
  {
    title: "Will a VPN Protect Me? Defining Your Threat Model",
    url: "/privacy-guides/will-a-vpn-protect-me/"
  },
]
---
## Introduction

Email, the ubiquitous communication tool, was not originally designed with modern privacy concerns in mind. Its underlying architecture contains limitations that could expose sensitive information to potential exploitation.

This technical guide will examine the core issues threatening email privacy. We'll dive into the risks posed by email headers, which can reveal details about participants and content. Additionally, we'll explore the security challenges associated with MIME-encoded content like HTML, and the limitations of encryption at different levels.

By reading this guide, you will gain the knowledge required to comprehend the privacy risks inherent of email design.

## Email structure: A technical overview

An email is composed of two parts: the body and the headers.

The email body is its content: it’s what you write within the mail and attached files, if any. Email body had to adapt to progress in types of content added beyond regular text, for example file attachments and formatted texts. Email clients  were improved to recognise different parts of the email to be able to render it, whether they are text, HTML or binary files. Emails are now using [MIME encoding](https://en.wikipedia.org/wiki/MIME) to distinguish each chunks of the body payload from each other.

The other part of an email is called header, which is the metadata associated to the body, where each piece of software involved in the email delivery may add information.

It is possible to look at the emails headers in most email clients, this is often hidden under a feature called "view source" or "display headers". Enabling it will let you see the raw email where the headers are always at the beginning of the email.

A simple email would look like this:

```
Return-Path: <user@mail.domain.example>
Received: from localhost
	by mail.domain.example with LMTP
	id xNQbIp9GhWYroAAA23Ik0Q
	(envelope-from <user@mail.domain.example>)
	for <jane>; Wed, 03 Jul 2024 14:39:59 +0200
Delivered-To: user@mail.domain.example
Received: from localhost (mail.domain.example [local])
	by mail.domain.example (OpenSMTPD) with ESMTPA id bdd779f0
	for <user@mail.domain.example>;
	Wed, 3 Jul 2024 14:39:59 +0200 (CEST)
From: Pick a name <user@mail.domain.example>
Date: Wed, 3 Jul 2024 14:39:59 +0200 (CEST)
To: user@mail.domain.example
Subject: email subject here
Message-ID: <97dc3b8ddb940ad8@mail.domain.example>

The content always starts after a blank line to separate it from the headers.

--
User
```

Let's dissect the above email, field by field:

- `From`: name and email address of the sender
- `To`: names and email addresses of recipients
- `Date`: date of the email, it is set by the sender and can be entirely crafted, emails client could be configured to display either the date of reception or the email date
- `Message-ID`: unique ID of the email, it contains the mail server hostname, it is used to group emails in threads
- `Subject`: the subject that appears in your email client, it can be empty
- `Return-Path`: indicates the email address to use when replying, it can be different from `From`
- `Delivered-To`: address or user name of your account, it could be different from the address in `From` if you use an email alias
- `Received`: technical information about email delivery, each SMTP server involved in the delivery add a `Received` header

## Potential privacy issues related to emails

Regardless of whether you are reading human-written or machine-generated emails, or composing your own, there is private information shared in them.

### Sending emails

When sending an email, any reasonably featured email client will add the following fields: Date, From, Subject, To (and CC/BCC, if any)

However, some email client adds extra headers to the email, although it is not required by the protocol. They can add information such as your email client and/or your operating system version, your SMTP username and your system hostname. This can tell a lot about you and can be used to profile you.

Once the email is transmitted to your SMTP server, some of these headers can be relayed in case of a misconfigured SMTP server, worse, the server can also add information such as your SMTP username and public IP address.

The public IP address could provide your approximate geolocation to your recipient, though the accuracy would be limited in most cases. However, if you are using a VPN, the recipient will not know about your real geolocation, but will be able to determine that you are connected to a VPN gateway, and potentially the VPN provider you use.

A properly configured SMTP server should not share any personal information.  Additionally, some email providers offer the option to strip unnecessary headers, further enhancing your privacy.

As an email gets routed through SMTP servers for delivery, each of them will add information about the previous relay. This is a standard part of the email delivery process and does not create a privacy risk. The added information does not contain sensitive details that could compromise confidentiality.

### Receiving emails

Receiving emails should not pose a risk for your privacy, although reading them could potentially allow a third party to track you in some cases:

- if the email was crafted in a way to use a vulnerability of your email client, a security issue can lead to privacy issues
- if the email contains HTML and your email client HTML rendering loads remote files
- if the email contains HTML and your email client renders HTML and you click on a link with a tracking identifier
- if the email was crafted for a [spear-phishing attack](http://web.archive.org/web/20231031035937/https://www.crowdstrike.com/cybersecurity-101/phishing/spear-phishing/) and you interacted with malicious elements. A phishing email could make use of many techniques to appear as legit as possible. For instance, an attacker could buy the domain `ẹff.org` or `eƒf.org` which are both different from `eff.org` while looking pretty similar. Using such fake domain name, the sender and links within an email would easily look like a genuine message from the `eff.org` organization.

Using HTML in emails should be discouraged for multiple security reasons. Displaying these emails necessitates HTML rendering, a complex process that introduces significant security risks and inherently enables potentially privacy-compromising features. Rendering engines are frequent attack vectors, and even when functioning correctly, they allow tracking pixels and unique links to function, and phishing attacks to appear as genuine emails.

Invisible images made of a single pixel can be embedded into HTML emails with a unique URL. If your email client loads this image, the sender will know that you have read this email and when. Depending on your settings, it may also leak information about your web browser and device through the [User-Agent string](https://en.wikipedia.org/wiki/User-Agent_header).

[On this link](https://web.archive.org/web/20240117010351/https://www.nutshell.com/blog/email-tracking-pixels-101-how-do-tracking-pixels-work/), you can find an advertisement company explaining the benefits of such tracking for their customers, this makes it clear how emails can be used to track you. By using the unique URL method, links within an HTML email can be made unique to you in order to learn if you clicked them, even if your client did not load the tracking pixel.

Most security vulnerabilities found in modern email clients are related to HTML rendering (example on [Mozilla Thunderbird](https://web.archive.org/web/20240703141714/https://scanrepeat.com/vulnerability-database/thunderbird-cross-site-scripting)). As a security issue can escalate to a privacy issue, it is safer to always disable HTML rendering whenever possible. Some email clients offer safer but simpler HTML rendering by only extracting the text to make it human-readable.

#### Read receipts

Some email clients provide the feature of requesting notification when an email has been opened by the recipient. This feature is often called "read receipt" and is opt-in for the receiver. Any reasonable email client should offer you to send the receipt and never do it automatically. This has not always been true: most email clients used to send read receipts automatically, sometimes without even asking or informing users.

### Unencrypted email transmission

When you send an email, it is transmitted from your computer (or webmail) to your email provider SMTP relay, which in turn relay the email to the recipient's server. Make sure that your email client is configured to establish an encrypted connection to the SMTP server for sending. Protocols such as STARTTLS or TLS, sometimes still referred to as SSL, are encrypted and safe.

Unfortunately, configuring the encryption to connect to the SMTP server may not be enough. It provides no guarantee that encryption will be used between SMTP servers for the delivery. By default, the protocol states that SMTP servers must try to connect to other SMTP servers using an encrypted session, but if the remote can not use encryption, the exchange is done in plain text. This would mean that your email could be transmitted without encryption between servers, providing an ideal opening for an attacker to snoop traffic and read emails that are not using [end-to-end encryption](https://en.wikipedia.org/wiki/End-to-end_encryption).

Some email providers claim that their servers are configured to drop the connection when a remote SMTP servers is not supporting encryption. In such scenario, your email would never appear as plain text over the network, would not be delivered, and you would be notified by an undelivered error by email.

### Custom domain

In the case you are renting a domain name, your personal information may be associated to the domain. Some registrars offer privacy services to hide this information about you, but the process is not always enable by default. This is particularly important when the domain is used in your email address because the recipient will know its name.

The registrar information about a domain name can be queried using a WHOIS request, this can contain the following information about you:

- Full name
- Phone number
- Full physical address
- Contact email

If you opted for hiding your information, the WHOIS request will return them in the form of "redacted for privacy" or simply the registrar contact.

The official [ICANN](https://en.wikipedia.org/wiki/ICANN) website [lookup.icann.org](https://lookup.icann.org/) can be used to perform [WHOIS requests](https://en.wikipedia.org/wiki/WHOIS), free from ads and tracking.

## Mitigations

Although emails were not designed with privacy in mind, there are some important points to know that could help you to prevent leaks of sensitive information.

### End-to-End encryption

As explained earlier, email clients and servers should all use encryption when transferring emails over the network, but the email itself is never encrypted, making it readable for everyone operating on a node involved in the delivery. A solution to prevent anyone but the recipient to read your email is using end-to-end encryption.

There are two end-to-end encryption methods available for emails: [S/MIME](https://en.wikipedia.org/wiki/S/MIME) and [PGP](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) (often referred to as [GPG](https://gnupg.org/), the open source implementation).

Both S/MIME and PGP are using [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) which requires exchanging keys over a secure channel before being able to use end-to-end encryption. Unfortunately, they do not support [forward secrecy](https://en.wikipedia.org/wiki/Forward_secrecy), so if your private key is ever stolen, all your past email become readable to the thief (given they have access to your emails).

A limitation of end-to-end encryption of emails is that only the email body can be encrypted. The headers are required for the email delivery process and must stay in clear text.

Headers contain important information like who sent the email, to whom, about what and when. The subject can be left empty but not the other fields. With regard to privacy, end-to-end encryption is still an improvement, but not a perfect solution.

Cryptographically signing emails is an effective way to ensure sender trustworthiness, providing a robust defense against phishing attacks. End-to-end encryption necessitates [key management](https://en.wikipedia.org/wiki/Key_management) for the sender and all recipients, a process that requires a certain level of digital literacy. While better integration of encryption within email clients could simplify this process, any extra steps required to send an email will likely remain an obstacle for many users.

### Encryption at rest

There are different methods to read your emails stored a remote server:

- using a webmail from a web browser
- fetching emails with the [IMAP protocol](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol)
- downloading emails with the [POP3 protocol](https://en.wikipedia.org/wiki/Post_Office_Protocol)

Although the POP3 protocol is old and used less frequently, it is the only choice if you want to download all your emails before deleting them remotely. When reading your emails through a webmail or the IMAP protocol, they remain stored on the server until you delete them. Following standard emails protocol, they are stored in plain text on the server, and there is no method to encrypt your emails at rest remotely.

However, a couple of email providers offer email encryption server side so only you can read your emails, even when end-to-end encryption is not used.

Some implementations such as [Proton Mail](https://proton.me/blog/zero-knowledge-cloud-storage) and [Tuta](https://tuta.com/encryption) utilize proprietary zero knowledge encryption for mailboxes. They make use of a symmetrical cryptography key protected by your account password, encryption is made transparent to you when connecting to their service, so it is not possible to ensure encryption is really happening.

On the other hand, email providers like [Posteo](https://posteo.de/en/site/features) and [Mailbox.org](https://mailbox.org/en/private-customers#security) offer optional encryption of inbound emails using your S/MIME or PGP public key. This method guarantees that you are the only owner of the private key used to decrypt your emails, and that state-of-the-art encryption is used, but as explained earlier, all the headers will be left unencrypted.

Server side encryption does not prevent the email provider to snoop emails upon arrival, for instance they could be forced to save a copy of all your emails due to a court order. In such a case they would not be able to read your emails sent/received before the surveillance began.

It is important to be aware that even with server-side encryption, multiple copies of your emails may exist: when you send an email, it is typically stored on both your email provider's server and the recipient's provider's server. So if your provider offers encryption at rest, the recipient's provider might not. This means a copy of your email could still exist unencrypted on their system. This is why end-to-end encryption is still valuable even if some email providers started to offer encryption at rest.

### Email forwarding services

Everyone has an email, but it is good practice for your privacy to have multiple addresses or email aliases. Online services frequently get hacked, resulting in the leak of their database. Having a unique email addresses for each service will also allow you to notice if a third party shared your address. In such events you can take action like disabling this alias.

On one hand, this allows you to maintain separate online identities with a single mailbox. On the other hand, it introduces a potential privacy risk as the service operator could access your emails or expose your real mailbox address and all associated aliases in case of a data breach.

## Data scope overview

In order to allow you to better understand which information is shared when using emails, we go over different scenarios below with relevant details. The list should cover most common cases, although it is incomplete as covering all possible combinations of user action, information shared and conditions would not be feasible.

### Information shared when sending emails

The table below lists all information that could be shared with other when you send an email.

| Information                               | Who has access to it                                        | Condition                                                                      |
| -----------                               | --------------------                                        | ---------                                                                      |
| Metadata (from/to/cc/subject...)          | recipients, recipients email providers, your email provider | Always                                                                         |
| SMTP username, public IP                  | your email provider                                         | Always                                                                         |
| SMTP username, public IP                  | recipients, recipients email providers                      | Misconfigured SMTP server                                                      |
| SMTP credentials                          | your email provider                                         | When not using encryption to connect to the SMTP server                        |
| Operating System hostname, client version | recipients, recipients email providers, your email provider | Client email configuration and an SMTP server that does not strip this information |
| Email content                             | recipients, recipients email providers, your email provider | No end-to-end encryption in use                                                |
| All of the above                          | network provider / people able to snoop network traffic     | When SMTP is used without encryption (client<->server or server<->server)      |

### Potential data leak for emails stored on an email provider storage

The table below lists all information that could be extracted from your emails (sent or received) from storage, whether they are archived on your email provider server or recipients computers. All this information could be gathered in case someone's server/computer is compromised.

| Information                               | Who has access to it                                                                | Condition                                                                      |
| -----------                               | --------------------                                                                | ---------                                                                      |
| Metadata (from/to/cc/subject...)          | recipients storage, recipients email providers storage, your email provider storage | Always                                                                         |
| Operating system hostname, client version | recipients storage, recipients email providers storage, your email provider storage | Client email configuration and an SMTP server that does not strip this information |
| Email content                             | recipients storage, recipients email providers storage, your email provider storage | No end-to-end encryption in use                                                |
| SMTP username, public IP                  | recipients storage, recipients email providers storage, your email provider storage | Misconfigured SMTP server                                                      |

Email providers offering zero knowledge data encryption should not be able to read any kind of data from your emails, however you need to trust them through audit reports.

### Information shared when retrieving emails over IMAP or POP3

The table below lists all information that could be shared with others when you retrieve emails on your local computer, using either IMAP or POP3 protocols.

| Information                                | Who has access to it                                     | Condition
| -----------                                | --------------------                                     | ---------
| Date of email retrieval                    | your email provider                                      | Always
| Public IP used for email retrieval         | your email provider                                      | Always
| Email content                              | your email provider                                      | No end-to-end encryption in use
| IMAP/POP3 credentials                      | your email provider                                      | When not using encryption to connect to the IMAP/POP server
| All of the above                           | network provider / people able to snoop network traffic  | When not using encryption to connect to the IMAP/POP server

### Information shared when reading an email

The table below lists all information that could be shared when you read an email in a dedicated client.

| Information                             | Who has access to it                                | Condition
| -----------                             | --------------------                                | ---------
| Date and time of email opening event    | sender                                              | HTML rendering is enabled, and remote images are loaded, and the email contains a tracking pixel
| Date and time of email reading event    | sender                                              | HTML rendering is enabled, and you clicked on a link with a unique tracking URL
| Date and time of email opening event    | sender who asked for a read receipt                 | Email client automatically replying to read receipt or manual user approval

### Information shared when reading emails in a webmail

The table below lists all information that could be shared when a webmail is used to read/send emails. In this situation, we consider that the webmail is only available using HTTPS.

While the webmail provider is also the email provider in most cases, they can be two different services in which case the webmail would act as a proxy between you and your email provider. Your email provider would see information of the webmail as a client, and would share its information as such (public IP, client version, etc.).

| Information                               | Who has access to it                                     | Condition
| -----------                               | --------------------                                     | ---------
| Email content                             | your webmail provider                                    | No end-to-end encryption in use
| Date/time of each actions on emails       | your webmail provider                                    | Always
| Public IP                                 | your webmail provider                                    | Always
| Web browser fingerprint                   | your webmail provider                                    | Always
| IMAP/POP3 credentials                     | your webmail provider                                    | When not using encryption to connect to the IMAP/POP server
| Date and time of email opening event      | sender                                                   | HTML rendering is enabled, and remote images are loaded, and the email contains a tracking pixel
| Date and time of email reading event      | sender                                                   | HTML rendering is enabled, and you clicked on a link with a unique tracking URL
| Date and time of email opening event      | sender who asked for a read receipt                      | Email client automatically replying to read receipt or manual user input

## Conclusion

Users must carefully think about their own security needs and threat model when relying on email communication. The specific risks associated with email's architecture will vary between individuals and their communication patterns. People handling sensitive data should consider using alternative communication methods. However, even when using email, steps like adopting end-to-end encryption and carefully choosing a privacy-focused email provider are crucial.
