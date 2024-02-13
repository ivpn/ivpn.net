---
title: Introducing device management for better control of logged in devices
url: /blog/device-management-for-better-control/
highlighted: false
draft: false
authors:
  - Viktor Vecsei
categories:
 - Releases
tags:
 - Subscriptions
 - Apps
date: 2024-02-13T05:55:00.000Z
thumbnailImage: /images-static/uploads/rnew_release.png
---
We are introducing IVPN device management, an opt-in (disabled by default) feature that helps you review and log out from devices currently logged in to IVPN apps. 

This step is a direct response to frequent customer requests for better device controls. IVPN plans come with a device limit - 2 and 7 for Standard and Pro respectively. Prior to this update, reaching this limit necessitated logging out from all devices in case unused ones were not identifiable or accessible.

<figure>
    <img width="600px" src="src/static/images-static/uploads/device_management_account_area.png"> 
</figure>

After [activating device management](/account/device-management) in the Account dashboard on ivpn.net:

* A list becomes available with devices currently logged in, each labeled with an assigned name

* IVPN apps start showing these associated device names

* You will have the ability to log out from individual devices or all of them simultaneously

* Disable Device Management option becomes available

<figure>
    <img width="600px" src="src/static/images-static/uploads/device_naming_android.png"> 
</figure>

Device management is disabled by default due to a minor privacy tradeoff consideration. When device management is activated, an extra field for the device name is added to the temporary record table which helps limiting the number of connected devices. However, these device names, allocated by IVPN, are non-unique and recycled from a set list of seven across all accounts. This approach guarantees that device names alone do not link back to your account in case an adversary was able to gain access to this specific data.
  
We recommend reviewing our updated [privacy policy](/privacy/), which outlines how we manage device limits and provides information on device management implementation. You can also consult the [FAQ entry](/knowledgebase/general/device-management-faq/) on Device management for further details.

If you have any questions or feedback about this update, don’t hesitate to [contact us](/contactus/).




