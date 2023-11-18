<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { message } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
const authStore = useAuthStore()
const { token } = storeToRefs(authStore)

onBeforeMount(async () => {
  if (authStore.isExpire()) {
    if (token.value?.refreshToken) {
      if (authStore.refreshIsExpire()) {
        const rescode = await authStore.refreshAuth({ refreshToken: token.value?.refreshToken })
        if (rescode == 511) {
          message.warning('Connection timed out Login again')
          router.push('/login')
        }
      }
    }
  }
})
</script>

<template>
  <a-layout-content class="content">
    <h2>content</h2>
  </a-layout-content>
</template>
<style scoped></style>
