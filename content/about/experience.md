---
title: Experience
url: /experience.html
menu: main
weight: 10
toc: true
---

Developer with a primary focus on server side code and operations tools, who takes pride in writing clean, easy-to-read, well documented code.
I endeavor to build tools to provide services to other developers so that they can focus on their own projects with confidence.
I am also a developer who knows when _not_ to write code and to adopt existing solutions to avoid endlessly reinventing the wheel.

- Japan Permanent Resident
- [JLPT N2](https://www.jlpt.jp/e/about/levelsummary.html)

# Work History

## [LINE Fukuoka](https://linefukuoka.co.jp/)

**May 2016 - Current**

### Server Monitoring as a Service

Built [Promgen](https://github.com/line/promgen), a managed Prometheus and Thanos monitoring solution. Allows developers to configure their monitoring targets and alerts from a web UI, so that they can get simple, easy to use monitoring for their services.
Monitoring over 80,000 targets and processes 150 million time series.

#### Presentations

- [Using Prometheus to Provide Large Scale Server Monitoring](https://linedevday.linecorp.com/2020/en/speakers/268/)

#### Tools Used

- [SaltStack](https://docs.saltproject.io/)
- [Prometheus](https://prometheus.io/)
- [Thanos](https://thanos.io/)

### Task management tools

Developed internal tools for connecting Slack chats to Jira bug tracker to facilitate better tracking of user requests.

### Tools Used

- [Django]
- Atlassian JIRA

## [Upsight](http://www.upsight.com)

**September 2011 - December 2014**

_Analytics and marketing platform for web & mobile app developers._

### Development VM Environment

Starting from an original version created out of fabric and shell scripts, and transitioning to a version using saltstack, built a developer environment to collapse the major parts of Kontagent's infrastructure into a single virtual machine for development.

#### Tools Used

- [SaltStack](https://docs.saltproject.io/)
- [Python]
- Bash
- Xen
- git
- [Fabric](http://www.fabfile.org/)

### Testing and Release Engineering

Took over and expanded TeamCity testing environment configuring it to handle a majority of different components across the Kontagent stack. Built tooling to better link Atlassian tools to a git-flow workflow

#### Tools Used

- [TeamCity](http://www.jetbrains.com/teamcity/)
- [nosetests](https://nose.readthedocs.org/)
- maven
- [Atlassian Stash](https://www.atlassian.com/software/stash)
- Atlassian JIRA
- git

### Production Automation

- Expanded the tools used with the development environment, lead the conversion of many of the remaining systems to be deployed using configuration management.
- Lead cross-engineering training to ensure each engineering team had a primary "automation" contact to assist teams in placing all systems under configuration management.

#### Tools Used

- [SaltStack](https://docs.saltproject.io/)
- [Python]
- git
- Bash

### Legacy Support

Supported legacy ETL systems by improving error handling and monitoring

#### Tools Used:

- [Icinga](https://www.icinga.org/)
- [Python]
- [OpenTSDB](http://opentsdb.net/)
- [tcollector](https://github.com/OpenTSDB/tcollector)
- MySQL
- [Fabric](http://www.fabfile.org/)

## [WeGame.com](https://www.crunchbase.com/organization/wegame)

**March 2008 - August 2011**

_A social platform for gamers, which allowed them to build a gamer-social-and-interest graph through other users' recommendations_

At WeGame I was the lead web engineer where my responsibilities covered work on the main web site, media processing system, and server infrastructure .

- Worked with other developers to rewrite entire WeGame site which was launched in November 2008 using the Kohana framework
- Wrote core of video processing system and continue to maintain media processing infrastructure using Python and FFMpeg
- Wrote system for deploying code to remote servers using subversion then switching to git
- Wrote admin system used by staff to control various aspects of running WeGame.com
- Configuration and management of servers used to run WeGame (Web, Database, Media, Utility)

### Tools Used

- PHP
- Python
- MySQL
- jQuery
- FFMpeg
- SphinxSE
- Nagios
- Git
- Mac OS X
- RHEL 5

## [Department of Soil Science - North Carolina State University](http://www.soil.ncsu.edu/)

**May 2005 - August 2007**

While studying Computer Science at North Carolina State University, I worked for the Department of Soil Science in their Distance Education office. My responsibilities were balanced between general system support for students and faculty, and other assorted computer tasks.

- Configured and supported Windows workstations (2000, XP) for Faculty and Students
- Configured and maintained Linux file server, web server, and domain server (samba, apache, ldap)
- Updated and maintained department and faculty web sites (php, mysql)

### Tools Used

- PHP
- Xen
- Samba
- Ldap
- Windows XP
- Fedora Linux

# Education

## [Fukuoka YMCA](http://www.fukuoka-ymca.or.jp/japanese/course)

**April 2015 - Present**

Japanese course

## [Genki JACS](http://www.genkijacs.com/)

**January 2015 - March 2015**

Short term Japanese course

## [Department of Computer Science - North Carolina State University](http://www.csc.ncsu.edu/)

**August 2005 - December 2007**

Bachelors of Science in Computer Science

# Awards / Qualifications

- Japanese Language Proficiency Test N2 - July 2015
- Eagle Scout - Boy Scouts of America - February 2003

[python]: /tags/python
[django]: /tags/django
