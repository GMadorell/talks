<script setup>
import PipelineDiagram from '../components/PipelineDiagram.vue'

defineProps({
  // frontmatter `step:` — node id(s) to highlight, e.g. "fence crit"; omit for the full pipeline
  step: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout pipeline-layout">
    <aside class="pipeline-rail">
      <PipelineDiagram :current="step" />
    </aside>
    <div class="pipeline-body">
      <slot />
    </div>
  </div>
</template>

<style>
/* Unscoped on purpose: slot content (the slide's markdown) doesn't carry this
   layout's scope id. Everything is prefixed with .pipeline-layout.
   The rail has a fixed width so the diagram's size never depends on
   intrinsic-sizing guesses; the body column owns all remaining space and is a
   definite-height flex column, so <Shot> can flex into what's left. */
.slidev-layout.pipeline-layout {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  gap: 2.4rem;
}
.pipeline-layout .pipeline-rail {
  flex: 0 0 216px;
  display: flex;
  align-items: center;
}
.pipeline-layout .pipeline-body {
  /* size container: <Shot> caps its height against this column's width */
  container-type: inline-size;
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.slidev-layout.pipeline-layout h1 {
  font-size: 2.4rem;
  margin: 0 0 0.8rem;
}
.pipeline-layout .pipeline-body > p { margin: 0 0 0.9rem; }
.pipeline-layout .pipeline-body > .stat-line { align-self: flex-start; }
</style>
