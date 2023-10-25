<template>
  <div :data-theme="navbar.swap ? 'dark' : 'light'">
    <Navbar />
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-base-300">
      <slot />
    </main>
    <Footer />
  </div>
</template>
<script setup>
import Navbar from '~/components/layouts/Navbar.vue';
import Footer from '~/components/layouts/Footer.vue';
import {useNavbarStore} from '../stores/NavbarStore.js';

const navbar = useNavbarStore()
</script>