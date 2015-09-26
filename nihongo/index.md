---
layout: default
title: 日本語
section: future
---
# 日本語

上手になるために時々日本語で書いてみる。

{% for post in site.categories.nihongo %}
 * [{{ post.date | date: "%Y年%m月%d日" }} &raquo; {{ post.title }}]({{ post.url }})
{% endfor %}
