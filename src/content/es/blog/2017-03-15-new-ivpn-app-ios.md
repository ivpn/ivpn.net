---
title: The new IVPN app for iOS
authors: ["Ed Holden"]
categories: ["Releases"]
tags: ["Apps", "Protocols"]
draft: false
date: 2017-03-15T16:29:02+00:00
url: /blog/new-ivpn-app-ios/
comments:
  - author: Question?
    date: 2017-04-13T13:53:54+02:00
    content: |
      Please say how you prevent IPv6 data leak on iOS? How you keep persistent connection and make sure no leak during delay switching between Wi-Fi and Cellular networks?
  - author: Anon
    date: 2017-04-29T11:26:22+02:00
    content: |
      Please answer iVPN?
  - author: Anonymous
    date: 2017-05-01T09:22:53+02:00
    content: |
      Unfortunately iVPN rarely update their blog or respond to comments. Open a support ticket.

---
After hundreds (if not thousands) of requests, we're proud to release the IVPN app for mobile devices running iOS. If you'd like to download it immediately simply navigate to the [iOS setup][1] page. I'd like to take this opportunity to provide interested customers with more information about the security configuration and design goals of the app.

When we first started working on an iOS app we quickly discovered that implementing OpenVPN was not possible due to the app store terms of service being incompatible with the GPL, the license under which OpenVPN is released. Unless of course you are the holder of the copyright in which case you can relicense it under some proprietary license, which of course OpenVPN technologies has done so they can publish the OpenVPN connect app. 

Before the launch of this app we offered customers who didn't want to install the OpenVPN Connect app the possibility to configure L2TP/IPSec on their iOS device. Our configuration (like with all other VPN providers offering L2TP/IPSec) required that you use a public pre-shared key. This pre-shared key made an active MITM (Man in the middle attack) possible where the adversary impersonates our server and is then able to decrypt and eavesdrop on the connection. Even though the risk of this attack occurring is small, its bad security and we made it very clear on our website that L2TP/IPSec shouldn't be used for anything other than bypassing geographic restrictions. For more info see [is using L2TP/IPSec with a public pre-shared key secure?][2]

The new IVPN iOS app uses IPSec with full certificate based authentication, eliminating the previous risks of a MITM attack. One of the advantages of using the native iOS VPN client and IPSec is 'On demand' VPN connections. As we have implemented it in our app, iOS will always establish a VPN connection before sending traffic to a particular domain (or all domains in our case). This ensures that the iOS app never leaks any data whilst you are connected to an IVPN server. Even when waking from sleep, the first packet of data will trigger the 'On Demand' rules to reestablish the VPN connection, queuing the packets until the connection is established. 

One the most common complaints from mobile customers in the past was having to add/configure new servers as they were deployed on our network. The new app will always have the latest list of servers available on our network and will always connect to the least loaded server in a location. In addition when choosing a location to connect to, you can see which locations have the lowest latency from your current location, ensuring the best performance at all times from all locations.

We encourage all customers to install the app and test it out. Customers who don't have an active IVPN account can signup for a free trial and even purchase a subscription using in-app purchase. All customers have access to all server locations from all clients regardless of where they signed up from. And if you have any feedback please send it! <feedback@ivpn.net>.

 [1]: /apps-ios/
 [2]: /knowledgebase/general/is-using-l2tporipsec-with-a-public-pre-shared-key-secure/
