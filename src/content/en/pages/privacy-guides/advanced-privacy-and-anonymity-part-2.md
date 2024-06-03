---
title: Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 2
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/advanced-privacy-and-anonymity-part-2/
section: Advanced
weight: 20
articles: [
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 3",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-3/"
  },
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 4",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-4/"
  },
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 5",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-5/"
  }
]
date: 2022-02-04T00:00:00+00:00
layout: guides-details
---
## Basic Setup Using VMs, VPNs and Tor

### Introduction

This guide covers a basic setup to protect online privacy and anonymity. It's appropriate for reliably circumventing Internet censorship and data retention by ISPs, and for reliably circumventing commercial tracking and behavioral marketing. It may be adequate for political dissidents in countries that respect human rights. However, it is _not_ adequate for political dissidents who might suffer serious consequences if compromised. For them, using the full setup (covered in Parts 3-8) would be prudent.

In this setup, the host machine reaches the Internet through a VPN service, with firewall rules to prevent leaks. The host runs VirtualBox, and there are multiple Linux workspace VMs to compartmentalize and isolate activity. Each Linux workspace VM initially reaches the Internet through the host machine's VPN service. It then connects through a different VPN service, or through the Tor network, to reach Internet sites. There are firewall rules to prevent leaks. For Tor connectivity, the guide uses [Whonix][1], which comprises Tor gateway and workstation VMs that are based on Linux (Debian).

VirtualBox by default isolates resources (storage, memory and processing) that each VM is using, both from itself and from other VMs. Although the Linux workspace VMs (and the Whonix gateway VM) all use the host machine's VPN connection through [network address translation (NAT)][2], VirtualBox doesn't permit VM-to-VM traffic in that arrangement. Linux workspace VMs (and the Whonix workstation VM) are also isolated from each other on the Internet, because they have different IP addresses and network latencies.

Because Whonix isolates workspace and networking in separate VMs, it resists attacks that compromise or circumvent Tor and/or firewall rules. However, the VPN client running in each Linux workspace VM is vulnerable to such attacks. Even so, the VPN client running on the host is isolated, and so damage is limited. In the full setup (covered in Parts 3-8), all workspaces and networking (VPN and Tor clients) are isolated in separate VMs.

### Setting Up VPN on Host Machine

If you're already using a VPN service, you can skip to the next step. If you're not already using a VPN service, [choose one][3] and install the client following the provider's instructions. For Linux, you can use the instructions below, in `Setting Up VPN on Linux Workstation VM`.

Unless you've already set up firewall rules to prevent leaks, it's prudent to do so. All traffic (including DNS queries) should go through the VPN tunnel, and there should be no Internet connectivity if the VPN connection fails. Also, just in case, DNS queries should use the VPN provider's DNS server(s), or reliable [third-party DNS servers][4], and **not** your ISP's DNS servers.

There are instructions below (in `Installing and Checking VPN-Firewall on Linux Workstation`) for using adrelanos' firewall setup in Linux. For Windows, you can ask your provider, or use (for example) [Comodo][5]. For OS X, you can ask your provider, or use (for example) [PF][6].

It's also prudent to test for leaks. There are instructions below (in `Installing and Checking VPN-Firewall on Linux Workstation`) for leak testing in Linux. The same approach applies in Windows or OS X, except for installing and configuring Wireshark. For Windows, see (for example) [HOW TO : Install Wireshark on Windows 7][7]. For OS X, see (for example) [WireShark Install on Mac OS X][8].

### Installing VirtualBox

This step is trivial. Download the version of VirtualBox for your host machine OS from <https://www.virtualbox.org/wiki/Downloads>. For Windows hosts, install by executing the downloaded file. For OS X hosts, double click the downloaded file, and drag the app to the Applications icon. For Ubuntu hosts, open the downloaded package with Ubuntu Software Center, and install. For Debian hosts, use dpkg in a terminal. After installing VirtualBox, download the Extension Pack, and open it with VirtualBox to install. That's it. With VirtualBox running, hitting F1 opens the user manual, which is excellent and comprehensive.

