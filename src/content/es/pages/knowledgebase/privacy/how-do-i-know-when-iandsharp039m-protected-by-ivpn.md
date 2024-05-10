---
title: How Do I Know When I'm Protected by IVPN? - IVPN Help
h1: How Do I Know When I'm Protected by IVPN?
url: /knowledgebase/privacy/how-do-i-know-when-iandsharp039m-protected-by-ivpn/
sections:
    - privacy
    - general
sectionTitle: Privacy
layout: help-details
weight: 20
---
# How do I know when I'm protected by IVPN?

To quickly check if your VPN is working you can use a website such as [infosniper.net](https://www.infosniper.net/) or [dnsleaktest.com](https://www.dnsleaktest.com/). When you are connected and navigate to one of these websites, you should see an indication of the location of the server you are connected to and not your present location. This gives you reasonable assurance that your traffic is routed through the VPN service. However, for more advanced users requiring a high level of security, we recommend reviewing our guide [How to perform a VPN leak test](/privacy-guides/how-to-perform-a-vpn-leak-test/) to test that your VPN is not leaking any packets.

When using the website above please note that geolocation data is not 100% accurate. For geolocation providers (such as those above) determining the country is relatively accurate (95%-99%) since the `country` is required information when an IP range is allocated and IP registrars supply that information for free. Determining the physical location down to a city is more difficult and less accurate because there is no official source for the information and Internet service providers often locate IP addresses to the city where the company bases its operations. Accuracy rates for `city` is 50-80% according to dnsstuff.com. If you would like a more accurate tool to determine the location try using [Visual traceroute](https://www.yougetsignal.com/tools/visual-tracert/).
