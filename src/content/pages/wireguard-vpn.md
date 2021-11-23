---
title: WireGuard VPN protocol for privacy - start using with IVPN
description: WireGuard is a revolutionary VPN protocol that promises better security and faster speeds compared to existing solutions. IVPN offers WireGuard in our Windows, macOS, Linux, Android and iOS apps. Get set up and running with WireGuard VPN in two minutes.
url: /wireguard/
---
# WireGuard<sup>®</sup> VPN

[WireGuard](https://www.wireguard.com/) is a revolutionary VPN protocol using state-of-the-art cryptography that promises better security and faster speeds compared to existing solutions. See the [WireGuard protocol page](https://www.wireguard.com/) for a quick overview of the protocol and cryptography. For an in-depth discussion review the [technical white paper](https://www.wireguard.com/papers/wireguard.pdf).

## IVPN + WireGuard

Since its merge into Linux Kernel v5.6, the release of WireGuard 1.0 and a 3rd party security audit, we consider the protocol to be ready for wide-scale use. We consider WireGuard to be the best protocol for most customers due to its exceptional performance, security properties, ability to roam between IP addresses without packet loss or disconnections and instantly connect/disconnect.

However, WireGuard® was not designed with privacy VPN providers in mind. In addition, it leaves certain aspects (e.g. IP address assignment, key distribution etc.) to the responsibility of the implementer. As a result some privacy issues exist which all responsible VPN providers must resolve. These issues do not in any way represent a weakness of the WireGuard protocol itself, they are simply aspects which the protocol designers intentionally left out. We have identified and implemented the following solutions on the IVPN network.

<span class="badge">Issue</span>

#### Public IP address of peer is stored in memory indefinitely

We have implemented a key management daemon on all servers which scans the list of peers where the latest handshake time > 180 seconds and deletes/reinstates their configuration.

<span class="badge">Issue</span>

#### No mechanism for tunnel IP address allocation or rotation

IVPN apps automatically and transparently call backend every 24 hours to generate new random IP address and distribute to all servers.

<span class="badge">Issue</span>

#### No identity-hiding forward secrecy

IVPN apps automatically and transparently regenerates new key pair every 24 hours and upload public key to backend to distribute to all servers. 

## WireGuard  FAQ

#### How can I use WireGuard?

* [Set up your own WireGuard server](https://www.wireguard.com/quickstart/) and connect using one of the official client apps.
* Subscribe to a VPN provider that supports WireGuard. While IVPN is not the only service to offer WireGuard, we were [early adopters](/blog/introducing-wireguard-fully-automated/) and have significant experience in supporting it.

#### Which operating systems does WireGuard support?

WireGuard supports all major operating systems. Support for WireGuard is built in to IVPN’s Windows, macOS, Linux, Android and iOS apps.

#### What cryptography is used in WireGuard?

WireGuard utilizes the following protocols and primitives:

* [ChaCha20](http://cr.yp.to/chacha.html) for symmetric encryption, authenticated with [Poly1305](http://cr.yp.to/mac.html), using [RFC7539's AEAD construction](https://tools.ietf.org/html/rfc7539)
* [Curve25519](http://cr.yp.to/ecdh.html) for ECDH
* [BLAKE2s](https://blake2.net/) for hashing and keyed hashing, as described in [RFC7693](https://tools.ietf.org/html/rfc7693)
* [SipHash](http://cr.yp.to/siphash/siphash-20120918.pdf) for hashtable keys
* [HKDF](https://eprint.iacr.org/2010/264) for key derivation, as described in [RFC5869](https://tools.ietf.org/html/rfc5869)
* [Noise_IK handshake](https://www.wireguard.com/protocol/#key-exchange-and-data-packets) from [Noise](http://noiseprotocol.org/noise.pdf), building on the work of [CurveCP](http://www.curvecp.org/), [NaCL](http://cr.yp.to/highspeed/naclcrypto-20090310.pdf), [KEA+](http://research.microsoft.com/en-us/um/people/klauter/security_of_kea_ake_protocol.pdf), [SIGMA](http://webee.technion.ac.il/~hugo/sigma-pdf.pdf), [FHMQV](https://eprint.iacr.org/2009/408.pdf), and [HOMQV](https://eprint.iacr.org/2010/638.pdf)
* All packets are sent over UDP

#### Where do you have WireGuard servers?

We offer WireGuard servers in 45 locations in 32 countries. Review the full list of servers on our [server status page](/status/).

#### I’m an IVPN subscriber. Do I need to register for WireGuard?

WireGuard is available and ready for use for all existing IVPN customers. You do not need to sign up separately.

#### Do you offer all features of IVPN for WireGuard?

We support the same security and privacy features as with OpenVPN e.g. Firewall, Trusted networks, AntiTracker and Multi-hop. However, we do not offer port forwarding with WireGuard at this time.

#### Do you offer IPv6 support for WireGuard?

Yes.

#### What ports do you use for WireGuard?

UDP ports 2049, 2050, 53, 30587, 41893, 48574, 58237.

#### Do I need to manually create and add a public key in the IVPN Client Area when adding a new device?

No, when using the IVPN app keys are automatically generated and the public key uploaded to our server the moment you select the WireGuard protocol in the app.

If you are not using an IVPN app you may also manually add a new public key via the WireGuard tab of the Client Area.

#### What happens if I delete a public key?

If you purposefully or accidentally deleted public keys from the Client Area, new keys will be automatically generated upon selecting the WireGuard protocol in the IVPN app.

In case the public key was deleted while your device was connected to one of the WireGuard servers, the IVPN app will stay connected, however, you will have no internet access. You will need to disconnect and either login again to the IVPN app or click on the ‘Re-generate Keys’ button under the ‘WireGuard’ details/configuration area.

#### What DNS server is used when connecting with WireGuard?

We host our own log-less DNS servers which are pushed and applied automatically to your device when you connect. When connected the IP address of the DNS server is 172.16.0.1
