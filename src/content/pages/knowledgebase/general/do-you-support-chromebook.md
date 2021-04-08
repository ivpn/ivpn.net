---
title: Do you support Chromebook? - IVPN Help
h1: Do you support Chromebook?
url: /knowledgebase/general/do-you-support-chromebook/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 270
---
# Do you support Chromebook?

Not officially.

At this time, Google Chromebook has very limited native VPN support. We have had some customers report success using IPSec however we highly suggest OpenVPN for security reasons. At this time OpenVPN is not fully compatible with Google Chromebook at the ChromeOS level.

Newer models of Chromebooks support Android apps via the Google Play store. The [IVPN App for Android](/apps-android/) may work on these newer Chromebooks and can be installed just like any other app, though there are recent reports that interacting with the app after installing causes a black screen and the app is unusable.

If it does work, please note that the Android subsystem and the ChromeOS subsystem are not 100% in alignment and it may be the case that the default ChromeOS web browser does not make use of the VPN tunnel. You might consider installing an additional web browser from the Google Play store to take full advantage of the VPN connection.
