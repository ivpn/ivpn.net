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
These instructions are not required when using the official <a href="/apps/">IVPN client</a>. Simply select the Multi-hop tab on the main screen. The Multi-hop feature is available in our Pro plan.
</div>

The Multi-hop network is compatible with any WireGuard and OpenVPN clients.

### WireGuard

Every WireGuard server has a unique port number reserved for Multi-hop connections which can be found on our [server status](/status/) page.

Choose an Exit-hop server for your Multi-hop connection and note its port number and public key.

![](/images-static/uploads/wireguard-multihop.jpg)

In your WireGuard config **[Peer]** section, **Endpoint** field, specify the hostname of the selected Entry-hop server with the noted previously port number and the public key of the Exit-hop server in the **PublicKey** field.

Below, is an example of the WireGuard multi-hop connection config with Entry server in Ukraine and Exit server in Austria:

>[Interface]<br>
>PrivateKey = *****<br>
>Address = 172.x.y.z/32, fd00:4956:504e:ffff::x.y.z/128<br>
>DNS = 172.16.0.1<br><p>
>[Peer]<br>
>PublicKey = 83LUBnP97SFpnS0y1MpEAFcg8MIiQJgW1FRv/8Mc40g=<br>
>AllowedIPs = 0.0.0.0/0, ::/0<br>
>Endpoint = ua.wg.ivpn.net:25601<br>
>PersistentKeepalive = 25

### OpenVPN

To use Multi-hop, you need to modify the IVPN Account ID you enter when connecting. You simply need to append an '@' symbol and a location code and your traffic will be routed through the specified exit location (regardless of which server you connect to).

For example, if you want your traffic to enter via the Romania server (ro.gw.ivpn.net) and exit via Switzerland, you would append **@ch** to your IVPN Account ID (e.g. **ivpnXXXXXXXX@ch** or **i-XXXX-XXXX-XXXX@ch**) and connect to Romania - that's it! If you connect to France with the same **@ch** IVPN Account ID,  the traffic will still exit in Switzerland.

To lookup the location codes, open the [server status](/status/) page. Note the server names are in the format XY.gw.ivpn.net where X is the location code and Y is a number uniquely identifying the server. Ignore the number (the entry server will automatically connect to the least loaded exit server) and use the code before the number. Below are some examples:

| Server | Location |
|---|---|
| ro1.gw.ivpn.net | ro |
| gb2.gw.ivpn.net | gb |
| us-nj1.gw.ivpn.net | 	us-nj |