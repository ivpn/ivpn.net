---
title: Windows - "Warning, route gateway is not reachable" - IVPN Help
h1: Windows - "Warning, route gateway is not reachable"
url: /knowledgebase/windows/windows-warning-route-gateway-is-not-reachable/
sections:
    - windows
sectionTitle: Windows
layout: help-details
weight: 50
---
# Windows - "Warning, route gateway is not reachable"

This error is likely to be caused by corruption in the TCP stack on your system. To resolve this try the following:

1.  Open command console - press `'Windows'` button-> type `cmd` -> right-click & hit `Run as Administrator`

2.  Execute the following commands:

    ```
    netsh dump netsh
    netsh winsock reset
    netsh int ip reset
    ipconfig /flushdns
    exit
    ```

3.  Reboot your PC and try to connect once again.

If the problem persists try adding a few configuration changes to the IVPN client:

1.  In the IVPN app navigate to `'Settings'` -> `'OpenVPN'` tab.

2.  Add the following configuration:

    ```
    route-delay 5
    route-method exe
    ip-win32 netsh
    ```

3.  Apply the changes and reconnect.
