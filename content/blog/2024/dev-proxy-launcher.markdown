---
title: Dev Proxy Launcher
date: "2024-01-05"
tags:
  - python
---

Loosely inspired by [xinetd], I wrote a simple dev proxy launcher.

<!--more-->

```toml
[service.django]
host = "django.localhost"
port = 8001
cwd = "~/Projects/my-django-site"
command = ".venv/bin/app runserver {port}"

[service.hugo]
host = "hugo.localhost"
port = 8002
cwd = "~/Projects/my-hugo-site"
command = "hugo server --buildDrafts --buildFuture --port {port}"
```

I typically use [django] for a lot of projects and it sometimes gets annoying keeping track of the port numbers.
By default, browsers will resolve `*.localhost` to `127.0.0.1` so I just need a generic server that can proxy based on host.
I decided I would use [aiohttp] to practice using async Python.

```
INFO:devserver.proxy:Loading config ~/.config/dev-server.toml
INFO:devserver.proxy:=== Serving on http://localhost:7999 ===
INFO:devserver.proxy:Processing: GET hugo.localhost/blog/2024/dev-proxy-launcher/
INFO:devserver.upstream:Attempting to launch service
DEBUG:devserver.upstream:Launching: ['tmux', 'new-session', '-s', 'hugo', '-d', 'hugo server --buildDrafts --buildFuture --port  8001']
INFO:devserver.proxy:Processing: GET hugo.localhost/blog/2024/dev-proxy-launcher/
INFO:devserver.proxy:Processing: GET hugo.localhost/livereload.js?mindelay=10&v=2&port=8005&path=livereload
```

Ultimately it is a fairly simple server.
As requests come in, check to see if the port is open, if so proxy it as normal.
If the port is closed, then attempt to launch our command in a tmux session and retry the request.

While initially developing it, I had a few issues around how to handle locks per hostname since I do not want to launch multiple copies of a server.
In the future I also want to better handle streaming connections and see if I can get some other things like websockets proxied through it.
Ultimately my first draft though has been working well for what I wanted.

At some point I will likely try rewriting it in [Rust] since this should be another small, self-contained, project that will help me practice my rust skills.
Currently I do not have the source published but I expect to publish it shortly as well.

[xinetd]: https://en.wikipedia.org/wiki/Xinetd
[django]: /tags/django
[rust]: /tags/rust
[aiohttp]: https://pypi.org/project/aiohttp/
