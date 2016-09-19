---
layout: default
title: Projects
section: current
---
# Projects

{% for post in site.categories.projects %}
 *  [{{ post.title }}]({{ post.url }})  
    {{ post.summary }}
{% endfor %}
