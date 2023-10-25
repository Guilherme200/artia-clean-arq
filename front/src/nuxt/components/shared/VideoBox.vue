<template>
  <video-player
    v-bind="{...$attrs}"
    controls
    :loop="true"
    :volume="0.6"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default defineComponent({
  components: {
    VideoPlayer
  }
})
</script>

<style>
.video-js {
  min-height: 70vh !important;
}
</style>
