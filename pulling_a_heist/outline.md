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

**5. A crowded field** (GitHub stars bar chart, source + date in footer)
- Sep 10, 2026: Superpowers 284.5k · Spec Kit 134.5k · gstack 132.4k · ruflo 71.9k · GSD 64.6k (archived) · BMAD 52.9k · oh-my-claudecode 39.1k · Compound Engineering 25.0k
- Refresh counts before the talk

**6. Superpowers zoom**
- 284k★, in official marketplace
- Flow: brainstorm → spec in chunks → plan "for an enthusiastic junior engineer with poor taste" → subagent-driven dev → red/green TDD
- Cue: used it seriously, it's good — then outgrew it

**7. Where it pinched**
- 5 knobs I wanted to turn: review tool (crit) · plan reviewers · plan splitting · interview style · per-language code reviewers

## 0:06 — HEIST (10 min)

**8. Meet heist**
- `heist-banner.svg` centered + github.com/GMadorell/heist

### Part A — one real heist: `parse-vos-at-boundary` (4 min)

Persistent pipeline diagram on the left of every Part A slide (`layout: pipeline`, `step:` highlights the current node). Nodes carry model tiers: Mastermind (Opus) · Fence · Forger · Wheelman · Cleaner (Sonnet) · Muscle (Haiku) · you in crit (human gate).

**9. The pipeline** (dossier folded into the diagram)
- `/heist:heist` → Mastermind → Fence → you in crit → Forger → Wheelman ⇄ Muscle ×N → Cleaner → PR
- Cue: model tiering — expensive thinking once, cheap execution many times
- Modes badge: heavy / medium (no Fence) / light (you implement)

**10. Mastermind interview → blueprint.md**
- ✅ `mastermind-question.png`: multiple-choice question with recommended option + tradeoffs
- Blueprint: Problem → Scope (the ask, verbatim) → Constraints table with "Decision 8 (human)" sources

**11. Fence + crit**
- ✅ `crit-blueprint.png`: crit on the parse-vos-at-boundary blueprint. "Silence is approval."

**12. score.md**
- Steps grouped into waves, checked by `heist score check`
- Visual: real wave graph from score.md, waves [3,7,2,1,2,3,5,2,1,1]; one block highlighted
- That block zoomed as a card: step 3 · wave 2 · depends on step 1 · files / red / green / verify

**13. Getaway**
- Wheelman waves (up to 8 Muscles parallel) → Cleaner review crew → build/lint/test → PR + risk label
- ✅ `cleaner-review-crew.png`: 4 reviewers picked from the diff (intent, quality, coverage, rust). Visual only (demo-mode run), not tied to the death-loop lesson

**14. The full heist**
- Full current flow (heist README diagram, slide design): casing if no validation.md · split → heat.md · revise loops (Fence, crit) · Wheelman ⇄ Muscle ≤8/wave · Cleaner steps + failures loop · PR + risk label

### Part B — how heist evolved (6 min)

All lessons use `layout: lesson` (frontmatter `lesson:` + `principle:` pinned at the bottom).

**15. Lesson 1: prose → Rust CLI**
- Before: agents juggling state.json, worktrees, slugs from prose → drift
- After: `heist begin | state | score check | sync | worktree` binary
- 719 lines of prompts vs 14.7k lines of Rust
- Principle: *if it's deterministic, it's not the LLM's job*

**16. Lesson 2: Mastermind assumed answers**
- Filled gaps silently → forced "route questions to human" → relay protocol (QUESTION:/OPTIONS:) → direct AskUserQuestion from subagent
- Principle: *ambiguity must reach a human*

**17. Lesson 3: notification death loop**
- Parallel reviewers in background → each completion notification re-woke Cleaner mid-triage → re-ran/duplicated work, burned tokens → fix: parallel reviewers in foreground
- Principle: *learn your harness's runtime semantics*

**18. Lesson 4: scope too big → plan splitting**
- Mastermind proposes split → heat.md (6 pieces, strict order) → each piece its own heist, stacked worktrees
- `heist sync`: rebase / merge / halt (exit 5) based on base PR state
- Principle: *small batches — for agents too*

**19. Lesson 5: parallel agents need an agent-aware runtime**
- iTerm2 (years) → WezTerm (Jul 3) → herdr (Jul 8) → heist v0.1 (Jul 12)
- ✅ `herdr-sidebar.png`: cropped to the agents list, per-agent state (○ idle, × needs attention)
- Logos: iTerm2 (text, no official logo found in repo) → WezTerm → herdr
- My own herdr plugin `smart-notify`: click macOS notification → jump to the agent pane that needs me
- Principle: *the terminal is part of the harness*

## 0:16 — FUTURE (3 min)

**20. Bet: Matt Pocock skills**
- His critique: frameworks (GSD, BMAD, Spec Kit… heist) "own the process, take away control"
- Experiment: `/grill-with-docs` + CONTEXT.md shared language vs Mastermind; composable skills vs pipeline
- Open question, no answer yet

**21. Bet: Uncle Bob**
- Title quote (Jul 29, 2026): "You can't tell an agent to be clean." + "You have to measure the cleanliness that they produce."
- Portrait: frame from Clean Coders "Agentic Discipline" ep. 6 (`unclebob-cleancoders.png`)
- swarm-forge six-pack row: specifier (gherkin · QA) → coder (TDD) → cleaner (CRAP · DRY) → architect (dependencies) → hardener (mutation) → QA; own worktrees, git handoffs
- Steal → heist's Cleaner: CRAP · DRY · mutation · Gherkin mutation
- Tension: more gates vs better models

**22. Bet: Kun Chen**
- Title: "An engineering manager for agents" + verbatim quote (ByteByteGo guest post, Jun 23, 2026)
- Flow: you (chat/voice) → firstmate (captain, "agent distro") → crewmates ×N in treehouse worktrees → no-mistakes (review · test · docs · lint · push · PR · CI) → clean PR; secondmates on SSH hosts; scouts write reports; 68% of changes through no-mistakes had bugs
- Full firstmate banner (uncropped)
- Steal → heist: firstmate captains heat.md pieces · secondmates for an always-on crew · backpass trains prompts from transcripts · AXI heist CLI

**23. Radar**
- Each project gets a 1–3 word descriptor from its own README/site
- Overnight loops: gnhf (runs while you sleep) · Ralph (a prompt in a loop)
- Fleet managers: Gas Town (multi-agent workspace) · oh-my-claudecode (Claude Code orchestration)
- Self-improving memory: Compound Engineering (captures what you learned)
- Cross-harness portability: agent distros (e.g. firstmate) · AGENTS.md (a README for agents)
- Deterministic quality gates: swarm-forge (CRAP · DRY · mutation) · no-mistakes (gated git push)

## 0:19 — CLOSE

**24. Questions?**
- @gmadorell (X, GitHub) · github.com/GMadorell/heist

---

## Extras (after deck)
- Speaker notes: bullet cues + timer marks per section
- Offline build (local fonts) + PDF backup
- `likely-questions.md`: senior-dev questions + draft answers
