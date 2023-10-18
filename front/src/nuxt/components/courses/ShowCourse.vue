<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Visualizar curso</h3>
      <div class="card border-none mt-5">
        <figure>
          <img
            src="https://s24534.pcdn.co/carreira-sucesso/wp-content/uploads/sites/3/2022/07/qualificacao-cursos-online.jpg"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ item?.title }}</h2>
          <p>{{ item?.description }}</p>
        </div>

        <div class="flex justify-end mt-5">
          <button type="button" class="btn bg-base-100" @click="emit('close')">Sair</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
defineProps({itemId: {type: String, required: true}})

const item = ref({
  video: null,
  title: 'dewdew',
  description: 'dewdwdew',
})

function submit() {
  console.log(form.value)
  emit('close')
}
</script>