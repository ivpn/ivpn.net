---
title: Why is IVPN agent daemon always running? - IVPN Help
h1: Why is IVPN agent daemon always running?
url: /knowledgebase/macos/why-is-ivpn-agent-daemon-always-running/
sections:
    - macos
    - troubleshooting
sectionTitle: macOS
layout: help-details
weight: 100
---
# Why is IVPN agent daemon always running?

The IVPN client software has a client-server architecture. The IVPN agent runs as a daemon and is responsible for establishing connections, spawning OpenVPN processes etc. whilst the client UI that you interact with is a separate component that communicates with the agent.

There are a couple of ways to change this behavior. First, in the app's `Preferences` area, go to the `General` tab and put a check mark beside the `Stop IVPN Agent when the application is not running`.

The other method has more of an impact on the performance of additional features in the app. In order to implement various security features such as the 'always on' firewall, it is important that the agent daemon is always running. This keepalive functionality is configured in the daemons plist file and can be modified to not be persistent by following the instructions below.

<div markdown="1" class="notice notice--warning">
Please note that by following the instructions below the always on firewall will no longer function correctly.
</div>

1.  Quit the IVPN client by clicking on the menu bar icon and selecting `Quit IVPN`.

2.  Stop the agent daemon.

    ```
    sudo launchctl unload net.ivpn.client.Helper.plist
    ```

3.  Edit `/Library/LaunchDaemons/net.ivpn.client.Helper.plist` and change the `KeepAlive` key to `False`.

4.  Start the agent daemon.

    ```
    sudo launchctl load net.ivpn.client.Helper.plist
    ```

5.  Start the IVPN client. When you next quit the IVPN client the IVPN agent daemon will also be killed.
