PWD := $(shell pwd)

docker:
	@echo Running Jekyll
	@docker kill jekyll 2> /dev/null || true
	@docker run -t --name jekyll --rm -v $(PWD):/usr/src/app -p 4000:4000 starefossen/github-pages 
.PHONY:	docker

open:
	open http://localhost:4000
.PHONY:	open

clean:
	docker rm jekyll
.PHONY:	clean
