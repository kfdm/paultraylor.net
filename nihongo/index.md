---
layout: default
title: 日本語
section: future
---
# 日本語

上手になるために時々日本語で書いてみる。

{% for post in site.categories.nihongo | group_by:post.date.year %}
    {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
    {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
    {% if year != nyear %}
## {{ post.date | date: "%Y" }}
    {% endif %}
 * [{{ post.date | date: "%Y年%m月%d日" }} &raquo; {{ post.title }}]({{ post.url }})
{% endfor %}
