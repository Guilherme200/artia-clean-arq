<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Editar curso</h3>
      <div class="px-2">
        <form @submit.prevent="submit()">
          <FormCourse v-model="form" />
          <div class="flex justify-between mt-5">
            <button type="button" class="btn bg-base-100" @click="emit('close')">Cancelar</button>
            <button type="submit" class="btn bg-base-300">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormCourse from '~/components/courses/partials/FormCourse.vue';

const emit = defineEmits(['close'])
defineProps({itemId: {type: String, required: true}})

const form = ref({
  video: null,
  title: null,
  description: null,
})

function submit() {
  console.log(form.value)
  emit('close')
}
</script>