---
title: Tunnelblick - Password or authentication failure - IVPN Help
h1: Tunnelblick - Password or authentication failure
url: /knowledgebase/macos/tunnelblick-password-or-authentication-failure/
sections:
    - macos
    - troubleshooting
sectionTitle: macOS
layout: help-details
weight: 30
---
# Tunnelblick - Password or authentication failure

Tunnelblick stores usernames and passwords in the macOS keychain. If you are having authentication failures then you should first delete the keychain entries:

1. Open `keychain access` utility by navigating to your `Applications` folder and then `Utilities`.
2. Select `Login` under `keychains` and `all elements` under `Category`.
3. In the search box in the top right, enter `Tunnelblick` to filter all the Tunnelblick keychain entries.
4. Select all the Tunnelblick entries, select `edit` | `delete`.
5. Close Tunnelblick and open it again and try to connect.

If you continue to have authentication issues please see [I receive an 'authentication failure' message. What can I do?](/knowledgebase/troubleshooting/i-receive-an-andsharp039authentication-failureandsharp039-message-what-can-i-do/)
