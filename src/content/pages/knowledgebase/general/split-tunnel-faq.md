---
title: Split Tunnel FAQ - IVPN Help
h1: Split Tunnel FAQ
url: /knowledgebase/general/split-tunnel-faq/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 589
---
# Split Tunnel FAQ

1.  ### What is Split Tunnel?
    Split Tunnel is a feature that lets you choose which apps use the VPN tunnel and which bypass it. Check the following [article](/knowledgebase/general/split-tunnel-uses-and-limitations/) for more details on the feature uses and limitations.

2.  ### Which platforms is Split Tunnel available on?
    The Split Tunnel feature is currently available on our apps for Windows, Linux and Android.

3.  ### What types of VPN Split Tunneling do you offer?

    #### App-based Split Tunneling (Windows, Linux and Android) 
    All apps on the system are using the VPN connection with the exception to those added to the Split Tunnel list.
    
    #### Inverse app-based Split Tunneling (Windows and Linux)
    Apps in the Split Tunnel list use the VPN connection. Everything else on the system is not using the VPN.

4.  ### Can I use Split Tunnel to exclude a specific website/s from the VPN?
    We do not currently offer a URL-based Split Tunnel functionality.

5.  ### Which DNS server does the app added to the Split Tunnel list use?
    If the [IVPN Firewall](/knowledgebase/general/do-you-offer-a-kill-switch-or-vpn-firewall/) is enabled, apps excluded from the VPN tunnel will use the DNS server set by the IVPN app. Otherwise, DNS requests may leak to your ISP.

    In the Inverse Split Tunnel mode, the DNS requests may leak to your ISP provided DNS servers unless `Block DNS servers not specified by the IVPN application` option is enabled.
    
    Run the extended test on the [dnsleaktest](https://dnsleaktest.com) page to confirm.

6.  ### How can I activate the Split Tunnel?

    #### Windows
    In the IVPN app, go to `Settings` - `Split Tunnel`, enable the `Split Tunnel` option, click on the `Add application` button and select the app from the list or add the path to the app's executable manually.
    
    For inverse Split Tunnel functionality, have the `Inverse mode` option checked. Note, you cannot use the IVPN Firewall in this mode.

    Split Tunnel can also be managed via CLI. Run `ivpn splittun -h` command for details.

    You can have multiple apps added to the Split Tunnel list. The user defined Split Tunnel configuration persists through the system reboot and is automatically applied when the IVPN app is started.

    It is impossible to add apps to the Split Tunnel list installed via Microsoft Store.

    #### Linux
    To start the app in the Split Tunnel environment, it has to be launched from the IVPN app.

    Navigate to `Settings` - `Split Tunnel`, enable the `Split Tunnel` option, click on the `Launch application` button and start the required app from the list or by specifying the path to the binary.

    For inverse Split Tunnel functionality, have the `Inverse mode` option checked. Note, you cannot use the IVPN Firewall in this mode.    

    The apps can also be quickly started in the Split Tunnel environment from the app's main UI window by clicking on the `+` icon in the `Split Tunnel mode active` area, as well as via the terminal (see `ivpn splittun -h` for details).

    #### Android

    In the IVPN app, access `Settings` by tapping on the `Gear` icon in the top right. Navigate to `Split Tunnelling` area and toggle the switch **'On'** next to the apps you want to use the VPN and **'Off** for those that must to use your default connection.

    The user defined Split Tunnel configuration persists through the system reboot and is automatically applied when the IVPN app is started.