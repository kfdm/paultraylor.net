---
layout: default
section: current
title: Current Projects
---
# Current

Projects that are mostly current (or at least recently updated)

## Django Work

{% for project_hash in site.data.github.django %}
{% assign project = project_hash[1] %}
* [{{ project.name}}]({{ project.url }}) {{ project.description }}
{% endfor %}

## Alfred Work

I use [Alfred](https://www.alfredapp.com/) a lot to help automate various tasks, so over time, I have built a few plugins for my own use.

{% for project_hash in site.data.github.alfred %}
{% assign project = project_hash[1] %}
* [{{ project.name}}]({{ project.url }}) {{ project.description }}
{% endfor %}


## Python GNTP Library

![image](https://img.shields.io/github/license/kfdm/gntp.svg)
![image](https://img.shields.io/github/issues/kfdm/gntp.svg)
![image](https://img.shields.io/pypi/v/gntp.svg)

Wrote an implementation of the [Growl Notification Transport Protocol](http://www.growlforwindows.com/gfw/help/gntp.aspx) in Python.  Also wrote a prototype listen server that can listen for GNTP messages and [regrowl](https://github.com/kfdm/gntp-regrowl) them to the local OSX machine.

{ [kfdm/gntp](https://github.com/kfdm/gntp) }

## Python IRC Bot
Used within my channel on GameSurge, I wrote an irc bot from scratch using python.

{ [kfdm/purplebot](https://github.com/kfdm/purplebot) }

## irssi Scripts

{% for project_hash in site.data.github.irssi %}
{% assign project = project_hash[1] %}
* [{{ project.name}}]({{ project.url }}) {{ project.description }}
{% endfor %}
