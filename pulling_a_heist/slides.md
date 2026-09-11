---
theme: default
title: Pulling a Heist
info: |
  Pulling a Heist — an exploration of harness engineering.
  Gerard Madorell · @gmadorell
transition: none
mdc: false
routerMode: hash
layout: center
---

<div class="eyebrow">a talk about harness engineering</div>

# Pulling a Heist

<p class="mono" style="font-size: 1.05rem; margin-top: 0.5rem;">what I learned running my own agent crew</p>

<hr class="rule">

<!--
[TIMER 0:00 — INTRO]
- Open cold, no agenda slide — the title is the agenda.
- One breath, then move: this is a story about how I build with agents, not a product pitch.
- Tone: confident, first person, a little dry humor (heist framing).
-->

---
layout: full
---

<div class="split">
  <div class="split-left">
    <div class="eyebrow" style="margin-bottom: 0.4rem;">Gerard Madorell</div>
    <div class="mono" style="font-size: 0.85rem; color: var(--sw-ink-dim);">X @gmadorell · GitHub @gmadorell</div>
    <div class="rule"></div>
    <p style="font-size: 0.95rem; max-width: 30ch; margin-top: 1rem;">Fun fact: I build human towers as a hobby. Castellers d'Andorra.</p>
  </div>
  <div class="split-right">
    <div class="tower-frame">
      <img src="/img/castellers.jpg" alt="Castellers d'Andorra human tower" />
    </div>
  </div>
</div>

<style>
/* This slide owns every element below directly (no built-in two-cols
   layout in the middle), so the whole height:100% chain resolves against
   real, definite ancestor sizes instead of an auto-sized grid row. */
.split {
  box-sizing: border-box;
  height: 100%;
  padding: 2rem 2.4rem;
  display: flex;
  gap: 2rem;
}
.split-left {
  flex: 0 1 30%;
  min-width: 0;
}
.split-right {
  flex: 1 1 0;
  min-width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tower-frame {
  box-sizing: border-box;
  position: relative;
  /* height is the only definite dimension; width derives from the photo's
     real aspect ratio so this can never demand more vertical space than
     the column actually has. */
  height: 100%;
  width: auto;
  max-width: 100%;
  aspect-ratio: 1312 / 1690;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
  border: 1.5px solid var(--sw-ink);
}
.tower-frame::before,
.tower-frame::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
}
.tower-frame::before {
  top: -1px; left: -1px;
  border-left: 2px solid var(--sw-accent);
  border-top: 2px solid var(--sw-accent);
}
.tower-frame::after {
  bottom: -1px; right: -1px;
  border-right: 2px solid var(--sw-accent);
  border-bottom: 2px solid var(--sw-accent);
}
.tower-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

<!--
- Name, X + GitHub handle — say it out loud once, it's on every closing slide too.
- Castellers d'Andorra photo: pause half a beat, let it land as just a fact.
- Explicitly disclaim the metaphor — the joke is that there isn't one.
-->

---

<div class="era-slide">
  <div class="eyebrow">harness engineering — three eras</div>

  <h1>Prompt → Context → Harness</h1>

  <Timeline :points="[
    { date: '2023', label: 'Prompt engineering' },
    { date: '2025', label: 'Context engineering' },
    { date: '2026', label: 'Harness engineering' },
  ]" />

  <div class="stat-line">term coined by Mitchell Hashimoto, Feb 2026 · OpenAI + Anthropic posts followed within weeks</div>
</div>

<style>
.era-slide {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
}
.era-slide h1 { margin: 0; }
</style>

<!--
[TIMER 0:01 — HARNESS ENGINEERING]
- Frame as an escalation, not a replacement — each era still matters, the center of gravity moved.
- Name-drop Hashimoto's post explicitly: "My AI Adoption Journey", Feb 2026.
- Note how fast the term got picked up industry-wide — within weeks.
-->

---

<div class="eyebrow">the shape of an agent</div>

# Agent = Model + Harness

<div class="harness-diagram">
  <div class="harness-center mono">MODEL</div>
  <div class="harness-ring">
    <Badge label="instructions" />
    <Badge label="tools (CLI, MCP)" />
    <Badge label="subagents" />
    <Badge label="hooks" />
    <Badge label="state" />
    <Badge label="verification" />
    <Badge label="human gates" />
  </div>
</div>

<div class="principle" style="margin-top: 1.2rem;">Agent makes a mistake → change the environment so it can't happen again.</div>
<div class="stat-line">— Hashimoto's rule</div>

<style>
.harness-diagram { display: flex; flex-direction: column; gap: 1.4rem; align-items: flex-start; }
.harness-center {
  border: 2px solid var(--sw-accent);
  padding: 0.6rem 1.4rem;
  font-weight: 600;
}
.harness-ring { display: flex; flex-wrap: wrap; gap: 0.6rem; }
</style>

<!--
- Model is one ingredient, not the system — the harness is everything around it.
- Walk the ring once: instructions, tools, subagents, hooks, state, verification, human gates.
- Land on Hashimoto's rule — it's the thesis for the whole rest of the talk.
-->

---

