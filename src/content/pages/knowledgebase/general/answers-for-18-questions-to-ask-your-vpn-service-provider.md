---
title: Answers for "18 Questions to ask your VPN Service provider" - IVPN Help
h1: Answers for "18 Questions to ask your VPN Service provider"
url: /knowledgebase/general/answers-for-18-questions-to-ask-your-vpn-service-provider/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 160
---
# Answers for "18 Questions to ask your VPN Service provider"

1.  #### Is there a monthly bandwidth-usage limit?
    No, we do not record bandwidth used and therefore there is no limit.

2.  #### Do you throttle connections that use excessive bandwidth?
    No.

3.  #### How many devices are allowed per account?
    2 on the Standard and 7 on the Pro plan. See our [Pricing Page](/pricing/).

4.  #### How many hops are there in your VPN connections?
    We have a choice of both single and multi-hop connections. The Multi-hop feature is available in our Pro plan.

5.  #### What type(s) of VPN encryption do you use? Why?
    We use the highest AES-256 with 4096-bit RSA keys.

6.  #### Do you support perfect forward secrecy? If so, how?
    Yes, our OpenVPN servers are configured to automatically generate new encryption keys every hour. If an adversary was able to crack the encryption key, they would only be able to decrypt the traffic captures since the last key rotation.

7.  #### Do you provide users with Diffie Hellman key files?
    No, this is a server configuration.

8.  #### How do you authenticate clients – certificates/keys, or usernames/passwords?
    We issue a random Account ID to each customer to log in to our IVPN app and for OpenVPN connections. WireGuard uses a public and private key pair.

9.  #### Do you employ HMAC-Based TLS Authentication? If so, why?
    Yes, it mitigates DDOS and buffer overflow attacks on our servers.

10. #### Do you ever email passwords to customers?
    No.

11. #### Does each customer have a unique client certificate and key?
    No.

12. #### Are your VPN gateway servers hosted, co-located or in-house?
    We use dedicated hosted servers and co-located servers.

13. #### Are any of your VPN gateway servers running on VPS or cloud servers?
    No.

14. #### How are your VPN gateway servers protected?
    We build each server according to strict CIS benchmarks. This includes full disk encryption, fifo logs writing to tempfs, strict change control procedures etc. We reinstall the system from scratch when we take delivery of it. We use LUKS encryption such that it requires a password to be entered as part of the boot process.

15. #### Where is user account information stored?
    On a hardened database server that is not exposed to the general Internet.

16. #### How is communication between servers secured?
    OpenVPN using AES-256.

17. #### Do you allow port forwarding by users?
    Yes, but it is off by default. The feature is available in our Pro plan.

18. #### Are all client ports ever forwarded by default? If so, on which servers?
    No.
