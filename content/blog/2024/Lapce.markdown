---
title: Lapce
date: "2024-04-04"
tags:
  - editors
  - rust
---

While I already use [VSCode] for most things, like many developers I am often curious to see what else is out there.
Even though I like some of the ideas behind the [Zed] editor, and will follow its progress, advertising built in AI is a fairly immediate turn off.
The idea of a high performance editor though is still **very** appealing, and it seems like there are many [rust] based contenders (not that my rust abilities are _anywhere_ near the level to contribute anything).

While I have _long_ since forgotten where I first read about it, I have been using the [Lapce] editor for some of my remote development work recently.
From the [architecture] page, you can see a high level overview of how the editor works.
The `Lapce-UI` runs locally on your machine, handling most of the input and interactions as expected.
Within the editor, you select a remote server to connect to over SSH, and Lapce will connect and run a remote `Lapce-Proxy` instance.
This remote proxy instance has access to the remote file system and runs the remote plugins or language servers.
I use this fairly extensively now when I am editing [salt] states on my development machine.
Similar to other editors, there is also a built in console so that you can run commands on the remote host without needing a separate terminal window also open.

I am not sure what group is behind Lapce and it seems like it has a slower pace than many other editors, but I am looking forward to watch how the project progresses.
I wrote a simple VSCode plugin for my worklog management, so maybe one day I can try to write something for Lapce.

[vscode]: /tags/vscode
[rust]: /tags/rust
[salt]: /tags/saltstack
[zed]: https://zed.dev/
[lapce]: https://lapce.dev/
[architecture]: https://docs.lapce.dev/development/architecture
