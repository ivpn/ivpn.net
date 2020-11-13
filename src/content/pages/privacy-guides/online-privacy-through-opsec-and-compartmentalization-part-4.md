---
title: 'Online Privacy Through OPSEC and Compartmentalization: Part 4'
author: mirimir (gpg key 0x17C2E43E)
url: /privacy-guides/online-privacy-through-opsec-and-compartmentalization-part-4/
section: Advanced
weight: 120
date: 2017-09-05T11:59:32+00:00
layout: guides-details
---
## OPSEC Countermeasures

Once risks have been identified and ranked, one must identify countermeasures. One must then assess their effectiveness and cost, relative to potential impacts. And one must assess the "possibility that the countermeasure could create an OPSEC indicator" ([DoD OPSEC manual][1] at p. 14). Where warranted by risk and worth the cost, one applies countermeasures. And finally, one assesses the effectiveness of countermeasures in practice. I focus here on four groups of countermeasures: (1) common sense and security mindedness; (2) awareness of egocentrism, pride, vanity and greed; (3) compartmentalization with multiple personas; and 4) technical implementation.

### Common Sense and Security Mindedness

![Loose Lips Might Sink Ships](/images-static/uploads/loose-lips-might-sink-ships.jpg)

Allen Dulles' [73 Rules of Spycraft][2] begins with common sense:

> The greatest weapon a man or woman can bring to this type of work in which we are engaged is his or her hard common sense. The following notes aim at being a little common sense and applied form. Simple common sense crystallized by a certain amount of experience into a number of rules and suggestions.

He goes on to emphasize the importance of security mindedness:

> 2. Security consists not only in avoiding big risks. It consists in carrying out daily tasks with painstaking remembrance of the tiny things that security demands. The little things are in many ways more important than the big ones. It is they which oftenest give the game away. It is consistent care in them, which form the habit and characteristic of security mindedness.

> 3. In any case, the man or woman who does not indulge in the daily security routine, boring and useless though it may sometimes appear, will be found lacking in the proper instinctive reaction when dealing with the bigger stuff.

He also warns against carelessness:

> 9. The greatest vice in the game is that of carelessness. Mistakes made generally cannot be rectified.

> 8. Never leave things lying about unattended or lay them down where you are liable to forget them. Learn to write lightly; the `blank` page underneath has often been read. Be wary of your piece of blotting paper. If you have to destroy a document, do so thoroughly. Carry as little written matter as possible, and for the shortest possible time. Never carry names or addresses en clair. If you cannot carry them for the time being in your head, put them in a species of personal code, which only you understand. Small papers and envelopes or cards and photographs, ought to be clipped on to the latter, otherwise they are liable to get lost. But when you have conducted an interview or made arrangements for a meeting, write it all down and put it safely away for reference. Your memory can play tricks.

> 17. The greatest material curse to the profession, despite all its advantages, is undoubtedly the telephone. It is a constant source of temptation to slackness. And even if you do not use it carelessly yourself, the other fellow, very often will, so in any case, warn him. Always act on the principle that every conversation is listened to, that a call may always give the enemy a line. Naturally, always unplug during confidential conversations. Even better is it to have no phone in your room, or else have it in a box or cupboard.

Much of this may seem pointlessly old-school. But for those who work with computers and the Internet, there are now far more opportunities to be careless and leave traces for adversaries to find. Traces on our computers. Traces of online connectivity. Traces from browsing, email and messaging. Strong encryption is widely available now, at least. But there's still the risk from metadata (URLs, email addresses, IP addresses, etc). Smartphones are ubiquitous, and are vulnerable to surveillance and tracking. And people still write on paper, sometimes. There are just so many ways to fail.

Anyway, security mindedness is indeed essential. And for that, it's crucial to pay attention, to [be present][3] to your life:

> We train ourselves to see reality exactly as it is, and we call this special mode of perception 'mindfulness.' This process of mindfulness is really quite different from what we usually do. We usually do not look into what is really there in front of us. We see life through a screen of thoughts and concepts, and we mistake those mental objects for the reality.

