---
title: Android VPN Leak via QUIC - IVPN Help
h1: Android VPN Leak via QUIC
url: /knowledgebase/android/android-vpn-leak-via-quic/
sections:
    - android
sectionTitle: Android
layout: help-details
weight: 80
---
# Android VPN Leak via QUIC

A zero-permission Android app can expose your real IP address with a VPN active, without needing root access or special permissions.

The IVPN team have reproduced and can confirm the issue based on the [original report](https://github.com/0x33c0unt/quic-vpn-bypass).

### What's happening

Android 16 QPR1+ ships a `@hide` API called `registerQuicConnectionClosePayload` in the `com.android.tethering` module. Any app can hand `system_server` a buffer of bytes and a destination address. `system_server` runs as UID 1000, which is exempt from VPN routing, so when it opens a UDP socket and fires that payload, the packet goes over the raw physical interface (Wi-Fi or cellular). The VPN tunnel never sees it. The destination sees your real IP.

### What's affected

Any device running Android 16 QPR1+ where the `tethering/close_quic_connection` DeviceConfig flag is on. The March 2025 build of this Android version defaulted to **on**. The April 2026 patch flipped the default to **off**, but the code path is still present, re-enabling the flag re-exposes the device. The same Binder transaction code and AIDL signature are confirmed unchanged on Android 17 (Pixel 9 Pro).

### Proof

Setting up a UDP listener on a remote server and running the PoC app with a VPN active shows the following:

```
EXFIL{src=192.168.0.155,via=wifi,vpn=true,ts=1778838613953}
```

`vpn=true` means the VPN was up. The source IP is the device's real address, not the VPN exit.

### Mitigation

This mitigation does not require root, but it does require USB debugging to be turned on so you can run adb commands on the device. See the [Android Debug Bridge (adb)](https://developer.android.com/tools/adb) docs. With adb available, pin the flag to disabled:

```
adb shell device_config put tethering close_quic_connection -1
adb reboot
```

Verify with:

```
adb shell dumpsys connectivity | grep -i "close quic"
# Close QUIC connection: false
```

### Reasoning

`system_server` bypasses the routing rules VPNs depend on, and unprivileged apps can ask it to send arbitrary payloads. Flipping a default flag doesn't fix the issue, it just resets the dial. An OEM, a Mainline update, or somebody with `device_config` access can flip it back. Until the API is removed or properly gated, the issue remains.

Original report and full write-up: [github.com/0x33c0unt/quic-vpn-bypass](https://github.com/0x33c0unt/quic-vpn-bypass)
