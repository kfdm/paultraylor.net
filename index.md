---
layout: default
section: about
title: KungFuDiscoMonkey.net
---
# About
I'm a web developer who also likes to play with assorted other programming projects.
When I'm not programming, I spend time studying Japanese.

I generally work with Python with some shell scripts and the ocasional ruby script mixed in as my projects require.
I prefer to work on more server side code than frontend code.

## Recent Updates
{% for post in site.posts limit:10 %}
 * {{ post.date | date_to_string }} [{{ post.title | capitalize }}]({{ post.url }}) [{{ post.categories | array_to_sentence_string }}]
{% endfor %}
