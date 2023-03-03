---
title: How do I verify the location of server? - IVPN Help
h1: How do I verify the location of server?
url: /knowledgebase/troubleshooting/how-do-i-verify-the-location-of-server/
sections:
    - troubleshooting
sectionTitle: Troubleshooting
layout: help-details
weight: 220
---
# How do I verify the location of server?

Sometimes, when you check the location of a server using IP based geolocation, the database may say the server is not where it is advertised. This is usually because the database is incorrect.

You can though, use tools available on the internet to help verify the approximate location of a server. This technique is based on the understanding that the closer you are to a server the shorter the ping time should be. Whilst this may not be perfect it should be able to help you determine that a server is at least close to its stated location. For example, using a UK based system I get the following ping times to various locations.

| Location | Destination | Time ms |
|---|---|---|
| UK | gb1.gw.ivpn.net (UK) | 48 |
| UK | fr1.gw.ivpn.net (France) | 49 |
| UK | us-tx1.gw.ivpn.net (Texas, USA) | 152 |
| UK | us-ut1.gw.ivpn.net (Utah, USA) | 186 |

From the above, we can tell that the servers in Utah and Texas are further away than the ones in the UK and France but we can't really distinguish between the UK and France. We would need to ping the servers from a number of locations and compare the results to get a more accurate result. This is where internet based tools are useful. We will use the CA Technologies [Ping Test tool](https://asm.saas.broadcom.com/). This uses over 90 global locations to ping a server and displays the response time. (Note: The Ping Test tool was available previously, circa 2020, though seems to be behind a paywall/trial. This [ping test](https://www.wormly.com/test-remote-ping) may offer a similar experience without the paywall/trial.) Using the tool we can see (selected results)

| Server: gb1.gw.ivpn.net (London,UK) |   | Server: fr1.gw.ivpn.net (Paris, Fr) |
|---|---|---|---|
| *Test Location* | *Time ms* | *Test Location* | *Time ms* |
| Manchester | 6.6 | Manchester | 14 |
| London | 3.4 | London | 11 |
| Edinburgh | 2.1 | Edinburgh | 9 |
| Lille | 12 | Lille | 6 |
| Milan | 26 | Milan | 20 |
| Berlin | 21 | Berlin | 24 |
| Frankfurt | 11 | Frankfurt | 14 |

Interpreting the results. First, this neatly shows that this is not perfect. Edinburgh is geographically further away from London than Manchester but the results don't show this. You should discard outliers like this. For everything else closer the test location is to the target server, the shorter the ping time. You can have a reasonable confidence that the servers are in the locations stated.

At the time of writing, we have a server in Texas with the IP address 67.228.177.194 that is correctly geolocated. Some of the secondary IP addresses on the Texas server e.g. 67.213.212.242 are incorrectly geolocated* in Utah (the ISP's headquarter location). Let's use the ping test to see what's really happening (selected results).

| Server:67.228.177.194 (Texas) |   | Server: 67.213.212.242 (Utah) |
|---|---|---|---|
| *Test Location* | *Time ms* | *Test Location* | *Time ms* |
| Atlanta, GA | 19 | Atlanta, GA | 19 |
| Charlotte, NC | 25 | Charlotte, NC | 25 |
| Los Angeles, CA | 30 | Los Angeles, CA | 30 |
| Salt Lake City, UT | 35 | Salt Lake City, UT | 34 |
| Dallas, TX | 4 | Dallas, TX | 4 |

As you can see, at the time of writing, the ping times for both IP addresses are pretty much the same and Dallas TX is only 4ms away from both. So we can be fairly sure that the geolocation is incorrect for the IP address 67.213.212.242.

*we have submitted a request to the ISP to have the geolocation updated and they have agreed to do so.
