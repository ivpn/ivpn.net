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

A list of known issues with the Kill Switch enabled for VPN tunnel in the iOS app:

* [OpenVPN] OpenVPN tunnel will take slightly longer to reconnect to a different gateway
* [OpenVPN] When switching networks, OpenVPN tunnel will reconnect instead of just routing traffic through a different network interface
* Approx. 1-3 seconds delay to engage the Kill Switch after VPN is connected, and the same delay to disengage it after VPN is disconnected
* In some cases, if there are multiple VPN profiles saved in the iOS Settings, internet traffic gets blocked after switching networks or disabling the Airplane mode
