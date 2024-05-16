---
title: What is the IP address of your DNS servers? - IVPN Help
h1: What is the IP address of your DNS servers?
url: /knowledgebase/troubleshooting/what-is-the-ip-address-of-your-dns-servers/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 150
---
# What is the IP address of your DNS servers?

The IVPN DNS servers clients use when connected to our VPN servers are not publicly accessible from the Internet. They are internal and can be used only when connected to an IVPN server.  Three types of internal DNS servers are available on each VPN server:

* Regular DNS with no blocking (OpenVPN + WireGuard + IPSec with IKEv2)
* Normal [AntiTracker](/antitracker/) to block advertising and malware domains (OpenVPN + WireGuard)
* Hardcore Mode AntiTracker to also block Google and Facebook domains (OpenVPN + WireGuard)


### Regular DNS Servers

For WireGuard connections, the regular DNS address is: `172.16.0.1`

For OpenVPN connections, the regular DNS address is: `10.0.254.1`

With an OpenVPN connection there is another regular DNS address available.  To work out the address, look at the IP assigned to you when you connect. The DNS servers are in the format `10.x.y.1`. For example, if the VPN address you receive is `10.16.4.66` then the DNS address will be `10.16.4.1`.


### AntiTracker with Optional Hardcore Mode

The original AntiTracker addresses remain unchanged (same as **OISD Big** below):

Normal   `10.0.254.2` and 
Hardcore `10.0.254.3`

The [AntiTracker Plus](/knowledgebase/general/antitracker-plus-lists-explained/) options follow a similar IP address pattern for normal and hardcore modes:

#### Basic
Normal   `10.0.254.4` and 
Hardcore `10.0.254.5`

#### Comprehensive
Normal   `10.0.254.6` and 
Hardcore `10.0.254.7`

#### Restrictive
Normal   `10.0.254.18` and 
Hardcore `10.0.254.19`

#### EasyList + EasyPrivacy
Normal   `10.0.254.14` and 
Hardcore `10.0.254.15`

#### OISD Big
Normal   `10.0.254.2` and 
Hardcore `10.0.254.3`

#### Developer Dan Ads + Tracking
Normal   `10.0.254.8` and 
Hardcore `10.0.254.9`

#### Steven Black Unified + Ads + Malware
Normal   `10.0.254.20` and 
Hardcore `10.0.254.21`

#### 1Hosts Extra
Normal   `10.0.254.16` and 
Hardcore `10.0.254.17`

#### Hagezi Light
Normal   `10.0.254.22` and 
Hardcore `10.0.254.23`

#### Hagezi Pro
Normal   `10.0.254.10` and 
Hardcore `10.0.254.11`

#### Hagezi Pro++
Normal   `10.0.254.24` and 
Hardcore  `10.0.254.25`

#### Hagezi Ultimate
Normal   `10.0.254.12` and 
Hardcore `10.0.254.13`


### Public DNS Server

We provide a public, validating, non-logging, recursive DNS server: `198.245.51.147`

No IVPN connection -- or account -- required.
