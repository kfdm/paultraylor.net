PWD := $(shell pwd)

.PHONY:	docker
docker: clean
	@echo Running Jekyll
	@docker run -t --name jekyll --rm -v $(PWD):/usr/src/app -p 4000:4000 starefossen/github-pages 


.PHONY:	open
open:
	open http://localhost:4000


.PHONY:	clean
clean:
	@docker kill jekyll 2> /dev/null || true

