---
title: I cant connect from China / Vietnam / Iran etc - How do I enable obfsproxy? - IVPN Help
h1: I cant connect from China / Vietnam / Iran etc - How do I enable obfsproxy?
url: /knowledgebase/troubleshooting/i-cant-connect-from-china-or-vietnam-or-iran-etc-how-do-i-enable-obfsproxy/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 130
---
# I cant connect from China / Vietnam / Iran etc - How do I enable obfsproxy?

If you are unable to connect from a country where there may be a restrictive national firewall we recommend enabling the 'obfsproxy' option from within the IVPN client.

<div markdown="1" class="notice notice--info">
Please note that we do not have a solution for mobile devices running Android or iOS. We only support obfsproxy in the IVPN client for Windows, macOS and Linux.
</div>

### Windows

1. Click on the `settings` icon.
2. Click on the `connection` tab.
3. Enable the `use obfsproxy to circumvent censorship` option.

### macOS

1. Click on the `preferences` icon.
2. Click on the `connection` tab.
3. Enable the `use obfsproxy` option.

### Linux

Add the obfsproxy command argument to the connect command - `ivpn -o connect hk.gw.ivpn.net`. You can use either **-o** or **-obfsproxy**.
