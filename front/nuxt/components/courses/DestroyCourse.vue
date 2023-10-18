<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg dark:bg-gray-700">
          <div class="p-6 text-center">
            <Icon name="mdi:alert-circle-outline" class="text-5xl text-gray-500" />
            <h3 class="text-lg font-normal text-gray-500 mt-5">
              Tem certeza de que deseja excluir este curso?
            </h3>
            <div class="w-full flex justify-center gap-5 mt-10">
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                @click="emit('close')"
              >
                Cancelar
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                @click="destroy()"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
defineProps({itemId: {type: String, required: true}})

function destroy() {
  emit('close')
}
</script>