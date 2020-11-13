---
title: Using WireGuard® for Privacy Protection - IVPN Help
h1: Using WireGuard® for Privacy Protection
url: /knowledgebase/general/using-wireguard-for-privacy-protection/
sections:
    - general
    - privacy
sectionTitle: General
layout: help-details
weight: 530
---
# Using WireGuard® for Privacy Protection

WireGuard® is a new VPN protocol that utilises state-of-the-art cryptography. It aims to be simpler and more performant than IPsec and OpenVPN. This promises huge benefits for its users:

- Much easier to audit, due to its small codebase
- Faster speeds
- Easy to configure
- More reliable: it supports user roaming and has less overhead

If you're not familiar with it, we highly recommend reading the excellent [white paper on WireGuard, written by its author, Jason A. Donenfeld](https://www.wireguard.com/papers/wireguard.pdf).

### Security vs Privacy

WireGuard was not designed with commercial VPN providers who offer privacy services in mind. As such, it leaves certain issues (e.g. IP address assignment, key distribution etc.) to the implementers.

The border between privacy and security is very blurred by nature and needs to be specifically defined, so as to understand, where WireGuard makes compromises that need to be addressed.

We define the split as the following:

- The security of the protocol is concerned with protecting the data in a tunnel from being accessed by adversaries: either by breaking the encryption, MITM attacks, or by any other means, no matter how complicated.

- Privacy is concerned with whether an adversary can learn anything about you, your communication or any party you've communicated with. It has more to do with the metadata rather than the actual data.

Privacy can be violated, even when security is rock solid. For example, when the fact that two parties communication can be determined. Or when a certain piece of information about a party becomes known after the communication took place. However, it should be noted that, if security is weak, privacy cannot be guaranteed at all.

WireGuard provides a very high level of security, let's take a look at where it is not particularly effective at with protecting privacy, and how we at IVPN fix these issues.

### Problem 1: The public IP address of a peer is stored in memory indefinitely

If you run WireGuard command line utility wg(8) on a server with root privileges, you will see entries similar to this:

```
peer: TmljZSBUcnkgISA6KSB3b3J0aCBjaGVja2luZw==
endpoint: 198.51.100.23:39812
allowed ips: 192.0.2.131/32 
latest handshake: 22 hours, 42 minutes, 5 seconds ago
transfer: 1.99 KiB received, 2.76 KiB sent
```

As you can see, WireGuard is associating public IP address of a peer (endpoint field in the output above) with the key.

This is not really any different from any other VPN protocol: it needs to know where to send encrypted packets to.

What is different is that other protocols keep track if the peer is active. When a peer is determined to be inactive, or if the connection is closed, other VPN protocols purge the peer information. WireGuard doesn't do this.

WireGuard doesn't really have a concept of a connection, it is connection-less, peers can stop exchanging data at any time and expect to be able to continue at any point in the future. This helps, for example, when a peer wakes from sleep mode or when a user is roaming and switches from mobile to Wi-Fi.

This is not optimal for privacy, however, as a peer's IP address may be stored long after it stops sending data to the tunnel.

#### Solution

The WireGuard protocol uses sessions to manage various aspects of the peer data exchange, sessions last maximum for 180 seconds.

Internally WireGuard stores the time of the latest handshake so that it knows what to do when exchanging data with a peer:

- When fewer than 120 seconds have elapsed, just send data as the session is still active

- 120 to 179 seconds have elapsed, send data and interleave a handshake to renew the session.

- More than 180 seconds have elapsed, handshake to renew the session before data is sent.

Knowing this, we can solve the issue of WireGuard holding on to peer information indefinitely and reduce it to a minimum.

When it is reasonably clear that the remote peer has stopped talking (i.e. latest handshake is more than 180 seconds ago), the peer's configuration can be deleted and then reinstated.

This removes the peer information and configures the server to wait for an incoming handshake. The example above becomes:

```
peer: TmljZSBUcnkgISA6KSB3b3J0aCBjaGVja2luZw==
allowed ips: 192.0.2.131/32
```

We handle this within our "key management daemon" – specially developed software which manages keys on our gateway.

