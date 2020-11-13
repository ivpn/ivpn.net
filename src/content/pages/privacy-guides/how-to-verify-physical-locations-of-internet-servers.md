---
title: How to verify physical locations of Internet servers
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/how-to-verify-physical-locations-of-internet-servers/
section: Misc
weight: 30
date: 2018-04-18T09:10:09+00:00
layout: guides-details
---
## Introduction

VPN services compete in many ways. On speed, torrent-friendliness, privacy and no-logging, edginess, price, technical elegance, multi-hop routing, customer support, and so on. However, choice of server locations remains a major issue for many users. IVPN has 37 servers in 22 cities in 13 countries. AirVPN has appreciably more, with 216 servers in 35 cities in 19 countries. But HideMyAss (HMA) is mind-bogglingly huge, with over 700 servers in over 280 locations, in over 210 countries. That's basically every country on the planet. And it costs less than either IVPN or AirVPN.

OK, but how do users know whether VPN servers are located where providers claim? People commonly use such sites as [whatismyipaddress.com][1], [ipinfo.io][2], [browserleaks.com][3] or [mycurrentlocation.net][4]. But they just provide information from various geolocation databases, such as [maxmind.com][5]. And if you're connected through a VPN server, you can search [google.com][6] for `my location` to see where Google considers it to be.

Still, how can you verify that? Well, you can ping VPN servers, to get round-trip travel time (rtt). The speed of light in vacuum is 300 km/msec, and about 180 km/msec in fiber optic cable. And about 150 km/msec for electrons in copper wire. See [here][7]. However, rtt doesn't depend just on distance and transmission speed. It [also depends][8] on `the number of hops (routers and switches) between the` probe and target. There are delays from both processing and caching, and those delays are typically substantial, relative to transmission times. For example, the rtt to my LAN router is 0.3 msec, which implies a physical distance of 45 km (not 90 km, because ping is a round trip). That's much greater than the actual distance, which is ~15 m.

