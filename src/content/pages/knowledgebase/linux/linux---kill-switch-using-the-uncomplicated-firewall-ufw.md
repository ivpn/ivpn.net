---
title: Linux - Kill-switch using the Uncomplicated Firewall (UFW) - IVPN Help
h1: Linux - Kill-switch using the Uncomplicated Firewall (UFW)
url: /knowledgebase/linux/linux---kill-switch-using-the-uncomplicated-firewall-ufw/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 70
---
# Linux - Kill-switch using the Uncomplicated Firewall (UFW)

<div markdown="1" class="notice notice--info">
We recommend using our <a href="/apps-linux/">Linux CLI app</a> that offers an easy-to-use built-in Firewall solution that protects you from both IP and traffic leaks. Read on, if you would like to have a more granular Firewall configuration or prefer to use NetworkManager or a different VPN client.
</div>

This guide shows you how to setup a firewall (similar to a 'kill switch') using the UFW to protect against packets leaking if the VPN fails for any reason.

1.  Start by installing UFW:

    ```
    # sudo apt-get update
    # sudo apt-get install ufw
    ```

2.  Enable UFW:

    ```
    # sudo ufw enable
    ```

3.  Block all outgoing traffic:

    ```
    # sudo ufw default deny outgoing
    ```

    ...and all incoming traffic:

    ```
    # sudo ufw default deny incoming
    ```

4.  Allow traffic through VPN tunnel:

    ```
    # sudo ufw allow out on tun0 from any to any
    # sudo ufw allow in on tun0 from any to any
    ```

5.  Choose the IVPN server you will be connecting to and make an exception for it in UFW.  
    Let's assume you choose Germany server. Navigate to the [Server Status page](/status/), find & resolve its domain name:

    ```
    # nslookup de1.gw.ivpn.net
    ```

    The output will be the IP addresses, which you need to specify in the UFW exception rule:

    ```
    # sudo ufw allow out from any to resolved.ip.address.here
    ```

    If you do not have or do not wish to use i.e. public DNS or the one provided by your ISP (skip this step if otherwise), update your hosts file accordingly:

    ```
    # echo "resolved.ip.address.here  de1.gw.ivpn.net" | sudo tee -a /etc/hosts
    ```

6.  You're done! In case you need to reset those rules and start anew:

    ```
    # sudo ufw reset
    ```

You can additionally disable IPv6:

```
# echo 'net.ipv6.conf.all.disable_ipv6=1' | sudo tee -a /etc/sysctl.conf
# echo 'net.ipv6.conf.default.disable_ipv6=1' | sudo tee -a /etc/sysctl.conf
# echo 'net.ipv6.conf.lo.disable_ipv6=1' | sudo tee -a /etc/sysctl.conf
# sudo sysctl -p
```

...and reverse those changes by editing /etc/sysctl.conf, and deleting those lines.
