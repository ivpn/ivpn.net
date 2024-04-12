---
title: Command-line interface for IVPN released
# Example: /blog/this-is-a-good-post
url: /blog/command-line-interface-ivpn-released/
highlighted: false
draft: false
authors:
  - Alexandr Stelnykovych
categories:
  - Releases
# Tags are seperated by comma. Ex. Open Source, Security, Subscriptions
tags:
  - apps
date: 2020-05-20T11:50:34.740Z
# 740px X 740px
thumbnailImage: "/images-static/uploads/thumb_mac_cli-2x.png"
# Ratio 1:1, example 500x500
images:
  - /images-static/uploads/og-mac-cli-2x.png
---
As privacy advocates and technologists we are constantly working on features which we think will improve the user experience of the IVPN apps. Less than a month after the release of the Linux app, we are proud to release a command-line interface (CLI) for the macOS and Windows apps. After installing v2.12.0, it is possible to connect to the IVPN network using either the command line or graphical interface.

To get started, open a Command Prompt from the Start menu on Windows or run Terminal.app on macOS. Enter `ivpn connect -any -country Canada` and hit enter - this simple command will start a VPN connection to an IVPN server in Canada. You can also try running `ivpn connect -last` to connect with the last successfully used connection settings.

![command line interface gif](/images-static/uploads/blog-command-line-interface-release-2.gif)

You can control all aspects of the IVPN app through the command line. Run `ivpn -h` to learn more about the available commands and parameters:

```html
$ ivpn -h
Command-line interface for IVPN client (www.ivpn.net)
version:2.12.0 (date:2020-05-13 commit:f8da51caf76cab956c1cc38819d08e04a337a296)

Usage: ivpn COMMAND [OPTIONS...] [COMMAND_PARAMETER] [-h|-help]

COMMANDS:
status           Prints full info about IVPN state
connect LOCATION Establish new VPN connection
disconnect       Disconnect active VPN connection (if connected)
servers FILTER   Show servers list
firewall         Firewall management
wgkeys           WireGuard keys management
dns DNS_IP       Default 'custom DNS' management for VPN connection
antitracker      Default AntiTracker configuration management for VPN connection
logs             Logging management
login ACCOUNT_ID Login operation (register ACCOUNT_ID on this device)
logout           Logout from this device (if logged-in)
account          Get info about current account

Tips:
 ivpn COMMAND -h         Show detailed description of command
 ivpn -h -full           Show detailed description about all commands
```

\
Our continued aim is to make the IVPN experience as seamless as possible. We have added the CLI option on macOS and Windows for customers who prefer to operate through the command line. It is just an option: you can also continue using the IVPN app graphical interface as before.

IVPN Team