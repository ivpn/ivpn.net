---
title: Windows Defender SmartScreen prevents the installation of IVPN app. Why? - IVPN Help
h1: Windows Defender SmartScreen prevents the installation of IVPN app. Why?
url: /knowledgebase/windows/windows-defender-smartscreen-prevents-the-installation-of-ivpn-app-why/
sections:
    - windows
sectionTitle: Windows
layout: help-details
weight: 130
---
# Windows Defender SmartScreen prevents the installation of IVPN app. Why?

Our development team has rewritten our desktop apps to be more efficient as well as signed them with the new certificate. It might take up to 2-3 weeks for a new certificate to build enough reputation, until that, Windows Defender Smartscreen can prevent the execution of the file, detecting it as an "unrecognized" app.

This block by Windows Security is a false positive. Please make sure you have downloaded the installer directly from our [website](/apps-windows/) and not any 3rd party site to ensure that no malware has been injected.

The [changelog](https://github.com/ivpn/desktop-app-ui/blob/master/CHANGELOG_windows.md) for our Windows app offers a SHA1 checksum, which you can use to verify the integrity of the download above to make sure no tampering has occurred during the download. Details on how to verify a checksum can be found [here](https://support.microsoft.com/en-us/help/889768/how-to-compute-the-md5-or-sha-1-cryptographic-hash-values-for-a-file).

In the meantime, to proceed with the installation when you receive a Windows Defender Smartscreen warning message, click on `More info`:

![](https://www.ivpn.net/img/screens/install/smartscreen_1.png)

..and click on the `Run anyway` button.

![](https://www.ivpn.net/img/screens/install/smartscreen_2.png)

You may have to temporarily disable any other running security software running on your computer to allow the installation to proceed. Please be sure to re-enable it back immediately after installing our app. For extra security, you might consider temporarily disabling your network connection while the real-time protection is disabled.
