---
layout: default
section: about
---
# Tags

{% for tag in site.tags %}
## {{ tag[0] }}
{% for post in tag[1] %}
 * {{ post.date | date: "%Y-%m-%d" }} [{{ post.title | capitalize }}]({{ post.url }})
{% endfor %}
{% endfor %}
