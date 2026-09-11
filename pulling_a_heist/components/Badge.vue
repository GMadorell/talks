<script setup>
defineProps({
  label: { type: String, required: true },
  logo: { type: String, default: '' },
})
</script>

<template>
  <span class="logo-chip">
    <img v-if="logo" :src="logo" :alt="label" />
    <span v-else class="badge-text">{{ label }}</span>
    <span v-if="logo">{{ label }}</span>
  </span>
</template>

<style scoped>
.badge-text {
  border: 1.5px solid var(--sw-ink);
  padding: 0.25rem 0.55rem;
  font-weight: 600;
}
</style>
