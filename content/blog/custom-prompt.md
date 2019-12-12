---
title: custom bash prompt
date: '2012-03-10'
section: about
source_code: true
url: /blog/custom-prompt.html
---

# SSH Colors

I like to use colors in the shell to help me identify which machine I'm on. I also like to keep my [dotfiles](https://github.com/kfdm/dotfiles) under git so it helps to have a simple way to programatically set which color I should be using on which machine.

```bash
if [ "$SSH_CONNECTION" == "" ]; then
    # Yellow prompt for local login
    PS1="[\[\033[01;33m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\W\[\033[00m\]\]]$ "
else
    # Red prompt for remote login
    PS1="[\[\033[01;31m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\W\[\033[00m\]\]]$ "
fi
```

By checking the existance of the `$SSH_CONNECTION` variable it is easy to set one color for my local machine and a different color for remote machines.

# Timestamp

I've also found it useful to know roughly when a command was started and ended. By prepending the timestamp to my prompt it is easy

```bash
# Add Timestamp
export PS1="[\[\033[01;32m\]\t\[\033[00m\]\]]$PS1"
```

Where `\t` adds the timestamp
