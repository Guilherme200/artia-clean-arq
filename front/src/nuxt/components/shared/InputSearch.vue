<template>
  <div class="form-control relative">
    <Icon name="material-symbols:search" color="black" class="absolute text-lg text-gray-400 top-4 left-4" />
    <input
      v-model="mutableValue"
      type="text"
      placeholder="Buscar..."
      class="input input-bordered w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
      name="search" />
  </div>
</template>

<script setup lang="ts">

const query = 'query'
const mutableValue = ref('');

watch(mutableValue, (value: any) => setTimeout(() => setQueryParam(query, value), 500));

onMounted(() => {
  const param = getQueryParam(query)
  if (param && typeof param !== 'undefined') {
    mutableValue.value = getQueryParam(query)
  }
})
</script>