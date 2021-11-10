---
title: Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 6
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/advanced-privacy-and-anonymity-part-6/
section: Advanced
weight: 60
articles: [
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 7",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-7/"
  },
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 8",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-8/"
  }
]
date: 2013-10-23T12:39:07+00:00
layout: guides-details
---
## Creating pfSense® 2.2.6 VMs as VPN Clients

### Introduction

At this point, if you've followed [Setting Up Secure Host Machines](/privacy-guides/advanced-privacy-and-anonymity-part-4/), your new VM host machine can only access the Internet through your chosen direct-connect VPN service. If you've followed [Installing VirtualBox and Creating Linux VMs](/privacy-guides/advanced-privacy-and-anonymity-part-5/), you've created Linux workspace and LiveCD VMs. By default, their network adapters are NATed to the host machine, and they reach the Internet through your chosen direct-connect VPN service.

This tutorial covers creating pfSense® 2.2.6 (hereinafter `pfSense`) router/firewall VMs, configuring them as VPN clients, and testing for leaks using Wireshark. Your Linux workspace and LiveCD VMs will access the Internet through nested chains of these VPN gateway VMs and Tor gateway VMs, as discussed in [Planning Advanced VM and VPN Setup](/privacy-guides/advanced-privacy-and-anonymity-part-3/). Using Tor gateway VMs is covered in [Paying Anonymously with Cash and Bitcoins](/privacy-guides/advanced-privacy-and-anonymity-part-7/) and [Creating Nested Chains of VPNs and Tor](/privacy-guides/advanced-privacy-and-anonymity-part-8/).

> Note: I wrote this series in 2013, well over six years ago. Although I’ve updated stuff a few times since, it’s been a while. I’ll be doing a total rewrite soon, but that will take some time.
> 
> So anyway, pfSense has changed considerably since my last update. The basic approach still works, and I still use it. But much of this needs revised.

If you want the host machine to routinely access the Internet directly, you can create a pfSense VM client for your chosen direct-connect VPN service. You can use that in your nested VPN chains, instead of the VPN client on the host machine, and connect via the VPN client on the host machine only when you want to hide software downloads or whatever. However, if you've chosen the high-privacy option, it's crucial to continue using the host machine client for your direct-connect VPN.

### Create New VPN Account

Your VM host machine is still using your direct-connect VPN service. The first pfSense VPN-client VM that you create can use either that VPN service, or another that will connect through it. It's best to use a second VPN service for your first pfSense VM, in order to avoid leaks during the host-client to VM-client transition.

You'll need an account with another VPN provider. It's best to start with a free VPN service, because there's no money trail. There are bandwidth and usage limits, however. [Paying Anonymously with Cash and Bitcoins](/privacy-guides/advanced-privacy-and-anonymity-part-7/) covers methods for anonymously buying VPN services.

