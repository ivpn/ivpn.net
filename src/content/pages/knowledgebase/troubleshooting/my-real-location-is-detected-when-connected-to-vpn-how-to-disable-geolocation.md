---
title: My real location is detected when connected to VPN. How to disable geolocation? - IVPN Help
h1: My real location is detected when connected to VPN. How to disable geolocation?
url: /knowledgebase/troubleshooting/my-real-location-is-detected-when-connected-to-vpn-how-to-disable-geolocation/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 30
---
# My real location is detected when connected to VPN. How to disable geolocation?

Most modern browsers implement the [geolocation API](http://dev.w3.org/geo/api/spec-source.html) aas defined by the W3C which enables browsers to detect the geographic location of the device. This enables web services that rely on location information to function correctly. The specification doesn't define the location sources but the following are commonly used:

1. Global Positioning System (GPS)
2. Available Wi-Fi networks and signal strengths
3. GSM/CDMA cell IDs
4. IP address

If you are connected to IVPN the IP address lookup should return the location of the VPN server. However, if your browser is configured to use any of the alternate location sources then your actual location may be revealed to web services. Most commonly your Wi-Fi network information will be used as there are large databases that map Wi-Fi networks to a geographic location (usually created by cars with GPS & Wi-Fi e.g. Google Street View cars).

## How to disable geolocation in browsers?

### Google Chrome

1. Click the Chrome menu button on the browser toolbar (with the 3 dots).
2. Click on `Settings`.
3. Scroll down and click on `Advanced`.
4. In the 'Privacy and security' section, click `Site settings`.
5. Click 'Location' and toggle 'Ask before accessing' to 'Blocked'.

For further information see [Google's location sharing](https://support.google.com/chrome/answer/142065?hl=en) page.

### Firefox

1. In the URL bar, type `about:config`.
2. In the search bar type `geo.enabled`.
3. Double click on the geo.enabled preference. Location-Aware Browsing should now be disabled.

For further information see the [Firefox Location-Aware Browsing](https://www.mozilla.org/en-US/firefox/geolocation/) page.

### Internet Explorer

1. Open the Tools menu by clicking on the gear icon in the upper-right corner of the browser window.
2. Open the `Privacy` tab.
3. Under Location, select the option `Never Allow Websites To Request Your Physical Location`.

### Microsoft Edge

1. Hit the `Windows` button & select `Settings`
2. Navigate to `Privacy` -> `Location` and toggle location to `Off`

For further information see the [Windows 10 location service and privacy: FAQ](http://windows.microsoft.com/en-us/windows-10/location-service-privacy).

### Apple Safari

1.  Choose `System Preferences` from the Apple () menu.
2.  Click the `Security & Privacy` icon in the System Preferences window.
3.  Click the `Privacy` tab.
4.  If the padlock icon in the lower left is locked  
    ![](https://support.apple.com/library/content/dam/edam/applecare/images/en_US/il/locked_icon.png)  
    , click it and enter an admin name and password to unlock it  
    ![](https://support.apple.com/library/content/dam/edam/applecare/images/en_US/il/unlocked_icon.png)
5.  Select `Location Services`.
6.  Uncheck 'Safari' to disable geolocation. 

### Opera

1. In the URL bar, type `about:config`.
2. In the Preferences Editor, expand the `Geolocation` section.
3. Uncheck `Enable geolocation`.