Also, connections [don't][8] always take the shortest path, because paths depend on peering agreements between ISPs: `Two computers in the same city, but connected to the internet via different ISPs may route through a city hundreds of miles away.` Because those two ISPs don't peer directly with each other.

Bottom line, given unknown routing and equipment latencies, it's generally not feasible to triangulate using multiple rtt measurements. Actually, [peering][9] isn't unknown. However, projecting actual routing and minimum rtt from Border Gateway Protocol (BGP) information is utterly nontrivial. 

OK, so what _can_ you do? Well, I hadn't thought much about the issue, until seeing [this][10] by Restore Privacy. It turns out that there are services for pinging target servers from numerous probes, such as [ping.pe][11], [asm.ca.com][12] and [maplatency.com][13]. The probe with the smallest minimum rtt is typically closest to the target. Arguably, because confounding factors all increase rtt, and speed can not exceed that of light in a vacuum.

In my experience, you can be especially confident when the smallest minimum rtt is a few msec. When the smallest minimum rtt is greater than that, and another minimum rtt is just a little greater, differences in routing and equipment latencies may account for the difference. So the probe with the smallest minimum rtt may not actually be closest to the server, and no firm conclusions about geolocation can be drawn. However, while geolocation can be ambiguous, one thing is clear. The speed of signal transmission _can not_ exceed the speed of light in a vacuum, and such speed violations indicate discrepancies in probe or server geolocation, or errors in minimum rtt measurements.

I will show some results for AirVPN, HMA and IVPN servers, but only as examples. I collected data in mid-late 2017, and providers may have made changes since then. Generally, I found that AirVPN and IVPN servers are apparently located where providers claim. But many HMA servers are apparently located in a few data centers. I also found a few probes that are apparently mislocated. And a few interesting artifacts of peering and routing.

## Methods

It's crucial to identify VPN servers by IPv4 address, and not hostname. Because each hostname may point to multiple servers with different IPv4, and you may get confusing results. Also, providers may weak primary name servers to specify the least-loaded server for each hostname. So anyway, just test each IP address explicitly.

Collect minimum rtt aka ping data from such services as [ping.pe][14], [asm.ca.com][12] and [maplatency.com][13]. In collecting ping data, I used Firefox with the iMacros plug-in forping.pe and asm.ca.com. I paid for maplatency.com access, and used their command-line tools, because that provides far better probe coverage, and more information about probes (including latitude and longitude). However, this was months ago, and subsequent changes in Firefox, iMacros and the ping websites may have complicated things. I see that asm.ca.com had added a CAPTCHA, but perhaps one can purchase access. I also see that ping.pe is often overloaded. Anyway, I'll not get into automation methods. It's not too tedious to check a few servers using ping.pe and asm.ca.com manually.

Initially, I calculated probe-server distances using various sites that use Google Maps data. But that quickly became very tedious, because I had to get each city-city distance individually. And so I switched to calculating great-circle distances between servers and probes, from latitude and longitude, using the [spherical law of cosines][15]. With paid access, maplatency.com provides latitude and longitude for probes. For VPN server and other probes, I got latitude and longitude from [ipinfo.io][2]. If the VPN provider lists locations for its servers, use those initially. If it doesn't, get locations from [whatismyipaddress.com][1] or whatever. Now you have minimum rtt (msec) and distance (km) for each combination of server and probe.

For analyzing data, I primarily used MySQL with MySQL Workbench, and then LibreOffice Calc for final analysis and charting. For humongous spreadsheets, I used Microsoft Excel. For massaging text files, I used mainly Linux gedit, grep and sed. For massaging humongous text files, I used UltraEdit in Windows.

Some asm.ca.com probes are apparently mislocated. It's pretty clear that the probe `United Kingdom - Edinburgh (gbedi01)` is in London, UK. And that the probe `France - Lille (frlle02)` is in Paris, FR. So I've generally adjusted results accordingly. There are also some less clear mislocations. The probe `Ukraine - Kharkov (uahrk02)` is perhaps in Kiev, UA. And the probe `Panama - Panama City (papty02)` is perhaps somewhere in Florida, US. Also, maplatency.com doesn't report latitude and longitude for a few probes, and values for others are clearly wrong.

## Analysis

It's instructive to look at minimum rtt vs server-probe distance data for all VPN servers and all probes. Note that data for AirVPN and IVPN generally fall above a line corresponding to signal transmission at about half lightspeed. But there's data for HMA at ~0 msec for distances under 12000 km. That is, the HMA data implies substantial signal transmission that's implausibly fast (greater than 300 km/msec, the speed of light in a vacuum).

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/All-IVPN-All-Probes-rtt-under-500-msec-light.png"
        srcset="/images-static/uploads/All-IVPN-All-Probes-rtt-under-500-msec-light.png 1x, /images-static/uploads/All-IVPN-All-Probes-rtt-under-500-msec-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/All-IVPN-All-Probes-rtt-under-500-msec-dark.png"
        srcset="/images-static/uploads/All-IVPN-All-Probes-rtt-under-500-msec-dark.png 1x, /images-static/uploads/All-IVPN-All-Probes-rtt-under-500-msec-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/All-AirVPN-All-Probes-rtt-under-500-msec-light.png"
        srcset="/images-static/uploads/All-AirVPN-All-Probes-rtt-under-500-msec-light.png 1x, /images-static/uploads/All-AirVPN-All-Probes-rtt-under-500-msec-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/All-AirVPN-All-Probes-rtt-under-500-msec-dark.png"
        srcset="/images-static/uploads/All-AirVPN-All-Probes-rtt-under-500-msec-dark.png 1x, /images-static/uploads/All-AirVPN-All-Probes-rtt-under-500-msec-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/All-HMA-All-Probes-rtt-under-500-msec-light.png"
        srcset="/images-static/uploads/All-HMA-All-Probes-rtt-under-500-msec-light.png 1x, /images-static/uploads/All-HMA-All-Probes-rtt-under-500-msec-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/All-HMA-All-Probes-rtt-under-500-msec-dark.png"
        srcset="/images-static/uploads/All-HMA-All-Probes-rtt-under-500-msec-dark.png 1x, /images-static/uploads/All-HMA-All-Probes-rtt-under-500-msec-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

I calculated the maximum ping transmission speed (which is twice distance, divided by minimum rtt) observed for each server IPv4 address. Then I aggregated speed in suitable bins, and charted as histograms. For a given server-probe distance, server-probe combinations with the smallest rtt have the greatest ping transmission speed.

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-IVPN-PIA-speed-histograms-light.png"
        srcset="/images-static/uploads/AirVPN-IVPN-PIA-speed-histograms-light.png 1x, /images-static/uploads/AirVPN-IVPN-PIA-speed-histograms-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-IVPN-PIA-speed-histograms-dark.png"
        srcset="/images-static/uploads/AirVPN-IVPN-PIA-speed-histograms-dark.png 1x, /images-static/uploads/AirVPN-IVPN-PIA-speed-histograms-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

I found just three IVPN server IPv4, and five AirVPN server IPv4, with maximum ping transmission speeds apparently faster than light.

{{< raw-html >}}
<table class="table-container" cellspacing="3" style="max-width: 100%;">
  <tr>
    <td>
      <b>VPN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
    </td>
    <td>
      <b>Server</b>
    </td>
    <td>
      <b>IPv4&nbsp;Address</b>
    </td>
    <td>
      <b>Server&nbsp;Location</b>
    </td>
    <td>
      <b>Ping&nbsp;Service</b>
    </td>
    <td>
      <b>Probe</b>
    </td>
    <td>
      <b>Distance</b>
    </td>
    <td>
      <b>Min&nbsp;rtt</b>
    </td>
    <td>
      <b>Max&nbsp;Speed</b>
    </td>
  </tr>
  <tr>
    <td>
      <b></b>
    </td>
    <td>
      <b></b>
    </td>
    <td>
      <b></b>
    </td>
    <td>
      <b></b>
    </td>
    <td>
      <b></b>
    </td>
    <td>
      <b></b>
    </td>
    <td>
      <b>(km)</b>
    </td>
    <td>
      <b>(msec)</b>
    </td>
    <td>
      <b>(km/msec)</b>
    </td>
  </tr>
  <tr>
    <td>
      IVPN
    </td>
    <td>
      gb3.gw.ivpn.net
    </td>
    <td>
      88.202.186.42
    </td>
    <td>
      London, UK
    </td>
    <td>
      asm.ca.com
    </td>
    <td>
      United_Kingdom_Edinburgh_gbedi01
    </td>
    <td>
      534
    </td>
    <td>
      1.9
    </td>
    <td>
      563
    </td>
  </tr>
  <tr>
    <td>
      IVPN
    </td>
    <td>
      gb1.gw.ivpn.net
    </td>
    <td>
      109.123.101.190
    </td>
    <td>
      London, UK
    </td>
    <td>
      asm.ca.com
    </td>
    <td>
      United_Kingdom_Edinburgh_gbedi01
    </td>
    <td>
      534
    </td>
    <td>
      2.1
    </td>
    <td>
      520
    </td>
  </tr>
  <tr>
    <td>
      IVPN
    </td>
    <td>
      gb2.gw.ivpn.net
    </td>
    <td>
      46.28.49.140
    </td>
    <td>
      London, UK
    </td>
    <td>
      asm.ca.com
    </td>
    <td>
      United_Kingdom_Edinburgh_gbedi01
    </td>
    <td>
      534
    </td>
    <td>
      2.1
    </td>
    <td>
      512
    </td>
  </tr>
  <tr>
    <td>
      AirVPN
    </td>
    <td>
      eridanus.airvpn.org
    </td>
    <td>
      185.183.106.2
    </td>
    <td>
      Barcelona, ES
    </td>
    <td>
      asm.ca.com
    </td>
    <td>
      Spain_Madrid_esmad02
    </td>
    <td>
      505
    </td>
    <td>
      0.4
    </td>
    <td>
      2525
    </td>
  </tr>
  <tr>
    <td>
      AirVPN
    </td>
    <td>
      alcor.airvpn.org
    </td>
    <td>
      91.231.84.39
    </td>
    <td>
      Kiev, UA
    </td>
    <td>
      asm.ca.com
    </td>
    <td>
      Ukraine_Kharkov_uahrk02
    </td>
    <td>
      409
    </td>
    <td>
      0.8
    </td>
    <td>
      1023
    </td>
  </tr>
  <tr>
    <td>
      AirVPN
    </td>
    <td>
      asterion.airvpn.org
    </td>
    <td>
      217.151.98.167
    </td>
    <td>
      London, UK
    </td>
    <td>
      asm.ca.com
    </td>
    <td>
      United_Kingdom_Edinburgh_gbedi01
    </td>
    <td>
      534
    </td>
    <td>
      1.9
    </td>
    <td>
      562
    </td>
  </tr>
  <tr>
    <td>
      AirVPN
    </td>
    <td>
      alshain.airvpn.org
    </td>
    <td>
      217.151.98.162
    </td>
    <td>
      London, UK
    </td>
    <td>
      asm.ca.com
    </td>
    <td>
      United_Kingdom_Edinburgh_gbedi01
    </td>
    <td>
      534
    </td>
    <td>
      2.0
    </td>
    <td>
      534
    </td>
  </tr>
  <tr>
    <td>
      AirVPN
    </td>
    <td>
      algedi.airvpn.org
    </td>
    <td>
      80.84.49.4
    </td>
    <td>
      London, UK
    </td>
    <td>
      asm.ca.com
    </td>
    <td>
      United_Kingdom_Edinburgh_gbedi01
    </td>
    <td>
      534
    </td>
    <td>
      3.1
    </td>
    <td>
      345
    </td>
  </tr>
</table>
{{< / raw-html >}}

However, I found 381 HMA server IPv4 with maximum ping transmission speeds apparently faster than light in a vacuum. Although there are too many to list, it's interesting that many involve probes in Miami, FL, US; Seattle, WA, US; and Prague, CZ. That is, many of these 381 HMA servers, supposedly located all over the world, have minimum observed rtt for probes in a few cities. And impossibly huge maximum ping transmission speeds. This would be expected if those HMA servers were actually located in data centers in those cities. But more about that, later.

All three IVPN server IPv4 with implausibly fast ping transmission speeds, and three of the five for AirVPN, involve the asm.ca.com probe `gbedi01`, reportedly located in Edinburgh, UK. However, that probe seems actually to be located in London, UK. 

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-IVPN-PIA-gbedi01-light.png"
        srcset="/images-static/uploads/AirVPN-IVPN-PIA-gbedi01-light.png 1x, /images-static/uploads/AirVPN-IVPN-PIA-gbedi01-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-IVPN-PIA-gbedi01-dark.png"
        srcset="/images-static/uploads/AirVPN-IVPN-PIA-gbedi01-dark.png 1x, /images-static/uploads/AirVPN-IVPN-PIA-gbedi01-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

Regarding the AirVPN server `eridanus.airvpn.org`, either of two adjustments resolves the speed violation: 1) assuming that the asm.ca.com probe `esmad02` is closer to Barcelona, ES than to Madrid, ES; or 2) assuming that the server is closer to Madrid, ES than to Barcelona, ES. However, locating the asm.ca.com probe `esmad02` in Barcelona, ES would create discrepancies for other servers reportedly in Madrid, ES: AirVPN server `mekbuda.airvpn.org`, IVPN server `es1.gw.ivpn.net`, and five IPVanish servers. 

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-light.png"
        srcset="/images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-light.png 1x, /images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-dark.png"
        srcset="/images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-dark.png 1x, /images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Server-light.png"
        srcset="/images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Server-light.png 1x, /images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Server-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Server-dark.png"
        srcset="/images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Server-dark.png 1x, /images-static/uploads/AirVPN-eridanus.airvpn.org-All-Probes-under-4000-km-Tweak-Server-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

