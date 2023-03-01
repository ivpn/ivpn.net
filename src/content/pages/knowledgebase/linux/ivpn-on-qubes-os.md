---
title: IVPN on Qubes OS - IVPN Help
h1: IVPN on Qubes OS
url: /knowledgebase/linux/ivpn-on-qubes-os/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 8
---
# IVPN on Qubes OS

<div markdown="1" class="notice notice--warning">
This guide was produced using Qubes OS release 4.1.1 (R4.1) and fedora-36 as VM template
</div>

### Introduction

Qubes OS uses a ProxyVM as an intermediary between other VMs in the system and the outside world. The primary function of a ProxyVM is to handle network traffic for other VMs, allowing those VMs to remain isolated from the internet, untrusted and potentially hostile networks.

In Qubes OS, each VM is assigned a specific role, such as a NetVM (for networking) or an AppVM (for running applications). When an AppVM needs to connect to the internet, it sends its network traffic to the designated NetVM.

Alternatively, an AppVM can send its network traffic directly to a ProxyVM for processing. This configuration, known as a "ProxyVM-based NetVM," allows the ProxyVM to enforce various security policies, such as blocking certain types of traffic or limiting access to specific resources. It also allows the use of a Virtual Private Network (VPN) connection, which can provide additional privacy and security for network traffic.

By configuring a ProxyVM to use a VPN connection, all network traffic from the other VMs in the system can be routed through the VPN, ensuring that the traffic is encrypted and anonymized before it leaves the system. This approach can be especially useful when accessing sensitive or confidential information over untrusted networks.

In summary, using a Proxy VM in Qubes OS can provide a flexible and customizable framework for managing network security and isolation, including the ability to use a VPN connection for added privacy and security.

This guide describes the configuration for the following setup:

<div markdown="1" class="notice notice--info">
App VM/s -> Proxy VM (with IVPN) -> Internet
</div>

### Creating ProxyVM

1. Navigate to Qube manager (`Main menu` -> `Qubes Tools` -> `Qube Manager`):

2. Create “New qube” with the following parameters: 

    - Name and label: **ivpn-proxy**
    - Type: **StandaloneVM (fully persistent)**
    - Template: **fedora-36**
    - Networking: **default (sys-firewall)**
    - Advanced tab -> “Provide network access to other qubes“: **enabled**

3. Press `OK`

### Installing IVPN client

1. Start the recently created **ivpn-proxy** cube (`right-click` -> `Start/Resume`)

2. Open **ivpn-proxy** terminal (`Main menu` -> `Service: ivpn-proxy` -> `ivpn-proxy: Terminal`)

3. Install IVPN client (refer to <a href="/apps-linux/#fedora" target="_blank">Fedora setup instructions</a>)

4. Add IVPN client to **ivpn-proxy** VM menu: 

    - `Main menu` -> `Service: ivpn-proxy` -> `Settings` 
    - In the Applications tab: select `IVPN` from the list and press the `>` button
    - Press `OK`

### Configuring IVPN client

IVPN client must start and establish a VPN connection automatically when ProxyVM (**ivpn-proxy**) starts. It must also block all network traffic when not connected to the VPN server.

1. Start the IVPN app (`Main menu` -> `Service: ivpn-proxy` -> `ivpn-proxy: IVPN`)

2. Log in using your IVPN account ID (i-XXXX-XXXX-XXXX or ivpnXXXXXXXX)

3. In the app's `Settings` - `General` area:

    - Autoconnect On launch: **Enabled**
    - Allow background daemon to manage autoconnect: **Enabled**

4. `Settings` - `IVPN Firewall`:
    
    - Always-on firewall: **Enabled**

5. `Settings` -> `DNS`:

    - Force management of DNS using resolv.conf: **Enabled**(!)

6. Select preferred VPN settings (VPN protocol, server, etc.) and connect

### DNS: Configuring DNAT on ProxyVM

Qubes OS requires the **/usr/lib/qubes/qubes-setup-dnat-to-ns** script to be run every time after updating DNS settings on ProxyVM.

The **/usr/lib/qubes/qubes-setup-dnat-to-ns** script sets up the necessary DNAT (Destination Network Address Translation) rules by modifying the iptables configuration. This allows DNS requests to be properly forwarded from AppVM-s.

There are various approaches to execute this script automatically:

#### Approach 1 - Modify the VM startup script:

<div markdown="1" class="notice notice--info">
This approach is easy but not robust: DNS will not work if DNS settings change on ProxyVM; it will also not work for situations when it takes too long time for system to boot
</div>

1. Open **ivpn-proxy** terminal (`Main menu` -> `Service:ivpn-proxy` -> `ivpn-proxy: Terminal`)

2. Update **/rw/config/rc.local** file with the following command: 
    ```
    echo -e "sleep 10 # Waiting a bit so that IVPN can establish a connection\n/usr/lib/qubes/qubes-setup-dnat-to-ns" | sudo tee -a /rw/config/rc.local
    ```

#### Approach 2 - Modify IVPN ‘dns’ script:

<div markdown="1" class="notice notice--info">
This approach is more robust because DNAT will be updated every time when IVPN updates DNS settings.
</div>

1. Open the **/opt/ivpn/etc/firewall.sh** script file on **ProxyVM (ivpn-proxy)** and add the following right after the `elif [[ $1 = "-set_dns" ]]; then` line:
    ```
    #QUBES OS - specific operation

    /usr/lib/qubes/qubes-setup-dnat-to-ns || echo "Error: failed to run '/usr/lib/qubes/qubes-setup-dnat-to-ns'"
    ```


2. The contents of **/opt/ivpn/etc/firewall.sh** should look as follows:
    ```
    ...
    #DNS rules
    elif [[ $1 = "-set_dns" ]]; then

    #QUBES OS - specific operation
    /usr/lib/qubes/qubes-setup-dnat-to-ns || echo "Error: failed to run '/usr/lib/qubes/qubes-setup-dnat-to-ns'" 

    get_firewall_enabled || return 0
    ...
    ```

### AppVM

All AppVMs that need to use the VPN connection have to be configured to use **ivpn-proxy** ProxyVM.

1. In Qube manager (`Main menu` -> `Qubes Tools` -> `Qube Manager`), create “New qube” with the following parameters: 

    - Name and label: **my-app-vm**
    - Type: **AppVM** 
    - Template: **fedora-36**
    - Networking: **ivpn-proxy**(!)

2. Press `OK`

That is it. Now, all traffic from my-app-vm will go through the VPN connection.

### Final steps

1. Reboot your system

2. To confirm that you are connected to the IVPN network, check the connection status tool on our website and run a dns leak test at [https://www.dnsleaktest.com](https://www.dnsleaktest.com)