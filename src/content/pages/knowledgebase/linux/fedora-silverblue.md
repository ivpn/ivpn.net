---
title: Linux - Fedora Silverblue - IVPN Help
h1: Linux - Fedora Silverblue
url: /knowledgebase/linux/fedora-silverblue/
sections:
    - linux
sectionTitle: Linux
layout: help-details
weight: 150
---
# Linux - Fedora Silverblue

Fedora Silverblue is unique because it uses an immutable filesystem and an ostree-based package management system. This means that the system files cannot be modified once they are installed, ensuring greater stability and security of the operating system. 

IVPN client can be installed on Fedora Silverblue using `rpm-ostree`.

Commands to install the IVPN client on Fedora Silverblue (this is an example, use correct file names):

<div class="highlight">
<pre>
<code class="language-shell" data-lang="shell">
<span># install IVPN client (use here required file name!)</span>
rpm-ostree install ivpn-3.10.14-1.x86_64.rpm
<span># install UI for IVPN client, if required (use here required file name!)</span>
rpm-ostree install ivpn-ui-3.10.14-1.x86_64.rpm

<span># reboot system</span>
systemctl reboot

<span># enable IVPN service to start automatically</span>
sudo systemctl enable ivpn-service
<span># start IVPN stervice</span>
sudo systemctl start ivpn-service
</code>
</pre>
</div>

To correctly uninstall 'ivpn' package on Fedora Silverblue, extra steps should be performed manually  (example):

<div class="highlight">
<pre>
<code class="language-shell" data-lang="shell">
<span># logout from ivpn account</span>
ivpn logout

<span># uninstall IVPN client</span>
rpm-ostree uninstall ivpn

<span># uninstall IVPN User Interface (if installed)</span>
rpm-ostree uninstall ivpn-ui

<span># stop and disable IVPN service</span>
sudo systemctl stop ivpn-service
sudo systemctl disable ivpn-service

<span># manualy remove leftovers</span>
sudo rm -fr /etc/opt/ivpn
sudo rm -fr /var/log/ivpn

<span># reboot system</span>
systemctl reboot
</code>
</pre>
</div>
