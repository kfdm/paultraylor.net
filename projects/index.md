---
layout: default
title: Projects
section: current
---
# Projects

{% for post in site.categories.projects %}

{% capture this_year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% capture next_year %}{{ post.next.date | date: '%Y' }}{% endcapture %}

{% if this_year != next_year %}## {{ post.date | date: "%Y" }}年{% endif %}

 * {{ post.date | date: "%Y-%m-%d" }} &raquo; [{{ post.title }}]({{ post.url }})
{% endfor %}
