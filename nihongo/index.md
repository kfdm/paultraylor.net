---
layout: default
title: 日本語
section: future
---
# 日本語

上手になるために時々日本語で書いてみる。

{% for post in site.categories.nihongo | group_by:post.date.year %}
{% if forloop.first %}
## {{ post.date | date: "%Y" }}年

### {{ post.date | date: "%m" }}月
{% endif %}

{% capture this_year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% capture next_year %}{{ post.next.date | date: '%Y' }}{% endcapture %}
{% capture this_month %}{{ post.date | date: '%m' }}{% endcapture %}
{% capture next_month %}{{ post.next.date | date: '%m' }}{% endcapture %}

{% if this_year != next_year %}## {{ post.date | date: "%Y" }}年{% endif %}

{% if this_month != next_month %}### {{ post.date | date: "%m月" }}{% endif %}

 * [{{ post.date | date: "%Y年%m月%d日" }} &raquo; {{ post.title }}]({{ post.url }}) {% if post.tags %}{{ post.tags }}{% endif %}
{% endfor %}
