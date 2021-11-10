---
title: Command Line Client FAQ - IVPN Help
h1: Command Line Client FAQ
url: /knowledgebase/general/command-line-client-faq/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 610
---
# Command Line Client FAQ

1.  ### How do I log in?
    ```
    ivpn login
    ```
    or
    ```
    ivpn login < IVPN Account ID >
    ```
    The IVPN Account ID is available via the [Client Area](/account/) or [sign up](/signup/) today.

2.  ### How do I log out?
    ```
    ivpn logout
    ```

3.  ### How do I see available servers?
    ```
    ivpn servers
    ivpn servers Paris
    ivpn servers land
    ivpn servers -country "United States"
    ivpn servers -protocol ovpn
    ivpn servers -protocol WireGuard
    ```

4.  ### How do I connect?
    ```
    ivpn connect -fastest
    ivpn connect Tokyo
    ivpn connect -country_code -any US
    ivpn connect -protocol WireGuard -city London
    ivpn connect nl.gw.ivpn.net
    ```

5.  ### How do I disconnect?
    ```
    ivpn disconnect
    ```

6.  ### How do I use the firewall?
    ```
    ivpn firewall -status
    ivpn firewall -on
    ivpn firewall -off
    ivpn firewall -lan_allow
    ivpn firewall -lan_block
    ```

7.  ### How do I manage WireGuard keys?
    ```
    ivpn wgkeys -status
    ivpn wgkeys -regenerate
    ivpn wgkeys -rotation_interval 2
    ```
    Check our [WireGuard FAQ](/knowledgebase/general/wireguard-faq/) for more information.

8.  ### How do I use the AntiTracker?
    ```
    ivpn antitracker -on
    ivpn antitracker -off
    ivpn antitracker -on_hardcore
    ```
    Check our [AntiTracker FAQ](/knowledgebase/general/antitracker-faq/) for more information.

9.  ### How do I use a custom DNS server?
    ```
    ivpn dns 1.1.1.1
    ivpn dns -off
    ```

    <div markdown="1" class="notice notice--warning">
    You cannot use Custom DNS together with AntiTracker as once the latter is enabled, it will override the IP address you have specified.
    </div>

10. ### How do I use a different protocol and port?
    Different combinations are available for different VPN protocols.

    - **OpenVPN**: UDP:2049, UDP:2050, UDP:53, UDP:1194, TCP:443, TCP:1443, TCP:80
    - **WireGuard**: UDP:2049, UDP:2050, UDP:53, UDP:1194, UDP:30587, UDP:41893, UDP:48574, UDP:58237

    ```
    ivpn connect -protocol OpenVPN -port TCP:443 de.gw.ivpn.net
    ivpn connect -protocol WireGuard -port UDP:53 sg.wg.ivpn.net
    ```

    TCP and UDP offer different connection benefits. Check [this article](/knowledgebase/general/tcp-and-udp-connections/) for more details.

11. ### How do I Multi-hop entering in Brazil and exiting in Canada?

    ```
    ivpn connect -exit_svr ca.gw.ivpn.net br.gw.ivpn.net
    ```

    <div markdown="1" class="notice notice--warning">
    Entry and exit servers must be in different countries.
    </div>

    Multi-hop is available with IVPN Pro plans. [Upgrade](/signup/) today.

12. ### How do I enable obfsproxy?

    ```
    ivpn -o connect es.gw.ivpn.net
    ```
    or
    ```
    ivpn -obfsproxy connect es.gw.ivpn.net
    ```

13. ### How do I manage logs?

    ```
    ivpn logs -show
    ivpn logs -on
    ivpn logs -off
    ```

    Logs are stored:  
    - **Linux**: `/opt/ivpn/log/IVPN_Agent.log`

14. ### How do I check my account status?

    ```
    ivpn account
    ```

15. ### How do I get help?

    ```
    ivpn -h
    ivpn -h -full
    ivpn connect -h
    ivpn servers -h
    ivpn firewall -h
    ivpn wgkeys -h
    ivpn dns -h
    ivpn antitracker -h
    ivpn logs -h
    ```

[Contact](/contactus/) our support department 24/7 with any questions.