Regarding the AirVPN server `alcor.airvpn.org`, either of two adjustments similarly resolves the speed violation: 1) assuming that the asm.ca.com probe `uahrk02` is in Kharkivska, Kiev, UA instead of Kharkov, UA; or 2) assuming that the server is closer to Kharkov, UA than to Kiev, UA. However, there are no other nearby VPN servers in my data.

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-light.png"
        srcset="/images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-light.png 1x, /images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-dark.png"
        srcset="/images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-dark.png 1x, /images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Probe-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Server-light.png"
        srcset="/images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Server-light.png 1x, /images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Server-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Server-dark.png"
        srcset="/images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Server-dark.png 1x, /images-static/uploads/AirVPN-alcor.airvpn.org-All-Probes-under-4000-km-Tweak-Server-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

There are far too many HMA server IPv4 to discuss individually, so I'll do four that are representative: `fun-tv.prcdn.net`, `ppg-as.prcdn.net`, `bue-ar.prcdn.net` and `cys-wy-us.prcdn.net`.

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/HMA-fun-tv.prcdn_.net-5.62.58.220-All-Probes-Tweak-Server-light.png"
        srcset="/images-static/uploads/HMA-fun-tv.prcdn_.net-5.62.58.220-All-Probes-Tweak-Server-light.png 1x, /images-static/uploads/HMA-fun-tv.prcdn_.net-5.62.58.220-All-Probes-Tweak-Server-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/HMA-fun-tv.prcdn_.net-5.62.58.220-All-Probes-Tweak-Server-dark.png"
        srcset="/images-static/uploads/HMA-fun-tv.prcdn_.net-5.62.58.220-All-Probes-Tweak-Server-dark.png 1x, /images-static/uploads/HMA-fun-tv.prcdn_.net-5.62.58.220-All-Probes-Tweak-Server-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/HMA-ppg-as.prcdn_.net-5.62.58.4-All-Probes-Tweak-Server-light.png"
        srcset="/images-static/uploads/HMA-ppg-as.prcdn_.net-5.62.58.4-All-Probes-Tweak-Server-light.png 1x, /images-static/uploads/HMA-ppg-as.prcdn_.net-5.62.58.4-All-Probes-Tweak-Server-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/HMA-ppg-as.prcdn_.net-5.62.58.4-All-Probes-Tweak-Server-dark.png"
        srcset="/images-static/uploads/HMA-ppg-as.prcdn_.net-5.62.58.4-All-Probes-Tweak-Server-dark.png 1x, /images-static/uploads/HMA-ppg-as.prcdn_.net-5.62.58.4-All-Probes-Tweak-Server-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/HMA-bue-ar.prcdn_.net-5.62.58.16-All-Probes-Tweak-Server-light.png"
        srcset="/images-static/uploads/HMA-bue-ar.prcdn_.net-5.62.58.16-All-Probes-Tweak-Server-light.png 1x, /images-static/uploads/HMA-bue-ar.prcdn_.net-5.62.58.16-All-Probes-Tweak-Server-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/HMA-bue-ar.prcdn_.net-5.62.58.16-All-Probes-Tweak-Server-dark.png"
        srcset="/images-static/uploads/HMA-bue-ar.prcdn_.net-5.62.58.16-All-Probes-Tweak-Server-dark.png 1x, /images-static/uploads/HMA-bue-ar.prcdn_.net-5.62.58.16-All-Probes-Tweak-Server-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/HMA-cys-wy-us.prcdn_.net-5.62.59.72-All-Probes-Tweak-Server-light.png"
        srcset="/images-static/uploads/HMA-cys-wy-us.prcdn_.net-5.62.59.72-All-Probes-Tweak-Server-light.png 1x, /images-static/uploads/HMA-cys-wy-us.prcdn_.net-5.62.59.72-All-Probes-Tweak-Server-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/HMA-cys-wy-us.prcdn_.net-5.62.59.72-All-Probes-Tweak-Server-dark.png"
        srcset="/images-static/uploads/HMA-cys-wy-us.prcdn_.net-5.62.59.72-All-Probes-Tweak-Server-dark.png 1x, /images-static/uploads/HMA-cys-wy-us.prcdn_.net-5.62.59.72-All-Probes-Tweak-Server-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

