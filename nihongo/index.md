---
layout: default
title: 日本語
section: future
---
# 日本語

上手になるために時々日本語で書いてみる。

{% for post in site.categories.nihongo %}
{%   if forloop.first %}
<h2 id="{{ post.date | date: "%Y-ref" }}">{{ post.date | date: "%Y年" }}</h2>
<h3 id="{{ post.date | date: "%Y-%m-ref" }}">{{ post.date | date: "%m月" }}</h3>
{%   else %}
{%     capture this_year %}{{ post.date | date: '%Y' }}{% endcapture %}
{%     capture next_year %}{{ post.next.date | date: '%Y' }}{% endcapture %}
{%     capture this_month %}{{ post.date | date: '%m' }}{% endcapture %}
{%     capture next_month %}{{ post.next.date | date: '%m' }}{% endcapture %}
{%     if this_year != next_year %}
<h2 id="{{ post.date | date: "%Y-ref" }}">{{ post.date | date: "%Y年" }}</h2>
{%     endif %}
{%     if this_month != next_month %}
<h3 id="{{ post.date | date: "%Y-%m-ref" }}">{{ post.date | date: "%m月" }}</h3>
{%     endif %}
{%   endif %}
 * [{{ post.date | date: "%Y年%m月%d日" }} &raquo; {{ post.title }}]({{ post.url }}) {% if post.tags %}{{ post.tags }}{% endif %}
{% endfor %}
