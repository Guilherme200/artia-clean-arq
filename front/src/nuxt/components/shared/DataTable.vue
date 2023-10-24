<template>
  <div class="w-full flex overflow-x-auto mt-5">
    <div
      class="w-full inline-block min-w-full overflow-x-auto align-middle shadow sm:rounded-lg border border-base-100">
      <table class="w-full table table-zebra">
        <thead>
        <tr class="w-full bg-base-100
">
          <th v-for="header in headers" :key="header.key" class="header">{{ header.label }}</th>
          <th class="flex header justify-center" key="action">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="loading" key="loading" class="bg-base-100">
          <td colspan="100%" class="items">
            <div class="flex justify-center">
              <span class="loading loading-dots loading-lg font-medium" />
            </div>
          </td>
        </tr>
        <tr v-else v-for="item in items" :key="item.id || JSON.stringify(item)" class="bg-base-100">
          <td v-for="header in headers" :key="header.key" class="px-6 py-4">
            <slot :name="columnSlotName(header.key)" :item="item">{{ getItemAttr(item, header.key) }}</slot>
          </td>
          <td class="flex items justify-center gap-1">
            <div class="tooltip" data-tip="Ver">
              <button class="btn btn-square btn-ghost btn-sm" @click="emit('show', item.id)">
                <Icon name="bx:show" class="text-indigo-600" />
              </button>
            </div>

            <div class="tooltip" data-tip="Editar">
              <button class="btn btn-square btn-ghost btn-sm" @click="emit('edit', item.id)">
                <Icon name="material-symbols:edit" class="text-green-600" />
              </button>
            </div>

            <div class="tooltip" data-tip="Excluir">
              <button class="btn btn-square btn-ghost btn-sm" @click="emit('destroy', item.id)">
                <Icon name="material-symbols:delete-sharp" class="text-red-600" />
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="isEmpty(items)" class="bg-base-100">
          <slot name="emptyBody">
            <td class="items text-center" colspan="100%">
              <label>Nenhum item encontrado</label>
            </td>
          </slot>
        </tr>
        </tbody>
      </table>
      <div class="w-full flex justify-center py-5 bg-base-100">
        <Pagination
          :total-pages="pagination?.last_page"
          :current-page="pagination?.current_page"
          @changePage="page => changePage(page)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from '~/components/shared/Pagination.vue';

const emit = defineEmits(['onChangePage', 'show', 'edit', 'destroy'])

defineProps({
  items: Array,
  headers: Array,
  loading: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Object,
    default() {
      return {
        current_page: 1,
        from: 1,
        last_page: 1,
        per_page: 20,
        to: 0,
        total: 0,
      }
    },
  },
})

const isEmpty = _isEmpty;

function changePage(page: any) {
  emit('onChangePage', page)
}

function getItemAttr(item: object, attr: string) {
  return _get(item, attr, '-')
}

function columnSlotName(headerValue: string) {
  return 'column' + _upperFirst(_camelCase(headerValue))
}
</script>

<style scoped>
.header {
  @apply px-6 py-3 font-bold leading-4 tracking-wider text-left uppercase
}
</style>