---
title: Windows 10 IPSec IKEv2 Setup Guide
url: /setup/windows-10-ipsec-with-ikev2/
layout: setup
platform: windows
---
# Windows 10 IPSec with IKEv2 Setup Guide

This guide will help you set up an IPSec connection using IKEv2

1.  Open the `Control panel` by clicking the start menu icon and typing control

2.  Click `Network and Internet` followed by `Network and Sharing Centre`

3.  Click `Setup a new connection or network`

    ![](/images-static/uploads/windows-10-ipsec-with-ikev2-003.png)

4.  Click `Connect to a workplace`, then click `Next`

    ![](/images-static/uploads/windows-10-ipsec-with-ikev2-004.png)

5.  Click `Use my Internet connection (VPN)`

    ![](/images-static/uploads/windows-10-ipsec-with-ikev2-005.png)

6.  Enter the address of one of the servers from the [server status](/status/) list (depending on which country you want to connect to).
    
    Below that give the connection a name e.g. IVPN - GB.
    
    Choose `Remember my credentials` if you don't want to enter your account ID and password every time you connect.
    
    Click `Create` to continue

    ![](/images-static/uploads/windows-10-ipsec-with-ikev2-006.png)

7.  The VPN connection is now created but we still need to configure it. Open the `Network and Sharing Centre` as shown in steps 1 and 2.
    
    Click `Change Adapter settings`

    ![](/images-static/uploads/windows-10-ipsec-with-ikev2-007.png)

8.  Right click the icon with the name of the connection you created and with the text WAN Miniport (IKE v2)

9.  Below it and click `Properties`

    ![](/images-static/uploads/windows-10-ipsec-with-ikev2-009.png)

10.  Select the `Security` tab and change the Type of VPN to `IKEv2` and the data encryption to `Maximum strength encryption (disconnect if server declines)`  

     Under `Authentication` select `Use Extensible Authentication Protocol (EAP)` and `Microsoft: Secured password (EAP-MSCHAP v2) (encryption enabled)`  

     ![](/images-static/uploads/windows-10-ipsec-with-ikev2-010.png)

11.  Right click the icon with the name of the connection you created again and select `Create shortcut`

     ![](/images-static/uploads/windows-10-ipsec-with-ikev2-011.png)

12.  Click `Yes` to create a shortcut on the desktop

     ![](/images-static/uploads/windows-10-ipsec-with-ikev2-012.png)

13.  Search for `VPN settings` in the search field on the Taskbar or in the Start menu. Click `VPN settings` in the results list.

     ![](/images-static/uploads/windows-10-ipsec-with-ikev2-013a-130-search-vpn.png)

14.  Click the VPN connection created in step #6 above and click the `Advanced options` button.

     ![](/images-static/uploads/windows-10-ipsec-with-ikev2-013b-140-advanced-options.png)

15.  Under `Connection properties`, click the `Edit` button.

     ![](/images-static/uploads/windows-10-ipsec-with-ikev2-013c-150-connection-properties.png)

16.  Enter your account ID (starts with 'ivpn') and the following password - `ivpn`, then click the `Save` button. Close all of the windows that have been opened during this process.

     ![](/images-static/uploads/windows-10-ipsec-with-ikev2-013d-160-ivpn-username-password.png)

17.  To Connect, click your `Task Bar Network Icon`, then click the name of the `IVPN` connection and then `Connect`

     ![](/images-static/uploads/windows-10-ipsec-with-ikev2-013.png)

18.  After a few seconds the network applet should indicate that you are connected to the VPN server.

     ![](/images-static/uploads/windows-10-ipsec-with-ikev2-015.png)


DNS may leak with this manual connection. Check out our guide on [setting DNS manually](/knowledgebase/windows/windows-10---set-ivpn-dns-servers-manually/).

[Disabling IPv6](/knowledgebase/windows/windows-10---disable-ipv6/) may be another way to further tighten up your system.
