---
title: Building the IVPN CLI Client for Linux on a Raspberry Pi - IVPN Help
h1: Building the IVPN CLI Client for Linux on a Raspberry Pi
url: /knowledgebase/linux/building-the-ivpn-cli-client-for-linux-on-a-raspberry-pi/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 140
---
# Building the IVPN CLI Client for Linux on a Raspberry Pi

<div markdown="1" class="notice notice--info">
This was tested using <a href="https://www.raspberrypi.org/downloads/raspbian/">Raspbian Buster February 2020</a> and the <a href="https://github.com/ivpn/desktop-app-cli/">Official IVPN CLI Client version 2.12.0</a> and <a href="https://www.raspberrypi.org/downloads/raspberry-pi-os/">Raspberry Pi OS May 2020</a> and the <a href="https://github.com/ivpn/desktop-app-cli/">Official IVPN CLI Client version 2.12.5</a>.
</div>

1.  Install packages for compiling, building, and connecting:

    ```
    $ sudo apt install ruby ruby-dev ruby-full rpm curl git openvpn obfsproxy
    ```

    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> Install the <a href="https://www.wireguard.com/install/">WireGuard</a> package as required.
    </div>

2.  Install FPM:

    ```
    $ sudo gem install --no-document fpm
    Fetching ...
    ...
    Successfully installed fpm-1.11.0
    ```

3.  Install the most recent version of Go via [https://golang.org/dl/](https://golang.org/dl/) for the ARMv6 architecture:

    ```
    $ wget -O go1.14.2.linux-armv6l.tar.gz https://dl.google.com/go/go1.14.2.linux-armv6l.tar.gz
    $ sudo tar -C /usr/local -xzf go1.14.2.linux-armv6l.tar.gz
    $ rm -i go1.14.2.linux-armv6l.tar.gz
    ```

    <div markdown="1" class="notice notice--info">
    <strong>Note:</strong> Our IVPN Client requires Go version 1.13 or higher and the Raspbian repositories include an older version of the golang package:
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

5.  Follow these steps for building the [Official IVPN Client for Linux](https://github.com/ivpn/desktop-app-cli#installation).

    1.  Set the `$GOPATH` variable to your projects folder:

        ```
        $ export GOPATH=$HOME/go
        ```
    
    2.  Create the folder structure:

        ```
        $ cd $GOPATH
        $ mkdir -p src/github.com/ivpn
        ```
    
    3.  Clone the CLI project repository:

        ```
        $ cd $GOPATH/src/github.com/ivpn
        $ git clone https://github.com/ivpn/desktop-app-cli.git
        ```
    
    4.  Clone daemon project repository:

        ```
        $ cd $GOPATH/src/github.com/ivpn
        $ git clone https://github.com/ivpn/desktop-app-daemon.git
        $ cd desktop-app-daemon
        $ git checkout 49db2f3
        ```

        Note: desktop-app-daemon version 2.12.5 = git tag 49db2f3
    

    5.  Compile the code and build a .DEB package:

        ```
        $ cd $GOPATH/src/github.com/ivpn/desktop-app-cli
        $ References/Linux/build-packages.sh -v 2.12.0
        ...
        ---------------------------
        DEB package...
        ...
        Created package {:path=>"ivpn_2.12.0_armhf.deb"}
        ---------------------------
        ```

    6.  Packages can be found in `$GOPATH/src/github.com/ivpn/desktop-app-cli/References/Linux/_out_bin/`.

        ```
        $ export GOPATH=$HOME/go
        ```

6.  Install the new package:

    ```
    $ sudo apt install $GOPATH/src/github.com/ivpn/desktop-app-cli/References/Linux/_out_bin/ivpn_2.12.0_armhf.deb
    ```

7. Check our [Command Line Client FAQ](/knowledgebase/general/command-line-client-faq/) for the next steps.
