---
title: Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 7
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/advanced-privacy-and-anonymity-part-7/
section: Advanced
weight: 70
articles: [
  {
    title: "Advanced Privacy and Anonymity Using VMs, VPN’s, Tor – Part 8",
    url: "/privacy-guides/advanced-privacy-and-anonymity-part-8/"
  }
]
date: 2013-10-23T12:39:49+00:00
layout: guides-details
---
## Paying Anonymously with Cash and Bitcoins

### Introduction

In using nested chains of VPN services and Tor for anonymity, the weakest links are arguably the money trails to VPN services that are routed through other VPN services. That's especially problematic for VPN services to be routed through Tor. Using free VPN services is an option, but they typically cap bandwidth and throughput. The best option for anonymously buying VPN services is sending cash by mail. Using Bitcoins that have been well anonymized through multiple accounts and mixing services is another option. This tutorial covers both.

> Note: I wrote this series in 2013, well over six years ago. Although I’ve updated stuff a few times since, it’s been a while. I’ll be doing a total rewrite soon, but that will take some time.
> 
> So anyway, privacy in meatspace is basically dead, given increasingly pervasive surveillance. So there's a lot that needs revised. Using giftcards, mailing cash, etc are far more risky. Also, Electrum is now the best Bitcoin wallet in Linux. And I have updated recommendations for Bitcoin mixers.

### Cash by Mail

Several VPN providers accept cash payments by mail. Check their payment options, or email support. It's the most anonymous option, as long as you're not under active surveillance. However, there are two disadvantages: 1) time (especially for international surface mail); and 2) risk of loss or theft in transit.

Take care to avoid attracting attention. Include a valid return address that's not associated with you in any way. Use a computer printer, rather than printing by hand. However, do not use a color laser printer, because the printer serial number and a timestamp may be [encoded in a pattern of faint yellow dots][1]. Add enough postage, but not way too much. Use large denominations (no coins) and wrap the cash in a sheet of paper, with your account username printed on it. Also, use cash given anonymously as change, rather than from an ATM or bank withdrawal.

> Note: This is far riskier than it was six years ago.

Use a public drop box located at least 200 Km away. Go in the evening, and avoid bright lighting. Before approaching, look for security cameras, and avoid looking directly at them. Look downward as much as possible, and wear something seasonably appropriate to conceal your face (such as a hooded shirt or jacket, or a wide-brimmed hat). If driving, park at a reasonable distance to avoid sharing your license tag, but not implausibly far.

Use disposable gloves to avoid fingerprints. Although it's probably overkill, you can also take steps to confound DNA analysis. Accumulate dust from public places, containing the DNA of many people. Using toilet paper and wearing disposable gloves, lightly rub the dust into each component (cash, cover sheet and envelope).

### Bitcoins

Many VPN providers now accept Bitcoin payments. However, contrary to what you might have read, Bitcoins are not at all anonymous, unless you use them prudently. First, to comply with laws against money laundering, mainstream exchanges and purchasing channels now typically require documented identification. Second, the Bitcoin network by design records every transaction in a public accounting log, called the [blockchain][2].

Another risk in using Bitcoins is [price volatility][3]. While that has been profitable for some speculators, it discourages routine use. For now, it's safest to limit Bitcoin holdings to current requirements.

#### Buying Bitcoins

In order to use Bitcoins, you'll need a wallet. Although convenient, online wallets are not very safe, because they're far too likely to disappear, get hacked, or be shut down. The [Blockchain wallet][4] is probably the safest online wallet. The Bitcoin Project now recommends the standalone [MultiBit client][5] for new users. The original Bitcoin client (Bitcoin-Qt) has become too resource intensive for casual use. It synchronizes the full [blockchain][6], which is currently over 9 GB, and growing at ~630 MB per month. That's especially problematic when running multiple clients via Tor for Bitcoin anonymization (as discussed below). Although MultiBit is a Java app, that's secure as long as the Java browser plug-in is not installed.

