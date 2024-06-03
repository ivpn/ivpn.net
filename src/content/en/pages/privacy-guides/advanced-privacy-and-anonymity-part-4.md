---
title: Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 4
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/advanced-privacy-and-anonymity-part-4/
section: Advanced
weight: 40
articles: [
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 5",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-5/"
  },
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 6",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-6/"
  },
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 7",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-7/"
  }
]
date: 2020-01-28T00:00:00+00:00
layout: guides-details
---
## Setting Up Secure Host Machines

### Introduction

This guide explains how to set up full-disk encrypted host machines for securely running multiple VMs. Using hardened router/firewall VMs (such as pfSense) as VPN clients, it's easy to route one VPN tunnel through another. With multiple workstation VMs, we can maintain multiple pseudonyms that complicate profiling and tracking, and we can mitigate the impact of malware and hacking. We can easily route Tor through VPNs to avoid attracting unwanted attention. And we can easily route VPNs through Tor to evade Tor exit blocking, increase application compatibility, and reduce the chance of leaks.

As discussed in [Part 3. Planning Advanced VM and VPN Setup](/privacy-guides/advanced-privacy-and-anonymity-part-3/), it's prudent to read these guides, and download required software, through a VPN service and/or TOR. That way, your ISP and other local observers can't see what you're doing. Furthermore, consistently using a particular VPN service arguably attracts less attention than switching among several. If you haven't yet chosen a direct-connect VPN service, now is a good time. Please see `Initial Privacy Considerations` in Part 3 for more on this recommendation.

Depending on your risk model, it may also be prudent to restrict your new host machine's Internet traffic to the direct-connect VPN service, even while you're setting it up. Using this high-privacy option would prevent your ISP and other local observers from seeing software downloads and other Internet connections that occur during installation of the operating system.

As an example, this guide includes a high-privacy option using Ubuntu as the host operating system. With this option, the new host machine would have no Internet connectivity during Ubuntu installation. Before providing Internet connectivity, you would install your direct-connect VPN service, and then configure iptables to block all non-VPN connections. After providing Internet connectivity, you would establish the VPN connection, and update the system.

With this approach, your ISP and other local observers would see only downloading (albeit increased, perhaps) through your direct-connect VPN service. Because the iptables rules take effect before network configuration during bootup, the new host machine will only have direct non-VPN Internet connectivity if you disable the iptables rules. Unless you did that, your ISP and other local observers would see no specific evidence of the new host machine's existence.

### Hardware

Gaming-class machines or workstations are best for simultaneously running more than a few VMs. Servers are good too, but normally lack audio and high-resolution video. If you'll be maxing out RAM and hard disks, you may need to upgrade the power supply to at least 600 W.

Midrange quad-core CPUs (such as Intel i5 Quad, Intel Core 2 Quad and AMD Athlon Quad) can simultaneously run at least ten VMs, each configured with one core. CPU cores are only a soft limit for VM capacity, and overloading the CPU(s) just slows everything down. The CPU(s) must support virtualization. It's typically disabled by default, and must be enabled in the BIOS.

Memory, on the other hand, is a hard limit for VM capacity. VMs can crash without warning if host memory becomes over-committed. However, RAM is currently quite inexpensive, and it's best to install as much as you can. That's especially important if you plan to run Windows VMs, which require substantially more memory than Linux or BSD VMs. With a 64-bit host OS, by the way, there's no 4 GB memory limit.

You also want fast storage, because multiple VMs will be competing for disk access. It's tempting to use solid state drives (SSDs), given their breathtaking speed, increasing capacity and declining cost. However, it may be problematic to secure SDDs, because their wear-leveling mechanisms may compromise full-disk encryption by leaving plaintext data in the clear after shutdown. While some SDDs may be securable, if you implement full-disk encryption at first use, thorough research and testing would be prudent.

The safest option is still probably RAID with multiple SATA (or SAS, if your budget allows) hard disk drives (HDDs). If you have a SATA optical drive, you can remove it to free up a SATA port, and use an external USB optical drive when needed.

It's best to avoid consumer HDDs because they do extended error recovery (which doesn't play well with RAID) and also because they're not designed to be hammered. Older RAID-ready enterprise 7.2 Krpm SATA HDDs (such as Western Digital RE3s and RE4s) don't cost much more than consumer HDDs, and they perform well.

