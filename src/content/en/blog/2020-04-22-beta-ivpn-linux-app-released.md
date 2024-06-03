---
title: Beta IVPN Linux app released
# Example: /blog/this-is-a-good-post
url: /blog/beta-ivpn-linux-app-released/
highlighted: true
draft: false
authors:
  - Viktor Vecsei
categories:
  - Releases
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - Apps
  - Open Source
date: 2020-04-22T14:57:51.000Z
# 740px X 740px
thumbnailImage: /images-static/uploads/linux.png
socalUrls:
  redditUrl: https://www.reddit.com/r/IVPN/comments/g62o2e/ivpn_cli_linux_app_is_out_in_open_beta_feedback/
---
**tl;dr**: The [IVPN Linux CLI app][1] is available for testing - all feedback is welcome.

IVPN apps have been available for most major platforms since the [release of our iOS][2] app back in 2017. The obvious missing piece was an app for Linux.

Better support for Linux is big development priority for us this year. As a first milestone, we are releasing a beta command-line app with support for firewall, [WireGuard][3], [AntiTracker][4] and [Multi-hop][5] included.

![Linux Example](/images-static/uploads/LIN.gif)

Minimum requirements:

  * 64-bit OS / Linux kernel 3.10+
  * OpenVPN version v2.3.10+
  * Third-party binary dependencies installed (OpenVPN, if not present by default; WireGuard; Obfsproxy, if required)

During internal testing, we have verified everything works as expected on the latest versions of some popular distributions (Ubuntu, Fedora, Debian, Mint) plus some LTS editions.

We invite you to [download the client][1] and start testing with us. Drop your feedback in the [dedicated Reddit thread][6], add issues [on GitHub][7] or [contact us][8] to share your findings. Please include your distribution version details plus any error messages.

Next project milestone is a GUI app, which we expect to release in the coming months.

 [1]: /apps-linux/
 [2]: /blog/new-ivpn-app-ios/
 [3]: /wireguard/
 [4]: /antitracker/
 [5]: /what-is-a-multihop-vpn
 [6]: https://www.reddit.com/r/IVPN/comments/g62o2e/ivpn_cli_linux_app_is_out_in_open_beta_feedback/
 [7]: https://github.com/ivpn/desktop-app-cli
 [8]: /contactus/