### Creating Linux Workstation VM

Creating VMs is very easy, and section 1.7 of the VirtualBox manual (hit F1) explains it well. It's a two-stage process. First, you configure the new VM in VirtualBox. Second, you start the VM, and install the OS, just as you would on a physical machine.

Linux is the best choice for a secure and private workstation VM. It's open-source and free, so there's no money trail linking you to a product ID. [Ubuntu][9] is a good choice for new Linux users. It's best to use releases with long-term support (currently 12 .04). For those who dislike the Unity desktop, [Xubuntu][10] and [Mint][11] (both based on Ubuntu) are good alternatives. [Debian][12] is arguably more secure, but not as user-friendly.


First download the 32-bit (aka i386) installer image file for the Linux distro that you've chosen. Then open VirtualBox, and click the `New` icon. Enter your desired VM name, and select the proper OS type (Linux) and version (Ubuntu for Ubuntu, Mint or Xubuntu) or Debian. Specify 1 GB memory to avoid disk swapping. If host RAM is limited, you can reduce it later. Use the defaults for virtual hard disk type (dynamically allocated VDI) and location, but specify at least 100-200 GB maximum size. The initial size of the virtual disk will be at most 5-6 GB. But with large maximum size, it's very easy to accommodate unplanned growth. After reviewing the final summary screen, hit `Create`.

Next, tweak the new VM's settings. In the `General/Advanced` tab, leave `Shared Clipboard` and `Drag'n'Drop` set to `Disabled` (for security). Under `System/Motherboard`, change the boot order to `Hard Disk, CD/DVD`, and deselect `Enable absolute pointing device`. Under `System/Processor`, select `Enable PAE/NX` (if your host supports it). Under `Display/Video`, increase video memory to 128 MB (unless host RAM is limited). Under `USB` settings, deselect `Enable USB Controller` (for security).

Now add the OS installer image. Under `Storage`, highlight the CD icon (named `Empty`) under `IDE Controller`. Then hit the CD icon to the far right of `CD/DVD Drive`, and select `Choose a virtual CD/DVD disk file`. Navigate to wherever you put your installer image, and select it. Then click `OK` to exit the settings screen.

Then double click on the new VM, and go through the install process. It's OK to accept all defaults. But you can select the encrypted LVM option for disk partitioning , if you like. Although whole-disk encrypted VMs may leave plaintext on host machines, that's better than nothing if the host is compromised while running. As the VM is rebooting after installation completes, click `Devices` in the main menu, highlight `CD/DVD Devices`, and select `Remove disk from virtual drive`.

To get better VM performance, you may want to install VirtualBox guest additions (customized kernel modules). Guest additions also provide better display and mouse integration, and enable mounting host folders (aka `shared folders`) in the VM. However, some of the kernel customizations may reduce guest-host isolation, and using shared folders definitely does. It's a typical convenience vs security trade-off.

Ubuntu or Xubuntu will prompt you to install the guest-additions kernel-module package as `additional drivers`. If not, use the Settings menu. You can also install guest additions by clicking `Devices` in the VirtualBox menu, and then `Install Guest Additions`. But don't do both. Debian 7.10 automatically installs the guest-additions kernel-module package.

Use Update Manager to download and install updates. Then reboot the system.

Before using Firefox, it's prudent to disable WebGL, in order to prevent graphics fingerprinting (see last paragraph). First take VM offline. In VirtualBox Network settings, change `Adapter 1` to `Not attached`. Then start Firefox in the VM, open `about:config`, and toggle `webgl.disabled` to `true`. Now change `Adapter 1` back to `NAT`. As backup protection, you can install NoScript, and check `Forbid WebGL` in the `Embeddings` tab of Options.

### Setting Up VPN on Linux Workstation VM

