---
layout: default
section: past
title: Projects
redirect_from:
- /current.html
---

# Current

Projects that are mostly current (or at least recently updated)

{% assign projects = site.categories.projects|where:"active",true|sort:"title" %}
{% for post in projects %}

## [{{ post.title }}]({{ post.url }})

<!-- {% if post.github %}[![GitHub issues](https://img.shields.io/github/issues/{{ post.github }}.svg?maxAge=2592000)](https://github.com/{{ post.github }}){% endif %} -->

{{ post.excerpt }}

{% endfor %}
