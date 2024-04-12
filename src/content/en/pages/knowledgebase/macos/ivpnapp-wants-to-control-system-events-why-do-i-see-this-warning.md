---
title: '"IVPN.app wants to control System Events". Why do I see this warning? - IVPN Help'
h1: '"IVPN.app wants to control System Events". Why do I see this warning?'
url: /knowledgebase/macos/ivpnapp-wants-to-control-system-events-why-do-i-see-this-warning/
sections:
    - macos
sectionTitle: macOS
layout: help-details
weight: 170
---
# "IVPN.app wants to control System Events". Why do I see this warning?

Various new threats and vulnerabilities are discovered daily and reacting to them is vital to keep the device that holds your personal and sensitive information safe and secure. For that, Apple is continuously implementing new security features to its operating systems, which is definitely a good thing.

<div markdown="1" class="notice notice--warning">
[insert an app name here] wants to control "System Events". Allowing control will provide access to documents and data inside "System Events", and to perform actions within that app.
</div>

This is a new dialogue message that was added with the release of macOS Catalina. What you're seeing is warning that was not a part of previous versions of macOS - it's being more cautious and letting you know about things that you may want to weigh in on, such as whether to grant this or that application certain privileges, where in the past, it would've just gone ahead and granted them without asking you for specific permission.

Our app provides a lot of features, which rely on various system events and triggers to work. For example, the "Start at login" feature needs to know when you are, well, logged into your computer to launch an app. The only way to know whether this event has actually occurred, IVPN app needs to have access to your computer's "System Events", hence the permission request message. Should you not allow this, the feature is not guaranteed to work as it was designed initially.
