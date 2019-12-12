---
title: Auto Cleanup
date: '2017-10-09'
url: /blog/auto-cleanup.html
tags:
  - snippet
---

Taking advantage of cron and the [rmtrash] tool from homebrew, I often setup several simple cron entries to automatically move old files to Trash

```bash
@hourly        find ~/Downloads -mindepth 1 -maxdepth 1 -mtime +7d -exec /usr/local/bin/rmtrash '{}' \;
```

[rmtrash]: http://www.nightproductions.net/cli.htm
