<script setup>
defineProps({
  waves: { type: Array, required: true }, // array of step-counts per wave, in order
  // [waveIndex, stepIndex], 0-based: the one step to call out (e.g. the step shown zoomed on the slide)
  highlight: { type: Array, default: null },
})
</script>

<template>
  <div class="wave-graph">
    <div v-for="(count, i) in waves" :key="i" class="wave-col">
      <div class="wave-steps">
        <div
          v-for="n in count"
          :key="n"
          class="step-block"
          :class="{ on: highlight && highlight[0] === i && highlight[1] === n - 1 }"
        ></div>
      </div>
      <div class="wave-label mono">W{{ i + 1 }}</div>
      <div class="wave-arrow" v-if="i < waves.length - 1">→</div>
    </div>
  </div>
</template>

<style scoped>
.wave-graph {
  display: flex;
  align-items: flex-end;
  /* wide enough for the arrow to sit between columns, not on the blocks */
  gap: 1.3rem;
}
.wave-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  position: relative;
}
/* column-reverse: a wave's first step sits at the bottom */
.wave-steps {
  display: flex;
  flex-direction: column-reverse;
  gap: 3px;
}
.step-block {
  width: 26px;
  height: 11px;
  background: var(--sw-ink);
}
.step-block.on {
  background: var(--sw-accent);
}
.wave-label {
  font-size: 0.62rem;
  color: var(--sw-ink-dim);
}
.wave-arrow {
  position: absolute;
  left: 100%;
  width: 1.3rem;
  text-align: center;
  bottom: 1.1rem;
  color: var(--sw-ink-dim);
  font-size: 0.75rem;
}
</style>
