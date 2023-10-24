<template>
  <div class="w-full">
    <label v-if="label" class="label-text my-2 mx-1">
      {{ label }}
      <span class="text-error" v-if="required">*</span>
    </label>
    <div class="flex justify-center items-center w-full">
      <label for="dropzone-file" class="dropzone hover:bg-gray-100" :class="{'!border-red-300' : error}">
        <div class="flex flex-col justify-center items-center pt-5 pb-6">
          <Icon name="mdi:cloud-upload" class="text-5xl text-gray-500" />
          <div class="mb-2 text-sm text-gray-500 dark:text-gray-400 block">
            <div class="font-semibold text-center">Clique para fazer upload</div>
            <div class="text-center">ou arraste e solte</div>
          </div>
          <div class="block mt-5">
            <p class="text-xs text-center text-gray-500 dark:text-gray-400">MP4 ou MOV (MAX. 500 MB)</p>
            <p class="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">Arquivo: {{ fileName }}</p>
          </div>
        </div>
        <input v-bind="{...$attrs}" id="dropzone-file" type="file" class="hidden" @change="uploadFile">
      </label>
    </div>
    <span class="label-text-alt text-error mt-2 mx-1">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import {useField, validate} from "vee-validate";

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

const file = ref(null);
const error = ref(null)
const {value, errorMessage} = useField(() => props.name, props.rules, {
  syncVModel: true,
});

watch(errorMessage, (payload) => error.value = payload)
watch(() => props.error, (payload) => error.value = payload)

const fileName = computed(() => file.value?.name);

const uploadFile = (event: any) => {
  file.value = event?.target?.files[0];
  emit('update:modelValue', file.value)
}
</script>

<style scoped>
.dropzone {
  @apply flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer
}
</style>