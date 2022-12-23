---
title: "Experimenting With Analytics"
date: 2022-12-23
toc: true
tags:
  - nginx
  - fluent-bit
  - analytics
---

I've been using the self-hosted version [plausible] with my blog and development site.
It generally works well, but there are times I'd like to have a little bit more customization on the reports.
I'm already collecting nginx logs using [ltsv] and fluent-bit's [tail] plugin.
Since I have extra time to tinker over my winter break, I've been experimenting a bit.

```mermaid
graph LR
    javascript ----> plausible
    nginx -->|ltsv| fluent-bit
    fluent-bit -->|forward| processing
    processing -.-> firewall
    processing --> sematext
    processing -->|event api| plausible
    fluent-bit -->|raw logs| sematext
```

## Default Plausible Configuration

```mermaid
graph LR
    javascript --> plausible
```

The default path with Plausible is easy.
You create a site in their admin and copy the Javascript snippet onto your site.
This works ok for simple cases but doesn't work for most bots and such that do not run javascript.
Since I want to get information on the bots that are hitting my site we need to do something with our server logs.

## Nginx, LTSV, and Fluent Bit

```mermaid
graph LR
    nginx -->|ltsv| fluent-bit
```

td-agent already has some default [parsers] for common log formats, but I would rather start with something easier and less error prone to parse.
On Nginx's side, we need to configure a new format for ltsv that we can use.

```conf
log_format ltsv "time:$time_local"
                "\thost:$remote_addr"
                "\tforwardedfor:$http_x_forwarded_for"
                "\treq:$request"
                "\tstatus:$status"
                "\tsize:$body_bytes_sent"
                "\treferer:$http_referer"
                "\tua:$http_user_agent"
                "\treqtime:$request_time"
                "\tcache:$upstream_http_x_cache"
                "\truntime:$upstream_http_x_runtime"
                "\tvhost:$host";

access_log  /var/log/nginx/<sitename>.access.log ltsv;
```

Using [inputs.tail] we setup our input configuration

```conf
[INPUT]
        name tail
        path /var/log/nginx/<sitename>.access.log
        Tag nginx.<sitename>
        Parser access_log_ltsv
```

We also need to configure a [parser.ltsv] that we can use for parsing our format

```conf
[PARSER]
    Name        access_log_ltsv
    Format      ltsv
    #Time_Key    time
    #Time_Format              %Y-%m-%dT%H:%M:%S.%L%z
    Types       status:integer size:integer reqtime:float runtime:float
```

## Fluent Bit to Sematext

```mermaid
graph LR
    nginx -->|ltsv| fluent-bit
    fluent-bit -->|raw logs| sematext
```

Now that we have our logs flowing through fluent-bit, we can configure the output to [sematext].
I picked this somewhat randomly, because they have a fairly generous free tier.

```conf
[OUTPUT]
    Name  es
    Match nginx.*
    Host  logsene-receiver.sematext.com
    Port  443
    tls   On
    Index <sematext token>
```

## Custom Processing in Lua

One of the things I wanted to experiment with, was separateing static content from other content in my analytics.
fluent-bit has a [filter.lua] that we can use for simple processing.

```conf
[FILTER]
        name lua
        Match nginx.<sitename>
        script nginx.lua
        call cb_process_nginx
```

```lua
function cb_process_nginx(tag, timestamp, record)
  new_record = record
  -- Check to see if the request is for a static asset and then mark it
  -- so that we can filter out downstream as needed.
  new_record["is_static"] = false
  if new_record["uri"] ~= nil then
    if new_record["uri"]:match("/static") ~= nil then
      new_record["is_static"] = true
    end
  end
  -- Lastly, return our modified record
  return 1, timestamp, new_record
end
```

This kinda works, but lua only has simple match and no more powerful regex so this is not going to work well in the long run.

## Custom Processing in fluentd

```mermaid
graph LR
    nginx -->|ltsv| fluent-bit
    fluent-bit -->|forward| processing
    processing --> sematext
```

fluent-bit supports [go output plugins] but I would prefer to do my data processing in Python.
Sadly, there is no generic script support but we can use fluentd (which predates fluent-bit) and has an [out_exec] plugin that we can use.

```
<match nginx.*>
    @type exec
    @id exec_nginx
    command /usr/bin/python3 /opt/nginx.py
    <format>
        @type json
    </format>
    <buffer>
        @type memory
        flush_interval 5s
    </buffer>
</match>
```

We can then easily write a script to process the input as wanted.

```python
import sys
import json
with open(sys.argv[-1]) as fp:
    for line in fp:
        data = json.loads(line)
```

I've been experimenting with [device_detector] to pull out some interesting stats.

```python
device = DeviceDetector(data["ua"]).parse()
data["is_bot"] = device.is_bot()
if data["is_bot"]:
    data["agent"] = {
        "browser": device.all_details["bot"]["name"],
        "device": device.all_details["bot"]["category"],
    }
else:
    data["agent"] = {
        "browser": device.preferred_client_name(),
        "os": device.os_name(),
        "device": device.device_brand(),
    }
```

lastly we can send these back to fluent-bit to be sent to sematext, similar to our raw logs.

```python
from fluent.sender import FluentSender
...
# Create a fluent sender with base name of sematext
sender = FluentSender('sematext')
...
# Emit records as sematext.nginx so we can route them via fluent-bit
sender.emit(label="nginx", data=data)
```

## Custom Plausible Metrics

I've also tested creating a custom plausible output using a similar method, but it hasn't worked quite as nicely.

```python
# https://plausible.io/docs/events-api
headers = {
    "User-Agent": data["ua"],
    "Forwarded-For": data["forwardedfor"],
}
payload = {
    "domain": "test",
    "name": "pageview",
    "url": f"https://{data['vhost']}{data['uri']}",
    "referrer": data["referer"],
}
requests.post(
    url="http://plausible.example.com/api/event",
    headers=headers,
    json=payload,
).raise_for_status()
```

## Custom Processing to Firewall (Future)

This is on my todo for the future, but I imagine I could do some similar processing for my firewall rules.
I do not run wordpress or any other CMS on my site, but there are plenty of bots searching for these kinds of paths.
It seems like I should be able to figure out a way to do custom processing and then send to firewalld or fail2ban.

## Summary

A few parts are a little bit more complicated than I would prefer, but at least some of my initial ideas seem to be working.
I wish fluent-bit supported exec_out directly so I would not need to deploy fluentd separately.
Perhaps this is something that could be done with a golang plugin.
I also want to experiment more with browser/bot detection and see what I can do there.

[fluent-bit]: https://docs.fluentbit.io/manual/
[inputs.tail]: https://docs.fluentbit.io/manual/pipeline/inputs/tail
[parser.ltsv]: http://ltsv.org/
[filter.lua]: https://docs.fluentbit.io/manual/pipeline/filters/lua
[out_exec]: https://docs.fluentd.org/output/exec
[plausible]: https://plausible.io/docs/self-hosting
[ltsv]: http://ltsv.org/
[tail]: https://docs.fluentbit.io/manual/pipeline/inputs/tail
[sematext]: https://sematext.com/
[device_detector]: https://github.com/thinkwelltwd/device_detector#usage
[go output plugins]: https://docs.fluentbit.io/manual/development/golang-output-plugins
[parsers]: https://docs.fluentbit.io/manual/pipeline/parsers
