---
title: Linux IPSec with IKEv2 Setup Guide
url: /setup/linux-ipsec-with-ikev2/
layout: setup
platform: linux
---
# Linux IPSec with IKEv2 Setup

The following Strogswan configuration is known to work:

1.  Create a config file in your strongswan `ipsec.d` directory e.g. `ivpn.conf` with the following

    ```
    conn ivpn
        keyexchange=ikev2
        right=gb.gw.ivpn.net
        rightid=gb.gw.ivpn.net
        rightsubnet=0.0.0.0/0
        rightauth=pubkey
        leftsourceip=%config
        leftauth=eap-mschapv2
        eap_identity=ivpnaccountID
        auto=start
        dpdaction=restart
    ```

    Change the right= and rightid= as appropriate for the server you want to connect to.  The `ivpnaccountID` is case-sensitive.

2.  Create a .secrets file e.g. ivpn.secrets in the strongswan ipsec.d directory e.g. ivpn.secrets with the following

    ```
    ivpnaccountID : EAP "ivpn"
    ```

    Note that there is a space either side of the colon `:`.

3.  Depending on your Linux distribution and version, you may need to download some or all of the following certificates and store them in files located in your strongswan ipsec.d/cacerts directory:  

    [https://letsencrypt.org/certs/letsencryptauthorityx3.pem.txt](https://letsencrypt.org/certs/letsencryptauthorityx3.pem.txt)  
    [https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem.txt](https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem.txt)  
    [https://letsencrypt.org/certs/trustid-x3-root.pem.txt](https://letsencrypt.org/certs/trustid-x3-root.pem.txt)  
    [https://letsencrypt.org/certs/isrgrootx1.pem.txt](https://letsencrypt.org/certs/isrgrootx1.pem.txt)  

4.  Tell strongswan to restart or reload it's config.
