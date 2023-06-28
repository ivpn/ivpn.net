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

## Overview

Our SOCKS v5 proxy service enables you to configure an application, e.g. a web browser to:

1. Route its traffic through a different VPN server than the one you are connected to. This enables you to effectively setup VPN connections to multiple VPN servers at the same time. For example you could connect to the Paris VPN server but configure your Firefox web browser to exit the Singapore VPN server. All your traffic will exit the Paris server except for traffic from the Firefox web browser which will exit the Singapore VPN server. With the Firefox Multi-account Containers addon you can even configure different VPN servers for each tab of the Firefox browser.
1. Force traffic to be unrouteable if the VPN connection is terminated (application kill switch). The IVPN app firewall already prevents any traffic leaking outside of the VPN connection whilst connected, though you may want an additional kill switch if you need to disable the IVPN firewall to access local or remote resources. This works because our SOCKS5 proxies are only available when the VPN is connected, so if the VPN is disconnected, the proxy is not available and no traffic can leak from the application.

## How to use the SOCKS5 service

All IVPN VPN servers offer a SOCKS v5 proxy service.  The service is available on port `1080` when the VPN is connected.  SOCKS5 proxy services are not available when the VPN is disconnected.

The local IP address for the proxy service is `10.1.0.1` and this address is associated with the DNS name `socks5.gw.ivpn.net`, which is the VPN server hosting the client device's connection. This is helpful if you want to configure an application to always sends it traffic to the SOCKS5 proxy on the same server that you are connected to giving you the additional kill switch functionality described in the overview above.

