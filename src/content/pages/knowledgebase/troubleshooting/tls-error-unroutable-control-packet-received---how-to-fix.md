---
title: '"TLS Error: Unroutable control packet received" - How to fix - IVPN Help'
h1: '"TLS Error: Unroutable control packet received" - How to fix'
url: /knowledgebase/troubleshooting/tls-error-unroutable-control-packet-received---how-to-fix/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 90
---
# "TLS Error: Unroutable control packet received" - How to fix

The OpenVPN protocol requires the client and server to have synchronized time. If the time on your local PC is incorrect you may see the error **TLS Error: Unroutable control packet received from** in your logs.

### Windows

1. Go to `Start` > `Settings` > `Time & language` > `Date & time`.
2. Toggle `Set time automatically` to `On`.

### macOS

1. Open the `System Preferences`.
2. Click the Date & Time icon and ensure that `Set date and time automatically` is selected.

### Linux

You need to install and configure an NTP client. Refer to the documentation for your distribution for further instructions.

### DD-WRT

Please refer to the section **Correct Time** on this page [http://www.dd-wrt.com/wiki/index.php/OpenVPN](http://www.dd-wrt.com/wiki/index.php/OpenVPN)

To set the time manually, connect via telnet or ssh and run the following command at the prompt:

```
date YYYYMMDDhhmm
```

If you set the Date and Time manually, you will have to do that every time your router is rebooted.

Instead, it is recommended to enable and connect your device to the NTP server to allow system Date and Time automatically sync with the current time. For help, see https://wiki.dd-wrt.com/wiki/index.php/Network_Time_Protocol

### pfSense

pfSense will attempt to keep the router device’s time synchronized with the ntp.org Network Time Protocol (NTP) server pool automatically. Check `Status` > `NTP` for details. If time is out of sync, there may be a DNS issue preventing the NTP hostname lookup. The pfSense system log will show details via `Status` > `System Logs` > `NTP`.

### OpenWRT

OpenWrt’s NTP client is enabled by default and will attempt to keep the router device’s system clock synchronized automatically. Configuration details and further information can be found here https://openwrt.org/docs/guide-user/advanced/ntp_configuration
