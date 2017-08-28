---
layout: tags
summary: Posts about Quantified Self
---

{% for post in site.tags.quantified-self %}
* {{ post.date | date: "%Y-%m-%d" }} [{{ post.title | capitalize }}]({{ post.url }}) [{{ post.categories | array_to_sentence_string }}]
{% endfor %}
