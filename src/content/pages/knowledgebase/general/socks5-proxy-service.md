---
title: SOCKS5 Proxy Service - IVPN Help
h1: SOCKS5 Proxy Service
url: /knowledgebase/general/socks5-proxy-service/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 210
---
# SOCKS5 Proxy Service

A proxy service offers a way to further encapsulate the traffic for one application, like a web browser, to change the IP address and location for that one application when the VPN is connected.  


## Overview

All IVPN VPN servers offer a SOCKS v5 proxy service.  The service is available on port `1080` when the VPN is connected.  SOCKS5 proxy services are not available when the VPN is disconnected.

The local IP address for the proxy service is `10.1.0.1` and this address is associated with the DNS name `socks5.gw.ivpn.net`, which is the VPN server hosting the client device's connection.

Hostnames are available on our [server status page](https://www.ivpn.net/status), though typically follow the rule of adding `socks5.` at the beginning of the VPN server's hostname, like `socks5.es1.gw.ivpn.net` or `socks5.nl1.wg.ivpn.net`.

No authentication (username/password) is required for the proxy connection.


## Benefits

### Another Way to Stop Leaks

The IVPN App's Kill Switch Firewall stops all traffic from exiting the system when the VPN is disconnected, though it might be convenient to disable the VPN and the kill switch firewall to access local or remote resources.  An application with proxy settings enabled will only pass traffic when the proxy is available.  Our SOCKS5 proxies are only available when the VPN is connected, so if the VPN is disconnected, the proxy is not available and no traffic will leak from the application.

### Each Application Has a Different IP Address

Set one web browser to Paris and another web browser to Singapore and each web browser's traffic is independent of the other and the current VPN location.


## Add SOCKS5 Proxy Settings

### Mozilla Firefox (all platforms)

1. Go to the Firefox `Settings/Preferences` area, search for **proxy**, then click the `Settings...` button

1. Select `Manual Proxy configuration`

1. In the `SOCKS Host` field, enter the desired IP address or hostname.  Check our [server status page](https://www.ivpn.net/status) for proxy IP addresses and hostnames

1. In the `Port` field beside the `SOCKS Host` field, enter **1080**

1. Make sure `SOCKS v5` is selected

1. Put a checkmark beside `Proxy DNS when using SOCKS v5` otherwise the VPN server's DNS will be used for DNS queries

1. Click `OK`

Select `No Proxy` at the top of the `Connection Settings` area to disable the proxy settings.

### Windows: [Chromium-based browsers](https://en.wikipedia.org/wiki/Chromium_(web_browser)), like Brave, Google Chrome, Microsoft Edge, Opera

1. Edit the browser shortcut properties by clicking the desktop icon and pressing `Alt + Enter`

1. At the end of the the `Target:` field, add a space plus `--proxy-server=socks5://` plus the proxy server IP address or hostname:

    ` --proxy-server=socks5://10.1.0.1` (proxy on connected VPN server)

    ` --proxy-server=socks5://socks5.gw.ivpn.net` (proxy on connected VPN server)

    ` --proxy-server=socks5://socks5.fr1.gw.ivpn.net` (proxy on `fr1` server in France)

1.   Click `OK` to apply and save the changes

Remove the added `--proxy-server=socks5://...` text from the end of the `Target:` field to disable the proxy settings.

### macOS: Safari

1. Open the Safari Preferences

1. Go to `Advanced > Proxies:` and click the `Change Settings...` button

1. Put a checkmark beside `SOCKS Proxy`

1. Enter the desired IP address or hostname in the `SOCKS Proxy Server` field.  Check our [server status page](https://www.ivpn.net/status) for proxy IP addresses and hostnames

1. In the `Port` field beside the `SOCKS Proxy Server` field, enter **1080**

1. Click the `OK` button on the `Advanced` settings screen

1. Click the `Apply` button on the `Network` screen

Remove the check mark beside `SOCKS Proxy` in the `Network > Advanced > Proxies` area, then click `OK` and `Apply' to disable the proxy settings.

### macOS: [Chromium-based browsers](https://en.wikipedia.org/wiki/Chromium_(web_browser)), like Brave, Google Chrome, Microsoft Edge, Opera

1. Open the browser Settings

1. Search for "proxy" and click the button to "Open your computer's proxy settings"

1. Enter the desired IP address or hostname in the `SOCKS Proxy Server` field.  Check our [server status page](https://www.ivpn.net/status) for proxy IP addresses and hostnames

1. In the `Port` field beside the `SOCKS Proxy Server` field, enter **1080**

1. Click the `OK` button on the `Advanced` settings screen

1. Click the `Apply` button on the `Network` screen

Remove the check mark beside `SOCKS Proxy` in the `Network > Advanced > Proxies` area, then click `OK` and `Apply' to disable the proxy settings.

### Android and iOS

AndroidOS and iOS currently support HTTPS proxy services; SOCKS5 proxies are not supported.


## Compatibility with Other IVPN Features

### AntiTracker

No.

The standard DNS is used by the SOCKS5 proxy.  This standard DNS runs on the VPN server itself and all DNS queries are fully encrypted.

### Custom DNS ([IVPN App](https://www.ivpn.net/apps/))

No.

The standard DNS is used by the SOCKS5 proxy.  This standard DNS runs on the VPN server itself and all DNS queries are fully encrypted.

### IPv6

IPv6 sites and services are available through the proxy connection, though a pure IPv6 proxy service is not available.  Proxy IP addresses are currently in the IPv4 address space.  All VPN protocols provide this IPv6-through-IPv4 access, which differs from a VPN-only connection where IPv6-through-IPv4 is available for WireGuard connections.

### Multi-Hop

Yes.  Add a proxy to a web browser and it results in a triple-hop connection: **entry server** to **exit server** to **proxy server**.

### Obfsproxy

Yes, for Windows, macOS, and Linux.

### Port Forwarding

No.

### Split Tunnel ([IVPN App](https://www.ivpn.net/apps/))

No.  A web browser included in the split tunnel bypass list will not be able to make use of the proxy service.

### VPN Protocols

Yes.  All VPN protocols provided by IVPN are supported (IPSec with IKEv2, OpenVPN, WireGuard).
