<template>
  <select v-model="mutableValue" class="select select-bordered w-full rounded-lg">
    <option v-for="item in items" :key="item.key" :value="item.key">
      {{ item.value }}
    </option>
  </select>
</template>

<script setup lang="ts">
import {getQueryParam, setQueryParam} from '~/composables/route-helpers';

const props = defineProps({
  selected: {
    type: String,
    required: false,
  },
  filter: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})

const query = `filter[${props.filter}]`
const mutableValue = ref(props.selected);

watch(mutableValue, (value) => setQueryParam(query, value));

onMounted(() => {
  const param = getQueryParam(query)
  if (!param || typeof param === 'undefined') {
    mutableValue.value = props.selected
    setQueryParam(query, props.selected)
  } else {
    mutableValue.value = param
  }
})
</script>