Although [SecurityKISS](http://www.securitykiss.com/) has a good free option, it does require an email address. But you can use free webmail accounts. The fastest (and perhaps most anonymous) option is [AnonBox](https://anonbox.net/) from the Chaos Computer Club. But accounts last at most one day, and are deleted after messages have been read. For persistent accounts, [VFEmail](https://vfemail.net/) is a good choice, because it only asks for a name.

It's OK to use the host machine (running the direct-connect VPN) for this. For better isolation, you could dedicate a Linux VM (possibly full-disk encrypted) for this and other sensitive work on the host machine. Once you have a client ID and password from SecurityKISS, download the OpenVPN configuration files for Linux.

### Creating & Configuring pfSense VM

Download `pfSense-LiveCD-2.1.5-RELEASE-amd64.iso.gz` from [pfSense's Coltex (Amsterdam, NL) mirror][1] to the host machine (using the direct-connect VPN) and extract the installer image.

Create a pfSense VM, basically as described for Linux VMs in Installing VirtualBox and Creating Linux VMs.

  1. Select BSD as the OS, and FreeBSD (64 bit) as the version.
  2. Specify 512MB memory.
  3. Create a new hard disk using the defaults (VDI, dynamically allocated, 2GB) and finish.
  4. Then tweak the settings. Change the boot order to Hard Disk, CD/DVD and enable PAE/NX.
  5. Add the installer image to the virtual CD/DVD drive.
  6. Disable audio and USB support.
  7. Leave the default network adapter «Adapter 1» attached to NAT (host) and don't change advanced settings. If this VM will connect through another pfSense VPN-gateway VM, however, attach this adapter to its internal network.
  8. Add a second network adapter «Adapter 2» and attach it to an internal network named, for example, pfS-SK (but don't change advanced settings).
  9. Start the pfSense VM. In the console window, hit `1` to boot, and then hit `i` to start the installer.
 10. On the `Configure Console` screen, select `Accept these Settings`.
 11. On the `Select Task` screen, select `Quick/Easy Install`.
 12. Under `Are you SURE?`, select `OK`. Wait a while.
 13. On the `Install Kernel(s)` screen, select `Standard kernel`.
 14. On the `Reboot` screen, select `Reboot`.
 15. While it's rebooting, using the `Devices | CD/DVD Devices` menu at the top, select `Remove disk from virtual drive`. To speed booting, you can hit `F1` and then `1` in the console. Then wait for pfSense to finish booting.

Edit the settings for the LiveCD VM, attaching the network adapter «Adapter 1» to the same internal network as the new pfSense VM (for example, `pfS-SK`). Then start the LiveCD VM, and download your OpenVPN configuration files for Linux from SecurityKISS. Don't visit any other websites, to mitigate tracking risk. If necessary, you could also access your initial download (above) via shared folders, but that would require installing VirtualBox Guest Additions.

Freshly installed, pfSense routes all outbound connections (from computers on its LAN) through its WAN. But it blocks all new inbound connections from WAN, allowing only those that were established from LAN. If the LiveCD VM can't see the Internet, recheck your host and the pfSense VM settings.

#### Configuring pfSense and Creating VPN Client

Now browse to the WebGUI at <https://192.168.1.1> and create a server certificate exception. Login as `admin` with password `pfsense`, and complete the setup wizard. Decline the Gold support option, unless you have an anonymous credit/debit card. The next screen asks for DNS servers that pfSense should use internally, and whether to `[a]llow DNS servers to be overridden by DHCP/PPP on WAN`. I prefer to hard code DNS servers. Using DNS servers pushed by WAN can also be OK, but there are two risks. First, it may not work for some VPN combinations in nested VPN chains. Second, there is the risk that pfSense will end up using your ISP's DNS servers (if they've been passed along to pfSense WAN). Even so, as long as you specify DNS servers in `Services: DHCP server`, the DNS servers that pfSense uses internally will not be pushed to DHCP clients (that is, your workspace VM, and other gateway VMs that connect through this one).

I recommend specifying reliable third-party DNS servers, such as those listed by [WikiLeaks][2] or [JonDoNYM](https://anonymous-proxy-servers.net/wiki/index.php/Censorship-free_DNS_servers). If you've chosen the high-privacy option, you could specify DNS server(s) pushed by your direct-connect VPN service, or allow DNS servers to be overridden by DHCP on WAN. The key points are: 1) avoid using DNS servers pushed by your ISP; and 2) avoid using the same DNS servers at multiple levels of your VPN chain.

Accept the default timeserver and timezone, and hit `Next`. On the WAN screen, accept defaults, except for unchecking `Block private networks` and `Block bogon networks`, and hit `Next`. Accept all defaults on the LAN screen, and hit `Next`. Set a strong password on the next screen, and let pfSense reload. Now you're at the pfSense WebGUI Dashboard. It's best to reboot pfSense before proceeding. In the pfSense VM console window, reboot by entering `5` and then `y` to confirm.

Before creating an iVPN client, tweak pfSense settings. In `System: General Setup`, check “Do not use the DNS Forwarder as a DNS server for the firewall”, and save. That prevents propagation of DNS server specifications through pfSense. In the webGUI in `System: Advanced: Networking`, uncheck “Allow IPv6″ and check “Prefer to use IPv4 even if IPv6 is available”, and save. In `System: Advanced: Miscellaneous`, check `Skip rules when gateway is down`. That provides backup protection against leaks to WAN if the iVPN connection goes down. Now reboot pfSense again, from the console, by entering `5` and then `y` to confirm.

Although I have never seen outbound traffic use the WAN interface when a VPN is down, pfSense documentation does say this: “By default, when a rule has a specific gateway set and this gateway is down, a rule is created and traffic is sent to the default gateway. This option overrides that behavior and the rule is not created when gateway is down, so instead of flowing via the default gateway, the traffic will continue to attempt to use the gateway that is in a down state, and it will most likely not proceed. This is useful if you have traffic that should only ever use one specific WAN and never flow over any other WAN, regardless of how the firewall’s routing table has for the default route.”

For `normal` network setups, it's important to specify good DNS servers, and to minimize the need for hard coding. In such cases, it's best to allow system DNS servers to be overridden by DHCP/PPP on WAN, and to enable DNS forwarding. That allows DNS server specifications to transparently propagate through complex networks of pfSense routers. However, in nesting VPNs using pfSense VMs, it's crucial to use different DNS servers at each level. Using the same DNS servers across levels would be a serious information leak.

Review the `Setting Up VPN on Linux Workstation VM` section of [Basic Setup Using VMs, VPNs and Tor](/privacy-guides/advanced-privacy-and-anonymity-part-2/). Then, in the pfSense WebGUI Dashboard, go to `System: Certificate Authority Manager`. Add `ca.crt` in the `CAs` tab. If you have `client.crt` and `client.key`, add them in the `Certificates` tab.

Go to VPN: OpenVPN: Client and hit the `+` icon to create a client. The specifics depend on what the OpenVPN server supports, and what it expects from its clients. Use an OpenVPN configuration file (with extension .conf or .ovpn) from the service as a guide. In particular, note the server address and port, and the encryption algorithm. In chaining VPNs, it's simpler to use IP addresses, rather than hostnames, although reliability may be lower (because you've broken failover for the VPN service).

For SecurityKISS, accept the defaults in `VPN: OpenVPN: Client` setup, except as noted:

Server host or address: 46.165.197.1 or 46.165.221.230 or 62.75.181.139 (Germany)
  
Server port: 123
  
Server host name resolution: enable (check) `Infinitely resolve server`
  
TLS Authentication: disable (uncheck) `Enable authentication of TLS packets.`
  
Client Certificate: client
  
Encryption algorithm: BF-CBC (128-bit)
  
Compression: enable (check) `Compress tunnel packets using the LZO algorithm.`
  
Advanced: remote-cert-tls server;verb 5

VPN services generally authenticate using either username and password, or `client.crt` and `client.key`. As noted above, SecurityKISS uses `client.crt` and `client.key`. But iVPN uses only username and password. A few VPN services use both. It's unlikely that they would use no authentication.

If username and password are required, enter them under User Authentication Settings. For VPN services that use only username and password, such as iVPN, use `None (Username and Password required)` for `Client Certificate`. If there's no authentication, instead use `webConfigurator default`.

Many services, such as IVPN, use TLS authentication with a shared key. Under `TLS Authentication`, leave `Enable authentication of TLS packets.` checked, but disable (uncheck) `Automatically generate a shared TLS authentication key`. Then paste `ta.key` in the text box.

For iVPN, enter the following in the `Advanced` box:

    persist-tun;persist-key;persist-remote-ip;tls-cipher TLS-DHE-RSA-WITH-AES-256-CBC-SHA:TLS-DHE-DSS-WITH-AES-256-CBC-SHA:TLS-RSA-WITH-AES-256-CBC-SHA;ns-cert-type server;verify-x509-name de name-prefix

Save the client configuration, and check `Status: OpenVPN`. The status should be `up`. Then check `Status: System logs: OpenVPN`. You should see `Initialization Sequence Completed` near the bottom. A few lines above, you should see a line that starts (after the timestamp) with `PUSH: Received control message ...`. If you don't see `redirect-gateway def1` in that line, edit the `VPN: OpenVPN: Client` setup, and add `redirect-gateway def1;` to the `Advanced` text box. If the VPN isn't connecting, look for errors in `Status: System logs: OpenVPN`. You may need to tweak the `Advanced` string by adding other options from the service's configuration file. If you see it complain about cipher mismatch, use the one it wants in your client configuration.

Once the VPN is connecting, check `Status: System logs: OpenVPN` again, find the `PUSH: Received control message ...` line, and look for `dhcp-option DNS server` followed by an IP address. Then go to `Services: DHCP server`, and specify that IP address as `DNS server`. That works for most VPN services. But if it doesn't, which you'll discover soon, you'll need to instead use third-party DNS servers, such as those from WikiLeaks or JonDoNYM. However, do not use any of the ones that you used above in the setup wizard (which appear in `System: General Setup`) because you don't want to `short-circuit` VPN anonymity by using the same DNS server(s) for both entry and exit traffic.

At this point, pfSense is not routing anything through iVPN, and your LiveCD VM has no Internet connectivity. That's normal. Don't worry. Go to `Interfaces: Assign network ports`, and hit the `+` icon to add `OPT1`. Then go to `Interfaces: OPT1`, enable it, rename it as `SKISS` or whatever, save and apply changes. In `Firewall: NAT: Outbound`, select `Manual Outbound NAT rule generation`, save, and then apply changes. In the same tab, edit each of the four rules (two for localhost to WAN, and two for LAN to WAN). For each rule, click the `e` icon at the right, and use the toggle to change the `Interface` from `WAN` to SKISS (or whatever you've named it). Then hit the `Apply Changes` button.

In `Firewall: Rules: LAN`, edit the existing rule `Default allow LAN to any rule`. Using the `Gateway` toggle in the lower `Advanced features` section, select SKISS as gateway. Rename the rule as `Allow LAN to any rule via SKISS` and save. In the rule list, it should look like `<code>* LAN net * * * SKISS_VPNV4 none</code>`. Also edit the existing rule for IPv6 traffic. At the top, toggle `Action` from `Pass` to `Block`, and rename it as `Block LAN IPv6 to any rule`. Then apply changes.

Back in the pfSense VM console window, reboot by entering `5` and then `y` to confirm. After bootup, there should be an IP address after `ovpnc1`. If it shows `NONE`, hit enter once or twice. If it still shows `NONE`, recheck the pfSense configuration using the WebGUI. Start by looking for errors in `Status: System logs: OpenVPN`. It's also possible that the direct-connect VPN connection has gone MIA. Check for that, and reconnect if necessary.

At this point, all outbound traffic from LAN will use the VPN gateway (SKISS or whatever) rather than the WAN gateway. Browse <http://whatismyipaddress.com> or another such site. The IP address should match the iVPN exit server for the route that you’re using. It may take a minute or two for the routing to stabilize.

There are two straightforward tweaks that help prevent leaks. First, in `System: Routing: Gateways`, edit the VPN gateway. Check `Default Gateway` to set, save, and then apply changes. Second, in `System: General Setup`, set the gateway for all DNS servers listed there as WAN. This is necessary because the VPN is now the default gateway. You might think that this setup would prevent the VPN link from coming up, but it doesn't.

By default in pfSense, all outbound traffic is allowed on WAN. However, it is more secure to specify the hosts that pfSense can connect to via WAN, and to block everything else. This is rather more complicated, because one must use aliases. Using aliases in restricting outbound traffic on WAN is necessary because there can be multiple values, and because hosts may be specified by hostname, rather than by IP address. If this is your first pfSense setup, it's best to verify that pfSense is working properly before attempting these steps.

Aliases are needed for four types of outbound traffic: 1) the DNS server IPs specified in `System: General Setup`; 2) the pfSense NTP server hostname specified in `System: General Setup`; 3) the OpenVPN server hostname or IP specified in `OpenVPN: Client`; and 4) the pfSense servers needed for updating. In `Firewall: Aliases: IP`, create four aliases, using the `+` button to add the values:

