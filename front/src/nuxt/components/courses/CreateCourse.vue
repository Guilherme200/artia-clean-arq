<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Novo curso</h3>
      <div class="px-2">
        <FormData @submit="onSubmit" @isValid="(isValid) => isValidForm = isValid" enctype="multipart/form-data">
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
import dayjs from 'dayjs';
import FormData from '~/components/shared/form/FormData.vue';
import ButtonForm from "~/components/shared/form/ButtonForm.vue";
import FormCourse from '~/components/courses/partials/FormCourse.vue';
import {CourseService} from "core/src/domain/course/CourseService";
import {useNotify} from '../../composables/helpers';

const errors = ref([])
const isValidForm = ref(null)
const emit = defineEmits(['close'])
defineProps({itemId: {type: String, required: false}})

const form = ref({
  video: null,
  title: null,
  description: null,
  expiredAt: dayjs().format('YYYY-MM-DD')
})

async function onSubmit(submit: any) {
  const headers = {'Content-Type': 'multipart/form-data'};
  const response = await new CourseService().create(submit, {headers})
  if (response.item) {
    emit('close');
    useNotify('success', 'Curso cadastrado com sucesso!')
  }

  if (response.status === 422) {
    errors.value = response.errors
    useNotify('error', 'Por favor, preencha o formulário corretamente.')
  }

  if (response.status === 500) {
    useNotify('error', 'Houve um erro ao criar um novo curso. Por favor, tente novamente mais tarde.')
  }
}
</script>