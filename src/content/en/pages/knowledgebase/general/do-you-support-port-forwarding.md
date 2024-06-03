---
title: Do you support Port Forwarding? - IVPN Help
h1: Do you support Port Forwarding?
url: /knowledgebase/general/do-you-support-port-forwarding/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 14
---
# Do you support Port Forwarding?

Port Forwarding is not available with our service. See our [blog post](/blog/gradual-removal-of-port-forwarding) to understand why.

### What is not possible without port forwarding?

Remote access to services and systems running behind a VPN. Review our dedicated [article](/knowledgebase/general/how-do-i-remotely-connect-to-my-home-system-or-services-behind-the-vpn-connection) about this for more details and a possible workaround.

### Is it possible to P2P/torrent without Port Forwarding?

The short answer to the question: Yes, you can download and upload data even with closed port.

 - If the port is closed that only means you can not accept incoming connections, but you can still connect to peers who accept connections. In torrent terminology they say that you are in passive mode. A client in passive mode can connect to a client with open port (active mode), but not to a client with a closed port. 

 - If your port would be open then you would be able to accept connections too. In torrent terminology this is called active mode. A client with open port can connect to both active and passive clients.

If your port is closed, that only means you can't connect to other peers with closed ports. In this case you may get less peers to connect to. If the torrent has a lot of peers, your client will likely be able to find enough peers with open port to achieve high download speeds. If the torrent has few peers, then it is likely that with open port you would get better results. 

In the rare case when all peers have their ports closed, then you won't be able to connect to any of them. You will have to wait until a peer with open port comes in (active mode).

Please review our [ToS](/tos) about P2P usage on the IVPN network.
