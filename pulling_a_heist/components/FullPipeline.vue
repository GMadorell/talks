<script setup>
// Full heist flow as it is today (source: heist README pipeline diagram;
// Muscle parallelism from plugin/agents/wheelman.md). Fixed 850×350px canvas:
// SVG draws only connectors (1 unit = 1px), nodes and labels are HTML on top
// (SVG <text> painted stale positions under Slidev's scaling).
//
// Layout: planning row on top (y=100, h=56), execution row below (y=214, h=64).
// Revise loops and the split branch run above the planning row; "approved"
// drops through the middle lane; the failures loop runs under the execution row.

const R = (x, y) => `${x - 6},${y - 3.5} ${x - 6},${y + 3.5} ${x},${y}` // head pointing right, tip at (x,y)
const L = (x, y) => `${x + 6},${y - 3.5} ${x + 6},${y + 3.5} ${x},${y}`
const D = (x, y) => `${x - 3.5},${y - 6} ${x + 3.5},${y - 6} ${x},${y}`
const U = (x, y) => `${x - 3.5},${y + 6} ${x + 3.5},${y + 6} ${x},${y}`

const lines = [
  // planning row, center y=128
  '120,128 145,128', '300,128 325,128', '470,128 505,128', '640,128 675,128',
  // approved: crit → Forger
  '755,156 755,185 60,185 60,209',
  // execution row, center y=246
  '120,246 155,246', '420,246 455,246', '700,246 735,246',
  // failures: Cleaner → Wheelman
  '580,278 580,304 290,304 290,283',
  // revise loops into Mastermind
  '575,100 575,80 450,80 450,95',
  '755,100 755,66 425,66 425,95',
  // split: Mastermind → split node → back to /heist
  '360,100 360,36 325,36',
  '196,36 60,36 60,95',
]
const heads = [
  R(150, 128), R(330, 128), R(510, 128), R(680, 128),
  D(60, 214),
  R(160, 246), R(460, 246), R(740, 246),
  U(290, 278),
  D(450, 100), D(425, 100),
  L(320, 36), D(60, 100),
]
</script>

<template>
  <div
    class="full-pipeline"
    role="img"
    aria-label="Full heist flow: /heist, casing if no validation.md, Mastermind (may split into heat.md), Fence and crit with revise loops, Forger, Wheelman with Muscle workers, Cleaner with failures loop, PR"
  >
    <svg class="edges" viewBox="0 0 850 350" width="850" height="350" aria-hidden="true">
      <polyline v-for="(p, i) in lines" :key="`l${i}`" :points="p" />
      <polygon v-for="(p, i) in heads" :key="`h${i}`" :points="p" />
    </svg>

    <!-- split branch -->
    <div class="n opt" style="left: 196px; top: 14px; width: 124px; height: 44px;">
      <div class="name">Split</div>
      <div class="tag">too big → heat.md</div>
    </div>
    <div class="lbl" style="left: 66px; top: 42px;">one heist per piece</div>

    <!-- planning row -->
    <div class="n" style="left: 0; top: 100px; width: 120px; height: 56px;">
      <div class="name mono-name">/heist &lt;slug&gt;</div>
      <div class="tag">start</div>
    </div>
    <div class="n opt" style="left: 150px; top: 100px; width: 150px; height: 56px;">
      <div class="name mono-name">/heist:casing</div>
      <div class="tag">only if no validation.md</div>
    </div>
    <div class="n" style="left: 330px; top: 100px; width: 140px; height: 56px;">
      <div class="name">Mastermind</div>
      <div class="tag">opus · blueprint.md</div>
    </div>
    <div class="n" style="left: 510px; top: 100px; width: 130px; height: 56px;">
      <div class="name">Fence</div>
      <div class="tag">sonnet</div>
    </div>
    <div class="n human" style="left: 680px; top: 100px; width: 150px; height: 56px;">
      <div class="name">You, in crit</div>
      <div class="tag">human gate</div>
      <div class="mark" />
    </div>
    <div class="lbl" style="left: 488px; top: 69px;">revise</div>
    <div class="lbl" style="left: 586px; top: 55px;">changes</div>
    <div class="lbl" style="left: 380px; top: 179px;">approved</div>

    <!-- execution row -->
    <div class="n" style="left: 0; top: 214px; width: 120px; height: 64px;">
      <div class="name">Forger</div>
      <div class="tag">sonnet · score.md</div>
    </div>
    <div class="n crew" style="left: 160px; top: 214px; width: 260px; height: 64px;">
      <div>
        <div class="name">Wheelman</div>
        <div class="tag">sonnet · worktree</div>
      </div>
      <div class="swap">⇄</div>
      <div class="muscle">
        <div class="name">Muscle ×N</div>
        <div class="tag">haiku · ≤8 per wave</div>
      </div>
    </div>
    <div class="n" style="left: 460px; top: 214px; width: 240px; height: 64px;">
      <div class="name">Cleaner</div>
      <div class="tag">sonnet</div>
      <div class="steps">sync · review crew · triage<br>build / lint / test · docs · push</div>
    </div>
    <div class="n term" style="left: 740px; top: 214px; width: 110px; height: 64px;">
      <div class="name">PR</div>
      <div class="tag">risk label</div>
      <div class="tag">+ report</div>
    </div>
    <div class="lbl" style="left: 408px; top: 298px;">failures</div>

    <div class="note">heavy mode shown · medium skips Fence · light: you implement</div>
  </div>
