<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, required: true }, // [{ name, stars, note?, highlight? }]
  source: { type: String, required: true }, // footer caption: where + when the numbers come from
})

// sorted desc, bar length linear from zero so lengths compare honestly
const rows = computed(() => {
  const max = Math.max(...props.items.map(i => i.stars))
  return [...props.items]
    .sort((a, b) => b.stars - a.stars)
    .map(i => ({ ...i, pct: (i.stars / max) * 100 }))
})

const fmt = n => `${(n / 1000).toFixed(1)}k`
</script>

<template>
  <figure class="stars">
    <div class="rows">
      <div v-for="r in rows" :key="r.name" class="row" :class="{ hl: r.highlight }">
        <div class="who">
          <span class="name">{{ r.name }}</span>
          <span v-if="r.note" class="note">{{ r.note }}</span>
        </div>
        <div class="track"><div class="bar" :style="{ width: `${r.pct}%` }" /></div>
        <div class="val">{{ fmt(r.stars) }}</div>
      </div>
    </div>
    <figcaption>{{ source }}</figcaption>
  </figure>
</template>

<style scoped>
.stars {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.rows {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.row {
  display: grid;
  grid-template-columns: 15rem 1fr 4.5rem;
  align-items: center;
  column-gap: 1rem;
}
.who {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}
.name {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--sw-ink);
  white-space: nowrap;
}
.note {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sw-ink-dim);
  border: 1px solid currentColor;
  padding: 0 0.3rem;
}
/* recessive baseline; bars are anchored to it */
.track {
  height: 100%;
  display: flex;
  align-items: center;
  border-left: 1.5px solid var(--sw-ink);
}
.bar {
  height: 18px;
  background: var(--sw-ink);
  border-radius: 0 4px 4px 0;
}
.row.hl .bar { background: var(--sw-accent); }
.val {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
  text-align: right;
  color: var(--sw-ink);
}
figcaption {
  margin-top: 0.9rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: var(--sw-ink-dim);
  text-align: right;
}
</style>