In all four cases, the rtt vs distance data have a roughly `V` shape. Minimum rtt tends to decrease with increasing distance, intercepts (or nearly so) the distance axis, and then tends to increase as distance increases further. Where the intercept distance is greater than about 10,000 km, the linear least-squares fit actually has a negative slope. In any case, the intercept probe is arguably closest to the server. Making that assumption, one can recalculate server-probe distances. In each case, doing so leads to a more-or-less linear distance-rtt relationship, with a least-squares fit having a better coefficient of determination (R&sup2;).

For all four HMA examples, the lowest rtt probe is in Miami, FL, US. And generally for other HMA server IPv4, lowest rtt probes are commonly in Miami, FL, US; Seattle, WA, US; or Prague, CZ. So perhaps many HMA server IPv4 are actually located in a relatively small number of data centers, rather they're claimed to be. To test for that, one can look at a VPN's server IPv4 pinged from probes in a particular city, such as Vancouver, BC, CA. 

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/All-IVPN-Vancouver-Probes-light.png"
        srcset="/images-static/uploads/All-IVPN-Vancouver-Probes-light.png 1x, /images-static/uploads/All-IVPN-Vancouver-Probes-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/All-IVPN-Vancouver-Probes-dark.png"
        srcset="/images-static/uploads/All-IVPN-Vancouver-Probes-dark.png 1x, /images-static/uploads/All-IVPN-Vancouver-Probes-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/All-AirVPN-Vancouver-Probes-light.png"
        srcset="/images-static/uploads/All-AirVPN-Vancouver-Probes-light.png 1x, /images-static/uploads/All-AirVPN-Vancouver-Probes-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/All-AirVPN-Vancouver-Probes-dark.png"
        srcset="/images-static/uploads/All-AirVPN-Vancouver-Probes-dark.png 1x, /images-static/uploads/All-AirVPN-Vancouver-Probes-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/All-HMA-Vancouver-Probes-light.png"
        srcset="/images-static/uploads/All-HMA-Vancouver-Probes-light.png 1x, /images-static/uploads/All-HMA-Vancouver-Probes-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/All-HMA-Vancouver-Probes-dark.png"
        srcset="/images-static/uploads/All-HMA-Vancouver-Probes-dark.png 1x, /images-static/uploads/All-HMA-Vancouver-Probes-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

