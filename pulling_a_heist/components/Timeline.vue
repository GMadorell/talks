<script setup>
defineProps({
  points: { type: Array, required: true }, // [{date, label}]
})
</script>

<template>
  <div class="timeline">
    <div class="track"></div>
    <div v-for="(p, i) in points" :key="i" class="tl-point">
      <div class="tl-dot" :class="{ accent: i === 0 || i === points.length - 1 }"></div>
      <div class="tl-date mono">{{ p.date }}</div>
      <div class="tl-label">{{ p.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: 1.2rem;
}
.track {
  position: absolute;
  top: 1.55rem;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--sw-ink);
}
.tl-point {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 12rem;
  text-align: center;
  z-index: 1;
}
.tl-dot {
  width: 12px;
  height: 12px;
  background: var(--sw-ink);
  margin-bottom: 0.6rem;
}
.tl-dot.accent { background: var(--sw-accent); }
.tl-date {
  font-size: 0.68rem;
  color: var(--sw-accent);
  margin-bottom: 0.2rem;
}
.tl-label {
  font-size: 0.78rem;
  color: var(--sw-ink-dim);
}
</style>
