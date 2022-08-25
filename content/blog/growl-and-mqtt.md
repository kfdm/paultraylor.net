---
title: "Growl and MQTT"
date: 2022-08-25
tags:
  - mqtt
---

Many years ago before notification center, there was [Growl]. It was widely supported by many different MacOS applications, and had many nice customization options for the toaster popups. Eventually Apple released [notification center] and Growl slowly faded away, but I still appreciated the ability to send a remote notification and continue to use [prowl] for many of my projects.

<!--more-->

Growl had developed [GNTP] (Growl Notification Transport Protocol) to support remote notifications, and I even wrote [python-gntp] to support it. With Growl (and many of the similar projects retired) it probably doesn't make too much sense to revive on gntp, but I've wondered if perhaps mqtt could work for my use case.

I've been using mqtt with things like [home assistant], [owntracks], and many of my other projects, so it seems like it would be simple to define some kind of simple notification protocol over mqtt.

On Linux, one could write a listener that uses something like [libnotify] to display notifications. On MacOS, one could write a listener that bridged [User Notifications] framework. I'm not familiar enough with Windows, but I would imagine there is a similar framework that could be bridged there as well.

Each bridge application would listen on a topic like `notify/<machine>/<user>`, listening for messages to be posted as json payloads. The payloads themeselves could contain the various fields needed to trigger a message (all fields might not be supported on all platform.)

```js
{
  "title": "Application or message title",
  "body": "notification body",
  "priority": 0, // Optional: Some kind of priority -2, -1, 0, 1, 2
  "icon": "http://path or base64 data?", // Optional
  "sticky": True, // Wait to be closed or not
  "id": "uuid or other id", // Used to replace existing notifications
}
```

Maybe someone has already written a spec like this and it already exists but if not it might be a fun, simple little project to work on (not that I really need more random side projects).

[growl]: https://en.wikipedia.org/wiki/Growl_(software)
[notification center]: https://en.wikipedia.org/wiki/Notification_Center
[gntp]: https://web.archive.org/web/20120211141831/http://www.growl.info/documentation/developer/gntp.php
[python-gntp]: https://pypi.org/project/gntp/
[home assistant]: https://www.home-assistant.io/integrations/mqtt/
[libnotify]: https://wiki.archlinux.org/title/Desktop_notifications#Python
[user notifications]: https://developer.apple.com/documentation/usernotifications
[prowl]: https://www.prowlapp.com/
[owntracks]: https://owntracks.org/
