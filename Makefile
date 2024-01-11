.DEFAULT_GOAL := help

.PHONY: init
init:
	npm install

.PHONY: build
build:
	npm run build

.PHONY: lint
lint:
	npm run lint

.PHONY: test
test:
	npm run test

.PHONY: deploy
deplot:
	pwd


.PHONY: help
help: ## Displays this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
