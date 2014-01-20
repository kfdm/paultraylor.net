---
layout: default
title: 日本語
permalink: /日本語/index.html
section: future
---
# 日本語

上手になるために時々日本語で書いてみる。

{% for post in site.categories['日本語']' %}
 * {{ post.date | date_to_string }} &raquo; [{{ post.title }}]({{ post.url }})
{% endfor %}