{{< raw-html >}}
<table class="table--data">
  <tr>
    <th>
      Name
    </th>
    <th>
      Values
    </th>
    <th>
      Description
    </th>
  </tr>
  <tr>
    <td>
      dnssvr
    </td>
    <td>
      1.2.3.4 5.6.7.8 ...
    </td>
    <td>
      DNS server IP addresses
    </td>
  </tr>
  <tr>
    <td>
      ntpsvr
    </td>
    <td>
      0.pfsense.pool.ntp.org
    </td>
    <td>
      default pfSense NTP server
    </td>
  </tr>
  <tr>
    <td>
      vpnsvr
    </td>
    <td>
      vpn.entry.server.net
    </td>
    <td>
      OpenVPN server hostnames or IP addresses
    </td>
  </tr>
  <tr>
    <td>
      update
    </td>
    <td>
      www.pfsense.org updates.pfsense.org
    </td>
    <td>
      pfSense update server
    </td>
  </tr>
</table>
{{< / raw-html >}}

Using these aliases, you then add rules for the WAN interface to pass necessary outbound traffic, and then a final rule to block everything else. In `Firewall: Rules: WAN`, create these rules, specifying `Single host or address` for the pass rules:

{{< raw-html >}}
<table class="table--data">
  <tr>
    <th>
      Action
    </th>
    <th>
      TCP/IP Version
    </th>
    <th>
      Protocol
    </th>
    <th>
      Source
    </th>
    <th>
      Port
    </th>
    <th>
      Destination
    </th>
    <th>
      Port
    </th>
    <th>
      Gateway
    </th>
    <th>
      Queue
    </th>
    <th>
      Description
    </th>
  </tr>
  <tr>
    <td>
      pass
    </td>
    <td>
      IPv4
    </td>
    <td>
      TCP/UDP
    </td>
    <td>
      WAN address
    </td>
    <td>
      *
    </td>
    <td>
      dnssvr
    </td>
    <td>
      *
    </td>
    <td>
      *
    </td>
    <td>
      none
    </td>
    <td>
      Allow to DNS server(s)
    </td>
  </tr>
  <tr>
    <td>
      pass
    </td>
    <td>
      IPv4
    </td>
    <td>
      UDP
    </td>
    <td>
      WAN address
    </td>
    <td>
      *
    </td>
    <td>
      ntpsvr
    </td>
    <td>
      *
    </td>
    <td>
      *
    </td>
    <td>
      none
    </td>
    <td>
      Allow to NTP server
    </td>
  </tr>
  <tr>
    <td>
      pass
    </td>
    <td>
      IPv4
    </td>
    <td>
      TCP/UDP
    </td>
    <td>
      WAN address
    </td>
    <td>
      *
    </td>
    <td>
      vpnsvr
    </td>
    <td>
      *
    </td>
    <td>
      *
    </td>
    <td>
      none
    </td>
    <td>
      Allow to OpenVPN server
    </td>
  </tr>
  <tr>
    <td>
      pass
    </td>
    <td>
      IPv4
    </td>
    <td>
      TCP/UDP
    </td>
    <td>
      WAN address
    </td>
    <td>
      *
    </td>
    <td>
      update
    </td>
    <td>
      *
    </td>
    <td>
      *
    </td>
    <td>
      none
    </td>
    <td>
      Allow to pfSense update server
    </td>
  </tr>
  <tr>
    <td>
      block
    </td>
    <td>
      IPv4
    </td>
    <td>
      *
    </td>
    <td>
      WAN address
    </td>
    <td>
      *
    </td>
    <td>
      *
    </td>
    <td>
      *
    </td>
    <td>
      *
    </td>
    <td>
      none
    </td>
    <td>
      Block all other IPv4
    </td>
  </tr>
  <tr>
    <td>
      block
    </td>
    <td>
      IPv6
    </td>
    <td>
      *
    </td>
    <td>
      WAN address
    </td>
    <td>
      *
    </td>
    <td>
      *
    </td>
    <td>
      *
    </td>
    <td>
      *
    </td>
    <td>
      none
    </td>
    <td>
      Block all IPv6
    </td>
  </tr>