Hostnames are available on our [server status page](https://www.ivpn.net/status), though typically follow the rule of adding `socks5.` at the beginning of the VPN server's hostname, like `socks5.es1.gw.ivpn.net` or `socks5.nl1.wg.ivpn.net`.

No authentication (username/password) is required for the proxy connection.

## Add SOCKS5 Proxy Settings

### All platforms: Mozilla Firefox

1. Go to the Firefox `Settings/Preferences` area, search for **proxy**, then click the `Settings...` button

1. Select `Manual Proxy configuration`

1. In the `SOCKS Host` field, enter the desired IP address or hostname.  Check our [server status page](https://www.ivpn.net/status) for proxy IP addresses and hostnames

1. In the `Port` field beside the `SOCKS Host` field, enter **1080**

1. Make sure `SOCKS v5` is selected

1. Put a checkmark beside `Proxy DNS when using SOCKS v5` otherwise the VPN server's DNS will be used for DNS queries

1. Click `OK`

![](/images-static/uploads/socks5-firefox.png)

Select `No Proxy` at the top of the `Connection Settings` area to disable the proxy settings.

### All platforms: Firefox Multi-Account containers

The Firefox Multi-Account Containers add-on allows you to associate tabs with a specific container. Tabs in different containers use separate website storage areas, which limits 3rd party tracking and also enables other features such as being able to sign-in to the same account (e.g. Gmail) with two different identities in the same browser. Another feature of these containers is that they can be configured with their own SOCKS5 proxy so we can create one or multiple containers each associated with different exit VPN servers. For example, you could be connected to the London server with the IVPN App, but have three tabs open, one sending traffic to the Amsterdam VPN server, one to the Singapore VPN server and one to the Kharkiv VPN server (all via the SOCKS5 proxy on those servers).

1. Install the [Firefox Multi-Account Containers add-on](https://addons.mozilla.org/en-US/firefox/addon/multi-account-containers/)

1. Click the extension icon in the toolbar and select `Manage Containers`, then `New Container`

1. Give the container a name e.g. `IVPN - Amsterdam` and a color to easily identify tabs in this container and click `OK`

1. Click on the extension icon in the toolbar again and select `Manage Containers` and select the container you just created

1. Click on the link at the bottom `Advanced proxy settings`, enter the proxy address (e.g. `socks://socks5.nl8.gw.ivpn.net:1080` or `socks://socks5.sg1.gw.ivpn.net:1080`) and click `Apply to container`

1. Open a new tab in this container by selecting the extension icon and selecting the container name and navigate to [DNSleaktest.com](https://www.dnsleaktest.com) to verify that the VPN traffic is exiting in the location you configured

{{< video src="/images-static/uploads/firefox-multi-account-containers-ivpn-demo.mp4" type="video/mp4" preload="auto" >}}

### Windows: [Chromium-based browsers](https://en.wikipedia.org/wiki/Chromium_(web_browser)), like Brave, Google Chrome, Microsoft Edge, Opera

1. Edit the browser shortcut properties by clicking the desktop icon and pressing `Alt + Enter`

1. At the end of the the `Target:` field, add a space plus `--proxy-server=socks5://` plus the proxy server IP address or hostname:

    ` --proxy-server=socks5://10.1.0.1` (proxy on connected VPN server)

    ` --proxy-server=socks5://socks5.gw.ivpn.net` (proxy on connected VPN server)

    ` --proxy-server=socks5://socks5.fr1.gw.ivpn.net` (proxy on `fr1` server in France)

1.   Click `OK` to apply and save the changes

![](/images-static/uploads/socks5-edge.png)

Remove the added `--proxy-server=socks5://...` text from the end of the `Target:` field to disable the proxy settings.

### macOS: Safari

1. Open the Safari Preferences

1. Go to `Advanced > Proxies:` and click the `Change Settings...` button

1. Put a checkmark beside `SOCKS Proxy`

1. Enter the desired IP address or hostname in the `SOCKS Proxy Server` field.  Check our [server status page](https://www.ivpn.net/status) for proxy IP addresses and hostnames

1. In the `Port` field beside the `SOCKS Proxy Server` field, enter **1080**

1. Click the `OK` button on the `Advanced` settings screen

1. Click the `Apply` button on the `Network` screen

Remove the check mark beside `SOCKS Proxy` in the `Network > Advanced > Proxies` area, then click `OK` and `Apply` to disable the proxy settings.

![](/images-static/uploads/sock5-macos.png)

### macOS: [Chromium-based browsers](https://en.wikipedia.org/wiki/Chromium_(web_browser)), like Brave, Google Chrome, Microsoft Edge, Opera

1. Open the browser Settings

1. Search for "proxy" and click the button to "Open your computer's proxy settings"

1. Enter the desired IP address or hostname in the `SOCKS Proxy Server` field.  Check our [server status page](https://www.ivpn.net/status) for proxy IP addresses and hostnames

1. In the `Port` field beside the `SOCKS Proxy Server` field, enter **1080**

1. Click the `OK` button on the `Advanced` settings screen

1. Click the `Apply` button on the `Network` screen

Remove the check mark beside `SOCKS Proxy` in the `Network > Advanced > Proxies` area, then click `OK` and `Apply` to disable the proxy settings.

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

Yes, with port-based Multi-Hop.  Add a proxy to a web browser and it results in a triple-hop connection: **entry server** to **exit server** to **proxy server**.

The original Multi-Hop system used a suffix on the IVPN Account ID, like `@fr` to exit in France, and this original system is not 100% compatible with the SOCKS5 proxy service.  For a triple-hop connection and access to all proxy servers, please switch from this original suffix-based system to the port-based system.  This [knowledge base article](https://www.ivpn.net/knowledgebase/general/how-can-i-connect-to-the-multihop-network/) offers details on switching to port-based Multi-Hop.

### Obfsproxy

Yes, for Windows, macOS, and Linux.

### Split Tunnel ([IVPN App](https://www.ivpn.net/apps/))

No.  A web browser included in the split tunnel bypass list will not be able to make use of the proxy service.

### VPN Protocols

Yes.  All VPN protocols provided by IVPN are supported (IPSec with IKEv2, OpenVPN, WireGuard).
