---
title: Device Management FAQ - IVPN Help
h1: Device Management FAQ
url: /knowledgebase/general/device-management-faq/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 199
---
# Device Management FAQ

### What is Device Management?

Device Management is an opt-in (disabled by default) feature that allows you to see the number and the list of devices that are currently added to your IVPN account (logged in to the IVPN app) and log specific or all devices out directly from the Client Area on our website.

### What information do you store for Device Management?

When Device management is enabled, entries in the temporary record table used for limiting the number of connected devices are appended by an additional field that specifies the Device name. The device names are defined and assigned by IVPN and are not unique, therefore cannot be used to identify your account in case an adversary was able to gain access to this data. For this specific reason, we have made it impossible to set unique device names or identifiers. Please, see our [Privacy Policy](/privacy/) for more details.

### How can I enable Device Management?

<div markdown="1" class="notice notice--info">
Device Management is only available for accounts that were created after November 2020 (account ID format: i-XXXX-XXXX-XXXX). If you have an IVPN subscription created before this date (account ID format: ivpnXXXXXXXX) and wish to make use of the feature, contact our customer service to help you make the switch.
</div>

To enable the feature, log in to your [Client Area](/account/login#id) - `Device Management` tab and click on the `Enable device management` button.

![](/images-static/uploads/device-management-1.png)

### How does the device naming assignment work?

Once enabled, the feature makes use of predefined phrases below (first two on IVPN Standard and all seven on IVPN Pro plan) that are assigned to existing and new devices in a specific order:

```
Silent Circuit
Infinite Cipher
Shadow Grid
Galactic Wave
Cosmic Helix
Zenith Core
Onyx Eclipse
```

Following the list order above, the first device that is logged in to the IVPN app will be named “**Silent Circuit**”, the second “**Infinite Cipher**” up until adding the seventh device assigned as “**Onyx Eclipse**”.

Devices that were already logged in to the IVPN app prior to the activation of Device Management will be assigned the names in the order you have authenticated them in the past, e.g. the very first device you have logged in to the IVPN app on will be named “**Silent Circuit**”, the second “**Infinite Cipher**” and so on.

We recommend storing these device identifiers and the device pairs safely, e.g. in open-source password managers with strong encryption, so you can easily identify and remove devices when you don’t have access to them. For extra security, you can [enable 2FA](/knowledgebase/general/do-you-offer-two-factor-authentication/) for both Client Area and IVPN apps authentication.

### Where can I find my device name?

The assigned device name is located in the IVPN app `Settings` - `Account` area (head-with-shoulders icon on the top-left corner of the app's main window on iOS and Android).

<img src="/images-static/uploads/device-management-2.png" hight="50%" width="50%"/><br></br>

It can also be retrieved using the `ivpn account` CLI/terminal command on your desktop systems.

### How can I delete (log out) my devices?

- In the [Client Area](/account/login#id) - `Device Management` tab, locate the required device and click on the `Delete` button. Use the `Log out from all devices` button to log all of your devices out and reset the device counter to zero.

![](/images-static/uploads/device-management-3.png)

- In the IVPN app on your device, navigate to the `Settings` - `Account` area and click on the `Log out` button or use the option to “Log out from all devices”. This option becomes available when you attempt to log in to the app and the device limit has already been reached.

- Log out from all devices by using the `ivpn login -force` CLI/terminal command on your desktop systems.

- Request log out from all devices by reaching out to our [support team](/contactus/).

