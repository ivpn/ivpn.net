---
title: Building the IVPN CLI Client for Linux on a Raspberry Pi - IVPN Help
h1: Building the IVPN CLI Client for Linux on a Raspberry Pi
url: /knowledgebase/linux/building-the-ivpn-cli-client-for-linux-on-a-raspberry-pi/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 11
---
# Building the IVPN CLI Client for Linux on a Raspberry Pi

<div markdown="1" class="notice notice--info">
This was tested using <a href="https://www.raspberrypi.org/downloads/raspberry-pi-os/">Raspberry Pi OS May 2021</a> and the <a href="https://github.com/ivpn/desktop-app">Official IVPN CLI Client version 3.3.20</a> on a 32-bit Raspberry Pi device (armv7l).
</div>

1.  Install packages for compiling, building, and connecting:

    ```
    $ sudo apt install ruby ruby-dev ruby-full rpm curl git openvpn obfs4proxy libiw-dev
    ```

    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> Install <a href="https://www.wireguard.com/install/">WireGuard</a> as required.
    </div>

2.  Install FPM:

    ```
    $ sudo gem install --no-document fpm
    Fetching ...
    ...
    Successfully installed fpm-1.13.1
    ```

3.  Determine the ARM architecture for your Raspberry Pi device:

    ```
    $ uname -m
    ```

    Install the most recent version of Go via [https://golang.org/dl/](https://golang.org/dl/) for your device's architecture:

    ```
    $ wget https://golang.org/dl/go1.16.6.linux-armv6l.tar.gz
    $ sudo tar -C /usr/local -xzf go1.16.6.linux-armv6l.tar.gz
    $ rm -i go1.16.6.linux-armv6l.tar.gz
    ```

    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> The IVPN Client requires Go version 1.13 or higher and the Raspberry Pi OS repositories include an older version of the golang package:
    <br><br>
    <code>$ apt-cache policy golang
    golang:
    Installed: (none)
    Candidate: 2:1.11~1+b6
    </code>
    </div>

4.  Add Go to the `$PATH` and define the `$GOPATH` variable by adding two lines to the bottom of `~/.profile`, then source the file:

    ```
    $ echo -e "\n\nPATH=$PATH:/usr/local/go/bin\nGOPATH=$HOME/go" >> ~/.profile
    $ source ~/.profile
    ```

    Verify the changes and add the `$GOPATH` folder:

    ```
    $ which go
    /usr/local/go/bin/go
    $ mkdir -v $GOPATH
    mkdir: created directory '/home/pi/go'
    ```

5.  Follow the build instructions for the Linux base package (daemon + CLI) from the IVPN App's [GitHub page](https://github.com/ivpn/desktop-app#compilation_linux_daemon):

    ```
    $ git clone https://github.com/ivpn/desktop-app.git
    $ cd desktop-app/cli/References/Linux/
    $ CL="https://raw.githubusercontent.com/ivpn/desktop-app/master/CHANGELOG.md"
    $ VER=$(curl -s $CL | grep "## Version" | head -n 1 | awk '{ print $3 }')
    $ ./build.sh -v $VER
    ...
    ---------------------------
    DEB package...
    Created package {:path=>"ivpn_3.3.20_armhf.deb"}
    ---------------------------
    ...
    Copying compiled packages to '/home/pi/desktop-app/cli/References/Linux/_out_bin'...
    ```

6.  Install the new package:

    ```
    $ sudo apt install ./_out_bin/ivpn_3.3.20_armhf.deb
    ```

7. Check our [Command Line Client FAQ](/knowledgebase/general/command-line-client-faq/) for the next steps.