</table>
{{< / raw-html >}}

Then reboot from the console window, by entering `5` and then `y` to confirm.

Once the pfSense VPN-client VM is working properly, edit the settings for the workstation VM that will be using it. Attach its network adapter (`Adapter 1`) to the internal network that's attached to the pfSense VM's LAN adapter. Then start the workstation VM, and browse <http://whatismyipaddress.com>. The IP address should match the OpenVPN server that you're using.

If the site doesn't load, open a terminal and run `ping 4.2.2.2`. If you get no responses, recheck the VPN connection using the pfSense WebGUI. If `Status: OpenVPN` shows that it's up, it's probably DNS resolution that's not working. Edit `Services: DHCP server` and specify reliable third-party DNS servers. But make sure not to use any of the DNS servers that you're already using for the host machine, the direct-connect VPN, or pfSense itself (as specified in `System: General Setup`).

Next, check your DNS servers by running the standard DNS spoofability test at <https://www.grc.com/dns/> in the workstation VM. It should report only the DNS server(s) that you have specified in pfSense under `Services: DHCP server`. If it reports others, there's something wrong with the pfSense setup.

### Leak Testing with Wireshark

After reviewing the section on installing and using Wireshark at the end of [Basic Setup Using VMs, VPNs and Tor](/privacy-guides/advanced-privacy-and-anonymity-part-2/), install Wireshark and configure it on the workstation VM that you're using. Then reboot the workstation VM. Also start the LiveCD VM. Both should be attached to the internal network that's attached to the pfSense VM's LAN adapter.

