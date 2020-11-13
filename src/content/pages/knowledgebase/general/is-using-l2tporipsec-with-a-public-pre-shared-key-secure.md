---
title: Is using L2TP/IPSec with a public pre-shared key secure? - IVPN Help
h1: Is using L2TP/IPSec with a public pre-shared key secure?
url: /knowledgebase/general/is-using-l2tporipsec-with-a-public-pre-shared-key-secure/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 40
---
# Is using L2TP/IPSec with a public pre-shared key secure?

No, it is not secure and should only be used where security is not required/important e.g. If you are streaming content that requires an IP in a different location. To understand why it is not secure read on.

For wide compatibility with client devices and ease of setup the L2TP/IPSec service uses a pre-shared key for authentication. This key is often published on a VPN providers website and is therefor accessible by anyone.

However this pre-shared key is not used to encrypt the data between your device and the VPN servers, only to authenticate the server to the client device. A passive adversary eavesdropping on the connection is unable to decrypt the tunnel data. However there does exist a risk of an active MITM (Man in the middle attack) where the adversary impersonates the VPN server and is then able to decrypt and eavesdrop on the connection.

This capability requires some technical sophistication on the part of the attacker but the possibility is very real and therefore we strongly recommend that customers who require security use an OpenVPN based VPN service. Furthermore [leaked NSA presentations released by the "Der Spiegel" publication](http://www.spiegel.de/media/media-35529.pdf) indicate that IKE is being exploited in an unknown manner to decrypt IPSec traffic.

### Further technical info

IPSec uses a protocol called IKE (Internet Key Exchange) which is used to set up a security association (SA) between the client and server. IKE has two phases, during the first phase the client and server generate and exchange [nounces](http://en.wikipedia.org/wiki/Cryptographic_nonce) after which they perform a [Diffie–Hellman](http://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) key exchange. Both sides then use the nounce, the Diffie-Hellman shared secret and the pre-shared key to generate the IKE keys. These IKE Keys are then used in the second stage to generate the IPSec SA's which contain the session keys used to encrypt the tunnel data.

Because of the Diffie-Hellman operation in phase 1 a passive eavesdropper would be unable to derive the same set of session keys used to encrypt the tunnel data. However as mentioned above an active MITM attack is possible due to the use of the pre-shared key in which case the adversary would be able to eavesdrop or even inject malicious data into the connection.
