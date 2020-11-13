---
title: The battery on my phone drains too fast while using IVPN. Why? - IVPN Help
h1: The battery on my phone drains too fast while using IVPN. Why?
url: /knowledgebase/troubleshooting/the-battery-on-my-phone-drains-too-fast-while-using-ivpn-why/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 230
---
# The battery on my phone drains too fast while using IVPN. Why?

Extensive battery usage with IVPN would not be particularly unusual for a combination of reasons, more specifically:

1. IVPN apps offer VPN protocols with the highest level of encryption available, thus using more CPU power, which results in a higher battery consumption as a result.
2. Mobile devices usually 'sleep' and shut down persistent network connections in favor of reduced bandwidth and energy, a solution called 'push'. However, a VPN tunnel requires constant connectivity to ensure security, and this does not utilise this power saving method.

On the most recent version of IVPN app for iOS, disabling 'Keep alive on sleep' option may reduce battery consumption.

<div markdown="1" class="notice notice--warning">
Disabling keep-alive will not result in any data leak outside of VPN, as the on-demand rules will automatically re-establish VPN tunnel before any network traffic starts on the device. Keep-alive, when on, makes sure that VPN tunnel is active even when the device is in sleep. By disabling it, VPN tunnel is reconnected only when the device needs to make network requests. Disabling keep-alive will improve batter consumption when the device is in sleep, but the drawback is you might experience occasional slowdowns due to wake-up reconnections.
</div>

If security is not your primary concern, to preserve the battery power consider disconnecting from the VPN connection when not in use or when your device is sleeping.

Alternatively, you may try the [WireGuard VPN protocol](/knowledgebase/general/wireguard-faq/), which was proven to provide higher performance while at the same time cause less stress to the battery.
