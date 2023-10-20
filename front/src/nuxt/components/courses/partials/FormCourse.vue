<template>
  <div class="w-full grid gap-4">
    <InputForm
      label="Título"
      type="text"
      name="title"
      v-model="modelValue.title"
      required
      :error="_get(errors, 'title')"
      placeholder="Insira um título email"
      rules="required|min:5|max:255" />

    <TextareaForm
      label="Descrição"
      name="description"
      v-model="modelValue.description"
      required
      rows="3"
      :error="_get(errors, 'description')"
      placeholder="Insira uma descrição"
      rules="required|min:5|max:255" />

    <InputForm
      label="Data de expiração"
      type="date"
      name="expiredAt"
      v-model="modelValue.expiredAt"
      required
      :error="_get(errors, 'expiredAt')"
      rules="required" />

    <UploadForm
      label="Vídeo"
      name="video"
      v-model="modelValue.video"
      required
      accept=".mp4,.mov"
      :error="_get(errors, 'video')"
      rules="required" />
  </div>
</template>
<script setup lang="ts">
import InputForm from '~/components/shared/form/InputForm.vue';
import UploadForm from '~/components/shared/form/UploadForm.vue';
import TextareaForm from '~/components/shared/form/TextareaForm.vue';

defineProps(['modelValue', 'errors'])
</script>