HMA server IPv4 clearly fall in several bands. Each band has similar minimum rtt, within about 1-2 msec, but distances that span about 8,000-10,000 km. But there's little of that in either the IVPN or AirVPN data. Doing the same analysis for probes in many cities, similar bands are evident, at various minimum rtt levels. But what's interesting is that bands from multiple probes include largely the same set of server IPv4.

I've identified four such largely invariant bands. Based on the probes where each band has minimum rtt ~0 msec, those arguably represent data centers in London, UK; Miami, FL, US; Prague, CZ; and Seattle, WA, US. Some servers apparently have IPv4 in multiple data centers. If I assume that each server IPv4 is located in its apparent data center, rather than where it's asserted to be, I get the expected relationship between server-probe distance and minimum rtt. With no lightspeed violations.

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/HMA-London-Miami-Prague-Seattle-DCs-All-Probes-light.png"
        srcset="/images-static/uploads/HMA-London-Miami-Prague-Seattle-DCs-All-Probes-light.png 1x, /images-static/uploads/HMA-London-Miami-Prague-Seattle-DCs-All-Probes-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/HMA-London-Miami-Prague-Seattle-DCs-All-Probes-dark.png"
        srcset="/images-static/uploads/HMA-London-Miami-Prague-Seattle-DCs-All-Probes-dark.png 1x, /images-static/uploads/HMA-London-Miami-Prague-Seattle-DCs-All-Probes-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

There are six IVPN and AirVPN server IPv4 where the nearest probe doesn't have the smallest minimum rtt, although there are no lightspeed violations. 

