---
title: Applying Risk Management to Privacy
author: Ed Holden
url: /privacy-guides/applying-risk-management-to-privacy/
section: Basic
weight: 50
articles: [
  {
    title: "Creating a VM within a hidden truecrypt partition",
    url: "/privacy-guides/creating-a-vm-within-a-hidden-truecrypt-partition/"
  },
  {
    title: "How to perform a VPN leak test",
    url: "/privacy-guides/how-to-perform-a-vpn-leak-test/"
  },
  {
    title: "How to verify physical locations of Internet servers",
    url: "/privacy-guides/how-to-verify-physical-locations-of-internet-servers/"
  }
]
date: 2013-10-23T13:53:54+00:00
layout: guides-details
---
Here is a startling fact: **there is no perfect privacy solution on the internet**. The truth is that every time you send bits down the wire, there is a chance that someone along the way is tying those bits back to your real-world identity. My guess is that now you are telling yourself, `Of course, I've always known that.` Good, because we are not going to spend the time to establish the validity of this claim - others have done that in more detail and with more direct evidence than I have access to (just ask former AT&T technician Mark Klein{{< sup >}}[1](#ref1){{< / sup >}}).

## Why risk management

Despite knowing that fact, we in the privacy-aware community often haphazardly apply whatever internet privacy safeguards we have access to, without regard for addressing specific threats. Sometimes this leads to missing certain essential safeguards, such as ensuring that we are connecting to our email servers using SSL/TLS, but then not thinking about the fact that our emails are then usually sent without encryption over the wire to the recipient's email server. More often than that, though, we end up throwing every tool at every problem, thus degrading the quality of our online experience unnecessarily. Imagine here the case of an individual with a trusted laptop accessing his email server through an untrusted local network. Knowing that the network is untrusted and believing that the network owner has an interest in reading the user's email, the user ensures he is using email encryption such as GPG and that he is connecting to his server over a SSL/TLS wrapped connection. Now, this is a solution that will in fact mitigate against the threat of eavesdropping by the network owner but it also carries with it a fairly high price in terms of convenience: the person you are sending the email to must also be a GPG user (and those of us who have tried to use GPG regularly know how big of an uphill battle it is to convince others to do the same). Essentially, the point is that all privacy and security assurances come with a cost in terms of convenience. Given that fact, it makes sense that we take the time to analyze what specific privacy risks we are trying to mitigate and apply the minimum necessary solution the address those risks. In short, we should apply risk management techniques to our online privacy concerns, lest we end up creating systems that are unnecessarily onerous that we, in all honesty, are unlikely to comply with in the long run due to the convenience factor.

## Risk management steps

We are going to take an example-driven simplified view at applying a well-known risk management framework to the question of securing one's privacy on the internet. We will be using the US National Institute of Standards and Technology Risk Management Framework, a system that serves as a model for many other proprietary risk management systems and is well known to many who operate in the information security world. This framework includes the following steps:

  1. Categorize the information based on importance or impact
  2. Select a baseline set of controls to protect that information from the known set of relevant threats
  3. Implement those controls
  4. Authorize the system based on the evidence that the residual (unmitigated) risk is acceptable
  5. Monitor the implemented controls on a continuous basis to ensure that they are functioning to truly mitigate the targeted risks.

### Categorize

Consider the case of a political dissident in a nation with an oppressive regime. He holds a regular job, attends the expected social functions, but at night he posts to a non-domestically hosted blog about the injustices he witnesses in his home country. This is the only subversive action he takes. In this situation, the dissident would categorize only his identity in the blog posts as essential to be kept private - the government, at least putatively, has no interest in his regular emails and other internet-based activity. Further, he knows that there is collusion between the companies that provide internet access in his country and the government, and that this collusion entails tracking the source of blog posts that undermine the current regime.

### Select

Based on the facts our dissident is aware of listed above, he decides that the best way to protect his identity is to ensure that all of his blogging activity happens over an encrypted connection that terminates outside of his country. To accomplish this, he selects an international VPN service that allows him to choose an exit point in a different country{{< sup >}}[2](#ref2){{< / sup >}}. He now knows that the government, through its collusion with his ISP, can only see an encrypted stream of traffic from his computer to the VPN server: no data and no final destinations are available to them.

### Implement

This is where the user's technical expertise is put to the test. With every risk mitigation technique, there are key items that must be implemented correctly or the mitigation will fail. For the dissident, one of these key items is to ensure that his computer is in fact sending all internet-bound traffic over the VPN tunnel, including DNS requests. If his DNS requests are going to his home router instead, it is likely that this router gets its DNS info from the ISP's server, thus providing knowledge to his ISP that he is accessing anti-government web sites. This becomes the most dangerous type of situation - one where you believe a risk is adequately mitigated, but in fact, this belief is just an illusion. If this were the case for our dissident, he would carry on making his blog posts until his door was kicked in and he was `disappeared,` all the while, wondering what went wrong. The take-away point here is to make sure that you have the technical expertise to implement the risk mitigation technologies you choose.

### Assess

During this step, our political dissident would run tests to validate that his VPN service is actually encrypting and forwarding all of the traffic that could provide information leak. He might run tcpdump or Wireshark on his network interface to ensure that all internet-bound traffic was in fact tunneled through the encrypted VPN connection. He could also watch the handshake connection with the VPN server to ensure that a cypher of sufficient strength to prevent cracking was being used. In big-picture terms, this is where you verify that your protection scheme is working the way you intended it to.

### Authorize

Now, in a large organization or government, this is the step where a system would be evaluated by a supervisory person or group to ensure that the risk/payoff ratio was minimized to a sufficient degree given the goals of the organization. Of course our dissident has no such supervisor. Instead, on an individual user basis, this is where our dissident would step back and think again about what he is risking (threat of violence for speaking out about his government) and whether or not the mitigating technologies do in fact reduce that risk to an acceptable level. It is easy to want to gloss over this step and just run with the system as it has been configured. However, it is always prudent to take one last moment before taking the risk to step back and ask oneself again, `Have I articulated all the risks I can think of and do my mitigation strategies actually address all of those risks?`

### Monitor

This is the final and continuous step in the risk management process. For our dissident, this involves not just spot checking his VPN connection to ensure that it is working correctly, but also keeping aware and informed of new risks that may emerge. For instance, the encryption certificates for his VPN service could be compromised or there may be a flaw discovered in the cryptographic cipher being used. Maybe no new technological risk emerges but instead his government just decided to begin searching the homes of anyone who they detect connecting to a non-domestic VPN service. Either way, it is vital to understand that the risk landscape is constantly in flux and one must continue to be aware of those changes in order to maintain the level of privacy one has established.

In conclusion, remember that this is a highly simplified example of how the risk management process is carried out. Each individual will likely identify many risks with varying levels of likelihood, each requiring different strategies to mitigate. Even if you choose not to follow this process in a formal manner, it is still useful to practice thinking of threats to one's privacy in these general terms - it will help guide your thinking towards finding optimal solutions that are both effective and easy enough to live with.

{{< raw-html >}}
<div class="footnotes">
  <hr />
  
  <h2>
    Footnotes
  </h2>
  
  <ol>
    <li id="ref1">
      <a href="http://en.wikipedia.org/wiki/Mark_Klein" target="_blank">http://en.wikipedia.org/wiki/Mark_Klein</a>
    </li>
    <li id="ref2">
      For the purposes of this article, we are assuming a simplified threat model; of course a real-world risk management process would involve more complex and varied risks including the possibility of a man-in-the-middle attack and local computer compromise, among others.
    </li>
  </ol>
</div>
{{< / raw-html >}}