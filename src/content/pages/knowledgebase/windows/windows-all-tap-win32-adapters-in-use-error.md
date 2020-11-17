---
title: Windows - "All TAP-Win32 Adapters in Use" error - IVPN Help
h1: Windows - "All TAP-Win32 Adapters in Use" error
url: /knowledgebase/windows/windows-all-tap-win32-adapters-in-use-error/
sections:
    - windows
    - troubleshooting
sectionTitle: Windows
layout: help-details
weight: 30
---
# Windows - "All TAP-Win32 Adapters in Use" error

This error indicates that the VPN was not cleanly disconnected from the previous session or another VPN connection is already established.

1. Click the `Start Menu` button and then select the `Control Panel`.
2. Click on `Network and Internet`.
3. Click on `Network and Sharing Center`.
4. Click on `Change adapter settings`.
5. Find the connection which is your TAP Adapter, right-click the `TAP adapter` and select `Disable`.
6. Right-click the `TAP adapter` and select `Enable`.

If the above does not resolve the issue please close and restart all OpenVPN processes by following these steps

1. Press `ctrl alt del`.
2. Open `task manager`.
3. End all instances of any process containing the word **openvpn**.
4. Restart OpenVPN.
5. Retry connecting to IVPN.