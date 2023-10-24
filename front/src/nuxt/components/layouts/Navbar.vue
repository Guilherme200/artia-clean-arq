<template>
  <nav class="navbar bg-base-100 sticky top-0 z-50">
    <div class="navbar-start" />
    <div class="navbar-center">
      <div class="w-full flex justify-center">
        <NuxtLink to="/" class="btn btn-ghost normal-case text-xl font-bold">Cursos</NuxtLink>
      </div>
    </div>
    <div class="navbar-end px-8">
      <Swap />
    </div>

  </nav>
</template>
<script setup lang="ts">
import Swap from "../shared/Swap.vue";
</script>