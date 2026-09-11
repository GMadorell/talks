<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  w: { type: Number, required: true }, // source pixel size, for the aspect ratio
  h: { type: Number, required: true },
})
</script>

<template>
  <div class="shot-box" :style="{ '--r': w / h }">
    <img :src="src" :alt="alt" />
  </div>
</template>

<style scoped>
/* Screenshot that never crops: the box takes whatever space its flex parent
   leaves (flex: 1 1 0), becomes a size container, and the image picks the
   largest width that fits both axes at the source aspect ratio. The border
   hugs the image itself, not the leftover letterbox.
   max-height caps the box at the image's full-width height (cqw = the
   nearest ancestor container's width), so a wide screenshot doesn't hoard
   empty space and the parent column can still center its content. */
.shot-box {
  flex: 1 1 0;
  min-height: 0;
  max-height: calc(100cqw / var(--r));
  min-width: 0;
  container-type: size;
  display: flex;
  align-items: center;
}
.shot-box img {
  display: block;
  box-sizing: border-box;
  aspect-ratio: var(--r);
  width: min(100cqw, 100cqh * var(--r));
  height: auto;
  object-fit: contain;
  border: 1.5px solid var(--sw-ink);
}
</style>
