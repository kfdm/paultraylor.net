---
title: "How about calendar feeds?"
date: "2023-01-26"
---

One of the things that has been nice about the recent interest in Mastodon, is the idea that each account has a built in [RSS] feed. RSS is great for subscribing to one type of information, but what about more software adding more calendar feeds?

My day typically involves too much context switching, but being able to put various bits of information in my calendar helps when I attempt to make a plan for the day.

There are a lot of places where having a public calendar feed (or a private calendar feed) would be a **great** way to share information.

I rent some virtual machines in the cloud for my assorted experiments and projects. What if they provided a `/calendar/maintenance` feed for overall maintenance events, and a `/calendar/<uuid>.ics` for events that specifically affect my account?

Your collage could have a calendar feed for each of your classes automatically generated.

Promo sites for various TV shows, could provide a calendar feed for the next episode of their highly anticipated show.

I currently play Final Fantasy XIV and there are often various in-game events or regular server maintenance events. What if there was a calendar feed on the [loadstone] for these events. This would likely be a nice addition to any kind of game with various social events.

[iCalendar] is a reasonably simple format defined in [rfc5545] that provides a simple way for users to subscribe to events. Most web languages have an easy way to create an RSS feed and creating a calendar feed would involve about the same amount of effort. While we have momentum from the increased interest in RSS feeds, we should also remember the iCalendar feed and find new ways to promote it as well.

[rss]: https://en.wikipedia.org/wiki/RSS
[loadstone]: https://na.finalfantasyxiv.com/lodestone/
[icalendar]: https://en.wikipedia.org/wiki/ICalendar
[rfc5545]: https://datatracker.ietf.org/doc/html/rfc5545
