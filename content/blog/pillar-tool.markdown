---
title: Pillar Tool
date: 2023-05-07T05:06:19.000Z
tags:
  - saltstack
summary: Building a tool to make it easier to manage pillar values.
---

Even though [salt] has started to feel a bit clunky lately, it's still my deployment tool of choice.
Its well engineered plugin system is something that allows great flexibility in interfacing with one's production environment.

When using the configuration management, values can come from both [grains] and [pillar] (and both can be customized with their own modules).

In my typical usage, grains contain data about the current target (for example, ip addresses or hostname), and pillar contains overall cluster information.

Custom grains can also be configured via `/etc/salt/grains` and there is a [grains.set] module that can be used to manage it. I will often use this to set a server specific override while testing.

To simplify my checks elsewhere, I've copied around a small module that takes advantage of this type of override.

```python
# psudo-code version of vars.get that I use in several projects.
# gives me a single place to handle specific types of fallback/overrides
def get(key):
    if key in __grains__:
        return __grains__[key]
    if key in __pillar__:
        return __pillar__[key]
    return __salt__['defaults.get'](key)
```

This lets me set overrides for a single server when testing or needing to make quick changes during an outage.

```sh
salt-call grains.set path:to:key value
salt-call state.apply
```

One neat thing about these grains, is that it has a built in nesting for certain things.
The above command would result in the following yaml being saved to `/etc/salt/grains`

```yaml
path:
  to:
    key: value
```

I use some common patterns like this when structuring data for my containers

```yaml
project_name:
  db:
    name: ###
    user: ###
    pass: ###
  environment:
    CUSTOM: ###
    ENVIRONMENT: ###
    VARS: ###
```

I like the flow of `grains.set` and wanted to prototype something simple to do the same with pillars.
I wanted to have something like this, but to set pillar values on the salt-master.

Often I want to see some value that I've set across various projects.
Now I can list and grep for the value to ensure I'm not creating a conflict with ports.

```sh
# Listing all the port values I've assigned
pillar list | grep port | sort -nk2
mailgun:port	589
salt:port	5000
radicale:port	5232
foo:port	20004
bar:port	20005
baz:port	20006
```

I can set a new value or update an existing value.

```sh
pillar set foo:port 12345
Updated None to 12345
pillar set foo:port 54321
Updated 12345 to 54321
```

I've also added shortcuts for generating some random values for example passwords or Django secret keys.

```sh
# Rotating a django secret_key
pillar rotate foo:secret_key
Updated *** to %%%
# Rotating a password
pillar rotate foo:db:pass
Updated *** to %%%
```

I still have a bit more work to do before I publish a version to GitHub, but this turned out to be a nice, focused project to implement over my Golden Week holiday.

[salt]: https://docs.saltproject.io/en/getstarted/
[grains]: https://docs.saltproject.io/en/latest/topics/grains/index.html
[pillar]: https://docs.saltproject.io/en/latest/topics/pillar/index.html
[grains.set]: https://docs.saltproject.io/en/latest/ref/modules/all/salt.modules.grains.html#salt.modules.grains.set
