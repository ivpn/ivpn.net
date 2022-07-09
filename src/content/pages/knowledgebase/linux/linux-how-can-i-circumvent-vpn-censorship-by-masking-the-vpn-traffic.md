---
title: Linux - How can I circumvent VPN censorship by masking the VPN traffic? - IVPN Help
h1: Linux - How can I circumvent VPN censorship by masking the VPN traffic?
url: /knowledgebase/linux/linux-how-can-i-circumvent-vpn-censorship-by-masking-the-vpn-traffic/
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

    If `python-dev` is not available, try `python2-dev`.

1.  Install Obfsproxy:

    ```
    pip install obfsproxy
    ```

    or
    ```
    pip2  install obfsproxy
    ```

1.  Generate an [OpenVPN configuration file](https://www.ivpn.net/openvpn-config) choosing **Protocol / Port** = any `TCP` port and **Hostnames or IP addresses** = `Use IP addresses`.  Choose whichever location and DNS setting you prefer and whicheven OpenVPN version your device supports.

1. Single-hop connections use TCP port `5145` for obfsproxy and the port in the generated file needs to adjusted.  Open the .ovpn configuration file from the generator with any text editor and change the port on line 4 to `5145`.

1.  In the same .ovpn file add the following lines in the bottom:

    ```
    socks-proxy-retry
    socks-proxy 127.0.0.1 1050
    route xx.xx.xx.xx 255.255.255.255 yy.yy.yy.yy
    ```

    Where "xx.xx.xx.xx" is the VPN server IP address from line 4 of the .ovpn file and "yy.yy.yy.yy" is the IP address of your default gateway, which can be identified by running the following command:

    ```
    ip route | grep default
    ```

1.  Save the changes, start Obfsproxy, and keep this Terminal window open:

    ```
    sudo obfsproxy obfs3 socks 127.0.0.1:1050
    ```

    or
    ```
    /path/to/obfsproxy obfs3 socks 127.0.0.1:1050
    ```

1.  Connect to IVPN with the Obfsproxy applied and keep this Terminal window open:

    ```
    sudo openvpn --config Servername.ovpn
    ```

1.  Press Ctrl+c inside each Terminal window to close the OpenVPN and obfsproxy connections when finished.


## Obfsproxy with Multi-hop

Follow step 3 above to generate an OpenVPN configuration file for the entry server location and make two changes to the generated file:

1. For Multi-hop, check the [server status page](https://www.ivpn.net/status), locate the exit server you wish to use, expand the server's details, and identify the **MultiHop Port**.  Add one to the port number, then replace the port number on line 4 of in the generated configuration file with the new port.

    For example, to exit in France using obfsproxy, use port `23402`.  To exit in Las Vegas, US, use port `26502`.

1. Locate the line in the generated configuration file that begins with `verify-x509-name`.  For a single-hop connection, the VPN server's `name-prefix` is listed, like `de` or `us-fl`.  This `name-prefix` needs to be changed to match the exit server.

    For example, if the generated configuration file uses an entry VPN server in Germany, the entry looks like `verify-x509-name de name-prefix` with `de` as the server name.  Change this to `verify-x509-name fr name-prefix` to exit in France or `verify-x509-name us-nv name-prefix` to exit in Las Vegas, US.

1. Complete step 5 above, then proceed to step 6 above to initiate the obfsproxy connection.
