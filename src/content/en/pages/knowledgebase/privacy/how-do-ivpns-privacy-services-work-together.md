---
title: How do IVPN's privacy services work together? - IVPN Help
h1: How do IVPN's privacy services work together?
url: /knowledgebase/privacy/how-do-ivpns-privacy-services-work-together/
sections:
    - privacy
sectionTitle: Privacy
layout: help-details
weight: 10
---
# How do IVPN's privacy services work together?
In this article you can find details about account unlinkability, compatibility between the VPN / Portmaster / modDNS, and platform availability.

1. ### You claim accounts are not linked across services > how is that possible?
    Our developers have created a privacy-preserving, cross-application authorization system called Unlinked Access.  Authorization is proven cryptographically only by what you are entitled to access, not by who you are.
    
    A general overview of the Unlinked Access system is available [here](/unlinked-access).
    
    An article with more technical details is available [here](/blog/unlinked-access-explained.md).

1. ### What's the difference between IVPN's built-in AntiTracker and modDNS > do I need both?
    The AntiTracker list selected in the IVPN App governs DNS access for the entire system.  The AntiTracker's block lists cannot be customized to block additional domains or allow exceptions.  No logging is available by design.
    
    modDNS uses profiles to govern DNS blocking, and it is possible to use multiple profiles on one system, or one profile across multiple systems.  Granular control is available with modDNS when it is added to web browsers and at the system level.  Use a different modDNS profile for the operating system, and each web browser, and it becomes easier to micro-manage access to and monitoring of online resources.
    
    modDNS includes the same block lists as the AntiTracker and more, but also offers expanded usability by allowing users to combine active lists and customize behavior by adding custom domains to allow and block.
    
    modDNS includes the option to log queries (disabled by default), which is useful to investigate what an operating system, or online application, like a video game, chat client, or web browser, is doing.  Log retention can be set in the profile's Settings area, and logs can be cleared at any time.
    
    Your threat model and privacy requirements will likely govern which blocking option is best. For a quick setup and deployment on a new device, the AntiTracker is a good choice. For devices with custom requirements, a modDNS profile might be better suited.

1. ### Can I use modDNS alongside the VPN? Can I use Portmaster alongside the VPN? How?
    Yes, and yes.
    
    Recent Portmaster and IVPN App releases have incorporated higher levels of compatibility with respect to DNS handling, and traffic routing.
    
    Set modDNS as the Custom DNS option in the IVPN App (see instructions on modDNS setup page), or as the Secure DNS option in Portmaster, then select one application to manage DNS for the system.

1. ### Do modDNS and Mailx work independently from the VPN, or do I need to be connected?
    The services are independent, and no VPN connection is required.  Mix and match services on your devices as required.  Using all services on the same system is possible.

1. ### Can I subscribe to modDNS or Mailx only, without an IVPN subscription?
    Not at this time, though independent subscriptions might be available in the future.

1. ### What is Safing? What is the relationship between IVPN and Safing (Portmaster's developer)?
    IVPN [acquired](/blog/ivpn-acquires-safing-portmaster-spn-network/) Safing ICS Technologies GmbH in 2024.  Nicholas Pestell, IVPN's founder, owns 100% of both IVPN LTD and Safing ICS Technologies GmbH.
    
    IVPN's team handles all aspects of developing and supporting Portmaster.

1. ### What does Portmaster Pro add that Free version does not?
    Portmaster Pro offers detailed bandwidth tracking and history, beyond the 10-minute window offered in the free version. Access to the Safing Privacy Network (SPN) is also available.
    
    The SPN is an onion-like network that uses nested encryption where the goal is to use a different connection for each online request, and route traffic to the SPN node closest to the server hosting the online resource.  This keeps traffic encrypted for as long as possible before it is placed on the Internet.
    
    It increases privacy because each connection can use a different path along the SPN to reach the Internet, and a website could see multiple IP addresses for each visit with no way to recognize that these IP addresses belong to requests from one user. More details are available on the Safing Portmaster [website](https://safing.io/spn/). 

1. ### Does the SPN (Safing Privacy Network) replace or complement the VPN?
    Both services have specific use-cases, and can complement each other for different threat models. A VPN connection offers access to one or two VPN servers (i.e. Multi-hop), and tends to offer better performance. The SPN is designed for maximum privacy; the default path offers three hops, with the option to increase this to five.

1. ### Why is Portmaster only available on Windows and Linux? What does a Pro subscriber get if they can't or won't use it?
    Windows and Linux are the first supported platforms for Portmaster. Additional platform support is under consideration, with no confirmed timeline. Users subscribed to the Pro Suite who do not use Portmaster on a supported platform still benefit from all other included services and a 10-device limit for the VPN service.  Contact support to discuss plan options if Portmaster does not apply to your use case.

