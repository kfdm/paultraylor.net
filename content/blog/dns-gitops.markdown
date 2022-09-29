---
title: GitOps for My DNS
date: "2022-09-29"
tags:
  - gitops
---

I've used [Namecheap] for many years for hosting my DNS. It's nothing particularly special but it works well enough for my needs. When managing DNS entries it can sometimes be a little annoying doing everything on their web page. I'd rather be able to script something. After thinking about it for a while, I finally created something.

Namecheap's API is implemented in XML which makes parts of it feel a bit old, but our use case is fairly simple. We can use [get-hosts] to download a backup of our DNS entries for history, and then [set-hosts] to publish our new values. I wrote a class to handle the basic Namecheap API calls (which is mostly formatting them and wrapping the requests library).

```python
# Some parts redacted but most of the interesting bits are here
class Namecheap:
    def __init__(self):
        self.api_base = "https://api.namecheap.com/xml.response"

    def params(self, params):
        # Add our required parameters in a single place
        params.setdefault("ApiUser", self.username)
        params.setdefault("ApiKey", self.apikey)
        params.setdefault("UserName", self.username)
        return params

    def post(self, params, **kwargs) -> requests.Response:
        # Build a post requeest
        kwargs.setdefault("url", self.api_base)
        result = requests.post(params=self.params(params), **kwargs)
        result.raise_for_status()
        return result

    # https://www.namecheap.com/support/api/methods/domains-dns/set-hosts/
    def setHosts(self, domain, tld, params) -> requests.Response:
        params.setdefault("Command", "namecheap.domains.dns.setHosts")
        params.setdefault("SLD", domain)
        params.setdefault("TLD", tld)
        return self.post(params)
```

and then I have a Request class to build the actual setHost request

```python
class Request:
    def __init__(self, domain, tld):
        self.client = Namecheap()
        self.domain = domain
        self.tld = tld
        self.count = 0
        self.params = {}

    def setHosts(self) -> requests.Response:
        return self.client.setHosts(self.domain, self.tld, self.params)

    def __record(self, **params):
        # The Namecheap API prefixes a bunch of their keys with a number
        # so we keep track of that here
        self.count += 1
        params.setdefault("TTL", 1800)
        for key in params:
            self.params[f"{key}{self.count}"] = params[key]
        return params

    def a(self, host, address):
        return self.__record(
            HostName=host,
            RecordType="A",
            Address=address,
        )
```

I can now write a quick script for each of the domains I want to manage

```bash
ls scripts
kungfudiscomonkey.net.py
paultraylor.net.py
```

which looks roughly like this

```python
from pi.client.namecheap import Request
from pi.constants import Address

request = Request("paultraylor", "net")
request.a("@", Address.CHIHARU)
request.a("www", Address.CHIHARU)

# My old japanese notes blog.
request.cname("nihongo", "kfdm.github.io")
request.txt('@', 'some other information)
```

I also wrote a quick wrapper so I can quickly take a backup.

```make
.PHONY: backup-dns
backup-dns: $(APP_BIN)
    $(APP_BIN) backup-dns kungfudiscomonkey.net
    $(APP_BIN) backup-dns paultraylor.net
```

Having these scripts made things easier while doing my various domain migrations over the past weekend.

[namecheap]: https://www.namecheap.com/
[set-hosts]: https://www.namecheap.com/support/api/methods/domains-dns/set-hosts/
[get-hosts]: https://www.namecheap.com/support/api/methods/domains-dns/get-hosts/
