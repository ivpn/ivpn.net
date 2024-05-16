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

1. The IVPN App offers VPN protocols with the highest level of encryption available, thus using more CPU power, which results in a higher battery consumption as a result.
2. Mobile devices usually 'sleep' and shut down persistent network connections in favor of reduced bandwidth and energy, a solution called 'push'. However, a VPN tunnel requires constant connectivity to ensure security, and this does not utilize this power-saving method.

On the most recent version of the IVPN App for iOS, disabling the 'Keep alive on sleep' option may reduce battery consumption.

<div markdown="1" class="notice notice--warning">
Disabling keep-alive will not result in any data leak outside of the VPN, as the on-demand rules will automatically re-establish the VPN tunnel before any network traffic starts on the device. Keep-alive, when on, makes sure that the VPN tunnel is active even when the device is in sleep mode. By disabling it, the VPN tunnel is reconnected only when the device needs to make network requests. Disabling keep-alive will improve battery consumption when the device is in sleep mode, but the drawback is you might experience occasional slowdowns due to wake-up reconnections.
</div>

If security is not your primary concern and to preserve the battery power, consider disconnecting from the VPN connection when not in use or when your device is sleeping.

Alternatively, you may try the [WireGuard VPN protocol](/knowledgebase/general/wireguard-faq/), which was proven to provide higher performance while causing less stress to the battery.
