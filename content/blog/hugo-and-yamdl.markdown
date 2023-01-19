---
title: Replacing Hugo with Yamdl?
date: "2023-01-19"
tags:
  - hugo
  - django
---

I've been using [hugo] for my blog for a while, and while I appreciate being able to write posts in anything that supports Markdown, I've never enjoyed making sense of their template system. My site curently uses a fork of [hugo-bootstrap] (to fix minor bugs) with some other customizations from [hugo-worklog] that I wrote.

Ideally I would like a system where I can use [django] for the site, but maintain the same editing flow I have for my current site.

A while back I was reading a post, [Static-Dynamic Content With In-Memory SQLite][static-dynamic-in-memory-sqlite], where Andrew Godwin wrote [yamdl] to provide an alternate way to load fixtures into his site. Over the winter break, I had some extra time to experiment on my own site.

The initial testing went well, and I made a few pull requests regarding [pathlib] usage and [extension] handling. This allowed me to load most of my site as-is without any changes to the existing Hugo directory layout. I still have more work to do around static pages, url/permalikn handling, and other static content, but I'm very hopeful that I can finish things up soon, and return to having a personal site that is a joy to hack on again.

[yamdl]: https://github.com/andrewgodwin/yamdl/
[static-dynamic-in-memory-sqlite]: https://www.aeracode.org/2022/11/03/static-dynamic-in-memory-sqlite/
[hugo-bootstrap]: https://github.com/kfdm/hugo-bootstrap
[hugo-worklog]: https://github.com/kfdm/hugo-worklog
[django]: /tags/django
[pathlib]: https://github.com/andrewgodwin/yamdl/pull/10
[extension]: https://github.com/andrewgodwin/yamdl/pull/11
[hugo]: https://gohugo.io/
