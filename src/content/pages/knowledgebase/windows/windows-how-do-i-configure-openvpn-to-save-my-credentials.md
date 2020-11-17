---
title: Windows - How do I configure OpenVPN to save my credentials? - IVPN Help
h1: Windows - How do I configure OpenVPN to save my credentials?
url: /knowledgebase/windows/windows-how-do-i-configure-openvpn-to-save-my-credentials/
sections:
    - windows
    - troubleshooting
sectionTitle: Windows
layout: help-details
weight: 10
---
# Windows - How do I configure OpenVPN to save my credentials?

To configure the OpenVPN GUI to save your credentials:

1.  Using Windows Explorer, navigate to the `C:\Program Files\OpenVPN\config` folder (or `C:\Program Files (x86)\OpenVPN\config` on 64 bit systems).

2.  Using WordPad or a similar text editor, open the config file relating to the server you wish to save your IVPN account ID for (the filename should indicate the server location).

3.  Locate the line containing `auth-user-pass` and change it to:

    ```
    auth-user-pass pass.txt
    ```

4.  Create a new text file with the name `pass.txt` and insert your IVPN Account ID (either 'ivpnXXXXXXXX' or `i-XXXX-XXXX-XXXX`) on the first line and a non-blank second line, then save,  e.g.:

    ```
    ivpnxxxxxx
    ivpn
    ```

    <div markdown="1" class="notice notice--warning">
    You may not be able to save files directly to the c:\program files\openvpn\config directory due to Windows security controls. In this case, simply copy the file to your desktop first, edit it and then copy it back to the same location.
    </div>

5.  Repeat step 3 for other config files you wish to save the Account ID for.
