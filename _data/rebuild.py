import json
import collections

tags = collections.defaultdict(dict)
groups = ['alfred', 'gntp', 'django']

for repo in json.loads(open('github.api.json').read()):
    if repo['fork']:
        continue
    if '-' in repo['name']:
        group, _ = repo['name'].split('-', 1)
        tag = group if group in groups else ''
    elif repo['name'] in groups:
        tag = repo['name']
    else:
        tag = ''

    tags[tag][repo['full_name']] = {
        'description': repo['description'],
        'url': repo['html_url'],
    }

open('github.json', 'w+').write(json.dumps(tags, indent=2, sort_keys=True))
