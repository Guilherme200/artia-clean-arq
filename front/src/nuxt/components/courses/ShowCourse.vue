<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Visualizar curso</h3>
      <div class="card border-none mt-5">
        <VideoBox :src="data?.item?.video" />
        <div class="flex justify-end mt-5">
          <button type="button" class="btn bg-base-100" @click="emit('close')">Sair</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoBox from '../shared/VideoBox.vue';
import {CourseService} from 'core/src/domain/course/CourseService';

const videoUrl = ref(null)
const emit = defineEmits(['close'])
const props = defineProps({itemId: {type: String, required: true}})

async function getCourse() {
  return await new CourseService().get(props.itemId)
}

const {data} = useAsyncData(await getCourse)
</script>