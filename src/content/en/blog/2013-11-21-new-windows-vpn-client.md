---
title: Beta Windows IVPN Client
authors: ["Ed Holden"]
categories: ["Releases"]
tags: ["Apps"]
draft: false
date: 2013-11-21T10:32:48+00:00
url: /blog/new-windows-vpn-client/
comments:
  - author: willy
    date: 2013-12-14T18:59:02+01:00
    content: |
      Any plans on releasing a Mac and Linux version with the same features?
  - author: Ed Holden
    date: 2013-12-15T20:17:31+01:00
    content: |
      Yes, we have a Mac OSX client in active development that will have the exact same feature set as the Windows client. However we have not yet starting working on a Linux client due to demand (most Linux users run OpenVPN as a service) but its very possible that we will develop one in the near future.
  - author: head
    date: 2014-03-17T06:14:41+01:00
    content: |
      Are there any command line parameters for this program?

---
Today we are pleased to announce the first beta of our Windows VPN client for XP/Vista/Windows 7/8. We have incorporated the most popular feature requests. All customer are invited to test the Beta version and submit any feedback. The final version which will include significantly more features should be released before the end of February 2014.

![IVPN Beta Client Home](/images-static/uploads/ivpn-client-beta-main.png "IVPN Beta Client Home")
![ivpn-client-beta-settings](/images-static/uploads/ivpn-client-beta-settings.png "ivpn-client-beta-settings")


## Features

  * **Full Privacy leak detection/alert and blocking** - The application will immediately block all connections and alert the user with a popup screen when it detects that traffic may flow outside of the VPN e.g. if there is a disconnection for any reason. No traffic can flow (incoming and outgoing) until the user explicitly clicks on the 'unblock' button. Note, this feature is not available on Windows XP.
  ![ivpn-client-beta-warning](/images-static/uploads/ivpn-client-beta-warning.png "ivpn-client-beta-warning")
  * **Fully automated updates of new VPN gateways** - The application will transparently check for a cryptographically signed list of servers every few minutes. This means that we can deploy new servers and you will have them available within minutes. The server list is cryptographically signed to ensure the integrity of the data i.e. no MITM attacks where the server IP's are changed to one under the adversaries control.
  * **Notification of upgrades** - When we publish a new version you will receive a notification within the application that a new version is available to download.
  * **Start at login** - Ensure that the application is always loaded when the operating system starts.
  * **Automatically connect to last server on startup**  - If you always connect to the same server you can now have the application connect automatically on startup.
  * **Automatically connect to last server when joining insecure Wi-Fi** - If you connect to a Wi-Fi network without encryption enabled the client will automatically establish a VPN connection to the last server you connected to.
  * **Built in OBFS Proxy** - If you are located in a jurisdiction where OpenVPN is blocked you can enable the built in OBFS Proxy software to obfuscate your connection to the VPN server, bypassing common Internet filtering systems.
  * **Additional ports** - You can now connect to all singlehop servers on UDP/53 and TCP 80. UDP/53 is commonly used for DNS request traffic and is often open when all other ports are blocked.
