---
title: DD-WRT - TLS errors - incoming plaintext read error etc. - IVPN Help
h1: DD-WRT - TLS errors - incoming plaintext read error etc.
url: /knowledgebase/routers/dd-wrt---tls-errors---incoming-plaintext-read-error-etc/
sections:
    - routers
    - troubleshooting
sectionTitle: Routers
layout: help-details
weight: 20
---
# DD-WRT - TLS errors - incoming plaintext read error etc.

This error usually means that you have configured the incorrect TLS cipher. Add the block below to the contents of the 'additional config' field on the OpenVPN client settings page:

```
cipher AES-256-CBC
tls-cipher TLS-DHE-RSA-WITH-AES-256-CBC-SHA
auth SHA1
```
