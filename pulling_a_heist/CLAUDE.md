# Pulling a Heist — talk deck

Slidev deck: `slides.md`, `style.css`, `components/`, `layouts/`. Content plan in `outline.md`.

## Rules

- **Keep `references.md` up to date.** Any change to `slides.md` that adds, removes, or renames an external project, post, person, logo, or screenshot must update `references.md` in the same change. Verify links (`gh api repos/<owner>/<repo>`, `curl -sL -o /dev/null -w '%{http_code}'`) — never guess a URL; mark unknowns `TODO`.
- **Keep `outline.md` in sync** with slide order and content.
- **Never edit the heist repo** (`~/projects/heist`). Read-only: its README, `plugin/agents/*.md`, and `.heist/<slug>/` docs are sources of truth for what the talk claims about heist.
- **No invented data.** Every number or chart must come from a checkable source (repo, GitHub API, heist docs) and state where + when on the slide or in notes. Hand-placed positions or made-up series are not allowed.
- **Don't start the dev server.** The user runs `make present` (`npm run dev`, port 3030).
- **PDF:** `make pdf` → `pulling-a-heist-export.pdf` (gitignored; needs `playwright-chromium` + its Chromium: `npx playwright-chromium install chromium`).
- **HTML:** `make html` → `html/` (committed; opens straight from disk). `vite.config.ts` inlines all JS/CSS into `index.html` (browsers block separate scripts/styles on `file://`); relative base + `routerMode: hash`, slide URLs are `/#/<n>`. Components taking an image path prop must resolve root-relative paths via `import.meta.env.BASE_URL` (see `Shot.vue`) — the build only rewrites paths inside markdown. Regenerate before committing.
- **Space:** delete assets/components no slide uses; store photos/banners as JPEG sized to display (~1200px), keep screenshots with text as PNG.

## Verifying slides

- `npx slidev build --out <scratch dir>` after changes to catch compile errors; delete the output after.
- Check changed slides in the user's running dev server with the claude-in-chrome tools: screenshot, plus `getBoundingClientRect` / `scrollHeight - clientHeight` checks for overflow. Screenshots right after navigation can show stale frames — wait ~2s.
- Slide `<style>` blocks are scoped to that slide; shared classes go in `style.css` or a layout's unscoped style.
- Avoid SVG `<text>` in components (Chrome paints stale positions under Slidev scaling) — draw connectors in SVG, labels in HTML.
