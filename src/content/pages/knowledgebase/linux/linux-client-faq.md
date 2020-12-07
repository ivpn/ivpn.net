---
title: Linux Client FAQ - IVPN Help
h1: Linux Client FAQ
url: /knowledgebase/linux/linux-client-faq/
sections:
    - linux
    - general
sectionTitle: Linux
layout: help-details
weight: 120
---
# Linux Client FAQ

1.  #### Where can I download the IVPN Linux client?
    Download a package [here](/apps-linux/) or install it from [source](https://github.com/ivpn/desktop-app-cli).

2.  #### What are the requirements?
    * 64-bit OS with a modern Linux kernel
    * Third-party binary dependencies installed
        * OpenVPN version 2.3.10+, if not present by default
        * [WireGuard](https://www.wireguard.com/install/), if not present in your current kernel
        * Obfsproxy, if required

3.  #### How do I install the IVPN Linux client?
    Many Linux distributions include a graphical package manager that will respond when you double-click the downloaded package file.  
    Command-line install is available:

    *   Debian/Ubuntu/Linux Mint:  
        `sudo apt install /path/to/ivpn.deb`  
        or  
        `sudo dpkg --install /path/to/ivpn.deb`

    *   Red Hat/Fedora/CentOS:  
        `sudo yum install /path/to/ivpn.rpm`  
        or  
        `sudo dnf install /path/to/ivpn.rpm`

    *   openSUSE:  
        `sudo zypper install /path/to/ivpn.rpm`

    If you use Arch or an Arch-based distribution, official packages are available via the AUR:

    * Base package with command-line (required):  
      [https://aur.archlinux.org/packages/ivpn/](https://aur.archlinux.org/packages/ivpn/)

    * Graphical interface (optional):  
      [https://aur.archlinux.org/packages/ivpn-ui/](https://aur.archlinux.org/packages/ivpn-ui/)

4.  #### How do I uninstall the IVPN Linux Client?
    Use your graphical package manager and search for ivpn and choose the option to remove or uninstall.  
    Command-line uninstall is also available.

    *   Debian/Ubuntu/Linux Mint:  
        `sudo apt purge ivpn`  
        or  
        `sudo dpkg --purge ivpn`

    *   Red Hat/Fedora/CentOS:  
        `sudo yum remove ivpn`  
        or  
        `sudo dnf remove ivpn`

    *   openSUSE:  
        `sudo zypper remove ivpn`

5.  #### What are the commands?

    ```
    ivpn -h
    ivpn -h -full
    ivpn connect -h
    ivpn servers -h
    ivpn firewall -h
    ivpn wgkeys -h
    ivpn dns -h
    ivpn antitracker -h
    ivpn logs -h
    ```

    Check out our [Command Line Client FAQ](/knowledgebase/general/command-line-client-faq/) for examples.

6.  #### How do I manage automatic connection and boot time settings?
    Check our [Managing the IVPN Linux client at System Boot](/knowledgebase/linux/managing-the-ivpn-linux-client-at-system-boot/) knowledge base article.

7.  #### How do I get help?
    [Contact](/contactus/) our support department 24/7 with any questions.
