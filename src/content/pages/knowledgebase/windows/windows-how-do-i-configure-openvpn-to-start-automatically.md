---
title: Windows - How do I configure OpenVPN to start automatically? - IVPN Help
h1: Windows - How do I configure OpenVPN to start automatically?
url: /knowledgebase/windows/windows-how-do-i-configure-openvpn-to-start-automatically/
sections:
    - windows
    - troubleshooting
sectionTitle: Windows
layout: help-details
weight: 40
---
# Windows - How do I configure OpenVPN to start automatically?

<div markdown="1" class="notice notice--info">
We recommend using the official IVPN software client which already includes this functionality. See the <a href="/apps-windows/">Windows App</a> page to download IVPN for your platform.
</div>

For this solution to work, you need to configure OpenVPN to store your IVPN Account ID (if you have not done so already). To do this please follow [these instructions](/knowledgebase/windows/windows-how-do-i-configure-openvpn-to-save-my-password/).

1.  Click on the Windows start button and type `task scheduler` and click on it.

2.  On the menu bar click `Action` | `Create task`.

3.  Give the task a name .e.g "Auto-start VPN".

4.  Select `Run only when user is logged on`.

5.  Select `Run with the highest privileges`.

6.  Click on the `Triggers` tab and click `New`. Select `At log on` and click `OK` - You can choose for all users or a specific user. If you have any issues you may need to set the `Delay task` option in the advanced settings to 30 seconds or thereabout to enable the network adapter to initialize first.

7.  Click on the `Actions` tab and click `New`. Enter the program and argument as below according to your installation. The path must be correct and you must specify the name of the config file you wish to connect to.

    ```
    Program: "C:\Program Files\OpenVPN\bin\OpenVPN-Control-Centre.exe" Argument: --config_dir "C:\Program Files (x86)\OpenVPN\config" --connect "iVPN - Singlehop - Netherlands.ovpn"
    ```

8.  Click on the `Conditions` tab and clear any boxes which are checked.

9.  Click `OK`. The task should now be created and will connect to the named VPN connection every time the system starts up.
