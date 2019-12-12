---
title: I'd rather be using salt
toc: true
date: '2017-10-09'
url: /blog/id-rather-be-using-salt.html
tags:
  - python
  - saltstack
---

Currently I'm using [Ansible](https://www.ansible.com/) at work, but I would MUCH rather be using [Salt](https://docs.saltstack.com). A [discussion](https://groups.google.com/d/topic/salt-users/VqYjdlWsNHU/discussion) on the Salt mailing list reminded me of this again, so I thought I would write down a few notes regarding why I would rather be using Salt (and why I not-so-secretly use Salt for development)

# Why have both roles and playbooks?

Roles and Playbooks are somewhat similar, and feel like they have some overlap in usage, so at times it can be quite frustrating to have things that are so similar but different.

In the case of salt, everything is simply a state. Any state can include any other state in the same way.

# Why defaults and vars?

Ansibles [precedence](http://docs.ansible.com/ansible/latest/playbooks_variables.html#variable-precedence-where-should-i-put-a-variable) rules are rather scary. The fact that there has to be such a long list, tends to make things more complicated than they should be. With Salt, I tend to find things are much easier to reasonable.

- Pillars - These come from the Salt Master
- Grains - These come from the Salt Minion

There are some cases using [filter_by](https://docs.saltstack.com/en/latest/ref/modules/all/salt.modules.grains.html#salt.modules.grains.filter_by) that are a little scary, but in general there is no strange precedence rules with Salt.

# Is Ansible really easier to get started with?

Since Ansible uses just ssh for connections, at first it seems like it's easier to get started with.

# These docs seem wrong. Ah, wrong version

The Ansible docs seem to be less clear when it comes to what version each module can be used with. I find the Salt documentation better on this front
