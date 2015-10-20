import json
import collections

GROUPS = ['alfred', 'gntp', 'django']
FORKS = ['growlme']

tags = collections.defaultdict(dict)
for repo in json.loads(open('github.api.json').read()):
    if repo['fork'] and repo['name'] not in FORKS:
        continue
    if '-' in repo['name']:
        group, _ = repo['name'].split('-', 1)
        tag = group if group in GROUPS else ''
    elif repo['name'] in GROUPS:
        tag = repo['name']
    else:
        tag = ''

    tags[tag][repo['full_name']] = {
        'description': repo['description'],
        'url': repo['html_url'],
    }
    if repo['homepage']:
        tags[tag][repo['full_name']]['homepage'] = repo['homepage']

open('github.json', 'w+').write(json.dumps(tags, indent=2, sort_keys=True))