Seeing "reality exactly as it is", rather than our thoughts and feelings about it, is the basis for `security mindedness`. Also crucial is seeing ourselves objectively. And thinking through the consequences of every action. Globally, and from an [adversary's perspective][4]:

> In addition to being a process, OPSEC is also a mindset.
  
> It means being able to consider your organization or environment from the point of view of your adversary.
  
> This allows you to consider your vulnerabilities from the perspective of the threat based on their capabilities and actions.

It's rather like activating [God mode][5] in first-person shooter (FPS) video games. That's the default mode in chess and Go, of course.

Anyway, it was traces—carelessly left and/or carelessly forgotten—that pwned the principals in most of my examples:

  * Ross Ulbricht used his Gmail address on Bitcoin Forum, looking for a coder. He kept everything (including email and chat logs, a [diary][6], and true-name data for all staff) on one encrypted laptop. And he routinely carried and used that laptop in public, providing opportunities for the FBI to seize it.
  * Roger Thomas Clark provided an image of his passport to Ross Ulbricht. So he (and other Silk Road staff) were pwned when Ross was.
  * Artem Vaulin registered kickasstorrents.biz using his real name.
  * Shannon McCoole used the same unusual greeting, and similar usernames, in multiple online accounts. And in one of them, he researched 4WD lift kits, and then bragged about them on his personal Facebook page.
  * Hector Monsegur had linked personas going back well over a decade. Early personas were linked to his meatspace identity. And someone had retained IRC logs, including all of that information.
  * Tomáš Jiříkovský created sheepmarketplace.com before the Sheep Marketplace onion site, and complained there "about the problems of running a Bitcoin-using hidden service". And **after** being doxxed as the owner, he cashed out implausibly huge amounts of Bitcoin that he had stolen.

As Allen Dulles notes, it's the `little things`. Rigorous anonymity may not seem important, when you're a clueless n00b, when you're just playing around. Say, when you prototype this cool anonymous online market, like Silk Road or Sheep Marketplace. And then, after it takes off and becomes internationally infamous, you're just too stressed out to remember such little things. Or say, when you're starting out with your Pirate Bay clone. Or when you're 12 years old and learning to hack, and start hanging out on IRC.

### Awareness of Egocentrism, Pride, Vanity, Greed and Lust

![The Seven Deadly Sins (Hieronymus Bosch)](/images-static/uploads/Boschsevendeadlysins.jpg)

[Allen Dulles][2] observes:

> 10. The next greatest vice [after carelessness] is that of vanity. Its offshoots are multiple and malignant.

> 11. Besides, the man with a swelled head never learns. And there is always a great deal to be learned.

However, according to Jane Austen, in [_Pride and Prejudice_][7]:

> Vanity and pride are different things, though the words are often used synonymously. A person may be proud without being vain. Pride relates more to our opinion of ourselves, vanity to what we would have others think of us.

So actually, I think that Dulles is talking more about pride (`swelled head`) than about vanity. But typically they go together, and both are dangerous. Pride leads to overconfidence, and vanity to bragging. Nick Romeo recently blogged some relevant [tl;dr][8] from Plato:

> ... In the Apology, Socrates claims to be wiser than other men only because he knows that which he does not know. When Kahneman writes that we are 'blind to our blindness', he is reviving the Socratic idea that wisdom consists in seeing one's blindness: knowing what you do not know.

> Intellectual humility and overconfidence can stem from purely cognitive processes, but they are also correctly understood as moral achievements or failings. Someone who always thinks that he is right about everything, however little he knows, is making a moral as well as a mental mistake. Similarly, the cultivation of intellectual humility is, in part, the cultivation of an ethical virtue.

> ...

> ... This is only a preliminary step in Plato's dialogues – a (good-natured) reaching after fact and reason should and does occur – but an initial tolerance of uncertainty is a capacity without which individuals and societies cannot adequately self-correct and improve. People who are pained and irritated by not knowing something reach prematurely for whatever apparent reasons are most accessible.

Ironically enough, [Jonah Lehrer][9] has written quite eloquently about how smart people make [stupid mistakes][10]. The fundamental problem seems to be egocentrism. That is, it's relatively easy to rationally and objectively evaluate other people's behavior. But it's hard to be rational and objective about ourselves. It's hard to face the facts, and consider what to do about them. We're often just too attached. Introspection typically opens up a morass of feelings, excuses, rationalization, wishful thinking, blame, and denial. There are also the illusions of being immortal, and smarter than others. Basically, we're [biased][11]. What's needed are mindfulness and humility.

Consider Hector Monsegur's comment in an [interview][12] after his brief imprisonment: `I've been hacking since '95, ... There's only so much you can do before you get caught.` OK, so I can imagine how many `criminals` would say something like that, especially after being caught. But it's rationalization. His sins were carelessness and bragging. Plus pushing children into crime, and then snitching on them, [according to][13] Ryan Ackroyd (LulzSec's Kayla). What happens, I think, is that we know (at some level) that we've screwed up. But the mechanisms driving our behavior are largely unconscious. Our conscious ego is happy to take credit for success, but it tends to suppress evidence of error. There's a strong need to be right. And when evidence of error becomes undeniable, the ego may flip to fatalism. And making excuses.

Another trap is greed. Consider [Tomáš Jiříkovský][14]. I mean, what else could explain how he cashed out a fortune in stolen Bitcoin, from a darknet drug marketplace, less than a month after being interviewed about alleged connections to said darknet drug marketplace in his country's major newspaper? But hey, $100 million is undeniably tempting. It's likely that greed also dissuaded Ross Ulbricht from giving up Silk Road.

[Dulles][2] also warns about sex and alcohol:

> 12. Booze is naturally dangerous. So also is an undisciplined attraction for the other sex. The first loosens the tongue. The second does likewise. It also distorts vision and promotes indolence. They both provide grand weapons to an enemy.

> 13. It has been proved time and again, in particular, that sex and business do not mix.

OK, so Ross Ulbricht did tell his off-and-on girlfriend Julia Tourianski about Silk Road, and she apparently told one of her friends, who then [posted][15] about it on his Facebook wall:

> I'm sure the authorities would be interested in your drug-running site.

But hey, she later became a staunch [defender][16]. Albeit after being forced to testify at his trial.

### Compartmentalization with Multiple Personas

![firewalls between electrical gear](/images-static/uploads/menu_bar_wall.jpg)

It's clear from my examples that pseudonymity alone is a fragile defense. Once pwned in any context, everything is pwned, because it's all tied together. As I've noted, it's far more robust to fragment and compartmentalize one's online activity across multiple unlinked personas. Ross Ulbricht and Hector Xavier Monsegur both lacked adequate compartmentalization, over time. That is, even if their current OPSEC was good, which it actually wasn't, there were links to past activity with pitiful OPSEC. Shannon McCoole basically didn't compartmentalize. He was `skee who says hiyas` on The Love Zone, and basically the same everywhere else online.

Compartmentalization (aka compartmentation) entails the isolation of stuff in compartments. That may involve walls, physical or figurative, or just the absence of connections. The goal is preventing bad things from spreading. Limiting access and damage. For example, military aircraft (containing fuel and munitions) are prudently isolated in combat environments by [blast walls aka revetments][17]. Explosives are often stored in isolated bunkers, separated by blast walls. [Firewalls][18] are used between townhouse units, between electrical components at substations, between engine and passenger compartments of vehicles, and so on. Compartmentalization plays diverse roles in [biological organisms][19].

And yes, compartmentalization is a crucial component of [Information Security (INFOSEC)][20] and [Operations Security (OPSEC)][21]:

> Operations Security sounds like something that would only concern spies and special operations soldiers. The reality is that since your government is likely spying on you, even if you `have nothing to hide`, OpSec concerns you. It's a concept you need to become familiar with and begin to apply in your daily life. Maintaining Operational Security is simply the practice of taking small steps to secure the information you don't want disclosed.

> ...

> Failing to compartmentalize: It's important enough to repeat. If someone doesn't have a need to know, don't tell them. This isn't a sign of distrust, it's a sign you are trustworthy. Remember that when you disclose unnecessary information about yourself, you are probably disclosing it about others.

From [Allen Dulles][2]:

> 51. If you have several groups, keep them separate unless the moment comes for concerted action. Keep your lines separate; and within the bounds of reason and security, try to multiply them. Each separation and each multiplication minimizes the danger of total loss. Multiplication of lines also gives the possibility of resting each line, which is often a very desirable thing.

> 64. Away from the job, among your other contacts, never know too much. Often you will have to bite down on your vanity, which would like to show what you know. This is especially hard when you hear a wrong assertion being made or a misstatement of events.

> 65. Not knowing too much does not mean not knowing anything. Unless there is a special reason for it, it is not good either to appear a nitwit or a person lacking in discretion. This does not invite the placing of confidence in you.

> 66. Show your intelligence, but be quiet on anything along the line you are working. Make others do the speaking. A good thing sometimes is to be personally interested as `a good patriot and anxious to pass along anything useful to official channels in the hope that it may eventually get to the right quarter.`

And from [the grugq][22]:

> The cornerstone of any solid counterintelligence program is compartmentation. Compartmentation is the separation of information, including people and activities, into discreet cells. These cells must have no interaction, access, or knowledge of each other. Enforcing ignorance between different cells prevents any one compartment from containing too much sensitive information. If any single cell is compromised, such as by an informant, the limitats _sic_ of the damage will be at the boundaries of the cell.

> Now, compartmenting an entire organization is a difficult feat, and can seriously impede the ability of the organization to learn and adapt to changing circumstance. However, these are are not concerns that we need to address for an individual who is compartmenting their personal life from their illicit activity.

> Spooks, such as CIA case officiers [_sic_], or KGB illegals, compartment their illicit activity (spying) from their `regular` lives. The first part of this is, of course, keeping their mouths shut about their illicit activities! There are many other important parts of tradecraft which are beyond the scope of this post. But remember, when you are compartmenting your life, the first rule is to never discuss your illicit activities with anyone outside of that compartment.

{{< raw-html >}}
<figure>
    <img src="/images-static/uploads/bedohave.png"
        srcset="/images-static/uploads/bedohave.png 1x, /images-static/uploads/bedohave@2x.png 2x"
        alt="Be->Do->Have cycle" />
</figure>
{{< / raw-html >}}

OK, so how does one go about compartmentalizing with multiple personas? First, consider the standard advice for personal development. That is, after considering your principles and values, you formulate some goals. Then you consider how you would achieve those goals, what actions you would need to take. And finally, you consider who you would need to become to effectively take those actions. When it comes to implementation, however, the first step is being. Because actions grow out of being. It's the classic [Be->Do->Have cycle][23].

But of course, life isn't that simple. We all live in multiple realms. Family. Social life. Spirituality. Work. Play. And these realms call forth [distinct ways of being][24]. In order to play safe online, you must distinguish subrealms, with particular interests and goals. Then you create one or more personas for each distinct subrealm. With adequate compartmentalization, adversaries don't see you as a person, but only as unrelated personas.

Requisite skills come from fields of fiction writing, acting, role-playing games, and cosplay. Character design is a core component of [writing a novel][25]. Few personas need elaborate storylines, but language is essential, and location is often necessary. It also helps to think through each persona's history and interests. There's the [tension][26] between being what you know, and revealing too much about yourself. It's also common to [base characters on composites of real people][27]. Indeed, it's arguable that real people are [composites of real people][28] who raised and influenced them. But do avoid [pwning yourself or your friends][29]. Creative lying also helps. You may also enjoy some spiritual inspiration, such as [traditional budō][30] or [something more fanciful][31].

OK, so names used for personas are key indicators. With good compartmentalization, each persona will only associate its own stuff, and won't implicate other personas. But still, when developing a new persona, one of my first steps is to google the name and username. For example, I picked `mirimir` based on the idiomatic Russian toast `мир и мир` (world peace). But there was already the artist [Miriam Laina][32], [Mirimir Alvarez][33] and [میریم سفر [Go travel]][34]. So hey.

Other key indicators are language usage and style. For example, Mirimir uses English, with traces of British and southern US vernacular. I've drawn some of that from experience, and some from people I've known and worked with. But I've also drawn from literature and films. For example, when using this persona, I get present to memories and associations that are based on William S. Burroughs' `escape child` [Kim Carsons][35].

I base other personas in the same way, on experience, people and fictional characters. There's typically some fictional character, and a setting where it operates, which presence me to the persona, and help me to get in character. Some personas also use English, but with perfect grammar and extremely generic style. Other personas use various other languages, more or less properly, depending on my expertise in them. Sometimes I use offline translation apps, with local dictionaries. Online translation is rather too obvious.

Then there are the obvious indicators: address, email, and landline and cell numbers. Email is easy. Just signup via some mix of VPNs and Tor (depending on usage) and you're good to go. It's best to use services that only require email. But even for services that require address and telephone numbers, they only check for validity before account activation, if at all. I typically use hostels. Some services may require telephone confirmation, but you can just let them go. If it's something you need, you can use online services that interface cellular SIM cards for texting. Or burner phones, but those are geolocation risks. At worst, using fake information, you'll lose the account if they check. So plan accordingly.

The main goal is to avoid any association with your meatspace identity. Not by name. Not by contact information. Not by language usage and style. Not by interests. Not even by literature that you base personas on. You don't draw on stuff that you've recently purchased in meatspace, or stuff that you discuss using your meatspace persona, especially online. And obviously, you must use some mix of VPNs and Tor (depending on usage) to avoid any association with your meatspace identity by IP address.

For strong compartmentalization, it's also important to avoid associations among personas. So you use different addresses etc, and different network paths, using nested VPN chains with different final VPNs, and/or different Whonix instances. However, in some cases it's OK to have some associations between a persona and one or more sub-personas, which are posing as that persona's personas. Sometimes, I do that to be playful, and sometimes for purely practical reasons.

Takeaways from an [interview][36] with Lindsay Moran, an ex-CIA operative, offer useful insight:

  * When trying to compartmentalize, make sure your motivators of money, ideology, coercion, and ego, and fulfilled internally. Do not rely on an external resource for this.
  * A confidentiality and anonymity (or un-attributability) win over merely confidentiality in the face of electronic surveillance.
  * Identify the natural tendencies to shut down, or tunnel yourself into a single identity, and compensate by building personal, trusted relationships in your other identities.

But even so, as [the grugq][37] notes, compartmentalization is stressful:

> If the operative isn’t living a completely isolated clandestine lifestyle in their Unabomber cabin, they will have to isolate parts of their individual selves to compartment the different aspects of their lives. There will be their normal public life, the one face they show to the world, and also a sharded ego with their clandestine life. Maintaining strict compartmentation of the mind is stressful, the sharded individual will be a sum less than the total of the parts.

> As if that wasn’t enough, there is the constant fear of discovery, that the clandestine cover will be stripped away by the adversary. This leaves the operative constantly fretting about the small details of each clandestine operational activity. Coupled with the compartmentalization of the self, the operative also has to stress about each non-operational activity, will this seemingly innocent action be the trigger that brings it all crashing down?

![Dover Castle](/images-static/uploads/dover.jpg)

That's true. But using multiple layers of personas helps protect against catastrophic failure, as noted in a [guide][38] for making anonymous online purchases:

> Depending on the kind of operation, the fake identity that will be used, has to be as authentic as possible. A layered approach is used, meaning that one would create a fake online identity and completely compartmentise this identity from its real identity. This fake identity would then be used to create other fake identities. It ensures that if one fake identify gets compromised, it would not lead to de-anonymization of the person's real identity, but instead just one 'layer' or ‘compartment' of the identity protection would have been 'peeled off'. In practice this means that created email addresses point consequently only to the email address of its previous ‘layer' and not layers beneath its previous 'layer'. As in other OPSEC practices, avoiding contamination and profiling between the 'wrapped' identities is vital.

[Allen Dulles][2] suggests an analogous approach:

> 39. When you have made a contact, till you are absolutely sure of your man — and perhaps even then — be a small but eager intermediary. Have a `They` in the background for whom you act and to whom you are responsible. If `They` are harsh, if `They` decide to break it off, it is never any fault of yours, and indeed you can pretend to have a personal grievance about it. `They` are always great gluttons for results and very stingy with cash until `They` get them. When the results come along, `They` always send messages of congratulation and encouragement.

Using multiple online personas is useful for more than privacy and anonymity. It can be an expression of playfulness. And it can help you be [more creative][39]:

> Pretending to be someone else: When you're stuck in a creative process, unfocus may also come to the rescue when you embody and live out an entirely different personality. In 2016, educational psychologists, Denis Dumas and Kevin Dunbar found that people who try to solve creative problems are more successful if they behave like an eccentric poet than a rigid librarian. Given a test in which they have to come up with as many uses as possible for any object (e.g. a brick) those who behave like eccentric poets have superior creative performance. This finding holds even if the same person takes on a different identity.

### Technical Implementation

My focus here has been on strategy and tactics. I won't be getting into details of technical implementation. Lately, however, I've written primarily about that. Available options for general Internet access are VPNs, JonDonym, and Tor. One can also use I2P, with network outproxies, but the latency is even higher than with Tor. Each has its strengths and its weaknesses. And there's great uncertainty. Anyway, for more on those issues, see [`Will a VPN Service Protect Me? Defining your Threat Model`][40] and [`Adversaries and Anonymity Systems: The Basics`][41].

The best bet is using personas, with data compartmentalized in some mix of hardware and virtual machines (VMs), and network connectivity correspondingly compartmentalized with nested proxy chains. See [`Advanced Privacy and Anonymity Using VMs, VPN's & Tor`][42] and [`How to perform a VPN leak test`][43].

An issue that deserves more attention is the compartmentalization of encrypted information. Consider how Ross Ulbricht kept everything about Silk Road on his LUKS encrypted laptop. If the FBI had swatted him at home, he would arguably have had time to shut it down. Unless agents were prepared to extract the key from RAM. But they were smarter than that. They busted him in public, and managed to acquire his laptop with LUKS unlocked. So they had everything: his diary, email, chat logs, accounting spreadsheets, personnel files, and so on. Oops.

It would have been safer to compartmentalize data in multiple encrypted containers. Enigmail (using GnuPG public-key encryption) typically works that way. All encrypted messages, including draft unsent messages, are encrypted in storage, and decrypted as needed. One can also use GnuPG for encrypting individual files, or archived folders. But that can get tedious. For general storage, one can create file-based encrypted containers with [VeraCrypt][44] or [Tomb][45]. Tomb uses cryptsetup to create LUKS volumes on loop devices, which are just files. With any file-based approach, it's prudent to deactivate all swap devices (swapoff -a) to avoid leaving traces on disk.

Alternatively, one can have multiple LUKS partitions, with only the main one decrypted and mounted at boot. It's easy to decrypt and mount LUKS partitions with the disk utility. Backup and recovery of LUKS partitions is more error-prone than simple file management, however. For those who compartmentalize in VMs, another option is using multiple LUKS-encrypted virtual disks. In VMs, they behave just like LUKS partitions. But in the host, they're just encrypted files.

![xkcd: $5 Wrench](/images-static/uploads/securitycomic.png)

OK, so let's say that an adversary has both you and your encrypted stuff. The encryption is unbreakable. And the adversary believes that you know the password(s). But you refuse to decrypt. Under some circumstances, you'll be tortured. Elsewhere, you may be [jailed][46], perhaps [indefinitely][47]. Even if you have truly forgotten your passwords. At borders, non-residents may be [denied entry][48]. If there's other reason for suspicion, authorities may [escalate][49].

If such risks concern you, you can mitigate them by physically compartmentalizing yourself from your encrypted stuff. That is, you store your encrypted stuff anonymously online. To reduce the risk and impact of loss, you can have multiple compartments, and store multiple copies of each, in different places. So you possess the minimum required for whatever you're currently working on. However, few could remember that much information about locations, passwords, etc. But if you encrypt and store it locally, you're faced with the same issue about refusing to decrypt stuff.

There's an obvious solution. Encrypt the information, and anonymously store multiple copies online. But you still need to remember a few online locations, and some usernames and passwords. Some can remember that much, I'm sure. But for those that want some backup, there's [Shamir's Secret Sharing Scheme][50]:

