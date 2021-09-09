---
title: VPN Setup guide for the Synology NAS 6.1
listItem: Synology v.6.1
url: /setup/nas/synology-6/
section: NAS Setup
platform: nas
layout: setup-article
weight: 10
---
## Synology NAS Setup Guide for DSM v.6.1

The following guide explains how to set up your Synology NAS based on DiskStation Manager (DSM) v.6.1.

1.  Download and extract the archive with our [.ovpn config files](/releases/config/ivpn-openvpn-config.zip).

2.  Log into your Synology device, navigate to `Control Panel` - `Network` - `Network Interface` & click on the `Create` - `Create VPN Profile`.

    ![](/images-static/uploads/install-synology-nas6.1-1.png)

3.  Choose `OpenVPN (via importing a .ovpn file)` & click on `Next`

    ![](/images-static/uploads/install-synology-nas6.1-2.png)

4.  Fill in the following fields:

    **Profile name** - Give it any name you want, e.g. **IVPN_Germany**.  
    **User name** - Your account ID that begins with letters 'ivpnXXXXXXXX' or 'i-XXXX-XXXX-XXXX'.  
    **Password** - Any password.  

    <div markdown="1" class="notice notice--info">
    Only your account ID is used for authentication and is case-sensitive. Enter anything into the password field. !IMPORTANT! The password field cannot be left empty.
    </div>

    **Import .ovpn file** - specify the location of the VPN profile file you adjusted in the first step.  
    Click `Next`.

    ![](/images-static/uploads/install-synology-nas6.1-3.png)

5.  We recommend enabling all options in the Advanced Settings:

    `Use default gateway on remote network` - enable this option to route the network traffic of the Synology NAS to the specified VPN server.  
    `Allow other network devices to connect through this Synology server's Internet connection` - enable this option to allow network devices that are within the same local network as your Synology NAS to connect to the same VPN server.  
    `Reconnect when the VPN connection is lost` - if the VPN connection is unexpectedly lost, the system will attempt to reestablish the connection five times, attempting once every 30 seconds.  
    Click `Apply`.  

    ![](/images-static/uploads/install-synology-nas6.1-4.png)

6.  The VPN profile is now successfully created. You can now manage your tunnel with `Connect/Disconnect` button.

    ![](/images-static/uploads/install-synology-nas6.1-5.png)
