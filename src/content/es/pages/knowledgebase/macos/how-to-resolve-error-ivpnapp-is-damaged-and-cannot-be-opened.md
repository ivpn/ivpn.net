---
title: How to resolve error "IVPN.app is damaged and cannot be opened." - IVPN Help
h1: How to resolve error "IVPN.app is damaged and cannot be opened."
url: /knowledgebase/macos/how-to-resolve-error-ivpnapp-is-damaged-and-cannot-be-opened/
sections:
    - macos
    - troubleshooting
sectionTitle: macOS
layout: help-details
weight: 90
---
# How to resolve error "IVPN.app is damaged and cannot be opened."

This error is caused by the macOS extended file attributes which result in app signature verification failure. We are not sure what the root cause of this issue is and it seems to affect only a very small percentage of users. The solution, however, is very simple and does not introduce any security risks. You simply have to remove the extended file attributes on the IVPN.app package.

1.  Open Terminal.app by navigating to the utilities folder within the applications folder.

2.  Type the command below (where ~/Downloads/IVPN.app is the path to the IVPN.app file you extracted)

    ```
    xattr -rc ~/Downloads/IVPN.app
    ```
