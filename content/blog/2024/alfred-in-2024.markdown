---
title: My most used Alfred workflows in 2024
date: "2024-03-20"
tags:
  - alfred
---

I've been using [alfred] on my macs for quite a number of years.
I don't remember how I first found out about it, but it's nearly always the first thing I install on new machines.
Should I move to Linux, I am certainly going to need to find an equivalent and [onagre] looks like it might be one potential replacement.
Inspired by a random comment on mastodon, I thought it would be interesting to write about my most commonly used workflows.

# alfred-repos

I was originally using [deanishe/alfred-repos](https://github.com/deanishe/alfred-repos) though it seems like [harrtho/alfred-repos](https://github.com/harrtho/alfred-repos) is a more actively maintained version.

```json
{
  "app_cmd": "Gitup",
  "app_default": "Visual Studio Code",
  "search_dirs": [
    {
      "depth": 2,
      "path": "~/Projects"
    },
    {
      "depth": 2,
      "path": "~/References"
    },
    {
      "depth": 2,
      "path": "~/Documents"
    }
  ]
}
```

I use a `~/References` folder for projects that I depend on, and sometimes look at the code, but do not actively contribute to.
I often keep some git repos in my `~/Documents` folder which are not code, but are otherwise documents I might want to keep in git.

By having a few paths configured in `alfred-repos`, I can quickly open a project in my default editor or using a modifier key, open in a different app.
Having a workflow that is scoped to just my project folders makes it very easy to open any of my projects.

# Dash

[dash](https://kapeli.com/dash) is a documentation browser that pairs well with Alfred.
This allows me to quickly type a query to look up documentation.
Each dockset automatically becomes a keyword search in Alfred so I can quickly lookup the documentation.

Examples I might look up

- `python3 <modulename>` to quickly look at Python documentation for a specific module I'm using
- `django <app>` to quickly look up how to use one of the built in Django contributor apps.
- `bootstrap4 <component>` to quickly look at the Bootstrap documentation for a specific component.
- `http <status code>` to quickly look up the correct HTTP status codes

and many, many other docsets and cheetsheets.
Having a way to quickly look at just the documentation I need, reduces the chances that I might go off on a tangent and get distracted.

# Ohayou (custom)

I wrote a simple keyword action `ohayou` (Japanese for Good Morning) to help start my day.

- Using the [launch apps](https://www.alfredapp.com/help/workflows/actions/launch-apps-files/) I can launch a number of applications that I use every day.
- Using [run script](https://www.alfredapp.com/help/workflows/actions/run-script/) action, I run a few other actions and use the `open` shell command to open various websites that I check in the morning.

It's a simple workflow that only applies to me, but it's nice to have something simple like this that I can trigger every morning in a consistent way.

# Worklog (custom)

Though I am recently experimenting with both [NotePlan] and [Obsidian], I also have an older note keeping system where I basically open a new note for each date (`YYYY/MM/YYYY-MM-DD.md`).

I wrote a [script filter](https://www.alfredapp.com/help/workflows/inputs/script-filter/) that will give me a list of recent workflow file as well as shortcuts for `Today`,`Tomorro`, and `Yesterday`.
This makes it very quick to open my `Today` note whenever I need to write down notes.
Combine with `alfred-repo` I can also easily open my entire `worklog` repository in a full code editor if I need to modify more pages at once.

[alfred]: https://www.alfredapp.com/
[onagre]: https://github.com/onagre-launcher/onagre
[obsidian]: https://obsidian.md/
[noteplan]: https://www.noteplan.co/
