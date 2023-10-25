<template>
  <video-player
    v-bind="{...$attrs}"
    src="http://localhost:81/storage/2/ofertas.mp4"
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
