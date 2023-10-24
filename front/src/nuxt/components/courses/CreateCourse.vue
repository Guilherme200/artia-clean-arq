<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Novo curso</h3>
      <div class="px-2">
        <FormData @submit="onSubmit" @isValid="(isValid) => isValidForm = isValid">
          <FormCourse v-model="form" :errors="errors" />
          <div class="flex justify-between mt-5">
            <button type="button" class="btn bg-base-100" @click="emit('close')">Cancelar</button>
            <ButtonForm type="submit" label="Salvar" :loading="false" :disabled="!isValidForm" />
          </div>
        </FormData>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormData from '~/components/shared/form/FormData.vue';
import ButtonForm from "~/components/shared/form/ButtonForm.vue";
import FormCourse from '~/components/courses/partials/FormCourse.vue';
import {CourseService} from "core/src/domain/course/CourseService";

const errors = ref([])
const isValidForm = ref(null)
const emit = defineEmits(['close'])
defineProps({itemId: {type: String, required: false}})

const form = ref({
  video: null,
  title: null,
  description: null,
  expiredAt: (new Date()).toString()
})

async function onSubmit(submit: any) {
  new FormData()
  const response = await new CourseService().create(submit)
  if (response.status === 422) {
    errors.value = response.errors
  }
}
</script>