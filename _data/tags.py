# http get 'https://api.github.com/users/kfdm/repos?per_page=100' > github.api.json

import datetime
import dateutil.parser
import dateutil.tz
import json
import yaml

GROUPS = [
    'alfred',
    'django',
    'gntp',
    'irssi',
    'salt',
]
FORKS = ['growlme']

# Inactive for ~3 years
INACTIVE = 60 * 60 * 24 * 365 * 3

now = datetime.datetime.now(dateutil.tz.tzlocal())

projects = {}
untagged = {}
inactive = {}

for repo in json.loads(open('github.api.json').read()):
    if repo['fork'] and repo['name'] not in FORKS:
        continue

    project = {'tags': set()}

    # Tags based on project name
    if '-' in repo['name']:
        group, _ = repo['name'].split('-', 1)
        if group in GROUPS:
            project['tags'].add(group.lower())
    if repo['name'] in GROUPS:
        project['tags'].add(group.lower())

    # Tags based on description
    if repo['description'] and '#' in repo['description']:
        for word in repo['description'].strip().split(' '):
            if word.startswith('#'):
                project['tags'].add(word.lower()[1:])

    project['html_url'] = repo['html_url']
    if repo['has_wiki']:
        project['wiki'] = repo['html_url'] + '/wiki'
    if repo['has_issues']:
        project['issues'] = repo['html_url'] + '/issues'
    if repo['description']:
        project['description'] = repo['description']

    pushed_at = dateutil.parser.parse(repo['pushed_at'])
    if (now - pushed_at).total_seconds() > INACTIVE:
        project['tags'].add('inactive')

    project['tags'] = list(project['tags'])
    if 'inactive' in project['tags']:
        inactive[repo['full_name']] = project
    elif project['tags']:
        projects[repo['full_name']] = project
    else:
        untagged[repo['full_name']] = project



    if repo['language']:
        project['language'] = repo['language']

open('projects/tags.yaml', 'w+').write(yaml.safe_dump(projects, indent=4, line_break=False))
open('projects/untagged.yaml', 'w+').write(yaml.safe_dump(untagged, indent=4, line_break=False))
open('projects/inactive.yaml', 'w+').write(yaml.safe_dump(inactive, indent=4, line_break=False))