<div class="market-slide">
  <div class="eyebrow">the market — github stars</div>

  <h1>A crowded field</h1>

  <StarBars class="market-chart" source="source: GitHub stars · Sep 10, 2026" :items="[
    { name: 'Superpowers', stars: 284502, highlight: true },
    { name: 'Spec Kit', stars: 134538 },
    { name: 'gstack', stars: 132396 },
    { name: 'ruflo', stars: 71936 },
    { name: 'GSD', stars: 64564, note: 'archived' },
    { name: 'BMAD', stars: 52862 },
    { name: 'oh-my-claudecode', stars: 39085 },
    { name: 'Compound Eng.', stars: 24999 },
  ]" />
</div>

<style>
.market-slide {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.market-slide h1 { margin: 0 0 1.2rem; }
.market-chart { flex: 1; min-height: 0; }
</style>

<!--
[TIMER 0:03 — MARKET]
- One number, straight from GitHub on Sep 10, 2026 — popularity, not quality. Refresh the counts right before the talk.
- The point is scene-setting: lots of people want a harness. Walk the top few by name, don't rank them.
- GSD's repo has been archived since May 2026 — it's marked on the chart, mention it if asked.
- oh-my-claudecode has no official logo, shown as a plain label.
- Superpowers is the biggest by far — that's the next slide.
-->

---
layout: image-right
image: /logos/superpowers.png
backgroundSize: contain
---

<div class="eyebrow">superpowers</div>

# 284k★, official marketplace

<ol class="mono" style="font-size: 0.95rem;">
  <li>brainstorm</li>
  <li>spec, in chunks</li>
  <li>plan — "for an enthusiastic junior engineer with poor taste"</li>
  <li>subagent-driven dev</li>
  <li>red / green TDD</li>
</ol>

<div class="principle" style="font-size: 1.2rem;">Used it seriously. It's good. But it was missing some things I really wanted to have.</div>

<!--
- Give it real credit — this isn't a takedown, Superpowers is genuinely good.
- Walk the five-step flow fast, it's the setup for "where it pinched."
- The plan quote is verbatim from the Superpowers README: clear enough for "an enthusiastic junior engineer with poor taste, no judgement, no project context, and an aversion to testing" — attribute it.
- Land the outgrew-it line as a transition, not a complaint.
-->

---

<div class="pinch-slide">
  <div class="eyebrow">where it pinched</div>

  <h1>Five knobs I wanted to turn</h1>

  <ol class="knobs">
    <li><span>01</span>Review tool — crit</li>
    <li><span>02</span>Plan reviewers</li>
    <li><span>03</span>Plan splitting</li>
    <li><span>04</span>Interview style</li>
    <li><span>05</span>Per-language code reviewers</li>
  </ol>
</div>

<style>
.pinch-slide {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.pinch-slide h1 { margin: 0 0 1.4rem; }
.knobs { list-style: none; padding: 0; margin: 0; border-bottom: 2px solid var(--sw-ink); }
.knobs li {
  display: flex;
  align-items: baseline;
  gap: 1.4rem;
  margin: 0;
  padding: 0.55rem 0;
  border-top: 2px solid var(--sw-ink);
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.1;
}
.knobs span {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--sw-accent);
}
</style>

<!--
- These five gaps are the actual origin story of heist — not "Superpowers is bad," but "I wanted more control on these five axes."
- Transition line: "so I built the thing I wanted." Straight into Part A.
-->

---
layout: center
---

<div class="heist-intro">
  <img src="/img/heist-banner.svg" alt="heist — case file banner" />
  <div class="mono heist-link">github.com/GMadorell/heist</div>
</div>

<style>
.heist-intro { display: flex; flex-direction: column; align-items: center; gap: 1.2rem; }
.heist-intro img { display: block; width: 44rem; max-width: 100%; height: auto; }
.heist-link { font-size: 1rem; color: var(--sw-ink-dim); }
</style>

<!--
- So I built the thing I wanted: heist. One breath — name it, show it, move on.
- Next: one real heist, start to finish.
-->

---
layout: section
---

<div class="eyebrow">heist — part a</div>

# One real heist: `parse-vos-at-boundary`

<style>
h1 code { white-space: nowrap; }
</style>

<!--
[TIMER 0:06 — HEIST]
- This is the walkthrough section — one real PR, start to finish, in four minutes.
- Say the branch/task name once clearly, it recurs on every slide in this section.
-->

---
layout: pipeline
---

<div class="eyebrow">the pipeline</div>

# `/heist:heist`

<div class="principle" style="font-size: 1.35rem;">Expensive thinking once. Cheap execution, many times.</div>

<div class="rule"></div>

<div class="modes">
  <Badge label="heavy — full crew" />
  <Badge label="medium — no Fence" />
  <Badge label="light — you implement" />
</div>

<style>
.modes { display: flex; flex-direction: column; align-items: flex-start; gap: 0.7rem; }
</style>

<!--
- Walk the rail top to bottom once, at speed — this diagram stays on screen for the next four slides.
- Model tags on the nodes are the dossier: one Opus thinks once (Mastermind), Sonnet supervises, Haiku executes in bulk (Muscle ×N). Economic decision, not a technical constraint.
- Call out "you, in crit" explicitly — the human gate is not incidental, it's load-bearing.
- Loops on the side: Fence and crit both send the blueprint back for revision; Cleaner failures go back to Wheelman.
- Three modes exist because not every task needs the full crew — heavy/medium/light.
-->

---
layout: pipeline
step: mastermind
---

<div class="eyebrow">the interview</div>

# Mastermind → blueprint.md

<p>One question at a time. Multiple choice, a recommended option, tradeoffs spelled out.</p>

<Shot src="/img/mastermind-question.png" :w="2000" :h="496" alt="Mastermind asking a multiple-choice question with a recommended option" />

<div class="mono" style="font-size: 0.85rem; line-height: 1.9; margin-top: 0.9rem;">
  Problem<br>
  → Scope <span style="color: var(--sw-ink-dim);">(the ask, verbatim)</span><br>
  → Constraints table <span style="color: var(--sw-ink-dim);">— "Decision 8 (human)"</span>
</div>

<!--
- Show the screenshot, let them read the question shape for a second before you talk over it.
- Blueprint structure: Problem, then Scope quoting the original ask verbatim, then a constraints table.
- Point out the "Decision 8 (human)" tag style — every human call is traceable to a source.
-->

---
layout: pipeline
step: fence crit
---

<div class="eyebrow">fence + crit</div>

# Attacked, then reviewed

<p>Fence attacks the blueprint's decisions before it ever reaches me. Then I review it myself, inline, in crit.</p>

<Shot src="/img/crit-blueprint.png" :w="2000" :h="1392" alt="crit reviewing the parse-vos-at-boundary blueprint" />

<div class="principle" style="font-size: 1.3rem; margin-top: 0.6rem;">Silence is approval.</div>

<!--
- Fence's job is adversarial — it's supposed to find the weak decisions, not rubber-stamp.
- "Silence is approval" is the crit convention — zero comments on a review means ship it.
-->

---
layout: pipeline
step: forger
---

<div class="eyebrow">score.md</div>

# A plan in waves

<WaveGraph :waves="[3, 7, 2, 1, 2, 3, 5, 2, 1, 1]" :highlight="[1, 0]" />

<div class="step-card">
  <div class="step-head">
    <span class="step-id">step 3 · wave 2</span>
    <span>depends on step 1</span>
  </div>
  <div class="step-title">Add BranchValue strict value object</div>
  <div class="step-rows">
    <b>files</b><span class="mono">domain/value.rs</span>
    <b>red</b><span>tests for valid / invalid branch names — must fail first</span>
    <b>green</b><span>add the type with a strict validator</span>
    <b>verify</b><span class="mono">cargo test … branch_value_accepts_slug_derived_branch</span>
  </div>
</div>

<style>
.step-card {
  margin-top: 1.2rem;
  border: 2px solid var(--sw-ink);
  padding: 0.8rem 1rem 0.9rem;
}
.step-head {
  display: flex;
  justify-content: space-between;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sw-ink-dim);
}
.step-head .step-id { color: var(--sw-accent); font-weight: 600; }
.step-title {
  font-family: 'Archivo', sans-serif;
  font-weight: 900;
  font-size: 1.3rem;
  margin: 0.3rem 0 0.6rem;
}
.step-rows {
  display: grid;
  grid-template-columns: 4.2rem 1fr;
  row-gap: 0.3rem;
  font-size: 0.9rem;
  align-items: baseline;
}
.step-rows b {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.step-rows .mono { font-size: 0.8rem; }
</style>

<!--
- The wave graph is the real plan: 27 steps in 10 waves. Steps in the same wave don't depend on each other, so they run concurrently.
- The red block is the step on the card, straight from score.md: which files, a failing test first (red), the smallest change to pass it (green), the exact command to verify, and what it depends on.
- That's what "a plan for a worker with zero thinking" looks like — Muscle gets only this card.
- `heist score check` validates the plan's structure before any worker touches it.
-->

---
layout: pipeline
step: wheelman muscle cleaner pr
---

<div class="eyebrow">getaway</div>

# Waves, then a review crew

<p class="mono" style="font-size: 0.88rem;">Wheelman waves (up to 8 Muscles parallel) → Cleaner review crew → build / lint / test → PR + risk label</p>

<Shot src="/img/cleaner-review-crew.png" :w="1600" :h="342" alt="Cleaner launching four review agents in parallel" />

<!--
- Up to 8 Muscle workers run at once per wave — that's the parallelism payoff of small, independent steps.
- Cleaner picks reviewers off the actual diff (this screenshot is a demo-mode run, not the death-loop story — save that for the death-loop lesson).
- Heads-up: the screenshot says "4 background agents launched", but lesson 3's fix is "reviewers run in the foreground" — have the explanation ready if someone connects the two.
-->

---

<div class="flow-slide">
  <div class="eyebrow">the whole flow, today</div>

  <h1>The full heist</h1>

  <FullPipeline />
</div>

<style>
.flow-slide {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.flow-slide h1 { font-size: 2.6rem; margin: 0 0 0.9rem; }
.flow-slide .full-pipeline { align-self: center; }
</style>

<!--
- Zoom out: this is the same flow as the last five slides, plus the branches a single run didn't need.
- First run in a repo: /heist:casing writes validation.md (build / lint / test commands) — skipped once it exists.
- Scope too big: Mastermind proposes a split into heat.md, each piece re-enters as its own heist (lesson 4).
- Two revise loops: Fence findings and crit changes both send the blueprint back to Mastermind.
- Cleaner failures go back to Wheelman; Cleaner itself syncs, runs the review crew, triages, builds / lints / tests, updates docs, pushes.
- Heavy mode shown; medium skips Fence; light: you implement.
-->

---
layout: section
---

<div class="eyebrow">heist — part b</div>

# How heist evolved

<!--
- Shift gears: Part A was one heist. Part B is what building heist taught me.
- Five lessons, one principle each — keep pace brisk.
-->

---
layout: lesson
lesson: 1
principle: "If it's deterministic, it's not the LLM's job."
---

# Prose → Rust CLI

<div class="versus">
  <div class="box">
    <div class="label">before</div>
    <div class="big">Agents juggling <code>state.json</code>, worktrees, slugs — from prose.</div>
    <div class="drift">Drift.</div>
  </div>
  <div class="arrow">→</div>
  <div class="box on">
    <div class="label">after — one binary</div>
    <div class="cmds">heist begin<br>heist state<br>heist score check<br>heist sync<br>heist worktree</div>
  </div>
</div>

<div class="loc">
  <span class="loc-num">719</span><span class="loc-unit">lines of prompts</span>
  <span class="loc-vs">vs</span>
  <span class="loc-num accent">14.7k</span><span class="loc-unit">lines of Rust</span>
</div>

<style>
.versus { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; }
.drift { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 2rem; line-height: 1; color: var(--sw-accent); margin-top: 0.8rem; }
.cmds { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 1.15rem; line-height: 1.5; }
.loc { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.6rem; margin-top: 1.4rem; }
.loc-num { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 2.6rem; line-height: 1; }
.loc-num.accent { color: var(--sw-accent); }
.loc-unit, .loc-vs { font-family: 'IBM Plex Mono', monospace; font-size: 0.95rem; color: var(--sw-ink-dim); }
.loc-vs { margin: 0 0.8rem; }
</style>

<!--
- The failure mode: state living in prose drifts, because agents interpret prose, they don't execute it.
- The fix is a real binary with real subcommands — not more careful prompting.
- The line count comparison is the punchline: 20x more Rust than prompt, and that's correct.
-->

---
layout: lesson
lesson: 2
principle: Ambiguity must reach a human.
---

# Mastermind assumed answers

<div class="stages">
  <div class="box stage">
    <div class="label">1 · the bug</div>
    <div class="big">Filled gaps silently</div>
  </div>
  <div class="arrow">→</div>
  <div class="box stage">
    <div class="label">2</div>
    <div class="big">Forced: route to human</div>
  </div>
  <div class="arrow">→</div>
  <div class="box stage">
    <div class="label">3</div>
    <div class="big">Relay protocol</div>
    <div class="stage-code">QUESTION: / OPTIONS:</div>
  </div>
  <div class="arrow">→</div>
  <div class="box stage on">
    <div class="label">4 · now</div>
    <div class="big">Direct</div>
    <div class="stage-code">AskUserQuestion</div>
  </div>
</div>

<style>
.stages { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; gap: 0.5rem; }
.stage { min-height: 12rem; display: flex; flex-direction: column; }
.stage .label { margin-bottom: auto; }
.stage .big { font-size: 1.5rem; }
.stage-code { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 0.9rem; margin-top: 0.4rem; }
</style>

<!--
- Failure mode: the agent guessed instead of asking, and the guesses were wrong often enough to matter.
- The fix evolved in stages — a relay protocol was a stopgap before subagents could ask directly.
- This is the "human gates" piece of the harness ring from Agent = Model + Harness, now showing up as a real incident.
-->

---
layout: lesson
lesson: 3
principle: Learn your harness's runtime semantics.
---

# The notification death loop

<div class="loop">
  <div class="loop-row">
    <div class="box"><div class="label">1</div><div class="big">Parallel reviewers run in the background</div></div>
    <div class="arrow">→</div>
    <div class="box"><div class="label">2</div><div class="big">Each completion notification re-wakes Cleaner mid-triage</div></div>
    <div class="arrow">→</div>
    <div class="box"><div class="label">3</div><div class="big">Cleaner re-runs, duplicates work, burns tokens</div></div>
  </div>
  <div class="loop-back"><span>next notification</span></div>
</div>

<div class="box on fix">
  <div class="label">fix</div>
  <div class="big">Parallel reviewers run in the foreground</div>
</div>

<style>
/* arrow columns are a fixed 2.4rem so the return arrow can target card centers:
   card width c = (100% - 4.8rem) / 3 */
.loop-row { display: grid; grid-template-columns: 1fr 2.4rem 1fr 2.4rem 1fr; }
.loop-row .box { min-height: 8.5rem; }
.loop-back {
  position: relative;
  height: 1.8rem;
  margin-left: calc((100% - 4.8rem) / 2 + 2.4rem);
  margin-right: calc((100% - 4.8rem) / 6);
  border: 2px solid var(--sw-accent);
  border-top: none;
}
.loop-back::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -8px;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 10px solid var(--sw-accent);
}
.loop-back span {
  position: absolute;
  left: 50%;
  bottom: -0.55rem;
  transform: translateX(-50%);
  padding: 0 0.5rem;
  background: var(--sw-bg);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8rem;
  color: var(--sw-accent);
  white-space: nowrap;
}
.fix { display: flex; align-items: baseline; gap: 1.2rem; margin-top: 1.8rem; }
.fix .label { margin-bottom: 0; }
</style>

<!--
- This is a real incident, not a hypothetical — commit 62d4502, July 15.
- The bug: background task completions are notifications, and notifications re-enter the loop — Cleaner kept "waking up" mid-decision.
- The fix looks like a downgrade (background → foreground) but it's actually understanding what your own tools do.
-->

---
layout: lesson
lesson: 4
principle: Small batches — for agents too.
---

# Scope too big → plan splitting

<div class="splitting">
  <div>
    <div class="label">Mastermind proposes a split → heat.md</div>
    <div class="stairs">
      <div class="piece" style="--i: 0"><b>1</b><span>heist</span></div>
      <div class="piece" style="--i: 1"><b>2</b><span>heist</span></div>
      <div class="piece" style="--i: 2"><b>3</b><span>heist</span></div>
      <div class="piece" style="--i: 3"><b>4</b><span>heist</span></div>
      <div class="piece" style="--i: 4"><b>5</b><span>heist</span></div>
      <div class="piece" style="--i: 5"><b>6</b><span>heist</span></div>
    </div>
    <div class="label" style="margin: 0.6rem 0 0;">6 pieces · strict order · stacked worktrees</div>
  </div>
  <div>
    <div class="label"><span class="mono" style="text-transform: none; letter-spacing: 0;">heist sync</span> reads the base PR</div>
    <div class="sync">
      <div class="sync-row"><span>no base</span><b>rebase</b></div>
      <div class="sync-row"><span>base PR open or merged</span><b>merge</b></div>
      <div class="sync-row halt"><span>base abandoned</span><b>halt · exit 5</b></div>
    </div>
  </div>
</div>

<style>
.splitting { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
.stairs { display: flex; flex-direction: column; gap: 4px; }
.piece {
  box-sizing: border-box;
  width: 55%;
  margin-left: calc(var(--i) * 9%);
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.15rem 0.6rem;
  border: 2px solid var(--sw-ink);
}
.piece b { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 1.1rem; }
.piece span { font-family: 'IBM Plex Mono', monospace; font-size: 0.8rem; color: var(--sw-ink-dim); }
.piece:first-child { background: var(--sw-ink); }
.piece:first-child b, .piece:first-child span { color: var(--sw-bg); }
.sync-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.75rem 0;
  border-top: 2px solid var(--sw-ink);
  font-size: 1.15rem;
}
.sync-row:last-child { border-bottom: 2px solid var(--sw-ink); }
.sync-row b { font-family: 'IBM Plex Mono', monospace; font-weight: 600; }
.sync-row.halt b { color: var(--sw-accent); }
</style>

<!--
- The insight isn't new to software — small batches — the news is that it applies to agent-driven work too.
- heat.md orders the pieces; each piece runs as its own heist on a worktree stacked on the previous one.
- heist sync keeps stacked worktrees honest against a moving base: no base → rebase; base PR open or merged → merge (so squash-merged commits aren't replayed); base abandoned → halt with exit 5 instead of carrying rejected commits along.
-->

---
layout: lesson
lesson: 5
principle: The terminal is part of the harness.
---

<div class="runtime">
  <div class="runtime-text">
    <h1>Parallel agents need an agent-aware runtime</h1>
    <div class="logo-chain">
      <span class="iterm mono">iTerm2</span>
      <span class="arrow">→</span>
      <img src="/logos/wezterm.svg" alt="WezTerm" />
      <span class="arrow">→</span>
      <img src="/logos/herdr.svg" alt="herdr" />
    </div>
    <div class="big">Own herdr plugin, <code>smart-notify</code>: click the macOS notification, jump straight to the agent pane that needs you.</div>
  </div>
  <div class="runtime-shot">
    <img src="/img/herdr-sidebar.png" alt="herdr sidebar: agents grouped, per-agent idle / needs-attention state" />
  </div>
</div>

<style>
.runtime { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: 1fr 12rem; gap: 2.4rem; }
.runtime-text { display: flex; flex-direction: column; justify-content: center; }
.logo-chain { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1.4rem; }
.logo-chain img { height: 44px; }
.logo-chain .arrow { font-size: 1.4rem; }
.iterm { border: 2px solid var(--sw-ink); padding: 0.35rem 0.7rem; font-size: 1.05rem; font-weight: 600; }
/* deliberate crop: the sidebar is 480×1990 with a big empty middle, so show
   only the agents list (per-agent ○ idle / × needs attention) */
.runtime-shot { align-self: center; aspect-ratio: 480 / 760; overflow: hidden; border: 2px solid var(--sw-ink); }
.runtime-shot img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: 0 90%; }
</style>

<!--
- iTerm2 has no logo in the deck on purpose — shown as a plain label, same as oh-my-claudecode earlier.
- The chain: years on iTerm2 → WezTerm (Jul 3) → herdr (Jul 8) → heist v0.1 (Jul 12).
- smart-notify is a real plugin you wrote — worth a beat if anyone asks how it works.
-->

---
layout: center
---

<div class="eyebrow">looking forward</div>

# Three bets

<!--
[TIMER 0:16 — FUTURE]
- Section shift: everything so far happened. This section is open questions and live experiments.
- Frame as bets, explicitly — some may not pay off, that's fine, that's the point of experimenting in public.
-->

---
layout: image-left
image: /logos/mattpocock.png
backgroundSize: contain
---

<div class="eyebrow">bet 1 — matt pocock, skills</div>

# "Frameworks own the process"

<p>His critique: GSD, BMAD, Spec Kit — heist too — take away control by owning the process.</p>

<div class="rule"></div>

<p class="mono" style="font-size: 0.85rem;"><code>/grill-with-docs</code> + CONTEXT.md as shared language, vs a Mastermind interview. Composable skills vs a pipeline.</p>

<div class="badge" style="margin-top: 1rem;">open question — no answer yet</div>

<!--
- Give the critique full weight — it's aimed at heist by name, don't soften it.
- The experiment is genuinely unresolved: skills-as-composable-primitives vs heist's fixed pipeline.
- Land on "no answer yet" and mean it — this is the most honestly-open of the three bets.
-->

---
---

<div class="bob-slide">
  <div class="eyebrow">bet 2 — uncle bob · swarm-forge</div>

  <div class="bob-head">
    <img class="bob-face" src="/img/unclebob-cleancoders.jpg" alt="Robert C. Martin (Uncle Bob), Clean Coders: Agentic Discipline, episode 6" />
    <div>
      <h1>"You can't tell an agent to be clean."</h1>
      <div class="bob-sub">"You have to measure the cleanliness that they produce." — Jul 29, 2026</div>
    </div>
  </div>

  <div class="bob-pipe">
    <div class="bob-role"><b>specifier</b><span>gherkin · QA</span></div>
    <div class="bob-arrow">→</div>
    <div class="bob-role"><b>coder</b><span>TDD</span></div>
    <div class="bob-arrow">→</div>
    <div class="bob-role on"><b>cleaner</b><span>CRAP · DRY</span></div>
    <div class="bob-arrow">→</div>
    <div class="bob-role"><b>architect</b><span>dependencies</span></div>
    <div class="bob-arrow">→</div>
    <div class="bob-role on"><b>hardener</b><span>mutation</span></div>
    <div class="bob-arrow">→</div>
    <div class="bob-role"><b>QA</b><span>final verify</span></div>
  </div>
  <div class="bob-meta">swarm-forge six-pack · each role in its own git worktree · work moves as committed git handoffs</div>

  <div class="bob-steal">
    <span class="bob-label">steal → heist's Cleaner</span>
    <span class="bob-gates">CRAP · DRY · mutation · Gherkin mutation</span>
    <span class="badge">tension: more gates vs better models</span>
  </div>
</div>

<style>
.bob-slide { height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
.bob-slide .eyebrow { margin-bottom: 1rem; }
.bob-head { display: flex; align-items: center; gap: 1.6rem; }
.bob-face { height: 8.5rem; width: auto; flex: none; border: 2px solid var(--sw-ink); }
.bob-slide h1 { font-size: 2.6rem; margin: 0 0 0.6rem; }
.bob-sub { font-family: 'IBM Plex Mono', monospace; font-size: 0.85rem; color: var(--sw-ink-dim); }
.bob-pipe { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr auto 1fr; gap: 0.35rem; margin-top: 2rem; }
.bob-role { display: flex; flex-direction: column; gap: 0.3rem; padding: 0.6rem 0.7rem; border: 2px solid var(--sw-ink); }
.bob-role b { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 1.05rem; }
.bob-role span { font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--sw-ink-dim); }
.bob-role.on { background: var(--sw-accent); border-color: var(--sw-accent); }
.bob-role.on b, .bob-role.on span { color: #fff; }
.bob-arrow { display: flex; align-items: center; color: var(--sw-ink-dim); }
.bob-meta { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: var(--sw-ink-dim); margin-top: 0.6rem; }
.bob-steal { display: flex; align-items: center; flex-wrap: wrap; gap: 1rem; margin-top: 1.6rem; padding-top: 0.9rem; border-top: 2px solid var(--sw-ink); }
.bob-label { font-family: 'IBM Plex Mono', monospace; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--sw-accent); }
.bob-gates { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 1.35rem; margin-right: auto; }
</style>

<!--
- Uncle Bob doesn't read the code his agents write — "the only way I can take advantage of their productivity" (Jul 23). He surrounds them with constraints instead: unit tests, Gherkin, QA procedures, mutation testing, coverage, quality metrics.
- The quote is the whole bet: you can't prompt quality in, you have to measure it and make agents fix failures (Jul 29).
- swarm-forge six-pack: specifier → coder → cleaner → architect → hardener → QA, each in its own worktree, handing work on as git commits. He built a Missile Command remake in one day with it (Jul 25).
- The red roles are what I'd steal: his deterministic gates (his own CRAP / DRY / mutation tools, Gherkin mutation) into heist's Cleaner, next to the LLM review crew.
- Parallel to lesson 3: his handoff rules say "if a wake-up arrives while already working on a task, ignore it" — same trap, solved in the runtime.
- Honest caveats he posted himself: after repeated context compaction roles lose identity, forget handoffs, the architect skipped mutation tests "because they take a long time" (May 17). Constant babysitting, but it got a lot done.
- Name the tension, don't resolve it: more gates, or better models that need fewer?
-->

---
---

<div class="kun-slide">
  <div class="eyebrow">bet 3 — kun chen · ex-meta L8</div>

  <h1>An engineering manager for agents</h1>
  <div class="kun-sub">"I have now stopped writing most of the code myself and started acting like an engineering manager directing a team of agents." — Jun 23, 2026</div>

  <div class="kun-flow">
    <div class="kun-node"><b>you</b><span>chat or voice</span></div>
    <div class="kun-arrow">→</div>
    <div class="kun-node on"><b>firstmate</b><span>captain · agent distro</span></div>
    <div class="kun-arrow">→</div>
    <div class="kun-node crew"><b>crewmates ×N</b><span>treehouse worktrees</span></div>
    <div class="kun-arrow">→</div>
    <div class="kun-node"><b>no-mistakes</b><span>review · test · docs · lint · push · PR · CI</span></div>
    <div class="kun-arrow">→</div>
    <div class="kun-node term"><b>clean PR</b></div>
  </div>
  <div class="kun-under">
    <span style="grid-column: 3;">↳ secondmates on SSH hosts</span>
    <span style="grid-column: 5;">↳ scouts: reports, no PR</span>
    <span style="grid-column: 7;">68% of pushed changes had bugs</span>
  </div>

  <div class="kun-bottom">
    <img class="kun-banner" src="/img/firstmate-banner.jpg" alt="firstmate banner: talk to one agent, ship with a crew" />
    <div>
      <div class="kun-label">steal → heist</div>
      <ul class="kun-steal">
        <li><b>firstmate</b> captains heat.md pieces, each piece its own heist</li>
        <li><b>secondmates</b> keep the crew on an always-on box over SSH</li>
        <li><b>backpass</b> trains heist's prompts from real transcripts</li>
        <li><b>AXI</b> makes the heist CLI agent-ergonomic</li>
      </ul>
    </div>
  </div>
</div>

<style>
.kun-slide { height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
.kun-slide .eyebrow { margin-bottom: 0.6rem; }
.kun-slide h1 { font-size: 2.4rem; margin: 0 0 0.5rem; }
.kun-sub { font-family: 'IBM Plex Mono', monospace; font-size: 0.78rem; line-height: 1.45; color: var(--sw-ink-dim); }
.kun-flow, .kun-under { display: grid; grid-template-columns: 0.8fr auto 1.1fr auto 1.1fr auto 1.4fr auto 0.8fr; column-gap: 0.4rem; }
.kun-flow { margin-top: 1.3rem; }
.kun-node { display: flex; flex-direction: column; justify-content: center; gap: 0.3rem; padding: 0.55rem 0.7rem; border: 2px solid var(--sw-ink); }
.kun-node b { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 1.05rem; line-height: 1; }
.kun-node span { font-family: 'IBM Plex Mono', monospace; font-size: 0.62rem; line-height: 1.3; letter-spacing: 0.05em; text-transform: uppercase; color: var(--sw-ink-dim); }
.kun-node.on { background: var(--sw-accent); border-color: var(--sw-accent); }
.kun-node.on b, .kun-node.on span { color: #fff; }
.kun-node.crew { box-shadow: 4px -4px 0 -2px var(--sw-bg), 4px -4px 0 0 var(--sw-ink); }
.kun-node.term { background: var(--sw-ink); }
.kun-node.term b { color: var(--sw-bg); }
.kun-arrow { display: flex; align-items: center; color: var(--sw-ink-dim); }
.kun-under { margin-top: 0.4rem; font-family: 'IBM Plex Mono', monospace; font-size: 0.66rem; line-height: 1.3; color: var(--sw-ink-dim); }
.kun-bottom { display: flex; align-items: center; gap: 1.8rem; margin-top: 1.4rem; padding-top: 1rem; border-top: 2px solid var(--sw-ink); }
.kun-banner { display: block; width: 18rem; height: auto; flex: none; border: 2px solid var(--sw-ink); }
.kun-label { font-family: 'IBM Plex Mono', monospace; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--sw-accent); margin-bottom: 0.4rem; }
.kun-steal { list-style: none; padding: 0; margin: 0; }
.kun-steal li { margin: 0 0 0.25rem; font-size: 0.95rem; color: var(--sw-ink); }
.kun-steal b { font-family: 'Archivo', sans-serif; font-weight: 900; }
</style>

<!--
- Kun Chen: former L8 engineer at Meta, Microsoft, Atlassian; now builds solo, all-in on agentic engineering. Quote from his ByteByteGo guest post (Jun 23, 2026).
- firstmate: you talk only to the captain. It spawns crewmates in clean treehouse worktrees, supervises them, and ships each project via no-mistakes, direct PR, or local-only. Scouts return investigation reports instead of PRs.
- He calls firstmate an "agent distro", not a harness, skill, model, CLI or MCP: a directory of system prompt, skills and bash scripts, closest analogy a Linux distro (tweet, Jul 12).
- no-mistakes is his most-starred project: a git proxy that runs review → test → docs → lint → push → PR → CI in a disposable worktree. "My own stats show that 68% of the changes I pushed through the no-mistakes tool had bugs in them."
- Delegation advice worth saying out loud: ask for an outcome instead of an action, and explain the why.
- Steals: firstmate as captain over heat.md pieces; secondmates on SSH hosts for an always-on crew (herdr-mirror is a separate community project for mirroring remote herdr servers); backpass — "The project AGENTS.md is the weights." (Aug 23) — trained from transcripts with a human gate; AXI — 10 principles treating token budget as a first-class constraint.
-->

---

<div class="radar-slide">
  <div class="eyebrow">radar</div>

  <h1>What else is moving</h1>

  <div class="radar-grid">
    <div>
      <div class="radar-cat">overnight loops</div>
      <div class="radar-item"><b>gnhf</b><span>runs while you sleep</span></div>
      <div class="radar-item"><b>Ralph</b><span>a prompt in a loop</span></div>
    </div>
    <div>
      <div class="radar-cat">fleet managers</div>
      <div class="radar-item"><b>Gas Town</b><span>multi-agent workspace</span></div>
      <div class="radar-item"><b>oh-my-claudecode</b><span>Claude Code orchestration</span></div>
    </div>
    <div>
      <div class="radar-cat">self-improving memory</div>
      <div class="radar-item"><b>Compound Engineering</b><span>captures what you learned</span></div>
    </div>
    <div>
      <div class="radar-cat">cross-harness portability</div>
      <div class="radar-item"><b>agent distros</b><span>e.g. firstmate</span></div>
      <div class="radar-item"><b>AGENTS.md</b><span>a README for agents</span></div>
    </div>
    <div class="radar-wide">
      <div class="radar-cat">deterministic quality gates <em>— the same idea as bet 2, showing up everywhere</em></div>
      <div class="radar-row">
        <div class="radar-item"><b>swarm-forge</b><span>CRAP · DRY · mutation</span></div>
        <div class="radar-item"><b>no-mistakes</b><span>gated git push</span></div>
      </div>
    </div>
  </div>
</div>

<style>
.radar-slide { height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
.radar-slide h1 { margin: 0 0 1.4rem; }
.radar-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); column-gap: 2.4rem; row-gap: 1.3rem; }
.radar-wide { grid-column: 1 / -1; }
.radar-row { display: flex; gap: 3rem; }
.radar-cat { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--sw-accent); margin-bottom: 0.45rem; }
.radar-cat em { font-style: normal; letter-spacing: 0; text-transform: none; color: var(--sw-ink-dim); }
.radar-item { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 0.6rem; margin-bottom: 0.3rem; }
.radar-item b { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 1.15rem; white-space: nowrap; }
.radar-item span { font-family: 'IBM Plex Mono', monospace; font-size: 0.82rem; color: var(--sw-ink-dim); white-space: nowrap; }
</style>

