---
title: How to Disable Enhanced App Authentication (EAA)
h1: How to Disable Enhanced App Authentication (EAA)
url: /knowledgebase/troubleshooting/how-to-disable-enhanced-app-authentication-eaa
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 70
---

# How to Disable Enhanced App Authentication (EAA)

### Via the IVPN App's Graphical Interface

Go to the app's **Settings > Advanced > Enhanced App Authentication** area and click the `Disable` button, enter the EAA password, then click the `Disable` button.

### Via the IVPN App's Command-line Interface (CLI)

Open a Command Prompt or Terminal and type `ivpn eaa -off`, type the EAA password, then press `Enter/Return`.

### When the EAA Password is Lost

Two options are available:

- Use Windows Administrator access or macOS/Linux superuser (root) access to bypass the EAA password requirement to disable the EAA feature via the IVPN App directly.

    **Windows:** right-click on the **Command Prompt** icon, click `Run as Administrator`. Type `ivpn eaa -off` and press `Enter`

    **macOS/Linux:** In a Terminal, type `sudo ivpn eaa -off` or run `ivpn eaa -off` as root

- EAA is based on single file, which is protected for reading by a standard computer account with user-level privileges.  This file contains information about the EAA password.  If this file does not exist, EAA is disabled.  Removing this file manually will disable EAA.  Only a privileged user can remove this file (Windows Administrator, macOS/Linux superuser or root).

    **File locations:**  
    Windows: `C:\Program Files\IVPN Client\etc\eaa`  
    macOS: `/Library/Application Support/IVPN/eaa`  
    Linux: `/opt/ivpn/mutable/eaa`  
