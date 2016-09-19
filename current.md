---
layout: default
section: current
title: Current Projects
---
# Current

Projects that are mostly current (or at least recently updated)

{% for post in site.tags['Current Project'] %}
## [{{ post.title | capitalize }}]({{ post.url }})

{% if post.github %}[![GitHub issues](https://img.shields.io/github/issues/{{ post.github }}.svg?maxAge=2592000)](https://github.com/{{ post.github }}){% endif %}

{{ post.summary }}

{% endfor %}

## Python GNTP Library

![image](https://img.shields.io/github/license/kfdm/gntp.svg)
![image](https://img.shields.io/github/issues/kfdm/gntp.svg)
![image](https://img.shields.io/pypi/v/gntp.svg)

Wrote an implementation of the [Growl Notification Transport Protocol](http://www.growlforwindows.com/gfw/help/gntp.aspx) in Python.  Also wrote a prototype listen server that can listen for GNTP messages and [regrowl](https://github.com/kfdm/gntp-regrowl) them to the local OSX machine.

{ [kfdm/gntp](https://github.com/kfdm/gntp) }

## Python IRC Bot
Used within my channel on GameSurge, I wrote an irc bot from scratch using python.

{ [kfdm/purplebot](https://github.com/kfdm/purplebot) }
