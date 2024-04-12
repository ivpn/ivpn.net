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

The IVPN App has a client-server architecture. The IVPN agent runs as a daemon and is responsible for establishing connections, spawning OpenVPN processes, managing WireGuard interfaces, handling firewall rules, etc., whilst the client UI that you interact with is a separate component that communicates with the agent.

Disabling the helper agent will cause the IVPN App to cease functioning.  In order to implement various security features, such as the Always-On firewall, it is important that the agent daemon is always running.

<div markdown="1" class="notice notice--warning">
Please note that by following the instructions below, the IVPN App and the privacy and security features it provides, like the Always-On firewall, will no longer function correctly.
</div>

1.  Quit the IVPN client by clicking on the menu bar icon and selecting `Quit`.

1.  Stop the agent daemon by opening the macOS system `Settings > General > Login Items` and toggling the **IVPN** or **Privatus Limited** entry to `OFF`.  Confirm the change with your macOS user password or biometrics.

Re-enable the agent daemon by toggling that name login item entry to `ON`.   Confirm the change with your macOS user password or biometrics, then open the IVPN App and click on the `Retry..` button.


