<template>
  <button
    v-bind="$attrs"
    class="btn bg-base-300">
    <span v-if="loading" class="loading loading-spinner"></span>
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: String,
  loading: {
    type: Boolean,
    default: true
  }
});
</script>