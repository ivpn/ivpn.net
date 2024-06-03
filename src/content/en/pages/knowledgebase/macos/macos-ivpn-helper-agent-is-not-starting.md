---
title: macOS - IVPN Helper agent is not starting - IVPN Help
h1: macOS - IVPN Helper agent is not starting
url: /knowledgebase/macos/macos-ivpn-helper-agent-is-not-starting/
sections:
    - macos
sectionTitle: macOS
layout: help-details
weight: 160
---
# macOS - IVPN Helper agent is not starting

If you are unable to use IVPN app and getting the error about "IVPN Helper agent" being unable to start, follow the steps below:

1.  Download the latest version of IVPN client for macOS from our website & double click on the installer.

2.  Instead of moving the IVPN icon to your Applications folder in the popped up frame, scroll down and click on `Uninstall IVPN` - this will initiate a full uninstall process, removing any files associated with the app, including configuration files

    ![](/images-static/uploads/macos-uninstaller.png)

3.  Reboot your Mac -> install the IVPN app once again and check if the problem persists.

In case the issue is still there, close the IVPN app, open the terminal on your macOS device and execute the following command:

```
sudo launchctl enable system/net.ivpn.client.Helper
```
