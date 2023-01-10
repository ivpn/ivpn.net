---
title: Configuring the IVPN app to autoconnect - IVPN Help
h1: Configuring the IVPN app to autoconnect
url: /knowledgebase/general/configuring-the-ivpn-app-to-autoconnect/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 12
---
# Configuring the IVPN app to autoconnect

IVPN desktop apps can be configured to autoconnect when the application is started or as soon as the IVPN daemon/service is started.

The last option can be especially useful to those who prefer to control the app via CLI/terminal commands and have their system connected to the VPN server as quickly as possible, during the system boot up or when the user is logged into the system (depends on the OS).

The basic autoconnect functionality can be enabled in the app’s `Settings` - `General` area by having both `Launch at login` and `Autoconnect on launch` options checked.

By additionally enabling the `Allow background daemon to manage autoconnect` option, the connection to the VPN server will be established as soon as the IVPN app’s daemon is started:

* Linux: during system boot up
* macOS: user is logged into the system
* Windows: during system boot up (on Cold Startup) or user session is started
 
This option can also be enabled via the following CLI/terminal command:
```
ivpn autoconnect -on_launch on
```
The same logic is applied when using the Wi-Fi Control feature (Trusted Networks) together with the `Allow background daemon to apply WiFi Control settings` option enabled.