If you only have four free SATA ports, RAID10 with four HDDs is the best option. RAID10 with four 1 TB 7.2 Krpm WD RE3 HDDs provides 2 TB capacity. You'd see ~170 MBps disk bandwidth with seek time ~12 ms, and you could lose one disk (or perhaps two, if you're lucky) without data loss. The use of RAID5 is no longer recommended, by the way.

If you have five free SATA ports, RAID6 with five 1 TB 7.2 Krpm WD RE3 HDDs provides 3 TB capacity. You'd see ~270 MBps disk bandwidth with seek time ~7 ms, and you could lose any two disks without immediate data loss. However, RAID6 arrays rebuild slowly after failed disks have been replaced, and read errors can hose rebuilds.

Using five HDDs for RAID10 with one hot spare would provide less capacity (2 TB) and less speed (~170 MBps with seek time ~12 ms) but substantially better reliability. Although you could lose only one disk (or perhaps two, if you're lucky) without data loss, RAID10 arrays rebuild far faster than RAID6 arrays do. Once the array had finished rebuilding, you'd have RAID10 with no hot spares. At that point, you could lose another disk (or perhaps two, if you're lucky) without data loss.

You may want to enable booting with degraded RAID. If you don't, and one of the disks fails, you might need to boot with a LiveCD and repair the damage before the machine will boot. If you just boot with degraded RAID, on the other hand, you may not realize that the RAID array is degraded until it entirely fails (which is too late). It's prudent to periodically check HDD SMART and RAID status in Disk Utility.

Effective cooling is essential, especially for RAID with multiple HDDs. With consumer-grade hardware, adding a high-capacity rear case fan is wise. Some models provide little ventilation for drives, and are notorious for baking HDDs. It may be necessary to drill an array of small holes in the case, in front of the HDD cage, making sure not to leave metal fragments inside. You can also add a grill, if appearance matters.

### Choosing an Operating System

Linux is the best choice for a secure and private host OS. It's open-source and free, so there's no money trail linking you to a product ID. Its software RAID implementation is fast, efficient and reliable. The LUKS package provides native full-disk encryption, with everything encrypted except for the boot partition. And finally, VirtualBox runs very well under it.

Unless carefully configured, all operating systems leave disk caches and logs behind. With Windows or OS X, which are closed-source, it's very difficult to even know what's being left behind. Knowledge of Windows shellbags, for example, was until recently largely restricted to the computer forensics community.

Ubuntu is a good choice for new Linux users. The Ubuntu Software Center simplifies package management. And the alternate install ISO provides full access to Debian's disk partitioning tools, including LUKS full-disk encryption, and LVM for flexible partition management. It's best to use releases with long-term support (currently 20.04 LTS). For those who dislike the Unity desktop, Xubuntu (based on Ubuntu) is the best alternative. Mint (also based on Ubuntu) doesn't provide an alternate install ISO. Debian is probably the most secure option, and Debian 7.0 was just released. As noted above, there is no 4GB memory limit with a 64-bit OS, so use that if your hardware supports it.

Although the high-privacy option (explained below) is written for Ubuntu 12.04.2, it should work for any Linux distribution, if suitably tweaked. In principle, an analogous approach should work for Windows and OS X, but avoiding compromise through required authentication would be problematic.

### VM Security Issues

To protect VM privacy, and limit access to log files and disk-cache residue, it's prudent to use dedicated host machines with full-disk encryption. However, encrypted disks are decrypted while in use, and keys are stored in memory, so it's prudent to shut down hosts when idle. Using full-disk encryption for individual VMs would limit access to idle VMs while other VMs are in use, but it won't prevent access to information that's been logged or cached on the host machine.

Under most circumstances, it's safe to assume that VMs are isolated from each other, unless they have direct network connectivity or share disks (including USB and other removable drives) or clipboard. However, the possibility of malware breakout from VM to host can't be excluded. If that occurred, other VMs would be readily compromised. Other machines with direct network connectivity or shared disks would also be compromised. When isolation is crucial or malware risk is high, it's prudent to segregate VMs on different host machines, and to avoid direct network connectivity and disk sharing.

### Plausible Deniability

Although encrypted data appears random, files, partitions and disks containing random data may engender suspicion, especially when there's evidence that they're in use. Also, there may be header information that flags the data as encrypted. In particular, the Linux Unified Key Setup (LUKS) for dm-crypt writes headers that begin with `LUKS`, and that disclose such information as the type of encryption being used.

Conversely, a well-known feature of TrueCrypt is the ability to write hidden partitions, and even to run hidden operating systems. If challenged, one can disclose the passphrase for the decoy partition. Adversaries can mount the decoy partition, and run a decoy OS that's installed on it, but they can't detect any hidden partition or OS that may exist. And so it's arguably plausible to deny that any hidden partition exists.

However, merely having decoy partitions doesn't make them plausible, unless they contain plausible information, and are used daily. If an adversary knows that you were online yesterday, based on information from your ISP, but your hidden OS hasn't been used for a week, it seems odd. Also, even if you have disclosed the passphrase for a hidden TrueCrypt partition, or even if you use TrueCrypt without hidden partitions, an adversary may not believe you.

This tutorial uses Linux with LUKS and dm-crypt full-disk encryption. That may be unworkable if your circumstances require plausible deniability. Future tutorials will cover strategies for plausible deniability.

### Installing Ubuntu with RAID, LUKS Encryption and LVM

First download the [Ubuntu 12.04.2 alternate (64-bit) installer image](http://www.ubuntu.com/download/alternative-downloads), using the BitTorrent link or the nearest mirror. Use another machine that's protected by a VPN service and/or Tor for all of these downloads. If you don't have them already, download the credentials for your direct-connect VPN service. Also download [adrelanos][12] `VPN-Firewall` scripts.

If you'll be going with the high-privacy option, you'll also need the package files required for setting up Network Manager with OpenVPN. Get them through a VPN service and/or Tor. The installer would normally download them from the Ubuntu repository, but that won't be possible without Internet connectivity. There are seven files to get:

  * [openvpn package][1]
  * [network-manager-openvpn-gnome][2]
  * [openconnect package][3]
  * [libopenconnect1 package][4]
  * [network-manager-openconnect package][5]
  * [liblzo2-2 package][6]
  * [libpkcs11-helper1 package][7]

Those are the package files needed to set up Network Manager with OpenVPN in a fresh Ubuntu 12.04.2 64-bit installation. You could get them from a non-US archive, if you like. It's possible that this hack won't work with an updated Ubuntu bug-fix release (e.g., 12.04.3). In that case, error messages from the package installer (which you'll use near the end of this tutorial) will tell you what's wrong.

Connect the machine to your LAN router. Otherwise, networking won't get set up properly. If you're going with the high-privacy option, just disable Internet connectivity to your LAN. After finishing the installation, you'll install VPN-Firewall and your direct-connect VPN client, restore Internet connectivity, and establish the VPN connection. Then you'll download and install updates, reboot and proceed to the next tutorial for VirtualBox setup.

If you're not going with the high-privacy option, just proceed with normal Internet connectivity via LAN. And don't bother downloading the package files for Network Manager with OpenVPN.

Installing Ubuntu (or Xubuntu or Debian) is quite easy, even using the old-school Debian wizard on the alternate install ISO. Create an install CD, and then boot your host machine with it. You can also use a USB flash drive, if your machine will boot from it.

Just use defaults until you reach the hostname screen. Although hostname isn't visible beyond LAN, that will change with IPv6, so it may be prudent to go with the default `ubuntu` (or `xubuntu` or `debian`). Just hit enter after typing the hostname.

The most anonymous username is probably `User`, and it's probably counterproductive to use something cute like `Anne O. Nymous`. A strong password is always prudent, but it matters less here because full-disk encryption is the primary defense. Don't encrypt your home directory, because that can conflict with full-disk encryption.

On the clock screen, select `No` and set the time zone to UTC (the last choice). The host machine will generally be accessing the Internet directly, so there's no point in picking a non-local time zone. However, picking UTC is not uncommon, and it might prevent information leaks.

On the disk partitioning screen, select `Manual` and hit enter. While the following may seem complicated, it's really not. Also, the installer remembers your preferences, so repeating steps on multiple partitions goes quickly. Read it through a few times, so you have a general idea of what you're doing, and are not just following the steps. Basically, you'll be creating two partitions on each disk: 1) a small one for the boot RAID array; and, 2) a large one for the RAID array that will be encrypted using dm-crypt with LUKS, and then split into logical volumes (swap, root and home) using the Logical Volume Manager (LVM).

Start with the boot-array partitions. We put them at the beginning of each disk, furthest out where access is faster. Here are the steps for each of the physical disks:

  1. highlight disk, hit enter, select `Yes` and hit enter to create partition table
  2. highlight `FREE SPACE` line under disk and hit enter
  3. highlight `Create a new partition` (default) and hit enter
  4. you want 300 MB total boot space, so use these partition sizes: 
      * 300MB for RAID1 with two disks
      * 150MB for RAID10 with four disks
      * 100MB for RAID5 with four disks
      * 100MB for RAID6 with five disks
  5. hit enter after typing desired partition size
  6. select `Primary` as partition type (default) and hit enter
  7. select `Beginning` as location (default) and hit enter
  8. select `Use as` line, hit enter, select `physical volume for RAID` and hit enter
  9. highlight `Bootable flag` and hit enter to set `on`
 10. highlight `Done setting up the partition` and hit enter

Repeat the above steps for each of the other physical disks.

Now create a second partition on each physical disk, using the remaining space. We will use them for a RAID array that will hold everything else except boot. Here are the steps for each disk:

  1. highlight `FREE SPACE` line under disk and hit enter
  2. highlight `Create a new partition` (default) and hit enter
  3. accept default size (because you're using all remaining free space) and hit enter
  4. select `Logical` as partition type (default) and hit enter
  5. select `Use as` line, hit enter, select `physical volume for RAID` and hit enter
  6. highlight `Done setting up the partition` and hit enter

Repeat the above steps for each of the other physical disks.

You should be back at the main disk partitioning screen. Configuring software RAID is next. Here are the steps for the boot RAID array:

  1. select `Configure software RAID` and hit enter
  2. select `Yes` to `Write changes to the storage devices and configure RAID` and hit enter
  3. select `Create MD device` (default) and hit enter (this will be md0, by the way)
  4. select desired RAID type and hit enter
  5. enter number of active devices (total disks, less any hot spares that you decide to use) and hit enter
  6. enter number of hot spares (typically zero unless you have five HDDs, and are going with RAID10) and hit enter
  7. check (using space bar) which partitions to use (the small ones, sda1 etc)
  8. hit enter to get back to the RAID configuration screen

Now repeat that process to create md1 from the set of large partitions (sda5 etc). We will encrypt that using dm-crypt with LUKS, and then use it for LVM.

Select `Finish` and hit enter to get back to the main disk partitioning screen.

At this point, you should see two RAID devices on the main disk partitioning screen: "RAID... device #0" (aka md0) being the boot array, and "RAID... device #" (aka md1) being the array for encryption and LVM. Let's do RAID device md1 first.

  1. select `#1` line below main "RAID... device #1" partition line, and hit enter
  2. select `Use as` line, hit enter, choose use as `physical volume for encryption`, and hit enter
  3. select `Done setting up the partition` and hit enter
  4. you should be back at main disk partitioning screen
  5. select `Configure encrypted volumes` and hit enter
  6. select `Yes` to `Keep current partition layout and configure encrypted volumes` and hit enter
  7. select `Create encrypted volumes` and hit enter
  8. check `/dev/md1` (using space bar) and hit enter
  9. select `Finish` and hit enter

Now you'll be asked for your passphrase. Use a complex one, at least 25 characters long with lowercase and uppercase letters, numbers and other printable characters. Record it in a private and secure place, because there is truly no way to recover it if it's lost.

You should be back at the main disk partitioning screen, and should now see the encrypted volume `md1_crypt` at the top of the list. Now we configure logical volumes in that partition, as follows:

  1. select `#1` line below main `md1_crypt` partition line, and hit enter
  2. select `Use as` line, hit enter, choose use as `physical volume for LVM`, and hit enter
  3. select `Done setting up the partition` and hit enter
  4. you should be back at main disk partitioning screen
  5. select `Configure the Logical Volume Manager` and hit enter
  6. select `Yes` to `Keep current partition layout and configure LVM`, and hit enter
  7. select `Create volume group` and hit enter
  8. name it (e.g., `cryptovg`) and hit enter
  9. check `/dev/mapper/md1_crypt` (using space bar) and hit enter

Now you create your logical volumes. Although you can get fancy, swap, root (“/”) and home are enough. We do swap first to put it at the beginning of the logical volume, further out on the disk where access is faster. The steps for swap are:

  1. select `Create logical volume` and hit enter
  2. hit enter to accept default volume group `cryptovg`
  3. name it `swap` and hit enter
  4. set size as twice your installed memory and hit enter

The steps for root are:

  1. select `Create logical volume` and hit enter
  2. hit enter to accept default volume group `cryptovg`
  3. name it `root` and hit enter
  4. set size as 20 GB and hit enter

The steps for home are:

  1. select `Create logical volume` and hit enter
  2. hit enter to accept default volume group `cryptovg`
  3. name it `home` and hit enter
  4. accept default size (remaining space) and hit enter
  5. select `Finish` and hit enter
  6. you should be back at main disk partitioning screen

Now you finish configuring your home volume, as follows:

  1. select `#1` line below main `home` partition line, and hit enter
  2. select `Use as` line, hit enter, choose use as `Ext4 journaling file system`, and hit enter
  3. select `Mount point` line, hit enter, choose `/home` and hit enter
  4. select `Done setting up the partition` and hit enter

Now you finish configuring your root (aka `/`) volume, as follows:

  1. select `#1` line below main `root` partition line, and hit enter
  2. select `Use as` line, hit enter, choose use as `Ext4 journaling file system`, and hit enter
  3. select `Mount point` line, hit enter, choose `/` and hit enter
  4. select `Done setting up the partition` and hit enter

Now you finish configuring your swap volume, as follows:

  1. select `#1` line below main `swap` partition line, and hit enter
  2. select `Use as` line, hit enter, choose use as `swap area`, and hit enter
  3. select `Done setting up the partition` and hit enter

Then, page down the main disk partitioning screen to your boot RAID array ("RAID... device #0" aka `md0`), and finish configuring it:

  1. select `#1` line below main "RAID... device #0" partition line, and hit enter
  2. select `Use as` line, hit enter, choose use as `Ext4 journaling file system`, and hit enter
  3. select `Mount point` line, hit enter, choose `/boot` and hit enter
  4. select `Done setting up the partition`

Finally, go to the bottom of the main disk partitioning screen, select `Finish partitioning and write changes to disk`, and hit enter. After rechecking the partition configuration, select `Yes` to write changes to the disks, and hit enter.

The rest of the install process should complete with little input. If you need an HTTP proxy, you'll probably know what it is. You do want to install the GRUB bootloader, unless you're doing a dual-boot system (and know what you're doing). The system clock is set for UTC.

Now remove the installation CD, and let the machine reboot.

### Setting Up Network Manager with OpenVPN

It's convenient to configure your direct-connect VPN on the host machine before installing drivers and updates, and setting up VirtualBox. If you've chosen the high-privacy option, doing that is essential, and it's somewhat more complicated. In that case, your new host machine (and its LAN) shouldn't have Internet connectivity now .

First you'll need to set up Network Manager with OpenVPN. If you **have not** chosen the high-privacy option, just open a Terminal window, and run these commands:

    user@ubuntu:~$ sudo apt-get install network-manager-openvpn
    user@ubuntu:~$ sudo restart network-manager

That's all.

If you **have** chosen the high-privacy option, open a Terminal window, and run these commands:

    user@ubuntu:~$ cd /home/user
    user@ubuntu:~$ mkdir nmo

Then copy the seven Network Manager and OpenVPN package files (which you've downloaded previously via a VPN service or Tor) to /home/user/nmo/ using your preferred method. Then run these commands in a Terminal window:

    user@ubuntu:~$ sudo dpkg -R -i /home/user/nmo
    user@ubuntu:~$ sudo apt-get install -f
    user@ubuntu:~$ sudo restart network-manager

The first command installs the packages, and the second command corrects errors caused by not installing them in the proper sequence. If the second and third commands complete without errors, you're good to go.

If the second command fails, the errors should tell you what package files are missing. Just get them through a private channel, add them to /home/user/nmo/ and rerun the previous three commands.

### Installing Direct-Connect VPN

First review your VPN credentials – certificates (\*.crt) and keys (\*.key) – and configuration files (\*.conf or \*.ovpn). Some VPN services provide configuration files with embedded credentials, with each of the credentials bracketed by corresponding [name] and [/name] tags. In that case, copy each of the credentials, and save as an appropriately-named text file. There may be as many as four credentials:

  * ca.crt
  * client.crt
  * client.key
  * ta.key

All of these files should be downloaded via HTTPS, and kept private. You might want to avoid providers that don't use HTTPS for this. Establishing a VPN connection may also require a username and password, which may differ from the account name and password for the VPN service's website. Some low-end services email connection username and password. In that case, immediately go to the provider's website, and change the password.

Virtually all VPN services provide a ca.crt (certificate authority) certificate. These certificates enable clients to verify the authenticity of VPN servers before connecting. Most VPN services also provide a client.crt (client certificate) and client.key (for unlocking and using the client certificate). Client certificates allow VPN servers to verify the authenticity of clients before accepting connections. A few high-end VPN services also provide a ta.key to enable TLS authentication, which [increases connection security][8].

You'll also need other information from the OpenVPN configuration file. First, you'll need to choose the VPN server that you'll be connecting to. Avoid the United States, United Kingdom and France. Germany and the Netherlands are OK. It's probably good to avoid Eastern Europe, Russia, China etc, which might attract attention. You'll need the IP address of the server, rather than the hostname, in order for VPN-Firewall (see below) to work properly. If you just have hostnames, you can get the IP address by running this command:

    user@ubuntu:~$ host hostname.that.you.have

Second, you'll need to know the server port number and connection type (UDP or TCP). It's generally best to use UDP (unless you're routing via Tor). You'll also need to know the cipher type (from the cipher ... line) and whether LZO compression should be enabled (if you see comp-lzo). If cipher type isn't specified, use the Network Manager default. For VPNs that provide ta.key, you'll need to know the key direction, which is the number at the end of the tls-auth line (typically 1).

Start the setup by copying all of the VPN credential files to /etc/openvpn. Open a Terminal window, and run these commands:

    user@ubuntu:~$ cd /home/user/path-to-the-files
    user@ubuntu:~$ sudo cp ca.crt client.crt client.key ta.key /etc/openvpn/

Of course, edit the second command for the files that you actually have.

Then open Network Manager, select the `VPN` tab, and click the `Add` button. Select OpenVPN as type, and click the `Create` button. Enter a short name for the connection, and the IP address of the server that you'll be accessing. The next steps depend on the configuration of the VPN service.

There are three common VPN-configuration setups. Some VPN services (such as Private Internet Access) provide only ca.key, and require username and password for connection. For them, select `Password` as authentication type, enter your username and password, and click the `CA Certificate` button. In the `Places` window, click `File System`. Double click `etc`, and then double click `openvpn`. Finally, select `ca.crt` and click `Open`.

Now click the `Advanced` button`. In the `General` tab, check `Use custom gateway port` and enter the appropriate port number. If appropriate, check `Use LZO data compression` (typical) and `Use a TCP connection` (rarely appropriate unless you're routing via Tor). If you know the cipher type, click `Cipher` in the `Security` tab, select the appropriate one, and click `OK`. Now click `Save` in the VPN window, and close Network Manager.

Some VPN services (such as AirVPN) provide ca.key, client.crt and client.key, but not ta.key, and don't require username and password for connection. For them, select `Certificates (TLS)` as authentication type, and then specify `User Certificate` (client.crt), `CA Certificate` (ca.crt) and `Private Key` (client.key) as described above. Then complete the same steps in the `Advanced` window as described above, save the VPN configuration, and close Network Manager.

Some VPN services (such as IVPN) provide ca.key, client.crt, client.key and ta.key, and also require username and password for connection. For them, select `Password with Certificates (TLS)` as authentication type, and enter your username and password. Then specify `User Certificate` (client.crt), `CA Certificate` (ca.crt) and `Private Key` (client.key) as described above. Complete the same steps in the `Advanced` window as described above. In the `TLS Authentication` window, check `Use additional TLS authentication`, and specify `Key File` (ta.key) and `Key Direction` (typically 1). Then save the VPN configuration, and close Network Manager.

### Installing and Checking VPN-Firewall

Install adrelanos' VPN-Firewall scripts as described at [https://github.com/adrelanos/VPN-Firewall][12]. You want the firewall (iptables rules) to load at bootup, so install both the firewall and init scripts. Reboot the machine, and check VPN-Firewall status by running `sudo service vpnfirewall status` in a Terminal window. It should reply ``.

If you've chosen the high-privacy option, now restore Internet connectivity to your new VM host. Then verify that your new machine has no Internet connectivity by trying to visit <https://duckduckgo.com/>. If it connects, there's something wrong with the VPN-Firewall setup.

Now use Network Manager to establish your direct-connect VPN connection, and verify that it works by visiting [https://www.dnsleaktest.com/][10]. If it doesn't connect, recheck the configuration. If it does connect, test VPN-Firewall by killing the openvpn process (run `sudo killall openvpn` in a Terminal window) and verifying that the machine has no Internet connectivity. Then use Network Manager to reestablish the VPN connection, and verify that it works again by visiting [https://www.dnsleaktest.com/][10].

Check your DNS servers by running the standard DNS leak test at [https://www.grc.com/dns/][11]. It should report only the DNS servers that your direct-connect VPN service specified. And it should not report any DNS servers associated with your ISP, or specified by your LAN router. If it does, there's something wrong with the VPN setup.

You can also check for leaks using Wireshark. To install Wireshark, open a Terminal window, and run these commands:

    user@ubuntu:~$ sudo apt-get update
    user@ubuntu:~$ sudo apt-get install wireshark

Then configure wireshark to allow a non-root user to sniff packets. As described [here][9], just run these commands in a Terminal window:

    user@ubuntu:~$ sudo dpkg-reconfigure wireshark-common
    user@ubuntu:~$ sudo adduser $USER wireshark

Reboot the machine, and establish your direct-connect VPN connection. Then open Wireshark, and start capturing on eth0. Use Firefox to check [https://www.dnsleaktest.com/][10], run the DNS test at [https://www.grc.com/dns/][11], etc. Now stop the capture, and run Statistics/Endpoints. You should only see only local non-public IPs and the VPN server that you're connected to.

Now kill the openvpn process (run `sudo killall openvpn` in a Terminal window) and start a fresh capture on eth0. Verify that Firefox can't see anything. The iptables setup blocks pings, by the way. Stop the capture after about 10 minutes, and run Statistics/Endpoints. You should only see traffic with local non-public IPs, and reconnection attempts from the VPN server that you were connected to.

Finally, reestablish your direct-connect VPN connection, and verify that it's working again.

### Viewing Network Manager OpenVPN Logs

If there are problems with the OpenVPN connection, it may help to have debugging information from Network Manager. Getting that takes a little work, however. First, you must edit its configuration file to maximize logging. Run the following command in a terminal window:

    user@ubuntu:~$ sudo nano /etc/NetworkManager/NetworkManager.conf

Add these two lines at the end of the file, after a blank line:

    [logging]
    level=DEBUG

Save the altered file by typing Ctrl-O, and exit nano by typing Ctrl-X. Then restart Network Manager by running the following command in a terminal window:

    user@ubuntu:~$ sudo service network-manager restart

Finally, connect the VPN using the Network Manager icon in the top panel bar. Wait until it either connects, or gives up. In order to see the openvpn connection log, run the following command in a terminal window:

    user@ubuntu:~$ grep nm-openvpn /var/log/syslog

### Completing the Installation

You're almost done. If desired, activate proprietary drivers and reboot. Then start Update Manager, download and install updates, and let the machine reboot.

Your VM host machine will have no Internet connectivity whenever it boots, given that VPN-Firewall is active and no VPN is running. That's arguably the best default, because you must actively choose how to proceed.

 [1]: https://packages.ubuntu.com/search?keywords=openvpn&searchon=names&suite=all&section=all
 [2]: https://packages.ubuntu.com/search?suite=all&section=all&arch=any&keywords=network-manager-openvpn-gnome&searchon=names
 [3]: https://packages.ubuntu.com/search?suite=all&section=all&arch=any&keywords=openconnect&searchon=names
 [4]: https://packages.ubuntu.com/search?suite=all&section=all&arch=any&keywords=libopenconnect5&searchon=names
 [5]: https://packages.ubuntu.com/search?suite=all&section=all&arch=any&keywords=network-manager-openconnect&searchon=names
 [6]: https://packages.ubuntu.com/search?suite=all&section=all&arch=any&keywords=liblzo2-2&searchon=names
 [7]: https://packages.ubuntu.com/search?suite=all&section=all&arch=any&keywords=libpkcs11-helper1&searchon=names
 [8]: https://community.openvpn.net/openvpn/wiki/SecurityOverview
 [9]: http://askubuntu.com/questions/74059/how-do-i-run-wireshark-with-root-privileges
 [10]: https://www.dnsleaktest.com/
 [11]: https://www.grc.com/dns/
 [12]: https://github.com/adrelanos/VPN-Firewall
