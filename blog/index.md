---
layout: default
title: Blog Archive
section: about
---
# Blog

{% for post in site.categories.blog %}
 * {{ post.date | date_to_string }} &raquo; [{{ post.title }}]({{ post.url }})
{% endfor %}
