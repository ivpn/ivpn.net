---
title: My IP is being leaked by WebRTC. How do I disable it? - IVPN Help
h1: My IP is being leaked by WebRTC. How do I disable it?
url: /knowledgebase/general/my-ip-is-being-leaked-by-webrtc-how-do-i-disable-it/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 30
---
# My IP is being leaked by WebRTC. How do I disable it?

WebRTC (Web Real-Time Communication) is an API drafted by the W3C that supports browser-to-browser applications for voice calling, video chat, and P2P file sharing (without the need of either internal or external plugins). WebRTC implements STUN (Session Traversal Utilities for Nat), a protocol that allows the discovery of your externally assigned IP address (to facilitate the applications above).

Due to the way in which Windows selects the adapter when sending traffic (source IP address selection), the request to the STUN server may leak outside of the VPN and expose your ISP issued IP address. However, if you are using a VPN firewall, such as the [IVPN Firewall](/knowledgebase/general/do-you-offer-a-kill-switch-or-vpn-firewall/) available in our [apps](/apps/), then these leaks will be blocked.

However, it is still possible for the site to identify your internally assigned IP addresses as these are detected by the browser locally using JavaScript. Please follow the instructions below to disable WebRTC.

To test whether you are vulnerable please visit this [demo page](https://diafygi.github.io/webrtc-ips/).

### Mozilla Firefox

1. Type `about:config` in the address bar.

2. Scroll down to `media.peerconnection.enabled`, double click to set it to `false`.

### Internet Explorer

No action is necessary.

### Google Chrome (Android only)

1. In your Chrome address bar type `chrome://flags/#disable-webrtc` and hit Enter

2. `WebRTC Stun origin` header should be set to **Enabled**

3. Restart your Chrome browser for changes to take effect.
