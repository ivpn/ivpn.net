---
title: Does IVPN offer Perfect Forward Secrecy (PFS)? - IVPN Help
h1: Does IVPN offer Perfect Forward Secrecy (PFS)?
url: /knowledgebase/privacy/does-ivpn-offer-perfect-forward-secrecy-pfs/
sections:
    - privacy
    - general
sectionTitle: Privacy
layout: help-details
weight: 40
---
# Does IVPN offer Perfect Forward Secrecy (PFS)?

Yes, our OpenVPN servers are configured to automatically generate new encryption keys every hour. If an adversary was able to crack the encryption key, they would only be able to decrypt the traffic captures since the last key rotation.

To give you some idea of the requirements to brute force an AES 256 bit key, 50 supercomputers that could check a billion billion (10^18) AES keys per second. If such a device could ever be made it would, in theory, require about 3 × 10^51 years to exhaust the 256-bit key space.
