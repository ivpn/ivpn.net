---
title: Tunnelblick - Opening utun - No buffer space available - IVPN Help
h1: Tunnelblick - Opening utun - No buffer space available
url: /knowledgebase/macos/tunnelblick-opening-utun-no-buffer-space-available/
sections:
    - macos
    - troubleshooting
sectionTitle: macOS
layout: help-details
weight: 80
---
# Tunnelblick - Opening utun - No buffer space available

There is a bug in some versions of Tunnelblick which can result in the error above shown in the logs. To resolve follow the steps below.

1. Ensure that you are running the [latest stable version of Tunnelblick](https://tunnelblick.net/downloads.html).
2. Click on the Tunnelblick menu bar icon and then `VPN details`. Select the server you are trying to connect to and click the `advanced button`. Change the option `Load TUN driver automatically` to `Always load TUN driver`.
3. If neither of the above resolve the issue, restart your computer and try again.
