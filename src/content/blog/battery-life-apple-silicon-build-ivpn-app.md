---
title: Battery life improvements with Apple silicon builds
url: /blog/battery-life-apple-silicon-build-ivpn-app/
highlighted: false
draft: false
authors:
  - Alexandr Stelnykovych
  - Viktor Vecsei
categories:
  - Under the Hood	
tags:
  - Apps
date: 2021-11-10T09:35:00.000Z
thumbnailImage: /images-static/uploads/silicon_thumb.png
---
We have tested the battery consumption rate of the IVPN app with constant VPN connectivity using two protocols (WireGuard and OpenVPN) on two different app builds (M1 and Intel). We concluded that using a dedicated Apple silicon app build with WireGuard protocol can offer up to 22% increase in battery life over OpenVPN on Intel build version when bandwidth is not limited. This translates to up to 2,5 hours of extra use time on an M1 Macbook Air. In contrast, a test with artificial speed limits demonstrated only a modest (2%) improvement. Read on for detailed results. 

## Why these tests?

When connected, VPN apps have the potential to be notorious battery hogs due to the constant encryption operations being performed. While apps (including our software) run well on M1 Rosetta without a dedicated build, we have received customer requests for an ARM version, citing expectations around improved battery performance. 
As a result, we planned to validate whether customer assumptions are true. If, and only if tests show that significant gains can be achieved in battery performance we were ready to commit to compiling an M1 version of the IVPN app going forward.  

## Testing process design

Device used: 2020 M1 Macbook Air

Testing battery drain time (100% to 0%) with machine unplugged

Conducting eight test runs with active VPN connection, combination of:
- Protocol a/b: OpenVPN, WireGuard
- Speed limit a/b: Yes (21 Mbps), No 
- Build a/b: Intel, m1 Apple Silicone  
` `

Further notes for testing environment:
- Results are derived from total seconds measured until battery is fully discharged 
- Power adapter unplugged, start at full battery
- No additional applications installed 
- IVPN App in connected state, no other apps running
- IVPN connected to the same server for each test run
- Throttled download speed matching in limited runs
- IVPN app UI is active and visible
- Battery status configuration: Turn off display - Never
- Display True Tone: disabled
- macOS version: 12.0.1 (Monterey)
- IVPN Client v3.3.63

## What are the findings? 

  | Intel | M1
-- | -- | --
  | Battery drain time(hours) | Battery drain time(hours)
OpenVPN(speed limit 21Mbs) | 14,15 | 14,03
WireGuard(speed limit 21Mbs) | 14,29 | 14,48
OpenVPN | 10,61 | 10,96
WireGuard | 12,33 | 13,01

![Image](/images-static/uploads/silicon_tests.png)

Looking at the chart above we can deduce customers connecting through OpenVPN on an Intel-based IVPN app build could potentially achieve a ≈22% or 2,5 hours increase in battery life by switching both app builds and VPN protocols.

We have to note these results are artificial and achieving them could be unrealistic. Speed-limited tests might replicate everyday use with more fidelity, since you use similar amounts of bandwidth for similar tasks even if you switch protocols and builds. Comparing the results of these tests show the lower bound for expected improvements is roughly 2%. 
We are planning to replicate these tests with the recently released M1 Pro and Max in the coming weeks and update this post with the results. 

Following these findings, we released a dedicated M1 ARM build and will continue to support it from now on. The choice between the Intel and M1 versions will be optional for all customers. For the best battery performance, please download the [appropriate build](https://www.ivpn.net/apps-macos/) for your device. If you are currently using the Intel version, you will not be prompted to upgrade to the Apple silicon version, you must download and install it manually.

## Test it yourself

To confirm the results or add your findings for M1 Pro or Max, follow these steps:
1. Download both M1 and Intel IVPN macOS app builds [here](https://www.ivpn.net/apps-macos/).
2. If you don’t have an active IVPN subscription, [email us](https://www.ivpn.net/contactus/) for a demo account.
3. Download the test scripts used [here](https://github.com/ivpn/m1-battery-drain-tests).

If you decide to carry these tests out, please post your results on [Reddit](https://www.reddit.com/r/IVPN/). 
