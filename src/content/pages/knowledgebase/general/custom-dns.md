---
title: Custom DNS - IVPN Help
h1: Custom DNS
url: /knowledgebase/general/custom-dns/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 560
---
# Custom DNS

IVPN apps are configured to automatically apply our internal zero-logging DNS IP address every time you connect to the VPN server to mitigate DNS leaks on your system.

We understand that in some cases, one can benefit more from using a custom DNS IP address. No matter the reason you need to use one, with IVPN, you can have it customized in just a few steps:

### Windows and macOS
- Navigate to `Settings/Preferences` - `DNS` tab, check `Use custom DNS…` option and enter the preferred IP address.

### Linux
- Open a Terminal window and run: `ivpn dns 1.1.1.1`.
  `ivpn dns -off` to revert back to using IVPN DNS.


### iOS
- Open the `Settings` menu by tapping on the three horizontal lines and navigate to `Custom DNS`. Toggle the `Use Custom DNS` switch on and enter the preferred IP address.

### Android
- Access `Settings` area by tapping on the “gear” icon and navigate to `Custom DNS`. Toggle the `Use Custom DNS` switch on and enter the preferred IP address

DNS requests made to public DNS servers will first pass through the VPN tunnel, so there is still a level of privacy and security in place when using a Custom DNS server.

<div markdown="1" class="notice notice--warning">
Custom DNS will only work with either OpenVPN or WireGuard protocol. You cannot use Custom DNS together with AntiTracker as it overrides the IP address you have specified in the Custom DNS field.
</div>
