# Outline — harness engineering talk (draft v1)

20 min · 3 senior devs · hiring interview · in person, projector · English
Design TBD (decided last). `[?]` = needs your call. `📸` = asset from you.

---

## 0:00 — INTRO (1 min)

**1. Title**
- *Pulling a Heist — my exploration of harness engineering*

**2. Me**
- Gerard Madorell · X @gmadorell · GitHub @gmadorell
- ✅ `castellers.png`: Castellers d'Andorra tower, full-bleed
- Fun fact only: I build human towers (no metaphor reuse)

## 0:01 — HARNESS ENGINEERING (2 min)

**3. Prompt → Context → Harness**
- Three nested rings / three eras: 2023 prompt eng · 2025 context eng · 2026 harness eng
- Cue: term coined by Mitchell Hashimoto, Feb 2026; OpenAI + Anthropic posts followed within weeks

**4. Agent = Model + Harness**
- Model in the center; harness around it: instructions (CLAUDE.md, skills) · tools (CLI, MCP) · subagents · hooks · state · verification (tests, lint, review) · human gates
- Cue: Hashimoto's rule — "agent makes a mistake → change the environment so it can't happen again"

## 0:03 — MARKET (3 min)

**5. The map** (logos on 2 axes)
- X: light ceremony ←→ heavy ceremony
- Y: human-in-the-loop ↓ · autonomous fleet ↑
- Placed: Superpowers, GSD, Spec Kit, BMAD, Compound Engineering, gstack, oh-my-claudecode, ruflo

**6. Superpowers zoom**
- 284k★, in official marketplace
- Flow: brainstorm → spec in chunks → plan "for a junior with poor taste" → subagent-driven dev → red/green TDD
- Cue: used it seriously, it's good — then outgrew it

**7. Where it pinched**
- 5 knobs I wanted to turn: review tool (crit) · plan reviewers · plan splitting · interview style · per-language code reviewers
- Heist dot appears on the map

## 0:06 — HEIST (10 min)

### Part A — one real heist: `parse-vos-at-boundary` (4 min)

**8. The crew**
- Dossier cards: Mastermind (Opus) · Fence · Forger · Wheelman · Cleaner (Sonnet) · Muscle (Haiku)
- Cue: model tiering — expensive thinking once, cheap execution many times

**9. The pipeline**
- `/heist:heist` → Mastermind → Fence → you in crit → Forger → Wheelman ⇄ Muscle ×N → Cleaner → PR
- Modes badge: heavy / medium (no Fence) / light (you implement)

**10. Mastermind interview → blueprint.md**
- ✅ `mastermind-question.png`: multiple-choice question with recommended option + tradeoffs
- Blueprint (134 lines): Problem → Scope (the ask, verbatim) → Constraints table with "Decision 8 (human)" sources

**11. Fence + crit**
- Fence rounds: 1
- ✅ `crit-blueprint.png`: crit on the parse-vos-at-boundary blueprint. "Silence is approval."

**12. score.md**
- 262 lines · 27 steps · 10 waves, checked by `heist score check`
- One step zoomed: Wave / Files / Red / Green / Verify / Depends on
- Visual: wave dependency graph

**13. Getaway**
- Wheelman waves (up to 8 Muscles parallel) → Cleaner review crew → build/lint/test → PR #22, +1,353 / −785, risk label
- ✅ `cleaner-review-crew.png`: 4 reviewers picked from the diff (intent, quality, coverage, rust). Visual only (demo-mode run), not tied to the death-loop lesson
- Whole heist in one day: Jul 21

### Part B — how heist evolved (6 min)

**14. Heist builds heist**
- Timeline Jul 12 → Jul 22: 44 commits · 22 PRs · 10 heists run on itself
- v0.1 prompts-only crew → Rust CLI → modes → parallel waves → plan splitting → decide/begin

**15. Lesson: parallel agents need an agent-aware runtime**
- iTerm2 (years) → WezTerm (Jul 3) → herdr (Jul 8) → heist v0.1 (Jul 12)
- ✅ `herdr-sidebar.png`: spaces + agents grouped, per-agent state (○ idle, × needs attention)
- Logos: iTerm2 (text, no official logo found in repo) → WezTerm → herdr
- My own herdr plugin `smart-notify`: click macOS notification → jump to the agent pane that needs me
- Principle: *the terminal is part of the harness*

**16. Lesson: prose → Rust CLI**
- Before: agents juggling state.json, worktrees, slugs from prose → drift
- After: `heist begin | state | score check | sync | worktree` binary (PR #2, +5.5k)
- 719 lines of prompts vs 14.7k lines of Rust
- Principle: *if it's deterministic, it's not the LLM's job*

**17. Lesson: Mastermind assumed answers**
- Filled gaps silently → forced "route questions to human" → relay protocol (QUESTION:/OPTIONS:) → direct AskUserQuestion from subagent
- Principle: *ambiguity must reach a human*

**18. Lesson: notification death loop**
- Parallel reviewers in background → each completion notification re-woke Cleaner mid-triage → re-ran/duplicated work, burned tokens → fix: parallel reviewers in foreground
- Principle: *learn your harness's runtime semantics*

**19. Lesson: scope too big → plan splitting**
- Mastermind proposes split → heat.md (6 pieces, strict order) → each piece its own heist, stacked worktrees
- `heist sync`: rebase / merge / halt (exit 5) based on base PR state
- Principle: *small batches — for agents too*

## 0:16 — FUTURE (3 min)

**20. Bet: Matt Pocock skills**
- His critique: frameworks (GSD, BMAD, Spec Kit… heist) "own the process, take away control"
- Experiment: `/grill-with-docs` + CONTEXT.md shared language vs Mastermind; composable skills vs pipeline
- Open question, no answer yet

**21. Bet: Uncle Bob**
- Quote (Sep 7): "I'm starting to think I'm over constraining them. Perhaps vastly."
- swarm-forge screenshot
- Experiment: steal his deterministic gates into Cleaner — mutation testing, CRAP, Gherkin acceptance mutation
- Tension: more gates vs better models

**22. Bet: Kun Chen**
- firstmate as captain → dispatches & supervises heists (heat.md pieces in parallel)
- herdr on a server, connect via SSH: captain local, crew on a box that never sleeps (firstmate secondmates on SSH hosts, herdr-mirror)
- backpass: mine session transcripts → evidence-backed edits to heist prompts
- AXI: make `heist` CLI agent-ergonomic, benchmark tokens

**23. Radar**
- Overnight loops (gnhf, Ralph) · fleet managers (Gas Town, oh-my-claudecode) · self-improving memory (Compound Engineering) · deterministic quality gates · cross-harness portability (agent distros, AGENTS.md)

## 0:19 — CLOSE

**24. Questions?**
- @gmadorell (X, GitHub) · github.com/GMadorell/heist

---

## Extras (after deck)
- Speaker notes: bullet cues + timer marks per section
- Offline build (local fonts) + PDF backup
- `likely-questions.md`: senior-dev questions + draft answers