{{< raw-html >}}
<table cellspacing="3">
  <tr>
    <td>
      <b>VPN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
    </td>
    <td>
      <b>Server</b>
    </td>
    <td>
      <b>IPv4&nbsp;Address</b>
    </td>
    <td>
      <b>Server&nbsp;Location&nbsp;</b>
    </td>
    <td>
      <b>Probe&nbsp;Location&nbsp;</b>
    </td>
    <td>
      <b>Distance&nbsp;</b>
    </td>
    <td>
      <b>Min&nbsp;rtt&nbsp;</b>
    </td>
    <td>
      <b>Max&nbsp;Speed</b>
    </td>
  </tr>
  <tr>
    <td>
      <b></b>
    </td>
    <td>
      <b></b>
    </td>
    <td>
      <b></b>
    </td>
    <td>
      <b></b>
    </td>
    <td>
      <b></b>
    </td>
    <td>
      <b>(km)</b>
    </td>
    <td>
      <b>(msec)</b>
    </td>
    <td>
      <b>(km/msec)</b>
    </td>
  </tr>
  <tr>
    <td>
      IVPN
    </td>
    <td>
      is1.gw.ivpn.net
    </td>
    <td>
      82.221.107.178
    </td>
    <td>
      Reykjavik, IS
    </td>
    <td>
      Amsterdam, NL
    </td>
    <td>
      2011
    </td>
    <td>
      36.0
    </td>
    <td>
      112
    </td>
  </tr>
  <tr>
    <td>
      IVPN
    </td>
    <td>
      ch2.gw.ivpn.net
    </td>
    <td>
      136.0.0.194
    </td>
    <td>
      Zurich, CH
    </td>
    <td>
      Geneva, CH
    </td>
    <td>
      224
    </td>
    <td>
      4.4
    </td>
    <td>
      101
    </td>
  </tr>
  <tr>
    <td>
      IVPN
    </td>
    <td>
      ch3.gw.ivpn.net
    </td>
    <td>
      141.255.166.194
    </td>
    <td>
      Zurich, CH
    </td>
    <td>
      Milan, IT
    </td>
    <td>
      218
    </td>
    <td>
      7.5
    </td>
    <td>
      58
    </td>
  </tr>
  <tr>
    <td>
      IVPN
    </td>
    <td>
      ch1.gw.ivpn.net
    </td>
    <td>
      141.255.164.66
    </td>
    <td>
      Zurich, CH
    </td>
    <td>
      Milan, IT
    </td>
    <td>
      218
    </td>
    <td>
      7.6
    </td>
    <td>
      58
    </td>
  </tr>
  <tr>
    <td>
      AirVPN
    </td>
    <td>
      virginis.airvpn.org
    </td>
    <td>
      46.19.137.114
    </td>
    <td>
      Bern, CH
    </td>
    <td>
      Milan, Italy
    </td>
    <td>
      213
    </td>
    <td>
      1.8
    </td>
    <td>
      237
    </td>
  </tr>
  <tr>
    <td>
      AirVPN
    </td>
    <td>
      nunki.airvpn.org
    </td>
    <td>
      78.129.153.40
    </td>
    <td>
      Manchester, UK
    </td>
    <td>
      London, UK
    </td>
    <td>
      262
    </td>
    <td>
      2.4
    </td>
    <td>
      218
    </td>
  </tr>
</table>
{{< / raw-html >}}

Most notably, the lowest-rtt probe for IVPN server `is1.gw.ivpn.net` is in Amsterdam, NL. The data is somewhat `V` shaped, with the lowest minimum rtt at ~2,000 km. And indeed, the distance between Reykjavik, IS and Amsterdam, NL is 2013 km. However, given my long-term working relationship with IVPN, one of their network engineers verified that this server is indeed in Reykjavik, IS. It's also unlikely that the maplatency.com probe `IS midlar ehf` is actually in Amsterdam, because that's an AS in [Iceland][16]. It's arguably most likely that the probe (in [Iceland AS60300][16]) and `is1.gw.ivpn.net` (in [Iceland AS44515][17]) just weren't peering directly, but instead through an AS near Amsterdam. 

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/IVPN-is1.gw_.ivpn_.net-All-Probes-under-4000-km-light.png"
        srcset="/images-static/uploads/IVPN-is1.gw_.ivpn_.net-All-Probes-under-4000-km-light.png 1x, /images-static/uploads/IVPN-is1.gw_.ivpn_.net-All-Probes-under-4000-km-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/IVPN-is1.gw_.ivpn_.net-All-Probes-under-4000-km-dark.png"
        srcset="/images-static/uploads/IVPN-is1.gw_.ivpn_.net-All-Probes-under-4000-km-dark.png 1x, /images-static/uploads/IVPN-is1.gw_.ivpn_.net-All-Probes-under-4000-km-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

