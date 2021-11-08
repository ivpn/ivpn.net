---
title: WireGuard FAQ - IVPN Help
h1: WireGuard FAQ
url: /knowledgebase/general/wireguard-faq/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 480
---
# WireGuard FAQ

1.  #### What is WireGuard?
    WireGuard is a new VPN protocol that utilizes “state-of-the-art” cryptography. It was designed to be faster, simpler and considerably more performant compared to other VPN protocols. If you wish to learn more about it, visit the [WireGuard website](https://www.wireguard.com/).

2.  #### Which OS/Platforms are supported by WireGuard?
    WireGuard is available on our Windows, macOS, Linux, iOS & Android clients. 
    
    On desktop apps, WireGuard can be selected in the IVPN app's `Settings/Preferences` area - `Connection` tab. On mobile apps, navigate to `Settings` - `VPN Protocol` area.
    
    If you would like to configure WireGuard on a native WireGuard app or WireGuard client on your router, see our manual setup guides [here](/apps/).

3.  #### What cryptography is used in WireGuard?
    WireGuard utilizes the following [protocols and primitives](https://www.wireguard.com/protocol/):

    <div markdown="1" class="notice notice--info">
    <a href="http://cr.yp.to/chacha.html">ChaCha20</a> for symmetric encryption, authenticated with <a href="http://cr.yp.to/mac.html">Poly1305, using <a href="https://tools.ietf.org/html/rfc7539">RFC7539's AEAD construction</a><br>
    <a href="http://cr.yp.to/ecdh.html">Curve25519</a> for ECDH<br>
    <a href="https://blake2.net/">BLAKE2s</a> for hashing and keyed hashing, as described in <a href="https://tools.ietf.org/html/rfc7693">RFC7693</a><br>
    <a href="http://cr.yp.to/siphash/siphash-20120918.pdf">SipHash</a> for hashtable keys<br>
    <a href="https://eprint.iacr.org/2010/264">HKDF</a> for key derivation, as described in <a href="https://tools.ietf.org/html/rfc5869">RFC5869</a><br>
    <a href="https://www.wireguard.com/protocol/#key-exchange-and-data-packets">Noise_IK handshake</a> from <a href="http://noiseprotocol.org/noise.pdf">Noise</a>, building on the work of <a href="http://www.curvecp.org/">CurveCP</a>, <a href="http://cr.yp.to/highspeed/naclcrypto-20090310.pdf">NaCL</a>, <a href="http://research.microsoft.com/en-us/um/people/klauter/security_of_kea_ake_protocol.pdf">KEA+</a>, <a href="http://webee.technion.ac.il/~hugo/sigma-pdf.pdf">SIGMA</a>, <a href="https://eprint.iacr.org/2009/408.pdf">FHMQV</a>, and <a href="https://eprint.iacr.org/2010/638.pdf">HOMQV</a><br>
    All packets are sent over UDP
    </div>

4.  #### How resilient is a WireGuard connection?
    WireGuard is built for roaming. If your device changes networks, e.g. from Wi-Fi to a mobile/cellular, the connection will persist because as long as the client sends correctly authenticated data to our WireGuard VPN server, the server keeps the connection alive.

5.  #### What ports do you use for WireGuard?
    ```
    UDP 2049
    UDP 2050
    UDP 53
    UDP 30587
    UDP 41893
    UDP 48574
    UDP 58237
    ```

6.  #### What IP addresses are issued for WireGuard connections?
    The IP address is randomly assigned from `172.16.0.0/12` range.

7.  #### Which servers I can connect to with WireGuard?
    The full list of our WireGuard servers can be viewed on the [Servers](/status/) page.

8.  #### How many devices I can connect with WireGuard?
    2 on the Standard and 7 on the Pro plan.

9.  #### Do I need to manually create and add public key in the Client Area when adding a new device?
    When using our native clients for Windows, macOS, Linux, iOS & Android, public keys are generated automatically the moment you select WireGuard protocol. They can be viewed & regenerated directly from the ‘WireGuard’ section within the IVPN client Settings area & deleted in the [Client Area](/account/) - [WireGuard](/account/wireguard/) page.

    For Linux, keys can be obtained via the following command:

    ```
    $ wg genkey | tee privatekey | wg pubkey > publickey
    ```

10. #### What happens if I delete a public key?
    If you purposefully or accidentally deleted public keys from the Client Area, new keys will be automatically generated upon selecting the WireGuard protocol in the IVPN Client.

    In case the public key was deleted while your device was connected to one of the WireGuard servers, the IVPN Client will stay connected, however, you will have no internet access. You will need to disconnect and either relog into the IVPN client or click on the ‘Re-generate Keys’ button under the ‘WireGuard’ details/configuration area.

    Linux users can generate a new pair of keys via the following command:

    ```
    $ wg genkey | tee privatekey | wg pubkey > publickey
    ```

    Your new public key has to be manually added in the [Client Area](/account/) - [WireGuard](/account/wireguard/) page.

11. #### How do I verify that I am connected?
    Our website shows a connection status at the top of the page or inside the 'Menu' on mobile devices. There is a green 'Connected' or a red 'Disconnected' dot, which indicates your status. Another way to ensure that you are properly connected to IVPN is to simply visit the [dns leak test](https://www.dnsleaktest.com/) website. As long as you see the revealed location matches the selected IVPN server & the IP address is different to the one provided by your ISP - this gives you reasonable assurance that your traffic is routed through the VPN service.

12. #### Does Port Forwarding work with WireGuard?
    Port Forwarding cannot be used with WireGuard at this time.

13. Does WireGuard support IPv6?
    Yes.

14. #### Can I use Multi-hop with WireGuard?
    Yes.

15. #### What DNS server is used when connecting with WireGuard?
    We provide our own, secure and absolutely logless DNS server which is pushed and applied automatically to your device when you connect. The IP address of the standard DNS server is `172.16.0.1`. The AntiTracker DNS address is `10.0.254.2`. The AntiTracker's Hardcore Mode DNS address is `10.0.254.3`.