It scans the list of peers for those that have the latest handshake time greater than 180 seconds ago and deletes/reinstates their configuration.

Our KMD interacts directly with the WireGuard kernel module to manage the information it requires (we don’t write config files).

#### Summary

We don't store connection data or metadata about your keys and we take care to ensure that we don't hold on to data any longer than is required by the WireGuard protocol for optimal usage.

### Problem 2: WireGuard doesn't provide a mechanism for tunnel IP address allocation.

In order to operate, each tunnel requires an internal tunnel IP address to be assigned on both ends, regardless of which protocol is used.

Protocols like OpenVPN and IPSec rely on DHCP to assign a dynamic tunnel IP address during connection to the peer.

However, as discussed above, WireGuard doesn't have the concept of connections. And because of its architecture, it cannot rely on mechanisms like DHCP for tunnel IP address assignment to the peers.

In WireGuard, the responsibility to allocation tunnel IP addresses in shifted away from the protocol and to the user. In some environments, a simple static address assignment may be possible.

However, this doesn't scale well to large numbers of clients. A mechanism is required to dynamically generate tunnel IP addresses and distribute public keys prior to the connection being made.

This mechanism should be implemented in a way that the privacy of customers cannot be compromised.

#### Solution

At IVPN, we solve this by assigning a random tunnel IP address for each key provided.

It works like this:

1. You generate a key pair.
2. You provide us with the public key.
3. We generate a random IP address from a huge private network range and return it back to you.
4. We distribute both, your public key and the generated IP address to all our gateways.
5. You configure your client with the private key you generated in step 1 and the IP address we returned in step 3.

All of these steps are done automatically in a fraction of a second when using our apps.

Since the private network range is huge, we can allocate random addresses from it and not worry that we will run out of them. Neither do we have to reclaim any previously-used internal IP addresses to avoid exhaustion.

IP Addresses are deleted together with keys, either by apps (when you log out), or alternatively when your account gets suspended or cancelled or by you through our website.

#### Summary

We allocate random tunnel IP addresses which we provide to you or our Apps to complete the WireGuard connection setup. There is no need for us to keep track of the usage of these addresses nor reclaim them since they are allocated from the huge private network range.

For added privacy, we provide a mechanism to rotate these addresses at your request, as described below.

### Problem 3: Without real dynamic IP address allocation, users can be tracked under some circumstances.

As discussed in previous sections, WireGuard relies on statically assigned tunnel IP addresses, while other protocols like OpenVPN and IPSec, can change the tunnel IP address on every connection.

The private tunnel IP address should never be seen on the public internet, as it’s always secured by the protocol's encryption.

If an adversary monitors the traffic, there is no way to know that the packet from a specific user on the public internet is associated with a particular device or internal tunnel IP address.

However, software running on the user's computer may actually see your tunnel interface and the associated internal IP address.

Another option to extract this tunnel IP address is through WebRTC if it is enabled in a browser etc.

If extracted, this can serve as an identifier, when other measures are not implemented.

#### Solution

All IVPN clients apps support periodically changing IP addresses. This process is implemented together with key regeneration (see below).

By default, this happens every 7 days but can be changed from within the app's settings to up to once per day.

#### Summary

Your tunnel IP address is no longer static and it becomes more difficult to track a user if it gets exposed through WebRTC or by software.

### Problem 4: WireGuard doesn't offer "identity-hiding forward secrecy"

As discussed on the WireGuard [mailing list](https://lists.zx2c4.com/pipermail/wireguard/2019-January/003777.html), the WireGuard protocol doesn't offer identity-hiding forward secrecy.

If an attacker records all traffic to/from a server, then breaks into the server and extracts the WireGuard private key from it, they will be able to correlate traffic with specific users.

#### Solution

All IVPN client apps support periodic, automatic key regeneration which also changes the internal IP address. During this process, the client creates a new key pair and uploads a new key to the server, and we provide the client with a new IP address.

The new key is distributed to our servers and the client switches to using it and the new IP address. This is designed to be completely transparent to the user.

The default is to regenerate the key every 7 days. It can be changed in the app's settings to be regenerated between once a day to once every 30 days.

#### Summary

Previous sessions cannot be identified or tracked.
