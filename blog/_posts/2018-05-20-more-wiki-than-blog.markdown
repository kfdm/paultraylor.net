---
layout: post
title: "More wiki than blog"
date: "2018-05-20 16:55:52 +0900"
---

I'm still debating replacing [Jekyll] with something else but I'm not super enthusiastic about writing a blog system. One frustration with many software packages is when it does almost everything you want except for a small bit. Typically your only recourse is to build the entire thing from scratch. Though I'm not very fond of [Liquid] templates since I'm more used to [Django Templates], I think the biggest issue I have with [Jekyll] is some of the [special cases] particularly with posts being special collections but regular pages are unable to take advantage of tags without workarounds. I suppose any frustrations regarding atom feeds I could probably solve by building the feed myself using vanilla [Jekyll] like I used to do.

I did seem to finally be able to get tags working how I wanted, where I could
get tagged pages. Not quite all in the same array but this should work for now.

{% highlight ruby %}
{% raw %}
{% assign taggedPages = site.pages | where:"tags",page.tag | sort:"url" %}
{% if taggedPages.size > 0 %}
{% endraw %}
{% endhighlight %}

And while there is not a way to automatically make tag index pages, using some [examples] as inspiration, I was able to get a reasonable tag page working.

{% highlight ruby %}
{% raw %}
{% assign tagPages = site.pages | where:"layout","tags" | sort_natural:"url"%}
{% endraw %}
{% endhighlight %}

Hopefully this will let me continue to use jekyll for the short term, as both my wiki and my blog, and put off starting yet another side project.


[Jekyll]: https://jekyllrb.com/
[Liquid]: https://shopify.github.io/liquid/
[Django Templates]: https://docs.djangoproject.com/en/2.0/ref/templates/language/
[special cases]: https://github.com/jekyll/jekyll/pull/5857
[examples]: https://kylewbanks.com/blog/creating-category-pages-in-jekyll-without-plugins
