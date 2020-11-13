---
title: Linux - How can I circumvent VPN censorship by masking the VPN traffic? - IVPN Help
h1: Linux - How can I circumvent VPN censorship by masking the VPN traffic?
url: /knowledgebase/linux/linux---how-can-i-circumvent-vpn-censorship-by-masking-the-vpn-traffic/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 90
---
# Linux - How can I circumvent VPN censorship by masking the VPN traffic?

In some countries (like China, Iran, Vietnam...), the government utilizes a very restrictive firewall and enforces local ISPs to throttle & block the VPN traffic via Deep Packet Inspection. You can workaround that with the help of Obfsproxy by masking the VPN traffic:

<div markdown="1" class="notice notice--info">
Our IVPN Linux client includes obfsproxy support. Check it out <a href="/apps-linux/">here</a>
</div>

1.  Install Python's pip tool:

    ```
    sudo apt-get install python2.7 python-pip python-dev build-essential
    ```

2.  Install Obfsproxy:

    ```
    pip install obfsproxy
    ```

3.  For Obfsproxy our servers listen to port TCP 5145. Open [.ovpn config file](/releases/config/ivpn-openvpn-config.zip) you use to connect with any text editor and adjust line 3 from `proto udp` to `proto tcp` & port in the line 4 from `2049` to `5145`.  
    Resolve the server name specified in line 4:

    ```
    nslookup xx.gw.ivpn.net 
    ```

    and replace `xx.gw.ivpn.net` with the IP address from the output.

3.  In the same .ovpn file add the following lines in the bottom:

    ```
    socks-proxy-retry
    socks-proxy 127.0.0.1 1050
    route xx.xx.xx.xx 255.255.255.255 yy.yy.yy.yy
    ```

    Where "xx.xx.xx.xx" - the resolved IP address from the previous step, & "yy.yy.yy.yy" - the IP address of your default gateway, which can be identified by running the following command:

    ```
    ip route | grep default
    ```

5.  Save the changes, start Obfsproxy, and keep this Terminal window open:

    ```
    sudo obfsproxy obfs3 socks 127.0.0.1:1050
    ```

6.  Connect to IVPN with the Obfsproxy applied and keep this Terminal window open:

    ```
    sudo openvpn --config Servername.ovpn
    ```

7.  Press Ctrl+c inside each Terminal window to close the OpenVPN and obfsproxy connections when finished.
