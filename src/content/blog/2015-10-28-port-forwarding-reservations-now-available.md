---
title: Port forwarding reservations now available
authors: ["Dennis Kügler"]
categories: ["Releases"]
tags: ["Privacy"]
draft: false
date: 2015-10-28T17:26:24+00:00
url: /blog/port-forwarding-reservations-now-available/

---
Today we are excited to release the first of many upgrades to our network, **reservation based** port forwarding. Port forwarding is an advanced feature for customers who need to run servers whilst connected to IVPN (for more info see [what is port forwarding?][1]).

**Please note:** If you do not understand port forwarding then you almost certainly do not require it and we strongly recommend that you leave it disabled as it can introduce security risks.

Previously if you had port forwarding enabled, when you connected to a server you were required to login to the client area on the website to check which port number had been assigned to you. However if you disconnected at any time and reconnected to a new server you would receive a new port number. Our new port forwarding system enables you to login to the client area and reserve a port which will be assigned to you indefinitely, every time you connect to a server you will receive the same port number. No more having to reconfigure your software!

To reserve your port, simply login to the [client area][2] and click on your username and then the **Configure Port Forwarding** link. You can then enable port forwarding (if you haven't already) and retrieve your long term port reservation. Please note that both UDP and TCP traffic will be forwarded on your reserved port.

**Note:** If you do not login to the network for 14 days your reservation may be released and you will be required to login to the client area and reserve another port.

In the next week we will be releasing our highly anticipated new Multi-hop network together with major updates to the Windows and OSX clients. Stay tuned and follow us on twitter at [@ivpnnet][3].

 [1]: /knowledgebase/general/what-is-port-forwarding/
 [2]: /clientarea/
 [3]: https://twitter.com/ivpnnet