These instructions are for OpenVPN-based services. For IPsec-based VPN services, follow your provider's instructions. Avoid PPTP-based VPN services, because that protocol is extremely insecure.

Start by setting up Network Manager with OpenVPN. Open a Terminal window, and run these commands:

    user@ubuntu:~$ sudo apt-get install network-manager-openvpn
    user@ubuntu:~$ sudo restart network-manager

Then review your VPN credentials – certificates (\*.crt) and keys (\*.key) – and configuration files (\*.conf or \*.ovpn). Some VPN services provide configuration files with embedded credentials, with each of the credentials bracketed by corresponding [name] and [/name] tags. In that case, copy each of the credentials, and save as an appropriately-named text file. There may be as many as four credentials:

  * ca.crt
  * client.crt
  * client.key
  * ta.key

All of these files should be downloaded via HTTPS, and kept private. You might want to avoid providers that don't use HTTPS for this. Establishing a VPN connection may also require a username and password, which may differ from the account name and password for the VPN service's website. Some low-end services email connection username and password. In that case, immediately go to the provider's website, and change the password.

Virtually all VPN services provide a ca.crt (certificate authority) certificate. These certificates enable clients to verify the authenticity of VPN servers before connecting. Most VPN services also provide a client.crt (client certificate) and client.key (for unlocking and using the client certificate). Client certificates allow VPN servers to verify the authenticity of clients before accepting connections. A few high-end VPN services also provide a ta.key to enable TLS authentication, which [increases connection security][13].

You'll also need other information from the OpenVPN configuration file. First, you'll need to choose the VPN server that you'll be connecting to. Avoid the United States, United Kingdom and France. Germany and the Netherlands are OK. It's probably good to avoid Eastern Europe, Russia, China etc, which might attract attention. You'll need the IP address of the server, rather than the hostname, in order for VPN-Firewall (see below) to work properly. If you just have hostnames, you can get the IP address by running this command:

    user@ubuntu:~$ host hostname.that.you.have

