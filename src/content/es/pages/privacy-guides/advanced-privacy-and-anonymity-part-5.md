---
title: Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 5
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/advanced-privacy-and-anonymity-part-5/
section: Advanced
weight: 50
articles: [
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 6",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-6/"
  },
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 7",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-7/"
  },
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 8",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-8/"
  }
]
date: 2013-10-23T12:38:21+00:00
layout: guides-details
---
## Installing VirtualBox and Creating Linux VMs

### Introduction

This tutorial covers installing VirtualBox, and creating Linux (Ubuntu, Xubuntu or Debian) workstation and LiveCD VMs. Installing VirtualBox is trivial. Download the version of VirtualBox for your host machine OS from <https://www.virtualbox.org/wiki/Downloads>. Then open the downloaded package with the Ubuntu Software Center, and install. For Debian hosts, use dpkg in a terminal. Finally, download the Extension Pack, and open it with VirtualBox to install. That's it. With VirtualBox running, hitting F1 opens the user manual, which is excellent and comprehensive.

### VirtualBox Networking Basics

By default, VM network adapters are attached to `NAT`. That is, they use the host machine's active network gateway (wired, wireless, VPN, etc) with network address translation (NAT) and VirtualBox's built-in DHCP server. Multiple VMs using VirtualBox NAT are isolated from each other. VM network adapters can also be attached to VirtualBox internal networks, and multiple VMs can communicate through shared internal networks. But there is no network connectivity with the host machine for VMs that are attached to either NAT or internal networks.

Router/firewall VMs (such as pfSense and OpenWRT) have at least two network adapters, WAN and LAN, and typically run a DHCP server on LAN. For example, you can attach the WAN adapter to the host via NAT, and the LAN adapter to an internal network. You can also use router/firewall VMs to establish connections with remote VPN servers or Tor through WAN, and route those connections to LAN. That's the basis of the setup that we're creating.

VM network adapters can be attached to the host machine in two other ways. First, through selecting `Bridged Adapter`, they can be bridged to the host's physical network adapters. For example, VMs with WAN bridged to the host's LAN adapter behave just like other machines on the host's LAN, perhaps with IP addresses from the LAN router. Conversely, by bridging the LAN adapter of a router/firewall VM to another host network adapter, you can provide routed resources (such as a VPN or Tor tunnel) to other physical machines or networks.

Second, through selecting `Host-only Adapter`, VM network adapters can be bridged to virtual network adapters on the host. The two bridging modes work well together. In particular, it's possible to route traffic from the host machine's LAN (with `Bridged Adapter`) to a VM (or even a network of VMs) and then back to the host (with `Host-only Adapter`) through a virtual network adapter. For example, you could have the host machine access the Internet through an intrusion prevention system (IPS) and/or a nested chain of VPNs and Tor. Although that's not part of this series of guides, it's discussed [here][1] in some detail.

### Creating Linux Workstation VM

Creating VMs is very easy, and section 1.7 of the VirtualBox manual (hit F1) explains it well. It's a two-stage process. First, you configure the new VM in VirtualBox. Second, you start the VM, and install the OS, just as you would on a physical machine.

Linux is the best choice for a secure and private workstation VM. It's open-source and free, so there's no money trail linking you to a product ID. [Ubuntu][2] is a good choice for new Linux users. It's best to use releases with long-term support (currently 12.04). For those who dislike the Unity desktop, [Xubuntu][3] and [Mint][4] (both based on Ubuntu) are good alternatives. [Debian][5] is arguably more secure, but not as user-friendly.

You can use the same 64-bit alternative installer image file (Ubuntu, Xubuntu or Debian) that you used for the host machine. Or you can download a 32-bit (aka i386) regular desktop installer image file for the Linux distro that you've chosen. In any case, you'll need the standard desktop installer image file for creating LiveCD VMs (explained below).

As discussed in [Part 2. Advanced Privacy and Anonymity Using VMs, VPN’s, Tor][6], WebGL fingerprinting is a serious risk when using VMs for compartmentalization. On a given host, all VMs that use a given graphics driver will have the same WebGL fingerprint, because they all use the same virtual GPU.

It's best to compartmentalize across VMs with different graphics drivers. Use Debian or Lubuntu, perhaps, but not both (where it matters, anyway). For compartments where separation is crucial, use VMs with different graphics drivers. Possibilities include Arch, Fedora, PCBSD, Windows and Yosemite Zone.

First open VirtualBox, and click the `New` icon. Enter your desired VM name, and select the proper OS type (Linux) and version (Ubuntu for Ubuntu, Mint or Xubuntu) or Debian, choosing 32-bit or 64-bit as appropriate. Specify 1 GB memory to avoid disk swapping. If host RAM is limited, you can reduce it later. Use the defaults for virtual hard disk type (dynamically allocated VDI) and location, but specify at least 100-200 GB maximum size. The initial size of the virtual disk will be at most 5-6 GB. But with large maximum size, it's very easy to accommodate unplanned growth. After reviewing the final summary screen, hit `Create`.

Next, tweak the new VM's settings. In the `General/Advanced` tab, leave `Shared Clipboard` and `Drag'n'Drop` set to `Disabled` (for security). Under `System/Motherboard`, change the boot order to `Hard Disk, CD/DVD`, and deselect `Enable absolute pointing device`. Under `System/Processor`, select `Enable PAE/NX` (if your host supports it). Under `Display/Video`, increase video memory to 128 MB (unless host RAM is limited). Under `USB` settings, deselect `Enable USB Controller` (for security).

