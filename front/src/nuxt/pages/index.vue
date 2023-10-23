<template>
  <div class="container px-6 py-8 mx-auto">
    <h3 class="text-3xl font-bold text-gray-700">Cursos</h3>

    <div class="mt-8 grid md:grid-cols-3 gap-4">
      <DashboardCounter
        value="8,282"
        status="info"
        label="Cursos"
        icon="material-symbols:shop-two-outline-sharp" />

      <DashboardCounter
        value="4,141"
        status="success"
        label="Cursos ativos"
        icon="material-symbols:shop-two-outline-sharp" />

      <DashboardCounter
        value="4,141"
        status="error"
        label="Cursos inativos"
        icon="material-symbols:shop-two-outline-sharp" />
    </div>

    <div class="w-full grid md:grid-cols-5 gap-2 mt-8">
      <InputSearch class="md:col-span-3" />
      <FilterSelect :items="filterItems" filter="status" selected="active" />
      <button class="btn btn-outline bg-base-100 border-gray-500" @click="create()">
        <Icon name="material-symbols:add" class="text-xl" />
        Novo curso
      </button>
    </div>

    <div class="flex w-full mt-4">
      <DataTable
        :loading="pending"
        :headers="headers"
        :items="data?.data"
        :pagination="data?.meta"
        @show="(id) => show(id)"
        @edit="(id) => edit(id)"
        @destroy="(id) => destroy(id)"
      >
        <template #columnStatus="{item}">
          <span
            class="badge text-base-100 gap-2"
            :class="item?.status === 'ACTIVE' ? 'badge-success' : 'badge-error'">
            {{ item?.status === 'ACTIVE' ? 'Ativo' : 'Inativo' }}
          </span>
        </template>
      </DataTable>
    </div>

    <component
      v-if="modal.show"
      :is="modal.component"
      :key="modal.key"
      :item-id="modal.itemId"
      @close="(value) => modal.show = value" />
  </div>
</template>

<script setup lang="ts">
import DataTable from '~/components/shared/DataTable.vue';
import ShowCourse from '~/components/courses/ShowCourse.vue';
import InputSearch from '~/components/shared/InputSearch.vue';
import FilterSelect from '~/components/shared/FilterSelect.vue';
import CreateCourse from '~/components/courses/CreateCourse.vue';
import UpdateCourse from '~/components/courses/UpdateCourse.vue';
import DestroyCourse from '~/components/courses/DestroyCourse.vue';
import {CourseService} from "core/src/domain/course/CourseService";

const route = useRoute()

const filterItems = [
  {key: 'all', value: 'Todos'},
  {key: 'active', value: 'Ativos'},
  {key: 'inactive', value: 'Inativos'},
]

const modal = ref({
  key: '',
  itemId: '',
  show: false,
  component: {}
})

function create() {
  modal.value.show = true
  modal.value.key = 'create'
  modal.value.component = markRaw(CreateCourse)
}

function show(id: string) {
  modal.value.show = true
  modal.value.key = `show-${id}`
  modal.value.itemId = id.toString()
  modal.value.component = markRaw(ShowCourse)
}

function edit(id: string) {
  modal.value.show = true
  modal.value.key = `edit-${id}`
  modal.value.itemId = id.toString()
  modal.value.component = markRaw(UpdateCourse)
}

function destroy(id: string) {
  modal.value.show = true
  modal.value.key = `destroy-${id}`
  modal.value.itemId = id.toString()
  modal.value.component = markRaw(DestroyCourse)
}

const headers = [
  {key: 'title', label: 'Título'},
  {key: 'description', label: 'Descrição'},
  {key: 'status', label: 'Status'},
  {key: 'createdAt', label: 'Criado em'},
  {key: 'expiredAt', label: 'Expira em'},
]

async function fetchCourses () {
  return await new CourseService().index(route.query)
}

const {pending, data, refresh} = useAsyncData(fetchCourses)
useRouteQueryWatcher(refresh)
</script>