---
title: Fluent Bit Exec Plugin
date: "2022-12-26"
toc: true
external:
  github: "https://github.com/kfdm/fluent-bit-exec_out"
tags:
  - fluent-bit
  - analytics
---

After [experimenting] the other day, I continued thinking about better ways to solve my analytics problem.
I did not really want to run a separate fluentd instance in a container just to use [out_exec] but I wanted to use same functionality.
I decided to take an afternoon and see how difficult it would be to create a [go output plugin] and built [fluent-bit-exec_out].

```mermaid
graph LR
nginx ---> |ltsv.*| fluent-bit
fluent-bit --> |sematext.*| sematext

subgraph fluentbit
    direction TB
    fluent-bit --> exec_out
    exec_out --> fluent-bit
end
```

## Building a plugin

I started looking for examples <https://github.com/fluent/fluent-bit-go/network/dependents> on how to build a plugin.
I'm not a Go developer by default, so most of my code is not particularly nice but it works.

The most confusing part was converting a record to json to send to our script.
I borrowed some code from a [newrelic] project for this.

## Deploying a plugin

With our plugin now written, we can deploy it to our server.
I have a simple Makefile in the project repository.

```
# plugins.conf
[PLUGINS]
    Path /path/to/out_exec.so

# main config
[SERVICE]
    plugins_file /path/to/plugins.conf

[INPUT]
    Name dummy

[OUTPUT]
    Name exec_out
    Match nginx.*
    Command python3 /path/to/script.py
```

We can then work on our script to process our logs.

```python
import argparse
import json
import sys
from fluent.sender import FluentSender

# Not entirely necessary, but creating an argument parser
# lets us handle things in a more consistent way and makes our later code easier.
parser = argparse.ArgumentParser()
parser.add_argument(
    "infile",
    type=argparse.FileType("r"),
    default=sys.stdin,
    nargs="?",
)
args = parser.parse_args()

# Create a sender for us to return processed data back to fluent-bit
sender = FluentSender(tag='sematext')

# Next we loop through each line in our input file
for line in args.infile:
    # Try to decode it as json
    try:
        data = json.loads(line)
    # or skip malformed lines
    except json.JSONDecodeError:
        logger.error("Error decoding: %s", line)
        continue

    # Now we have a data object that we can continue processing or send back to td-agent
    sender.emit(label="nginx", data=data)
```

## Simple query analysis

There were a few simple checks I wanted to do on incoming logs.

- First was a simple check to separate out static files from other document/content files.
- Second was a simple check for any suspicious queries. These will likely get further processed in the future.

```python
import re
from urllib.parse import urlsplit

STATIC = re.compile("^/(images|static|css|js|favicon)")
SUSPICIOUS = re.compile("(wp-login|wp-includes|wp-admin|wp-content|\.php$)")

# path/query parsing
uri = urlsplit(data.pop("uri"))
data["path"] = uri.path
data["query"] = uri.query
data["is_static"] = STATIC.search(uri.path) is not None
data["is_suspicious"] = SUSPICIOUS.search(uri.path) is not None
```

## Investigating browsers and bots

```python
# https://github.com/thinkwelltwd/device_detector#usage
from device_detector import DeviceDetector

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

This is mostly copy/paste from my previous post, but I wanted to get some basic stats on the types of agents querying my site.
I would like to find a library that is updated more consistently or has an easier way to pass some additional matchers for agents.

## Future Improvements

My quick prototype is generally working great and I am glad it was not as much work as I feared.
I still do not enjoy writing Go very much, but my plugin will need some more work to avoid some of my environment assumptions and cover more of the functionality of the original exec_out plugin.

[experimenting]: /blog/experimenting-with-analytics/
[out_exec]: https://docs.fluentd.org/output/exec
[go output plugin]: https://docs.fluentbit.io/manual/development/golang-output-plugins
[fluent-bit-exec_out]: https://github.com/kfdm/fluent-bit-exec_out
[newrelic]: https://github.com/newrelic/newrelic-fluent-bit-output/blob/304303f8912a3d6680e497a3a0a68006d62ba0fc/record/record.go