Now add the OS installer image. Under `Storage`, highlight the CD icon (named `Empty`) under `IDE Controller`. Then hit the CD icon to the far right of `CD/DVD Drive`, and select `Choose a virtual CD/DVD disk file`. Navigate to wherever you put your installer image, and select it. Then click `OK` to exit the settings screen.

Then double click on the new VM, and go through the install process. It's OK to accept all defaults. But you can select the encrypted LVM option for disk partitioning , if you like. Although whole-disk encrypted VMs may leave plaintext on host machines, that's better than nothing if the host is compromised while running. As the VM is rebooting after installation completes, click `Devices` in the main menu, highlight `CD/DVD Devices`, and select `Remove disk from virtual drive`.

To get better VM performance, you may want to install VirtualBox guest additions (customized kernel modules). Guest additions also provide better display and mouse integration, and enable mounting host folders (aka `shared folders`) in the VM. However, some of the kernel customizations may reduce guest-host isolation, and using shared folders definitely does. It's a typical convenience vs security trade-off.

Ubuntu or Xubuntu will prompt you to install the guest-additions kernel-module package as `additional drivers`. If not, use the Settings menu. You can also install guest additions by clicking `Devices` in the VirtualBox menu, and then `Install Guest Additions`. But don't do both. Debian 7.10 automatically installs the guest-additions kernel-module package.

It's prudent to disable WebGL in browsers before using them online. Take the VM offline, by changing `Adapter 1` to `Not attached` in VirtualBox Network settings. Then start Firefox in the VM, open `about:config`, and toggle `webgl.disabled` to `true`. Now change `Adapter 1` back to `NAT` (`Internal Network`, when you're using pfSense VPN-gateway VMs). You can also install NoScript, and check `Forbid WebGL` in the `Embeddings` tab of `Options`.

Now reboot, use Update Manager to download and install updates, and let the system reboot again. You're done.

### Creating Diskless Linux LiveCD VM

Diskless LiveCD VMs are useful whenever isolation matters, because VM storage in ramdisk doesn't survive rebooting (although traces may remain in host memory cache). Using them may be prudent for some online work, and they're definitely useful for administering multiple pfSense VPN-client VMs. For example, you could download configuration files for a new VPN service through the appropriate nested VPN chain, and then configure and test the new pfSense VM. After rebooting the LiveCD VM, you could safely get configuration files for another new VPN service (even from a shared host folder) and then configure and test its new pfSense VM.

Although you might want a few diskless LiveCD VMs for convenience, you'll still need less workstation VMs overall. Also, they don't require updating, and upgrading them to a new release is simple. The LiveCD image is read-only, and loads to ramdisks during boot, so at least two or three VMs can typically share an image.

You must use a regular Ubuntu (or Xubuntu or Debian) desktop installer image, which works as a LiveCD. As described above, select the proper OS type and version, and specify 1 GB memory to avoid disk swapping. Then specify `Do not add a virtual hard drive`, and hit `Create`. Tweak the new VM's settings as described above, except for the `Storage` tab.

Under `Storage`, delete the IDE controller and attached CD/DVD drive. Under the SATA controller, create two CD/DVD drives. For the SATA port 0 drive, add the installer image, and enable `Live CD/DVD`. For the SATA port 1 drive, add VBoxGuestAdditions.iso (located in /usr/share/virtualbox/). Then click `OK` to exit the settings screen.

Start the new VM, and choose the option to try without installing. That's it.

Installing VirtualBox guest additions will improve performance, and is necessary for using shared host folders. But you'll need to repeat the installation after each reboot, because the VM intentionally has no persistent storage. Once the VM has finished booting, open a terminal and run these commands:

    ubuntu@ubuntu:~$ sudo mkdir /media/cdrom1
    ubuntu@ubuntu:~$ sudo mount /dev/sr1 /media/cdrom1
    ubuntu@ubuntu:~$ cd /media/cdrom1
    ubuntu@ubuntu:~$ sudo ./VBoxLinuxAdditions.run

The installer will complain about missing headers for the running kernel, but will succeed anyway. Installation worked if the mouse pointer is no longer captured.

If you want a shared folder, start by creating a new folder on the host, for example `/home/user/LiveCD`. Then click `Devices` in the top menu bar, and select `Shared Folders`. Click the `+` icon (upper right) and navigate to the host folder that you just created. Note the folder name, here `LiveCD`, and `OK` out.

Now open a terminal in the VM, and run these commands, replacing `LiveCD` with the name of your shared folder:

    ubuntu@ubuntu:~$ sudo mkdir /home/ubuntu/host
    ubuntu@ubuntu:~$ sudo mount -t vboxsf LiveCD /home/ubuntu/host

The VM folder `/home/ubuntu/host` is now linked to the host folder `/home/user/LiveCD`. The link (and its configuration) will be gone after rebooting. To unmount before rebooting, open a terminal in the VM and run this command:

    ubuntu@ubuntu:~$ sudo umount /home/ubuntu/host

 [1]: https://www.wilderssecurity.com/showthread.php?t=339051&page=11
 [2]: http://www.ubuntu.com/download/desktop
 [3]: http://xubuntu.org/getxubuntu/
 [4]: http://www.linuxmint.com/download.php
 [5]: http://www.debian.org/CD/netinst/
 [6]: /privacy-guides/advanced-privacy-and-anonymity-part-2/
