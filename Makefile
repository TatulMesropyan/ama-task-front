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
deploy:
    aws s3 sync build/ s3://ama-frontend --region eu-central-1



.PHONY: help
help: ## Displays this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