In testing for leaks, you'll be capturing on the WAN interface in pfSense (using the WebGUI via the LiveCD VM), and also on eth0 in both the host machine and the workstation VM. If everything is working properly, you should see only traffic with the direct-connect VPN server on host eth0, and only traffic with the indirect-connect VPN server on pfSense WAN. On workstation eth0, you should see traffic with whatever websites that you use while testing.

In order to analyze the pfSense WAN capture with Wireshark, you'll need to copy the capture file from the LiveCD VM to the host. And, in order to do that, you'll need to (temporarily) install guest additions in the LiveCD VM, and create a temporary shared folder for the LiveCD VM, as explained in the `Creating Diskless Linux LiveCD VM` section of [Installing VirtualBox and Creating Linux VMs](/privacy-guides/advanced-privacy-and-anonymity-part-5/). Alternatively, you can (temporarily) install and configure Wireshark in the LiveCD VM.

To begin the leak test, first go to `Diagnostics: Packet Capture` in the WebGUI for the pfSense VPN-client VM, which you're accessing on the LiveCD VM. Accept the defaults for capturing on WAN, but specify `` for `Count` (to set no limit). Then open Wireshark on both the host machine and workstation VM. You'll be capturing on eth0 in both. Now start all three captures.

On the workstation VM, use Firefox to check <http://whatismyipaddress.com>, run the DNS test at <https://www.grc.com/dns/>, and browse for a while. After 10-20 minutes, stop all three captures, and save the pfSense capture on the LiveCD VM to the temporary shared folder on the host (unless you're also running Wireshark in the LiveCD VM).

