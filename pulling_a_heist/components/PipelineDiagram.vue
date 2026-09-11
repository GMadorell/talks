<script setup>
import { computed } from 'vue'

const props = defineProps({
  // space/comma-separated node ids to highlight; empty = whole pipeline, nothing dimmed
  current: { type: String, default: '' },
})

const active = computed(() => new Set(props.current.split(/[\s,]+/).filter(Boolean)))

// Fixed 216×426px box. SVG draws only arrows (1 viewBox unit = 1px); nodes and
// labels are HTML on top. SVG <text> is avoided on purpose: under Slidev's
// slide scaling Chrome kept painting stale text positions after navigation.
// Geometry: rows every 62px, nodes 38px tall, spine arrows at x=60.
const nodes = [
  { id: 'mastermind', name: 'Mastermind', tag: 'opus', x: 26, y: 0, w: 150 },
  { id: 'fence', name: 'Fence', tag: 'sonnet', x: 26, y: 62, w: 150 },
  { id: 'crit', name: 'You, in crit', tag: 'human gate', x: 26, y: 124, w: 150, human: true },
  { id: 'forger', name: 'Forger', tag: 'sonnet', x: 26, y: 186, w: 150 },
  { id: 'wheelman', name: 'Wheelman', tag: 'sonnet', x: 26, y: 248, w: 90 },
  { id: 'muscle', name: 'Muscle', tag: 'haiku ×N', x: 136, y: 248, w: 74, stack: true },
  { id: 'cleaner', name: 'Cleaner', tag: 'sonnet', x: 26, y: 310, w: 150 },
  { id: 'pr', name: 'PR', tag: '', x: 26, y: 372, w: 64, terminal: true },
]

// straight spine arrows between consecutive rows: [from (node bottom), to (next node top), label]
const spine = [
  [38, 62, 'blueprint.md'],
  [100, 124, ''],
  [162, 186, ''],
  [224, 248, 'score.md'],
  [286, 310, ''],
  [348, 372, ''],
]

const box = n => ({ left: `${n.x}px`, top: `${n.y}px`, width: `${n.w}px` })
</script>

<template>
  <div
    class="pipeline"
    :class="{ focused: active.size > 0 }"
    role="img"
    aria-label="heist pipeline: Mastermind, Fence, you in crit, Forger, Wheelman and Muscle, Cleaner, PR"
  >
    <svg class="edges" viewBox="0 0 216 426" width="216" height="426" aria-hidden="true">
      <g v-for="([from, to], i) in spine" :key="i">
        <line x1="60" :y1="from" x2="60" :y2="to - 5" />
        <polygon :points="`56,${to - 6} 64,${to - 6} 60,${to}`" />
      </g>

      <!-- Wheelman ⇄ Muscle -->
      <line x1="116" y1="262" x2="131" y2="262" />
      <polygon points="130,258.5 130,265.5 136,262" />
      <line x1="121" y1="274" x2="136" y2="274" />
      <polygon points="122,270.5 122,277.5 116,274" />

      <!-- revise loops: Fence → Mastermind, crit → Mastermind -->
      <polyline points="176,81 192,81 192,26 182,26" />
      <polygon points="182,22.5 182,29.5 176,26" />
      <polyline points="176,143 206,143 206,12 182,12" />
      <polygon points="182,8.5 182,15.5 176,12" />

      <!-- failures loop: Cleaner → Wheelman -->
      <polyline points="26,329 12,329 12,267 20,267" />
      <polygon points="20,263.5 20,270.5 26,267" />
    </svg>

    <template v-for="([from, to, label], i) in spine" :key="`l${i}`">
      <div v-if="label" class="edge-label" :style="{ top: `${(from + to) / 2 - 6}px` }">{{ label }}</div>
    </template>

    <template v-for="n in nodes" :key="n.id">
      <template v-if="n.stack">
        <div class="card back" :class="{ on: active.has(n.id) }" :style="{ ...box(n), transform: 'translate(6px, -6px)' }" />
        <div class="card back" :class="{ on: active.has(n.id) }" :style="{ ...box(n), transform: 'translate(3px, -3px)' }" />
      </template>
      <div
        class="card node"
        :class="{ on: active.has(n.id), human: n.human, terminal: n.terminal }"
        :style="box(n)"
      >
        <div class="name">{{ n.name }}</div>
        <div v-if="n.tag" class="tag">{{ n.tag }}</div>
        <div v-if="n.human" class="mark" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.pipeline {
  position: relative;
  flex: none;
  width: 216px;
  height: 426px;
}

.edges { position: absolute; inset: 0; overflow: visible; }
.edges line,
.edges polyline {
  fill: none;
  stroke: var(--sw-ink-dim);
  stroke-width: 1.2;
}
.edges polygon { fill: var(--sw-ink-dim); }
.edge-label {
  position: absolute;
  left: 68px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8px;
  line-height: 12px;
  color: var(--sw-ink-dim);
}

.card {
  position: absolute;
  box-sizing: border-box;
  height: 38px;
  background: var(--sw-bg);
  border: 1.5px solid var(--sw-ink);
}
.node {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  padding-left: 8px;
}
.name {
  font-family: 'Archivo', sans-serif;
  font-weight: 900;
  font-size: 13px;
  line-height: 1;
  color: var(--sw-ink);
  white-space: nowrap;
}
.tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 7.5px;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sw-ink-dim);
  white-space: nowrap;
}

.node.human .tag { color: var(--sw-accent); font-weight: 600; }
/* crop-mark corner, same motif as the slide corners */
.mark {
  position: absolute;
  top: -3.5px;
  left: -3.5px;
  width: 10px;
  height: 10px;
  border-left: 2px solid var(--sw-accent);
  border-top: 2px solid var(--sw-accent);
}

.node.terminal { background: var(--sw-ink); }
.node.terminal .name { color: var(--sw-bg); }

/* focus mode: the current step(s) go solid accent, everything else recedes.
   Nodes recede via lighter colors, not opacity, so Muscle's stacked back
   cards don't show through a translucent front card. */
.focused .edges,
.focused .edge-label { opacity: 0.35; }
.focused .card:not(.on) { border-color: #bdbab3; }
.focused .node:not(.on) .name,
.focused .node:not(.on) .tag { color: #aeaba5; }
.focused .node.human:not(.on) .tag { color: #e6a3a3; }
.focused .node:not(.on) .mark { border-color: #e6a3a3; }
.focused .node.terminal:not(.on) { background: #bdbab3; }
.focused .node.terminal:not(.on) .name { color: var(--sw-bg); }
.node.on { background: var(--sw-accent); border-color: var(--sw-accent); }
.card.back.on { border-color: var(--sw-accent); }
.node.on .name,
.node.on .tag { color: #fff; }
.node.on .mark { border-color: var(--sw-ink); }
</style>
