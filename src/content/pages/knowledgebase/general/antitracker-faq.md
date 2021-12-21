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

    AntiTracker is a new IVPN feature that enables you to block trackers that collect various information about your browser activity (e.g. Google Analytics), known malicious websites and ads. This, on par with encryption IVPN provides, significantly increases your online privacy. 
     
    See our in-depth [blog post](/blog/block-ads-and-beat-data-surveillance-with-ivpns-antitracker/) for more info on the subject.

2.  #### How does it work?
    The AntiTracker feature uses a specially configured DNS server to block domains from a continuously updated block list ([OISD full](https://oisd.nl)).

3.  #### How can I activate the AntiTracker?
    - On desktop apps for **macOS**, **Windows** and **Linux**, toggle the AntiTracker switch located below the IVPN Firewall switch on the right-side of the app.  

    - On mobile apps for **Android** and **iOS**, swipe up on the app's main window to toggle the AntiTracker switch.  

    - To activate AntiTracker using our desktop apps' **CLI** interface, type `ivpn antitracker -on` in a Terminal or include it with the **connect** command, like `ivpn connect -antitracker se.gw.ivpn.net`  

    <div markdown="1" class="notice notice--warning">
    The AntiTracker does not work unless you are connected to an IVPN server.
    </div>

4.  #### Which VPN protocols does it work with?
    AntiTracker is configured to work across all OpenVPN and WireGuard servers.

5.  #### Can I use it together with my browser’s ads/tracking-blocking extension?
    Yes. Do keep in mind though, when using other tracker-blocking extensions, i.e. Privacy badger or Ghostery, along with our AntiTracker you might see that webpage still loads and contains various trackers. This happens because the AntiTracker is not purging these trackers from the webpage but rather prevents them from relaying any gathered data in your browser, thus mitigating a leak.

6.  #### On which devices I can use AntiTracker?
    AntiTracker is available across all our [native apps](/apps/) for Windows, macOS, Linux, iOS and Android.  

    Please note: This feature is not included in the IVPN app for Android distributed via the Play Store as Google will most likely ban it for providing the tools that are focused on blocking their services in the first place. If you wish to use the feature on your Android device, feel free to [download the .apk file](/apps-android/) from our website or install via [F-Droid](https://f-droid.org/packages/net.ivpn.client/). You will need to uninstall any previously installed version of IVPN app before installing from the .apk file or from F-Droid.  

    The AntiTracker can also be enabled on routers and other manual connections by specifying the following DNS IP address - `10.0.254.2` (or `10.0.254.102` - when using the feature together with Multi-hop)

7.  #### What is “Hardcore Mode”?
    Hardcore Mode extends the AntiTracker feature further by completely blocking all domains owned by the flagship bearers of the surveillance economy, Google and Facebook. 

    Do not be surprised to discover that the majority of services linked to those corporations, starting from Youtube, Facebook, Instagram, Gmail and down to the widely used Google Search and services using their domains will not work once you switch to Hardcore Mode.

8.  #### How do I activate the Hardcore Mode?
    If you are mentally prepared to fully any ties with those companies, follow the steps below:

    - On desktop apps **macOS**, **Windows** and **Linux**, click the `Settings` gear icon at the top of the app's main window, click the AntiTracker tab on the left, then check **Hardcore Mode**.  

    - On mobile apps for **Android** and **iOS**, tap the `Settings` gear icon at the top of the screen, tap the `AntiTracker` menu, enable the `AntiTracker` (if it is not enabled already), then toggle **Hardcore Mode** on.

    - If you are using our desktop apps' **CLI** interface, type `ivpn antitracker -on_hardcore` in a Terminal or include it with the **connect** command, like `ivpn connect -antitracker_hard fi.gw.ivpn.net`

    - To enable the Hardcore Mode on routers and other manual connections, use the following DNS IP address - `10.0.254.3` (or `10.0.254.103` - when using the feature together with Multi-hop)

9.  #### Are there limitations to Hardcore Mode?
    Hardcore mode uses autonomous system numbers (ASN) to detect extra domains based on Facebook and Google IP addresses.  The IP addresses themselves are not blocked, but any domains associated with those addresses that are not already part of the AntiTracker's block list will be blocked.  As a result, if an app or service uses a IP address directly, like if it is hard-coded into an app, access to Facebook and Google services will be available. 

    For example, Whatsapp uses IP addresses directly and access to messages and services may be available when Hardcore Mode is active.  This is likely a feature to bypass network restrictions that try to block Whatsapp content.

