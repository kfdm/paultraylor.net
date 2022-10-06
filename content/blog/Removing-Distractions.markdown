---
title: "Removing Distractions with DNS"
date: "2022-10-06"
---

Many sites are designed to snare your attention and keep you scrolling for as long as possible. This is often not particularly compatible with taking just a _short_ break. Because so many sites are designed with patterns to hijack your brain, often we need to be proactive about not letting them get the initial hook.

For a while now, I've been using DNS to help me out. A few months ago, I started using [NextDNS] to help me with that. With my heavy internet usage (and possibly a misconfiguration on my side) I exceeded their free tier a bit each month,but I was happy enough with their service that I became a subscriber. (They have an [affiliate] program though I doubt I would get much traffic from my link.)

Having a quick way to add the normal social media distractions is nice, but also blocking a lot of the ads and "[chumbox]"es that have infested many news sites is a nice bonus.

For my work computer where I can't control the DNS server as easily, I fall back to `/etc/hosts`. Here I put the minimal requirements of some social media sites, though perhaps it would also be worth while to import a list for some of the chumboxes. [SelfControl] is another app that I have sometimes used in the past, which uses `/etc/hosts` and the firewall rules to do a similar thing.

Now that I'm using DNS to help reshape my behavior, I'm less likely to default to losing time to social media. There's enough default friction now, that I have to make a much more active choice when I decide to check something.

[nextdns]: https://nextdns.io/
[affiliate]: https://nextdns.io/?from=jrzuaj5d
[selfcontrol]: https://selfcontrolapp.com/
[chumbox]: https://en.wikipedia.org/wiki/Chumbox
