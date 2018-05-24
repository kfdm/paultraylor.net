---
date: "2017-10-09T00:00:00Z"
tags:
- snippet
title: auto cleanup
---

Taking advantage of cron and the [rmtrash] tool from homebrew, I often setup several simple cron entries to automatically move old files to Trash

{{< highlight shell >}}
@hourly		find ~/Downloads -mindepth 1 -maxdepth 1 -mtime +7d -exec /usr/local/bin/rmtrash '{}' \;
{{< / highlight >}}

[rmtrash]: http://www.nightproductions.net/cli.htm
