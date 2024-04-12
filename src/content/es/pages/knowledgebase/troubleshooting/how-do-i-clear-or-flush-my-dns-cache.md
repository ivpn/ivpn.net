---
title: How do I clear or flush my DNS cache? - IVPN Help
h1: How do I clear or flush my DNS cache?
url: /knowledgebase/troubleshooting/how-do-i-clear-or-flush-my-dns-cache/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 110
---
# How do I clear or flush my DNS cache?

The following instructions will flush the cache of your DNS resolver. This may be necessary if you are having DNS issues or you have [reset your DNS configuration](/knowledgebase/troubleshooting/how-can-i-reset-my-dns-settings/).

### Windows 8 / Windows 10

1.  On Windows 8 press the `Windows Key` or hover your mouse over the bottom left corner and click the Windows Icon. On Windows 10 click on the start button.
2.  Begin typing `Command Prompt`.
3.  Right-click the application and select `Run as Administrator`.
4.  Enter the following command followed by the enter button:
    ```
    ipconfig /flushdns
    ```

### macOS

1.  Click the `Terminal` icon in the dock or in Finder under Application/Utilities/Terminal.
2.  Enter the following command followed by the enter button:
    ```
    sudo killall -HUP mDNSResponder
    ```

### Linux

1.  Open a terminal window (gnome-terminal, konsole, xterm, etc.).
2.  Enter the following command followed by the enter button:
    ```
    sudo /etc/init.d/nscd restart
    ```
