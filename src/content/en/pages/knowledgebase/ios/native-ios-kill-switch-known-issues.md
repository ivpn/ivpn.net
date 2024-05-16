---
title: Known issues with Native iOS Kill Switch - IVPN Help
h1: Known issues with Native iOS Kill Switch
url: /knowledgebase/ios/known-issues-with-native-ios-kill-switch/
sections:
    - ios
sectionTitle: iOS
layout: help-details
weight: 40
---
# Known issues with Native iOS Kill Switch

<div markdown="1" class="notice notice--warning">
Kill switch is not available on devices with iOS 16+. Learn why in our blog post <a href="/blog/removal-of-kill-switch-from-our-ios-app-due-to-apple-ip-leak-issue/">here</a>.
</div>

A list of known issues with the Kill Switch enabled for VPN tunnel in the iOS app:

* [OpenVPN] OpenVPN tunnel will take slightly longer to reconnect to a different gateway.
* [OpenVPN] When switching networks, OpenVPN tunnel will reconnect instead of just routing traffic through a different network interface.
* Approx. 1-3 seconds delay to engage the Kill Switch after VPN is connected, and the same delay to disengage it after VPN is disconnected.
* In some cases, if there are multiple VPN profiles saved in the iOS Settings, Internet traffic gets blocked after switching networks or disabling the Airplane mode. Removing all VPN profiles in the iOS Settings and reconnecting the VPN resolves the issue.
* When the Kill Switch is active, the [Personal Hotspot](https://support.apple.com/en-gb/HT204023) network is not available.