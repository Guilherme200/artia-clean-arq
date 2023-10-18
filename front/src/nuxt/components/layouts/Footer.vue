<template>
  <footer class="footer grid items-center p-4 bg-base-100 text-gray-500 md-grid-cols-2">
    <nav class="flex justify-center md:justify-end gap-3 mt-3 md:mt-0 w-full md:order-2">
      <nuxt-link to="#">
        <Icon name="mdi:twitter" class="text-3xl" />
      </nuxt-link>
      <nuxt-link to="#">
        <Icon name="mdi:instagram" class="text-3xl" />
      </nuxt-link>
      <nuxt-link to="#">
        <Icon name="mdi:facebook" class="text-3xl" />
      </nuxt-link>
    </nav>
    <aside class="flex justify-center md:justify-start items-center grid-flow-col w-full md:order-1">
      <Icon name="octicon:hash-16" class="text-2xl" />
      <p>Copyright © 2023 - All right reserved</p>
    </aside>
  </footer>
</template>
<script setup lang="ts">
</script>