---
layout: default
section: current
title: Current Projects
---
# Current

Projects that are mostly current (or at least recently updated)

{% for post in site.tags['Current Project'] %}
## [{{ post.title }}]({{ post.url }})

{% if post.github %}[![GitHub issues](https://img.shields.io/github/issues/{{ post.github }}.svg?maxAge=2592000)](https://github.com/{{ post.github }}){% endif %}

{{ post.summary }}

{% endfor %}

{ [kfdm/gntp](https://github.com/kfdm/gntp) }

## Python IRC Bot
Used within my channel on GameSurge, I wrote an irc bot from scratch using python.

{ [kfdm/purplebot](https://github.com/kfdm/purplebot) }
