---
title: Salt Changes
date: "2024-02-01"
tags:
  - saltstack
  - gitops
---

I was surprised when reading the changelog for Salt [3007.0], regarding several deprecated modules to be removed in `3009.0`.
I also later read some of the [policy changes] on their blog.
Going forward, they are planning on having a much smaller core module, and will be moving a lot of larger modules to external repositories.

I started using Salt while I was at Kotagent, and quite liked the way it worked.
Even though a lot of teams at my current company use Ansible, I never enjoyed using it, and somewhat forced my team to switch to Salt (this was easy because my team was mostly just me).
I think Salt tried to include too much into its core, and over time it feels like the increase maintenance burden resulted in a product that moves slow and was hard to improve.
I hope having a cleaner core, and moving a lot of modules out will result in being able to have a more reliable core, while keeping it easy to extend via the various types of modules.

(I also often naively wonder what it would look like to build my own system, learning from some of the parts I like from Salt)

[3007.0]: https://docs.saltproject.io/en/master/topics/releases/3007.0.html
[policy changes]: https://saltproject.io/blog/salt-project-policy-changes/
