---
title: iOS - How to enable Multi-hop - IVPN Help
h1: iOS - How to enable Multi-hop
url: /knowledgebase/ios/ios---how-to-enable-multihop/
sections:
    - ios
sectionTitle: iOS
layout: help-details
weight: 30
---
# iOS - How to enable Multi-hop

Multi-hop increases privacy by sending the encrypted traffic through two countries, which makes tracking attempts extremely difficult.

1. Tap the three horizontal lines in the upper-right corner of the IVPN App's screen to access the `Settings` area.
2. Tap the `Protocols` menu.
3. Choose one of the OpenVPN options. UDP may be more efficient than TCP, but every network is different, so you may have to try a few to find one that works best.
4. Back out of the `Protocols` area and tap the `Multi-hop` toggle to the **ON** position (to the right). This reveals a second server location.
5. Choose whichever server you prefer for the first hop. A geographically close server may be a good choice for increased speed.
6. Choose a server in a different country as the second hop.
7. Back out of `Settings` and tap the connect circle.

Switch back to a single-hop connection by turning the `Multi-hop` toggle from #4 above to **OFF**.

Multi-hop is available on IVPN Pro accounts and limited to OpenVPN connections at this time.