> In this paper we show how to divide data D into n pieces in such a way that D is easily reconstructable from any k pieces, but even complete knowledge of k-1 pieces reveals absolutely no information about D. This technique enables the construction of robust key management schemes for cryptographic systems that can function securely and reliably even when misfortunes destroy half the pieces [_sic_, actually n-k] and security breaches expose all but one of the remaining pieces [k-1].

This is, by the way, from [Adi Shamir][51], the co-inventor of RSA. There's the Debian package [ssss][52] by Bertram Poettering. And, just to be clear, he notes that the scheme is provably (aka unconditionally) secure:

> Note that Shamir's scheme is provable secure, that means: in a (t,n) scheme one can prove that it makes no difference whether an attacker has t-1 valid shares at his disposal or none at all; as long as he has less than t shares, there is no better option than guessing to find out the secret.

However, with ssss you're limited to 128 ASCII characters (bytes, which is 1024 bits). That's enough for four 32-character blocks, each comprising:

  * 11-15 characters for an IPv4 address or URL hint
  * five characters for a username
  * 12-16 characters for a password

Say that you use n=10 and k=3. So now you have ten strings to hide somewhere. Each string comprises a sequence number (`01-` to `10-`) and 256 ASCII characters. For example:

> 01-3a33b47a4d887260...0b2950346ca889f6
  
