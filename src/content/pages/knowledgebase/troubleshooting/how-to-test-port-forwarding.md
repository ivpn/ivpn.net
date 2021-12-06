---
title: How to test port forwarding? - IVPN Help
h1: How to test port forwarding?
url: /knowledgebase/troubleshooting/how-to-test-port-forwarding/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 140
---
# How to test port forwarding?

If you would like to verify that port forwarding is working correctly you can use a tool called netcat which is great for debugging all kinds of network issues. It allows you to easily read and write data over a network socket. You will need two computers (or a second virtual machine) in order to run this test and have some basic experience using the command line.

In this guide we'll show you how to use netcat to send data between two computers where one is connected to the VPN. We will call the computer connected to the VPN 'computer A' and the one not connected 'computer B'. The test will send data from computer B over the Internet to the VPN server and then through the VPN tunnel to computer A. By doing this you can prove that port forwarding is working correctly.

You will need netcat installed on both computer A and computer B. Computer A and B do not need to be running the same operating system. Netcat should be preinstalled on macOS and is available via most Linux package managers e.g. 'sudo apt-get install netcat'. On Windows you will need to download [Netcat for Windows](http://joncraton.org/blog/46/netcat-for-windows/).

### On computer A

1.  Connect to the VPN.
2.  Navigate to the client area and note the port assigned to you e.g. 40197
3.  Note the IP address of the VPN server you are connected to using a website such as [dnsleaktest.com](https://www.dnsleaktest.com/).
4.  Type the command below to have netcat listen on the first available port using the example range above (if you are using Windows firewall you may be prompted to allow netcat to communicate with public networks which you must approve for the test to work).
    *   On linux & macOS:
        ```
        nc -l 40197
        ```
    *   On Windows:
        ```
        nc -l -p 40197
        ```

### On computer B (which is not connected to the VPN)

1.  Type the command below and press enter to connect to the VPN server on the IP address and port that you noted in steps 2 & 3 above. This will open a connection to netcat running on computer A.  
    ```
    nc 123.123.123.123 40197
    ```

2.  Type some characters and press 'enter' and you should see them echo'd on the screen on computer A.  
    ```
    Hello
    ```

Once you have concluded the test stop netcat by pressing 'control-c' on both computers.
