---
title: Handling Optional Django Modules
date: "2024-04-20"
toc: true
tags:
  - django
  - python
---

Django comes with support for [MIDDLEWARE] and provides several useful ones by default.
I usually try to make my projects as useable as possible, and some debug middleware is only useful when development.

## Example Middleware

Since the [order and layering] often matter, I'll usually configure all my optional middleware in the correct spot like bellow, with a short comment.

```python
MIDDLEWARE = [
    "debug_toolbar.middleware.DebugToolbarMiddleware",  # Only enabled for debug
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # Used primarily for docker
    "django.middleware.locale.LocaleMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
```

Then I'll use other conditional checks to see if this list (or other variables) need to be modified.

### Django Debug Toolbar

Even though it makes some requests slower (so you're unlikely to want to enable it in production), [django-debug-toolbar] is a very useful tool for debugging while developing.
Usually I will do an import check and then take advantage of `ImportError` if I don't have it installed.

```python
# in <project>/settings.py
try:
    # Check to see if it is installed
    import debug_toolbar

except ImportError:
    # If not installed, we'll remove it from our settings
    INSTALLED_APPS.remove("debug_toolbar")
    MIDDLEWARE.remove("debug_toolbar.middleware.DebugToolbarMiddleware")
```

```python
# in <project>/urls.py
# We do the same import check and append it to the end of our URL patterns
# if we succeed at the import.
try:
    import debug_toolbar
except ImportError:
    pass
else:
    urlpatterns.append(path("__debug__/", include(debug_toolbar.urls)))
```

### Whitenoise

Lately, most of my Django projects ultimately get deployed via docker containers, so I will use whitenoise to help with static files.

```python
try:
    # Check to see if whitenoise is enabled
    import whitenoise.middleware
except ImportError:
    # if it's not enabled, we can remove the middleware setting, and use basic
    # file storage settings
    MIDDLEWARE.remove("whitenoise.middleware.WhiteNoiseMiddleware")
    STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"
else:
    # Otherwise we want to use the whitenoise version of the above storage settings
    STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
```

## Conclusion

Since Exceptions are generally easy to handle in Python, I will often use this pattern of catching `ImportError` for many types of optional code.

[MIDDLEWARE]: https://docs.djangoproject.com/en/5.0/topics/http/middleware
[order and layering]: https://docs.djangoproject.com/en/5.0/topics/http/middleware/#middleware-order-and-layering
[django-debug-toolbar]: https://pypi.org/project/django-debug-toolbar/
