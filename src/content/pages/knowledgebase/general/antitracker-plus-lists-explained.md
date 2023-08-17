---
title: AntiTracker Plus Lists Explained - IVPN Help
h1: AntiTracker Plus Lists Explained
url: /knowledgebase/general/antitracker-plus-lists-explained/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 10
---
# AntiTracker Plus Lists Explained

**AntiTracker Plus** extends IVPN's original advertising and tracker blocking system by providing three combinations of lists to choose from with the option to choose any one of seven individual lists.  The goal is to offer more control over what is blocked and not blocked.

Adjust the current AntiTracker block list selection via the IVPN App's `Settings > AntiTracker` area.  For manual VPN connections, check this [article](/knowledgebase/troubleshooting/what-is-the-ip-address-of-your-dns-servers/) for details on DNS server IP addresses.

<div markdown="1" class="notice notice--info">
Note: Hardcore Mode remains optionally available with each AntiTracker Plus list option to block known Google and Facebook domains.
</div>

## List Sources

* [1Hosts](https://o0.pages.dev/)
* [AdGuard DNS Filter](https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt)
* [Developer Dan / Lightswitch05](https://github.com/lightswitch05/hosts)
* [EasyList](https://easylist.to/)
* [HaGeZi](https://github.com/hagezi/dns-blocklists)
* [OISD](https://oisd.nl/downloads)
* [Steven Black hosts](https://github.com/StevenBlack/hosts)

## List Combinations

### Basic

Offers a convenient level of blocking.  May offer access to services that rely on some level of tracking.  Includes:

* **1Hosts Lite** - "balanced; set & forget, doesn't hamper user experience (UX)"
* **AdGuard** - "default filter for AdGuard Home and for the public AdGuard DNS servers"
* **EasyList + EasyPrivacy** - "EasyList is a popular list used by many ad blockers and forms the basis of over a dozen combination filter lists. EasyPrivacy is a supplementary filter list that removes all forms of tracking from the internet, including tracking scripts and information collectors."
* **OISD Small** - "smaller, less comprehensive variant of the big list, which [focuses] mainly on Ads, (Mobile) App Ads"
* **Steven Black Unified = Ads + Malware**

<br />

### Comprehensive

Offers a moderate level of blocking.  Recommended as a reasonable balance between privacy and usability.  Includes:

* **Basic** list sources from above
* **1Hosts Pro** - "strict; has some minimal breakages, prioritizes privacy & safety (adblocking) over UX"
* **Developer Dan Ads + Tracking** - "A programmatically expanded list of hosts used for advertisements and tracking"
* **HaGeZi Multi Normal** - "All-round protection"
* **OISD Big** - "The big list blocks: Ads, (Mobile) App Ads, Phishing, Malvertising, Malware, Spyware, Ransomware, CryptoJacking, Scam ... Telemetry/Analytics/Tracking (Where not needed for proper functionality)"

<br />

### Restrictive

Offers an intense level of blocking.  Some online services may break.  Includes:

* **Comprehensive** list sources from above
* **1Hosts Xtra** - "extremly aggressive & restrictive"
* **Developer Dan Aggressive Tracking** - "I do not recommend this list for most users. It is a very aggressive block list for tracking, geo-targeting, & ads. This list will likely break functionality, so do not use it unless you are willing to maintain your own whitelist."
* **HaGeZi Multi Ultimate** - "Aggressive protection"

<br />

### Individual

The option also exists to select a single list for blocking instead of the collections above:

* **EasyList + EasyPrivacy** - "EasyList is a popular list used by many ad blockers and forms the basis of over a dozen combination filter lists. EasyPrivacy is a supplementary filter list that removes all forms of tracking from the internet, including tracking scripts and information collectors."
* **OISD Big** - "The big list blocks: Ads, (Mobile) App Ads, Phishing, Malvertising, Malware, Spyware, Ransomware, CryptoJacking, Scam ... Telemetry/Analytics/Tracking (Where not needed for proper functionality)"
* **Developer Dan Ads + Tracking** - "A programmatically expanded list of hosts used for advertisements and tracking"
* **Steven Black Unified = Ads + Malware**
* **1Hosts Xtra** - "extremly aggressive & restrictive"
* **HaGeZi Multi Pro** - "Cleans the Internet and protects your privacy! Blocks Ads, Affiliate, Tracking, Metrics, Telemetry, Phishing, Malware, Scam, Fake, Coins and other 'Crap'."
* **HaGeZi Multi Ultimate** - "It may contain false positive domains that limit functionality. Therefore it should only be used by experienced users."

<br />

#### List Licensing

For AntiTracker Plus, we utilise various open-source blocklists, each owned and maintained by dedicated creators. We adhere to the provisions of their respective licenses.  To learn more about these licenses, please visit the individual project pages of the resources, linked above.
