---
layout: default
section: about
title: KungFuDiscoMonkey.net
---
# About
I'm a software developer who currently lives in Fukuoka, Japan. I enjoy focusing
on backend work, tooling, and operations, so that others can focus on the parts
that are most fun to them and not worry about lower level things.

I am currently studying Japanese full time to experience living in a foreign
country and to improve my Japanese proficiency.

I prefer to work with Python though I can use shell script or ruby or other
languages as needed for the project at hand.

Current Interests:

* Configuration management using [SaltStack](https://github.com/saltstack/salt)
  * [salt-gntp](https://github.com/kfdm/salt-gntp)
* Scheduling and Calendar applications using [iCalendar](https://github.com/collective/icalendar)
  * [wanikani_tools](https://github.com/kfdm/wanikani-tools)
* Visualizing data using [Google Charts API](https://developers.google.com/chart/)
  * [WaniKani Reviews]({% post_url 2015-05-08-wanikani-charts %})
* Building modular sites using [Django](https://www.djangoproject.com/) and [Django Rest Framework](http://www.django-rest-framework.org/)
  * [django-pomodoro](https://github.com/kfdm/django-pomodoro)
  * [django-quotedb](https://github.com/kfdm/django-qdb/)
  * [django-simplestats](https://github.com/kfdm/django-simplestats)

## Recent Updates
{% for post in site.posts limit:5 %}
 * {{ post.date | date_to_string }} [{{ post.title | capitalize }}]({{ post.url }}) [{{ post.categories | array_to_sentence_string }}]
{% endfor %}
