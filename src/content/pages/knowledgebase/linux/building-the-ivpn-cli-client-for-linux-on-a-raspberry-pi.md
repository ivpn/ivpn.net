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
This was tested using <a href="https://www.raspberrypi.org/downloads/raspberry-pi-os/">Raspberry Pi OS May 2023 (bullseye)</a> and the <a href="https://github.com/ivpn/desktop-app">Official IVPN CLI Client version 3.10.15</a> for 32-bit and 64-bit systems.
</div>

1.  Install packages for compiling, building, and connecting:

    ```
    $ sudo apt install ruby ruby-dev ruby-full rpm curl git openvpn libiw-dev
    ```

2.  Install FPM:

    ```
    $ sudo gem install --no-document fpm
    Fetching ...
    ...
    Successfully installed fpm-1.15.1
    ```

3.  Determine the ARM architecture for your Raspberry Pi device:

    ```
    $ uname -m
    ```

    32-bit systems will be identfied with `armv6l` or `armv7l` and 64-bit systems with `aarch64`.

    Install the most recent version of Go via [https://golang.org/dl/](https://golang.org/dl/) for your device's architecture:

    ```
    $ wget https://go.dev/dl/go1.20.5.linux-arm64.tar.gz
    $ sudo tar -C /usr/local -xzf go1.20.5.linux-arm64.tar.gz
    $ rm -i go1.20.5.linux-arm64.tar.gz
    ```

    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> The IVPN Client requires Go version 1.18 or higher and the Raspberry Pi OS repositories include an older version of the golang package:
    <br><br>
    <code>$ apt-cache policy golang
    golang:
    Installed: (none)
    Candidate: 2:1.15~1
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
    $ echo $VER
    $ ./build.sh -v $VER
    ...
    ---------------------------
    DEB package...
    Created package {:path=>"ivpn_3.10.23_arm64.deb"}
    ---------------------------
    ...
    Copying compiled packages to '/home/pi/desktop-app/cli/References/Linux/_out_bin'...
    ```

6.  Install the new package:

    ```
    $ sudo apt install ./_out_bin/ivpn_3.10.23_arm64.deb
    ```

7. Check our [Command Line Client FAQ](/knowledgebase/general/command-line-client-faq/) for the next steps.
