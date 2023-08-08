---
title: Better tracker blocking controls with AntiTracker Plus
url: /blog/block-ads-and-beat-data-surveillance-with-ivpns-antitracker/
highlighted: true
draft: false
authors:
  - Viktor Vecsei
categories:
  - Releases
tags:
  - Apps
  - Privacy
date: 2023-08-07T07:25:00.000Z
thumbnailImage: /images-static/uploads/tracker-blocker.png

---
IVPN AntiTracker is an optional feature of the VPN service that improves privacy protection by blocking requests from unwanted trackers and ads. Before today, AntiTracker operated with one blocklist option - OISD Big.

With AntiTracker Plus we introduce ten different blocklist options to choose from: 

* three combined lists with three different levels of blocking effectiveness
* seven popular lists to select individually

These options give you more control over the trade-off between more effective blocking and better usability. 

For list combinations, you can choose from Basic, Comprehensive and Restrictive options, with each tier containing more entries that are blocked. The Restrictive option might cause websites and services to break, and is only recommended for the most privacy-conscious customers.

We build and offer blocklists using the following sources:

* [1Hosts][1]
* [AdGuard DNS Filter][2]
* [Developer Dan / Lightswitch05][3]
* [EasyList][4]
* [HaGeZi][5]
* [OISD][6]
* [Steven Black hosts][7]

Please consult our [AntiTracker Plus FAQ entry][8]) to learn more about list combinations and individual lists.

### Getting started with Plus lists

Access the AntiTracker settings in the IVPN app. Here you can select one of the new predefined, or individual lists to use under the "Block List” option.

* On iOS, you need to reconnect to the VPN service to activate the new block list
* On Android, block list selection is only available when not connected to the VPN service
* When using Desktop apps, you can change lists any time

<figure>
    <img src="/images-static/uploads/at-plus.png"> 
</figure>

Note: 

* For existing app installs, OISD Big is unchanged as default selection
* For new setups, the Basic combination is the default selection

We recommend reviewing and testing different options to find the most fitting for your needs.

Hardcore mode, an additional AntiTracker setting that blocks all domains of Google and Facebook, is available in combination with each list option. 

IVPN Staff


*For AntiTracker Plus, we utilise various open-source blocklists, each owned and maintained by dedicated creators. We adhere to the provisions of their respective licenses. To learn more about these licenses, please visit the individual project pages of the resources, linked above.*

 [1]: https://o0.pages.dev/
 [2]: https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt
 [3]: https://github.com/lightswitch05/hosts
 [4]: https://easylist.to/
 [5]: https://github.com/hagezi/dns-blocklists
 [6]: https://oisd.nl/downloads
 [7]: https://github.com/StevenBlack/hosts
 [8]: /knowledgebase/general/antitracker-plus-lists-explained/
