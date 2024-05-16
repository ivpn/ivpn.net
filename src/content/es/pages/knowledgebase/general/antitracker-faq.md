---
title: AntiTracker FAQ - IVPN Help
h1: AntiTracker FAQ
url: /knowledgebase/general/antitracker-faq/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 200
---
# AntiTracker FAQ

1.  #### What is AntiTracker?

    AntiTracker is a new IVPN feature that enables you to block trackers that collect various information about your browser activity (e.g. Google Analytics), known malicious websites, and ads. This, on par with the encryption IVPN provides, significantly increases your online privacy. 
     
    See our in-depth [blog post](/blog/block-ads-and-beat-data-surveillance-with-ivpns-antitracker/) for more info on the subject.

2.  #### How does it work?
    The AntiTracker feature uses a specially configured DNS server to block domains from a selection of continuously updated [block lists](/knowledgebase/general/antitracker-plus-lists-explained/).

3.  #### How can I activate the AntiTracker?
    - On desktop apps for **macOS**, **Windows**, and **Linux**, toggle the AntiTracker switch located below the IVPN Firewall switch on the right side of the app.  

    - On mobile apps for **Android** and **iOS**, swipe up on the app's main window to toggle the AntiTracker switch.  

    - To activate AntiTracker using our desktop apps' **CLI** interface, type `ivpn antitracker -on` in a Terminal or include it with the **connect** command, like `ivpn connect -antitracker se.gw.ivpn.net`  

    <div markdown="1" class="notice notice--warning">
    The AntiTracker does not work unless you are connected to an IVPN server.
    </div>

4.  #### Which VPN protocols does it work with?
    AntiTracker is configured to work across all OpenVPN and WireGuard servers.

5.  #### Can I use it together with my browser’s ads/tracking-blocking extension?
    Yes. Do keep in mind though, when using other tracker-blocking extensions, e.g. Privacy Badger or Ghostery, along with our AntiTracker you might see that the webpage still loads and contains various trackers. This happens because the AntiTracker is not purging these trackers from the webpage but rather prevents them from relaying any gathered data in your browser, thus mitigating a leak.

6.  #### On which devices can I use AntiTracker?
    AntiTracker is available across all our [native apps](/apps/) for Windows, macOS, Linux, iOS, and Android.  

    The AntiTracker can also be enabled on routers and other manual connections by specifying a [specific DNS IP address](/knowledgebase/troubleshooting/what-is-the-ip-address-of-your-dns-servers/).

7.  #### What is “Hardcore Mode”?
    Hardcore Mode extends the AntiTracker feature further by completely blocking all domains owned by the flagship bearers of the surveillance economy, Google and Facebook/Meta. 

    Do not be surprised to discover that the majority of services linked to those corporations, starting from YouTube, Facebook, Instagram, and Gmail, and down to the widely used Google Search and services using their domains will not work once you switch to Hardcore Mode.

8.  #### How do I activate the Hardcore Mode?
    If you are mentally prepared to fully cut any ties with those companies, follow the steps below:

    - On desktop apps for **macOS**, **Windows**, and **Linux**, click the `Settings` gear icon at the top of the app's main window, click the AntiTracker tab on the left, then check **Hardcore Mode**.  

    - On mobile apps for **Android** and **iOS**, tap the `Settings` gear icon at the top of the screen, tap the `AntiTracker` menu, enable the `AntiTracker` (if it is not enabled already), then toggle **Hardcore Mode** on.

    - If you are using our desktop apps' **CLI** interface, type `ivpn antitracker -on_hardcore` in a Terminal or include it with the **connect** command, like `ivpn connect -antitracker_hard fi.gw.ivpn.net`

    - To enable the Hardcore Mode on routers and other manual connections, use one of the [specific DNS IP addresses](/knowledgebase/troubleshooting/what-is-the-ip-address-of-your-dns-servers/).

9.  #### Are there limitations to Hardcore Mode?
    Hardcore mode uses autonomous system numbers (ASN) to detect extra domains based on Facebook/Meta and Google IP addresses.  The IP addresses themselves are not blocked, but any domains associated with those addresses that are not already part of the AntiTracker's blocklist will be blocked.  As a result, if an app or service uses an IP address directly, like if it is hard-coded into an app, access to Facebook/Meta and Google services will be available. 

    For example, WhatsApp (owned by Facebook/Meta) uses IP addresses directly and access to messages and services may be available when Hardcore Mode is active.  This is likely a feature to bypass network restrictions that try to block WhatsApp content.

