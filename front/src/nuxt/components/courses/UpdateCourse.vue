<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Editar curso</h3>
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
import FormCourse from '~/components/courses/partials/FormCourse.vue';
import {CourseService} from 'core/src/domain/course/CourseService';
import {useNotify} from '../../composables/helpers';
import FormData from '~/components/shared/form/FormData.vue';
import ButtonForm from "~/components/shared/form/ButtonForm.vue";

const errors = ref([])
const isValidForm = ref(null)
const emit = defineEmits(['close'])
const props = defineProps({itemId: {type: String, required: true}})

const form = ref({
  video: null,
  title: null,
  description: null,
  expiredAt: dayjs().format('YYYY-MM-DD')
})

async function getCourse() {
  return await new CourseService().get(props.itemId)
}

const {data} = useAsyncData(await getCourse)

watch(() => data.value, (payload) => {
  form.value = {
    title: _get(payload, 'item.title'),
    description: _get(payload, 'item.description'),
    video: _get(payload, 'item.video'),
    expiredAt: formatDate(_get(payload, 'item.expiredAt', dayjs()))
  }
})

function formatDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD');
}

async function onSubmit(submit: any) {
  const headers = {'Content-Type': 'multipart/form-data'};
  const response = await new CourseService().update(props.itemId, submit, {headers})
  if (response.item) {
    emit('close');
    useNotify('success', 'Curso editado com sucesso!')
  }

  if (response.status === 422) {
    errors.value = response.errors
    useNotify('error', 'Por favor, preencha o formulário corretamente.')
  }

  if (response.status === 500) {
    useNotify('error', 'Houve um erro editar o curso. Por favor, tente novamente mais tarde.')
  }
}
</script>