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

IVPN apps are configured to automatically apply our internal [zero-logging](https://www.ivpn.net/blog/ivpn-no-logging-claim-verified-by-independent-audit) DNS IP address every time you connect to the VPN server to mitigate DNS leaks on your system.

We understand that in some cases, one can benefit more from using a custom DNS server. No matter the reason you need to use one, with IVPN apps, you can have it customized in just a few steps. 

DNS requests made to public DNS servers will first pass through the VPN tunnel, so there is still a level of privacy and security in place when using a Custom DNS server.

### Windows, macOS, and Linux

<div markdown="1" class="notice notice--info">
Supported address types: IPv4, DNS-over-HTTPS
</div>

- **GUI:** Access the `Settings` area by tapping on the “gear” icon and navigate to the `DNS` tab.  Check the `Use Custom DNS` box and enter the preferred IPv4 or DoH address.

- **Command Line:** Open a Terminal window and run, e.g.: `ivpn dns 1.1.1.1` or `ivpn dns -doh https://cloudflare-dns.com/dns-query 1.1.1.1`. Type `ivpn dns -off` to revert back to using IVPN DNS.

### iOS

<div markdown="1" class="notice notice--info">
Supported address types: IPv4, DNS-over-HTTPS, DNS-over-TLS
</div>

Custom DNS in the IVPN app for iOS can be configured and used when the VPN is connected or disconnected. 
- In the IVPN app, navigate to `Settings` and enter the preferred IPv4 or DoH/DoT address in the `Custom DNS for VPN` or/and `Disconnected Custom DNS` areas.

### Android

<div markdown="1" class="notice notice--info">
Supported address types: IPv4. DNS-over-TLS via Android native Private DNS feature
</div>

- Access the `Settings` area by tapping on the “gear” icon and navigate to `Custom DNS`. Toggle the `Use Custom DNS` switch on and enter the preferred IPv4-based IP address.

- DNS-over-TLS can be set using the Android OS native Private DNS feature. On your device, navigate to `Settings` - `More connections` - `Private DNS`. Select `Configure Private DNS` and enter the preferred DoT address.

### Current limitations

- Custom DNS works only with OpenVPN and WireGuard VPN protocols

- Custom DNS cannot be used together with AntiTracker as the latter will override the entries specified in the Custom DNS field

- IPv6-based IP addresses are not yet supported