Less dramatically, the lowest-rtt probes for four server IPv4 in Switzerland are at ~200 km. I've verified with IVPN that its Swiss servers are actually located in Zurich, CH. However, an engineer did find that minimum rtt for `ch1.gw.ivpn.net`-`ch2.gw.ivpn.net` and `ch3.gw.ivpn.net`-`ch2.gw.ivpn.net` are greater than that for `ch1.gw.ivpn.net`-`ch3.gw.ivpn.net`. Again, it appears that there are peering issues.

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/IVPN-ch1.gw_.ivpn_.net-All-Probes-under-4000-km-light.png"
        srcset="/images-static/uploads/IVPN-ch1.gw_.ivpn_.net-All-Probes-under-4000-km-light.png 1x, /images-static/uploads/IVPN-ch1.gw_.ivpn_.net-All-Probes-under-4000-km-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/IVPN-ch1.gw_.ivpn_.net-All-Probes-under-4000-km-dark.png"
        srcset="/images-static/uploads/IVPN-ch1.gw_.ivpn_.net-All-Probes-under-4000-km-dark.png 1x, /images-static/uploads/IVPN-ch1.gw_.ivpn_.net-All-Probes-under-4000-km-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/IVPN-ch2.gw_.ivpn_.net-All-Probes-under-4000-km-light.png"
        srcset="/images-static/uploads/IVPN-ch2.gw_.ivpn_.net-All-Probes-under-4000-km-light.png 1x, /images-static/uploads/IVPN-ch2.gw_.ivpn_.net-All-Probes-under-4000-km-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/IVPN-ch2.gw_.ivpn_.net-All-Probes-under-4000-km-dark.png"
        srcset="/images-static/uploads/IVPN-ch2.gw_.ivpn_.net-All-Probes-under-4000-km-dark.png 1x, /images-static/uploads/IVPN-ch2.gw_.ivpn_.net-All-Probes-under-4000-km-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/IVPN-ch3.gw_.ivpn_.net-All-Probes-under-4000-km-light.png"
        srcset="/images-static/uploads/IVPN-ch3.gw_.ivpn_.net-All-Probes-under-4000-km-light.png 1x, /images-static/uploads/IVPN-ch3.gw_.ivpn_.net-All-Probes-under-4000-km-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/IVPN-ch3.gw_.ivpn_.net-All-Probes-under-4000-km-dark.png"
        srcset="/images-static/uploads/IVPN-ch3.gw_.ivpn_.net-All-Probes-under-4000-km-dark.png 1x, /images-static/uploads/IVPN-ch3.gw_.ivpn_.net-All-Probes-under-4000-km-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-virginis.airvpn.org-All-Probes-under-4000-km-light.png"
        srcset="/images-static/uploads/AirVPN-virginis.airvpn.org-All-Probes-under-4000-km-light.png 1x, /images-static/uploads/AirVPN-virginis.airvpn.org-All-Probes-under-4000-km-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-virginis.airvpn.org-All-Probes-under-4000-km-dark.png"
        srcset="/images-static/uploads/AirVPN-virginis.airvpn.org-All-Probes-under-4000-km-dark.png 1x, /images-static/uploads/AirVPN-virginis.airvpn.org-All-Probes-under-4000-km-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

Also problematic are the AirVPN server `nunki.airvpn.org`, with the lowest-rtt probe at ~250 km, and the IVPN server `ut1.gw.ivpn.net`, with the lowest-rtt probe at ~600 km. I've verified with IVPN that its server is actually located in Salt Lake City. It's apparently peering again. That is, the server and probe ISPs don't peer directly, but only through a distant ISP. So the probe that's closest physically doesn't have the smallest rtt.

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-nunki.airvpn.org-All-Probes-under-4000-km-light.png"
        srcset="/images-static/uploads/AirVPN-nunki.airvpn.org-All-Probes-under-4000-km-light.png 1x, /images-static/uploads/AirVPN-nunki.airvpn.org-All-Probes-under-4000-km-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-nunki.airvpn.org-All-Probes-under-4000-km-dark.png"
        srcset="/images-static/uploads/AirVPN-nunki.airvpn.org-All-Probes-under-4000-km-dark.png 1x, /images-static/uploads/AirVPN-nunki.airvpn.org-All-Probes-under-4000-km-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/IVPN-ut1.gw_.ivpn_.net-All-Probes-under-4000-km-light.png"
        srcset="/images-static/uploads/IVPN-ut1.gw_.ivpn_.net-All-Probes-under-4000-km-light.png 1x, /images-static/uploads/IVPN-ut1.gw_.ivpn_.net-All-Probes-under-4000-km-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/IVPN-ut1.gw_.ivpn_.net-All-Probes-under-4000-km-dark.png"
        srcset="/images-static/uploads/IVPN-ut1.gw_.ivpn_.net-All-Probes-under-4000-km-dark.png 1x, /images-static/uploads/IVPN-ut1.gw_.ivpn_.net-All-Probes-under-4000-km-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

Peering issues can also impact multiple probes. One of the three AirVPN servers in London, UK (`algedi.airvpn.org`) shows a normal relationship between minimum rtt and distance. But for the other two (`alshain.airvpn.org` and `asterion.airvpn.org`) there are at least 13 probes with minimum rtt that's anomalously 80-100 msec too large (in Belgium, Bulgaria, Germany, Greece, Hungary, Italy, Netherlands, Sweden, Switzerland and Ukraine). For those probes, routing to `alshain.airvpn.org` and `asterion.airvpn.org` is apparently far less direct than routing to `algedi.airvpn.org`.

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-London-algedi-All-Probes-under-4000-km-light.png"
        srcset="/images-static/uploads/AirVPN-London-algedi-All-Probes-under-4000-km-light.png 1x, /images-static/uploads/AirVPN-London-algedi-All-Probes-under-4000-km-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-London-algedi-All-Probes-under-4000-km-dark.png"
        srcset="/images-static/uploads/AirVPN-London-algedi-All-Probes-under-4000-km-dark.png 1x, /images-static/uploads/AirVPN-London-algedi-All-Probes-under-4000-km-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-London-alshan-asterion-All-Probes-under-4000-km-light.png"
        srcset="/images-static/uploads/AirVPN-London-alshan-asterion-All-Probes-under-4000-km-light.png 1x, /images-static/uploads/AirVPN-London-alshan-asterion-All-Probes-under-4000-km-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-London-alshan-asterion-All-Probes-under-4000-km-dark.png"
        srcset="/images-static/uploads/AirVPN-London-alshan-asterion-All-Probes-under-4000-km-dark.png 1x, /images-static/uploads/AirVPN-London-alshan-asterion-All-Probes-under-4000-km-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

