---
title: Password-less VPN authentication
# Example: /blog/this-is-a-good-post
url: /blog/password-less-vpn-authentication/
draft: false
authors:
  - Nick Pestell
categories:
  - Releases
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - Apps
  - Security
date: 2019-12-12T15:17:26.000Z
# 740px X 740px
thumbnailImage: /images-static/uploads/password-less.png
---
TL;DR - We no longer require customers to specify a password when connecting to the VPN as we have randomly generated usernames and the password doesn't affect the security of the VPN tunnel in any way. You still require a password to login to the website Client Area. 

To understand more about this decision read on.

An authenticator is the means by which an identity is confirmed e.g. password or 2FA token. When designing information systems its important to choose an authenticator that is commensurate with the sensitivity of the information to which the use of the authenticator permits access. Companies use VPN technology to permit offsite staff secure access to their corporate networks. If an attacker were able to steal an employees credentials they would have full access to all the internal servers on the corporate network. Privacy VPN services use the same technology but instead of providing secure access to an internal network they provide secure access to the Internet. If an attacker were able to steal some credentials they would simply gain access to the Internet like any other IVPN customer and could do no more than use our service without paying for it.

The username and password are only used to check that you have a paid account. They are not used in any way to establish the security of the VPN tunnel itself i.e. cryptographic keys are not derived from them.

IVPN have always generated random usernames (62^8 combinations), so from now on we will use the username as the identifier and remove the requirement for a password. This not only simplifies user experience, but removes the confusion about needing a strong password for the VPN tunnel. 

New versions of the IVPN apps will be released today with the username field renamed to 'Account ID' and the password field removed. If you are connecting with a non-IVPN app simply specify any password.

Please note: This has no effect on the client area. To access the IVPN Client Area on the website you still need to enter the email address and password you signed up with.