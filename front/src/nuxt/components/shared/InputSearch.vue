<template>
  <div class="form-control relative">
    <Icon name="material-symbols:search" class="absolute text-lg top-4 left-4" />
    <input
      v-model="mutableValue"
      type="text"
      placeholder="Buscar..."
      class="input input-bordered w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
      name="search" />
  </div>
</template>

<script setup lang="ts">

const mutableValue = ref('');

const query = 'query'
watch(() => mutableValue.value, _debounce((value) => setQueryParam(query, value), 300))

onMounted(() => {
  const param = getQueryParam(query)
  if (param && typeof param !== 'undefined') {
    mutableValue.value = getQueryParam(query)
  }
})
</script>