Run Statistics/Endpoints on all three captures, using Wireshark in the host (or LiveCD VM) for the pfSense capture. You should see only local IPs and the direct-connect VPN server on host eth0, only local IPs and the indirect-connect VPN server on pfSense WAN, and both local IPs and remote IPs used in testing on workstation eth0.

Now go to `Diagnostics: Command prompt` in the pfSense WebGUI that you're accessing on the LiveCD VM. In the box under `Execute Shell command`, enter `killall openvpn` and hit `Execute`. Then start all three captures as explained above. Verify that Firefox on the workstation VM can't see anything, and that pinging the IP address of your VPN server etc fails. After 10-20 minutes, stop all three captures, and save the pfSense capture on the LiveCD VM to the shared folder as above.

Run Statistics/Endpoints on all three captures. You should see only local IPs and the direct-connect VPN server on host eth0. On pfSense WAN, you should only see traffic with local IPs, and perhaps reconnection attempts **from** the indirect-connect VPN server that you were connected to. On workstation eth0, you should see only local IPs and connection attempts for whatever sites that you use while testing.

Finally, go to the pfSense console window, and reboot by hitting `5` and `y`. On the workstation VM, check <http://whatismyipaddress.com> to verify that it's all working again.

That's it.

 [1]: http://files.nl.pfsense.org/mirror/downloads/
 [2]: https://www.wikileaks.org/wiki/Alternative_DNS
