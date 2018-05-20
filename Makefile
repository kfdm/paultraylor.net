docker:
	docker run -d --label=jekyll --volume=$(shell pwd):/srv/jekyll --name jekyll -it -p 127.0.0.1:4000:4000 jekyll/jekyll jekyll serve --watch --drafts

open:
	open http://localhost:4000

clean:
	docker rm jekyll

.PHONY: clean docker open
