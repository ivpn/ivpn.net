---
title: Privacy issues related to MAC addresses
author: Solène Rapenne
url: /privacy-guides/mac-address-privacy/
section: Basic
weight: 10
date: 2024-03-08T00:00:15+00:00
layout: misc
articles: [
  {
    title: "What is a VPN?",
    url: "/privacy-guides/what-is-a-vpn/"
  },
  {
    title: "Will a VPN Protect Me? Defining Your Threat Model",
    url: "/privacy-guides/will-a-vpn-protect-me/"
  },
]
---
In this guide, you will learn what type of tracking is done using MAC addresses, and what steps you can take to protect your privacy against such threats.

# Introduction to MAC addresses

The MAC address is used within local networks, at the Ethernet level, to identify network devices when exchanging data.

The MAC mechanism was developed during Ethernet protocol specification at Xerox in the late 70s. Read more [on Ethernet history](https://akapugs.blog/2020/02/12/676/).

The acronym MAC stands for **M**edium **A**ccess **C**ontrol ([MAC](https://en.wikipedia.org/wiki/MAC_address)), the name "physical address" is also widely used in place of MAC address. It is composed of 6 hexadecimals (from 0 to F) two digits numbers. The numbers are not random as there are some rules for valid MAC addresses. In order to illustrate what a MAC address looks like, here is a valid random one: `9A:E6:14:71:B3:AE`, note that the colons are commonly used between each two hexadecimals digits to improves readability.

All Ethernet, Wi-Fi and even Bluetooth devices have a unique address among the 180 trillions addresses possible due to the 48 bits size of MAC addresses. In comparison, there are only 4 billions (more exactly 2^32 or 4 294 967 296) IPv4 addresses, and only a subset is usable over the Internet.

Network switches are relying on MAC address to figure which port to use when relaying a packet between two devices. Previously, the legacy network hubs were not aware of MAC addresses, and therefore were relaying packets on all its ports.

There is [a giant database](https://regauth.standards.ieee.org/standards-ra-web/pub/view.html) containing the MAC addresses of every individual device sold on the market. However, you may prefer to use a service with a simpler interface, just search for "MAC address database browser" in a search engine. Please mind that this database does not contain any personal information about people buying the devices, it is only a registry of all produced devices, their manufacturer and their identifier.

# MAC address applications

The MAC address exists in the first place to allow network devices to exchange data between each other.

However, as it identifies a machine on a local network, we have seen uses for wider purpose like tracking people in shopping centers, restrict networks to some machines or user identification in captive portals.

## Quota and captive portals

Certain mechanisms rely on a MAC address to identify devices on a network, but such applications have shortcomings. It is easy to change your system MAC to another, and also easy to spoof someone's device MAC.

Let me illustrate MAC spoofing. Let's say you are in a hotel providing a Wi-Fi hotspot, but it has an Internet use quota. It is likely the system is relying on the clients MAC addresses to assign the quota when no credentials are asked, in such cases, you could change your MAC to a random one to reset your quota. Even further, if you are required to pay to connect to the Internet and the system uses MAC addresses as identifiers, it could be easy to spoof the MAC address of someone who paid. This might be straightforward, but also illegal in most jurisdictions and may not work well while the two devices are connected simultaneously.

## Customer tracking

A much more concerning use of MAC address is the tracking of customers in supermarkets / malls. Devices with Wi-Fi enabled, like smartphones, are regularly probing for access points by broadcasting their MAC address. This is holy grail for tracking customers, and was a popular technique during the 2010's.

You can learn more about this practice in [this case study](https://www.martechsadvisor.com/news/ecommerce/euclid-analytics-redesigns-instore-wifi-experience-with-euclid-connect/) and in this [Harvard University assignment](https://d3.harvard.edu/platform-rctom/submission/we-know-you-looked-at-that-ugly-sweater-euclid-analytics-in-store-tracking-and-the-narrowing-of-the-online-offline-gap/).

With a unique MAC per device, it is easy to figure out the following information:

- date and time of visit (entering, leaving)
- duration of each visit
- how often do they visit
- habits of visits (day of the week, favorite hour in the day)

If the center is big enough, it is possible to locate users within the building to track their shopping journey.

Fortunately, smartphone system providers have added mechanisms to mitigate this tracking, more details on this in a section later in this guide.

## Physical tracking

Edward Snowden reported that the [NSA used MAC addresses](https://www.wired.com/2014/08/edward-snowden/) to physically track people. If someone uses the same MAC address to connect to multiple public Wi-Fi within airports, train stations or any other open network that is at reach of a government agency, it becomes easy to know the time and location of a traveling device. This does not help to identify the person using the device though, the MAC address does not contain any personal information.

There is no way to know if this is actively used in the wild, but MAC randomization protects against tracking.

# Does the MAC address leaks on the Internet?

A MAC address is not shared beyond the local network because it is only used locally. If you connect to a website, the remote server will never know anything about MAC addresses from your local network.

As shown in the diagram below, the MAC address is used to carry data over the OSI layer 2 (Ethernet, Wi-Fi), but is dropped at layer 3 (IP packets).

![](/img/Tun-tap-osilayers-diagram.png)

# Does a VPN protect your MAC address?

All commercial VPN providers are only offering an OSI Layer 3 VPN, it relays IP packets so the MAC address is not carried through the VPN.

It is possible to create a VPN relaying the OSI Layer 2 and passing through Ethernet frames instead of IP packets. While this sort of VPN use does not have a specific name, multiple technologies provide this feature like VPLS or Ethernet bridging. They can virtually extend a network to other locations, and all devices on the network will see each other as if they were on the same local network. In practice, it is only useful for a couple of use cases, the most common is gaming using the "local network" mode with friends, but over the Internet. On this VPN, your MAC address is carried over to the VPN remote network.

# IPv6 derived from MAC addresses

In the past, the IPv6 addresses the machines were assigning to themselves (in [SLAAC](https://www.networkacademy.io/ccna/ipv6/stateless-address-autoconfiguration-slaac) mode) were derived from the network interface MAC address. As IPv6 is used to communicate on the layer 3 this meant the MAC embedded in the IPv6 address itself were leaking to all remote servers.

Fortunately, this problem was addressed [by adding extras IPv6 extensions](https://superuser.com/a/243713) to mitigate this issue using [temporary private addresses](https://blog.apnic.net/2020/05/20/getting-ipv6-private-addressing-right/). As of the writing of this article, most operating systems have implemented and enabled such a solution.

# The case of Bluetooth tracking

Each Bluetooth device also has its own unique MAC address, which is a concern when it comes to data collection and analysis.

For example, if you wear Bluetooth headphones and a Bluetooth watch, both connected to your smartphone with Bluetooth, your paired devices MAC will not change ever except if the manufacturer implemented the [complicated mechanism](https://novelbits.io/bluetooth-address-privacy-ble/) of Bluetooth Low Energy (BLE) providing random / public MAC address depending on the situation.  While mobile operating systems implemented the specifications correctly, [this is not the case](https://www.mist.com/documentation/ble-mac-randomization/) for Bluetooth devices.

On top of the MAC randomization issues, Bluetooth devices tend to broadcast about themselves, like their name (user defined or factory) and what kind of devices they are (headphones, headset, watch, wearable, etc.). This creates a good opportunity for companies that snoop Bluetooth data to track you. This technique can be used even if device addresses are randomized.

In parallel, there is a business tied to Bluetooth beacons being polled by applications installed on smartphones. Certain apps integrate a feature pinging for Bluetooth beacons, as some beacon providers pay app developers to perform these actions. Retrieving information from an app is valuable as they can learn and log useful information about you. You can review a [New York Times](https://www.nytimes.com/interactive/2019/06/14/opinion/bluetooth-wireless-tracking-privacy.html) article about this business for more information.

If you do not want to be tracked through your Bluetooth devices, turn them off outside or keep them at home. If you only have a smartphone, do not keep Bluetooth enabled if you do not need it.

# Operating System MAC randomization support

Here is a list of the state of Wi-Fi and Ethernet MAC address randomization for each popular operating system.

## Android (mobile OS)

Android enabled random MAC for scanning since Android 8, but all devices supported changing the MAC address at this time as it was not a hardware requirement for Android devices.

Since Android 9, the MAC is always randomized for scanning.

Starting with Android 10, it became possible to randomize the MAC when connecting per SSID, the random MAC would remain stable for each SSID, only a system factory reset could generate a new value.

In Android 12, a new feature appeared that allows disposable random MAC addresses, but it only applies under specific circumstances as [explained in the documentation](https://source.android.com/docs/core/connect/wifi-mac-randomization-behavior).

## iOS (Apple mobile OS)

Apple implemented MAC randomization for scanning since the iPhone 5. However, [since iOS 14](https://support.apple.com/fr-fr/guide/security/secb9cb3140c/web) they added support for a stable random MAC per network. Each MAC is randomized every twenty-four hours. Keeping the same MAC for a day on a network allows to not break captive portals that may use your MAC for authentication, quota or payment.

## macOS (Apple desktop OS)

So far, macOS does not seem to support MAC address randomization.

## Linux (desktop / mobile OS)

On popular Linux distributions, the MAC address is only randomized when scanning for networks, but not when connecting to an access point. Out of all Linux distributions we have investigated, only Qubes OS and [Tails](https://tails.net/doc/first_steps/welcome_screen/mac_spoofing/index.en.html) enable randomization for scanning and connecting by default.

Linux users do have options to remedy this problem. It is possible to configure NetworkManager (the service managing network) to enable random MAC for Wi-Fi by network. It offers two randomization strategies, either "stable", producing per network a new random MAC that will be reused later, or "random", that will generate a new MAC every time one connects to the network. A fully random MAC address for each connection is not advised for most users as it can exhaust the IP pool of the local DHCP server. This happens because each new MAC can be considered as a new device, if you reconnect too many times before old DHCP leases expire, the DHCP will be out of addresses to distribute.

Among the most popular operating systems, Linux distributions are the only ones to provide MAC randomization for Ethernet network interfaces.

You can learn more about NetworkManager MAC randomization through [this guide](https://blogs.gnome.org/thaller/2016/08/26/mac-address-spoofing-in-networkmanager-1-4-0/) by one of the NetworkManager developers.

## Windows (desktop OS)

By default, Windows enables random MAC for scanning. There [is a setting](https://support.microsoft.com/en-us/windows/how-to-use-random-hardware-addresses-in-windows-ac58de34-35fc-31ff-c650-823fc48eb1bc) to enable a stable random MAC address per Wi-Fi SSID, and also a setting to enable daily randomization.

Finding complete information about this feature is not straightforward, [some Microsoft slides](https://datatracker.ietf.org/meeting/109/materials/slides-109-madinas-mac-address-randomization-in-windows-10-00) explain the MAC randomization mechanism which is not fully detailed in the official documentation.

Windows does not have support for randomizing the MAC of Ethernet interfaces.

# Conclusion

MAC addresses is a necessary component of network protocols, it does not leak through VPNs but could be used to track people through their devices.

Manufacturers have made significant steps to improve the privacy of devices owners with regard to Wi-Fi tracking. Unfortunately, the problem shifted to Bluetooth devices, creating a more challenging problem to resolve, since more manufacturers are involved compared to improving a couple of operating systems subsystems.