Second, you'll need to know the server port number and connection type (UDP or TCP). It's generally best to use UDP (unless you're routing via Tor). You'll also need to know the cipher type (from the cipher ... line) and whether LZO compression should be enabled (if you see comp-lzo). If cipher type isn't specified, use the Network Manager default. For VPNs that provide ta.key, you'll need to know the key direction, which is the number at the end of the tls-auth line (typically 1).

Start the setup by copying all of the VPN certificate and key files to /etc/openvpn. Open a Terminal window, and run these commands:

    user@ubuntu:~$ cd /home/user/path-to-the-files
    user@ubuntu:~$ sudo cp ca.crt client.crt client.key ta.key /etc/openvpn/

Of course, edit the second command for the files that you actually have.

Then open Network Manager, select the `VPN` tab, and click the `Add` button. Select OpenVPN as type, and click the `Create` button. Enter a short name for the connection, and the IP address of the server that you'll be accessing. The next steps depend on the configuration of the VPN service.

There are three common VPN-configuration setups. Some VPN services (such as Private Internet Access) provide only ca.key, and require username and password for connection. For them, select `Password` as authentication type, enter your username and password, and click the `CA Certificate` button. In the `Places` window, click `File System`. Double click `etc`, and then double click `openvpn`. Finally, select `ca.crt` and click `Open`.

Now click the `Advanced` button. In the `General` tab, check `Use custom gateway port` and enter the appropriate port number. If appropriate, check `Use LZO data compression` (typical) and `Use a TCP connection` (rarely appropriate unless you're routing via Tor). If you know the cipher type, click `Cipher` in the `Security` tab, select the appropriate one, and click `OK`. Now click `Save` in the VPN window, and close Network Manager.

Some VPN services (such as AirVPN) provide ca.key, client.crt and client.key, but not ta.key, and don't require username and password for connection. For them, select `Certificates (TLS)` as authentication type, and then specify `User Certificate` (client.crt), `CA Certificate` (ca.crt) and `Private Key` (client.key) as described above. Then complete the same steps in the `Advanced` window as described above, save the VPN configuration, and close Network Manager.

Some VPN services (such as IVPN) provide ca.key, client.crt, client.key and ta.key, and also require username and password for connection. For them, select `Password with Certificates (TLS)` as authentication type, and enter your username and password. Then specify `User Certificate` (client.crt), `CA Certificate` (ca.crt) and `Private Key` (client.key) as described above. Complete the same steps in the `Advanced` window as described above. In the `TLS Authentication` window, check `Use additional TLS authentication`, and specify `Key File` (ta.key) and `Key Direction` (typically 1). Then save the VPN configuration, and close Network Manager.

Now use Network Manager to establish the new VPN connection. Once it connects, verify that it works by visiting <https://whatismyipaddress.com>. If it doesn't connect, or doesn't work, recheck the configuration.

### Installing and Checking VPN-Firewall on Linux Workstation

Install adrelanos' VPN-Firewall scripts as described at <https://github.com/adrelanos/VPN-Firewall>. You want the firewall (iptables rules) to load at bootup, so install both the firewall and init scripts. Reboot the VM, but don't reconnect the VPN via Network Manager. Check VPN-Firewall status by running the following in a Terminal window:

    user@ubuntu:~$ sudo service vpnfirewall status

It should reply. Then verify that the VM has no Internet connectivity by trying to visit <https://whatismyipaddress.com>. If it connects, there's something wrong with the VPN-Firewall setup.

Now use Network Manager to establish your VPN connection, and verify that it works by visiting <https://whatismyipaddress.com>. If it doesn't connect, recheck the configuration. If it does connect, test VPN-Firewall by killing the openvpn process (run `sudo killall openvpn` in a Terminal window) and verifying that the VM has no Internet connectivity. Then use Network Manager to reestablish the VPN connection, and verify that it works by visiting <https://whatismyipaddress.com>.

Check your DNS servers by running the standard DNS test at <https://www.grc.com/dns/>. It should report only the DNS servers that your VPN service is pushing. It should not report any DNS servers that are associated with your ISP, or are specified by your LAN router. If it does, there's something wrong with the VPN setup.

You can also check for leaks using Wireshark. To install Wireshark, open a Terminal window in the VM, and run these commands:

    user@ubuntu:~$ sudo apt-get update
    user@ubuntu:~$ sudo apt-get install wireshark

Then configure wireshark to allow a non-root user to sniff packets. As described [here][14], run these commands in a Terminal window:

    user@ubuntu:~$ sudo dpkg-reconfigure wireshark-common
    user@ubuntu:~$ sudo adduser $USER wireshark

Reboot the VM, and establish your VPN connection. Then open Wireshark, and start capturing on eth0. Use Firefox to check <https://whatismyipaddress.com>, run the DNS test at <https://www.grc.com/dns/>, etc. Now stop the capture, and run Statistics/Endpoints. You should only see one [non-private][15] aka [public IP address][16], that of the VPN server that you're connected to.

Now kill the openvpn process (run `sudo killall openvpn` in a Terminal window) and start a fresh capture on eth0. Verify that Firefox can't see anything. VPN-Firewall blocks pings, by the way. Stop the capture, and run Statistics/Endpoints. You should only see traffic with local private IP addresses, and reconnection attempts from the VPN server that you were connected to.

Finally, reestablish the VPN connection in Network Manager, and verify that it's working. Then start Update Manager, download and install updates, and let the VM reboot.

### Installing Whonix

[Whonix][1] comprises a pair of Debian VMs: a gateway VM that connects to the Tor network, and a workstation VM that connects through the gateway VM. Installing Whonix is easy. Start by downloading Whonix-Gateway and Whonix-Workstation to your host machine, using your VPN service. It's best to verify the downloads as instructed using the OpenPGP signatures and the Whonix signing key. If you can't be bothered with that, at least download them using BitTorrent (which is more secure, as explained).

Import the gateway and workstation VMs, using `File / Import Appliance` in VirtualBox (reinitializing MAC addresses). If you'll be using just one Whonix instance, just start the Whonix gateway, and then the workstation. Download and install updates as instructed. After rebooting both VMs, you're done. Enjoy!

If you'll be using multiple Whonix instances, each gateway and workstation VM must have a unique name (which determines the name of its folder). After importing the first pair of gateway and workstation VMs, edit their names in the VirtualBox GUI, adding a unique suffix (or whatever) to distinguish them from others that you'll be importing (and to facilitate keeping track of them).

Also, the gateway and workstation VMs of each Whonix instance must share a uniquely named internal network. First edit the settings for Adapter 2 of the gateway VM (under `Network`). Change `Whonix` to `Whonix-1` or whatever. Don't change the settings for Adapter 1. The default (`NAT`) will have it connect through your host's VPN service. Then edit the settings for Adapter 1 of the workstation VM, changing `Whonix` to whatever you just used for Adapter 2 of the gateway VM.

Now start the first Whonix gateway, and then the workstation. Download and install updates as instructed. After rebooting both VMs, you're done. Enjoy!

### OS Diversity is Crucial for Compartmentalization Safety

WebGL fingerprinting is a serious risk when using VMs for compartmentalization. WebGL uses the GPU via the OS graphics driver. On a given host, all VMs that use a given graphics driver will have the same WebGL fingerprint, because they all use the same virtual GPU. So let's say that you have a Debian VM that connects through a nested VPN chain, and a Lubuntu VM that connects directly, or through a different one. Default Firefox in both VMs will have the same WebGL fingerprint! That could link the two VMs, and break compartmentalization.

One can readily disable WebGL in browsers. But accidents happen. Maybe you'll install a new browser, and forget to disable WebGL. Any sites that you visit while WebGL is working can fingerprint the VM. And potentially that VM is linked by WebGL fingerprint to other VMs that use the same graphics driver.

Given that, it's best to compartmentalize across VMs with different graphics drivers. Browsers on all distros that use the Debian graphics driver (Debian, Ubuntu, Lubuntu, Mint, Xubuntu, etc) apparently have the same WebGL fingerprint. But VMs using different graphics drivers (such as Arch, Fedora, PCBSD, Windows and Yosemite Zone) have different WebGL fingerprints.

The host and VMs use different GPUs (real vs virtual) so there is no overlap in WebGL fingerprints. However, it does appear that systems using a given graphics driver will have the same WebGL fingerprint on given hardware, with a given GPU. And so reinstalling the OS, or using a related OS with the same graphics driver, may not change the WebGL fingerprint.

 [1]: https://www.whonix.org/wiki/Main_Page
 [2]: https://en.wikipedia.org/wiki/Network_address_translation
 [3]: https://torrentfreak.com/best-vpn-anonymous-no-logging/
 [4]: https://www.wikileaks.org/wiki/Alternative_DNS
 [5]: https://forums.comodo.com/firewall-help-cis/configuring-to-block-all-nonvpn-traffic-t91413.15.html
 [6]: https://web.archive.org/web/20120827084446/https://thenewtech.tv/it/openbsd-pf-on-mac-osx-lion
 [7]: https://kudithipudi.org/2009/07/17/how-to-install-wireshark-on-window-7/
 [8]: https://networkstatic.net/wireshark-install-on-mac-os-x/
 [9]: https://www.ubuntu.com/download/desktop
 [10]: https://xubuntu.org/getxubuntu/
 [11]: https://www.linuxmint.com/download.php
 [12]: https://www.debian.org/CD/netinst/
 [13]: https://community.openvpn.net/openvpn/wiki/SecurityOverview
 [14]: https://askubuntu.com/questions/74059/how-do-i-run-wireshark-with-root-privileges
 [15]: https://en.wikipedia.org/wiki/Private_network
 [16]: https://en.wikipedia.org/wiki/IP_address#Public_address
