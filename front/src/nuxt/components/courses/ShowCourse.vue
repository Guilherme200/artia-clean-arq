<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Visualizar curso</h3>
      <div class="card border-none mt-5">
        <video ref="videoElement" :src="videoUrl(data?.item)" controls width="400" />
        <div class="flex justify-end mt-5">
          <button type="button" class="btn bg-base-100" @click="emit('close')">Sair</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {CourseService} from 'core/src/domain/course/CourseService';

const videoElement = ref()
const emit = defineEmits(['close'])
const props = defineProps({itemId: {type: String, required: true}})

async function getCourseVideo() {
  return await new CourseService().getVideo(props.itemId)
}

const {data} = useAsyncData(await getCourseVideo)

function videoUrl(videoBinaryData: any) {
  const blob = new Blob([videoBinaryData], {type: 'video/mp4'});
  return URL.createObjectURL(blob);
}
</script>