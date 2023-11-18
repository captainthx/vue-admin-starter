<script setup lang="ts">
import NavbarView from '@/components/NavbarView.vue'
import SideBarView from '@/components/SideBarView.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <a-layout>
    <navbar-view />
  </a-layout>
  <a-layout>
    <side-bar-view />
    <a-layout-content>
      <router-view />
    </a-layout-content>
  </a-layout>
</template>
