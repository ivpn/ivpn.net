---
title: How to verify a file checksum - IVPN Help
h1: How to verify a file checksum
url: /knowledgebase/general/how-to-verify-a-file-checksum/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 50
---
# How to verify a file checksum

"A checksum is a small-sized block of data derived from another block of digital data for the purpose of detecting errors that may have been introduced during its transmission or storage." - [Wikipedia](https://en.wikipedia.org/wiki/Checksum)

The IVPN App's [download page](/apps) and the [change log](https://github.com/ivpn/desktop-app/blob/master/CHANGELOG.md) hosted on GitHub include SHA256 checksums for each file.  Verifying the checksum offers a way to confirm there are no errors with a downloaded file prior to installation.

Modern versions of Windows, macOS, and Linux include built-in applications to verify a checksum with no additional software required.

The calculation may take a few seconds and the output will be a 64-character string of numbers and letters.  Compare the output with the checksum listed on the download page.


### Windows

Open a **Command Prompt** (click the **Start** button > type `cmd`) and run the following commands by pressing Enter after each line:

```
cd Downloads
certutil -hashfile IVPN-Client-v3.X.Y.exe SHA256
```

Using **Windows PowerShell** is another option:

```
cd Downloads
Get-fileHash .\IVPN-Client-v3.X.Y.exe
```

**Note:** Generally, a web browser will automatically select the `Downloads` folder to save files, though the downloaded DMG installed file might be elsewhere on your system.  Also, use the actual file name instead of the `IVPN-Client-v3.X.Y.exe` example.


### macOS

Open a **Terminal** window (Finder > Applications > Utilities > Terminal) and run the following commands (press Enter/Return after each line to execute the command):

```
cd Downloads
shasum -a 256 IVPN-3.X.Y.dmg
```

**Note:** Generally, a web browser will automatically select the `Downloads` folder to save files, though the downloaded DMG installed file might be elsewhere on your system.  Also, use the actual file name instead of the `IVPN-3.X.Y.dmg` example.


### Linux

Open a Terminal or console window and run the following command, then press Enter:

```
sha256sum /path/to/ivpn_3.X.Y_amd64.deb
```

or:

```
sha256sum /path/to/ivpn-ui-3.X.Y-1.x86_64.rpm
```

**Note:** Please make a note of where you have saved the downloaded packages and use that path instead of `/path/to/` in the command above.  Also, use the actual filename instead of the `3.X.Y` examples.

For Linux, the `sha256sum` application is provided by the [coreutils](https://www.gnu.org/software/coreutils/) package.

