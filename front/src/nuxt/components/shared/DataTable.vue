<template>
  <div class="w-full flex overflow-x-auto">
    <div
      class="w-full inline-block min-w-full overflow-x-auto align-middle border-b border-gray-200 shadow sm:rounded-lg">
      <table class="w-full table table-zebra">
        <thead>
        <tr class="w-full">
          <th v-for="header in headers" :key="header.key" class="header">{{ header.label }}</th>
          <th class="flex header justify-center" key="action">Ações</th>
        </tr>
        </thead>
        <tbody class="bg-white">
        <tr v-if="loading" key="loading">
          <td colspan="100%" class="items">
            <div class="flex justify-center">
              <span class="loading loading-dots loading-lg text-gray-500 font-medium" />
            </div>
          </td>
        </tr>
        <tr v-else v-for="item in items" :key="item.id || JSON.stringify(item)">
          <td v-for="header in headers" :key="header.key" class="items">
            <slot :name="columnSlotName(header.key)" :item="item">{{ getItemAttr(item, header.key) }}</slot>
          </td>
          <td class="flex items justify-center gap-1">
            <div class="tooltip" data-tip="Ver">
              <button class="btn btn-square btn-outline btn-sm" @click="emit('show', item.id)">
                <Icon name="bx:show" class="hover:text-white" />
              </button>
            </div>

            <div class="tooltip" data-tip="Editar">
              <button class="btn btn-square btn-outline btn-sm" @click="emit('edit', item.id)">
                <Icon name="material-symbols:edit" class="hover:text-white" />
              </button>
            </div>

            <div class="tooltip" data-tip="Excluir">
              <button class="btn btn-square btn-outline btn-sm" @click="emit('destroy', item.id)">
                <Icon name="material-symbols:delete-sharp" class="hover:text-white" />
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="isEmpty(items)">
          <slot name="emptyBody">
            <td class="items text-center" colspan="100%">
              <label>Nenhum item encontrado</label>
            </td>
          </slot>
        </tr>
        </tbody>
      </table>
      <div class="w-full flex justify-center mt-6">
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
.items {
  @apply px-6 py-4 border-b border-gray-200
}

.header {
  @apply px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50
}
</style>