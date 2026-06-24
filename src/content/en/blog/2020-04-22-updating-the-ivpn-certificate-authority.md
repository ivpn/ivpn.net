---
title: Updating the IVPN Certificate Authority
# Example: /blog/this-is-a-good-post
url: /blog/updating-the-ivpn-certificate-authority-2020/
highlighted: true
draft: false
authors:
  - Iain Douglas
categories:
  - IVPN News
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags: []
date: 2020-05-18T10:22:33.085Z
thumbnailImage: /images-static/uploads/server_certificate_small.png
---
This is an advanced warning that you may need to take action to continue using our service beyond 20th July 10:56 2020 UTC.

The IVPN Certificate Authority (CA) is used to sign certificates we issue for our servers. This allows your computer to verify that the VPN server it is connecting to is one of IVPN's and not one operated by someone else. You can use our service after 20 July with the following app versions:

* Windows v2.11.6 or newer
* Android v1.66.2 or newer
* iOS v1.19.0 or newer
* macOS v2.11.7 or newer
* all Linux versions

Please check if your IVPN apps are up-to-date and download the latest versions to avoid disruptions.

Configuration file users

* OpenVPN - [Download][1] new files from here if your files are older than 23rd March 2020.
* DD-WRT - Generate a new configuration with our [configurator][2].
* Other OpenVPN - You will need to download our [new CA certificate file.][3]

**WireGuard and IPSec/IKEv2 - no action required.**

### More info

The IVPN CA was created 10 years ago and will expire on 20th July 2020. When this happens certificates issued by the CA will become untrusted and OpenVPN connections to our VPN servers will stop working.

In preparation for this event, we have created a new CA and root certificate. We used this to create new VPN server certificates. We also used the old CA to cross sign the new CA root certificate. We have already updated our infrastructure and until 20th July connections to our servers using the old CA certificate and the new CA certificate will be trusted.

If you have any questions please contact <support@ivpn.net>

 [1]: /releases/config/ivpn-openvpn-config.zip
 [2]: /clientarea/ddwrt
 [3]: /releases/config/ca.crt
