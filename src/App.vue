<script setup lang="ts">
import { RouterView } from 'vue-router'
import { theme } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
const { themes } = storeToRefs(useThemeStore())
</script>

<template>
  <a-config-provider
    :theme="{ algorithm: themes === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm }"
  >
    <router-view />
  </a-config-provider>
</template>

<style>
.layout {
  min-height: 100vh;
}
.content {
  text-align: center;
  min-height: 100vh;
  /* background-color: blanchedalmond; */
}
</style>
