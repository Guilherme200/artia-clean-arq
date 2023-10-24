<template>
  <div class="w-full flex items-center px-5 py-6 bg-base-100 rounded-md shadow-sm">
    <div class="p-3 bg-opacity-75 rounded-full" :class="classStatus">
      <Icon v-if="icon" :name="icon" color="white" class="text-3xl" />
    </div>

    <div class="mx-5">
      <h4 class="text-2xl font-semibold">{{ value }}</h4>
      <div class="font-light">{{ label }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  icon: String,
  label: String,
  value: String,
  status: String
})

const classStatus = computed(() => {
  switch (props.status) {
    case 'info':
      return 'bg-indigo-600'
    case 'success':
      return 'bg-green-600'
    case 'error':
      return 'bg-red-600'
    default:
      return 'bg-primary'
  }
})
</script>