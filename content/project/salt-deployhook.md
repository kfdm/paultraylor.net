---
title: salt-deployhook
date: 2018-09-30
summary: Trigger salt deployments from Github webhooks
status: beta
external:
  github: https://github.com/kfdm/salt-deployhook
tags:
  - saltstack
  - webhook
---

I gave a presentation at [LINE Developer Meetup #47 in Fukuoka](https://line.connpass.com/event/110448/) entitled [Automating deployments from GitHub using SaltStack][slides].

I have been using this both for my development environment and at work to automate deployments from [Github]({{< param external.github >}}) to Salt.

```yaml
# salt-master configuration

# Ensure that our custom state tree can be found in addition
# to our default salt states
file_roots:
  base:
    - /srv/salt
    - /srv/salt-deployhook

# For our example, enable the webhook engine with default values
engines:
  - webhook: {}

# A post to our salt master ( https://salt.example.com/github )
# Will map to our reactor ( salt://_reactor/autodeploy.sls)
reactor:
  - "salt/engines/hook/github":
      - salt://_reactor/autodeploy.sls
```

```yaml
#!yaml|github
# salt://_reactor/autodeploy.sls
example/webapp:
  refs/heads/master:
    deploy_webapp:
      local.state.sls:
        - tgt: role:webserver
        - tgt_type: grain
        - args:
            - mods: mywebapp
```

[slides]: https://www.slideshare.net/linecorp/automating-deployments-from-github-using-saltstack-125687922?ref=https://line.connpass.com/event/110448/presentation/
