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
    The AntiTracker feature uses a specially configured DNS server to block domains from the publicly curated and continuously expanded [GitHub project blacklist](https://github.com/StevenBlack/hosts).

3.  #### How can I activate the AntiTracker?
    - On desktop apps for **macOS**, **Windows** and **Linux**, the feature is enabled by toggling the AntiTracker switch on which is located right next to the IVPN Firewall switch.  

    - On the **iOS** app, navigate to `Settings` by tapping on the 3 horizontal lines -> `AntiTracker` and toggle the `Enable AntiTracker` option on.  

    - On the **Android** app, navigate to the `Settings` area by tapping on the Gear icon -> `AntiTracker` and toggle the `Enable AntiTracker` option on.  

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

    Please, note, the feature is not included in the IVPN app for Android distributed via the Play Store as Google will most likely ban it for providing the tools that are focused on blocking their services in the first place. If you wish to use the feature on your Android device, feel free to [download the .apk file](/apps-android/) from our website. You will need to delete any previously installed version of IVPN app before installing from the .apk file.  

    The AntiTracker can also be enabled on routers and other manual connections by specifying the following DNS IP address - `10.0.254.2` (or `10.0.254.102` - when using the feature together with Multi-hop)

7.  #### What is “Hardcore Mode”?
    Hardcore Mode extends the AntiTracker feature further by completely blocking all IP addresses and services owned by the flagship bearers of the surveillance economy, such as Google and Facebook.

    Do not be surprised to discover that everything linked to those corporations, starting from Youtube, Facebook, Instagram, Gmail and down to the widely used Google Search and services using their IP addresses will not work once you switch to Hardcore Mode.

8.  #### How do I activate the Hardcore Mode?
    If you are mentally prepared to fully cut any ties with those companies, follow the steps below:

    - On the IVPN desktop clients for **macOS**, **Windows** and **Linux**, navigate to the `Settings/Preferences` - `AntiTracker` tab and have the **Hardcore Mode** checked.

    - On the **iOS** app, navigate to `Settings` by tapping on the 3 horizontal lines -> `AntiTracker` and have the `Hardcore Mode` toggled on.

    - On the **Android** app, access the `Settings` area by tapping on the Gear icon -> `AntiTracker` and toggle the `Hardcore Mode` option on.

    - If you are using our desktop apps' **CLI** interface, type `ivpn antitracker -on_hardcore` in a Terminal or include it with the **connect** command, like `ivpn connect -antitracker_hard fi.gw.ivpn.net`

    - To enable the Hardcore Mode on routers and other manual connections, use the following DNS IP address - `10.0.254.3` (or `10.0.254.103` - when using the feature together with Multi-hop)
