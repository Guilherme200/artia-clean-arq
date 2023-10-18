<template>
  <div class="w-full">
    <label v-if="label" class="label-text my-2 mx-1">
      {{ label }}
      <span class="text-error" v-if="required">*</span>
    </label>
    <input
      v-model="value"
      v-bind="{...$attrs}"
      :class="{'input-error': error}"
      class="input input-bordered w-full"
    />
    <span class="label-text-alt text-error mt-2 mx-1">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import {useField} from "vee-validate";

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  modelValue: {
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  error: String | null,
  rules: String | Object,
})

const error = ref(null)
const {value, errorMessage} = useField(() => props.name, props.rules, {
  syncVModel: true,
});

watch(errorMessage, (payload) => error.value = payload)
watch(() => props.error, (payload) => error.value = payload)
</script>