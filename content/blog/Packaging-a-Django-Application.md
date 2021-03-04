---
title: "Packaging a Django Application"
date: 2021-03-04T19:00:32+09:00
tags:
  - django
---

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

And we will populate `docker/requirements.txt` with a stub

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
```

Next we want to move our standalone app into the correct place.

```shell
git mv standalone/standalone example
git mv standalone/manage.py example/standalone
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

```diff
commit fcc0a7e22745c707bb481b4f19381f0a1f1ebbef (HEAD -> master)
Author: Paul Traylor <kungfudiscomonkey@gmail.com>
Date:   Thu Mar 4 19:29:58 2021 +0900

    Update paths

diff --git a/example/standalone/__init__.py b/example/standalone/__init__.py
new file mode 100644
index 0000000..82f4479
--- /dev/null
+++ b/example/standalone/__init__.py
@@ -0,0 +1,3 @@
+import os
+
+os.environ.setdefault("DJANGO_SETTINGS_MODULE", "example.standalone.settings")
diff --git a/standalone/standalone/asgi.py b/example/standalone/asgi.py
similarity index 81%
rename from standalone/standalone/asgi.py
rename to example/standalone/asgi.py
index e6b679f..e00eb2c 100644
--- a/standalone/standalone/asgi.py
+++ b/example/standalone/asgi.py
@@ -11,6 +11,4 @@ import os

 from django.core.asgi import get_asgi_application

-os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'standalone.settings')
-
 application = get_asgi_application()
diff --git a/standalone/manage.py b/example/standalone/manage.py
similarity index 87%
rename from standalone/manage.py
rename to example/standalone/manage.py
index 428cd1f..0300473 100755
--- a/standalone/manage.py
+++ b/example/standalone/manage.py
@@ -1,12 +1,10 @@
 #!/usr/bin/env python
 """Django's command-line utility for administrative tasks."""
-import os
 import sys


 def main():
     """Run administrative tasks."""
-    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'standalone.settings')
     try:
         from django.core.management import execute_from_command_line
     except ImportError as exc:
diff --git a/standalone/standalone/settings.py b/example/standalone/settings.py
similarity index 98%
rename from standalone/standalone/settings.py
rename to example/standalone/settings.py
index fb07098..16063dc 100644
--- a/standalone/standalone/settings.py
+++ b/example/standalone/settings.py
@@ -49,7 +49,7 @@ MIDDLEWARE = [
     'django.middleware.clickjacking.XFrameOptionsMiddleware',
 ]

-ROOT_URLCONF = 'standalone.urls'
+ROOT_URLCONF = 'example.standalone.urls'

 TEMPLATES = [
     {
diff --git a/standalone/standalone/urls.py b/example/standalone/urls.py
similarity index 100%
rename from standalone/standalone/urls.py
rename to example/standalone/urls.py
diff --git a/standalone/standalone/wsgi.py b/example/standalone/wsgi.py
similarity index 79%
rename from standalone/standalone/wsgi.py
rename to example/standalone/wsgi.py
index e3a2373..1ead97d 100644
--- a/standalone/standalone/wsgi.py
+++ b/example/standalone/wsgi.py
@@ -7,10 +7,6 @@ For more information on this file, see
 https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
 """

-import os
-
 from django.core.wsgi import get_wsgi_application

-os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'standalone.settings')
-
 application = get_wsgi_application()
diff --git a/setup.cfg b/setup.cfg
index a02ac7c..e173f6b 100644
--- a/setup.cfg
+++ b/setup.cfg
@@ -7,3 +7,7 @@ version = 0.0.1
 packages = find:
 install_requires =
     Django>=2.0
+
+[options.entry_points]
+console_scripts =
+    example = example.standalone.manage:main
diff --git a/standalone/standalone/__init__.py b/standalone/standalone/__init__.py
deleted file mode 100644
index e69de29..0000000
```


[poetry]: https://python-poetry.org/
[pipenv]: https://pipenv.pypa.io/
