#!/bin/bash
# See http://pages.github.com/

cd `dirname $0` && pw
jekyll
open -a Safari _site/index.html