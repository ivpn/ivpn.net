---
title: IVPN Pricing - Select Your Plan
description: Three tiers. No upselling. Pick based on your threat model and network requirements.
url: /en/services/
aliases: ['/services/']
sections:
  - type: heading_logos_two_column
    title: Privacy Stack by IVPN
    content: >-
      Four services from the IVPN team: VPN, email aliasing, DNS filtering, app firewall.


      Built to resist mass surveillance by addressing tracking at the network, email identity and app layers.
    logos:
      - image: /images/ivpn.png
        alt: IVPN Logo
      - image: /images/mailx_white.png
        alt: Mailx Logo
      - image: /images/mod_white.png
        alt: modDNS Logo
      - image: /images/pm_white.svg
        alt: Portmaster
        text: Portmaster
  - type: service_card
    section_title: Services Overview
    name: IVPN
    logo: /images/ivpn.png
    plans:
      - Standard
      - Plus
      - Pro Suite
    content: >-
      IVPN is an audited VPN service in operation since 2009. IVPN encrypts traffic between your device and VPN servers, preventing your ISP, public Wi-Fi operators, and network observers from monitoring your activity.


      A VPN can't make you anonymous, but it meaningfully reduces how much you're tracked at the network level. Our service was built for people who value verifiable privacy and security over marketing fluff: no activity logs, no email required to create an account, open‑source website and apps, VPN gateways run on bare-metal servers.
  - type: overlapping_images
    images:
      - src: /images/product1.png
        alt: IVPN CLI terminal interface
      - src: /images/product2.png
        alt: IVPN desktop app interface with map
  - type: features_list
    title: IVPN features
    features:
      - Open-source apps for iOS, Android, macOS, Windows, Linux plus config generator for custom setups
      - Bare metal servers in 58 locations in 41 countries
      - Choice of WireGuard, OpenVPN, and IPSec (iOS) with automatic key rotation and perfect forward secrecy
      - Built-in firewall/killswitch and DNS leak protection
      - Multi-hop routing through servers in separate jurisdictions for stronger privacy
      - AntiTracker to block ads and tracking domains (single predefined list)
    links:
      - text: IVPN on GitHub
        url: https://github.com/ivpn/
      - text: Help and Knowledgebase
        url: https://www.ivpn.net/knowledgebase/general/
      - text: IVPN Servers
        url: https://www.ivpn.net/status/
      - text: Privacy Policy
        url: https://www.ivpn.net/privacy/
  - type: service_card
    name: Mailx
    logo: /images/mailx_white.png
    plans:
      - Plus
      - Pro Suite
    content: >-
      [Mailx](https://mailx.net) is an [open-source](https://github.com/ivpn/mailx) email aliasing and forwarding tool that helps hide your primary email address from the services you use.


      Your email address is a universal identifier used to track your activity. Companies correlate your email across breaches, marketing databases, and service signups to build a profile. Mailx mitigates this issue by generating unique email addresses for each signup, forwarding mail to your real address while preventing services from tracking you across accounts.
  - type: single_image
    src: /images/mailx-dashboard.png
    alt: Mailx dashboard showing email aliases
  - type: features_list
    title: Mailx features
    features:
      - Create and manage email aliases, choose from multiple domains and alias types
      - Pick one or multiple recipients for forwarded emails
      - Instantly create new aliases on the fly with Wildcard aliases
      - Protect email content with PGP encryption
      - Review forwarding issues and email forwarding statistics
    links:
      - text: Mailx on GitHub
        url: https://github.com/ivpn/mailx
      - text: Learn more about Mailx
        url: https://mailx.net
      - text: Mailx FAQ
        url: https://mailx.net/faq
      - text: Privacy Policy
        url: https://mailx.net/privacy
  - type: service_card
    name: modDNS
    logo: /images/mod_white.png
    plans:
      - Plus
      - Pro Suite
    content: >-
      [modDNS](https://moddns.net) is an audited, [open-source](https://github.com/ivpn/moddns) DNS service that blocks ads, trackers, and malicious domains at the DNS level.


      Your DNS queries are a significant vector for surveillance. ISPs use them to monitor your browsing, and websites use them to send your data to third-party ad and tracking networks. modDNS mitigates this by encrypting your DNS traffic and actively filtering requests. While using your VPN provider's DNS resolver and tracker-blocker tool can address this issue, modDNS offers more visibility and granular control over what is blocked.
  - type: single_image
    src: /images/moddns-dashboard.png
    alt: modDNS blocklists dashboard
  - type: features_list
    title: modDNS features
    features:
      - Configure system-wide on any operating system, in your preferred VPN app or directly within browsers
      - Add and combine open-source blocklists containing privacy-violating or malicious domains and IPs
      - Fine-tune filtering with custom rules to allow or deny specific domains or IPs
      - Enable optional query logging (off by default) with device level info and a configurable retention period
      - Use modern DNS protocols including DNS over HTTPS, DNS over TLS or DNS over QUIC
    links:
      - text: modDNS on GitHub
        url: https://github.com/ivpn/moddns
      - text: Learn more about modDNS
        url: https://moddns.net
      - text: modDNS FAQ
        url: https://moddns.net/standalone-faq
      - text: Privacy Policy
        url: https://moddns.net/privacy
  - type: service_card
    name: Portmaster
    logo: /images/pm_white.svg
    platform_note: "(Available on Linux and Windows)"
    plans:
      - Pro Suite
    content: >-
      Portmaster is an open-source application firewall that gives you a clear view of all your network traffic. It shows which apps are connecting to the internet and lets you block connections you don't trust.


      Portmaster operates at the application layer, inspecting every connection to identify the exact software process responsible for it. This approach provides deeper context than most firewalls, enabling you to define precise filtering policies for each app. Portmaster Pro offers optional access to the Safing Privacy Network (SPN), a VPN alternative that enhances privacy by routing your traffic through a multi-hop onion-routing network.
  - type: single_image
    src: /images/portmaster-dashboard.png
    alt: Portmaster application firewall interface
  - type: features_list
    title: Portmaster features
    features:
      - Monitor, allow or block internet access and set rules for specific apps, websites, IPs or countries
      - View connections in real time by app with domain, IP, country, port, and protocol
      - Block ads, trackers and malware hosts system-wide
      - Enable SPN, a multi-hop onion-routing network with a built-in kill switch
    links:
      - text: Source code on GitHub
        url: https://github.com/safing
      - text: Visit Safing.io
        url: https://safing.io
      - text: Safing Community Wiki
        url: https://wiki.safing.io/en/Portmaster/App/Introduction
      - text: Privacy Policy
        url: https://safing.io/privacy/
  - type: pricing_table
    title: Product Plans
    subtitle: Our services are available as part of an IVPN subscription.
    header:
      services: Services
      plans:
        - IVPN Standard
        - IVPN Plus
        - IVPN Pro Suite
    rows:
      - service: IVPN
        values:
          - 5 devices
          - 5 devices
          - 10 devices
      - service: Mailx
        values:
          - X
          - Included
          - Included
      - service: modDNS
        values:
          - X
          - Included
          - Included
      - service: Portmaster Pro
        values:
          - X
          - X
          - Included
    price_row:
      label: Price / year
      values:
        - $60
        - $80
        - $100
    note: Weekly, monthly, yearly plans available.
  - type: content_with_image
    title: Unlinked Access
    image: /images/stack-diagram-dark.jpg
    image_light: /images/stack-diagram-white.png
    alt: Stack Diagram
    paragraphs:
      - Under the Plus and Pro plan, MailX, modDNS, and Portmaster authorise access without receiving or storing your IVPN account ID.
      - When you activate a service, IVPN sends it a cryptographic token derived from your account. Each service uses a hash of that token to confirm your subscription is active. None of them hold a direct link back to your IVPN account.
    link:
      text: Read about Unlinked Access
      url: /unlinked-access
  - type: text_cta
    title: Resist online surveillance
    content: Get started by selecting a plan based on which services you need.
    cta:
      text: CHOOSE YOUR PLAN
      url: pricing
---
   