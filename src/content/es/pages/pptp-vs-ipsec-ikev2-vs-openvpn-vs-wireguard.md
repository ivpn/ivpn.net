---
title: PPTP vs IPSec IKEv2 vs OpenVPN vs WireGuard
description: Compare PPTP, IPSec IKEv2, OpenVPN and WireGuard to determine which VPN protocol offers the best combination of security, speed and ease of use for your needs.
url: /pptp-vs-ipsec-ikev2-vs-openvpn-vs-wireguard/
layout: full-width
---
# Comparison of VPN protocols

{{< raw-html >}}
<div class="content--hidden-mobile">
{{< / raw-html >}}

<div class="navbar" id="navbar">
    <div id="sticky">
        <h3>PPTP</h3>
        <h3>IPSec IKEv2</h3>
        <h3>OpenVPN</h3>
        <h3>WireGuard</h3>
    </div>
</div>

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Intro</h3>
        </th>
    </tr>
    <tr>
        <td>A very basic VPN protocol based on PPP. The PPTP specification does not actually describe encryption or authentication features and relies on the PPP protocol being tunneled to implement security functionality.</td>
        <td>IKEv2 (Internet key exchange version 2) is part of the IPSec protocol suite. Standardized in <a href="https://tools.ietf.org/html/rfc7296">RFC 7296</a>. IPSec has become the defacto standard protocol for secure Internet communications, providing confidentiality, authentication and integrity.</td>
        <td>Open-source VPN protocol developed by OpenVPN technologies. Very popular however not based on standards (RFC). Uses a custom security protocol and <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security">SSL/TLS</a> for key exchange. Provides full confidentiality, authentication and integrity.</td>
        <td><a href="https://www.wireguard.com/">WireGuard®</a> is an extremely fast VPN protocol with very little overhead and state-of-the-art cryptography. It has the potential to offer a simpler, more secure, more efficient, and easier to use VPN over existing technologies.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Encryption</h3>
        </th>
    </tr>
    <tr>
        <td>The PPP payload is encrypted using Microsoft's Point-to-Point Encryption protocol (<a href="http://en.wikipedia.org/wiki/Microsoft_Point-to-Point_Encryption">MPPE</a>). MPPE implements the RSA <a href="http://en.wikipedia.org/wiki/RC4">RC4</a> encryption algorithm with a maximum of 128 bit session keys.</td>
        <td>IKEv2 implements a large number of <a href="https://wiki.strongswan.org/projects/strongswan/wiki/IKEv2CipherSuites">cryptographic algorithms</a> including 3DES, AES, Blowfish, Camellia. IVPN implements IKEv2 using AES with 256 bit keys.</td>
        <td>OpenVPN uses the <a href="http://en.wikipedia.org/wiki/OpenSSL">OpenSSL</a> library to provide encryption. OpenSSL implements a large number of <a href="https://en.wikipedia.org/wiki/OpenSSL#Algorithms">cryptographic algorithms</a> such as 3DES, AES, RC5, Blowfish.<br> As with IKEv2, IVPN implements AES with 256 bit keys.</td>
        <td>Built atop ChaCha20 for symmetric encryption (<a href="https://tools.ietf.org/html/rfc7539">RFC7539</a>), Curve25519 for Elliptic-curve Diffie–Hellman (ECDH) anonymous key agreement, BLAKE2s for hashing (<a href="https://tools.ietf.org/html/rfc7693">RFC7693</a>), SipHash24 for hashtable keys, and HKDF for key derivation (<a href="https://tools.ietf.org/html/rfc5869">RFC5869</a>). Makes use of a UDP-based handshake and the key exchange uses perfect forward secrecy while avoiding both key-compromise impersonation and replay attacks.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Security weaknesses</h3>
        </th>
    </tr>
    <tr>
        <td>The Microsoft implementation of PPTP has <a href="http://www.schneier.com/paper-pptpv2.html">serious security vulnerabilities</a>. MSCHAP-v2 is vulnerable to dictionary attack and the RC4 algorithm is subject to a bit-flipping attack. Microsoft strongly recommends upgrading to IPSec where confidentiality is a concern.</td>
        <td>IPSec has no known major vulnerabilities and is generally considered secure when implemented using a secure encryption algorithm and certificates for authentication. However <a href="https://github.com/nsa-observer/documents/blob/master/files/pdf/media-35529.pdf">Leaked NSA presentations</a> indicate that IKE could be exploited in an unknown manner to decrypt IPSec traffic.</td>
        <td>OpenVPN has no known major vulnerabilities and is generally considered secure when implemented using a secure encryption algorithm and certificates for authentication.</td>
        <td>WireGuard® has no known major vulnerabilities. It is relatively new and has not seen the thorough vetting of OpenVPN, though the code-base is extremely small, so full audits are possible by individuals and not just large organizations. WireGuard® is in-tree with Linux Kernel 5.6 and has been reviewed by a 3rd party auditor.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Speed</h3>
        </th>
    </tr>
    <tr>
        <td>With RC4 and 128 bit keys, the encryption overhead is least of all protocols making PPTP the fastest.</td>
        <td>IPSec with IKEv2 should in theory be the faster than OpenVPN due to user-mode encryption in OpenVPN however it depends on many variables specific to the connection. In most cases it is faster than OpenVPN.</td>
        <td>When used in its default UDP mode on a reliable network OpenVPN performs similarly to IKEv2.</td>
        <td>WireGuard® benefits from extremely high-speed cryptographic primitives and deep integration with underlying operating system kernel, so speeds are very high with low overhead. Most customers report higher speeds than OpenVPN.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Firewall ports</h3>
        </th>
    </tr>
    <tr>
        <td>PPTP uses TCP port 1723 and GRE (Protocol 47). PPTP can be easily blocked by restricting the GRE protocol.</td>
        <td>IKEv2 uses UDP 500 for the initial key exchange, protocol 50 for the IPSEC encrypted data (ESP) and UDP 4500 for NAT traversal.<br> IKEv2 is easier to block than OpenVPN due to its reliance on fixed protocols and ports.</td>
        <td>OpenVPN can be easily configured to run on any port using either UDP or TCP thereby easily bypassing restrictive firewalls.</td>
        <td>WireGuard® uses the UDP protocol and can be configured to use any port. May succumb to traffic shaping more easily than OpenVPN due to lack of support for TCP.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Setup / Configuration</h3>
        </th>
    </tr>
    <tr>
        <td>All versions of Windows and most other operating systems (including mobile) have native support for PPTP. PPTP only requires a username, password and server address making it incredibly simple to setup and configure.</td>
        <td>Windows 7+, macOS 10.11+ and most mobile operating systems have native support for IPSec with IKEv2.</td>
        <td>OpenVPN is not included in any operating system release and requires the installation of client software. Installation typically takes less than 5 minutes.</td>
        <td>WireGuard® is in-tree with Linux Kernel 5.6. Other non-linux operating systems require the installation of a WireGuard® client app. Installation typically takes less than 5 minutes.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Stability / Compatibility</h3>
        </th>
    </tr>
    <tr>
        <td>PPTP is not as reliable, nor does it recover as quickly as OpenVPN over unstable network connections. Minor compatibility issues with the GRE protocol and some routers.</td>
        <td>IPSec is more complex than OpenVPN and can require additional configuration between devices behind NAT routers. However as long as both the server and client support NAT traversal there shouldn't be any issues.</td>
        <td>Very stable and fast over wireless, cellular and other non reliable networks where packet loss and congestion is common. OpenVPN has a TCP mode for highly unreliable connections but this mode sacrifices significant performance due to the inefficiency of encapsulating TCP within TCP.</td>
        <td>Extremely stable and robust. More stable than OpenVPN when roaming across networks. Uses an initial endpoint for connections and can switch servers while maintaining the connection. Client can also change networks without dropping the connection.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Supported platforms</h3>
        </th>
    </tr>
    <tr>
        <td>
            <a href="/apps-windows/">Windows</a><br>
            <a href="/apps-macos/">macOS</a><br>
            <a href="/apps-linux/">Linux</a><br>
            <a href="/apps-ios/">Apple iOS</a><br>
            <a href="/apps-android/">Android</a><br>
            <a href="/setup/router/">DD-WRT</a>
        </td>
        <td>
            <a href="/apps-windows/">Windows</a><br>
            <a href="/apps-macos/">macOS</a><br>
            <a href="/apps-linux/">Linux</a><br>
            <a href="/apps-ios/">Apple iOS</a><br>
            <a href="/apps-android/">Android</a>
        </td>
        <td>
            <a href="/apps-windows/">Windows</a><br>
            <a href="/apps-macos/">macOS</a><br>
            <a href="/apps-linux/">Linux</a><br>
            <a href="/apps-ios/">Apple iOS</a><br>
            <a href="/apps-android/">Android</a><br>
            <a href="/setup/router/">DD-WRT (with the correct build)</a>
        </td>
        <td>
            <a href="/apps-windows/">Windows</a><br>
            <a href="/apps-macos/">macOS</a><br>
            <a href="/apps-linux/">Linux</a><br>
            <a href="/apps-ios/">Apple iOS</a><br>
            <a href="/apps-android/">Android</a>
        </td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Verdict</h3>
        </th>
    </tr>
    <tr>
        <td><img src="/images-static/uploads/icon-dislike.svg"></td>
        <td><img src="/images-static/uploads/icon-like.svg"></td>
        <td><img src="/images-static/uploads/icon-like.svg"></td>
        <td><img src="/images-static/uploads/icon-like.svg"></td>
    </tr>
    <tr>
        <td>Due to the major security flaws, there is no good reason to choose PPTP other than device compatibility. If you have a device on which only PPTP is supported then you should consider how to encrypt data at other layers e.g. HTTPS.</td>
        <td>IKEv2 is an excellent choice, it is extremely fast, secure and reliable. In addition unlike OpenVPN it requires no additional software to be installed (in most cases) and is therefor the quickest to configure. If you have a threat model that includes sophisticated adversaries then you may want to consider OpenVPN due to the leaked NSA presentations discussed above.</td>
        <td>OpenVPN is an excellent choice for all platforms. It is extremely fast, secure and reliable.</td>
        <td>WireGuard® is an excellent choice and may be the best protocol for high speeds. WireGuard® promises better security and faster speeds compared to existing solutions. Since its merge into Linux Kernel (v5.6) and the release of v1.0, we consider WireGuard® to be ready for wide-scale use.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
