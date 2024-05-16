---
title: How to verify Warrant Canary signature? - IVPN Help
h1: How to verify Warrant Canary signature?
url: /knowledgebase/general/how-to-verify-warrant-canary-signature/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 300
---
# How to verify Warrant Canary signature?

The warrant canary is signed using a PGP key. Please install [GnuPG](https://www.gnupg.org/) if you haven't already.

To verify the signature:

1.  Download and import the IVPN public key from [/resources/pubkey.txt](/resources/pubkey.txt).

    ```
    gpg --import pubkey.txt
    ```

2.  Download the latest canary from [/resources/canary.txt](/resources/canary.txt) and verify.

3.  ```
    gpg --verify canary.txt
    ```

You should see a message similar to below confirming the signature is good

```
gpg: Signature made Tue Nov  4 16:23:00 2014 CET using RSA key ID B647BA69
gpg: Good signature from "IVPN Administrator "
```

