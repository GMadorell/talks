<script setup>
defineProps({
  lesson: { type: [Number, String], required: true }, // frontmatter `lesson:` → eyebrow "lesson N"
  principle: { type: String, required: true }, // frontmatter `principle:` → pinned footer
})
</script>

<template>
  <div class="slidev-layout lesson-layout">
    <div class="eyebrow">lesson {{ lesson }}</div>
    <div class="lesson-body">
      <slot />
    </div>
    <div class="lesson-principle">{{ principle }}</div>
  </div>
</template>

<style>
/* Unscoped on purpose: slot content (the slide's markdown) doesn't carry this
   layout's scope id. Everything is prefixed with .lesson-layout.
   Column: eyebrow, body (takes all free height, content centered), principle
   pinned to the bottom so every lesson lands its takeaway in the same spot. */
.slidev-layout.lesson-layout {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-block: 2.6rem 2.4rem;
}
.lesson-layout .eyebrow { margin-bottom: 0.5rem; }
.slidev-layout.lesson-layout h1 { margin: 0 0 1.4rem; }
.lesson-layout .lesson-body {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.lesson-layout .lesson-principle {
  margin-top: 1.2rem;
  border-top: 2px solid var(--sw-ink);
  padding-top: 0.9rem;
  font-family: 'Archivo', sans-serif;
  font-weight: 900;
  font-size: 2.1rem;
  line-height: 1.05;
  color: var(--sw-accent);
}

/* shared building blocks for lesson bodies */
.lesson-layout .label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sw-ink-dim);
  margin-bottom: 0.6rem;
}
.lesson-layout .box {
  box-sizing: border-box;
  border: 2px solid var(--sw-ink);
  padding: 1rem 1.2rem;
}
.lesson-layout .box.on {
  background: var(--sw-accent);
  border-color: var(--sw-accent);
  color: #fff;
}
.lesson-layout .box.on .label { color: rgba(255, 255, 255, 0.8); }
.lesson-layout .arrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.6rem;
  color: var(--sw-ink-dim);
  display: flex;
  align-items: center;
  justify-content: center;
}
.lesson-layout .big {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 1.35rem;
  line-height: 1.2;
  color: inherit;
}
</style>
