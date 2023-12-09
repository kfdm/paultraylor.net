---
title: Starting Rust
date: "2023-12-09"
tags:
  - rust
---

Rust has been on my list of things to learn for quite a while, and recently I have started to actually start learning it.
I started with the [Rust Book] online, working through a chapter at a time, mostly during my weekly [MokuMokuKai].
After finishing the first I/O [project] I also went through the [rust cli book] to further check some of my understanding before moving on.

Right now I'm taking a short break from the book to experiment with a few small CLI applications in Rust to check my understanding.
I use [mqtt] for many of my other projects, so one of my first small project is a set of mqtt tools to tail a server or send simple payloads.
I am also reworking my [worklog] script and rewriting it from [Swift] into Rust to continue practicing.
While I like Swift as a language, and there _are_ libraries to help write a CLI, it feels like Rust might be better for the specific wrapper tools I want to write.
Perhaps this will also lead towards me replacing Hugo with something else that is a bit easier to work with.
Something like [Zola] could work if I want to keep it a static site, but I'm also thinking about going with a Django site this time.

I have a long winter holiday coming up, so I have been spending this weekend polishing up my deploy pipeline in the hope that I can focus on code for the rest of the holiday.
We will see after the new year how successful I was.

[rust book]: https://doc.rust-lang.org/book/
[mokumokukai]: http://paul.localhost/blog/mokumokukai/
[project]: https://doc.rust-lang.org/book/ch12-00-an-io-project.html
[rust cli book]: https://rust-cli.github.io/book/
[mqtt]: /tags/mqtt/
[worklog]: /tags/worklog/
[swift]: /tags/swift/
[zola]: https://github.com/getzola/zola
[django]: /tags/django/
