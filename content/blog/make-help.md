---
title: make help
date: '2018-12-13'
url: /blog/make-help.html
tags:
  - snippet
summary: Useful snippet to add help text to a Makefile
---

A useful I found from a [gist] that I have been using recently

```make
# COLORS
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

TARGET_MAX_CHAR_NUM=20
## Show help
help:
    @echo ''
    @echo 'Usage:'
    @echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
    @echo ''
    @echo 'Targets:'
    @awk '/^[a-zA-Z\-\_0-9]+:/ { \
        helpMessage = match(lastLine, /^## (.*)/); \
        if (helpMessage) { \
            helpCommand = substr($$1, 0, index($$1, ":")-1); \
            helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
            printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
        } \
    } \
    { lastLine = $$0 }' $(MAKEFILE_LIST)
```

Which allows you to add a `make help` command to your Makefiles

```make
## Generate Mobi file
mobi: clean_mobi create_foler_mobi
    gitbook mobi $(CURRENT_DIR_NOSLASH) $(MOBI_FULLNAME)

## Generate all files: website/pdf/epub/mobi
all: website pdf epub mobi
```

[gist]: https://gist.github.com/prwhite/8168133#gistcomment-2278355