</template>

<style scoped>
.full-pipeline {
  position: relative;
  flex: none;
  width: 850px;
  height: 350px;
}
.edges { position: absolute; inset: 0; overflow: visible; }
.edges polyline { fill: none; stroke: var(--sw-ink-dim); stroke-width: 1.4; }
.edges polygon { fill: var(--sw-ink-dim); }

.n {
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  padding: 0 10px;
  background: var(--sw-bg);
  border: 2px solid var(--sw-ink);
}
.n.opt { border-style: dashed; border-color: var(--sw-ink-dim); }
.name {
  font-family: 'Archivo', sans-serif;
  font-weight: 900;
  font-size: 15px;
  line-height: 1;
  color: var(--sw-ink);
  white-space: nowrap;
}
.name.mono-name { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 13px; }
.tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8px;
  line-height: 1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sw-ink-dim);
  white-space: nowrap;
}
.steps {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8.5px;
  line-height: 1.3;
  color: var(--sw-ink);
  margin-top: 2px;
}

.n.human .tag { color: var(--sw-accent); font-weight: 600; }
/* crop-mark corner, same motif as the slide corners */
.mark {
  position: absolute;
  top: -4px;
  left: -4px;
  width: 11px;
  height: 11px;
  border-left: 2px solid var(--sw-accent);
  border-top: 2px solid var(--sw-accent);
}

.n.crew { flex-direction: row; align-items: center; justify-content: space-between; }
.swap { font-size: 16px; color: var(--sw-ink-dim); }
/* stacked-cards look for "×N" workers, drawn with offset shadows */
.muscle {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 7px 8px;
  border: 1.5px solid var(--sw-ink);
  background: var(--sw-bg);
  box-shadow:
    3px -3px 0 -1.5px var(--sw-bg), 3px -3px 0 0 var(--sw-ink),
    6px -6px 0 -1.5px var(--sw-bg), 6px -6px 0 0 var(--sw-ink);
}

.n.term { background: var(--sw-ink); }
.n.term .name { color: var(--sw-bg); }
.n.term .tag { color: #b9b6b0; }

.lbl {
  position: absolute;
  padding: 0 4px;
  background: var(--sw-bg);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  line-height: 12px;
  color: var(--sw-ink-dim);
  white-space: nowrap;
}
.note {
  position: absolute;
  left: 0;
  right: 0;
  top: 328px;
  text-align: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  color: var(--sw-ink-dim);
}
</style>
