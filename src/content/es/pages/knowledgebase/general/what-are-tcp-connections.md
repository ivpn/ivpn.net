---
title: What are TCP connections? - IVPN Help
h1: What are TCP connections?
url: /knowledgebase/general/what-are-tcp-connections/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 80
---
# What are TCP connections?

The IVPN client uses the UDP protocol by default as it is the fastest. If you are unable to connect using UDP you may wish to connect using TCP. We offer the ability to use TCP for cases when the underlying Internet connection is not stable or you are positioned behind a very restrictive firewall. Both protocols are equally secure.

| # Normal (UDP) mode | # TCP mode |
|---|---|
| Faster | Slower (usually around 5-10%) |
| Can be slower with a very unreliable Internet connection | Very stable even with an unreliable connection |
| Works through most firewalls | Should work through even more restrictive firewalls |
| Maximum security | Maximum security |
