---
title: 'Linux - WireGuard - "RTNETLINK answers: Operation not supported" - IVPN Help'
h1: 'Linux - WireGuard - "RTNETLINK answers: Operation not supported"'
url: /knowledgebase/linux/linux---wireguard---rtnetlink-answers-operation-not-supported/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 20
---
# Linux - WireGuard - "RTNETLINK answers: Operation not supported"

If you are trying to establish a WireGuard connection with a **wg-quick** command and receive the following error..:

```
$ ip link add dev wg0 type wireguard
RNETLINK answers: Operation not supported
Unable to access interface: Protocol not supported
```

..most likely the **wireguard** kernel module is not loaded in your system. To fix this, open the terminal and run the following command:

```
$ sudo modprobe wireguard
```

In case the issue is still there, reboot your machine.

A chance exists that the **Secure Boot** feature is blocking the unsigned WireGuard kernel module.  In this case, you might consider either disabling the **Secure Boot** feature or signing the WireGuard module to raise the trust level.
