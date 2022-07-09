---
title: How can I connect to the Multi-hop network? - IVPN Help
h1: How can I connect to the Multi-hop network?
url: /knowledgebase/general/how-can-i-connect-to-the-multihop-network/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 170
---
# How can I connect to the Multi-hop network?

<div markdown="1" class="notice notice--info">
These instructions are not required when using the official <a href="/apps/">IVPN client</a>. Simply select the Multi-hop tab on the main screen.<br></br>
The Multi-hop feature is available in our Pro plan and can be used with any WireGuard and OpenVPN clients.<br></br>
Entry and Exit-hop servers must be in different countries.
</div>

Multi-hop-ready config files for WireGuard can be generated in the [Client Area](/account/wireguard-config). OpenVPN config file generator is available [here](/openvpn-config). Read on if you prefer to create configuration file manually  or simply want to understand how our port based Multi-hop solution works.

Every server has a unique port number reserved for Multi-hop connections which can be found on our [server status](/status/) page.

![](/images-static/uploads/wireguard-multihop.jpg)

Choose the Exit-hop server for your Multi-hop connection, note its **Multi-hop Port** number, **Public key** and follow the instructions relevant to the VPN protocol you use below:

### WireGuard

In your WireGuard config '**[Peer]**' section, specify the **Entry-hop server hostname** with the **Exit-hop server Multi-hop port** separated with a colon in the '**Endpoint**' field, and the **Exit-hop server Public key** in the '**PublicKey**' field.

*Endpoint = [Entry-hop server address]**:**[Exit-hop server Multi-hop port]<br>
PublicKey = [Exit-hop server Public Key]*

Below, is an example of the WireGuard Multi-hop connection config with Entry server in Ukraine and Exit server in Austria:

>[Interface]<br>
>PrivateKey = *****<br>
>Address = 172.x.y.z/32, fd00:4956:504e:ffff::x.y.z/128<br>
>DNS = 172.16.0.1<br><p>
>[Peer]<br>
>PublicKey = 83LUBnP97SFpnS0y1MpEAFcg8MIiQJgW1FRv/8Mc40g=<br>
>AllowedIPs = 0.0.0.0/0, ::/0<br>
>Endpoint = ua1.wg.ivpn.net:25601<br>
>PersistentKeepalive = 25

### OpenVPN

1. [Download](/openvpn-config) and open the .ovpn config file with the location of the **Entry-hop server** using any text editor
2. Replace port number in line 4 (*remote xx.gw.ivpn.net <u>**2049**</u>*) with the **Exit-hop server Multi-hop port**
3. Replace the location code in line 16 (*verify-x509-name <u>**XX**</u> name-prefix*) with the **Exit-hop server location code**

To lookup the location codes, open the [server status](/status/) page. Note the server names are in the format XY.gw.ivpn.net where X is the location code and Y is a number uniquely identifying the server. Ignore the number and use the code before it:

| Server | Location code|
|---|---|
| at1.gw.ivpn.net | **at** |
| ua1.gw.ivpn.net | **ua** |
| us-nj1.gw.ivpn.net | 	**us-nj** | 

Below, is an example of the OpenVPN Multi-hop connection config file with Entry server in Ukraine and Exit server in Austria:

![](/images-static/uploads/openvpn-multihop.png)

### Obfsproxy (via OpenVPN)

Obfsproxy changes the way the VPN packets look and can offer a way through restrictive networks.  Follow all of the step for OpenVPN above with two changes: choose a TCP port in the configuration generator and add one to the **MultiHop Port** number from the [server status](/status/) page.

For example, to exit in Austria using obfsproxy, use port `25602` (instead of `25601` for standard Multi-hop).
