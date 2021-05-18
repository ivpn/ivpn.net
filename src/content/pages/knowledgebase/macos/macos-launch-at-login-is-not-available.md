---
title: macOS - "Launch at login" is not available - IVPN Help
h1: macOS - "Launch at login" is not available
url: /knowledgebase/macos/macos-launch-at-login-is-not-available/
sections:
    - macos
sectionTitle: macOS
layout: help-details
weight: 190
---
# macOS - "Launch at login" is not available

The IVPN App for macOS requires permission to access the `System Events.app` on macOS to provide a way for the IVPN App to integrate with the macOS at a low level.  By granting permission, the IVPN App is allowed to make entries in the event log related to VPN, routing and firewall processes, and launching the app on login.

During the IVPN App's installation process, access to `System Events.app` is requested.  If access is denied, the "Launch at login" feature will be greyed out and unavailable.

You can view this permission entry on a macOS computer by opening `System Preferences > Security & Privacy > Privacy tab > Automation` and checking that the IVPN App has a check mark denoting permission to access `System Events.app`.  Toggling this check mark will grant or deny access.  Access is required for the "Launch at login" feature.
