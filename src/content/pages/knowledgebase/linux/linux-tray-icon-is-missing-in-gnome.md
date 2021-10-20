---
title: Linux - Tray icon is missing in GNOME - IVPN Help
h1: Linux - Tray icon is missing in GNOME
url: /knowledgebase/linux/linux-tray-icon-is-missing-in-GNOME/
sections:
    - linux
    - troubleshooting
sectionTitle: Linux
layout: help-details
weight: 70
---
# Linux - Tray icon is missing in GNOME

In the GNOME desktop environment version 40, tray icons have been mostly removed and the tray icon for the IVPN App does not appear by default.  The IVPN App's tray icon can be restored by installing two packages using the command line via Terminal:

```
$ sudo dnf install gnome-extensions-app gnome-shell-extension-appindicator
```

After installing, launch the `Extensions` application and toggle the `KStatusNotifierItem` switch to **on**.  You may have to log out from the GNOME desktop, then log back in for the `Extesions` application to update.