<!--
- Fast slide — five categories, don't dwell, this is "here's the rest of the map" not a deep dive.
- Descriptors come from each project's own README/site: gnhf "keeps your agents running while you sleep"; Ralph is `while :; do cat PROMPT.md | claude-code ; done`; Gas Town "multi-agent workspace manager"; oh-my-claudecode "multi-agent orchestration for Claude Code"; Compound Engineering "capture what you learned" so the next change can read it; AGENTS.md "a README for agents".
- Agent distros is Kun Chen's term for firstmate (bet 3).
- Deterministic quality gates ties straight back to the Uncle Bob bet — swarm-forge's gates, and Kun Chen's no-mistakes gating every push — say that connection out loud.
- If someone asks about any one of these, it's fine to go deeper in Q&A — that's what this slide is for.
-->

---
layout: center
---

<div class="eyebrow">questions?</div>

# @gmadorell

<p class="mono" style="font-size: 0.95rem;">X · GitHub</p>

<div class="rule"></div>

<p class="mono" style="font-size: 0.95rem;">github.com/GMadorell/heist</p>

<!--
[TIMER 0:19 — CLOSE]
- Leave this slide up for the whole Q&A — handles and repo link should stay visible.
- If nobody asks anything for a beat, prompt with: "happy to go deeper on any one lesson."
- Thank the room, stop talking, let the silence do its job.
-->
