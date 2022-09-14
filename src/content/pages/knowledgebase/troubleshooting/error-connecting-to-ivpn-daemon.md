---
title: 'Error Connecting to IVPN Daemon - IVPN Help'
h1: 'Error Connecting to IVPN Daemon'
url: /knowledgebase/troubleshooting/error-connecting-to-ivpn-daemon/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 190
---
# Error Connecting to IVPN Daemon

In some cases, rebooting the computer system is enough to encourage the IVPN App's daemon/service to behave as expected.

For Linux systems, the IVPN App's base package `ivpn` may need to be updated if the graphical interface package `ivpn-ui` has a higher version number.  [Update](https://www.ivpn.net/apps-linux/) the app's base package.

In other cases, restarting the daemon/service may help.  Here are steps to restart the IVPN App's daemon/service manually:

### Windows:

1. Click the `Windows` or `Start` button and type `services.msc`
1. Right-click the `Services` app and select `Run as Administrator`
1. Look for the `IVPN Client` service in the list on the right, then right-click on it and choose to restart (if currently in `Enabled` state) or enable (if in `Disabled` state)
1. Close the properties window, the `Services` window, and any other windows that were opened in this process
1. Open the IVPN App.  Click "Retry" on the app's window if necessary


### macOS:

Run this command in a **Terminal** (Finder > Applications > Utilities > Terminal):

```
sudo launchctl enable system/net.ivpn.client.Helper
```

Note: The `sudo` portion of the command requires your macOS password.


### Linux (systemd):

In a **Terminal**, run this command:

```
sudo systemctl restart ivpn-service.service
```


If the IVPN App's daemon/service error persists on Windows, macOS, or Linux, reinstalling the app might help.  Generally, we recommend uninstalling the app, rebooting the computer system, then [reinstalling](https://www.ivpn.net/apps/) the app.
