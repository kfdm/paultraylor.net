---
title: Salt Renderers
date: 2023-09-18
tags:
  - saltstack
  - language-server
---

I would not be the first engineer to joke that those working in devops have become [yaml] engineers.
In small amounts, yaml is not terrible, and provides a human readable way to handle simple configuration.
At some point we [jumped the shark](https://en.wikipedia.org/wiki/Jumping_the_shark) and now it's [yaml all the way down](https://en.wikipedia.org/wiki/Turtles_all_the_way_down).

(I have seen a few projects use something like [jsonnet] for configuration which quickly goes from turtles all the way down to Cthulhu)

I have plenty of bias, but one of the biggest offenders in my opinion is Kubernetes, and it's one of several reasons I have trouble bring myself to adopt it.
It is nearly impossible to escape yaml and even tools like Salt (which I still use) and Ansible are also _programmed_ in yaml.

When talking about yaml, it is almost required to write _programmed_ italicizes and said with an eye roll.
Yaml is a data-serialization language not a programming language, and yet Ansible has tried to add conditionals and tools like Kustomize try to implement a type of [patch](<https://en.wikipedia.org/wiki/Patch_(Unix)>) onto yaml.

Why do so many tools try to change yaml into a programming language?

What is the ultimate output that developers are trying to get?

Many of these tools like Salt, Ansible, and Kubernetes are ultimately trying to output a dictionary to define some kind of transformation to be feed into a configuration engine.
On the surface, yaml looks like a human readable format for a dictionary, but this quickly breaks down when there are enough levels and conditionals.
What can one do instead?

One part of the design of Salt that I appreciate, is how its pluggable architecture is designed.
By default, Salt states use a rendering pipeline of [jinja] + [yaml] to convert a state file to define the transformation to be applied to a server.

```jinja
# Example Salt state from Salt's documentation
{% for usr in 'moe','larry','curly' %}
{{ usr }}:
  group:
    - present
  user:
    - present
    - gid_from_name: True
    - require:
      - group: {{ usr }}
{% endfor %}
```

Running a template through Jinja _before_ running it through yaml is already a nice improvement, as Jinja is a **lot** more capable when it comes to handling templating and conditionals.
We can still have some issues when we mix things too much and state files can get more complicated over time so Salt also gives us the ability to change the renderer.
Salt has adopted a `shebang` like syntax to allow [selecting] the type of render to use. You can even create a pipeline like `#!jinja|mako|yaml` (or any other combination).
I used this with my [deployhook] State reactor so that I could simplify some of the logic. Salt stack will even let you use Python directly if you want

```python
#!py
# Another example from the Salt documentation
def run():
    """
    Install version 1.5-1.el7 of package "python-foo"
    """
    return {
        "include": ["python"],
        "python-foo": {"pkg.installed": [{"version": "1.5-1.el7"}]},
    }
```

While this example is probably not particularly friendly, I think it illustrates an interesting point.
There is no reason we need to force everything to be yaml, if the output dictionary is the important part.
We should be able to create a much more friendly format to edit.

The Aurea Runtime has an idea like this in using their [AuraeScript] to define a Kubernetes type manifest using real code that can be more easily tested.
It should also easier checking and auto completing in editors considering the adoption of [language server protocol] in many common code editors.

I expect that as I experiment with my own home server software, that I will be keeping these ideas in mind as I work on my own small [DSL] for deploy manifests.
It is fine to use a bit of yaml when it keeps things simple, but we should graduate to something more robust as soon as we need to.

[jinja]: https://en.wikipedia.org/wiki/Jinja_(template_engine)
[yaml]: https://en.wikipedia.org/wiki/YAML
[selecting]: https://docs.saltproject.io/en/latest/ref/renderers/index.html#overriding-the-default-renderer
[deployhook]: https://github.com/kfdm/salt-deployhook
[auraescript]: https://aurae.io/auraescript/
[language server protocol]: https://microsoft.github.io/language-server-protocol/
[DSL]: https://en.wikipedia.org/wiki/Domain-specific_language
[jsonnet]: https://jsonnet.org/