There are [many ways][7] to buy Bitcoins. Although cash deposits are still possible in some places, transactions generally involve bank wires or commercial money-transfer services. Most services don't accept credit and debit cards, and those that do charge very large transaction fees to cover chargeback risk.

{{< del >}}The most anonymous option is buying with cash from private sellers by mail. One reputable option is [Nanaimo Gold](https://www.nanaimogold.com/buy.php).{{< / del >}} Paying cash to private sellers in person is less anonymous. But it's easy to find sellers using [LocalBitcoins][8], and there's an escrow service to reduce the risk of fraud. Other (riskier) options for finding private sellers include [Bitcoin Forum /.../ Currency exchange][9] and [#bitcoin-otc][10].

Before buying your Bitcoins, set up an initial wallet. The best place for it depends on how anonymously you're purchasing your Bitcoins. Anonymity levels should be comparable, so your Bitcoins don't compromise the location, and vice versa. If you must identify yourself to buy Bitcoins, it's OK to just use the Blockchain browser plug-in wallet, without any VPN. If you're paying with cash in person, but without identifying yourself, it's best to run a Multibit client through your direct-connect VPN, either on the host machine or on a workstation VM that's dedicated to that VPN exit. If you're paying with cash through the mail, it's best to use a Electrum client in [Whonix][11] (a pair of Linux VMs that connects via Tor) as your initial wallet. Using Whonix is explained below.

> Note: See <https://electrum.org/#download> and use the Appimage.

#### Anonymizing Bitcoins

Once you have your Bitcoins, it's prudent to anonymize them appropriately before use. All Bitcoin transactions are recorded in the blockchain, and there's no way to prevent that (without totally breaking the system). However, there are several Bitcoin mixing services. Deposits go into a pool, and payments come randomly from the pool. You transfer Bitcoins through a chain of anonymous Bitcoin wallets, using different mixing services for successive transfers. If the wallets aren't otherwise associated, your Bitcoins become less and less associated with you as they move through the chain, and no meaningful association remains after a few mixing transfers.

Using multiple anonymous MultiBit clients via Tor is the best option. Multibit clients are fast, because they don't download the Bitcoin blockchain. And they are secure, because they're not hosted by a third party. For better anonymity, each Multibit client should have a wallet with several several sending and receiving addresses, or even several wallets. For each transfer from one client to another through a mixing service, you randomly spread the Bitcoins among several address combinations. That increases the anonymity that each transfer provides, by reducing correlation based on quantities transferred.

Using Electrum via Tor is easy using [Whonix][11]. Reputable mixing services include ...

> Note: I tested and verified four mixing services in late Jan-2020.
> 
> **BitCloak** only has a Tor onion, at http://bitcloak43blmhmn.onion/. It requires five confirmations.
> 
> **Bitcoin Fog** only has a Tor onion, at http://foggeddriztrcar2.onion/. It had a clearnet site, at http://www.bitcoinfog.com/, but that's gone. **Do not** trust other URLs, as there are many scammers. If that one goes down, check https://twitter.com/bitcoinfog (but **not** @BitcoinfogG, which is a scammer). It's not a pass-through mixer, and requires an account. Deposits complete after six confirmations, and withdrawals should complete after ~2 minutes. Some have said that it's unreliable, but that may have reflected software glitches, or perhaps confusion with scammers.
> 
> **Blender** is at both https://blender.io/ and http://blenderiocpxfema.onion/. It requires three confirmations.
> 
> **CryptoMixer** is at both https://cryptomixer.io/ and http://cryptomixns23scr.onion/. It requires just 1 confirmation.

After each mixing step, it's crucial to check the receiving address for taint from the sending address. On the [Blockchain explorer page][12], enter your receiving address in the `Search` field, and hit enter. Then click `Taint Analysis`, and search for your sending address in the results page. If it appears, you need to remix.

A Bitcoin mixing setup might look like this:

  * initial wallet 
      * Blockchain wallet for Bitcoins purchased non-anonymously
      * MultiBit client via direct-connect VPN for Bitcoins purchased in-person with cash
      * MultiBit client in Whonix via Tor for Bitcoins purchased with cash by mail
  * first Whonix/MultiBit mixing client: don't use for purchases
  * second Whonix/MultiBit mixing client: use for first indirect-connect VPN (e.g., to replace SecurityKISS)
  * third Whonix/MultiBit mixing client: use for second indirect-connect VPN
  * fourth Whonix/MultiBit mixing client: don't use for purchases
  * fifth Whonix/MultiBit mixing client: use for VPN to route through Tor

You can spend Bitcoins from anywhere in the wallet chain. In doing so, it's important to match the anonymity levels of Bitcoins and purchases. Your Bitcoins embody a money trail back to you, which becomes increasingly tenuous along the wallet chain. However, your purchases may independently create associations. That's obvious for items that are shipped to you. But VPN services are also more or less associated with you, depending on their location in the nested chain. You don't want your Bitcoins to compromise the anonymity of your purchases. And you don't want your purchases to compromise the anonymity of your Bitcoin wallet, and in turn other purchases that you make from it.

#### MultiBit Clients in Whonix

[Whonix][11] comprises a pair of Debian VMs: a gateway VM that connects to the Tor network, and a workstation VM that connects through the gateway VM. Installing Whonix and setting up MultiBit wallets is easy. Start by downloading Whonix-Gateway and Whonix-Workstation to your host machine, via the direct-connect VPN service. It's best to verify the downloads as instructed using the OpenPGP signatures and the Whonix signing key. If you can't be bothered with that, at least download them using BitTorrent (which is more secure, as explained).

Each Whonix gateway and workstation VM must have a unique name (which determines the name of its folder). Also, the gateway and workstation VMs of each Whonix instance must share a uniquely named internal network. For example, import the first Whonix pair, using `File / Import Appliance` in VirtualBox (reinitializing MAC addresses). Then edit the names of both VMs, adding a unique suffix to distinguish that pair from the rest that you'll be importing, and to facilitate keeping track of them.

You want these Whonix instances to connect through your terminal indirect-connect VPN service. Initially, that's SecurityKISS. Change Adapter 1 of the gateway VM from `NAT` to, for example, the internal network `pfS-SK`. In both Adapter 2 of the gateway VM and Adapter 1 of the workstation VM, rename internal network `Whonix` to match the edited VM names.

Start the first Whonix gateway, and then the workstation. Download and install updates as instructed. After rebooting both VMs, download and install MultiBit as described above, and start MultiBit. It should report being `Online` (at bottom left). There's no need for MultiBit clients to be running except when you're actively using them, because they synchronize very quickly.

Then repeat the process – importing Whonix, renaming the VMs and their shared internal networks, and installing MultiBit – as needed for your mixing chain. However, start the first transfer (see below) before updating the rest of your Whonix instances and installing MultiBit. With the free option, SecurityKISS allows just 300 MB per day, and that's barely enough for downloading updates on two Whonix instances.

#### Bitcoin Anonymization Specifics

The best place for setting up the first transfer depends on the location of the initial Bitcoin wallet. For the Blockchain browser plug-in wallet, it's best use BitLaundry on a LiveCD VM connecting through your direct-connect VPN. That way, your ISP at least doesn't see that you're using BitLaundry, even though the wallet itself is funded non-anonymously and therefore always accessed without any VPN. Otherwise, and for subsequent transfers in the mixing chain, use the workstation VM (or Whonix instance) that's running the Multibit client which is sending the Bitcoins.

As noted above, it's best to use multiple sending and receiving addresses (or even multiple wallets) for transfers via mixing services. For each transfer from one client to another through a mixing service, you randomly spread the Bitcoins among several address combinations. That increases the anonymity that each transfer provides, by reducing correlation based on quantities transferred.

There's no need to create a wallet at [BitLaundry][13]. Create a separate mixing scheme for Bitcoins from each of the appropriate Send addresses in your wallet(s). For destination addresses, use the Request (receiving) addresses of the next wallet(s) in your mixing chain. Specify the desired number of days, and transactions per recipient per day. After reviewing and confirming the scheme, send your Bitcoins to the funding address provided by BitLaundry. Repeat for each sending address.

[Bitcoin Fog][14] requires an account, but not an email address. [Blockchain][15] requires both. You send your Bitcoins from MultiBit to the deposit address for your mixing-service account. After (at least) several hours, send your Bitcoins to the Request (receiving) addresses for the next client in your mixing chain. With Bitcoin Fog, transfers are split over time (by at least six hours) and you can delay them. For increased anonymity, you can use multiple Bitcoin Fog accounts, one for each of your sending addresses.

To avoid associating Bitcoin wallets with purchases, you can pay through BitLaundry or Blockchain, rather than directly from the wallet. However, a recipient might blacklist mixing services, so there's some risk of payments being lost. With BitLaundry, don't split transfers over time, because receiving addresses are sometimes deleted after receiving just one payment. And do not use Bitcoin Fog, because all transfers are split over time by at least six hours.

As you extend your nested VPN chain, it's arguably best to reconfigure your Whonix instances to connect through the new terminal indirect-connect VPN service. However, if you're using 3-4 VPN services in your nested chain, especially if it's a branched chain, having your Whonix instances connect at different nodes would isolate them better from each other. But I don't recommend using Whonix with less than a two-VPN nested chain.

In any case, there is a risk (albeit small) in moving Whonix instances to longer nested VPN chains. To help protect against attacks involving evil relays, Tor uses [persistent entry guards][16]. And so a client's entry-guard selection might serve as a fingerprint for correlating activity from multiple VPN-exit IP addresses.

On the other hand, changing entry guards more frequently increases vulnerability to adversaries that run relays (in particular, entry guard relays). In light of a recent paper from the Tor research community, [Johnson et al (2013) Users Get Routed: Traffic Correlation on Tor by Realistic Adversaries][17], there's been talk of rotating entry guards even **less** frequently.

If you decide to force Tor to choose new entry guards, it's easily accomplished. Before switching one of your Whonix gateway VMs to a different VPN exit, run these commands:

    sudo su
    cd /var/lib/tor
    cat state | more

Note the names of the entry guards (typically three). Then run these commands:

    service tor stop
    rm *

It's important to stop Tor before clearing /var/lib/tor. Otherwise, it may all get rebuilt during normal shutdown. After rebooting the gateway, give it a few minutes to connect to the Tor network and fix itself, and then run these commands:

    sudo su
    cd /var/lib/tor
    cat state | more

You should now see a different set of entry guards.

 [1]: http://en.wikipedia.org/wiki/Printer_steganography
 [2]: http://blockchain.info/
 [3]: http://bitcoincharts.com/charts/mtgoxUSD#rg360ztgSzm1g10zm2g25zv
 [4]: http://blockchain.info/wallet/
 [5]: http://bitcoin.org/en/choose-your-wallet
 [6]: http://blockchain.info/charts/blocks-size
 [7]: https://en.bitcoin.it/wiki/Buying_bitcoins
 [8]: https://localbitcoins.com/
 [9]: https://bitcointalk.org/index.php?board=53.0
 [10]: http://bitcoin-otc.com/
 [11]: https://www.whonix.org/wiki/Main_Page
 [12]: https://blockchain.info/
 [13]: http://bitlaundry.appspot.com/
 [14]: http://fogcore5n3ov3tui.onion/
 [15]: https://blockchain.info/wallet/
 [16]: https://blog.torproject.org/category/tags/entry-guards
 [17]: http://www.ohmygodel.com/publications/usersrouted-ccs13.pdf
