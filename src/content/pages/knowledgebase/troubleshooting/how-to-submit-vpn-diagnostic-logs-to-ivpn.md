---
title: How to submit VPN diagnostic logs to IVPN? - IVPN Help
h1: How to submit VPN diagnostic logs to IVPN?
url: /knowledgebase/troubleshooting/how-to-submit-vpn-diagnostic-logs-to-ivpn/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 160
---
# How to submit VPN diagnostic logs to IVPN?

If you are unable to resolve a technical issue please submit your logs by following the instructions below and contact our [support department](/contactus/) to request that they review them.

### Windows

1. Open the IVPN application. Click on the `Settings` button.
2. Navigate to the `Diagnostics` tab.
3. Check on `Enable logging` and click `OK`.
4. Use the VPN software in such a way that the error may be logged e.g if you cannot connect then attempt to connect to the VPN.
5. Click on the `Submit logs` button.

### macOS

1. Open the IVPN application by clicking on the menu bar icon and then on `Show IVPN`.
2. Click on the gear button in the top right and select `Preferences`.
3. Navigate to the `General` tab.
4. Check `Create log files` and close the window.
5. Use the VPN software in such a way that the error may be logged e.g if you cannot connect then attempt to connect to the VPN.
6. Click on the small IVPN icon in your menu bar and then `Diagnostics logs`. Once the logs have been generated, click on the `Send logs` button.

### Android

1. Launch the IVPN app.
2. Tap on the `gear` icon to access the Settings menu.
3. Click on the `VPN protocol` and select `OpenVPN`.
4. Return one step back, scroll down and have the `Enable logging` option enabled.
5. Use the VPN software in such a way that the error may be logged e.g if you cannot connect then attempt to connect to the VPN.
6. Access the Settings menu once again and click on the `Send Logs` button.

### iOS

1. Launch the IVPN app.
2. Tap on the `menu` icon on the top right side of the screen to access Settings.
3. Click on the `Protocol` and select `OpenVPN`.
4. Return one step back, scroll down and have the `OpenVPN Logging` option enabled.
5. Use the VPN software in such a way that the error may be logged e.g if you cannot connect then attempt to connect to the VPN.
6. Access the Settings menu once again and click on the `Send Logs` button.

### Linux

IVPN CLI app stores logs in the following file - `/opt/ivpn/log/IVPN_Agent.log*`. Attach the file or files to your email message to our support department or copy/paste the file contents into your support request.

1.  If you are using a different VPN client, use 'grep' to filter the OpenVPN logs from the system log e.g.
    ```
    sudo grep VPN /var/log/syslog
    ```

2.  If the step above outputs what appears to be the VPN logs then run the command below to create a log file in your home directory
    ```
    sudo grep VPN /var/log/syslog > ~/ivpn.log
    ```

3.  If you cannot see OpenVPN log entries in syslog, add the following line to the .ovpn file to enable file logging.
    ```
    log /var/log/openvpn
    ```

4.  If you are using NetworkManager, the following command will capture more details and create a file in your home directory:
    ```
    egrep -i "vpn|NetworkManager|nm-openvpn|nm-dispatcher" /var/log/syslog > ~/ivpn.log
    ```
