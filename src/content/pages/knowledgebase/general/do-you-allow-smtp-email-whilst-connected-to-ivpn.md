---
title: Do you allow SMTP (e-mail) whilst connected to IVPN? - IVPN Help
h1: Do you allow SMTP (e-mail) whilst connected to IVPN?
url: /knowledgebase/general/do-you-allow-smtp-email-whilst-connected-to-ivpn/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 310
---
# Do you allow SMTP (e-mail) whilst connected to IVPN?

We do not allow SMTP port 25 traffic to be sent through our servers. As this opens up the possibility to spam millions of people from behind our VPN servers, we have decided to block SMTP port 25 as a way to keep the reputation of our IP addresses in a cleaner state.

To send e-mail while connected to our VPN servers, consider using a secure e-mail connection. When e-mail is sent over a secure connection, there may be a higher level of trust and the e-mail may be accepted by the e-mail service provider. Port 25 is the default outgoing e-mail port, but this offers no security.  Ports available for secure SMTP are 465 and 587, which include SSL or TLS. Check your e-mail provider's support documentation for details about which ports are available for secure outgoing messages.
