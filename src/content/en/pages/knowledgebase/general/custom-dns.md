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

- **GUI:** Access the `Settings` area by tapping on the “gear” icon and navigate to the `DNS` tab.  Check the `Use Custom DNS` box and enter the preferred IPv4 address or the DNS-over-HTTPS URI string plus that DoH provider's corresponding IPv4 address.

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

- For DoT, the IPv4 address can be left empty in the IVPN App and the entire **Custom DNS** feature can be disabled, and the initial DNS query to resolve the DoT hostname will use the VPN-provided DNS.

### modDNS with the IVPN App

<div markdown="1" class="notice notice--info">
Supported address types: IPv4, DNS-over-HTTPS, DNS-over-TLS, DNS-over-QUIC
</div>

- For Windows, macOS, and Linux, on the **Custom DNS** Settings screen or via the **CLI**, use the modDNS profile's DNS-over-HTTPS URI string `https://dns.moddns.net/dns-query/abc123` plus the IP address `89.124.253.5` replacing the `abc123` with the actual profile ID.

- The [modDNS account area](https://app.moddns.net/setup) also offers a configuration profile (`.mobileconfig` and QR code) for Apple devices.

- For Android, disable **Custom DNS** in the IVPN App, and IVPN's DNS from the VPN connection will resolve the initial query for the modDNS hostname.  The DoT entry in the Android Private DNS area will resolve everything else, though some apps have their own DNS subsystems, like web browsers with Secure DNS enabled, so disable this app-specific DNS as required.

### Current limitations

- Custom DNS works only with OpenVPN and WireGuard VPN protocols

- Custom DNS cannot be used together with AntiTracker as the latter will override the entries specified in the Custom DNS field

- IPv6-based IP addresses are not yet supported
