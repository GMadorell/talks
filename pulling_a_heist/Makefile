.DEFAULT_GOAL := help

.PHONY: help present build html pdf export

help:
	@echo "Pulling a Heist — talk commands"
	@echo ""
	@echo "  make present   Run the presentation (slidev dev server)"
	@echo "  make build     Build static site into dist/ (gitignored)"
	@echo "  make html      Build the committed static site into html/ (open via any static server)"
	@echo "  make pdf       Export slides to pulling-a-heist-export.pdf"
	@echo ""
	@echo "No target given → this help. Run 'make present' to start."

present:
	npm run dev

build:
	npm run build

html:
	rm -rf html
	npx slidev build --base ./ --out html

pdf:
	npm run export

export: pdf