More dramatically, for AirVPN servers in Hong Kong, minimum rtt for all probes in mainland China are anomalously more than 300 msec too large. Minimum rtt for a probe in Bankok, TH is ~250 msec too large. Perhaps the probes in mainland China peer to Hong Kong through Bankok.

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-Hong-Kong-All-Probes-in-China-light.png"
        srcset="/images-static/uploads/AirVPN-Hong-Kong-All-Probes-in-China-light.png 1x, /images-static/uploads/AirVPN-Hong-Kong-All-Probes-in-China-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-Hong-Kong-All-Probes-in-China-dark.png"
        srcset="/images-static/uploads/AirVPN-Hong-Kong-All-Probes-in-China-dark.png 1x, /images-static/uploads/AirVPN-Hong-Kong-All-Probes-in-China-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

{{< raw-html >}}
<figure>
    <img class="features__image--light" src="/images-static/uploads/AirVPN-Hong-Kong-All-Probes-outside-China-light.png"
        srcset="/images-static/uploads/AirVPN-Hong-Kong-All-Probes-outside-China-light.png 1x, /images-static/uploads/AirVPN-Hong-Kong-All-Probes-outside-China-light@2x.png 2x"
        alt="Image" />
    <img class="features__image--dark" src="/images-static/uploads/AirVPN-Hong-Kong-All-Probes-outside-China-dark.png"
        srcset="/images-static/uploads/AirVPN-Hong-Kong-All-Probes-outside-China-dark.png 1x, /images-static/uploads/AirVPN-Hong-Kong-All-Probes-outside-China-dark@2x.png 2x"
        alt="Image" />
</figure>
{{< / raw-html >}}

## Discussion

As you can see, based on this data, the probe with the smallest rtt is typically physically closest to the server. If you have data from enough probes, and find a minimum rtt under ~3 msec, you can often pin down server location within 100 km or less. And whenever the apparent speed of signal transmission exceeds the speed of light in a vacuum, there _must_ be a discrepancy in geolocation. Or an error in minimum rtt measurements or data manipulation, of course.

However, there are pitfalls. Before concluding that a server is mislocated, you need to check whether it's actually a probe that's mislocated. As I found for `asm.ca.com` probe gbedi01. Although it's reportedly in Edinburgh, it's actually in London. And that mislocation made AirVPN's and IVPN's London servers seem to be in Edinburgh. But it's usually possible to identify mislocated probes. If you see apparent mislocation for servers from multiple providers, involving a particular probe, it's safe to conclude that it's the probe that's mislocated.

There are other ambiguities. When the smallest minimum rtt is greater than a few msec, and another minimum rtt is just a little greater than that, differences in routing and equipment latencies may account for the difference. So the probe with the smallest minimum rtt may not actually be closest to the server, and no firm conclusions about geolocation can be drawn. As I found for IVPN server `is1.gw.ivpn.net` where a probe in Iceland had higher minimum rtt than probes in northern Europe. Apparently, the Icelandic ISPs for server and probe peer through Amsterdam.

Finally, when many of a provider's server IPv4 are mislocated, it's likely that they're actually in a relatively small number of data centers. There are two approaches for identifying data centers. You can focus on server IPv4 with maximum ping transmission speeds apparently faster than light in a vacuum. For each, the probe with the smallest rtt is likely closest to the data center. Doing that, I found that `fun-tv.prcdn.net`, `ppg-as.prcdn.net`, `bue-ar.prcdn.net` and `cys-wy-us.prcdn.net` are likely in Miami. 

Alternatively, you can consider data for all server IPv4 pinged from particular probes. For a given probe, you'll likely see a band of server IPv4 with minimum rtt near zero. So those server IPv4 are likely in a data center near that probe. If you look at data for enough probes, you can likely identify most of the data centers. And you can check results by looking at rtt vs distance for all probes, using apparent data center locations instead of purported server IPv4 locations.

 [1]: https://whatismyipaddress.com/
 [2]: https://ipinfo.io/
 [3]: https://browserleaks.com/ip
 [4]: https://mycurrentlocation.net/
 [5]: https://www.maxmind.com
 [6]: https://www.google.com/
 [7]: https://physics.stackexchange.com/questions/80043/how-fast-does-light-travel-through-a-fibre-optic-cable
 [8]: https://electronics.stackexchange.com/questions/68619/triangulate-with-ping
 [9]: https://bgp.he.net/
 [10]: https://restoreprivacy.com/vpn-server-locations/
 [11]: http://ping.pe/
 [12]: https://asm.ca.com/en/ping.php
 [13]: https://maplatency.com/
 [14]: https://ping.pe/
 [15]: https://www.movable-type.co.uk/scripts/latlong.html
 [16]: https://bgp.he.net/AS60300
 [17]: https://bgp.he.net/AS44515