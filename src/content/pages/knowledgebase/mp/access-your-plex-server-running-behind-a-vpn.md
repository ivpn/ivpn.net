---
title: Access your Plex server running behind a VPN - IVPN Help
h1: Access your Plex server running behind a VPN
url: /knowledgebase/mp/access-your-plex-server-running-behind-a-vpn/
sections:
    - mp
sectionTitle: Media Players
layout: help-details
weight: 10
---
# Access your Plex server running behind a VPN

It is entirely possible to access your Plex server remotely while connected to IVPN at the same time. All your Plex traffic stays completely encrypted which guarantees your privacy and security. To make this work, follow the instructions below:

### Windows

1.  Activate [Port Forwarding](/knowledgebase/general/how-do-i-activate-port-forwarding/) in your Client Area

2.  Connect to any non-US based IVPN server location (Port Forward is [**disabled on all USA servers**](/knowledgebase/troubleshooting/port-forwarding-is-not-working-why/)) & note the external IP address you were assigned by visiting the [dnsleaktest.com](https://dnsleaktest.com/)

3.  Add an exception rule in your Windows firewall to allow the connection.  
    Hit the `Windows` button -> type `wf.msc` -> enter. Click on `Inbound rules` in the left sidebar. Click on `New Rule` on the right sidebar. In the wizard that appears check `Port` -> hit `Next`. Choose `TCP` -> enter the port number assigned in step 1 and `Allow the connection`. Apply the rule for both Private & Public networks. Give it a name and finish the wizard.

    <div markdown="1" class="notice notice--warning">
    If you have other Antivirus/Firewall installed on your system, you might need to create the similar exception rule there as well. The detailed instructions can be found on your security software vendor's website.
    </div>

4.  Launch the terminal with the Administrator rights. Hit the `Windows` button -> type `cmd` -> Right-click & choose `Run as Administratorand` execute the following command:

    ```
    netsh interface portproxy add v4tov4 listenport=yyyyy listenaddress=0.0.0.0 connectport=32400 connectaddress=127.0.0.1
    ```

    Replace **“yyyyy”** with the port number you received in step 1

5.  Your Plex server can now we accessed via the `http://xx.xx.xx.xx:yyyyy`, where **“xx.xx.xx.xx”** is the IVPN external IP address you were assigned in step 2 & **“yyyyy”**- port number received in step 1.

<div markdown="1" class="notice notice--warning">
It is worth to mention that the <strong>netsh</strong> forwarding rule in step 4 needs to be reapplied if you reboot your system or log out from your user account. There are various ways on how to make it persistent. Below, is an example using the in-built Windows task scheduler:
</div>

1.  Open a notepad app (`Windows` button -> `notepad` -> `enter`), paste the netsh command from step 4 & save the file with the `.bat` extention, e.g. `plex.bat`

2.  Launch the Task Scheduler (`Windows` button -> `taskschd.msc` -> `enter`). In the right pane, choose `Create basic task`. Give it a name and hit `Next`. Choose the `When I log on` -> `Next`. Select `Start a program` -> `Next`. In the `Program/Script` field browse for the `plex.bat` file you created in the previous step and finish the wizard.

3.  Double click on the newly created task to bring its properties & check `Run with highest privileges` in the **General** tab -> save the changes. Now the netsh command will run automatically every time you reboot/log in to your system.

### macOS

1.  Activate [Port Forwarding](/knowledgebase/general/how-do-i-activate-port-forwarding/) in your Client Area

2.  Connect to any non-US based IVPN server location (Port Forward is [**disabled on all USA servers**](/knowledgebase/troubleshooting/port-forwarding-is-not-working-why/)) & note the external IP address you were assigned by visiting the [dnsleaktest.com](https://dnsleaktest.com/)

3.  In your terminal, enable forwarding across network interfaces:

    ```
    sudo sysctl -w net.inet.ip.forwarding=1
    ```

4.  Add a forwarding rule from the VPN network adapter to the Plex server. Run the following command in the terminal:

    ```
    echo "rdr pass inet proto tcp from any to any port yyyyy -> 127.0.0.1 port 32400" | sudo pfctl -ef -
    ```

    Replace **“yyyyy”** with port number you received in step 1

5.  Your Plex server can now we accessed via the `http://xx.xx.xx.xx:yyyyy`, where **“xx.xx.xx.xx”** is the IVPN external IP address you were assigned in step 2 & **“yyyyy”**- port number received in step 1.

<div markdown="1" class="notice notice--warning">
Same as for Windows, the forwarding rule in step 4 has to be reapplied if you restart your system. Read on if you want to make it persistent:
</div>

1.  Open your terminal and navigate to **/etc/pf.anchors** folder:

    ```
    cd /etc/pf.anchors
    ```

2.  Create an anchor file:

    ```
    sudo nano plex
    ```

3.  In the opened editor, paste the forwarding rule used in step 4:

    ```
    rdr pass inet proto tcp from any to any port yyyyy -> 127.0.0.1 port 32400
    ```

    Replacing **"yyyyy"** with IVPN Port Forwarding number. `cntrl+x` -> `y` to save the changes

4.  Create **com.plex.pfctl.plist** file in the **/Library/LaunchDaemons** folder:

    ```
    cd /Library/LaunchDaemons
    sudo nano com.plex.pfctl.plist
    ```

    ...and past the following:

    ```
    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE plist PUBLIC "-//Apple Computer/DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
    <key>Label</key>
    <string>com.plex.pfctl.plist</string>
    <key>Program</key>
    <string>/sbin/pfctl</string>
    <key>ProgramArguments</key>
    <array>
    <string>/sbin/pfctl</string>
    <string>-e</string>
    <string>-f</string>
    <string>/etc/pf.anchors/plex</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>LaunchOnlyOnce</key>
    <true/>
    </dict>
    </plist>
    ```

    `cntrl+x` -> `y` to exit & save the changes

Done. Now the rdr command is applied automatically when you log in to your system.