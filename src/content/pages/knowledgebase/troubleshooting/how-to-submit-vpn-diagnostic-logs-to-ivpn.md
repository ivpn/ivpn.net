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

1. Open the IVPN App and click on the gear icon to access the `Settings` area.
2. Navigate to the `General` tab.
3. Check on `Enable logging` and click the `Save` button.
4. Use the VPN software in such a way that the error may be logged e.g if you cannot connect then attempt to connect to the VPN.
5. Go back to `Settings` > `General` and click on the `Submit logs` button.

### macOS

1. Open the IVPN application by clicking on the menu bar icon and then on `Show IVPN`.
2. Click on the gear button in the top right and select `Preferences`.
3. Navigate to the `General` tab.
4. Check `Create log files` and close the window.
5. Use the VPN software in such a way that the error may be logged e.g if you cannot connect then attempt to connect to the VPN.
6. Click on the small IVPN icon in your menu bar and then `Diagnostics logs`. Once the logs have been generated, click on the `Send logs` button.

### Android

1. Launch the IVPN App and tap on the gear icon to access the `Settings` menu.
2. Click on the `VPN protocol` and select `OpenVPN`.
3. Return one step back, scroll down and toggle the `Enable logging` option **on**.
4. Use the VPN software in such a way that the error may be logged e.g if you cannot connect then attempt to connect to the VPN.
5. Access the `Settings` menu once again and click on the `Send Logs` button.

### iOS

1. Launch the IVPN App and tap on the gear icon to access the `Settings` menu.
2. Toggle `Diagnostic logs` switch On.
5. Use the VPN software in such a way that the error may be logged e.g if you cannot connect then attempt to connect to the VPN.
6. Access the Settings menu once again and click on the `Send Logs` button.

### Linux

#### GUI

1. Open the IVPN App and click on the gear icon to access the `Settings` area.
2. Navigate to the `General` tab.
3. In the `Diagnostics` area`, check `Allow logging`, then click the back button.
4. Use the VPN software in such a way that the error may be logged e.g if you cannot connect then attempt to connect to the VPN.
5. Go back to `Settings` > `General` and click on the `Diagnostic logs ...` button to send.

#### CLI

IVPN CLI app stores logs in the following file - `/opt/ivpn/log/IVPN_Agent.log*`. Attach the file or files to your email message to our support department or copy/paste the file contents into your support request.

#### Manual

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