</div>
{{< / raw-html >}}


{{< raw-html >}}
<div class="content--hidden-desktop">
{{< / raw-html >}}

## PPTP

### Intro

A very basic VPN protocol based on PPP. The PPTP specification does not actually describe encryption or authentication features and relies on the PPP protocol being tunneled to implement security functionality.

### Encryption

The PPP payload is encrypted using Microsoft's Point-to-Point Encryption protocol ([MPPE](http://en.wikipedia.org/wiki/Microsoft_Point-to-Point_Encryption)). MPPE implements the RSA <a href="http://en.wikipedia.org/wiki/RC4">RC4</a> encryption algorithm with a maximum of 128 bit session keys.

### Security weaknesses

The Microsoft implementation of PPTP has [serious security vulnerabilities](http://www.schneier.com/paper-pptpv2.html). MSCHAP-v2 is vulnerable to dictionary attack and the RC4 algorithm is subject to a bit-flipping attack. Microsoft strongly recommends upgrading to IPSec where confidentiality is a concern.

### Speed

With RC4 and 128 bit keys, the encryption overhead is least of all protocols making PPTP the fastest.

### Firewall ports

PPTP uses TCP port 1723 and GRE (Protocol 47). PPTP can be easily blocked by restricting the GRE protocol.

### Setup / Configuration

All versions of Windows and most other operating systems (including mobile) have native support for PPTP. PPTP only requires a username, password and server address making it incredibly simple to setup and configure.

### Stability / Compatibility

PPTP is not as realiable, nor does it recover as quickly as OpenVPN over unstable network connections. Minor compatibility issues with the GRE protocol and some routers.

### Supported platforms

[Windows](/apps-windows/)  
[macOS](/apps-macos/)  
[Linux](/apps-linux/)  
[Apple iOS](/apps-ios/)  
[Android](/apps-android/)  
[DD-WRT](/setup/router/)  

### Verdict ![](/images-static/uploads/icon-dislike.svg)

Due to the major security flaws, there is no good reason to choose PPTP other than device compatibility. If you have a device on which only PPTP is supported then you should consider how to encrypt data at other layers e.g. HTTPS.


## IPSec IKEv2

### Intro

IKEv2 (Internet key exchange version 2) is part of the IPSec protocol suite. Standardized in [RFC 7296](https://tools.ietf.org/html/rfc7296). IPSec has become the defacto standard protocol for secure Internet communications, providing confidentiality, authentication and integrity.

### Encryption

IKEv2 implements a large number of [cryptographic algorithms](https://wiki.strongswan.org/projects/strongswan/wiki/IKEv2CipherSuites) including 3DES, AES, Blowfish, Camellia. IVPN implements IKEv2 using AES with 256 bit keys.

### Security weaknesses

IPSec has no known major vulnerabilities and is generally considered secure when implemented using a secure encryption algorithm and certificates for authentication. However [Leaked NSA presentations](https://github.com/nsa-observer/documents/blob/master/files/pdf/media-35529.pdf) indicate that IKE could be exploited in an unknown manner to decrypt IPSec traffic.

### Speed

IPSec with IKEv2 should in theory be the faster than OpenVPN due to user-mode encryption in OpenVPN however it depends on many variables specific to the connection. In most cases it is faster than OpenVPN.

### Firewall ports

IKEv2 uses UDP 500 for the initial key exchange, protocol 50 for the IPSEC encrypted data (ESP) and UDP 4500 for NAT traversal.  
IKEv2 is easier to block than OpenVPN due to its reliance on fixed protocols and ports.

### Setup / Configuration

Windows 7+, macOS 10.11+ and most mobile operating systems have native support for IPSec with IKEv2.

### Stability / Compatibility

IPSec is more complex than OpenVPN and can require additional configuration between devices behind NAT routers. However as long as both the server and client support NAT traversal there shouldn't be any issues.

### Supported platforms

[Windows](/apps-windows/)  
[macOS](/apps-macos/)  
[Linux](/apps-linux/)  
[Apple iOS](/apps-ios/)  
[Android](/apps-android/)  

### Verdict ![](/images-static/uploads/icon-like.svg)

IKEv2 is an excellent choice, it is extremely fast, secure and reliable. In addition unlike OpenVPN it requires no additional software to be installed (in most cases) and is therefor the quickest to configure. If you have a threat model that includes sophisticated adversaries then you may want to consider OpenVPN due to the leaked NSA presentations discussed above.


## OpenVPN

### Intro

Open-source VPN protocol developed by OpenVPN technologies. Very popular however not based on standards (RFC). Uses a custom security protocol and [SSL/TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) for key exchange. Provides full confidentiality, authentication and integrity.

### Encryption

OpenVPN uses the [OpenSSL](http://en.wikipedia.org/wiki/OpenSSL) library to provide encryption. OpenSSL implements a large number of [cryptographic algorithms](https://en.wikipedia.org/wiki/OpenSSL#Algorithms) such as 3DES, AES, RC5, Blowfish.  
As with IKEv2, IVPN implements AES with 256 bit keys.

### Security weaknesses

OpenVPN has no known major vulnerabilities and is generally considered secure when implemented using a secure encryption algorithm and certificates for authentication.

### Speed

When used in its default UDP mode on a reliable network OpenVPN performs similarly to IKEv2.

### Firewall ports

OpenVPN can be easily configured to run on any port using either UDP or TCP thereby easily bypassing restrictive firewalls.

### Setup / Configuration

OpenVPN is not included in any operating system release and requires the installation of client software. Installation typically takes less than 5 minutes.

### Stability / Compatibility

Very stable and fast over wireless, cellular and other non reliable networks where packet loss and congestion is common. OpenVPN has a TCP mode for highly unreliable connections but this mode sacrifices significant performance due to the inefficiency of encapsulating TCP within TCP.

### Supported platforms

[Windows](/apps-windows/)  
[macOS](/apps-macos/)  
[Linux](/apps-linux/)  
[Apple iOS](/apps-ios/)  
[Android](/apps-android/)  
[DD-WRT (with the correct build)](/setup/router/) 

### Verdict ![](/images-static/uploads/icon-like.svg)

OpenVPN is an excellent choice for all platforms. It is extremely fast, secure and reliable.


## WireGuard

### Intro

[WireGuard®](https://www.wireguard.com/) is an extremely fast VPN protocol with very little overhead and state-of-the-art cryptography. It has the potential to offer a simpler, more secure, more efficient, and easier to use VPN over existing technologies.

### Encryption

Built atop ChaCha20 for symmetric encryption ([RFC7539](https://tools.ietf.org/html/rfc7539)), Curve25519 for Elliptic-curve Diffie–Hellman (ECDH) anonymous key agreement, BLAKE2s for hashing ([RFC7693](https://tools.ietf.org/html/rfc7693)), SipHash24 for hashtable keys, and HKDF for key derivation ([RFC5869](https://tools.ietf.org/html/rfc5869)). Makes use of a UDP-based handshake and the key exchange uses perfect forward secrecy while avoiding both key-compromise impersonation and replay attacks.

### Security weaknesses

WireGuard® has no known major vulnerabilities. It is relatively new and has not seen the thorough vetting of OpenVPN, though the code-base is extremely small, so full audits are possible by individuals and not just large organizations. WireGuard® is in-tree with Linux Kernel 5.6 and has been reviewed by a 3rd party auditor.

### Speed

WireGuard® benefits from extremely high-speed cryptographic primitives and deep integration with underlying operating system kernel, so speeds are very high with low overhead. Most customers report higher speeds than OpenVPN.

### Firewall ports

WireGuard® uses the UDP protocol and can be configured to use any port. May succumb to traffic shaping more easily than OpenVPN due to lack of support for TCP.

### Setup / Configuration

WireGuard® is in-tree with Linux Kernel 5.6. Other non-linux operating systems require the installation of a WireGuard® client app. Installation typically takes less than 5 minutes.

### Stability / Compatibility

Extremely stable and robust. More stable than OpenVPN when roaming across networks. Uses an initial endpoint for connections and can switch servers while maintaining the connection. Client can also change networks without dropping the connection.

### Supported platforms

[Windows](/apps-windows/)  
[macOS](/apps-macos/)  
[Linux](/apps-linux/)  
[Apple iOS](/apps-ios/)  
[Android](/apps-android/)  

### Verdict ![](/images-static/uploads/icon-like.svg)

WireGuard® is an excellent choice and may be the best protocol for high speeds. WireGuard® promises better security and faster speeds compared to existing solutions. Since its merge into Linux Kernel (v5.6) and the release of v1.0, we consider WireGuard® to be ready for wide-scale use.

{{< raw-html >}}
</div>
{{< / raw-html >}}
