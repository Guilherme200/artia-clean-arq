<template>
  <div class="tooltip tooltip-bottom" data-tip="Alterar tema">
    <label class="swap swap-rotate text-2xl">
      <input type="checkbox" v-model="navbar.swap" />
      <Icon name="mdi:white-balance-sunny" class="swap-on" />
      <Icon name="mdi:weather-night" class="swap-off" />
    </label>
  </div>
</template>

<script setup lang="ts">
import {useNavbarStore} from '../../stores/NavbarStore';
const navbar = useNavbarStore()
</script>