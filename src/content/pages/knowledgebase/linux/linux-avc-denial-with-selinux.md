---
title: Linux - AVC denial with selinux - IVPN Help
h1: Linux - AVC denial with selinux
url: /knowledgebase/linux/linux-avc-denial-with-selinux/
sections:
    - linux
    - troubleshooting
sectionTitle: Linux
layout: help-details
weight: 60
---
# Linux - AVC denial with selinux

If you receive an 'ACV denial' error message in your logs, run the following command to change the security context of the directory containing your OpenVPN certificates:

```
chcon -t cert_t /your/certificates/dir/*
```
