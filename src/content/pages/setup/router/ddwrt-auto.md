---
title: VPN Setup guide for DD-WRT routers using our automated setup script
listItem: DD-WRT auto
url: /setup/router/ddwrt-auto/
section: Router Setup
platform: router
layout: setup-article
weight: 11
---
## DD-WRT Auto Setup Guide

1.  Navigate to the home page of your router - By default `192.168.1.1`. If required enter your username and password, by default username is 'root' and password is 'admin'. Click on the `Administration` tab and then the `Commands` tab.

2.  Navigate to the [DD-WRT auto installer script](/clientarea/ddwrt/) (You may need to login to the client area if you are not logged in).

3.  Enter your account ID (starts with 'ivpn'), any password and select a server to connect to. Click `Download script`.

    <div markdown="1" class="notice notice--info">
    Only your account ID is used for authentication. The password field can be left empty or set to anything if your client software requires a non-blank password.
    </div>

4.  Open the downloaded text file and copy and paste into the `Commands` text area.

5.  Click on the `Save Startup` button.

6.  Click on the `Management` tab and then click on the `Reboot router` button on the bottom of that page. Your router will reboot and connect to the VPN. This can take up to 3 minutes.