> 02-08ec7fe42b44d5fb...a533b5add1d26016
  
> ...
  
> 10-a1570c913ed06cd3...48868f06b813b08c

Only three of the strings are needed to recover the original data, and two of those can be known by the adversary. To obscure the sequence numbers, you could replace `01-` with `a`, and so on. So that gives you ten 257-character strings to hide. You might [post][53] them to discussion forums. Or tweet them. Or use [Deep Sound][54] to hide them in audio tracks, using [steganography][55]. Or print them, embed in plastic, and [geocache][56] them (using a passive ‎GPS receiver‎, to avoid pwnage). Whatever you like.

 [1]: https://www.OPSECprofessionals.org/official/081103_DOD_OPSEC_Manual.pdf
 [2]: https://blog.cyberwar.nl/2016/02/some-elements-of-intelligence-work-73-rules-of-spycraft-allen-dulles-1960s/
 [3]: http://www.vipassana.com/meditation/mindfulness_in_plain_english_5.php
 [4]: http://www.opsecprofessionals.org/training/OPSEC_Training.pdf
 [5]: https://www.quora.com/Which-video-games-feature-God-mode
 [6]: https://www.wired.com/2015/01/heres-secret-silk-road-journal-laptop-ross-ulbricht/
 [7]: https://www.goodreads.com/quotes/21824-vanity-and-pride-are-different-things-though-the-words-are
 [8]: https://aeon.co/essays/what-plato-knew-about-behavioural-economics-a-lot
 [9]: https://en.wikipedia.org/wiki/Jonah_Lehrer
 [10]: http://www.newyorker.com/tech/frontal-cortex/why-smart-people-are-stupid
 [11]: https://en.wikipedia.org/wiki/List_of_cognitive_biases
 [12]: http://kernelmag.dailydot.com/issue-sections/headline-story/13945/sabu-hector-monsegur-interview/
 [13]: http://pastebin.com/raw/fSdTyJSw
 [14]: https://www.deepdotweb.com/wp-content/uploads/2015/03/2.png
 [15]: https://motherboard.vice.com/en_us/article/friend-testifies-in-silk-road-trial-richard-bates
 [16]: https://dollarvigilante.com/blog/2015/01/14/julia-tourianski-on-the-most-important-trial-of-our-generati.html
 [17]: http://www.globalsecurity.org/military/intro/images/revetment-dfst9209119.jpg
 [18]: https://en.wikipedia.org/wiki/Firewall_%28construction%29
 [19]: http://profwelday.weebly.com/uploads/2/3/0/0/23005790/_ch_03_lecture_presentation.pdf
 [20]: https://en.wikipedia.org/wiki/Compartmentalization_%28information_security%29
 [21]: http://thefifthcolumnnews.com/2017/03/tradecraft-introduction-to-opsec/
 [22]: https://grugq.github.io/blog/2013/06/13/ignorance-is-strength/
 [23]: https://3.bp.blogspot.com/_4X_vI_fIqHg/TTnNVC47g-I/AAAAAAAAB8E/L5LEmS0vcBI/s1600/Be%2BDo%2BHave.jpg
 [24]: http://static.boredpanda.com/blog/wp-content/uploads/2014/11/the-soldier-art-project-military-photography-devin-mitchell-47.jpg
 [25]: http://www.advancedfictionwriting.com/articles/snowflake-method/
 [26]: https://writers.stackexchange.com/questions/26748/how-to-make-sure-that-you-dont-end-up-writing-a-self-insert
 [27]: https://www.reddit.com/r/writing/comments/3mi6en/is_it_a_common_practice_to_base_characters_on/
 [28]: http://www.chadpearce.com/Home/BOOKS/112327702-Am-a-Strange-Loop-Douglas-R-Hofstadter.pdf
 [29]: http://tvtropes.org/pmwiki/pmwiki.php/Main/ConvenientlyUnverifiableCoverStory
 [30]: https://en.wikipedia.org/wiki/Bud%C5%8D
 [31]: http://aeternalae.wikia.com/wiki/Aeternal_Pledged
 [32]: http://mirimir.deviantart.com/
 [33]: https://www.facebook.com/mirimirimir
 [34]: http://mirim.ir/
 [35]: https://www.youtube.com/watch?v=XfAvB2BWdLs
 [36]: http://www.b3rn3d.com/blog/2014/03/09/cia-spycraft-psychology/
 [37]: http://blogsofwar.com/hacker-OPSEC-with-the-grugq/
 [38]: https://arxiv.org/pdf/1505.07370.pdf
 [39]: https://hbr.org/2017/05/your-brain-can-only-take-so-much-focus
 [40]: /privacy-guides/will-a-vpn-protect-me/
 [41]: /privacy-guides/adversaries-and-anonymity-systems-the-basics/
 [42]: /privacy-guides/advanced-privacy-and-anonymity-part-1/
 [43]: /privacy-guides/how-to-perform-a-vpn-leak-test/
 [44]: https://www.veracrypt.fr/en/
 [45]: https://www.dyne.org/software/tomb/
 [46]: http://www.legislation.gov.uk/ukpga/2000/23/part/III
 [47]: https://arstechnica.com/tech-policy/2017/03/man-jailed-indefinitely-for-refusing-to-decrypt-hard-drives-loses-appeal/
 [48]: https://www.eff.org/wp/digital-privacy-us-border-2017
 [49]: http://www.madirish.net/366
 [50]: http://www.dtic.mil/cgi-bin/GetTRDoc?AD=ADA069397
 [51]: http://amturing.acm.org/award_winners/shamir_2327856.cfm
 [52]: http://point-at-infinity.org/ssss/
 [53]: https://www.wilderssecurity.com/threads/test.394408/
 [54]: https://null-byte.wonderhowto.com/how-to/hacks-mr-robot-hide-data-audio-files-0164136/
 [55]: https://tag.wonderhowto.com/steganography/
 [56]: https://en.wikipedia.org/wiki/Geocaching
