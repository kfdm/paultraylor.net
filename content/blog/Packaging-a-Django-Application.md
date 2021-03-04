---
title: "Packaging a Django Application"
date: 2021-03-04T19:00:32+09:00
toc: true
tags:
  - django
---

Our goal when packaging up a Django application, is that we can use it as part of an existing application, or we can run it by itself in a standalone mode. To this end, I have over time, started to package my django applications in the following way. You can see diffs of all the [commits] in the [example-django] repository.

# Start with a Makefile and setup files

Instead of using tools like [Poetry] and [Pipenv], I find it easier to just create a basic Makefile to use as the entrypoint.

```make
APP_BIN := .venv/bin/example-django
PIP_BIN := .venv/bin/pip

.DEFAULT: test

.PHONY: test
test: ${APP_BIN}
	${APP_BIN} test -v 2

$(PIP_BIN):
	python3 -m venv .venv

${APP_BIN}: $(PIP_BIN)
	${PIP_BIN} install -r docker/requirements.txt
	${PIP_BIN} install -e .[dev,standalone]
```

We then create a stub for `setup.py` for our install trigger

```python
from setuptools import setup
setup()
```

And then some basic values for our `setup.cfg`

```ini
[metadata]
name = example-django
version = 0.0.1

[options]
packages = find:
install_requires =
    Django>=2.0

[options.entry_points]
console_scripts =
    example-django = example.standalone.manage:main
```

And we will populate `docker/requirements.txt` with a stub. In a full application, we would also use this for some of our Docker specific requirements.

```shell
-i https://pypi.org/simple
-e .
```

with this setup, we can run `make` to create our initial environment. It will throw an error because it can not find some files, but it will create our default virtual environment.

# Creating and configuring our Project

For my Django projects, I like to have a basic Django application, but also ship a standalone configuration that can be used for test cases. To start will will create a new app `example` and a new project `standalone` to populate those files.

```shell
.venv/bin/django-admin startapp example
.venv/bin/django-admin startproject standalone
git add example
git add standalone
git commit -m "Initial django-admin setup"
```

Next we want to move our standalone app into the correct place.

```shell
git mv standalone/* example
git mv example/manage.py example/standalone
```

We want to edit `example/standalone/__init__.py` with our default environment settings

```python
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "example.standalone.settings")
```

and then we can remove the `os.environ` line from our `asgi.py`, `manage.py`, and `wsgi.py`. We need to update `settings.py` to update our URL config

```python
ROOT_URLCONF = 'example.standalone.urls'
```

You can see diffs of all the [commits] in the [example-django] repository.

[example-django]: https://github.com/kfdm/example-django
[commits]: https://github.com/kfdm/example-django/commits/master
[poetry]: https://python-poetry.org/
[pipenv]: https://pipenv.pypa.io/
