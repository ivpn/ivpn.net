---
title: 'Why and how a VPN affects your connection speed'
author: Solène Rapenne
url: /privacy-guides/why-and-how-a-vpn-affects-your-connection-speed/
section: Basic
weight: 25
date: 2024-01-29T10:21:35+00:00
layout: guides-details
---
# Introduction

You may have heard or noticed that using [a VPN](https://www.ivpn.net/privacy-guides/what-is-a-vpn/) slows down your connection speed. This is expected behaviour, and inherent to how computer networks work.

Network speed is measured with multiple parameters: **bandwidth**, **throughput** and **latency**. In this guide, you will learn about these three notions and how a VPN affects each.

# Network speed explained

Before diving into the explanations about speed performance impact of a VPN, it is important to understand what lies under network performance, more commonly called "Internet speed".

## Latency

Latency is the time required for a network packet to make a round trip from a host to another.

It characterizes how a user feels the responsiveness when doing something over the network: a low latency, less than 50 milliseconds, is critical for audio and video calls and most online video games. An increased latency can be acceptable up to 150–300 milliseconds when browsing the Internet or reading emails, because these activities are not highly interactive.

Why is there any latency in the first place? Computers are fast and get faster every year after all. Most of the latency occurring is due to the distance [a network packet](https://www.techtarget.com/searchnetworking/definition/packet) has to travel.

In fact, our fastest communication transport medium is the optical fiber. It can only carry data at two third of light speed, as the light beam inside the fiber is bouncing with a specific angle instead of going in a straight line. Light travels at approximately 300 000 kilometers per second, this is fast, but not enough to avoid latency.

With these numbers in mind and some math, we can conclude networks can transport data at best at 200 000 kilometers / 124274 miles per second. Using a better time unit for latency, like milliseconds, the previous speed can be converted to 200 kilometers or 124 miles per millisecond.

It is important to remember that for latency, the travel time must be accounted twice: a first time to reach the remote host and a second time for the response. The best real world achievable latency at the moment of writing is approximately 1 ms for every 100 km / 62 miles of distance between two hosts, assuming there are no other equipment adding latency (like routers, commuters, amplifier), and that the optical fiber between the hosts does not make a detour.

![](/img/latency-explained.png)

Here is the average network latency of different technologies, measured between a home router and its ISP gateway.

These numbers can help to weight the latency introduced by distance compared to the latency of the network access itself:

- Server in a datacenter using Ethernet: 0.1 ms
- Optical fiber: 1-5 ms
- 5G: 2-20 ms
- Coaxial: 3-25 ms
- DSL: 25-70 ms
- 4G: 30-70 ms
- Low-orbit satellite: 40-70 ms
- 3G: 100-500 ms
- Dial-up: 150 ms
- 2G: 300-1000 ms
- Geostationary satellite: 700 ms

Note that these values represents the time to reach the first hop within the ISP. The latency when connecting to a server over the Internet requires adding the latency between the ISP and the remote server to values above.

In practice, the latency is slightly increased by each equipment on the network route between two peers because network packets must be handled and sent from one router to the other.

## Bandwidth

Another important speed metric for a network is its **bandwidth**, which is the maximum speed a network can sustain for a given period of time. Bandwidth is usually expressed in megabits per second (Mbps), but as optical fiber and 5G are getting more widespread, it is getting common to express it in gigabits per second (Gbps).

Network bandwidth is not always symmetric, most of the time there is a larger bandwidth for receiving data than for sending data. As most users download more data than they upload, it made sense to allocate bandwidth this way.

The bandwidth of a single connection with a remote host will always be limited and reduced down to the intermediary with the smallest bandwidth in the path.

The bandwidth is what your ISP advertises as "speed", but in practice, it is the maximum theoretical speed achievable. It is hard to measure the bandwidth as you are likely to end up measuring throughput.

## Throughput

Finally, the last metric measuring and quantifying a network speed is the **throughput**. It is the actual amount of data going through the network for a given period of time. The throughput is usually measured in kilobytes per second (kB/s) or megabytes per second (MB/s).

As a reminder, megabits are noted Mb while megabytes are noted MB. As 1 byte = 8 bits, there is a difference of a factor of 8 between the two.

When watching a download progress bar, the associated speed displayed is the instant throughput.

There are online services to measure your connection throughput. If you do so, make sure the service is able to deliver more data than your bandwidth, otherwise you would measure the throughput of the service itself. It would be like doing arm wrestling with someone weaker: you would end up measuring their force and not yours.

# Network speed and peering

There is a part of the *speed* that does not depend on your connection itself. When connecting to a remote server, the network traffic will be passed from a network operator to another, multiple times.

Connections between network operators are called [peering](https://en.wikipedia.org/wiki/Peering).

It is not uncommon to have peering issues on the Internet. They are usually short and remain unnoticed by most end users in that they only impact the servers behind a given network operator. Whereas a network issue at your ISP would impact all your network traffic and will be noticed very quickly.

Exceptionally, there are known cases like the French ISP **Free** who was known for its poor peering ([source in French](https://www.ariase.com/box/actualite/lenteur-bridage-youtube-free-ufc-que-choisir)) with the network operator who serves YouTube since they could not find a trade agreement for years.  This ISP was also affected for almost two years by another major peering issue that cut it from most of IPv6 traffic ([source in French](https://www.mail-archive.com/frnog@frnog.org/msg59066.html)).

# The impact of a VPN on Internet speed

As you now are acquainted with the multiple facets of network speed, let's discuss how a VPN affects your Internet speed.

## Latency

### Single hop VPN

When using a VPN with a single hop, the most common setup, latency is calculated by doing the sum of the latency to reach the VPN server and the latency between the VPN server and the destination.

![](/img/latency-vpn-single-hop.png)

In the figure above, illustrating a timing example with a single hop VPN, the latency with the website is measured at 20 ms from the client. However, it increases to 60 ms when using the VPN because the latency is the sum of the latency with the VPN and the latency between the VPN and the website.

### Multi-hop VPN

![](/img/latency-multi-hop.png)

In the figure above, illustrating a timing example with a 2 hops VPN, the latency with the website is 20 ms from the client. The latency increases to 150 ms when using the VPN. A multi-hop VPN will always have a higher latency than a single hop tunnel. Keep in mind that a multi-hop VPN will a lot higher latency when the two hops are on different continents as it involves a higher distance.

### Greater distance = Greater latency

**When using a VPN, a large part of the latency is due to the distance.**

While the latency between you and a close remote server can be low, using a VPN located in another country will drastically increase the latency, due to the distance.

The latency magnitude of order should not change when using a VPN, as long as you avoid having your network traffic doing a round-trip around the planet for each data packet.

For instance, for a user located in New York connecting to their email provider server in Switzerland, choosing a VPN exit node in France would not add much latency since it's almost on the path between the user and the remote server. If the user chooses a VPN exit node in Asia, the latency will be a lot higher as each network packet would have to travel from New York to Asia, Asia to Switzerland, and finally travel back the other way around.

Another example, the user is still in New York, but connects to a server in the same city. In this case the latency without a VPN would be very low. However, as soon as they choose a VPN exit node outside the country, the latency will be much higher.

### Bandwidth and VPN overhead

Once tunneled through a VPN, your connection bandwidth becomes limited to the VPN bandwidth if the VPN exit node bandwidth is smaller than yours.

In addition, a VPN adds a data overhead in that the actual data going through the encrypted tunnel is carried over [clearnet](https://www.urbandictionary.com/define.php?term=clearnet) network packets. When using a VPN, the actual [data payload](https://networkengineering.stackexchange.com/a/35021) is reduced by overhead of the VPN protocol.

What happens here is similar as sending a package to someone by post, but that package is sealed within another package: the real payload of the inner package is smaller than the payload of the outer package.

When chaining multiple VPNs, the available network payload is reduced proportionally to the number of VPN used.

The network overhead is specific to the protocol: OpenVPN adds an overhead of 41 bytes per packet, whereas [WireGuard overhead](https://en.wikipedia.org/wiki/WireGuard#MTU_overhead) is 32 bytes per packet.

When using OpenVPN or WireGuard over [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol), there is an extra 28 bytes for the UDP headers over the clearnet. But when using OpenVPN over [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol), 40 bytes are necessary. WireGuard is not available over TCP.

When an obfuscation protocol is used to circumvent censorship, like [obsfproxy](https://2019.www.torproject.org/docs/pluggable-transports) or [V2Ray](https://www.v2ray.com/en/), the overhead generated is important since the network packets are modified to prevent [Deep Packet Inspection](https://www.fortinet.com/resources/cyberglossary/dpi-deep-packet-inspection) to detect a VPN traffic. For instance, V2Ray can be configured to make the VPN traffic **appear** as a plain text HTTP traffic, or as an encrypted [WebRTC video call](https://webrtc.org/), which is the common protocol used by all conferencing services.

### MTU

It is not possible to talk about VPN performance without mentioning [MTU (Maximum Transmission Unit)](https://www.cloudflare.com/fr-fr/learning/network-layer/what-is-mtu/), since it is often related to VPN speed issues.

The MTU represents the maximum data size a network packet can carry, it's usually 1500 bytes for [IPv4](https://en.wikipedia.org/wiki/Internet_Protocol_version_4).

When doing an action over the network, a packet is sent to a remote server. In addition to the data transmitted there are metadata such as "source address", "destination address", "date and time" and "port". Metadata use 20 bytes for IP packets, 20 extra bytes for TCP packets or 8 extra bytes for UDP packets.

When a network packet is carried over TCP/IP, the useful data contained in a packet is 1500-20-20 = 1460 bytes. In the context of TCP over IP, the payload is named [MSS (Maximum Segment Size)](https://en.wikipedia.org/wiki/Maximum_segment_size), it represents the actual size of useful data that can be carried over a single packet.

VPN performance is impacted when the VPN network packets do not fit in the clearnet MTU, this produces [IP fragmentation](https://en.wikipedia.org/wiki/IP_fragmentation). As the payload (the VPN packet) is too large to fit in the network packet, that packet gets split in two smaller parts. In the end, there are twice the number of network packets for almost no payload increase. This produces an important overhead, which usually reduce the bandwidth by two digits percent.

In a correct setup, the VPN MTU fits in the payload of the network layer above it.

## Throughput

Lastly, the most representative speed metric over a VPN is the throughput when loading remote content.

As explained earlier, the throughput is already be limited to the smallest **bandwidth** in the path between you and the remote host.

In addition, the VPN server's bandwidth should be large enough to sustain the traffic of all users. If a VPN provider has too many users per server, those servers' throughput will be affected negatively which translates into a slow throughput for each user.

The chosen VPN protocol also affects the throughput. OpenVPN is often measured as a dozen percent slower than WireGuard, and thus provides a lower speed. While it is difficult to find objective and reliable performance test of both protocols, here are two tests that appear to be neutral and honest: [WireGuard - review & benchmark](https://r4ven.fr/en/blog/wireguard-benchmark-presentation-tuto/#d---benchmark--openvpn-vs-wireguard) and [Is WireGuard faster than OpenVPN?](https://vladtalks.tech/vpn/is-wireguard-faster-than-openvpn).

# Can a VPN make my connection faster?

Some VPN providers claim that their VPN can improve customers latency and speed. As explained above, a VPN only adds overhead and latency, so their claims are likely to be false in most cases.

However, there are some special cases where a VPN could indeed improve speed and/or latency:

- In some enterprise networks or large public Wi-Fi, it is common to define a [quality of service](https://en.wikipedia.org/wiki/Quality_of_service) policy limiting the bandwidth of each user in order to offer a fair share for everyone. In some countries, [ISPs may practice bandwidth throttling](https://en.wikipedia.org/wiki/Bandwidth_throttling#Comcast_Corp._v._FCC) as well. **In such situations, if the VPN traffic is not throttled**, one can say the VPN improves connection speed.

- In case of a peering issue in the path between the user and a remote server. By using a VPN, the network traffic is likely to use a different network path without the peering issue.

If you are not concerned or impacted by these cases, a VPN will not improve your connection speed.

# Conclusion

You learned about **latency**, **bandwidth** and **throughput**. A VPN negatively affects all of them to some degree.

The higher your bandwidth is, the higher the chance it will be limited by a VPN. In fact, many people got access to gigabit (1 Gbps) internet access [over the last years](https://gigabitmonitor.com/), while the network bandwidth available in datacenters did not increase proportionally. The servers used by VPN operators are often bandwidth limited by their network provider, and 10 Gbps networks accesses are still not widespread in hosting companies.

When it comes to latency, since it's related to the travelled distance of network packets when using a VPN, you may want an exit node closer or farther from your location. Deciding which exit node to use comes down to a balance between speed penalty and privacy:

- You can choose an exit node close to you, this will reduce the latency overhead.
- You can choose an exit node close to your destination. In practice, this is hard to achieve, unless you know where a server is located. This will also negatively affect the latency to other destinations.
- You can choose an exit node far away in another country or use a multi-hop setup. This will increase the latency, but it's more likely to improve your privacy by [avoiding NetFlow surveillance](https://www.ivpn.net/privacy-guides/isp-netflow-surveillance-and-vpn/), as the ISP of the exit node has less chance to be acquainted with your ISP or your country's government.
