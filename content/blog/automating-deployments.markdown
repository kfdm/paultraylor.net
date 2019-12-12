---
title: Automating deployments from GitHub using SaltStack
repository: https://github.com/kfdm/salt-deployhook
slides: https://www.slideshare.net/linecorp/automating-deployments-from-github-using-saltstack-125687922?ref=https://line.connpass.com/event/110448/presentation/
date: '2018-12-10'
url: /blog/automating-deployments.html
tags:
- saltstack
---

This week I gave a presentation at [LINE Developer Meetup #47 in Fukuoka](https://line.connpass.com/event/110448/) entitled [{{page.title}}]({{page.slides}}).

I have uploaded a [repository]({{page.repository}}) with more detailed instructions, but with a simple addition to the *salt-master* configuration

```yaml
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
  - 'salt/engines/hook/github':
    - salt://_reactor/autodeploy.sls
```

it becomes easy to control automated deployments using the Salt reactor

```yaml
#!yaml|github
example/webapp:
  refs/heads/master:
    deploy_webapp:
      local.state.sls:
        - tgt: role:webserver
        - tgt_type: grain
        - args:
            - mods: mywebapp
```
