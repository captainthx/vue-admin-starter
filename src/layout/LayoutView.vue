<script setup lang="ts">
import NavbarView from '@/components/NavbarView.vue';
import SideBarView from '@/components/SideBarView.vue';
import { computed, ref } from 'vue';
import { RouterView } from 'vue-router';
import { CustomerServiceOutlined, CommentOutlined, GlobalOutlined } from '@ant-design/icons-vue';
const collapsed = ref<boolean>(false);

const marginLeft = computed(() => {
  return collapsed.value ? '80px' : '200px';
});
</script>

<template>
  <a-layout has-sider>
    <navbar-view />
    <a-layout-sider v-model:collapsed="collapsed" collapsible class="layout-sider">
      <side-bar-view />
    </a-layout-sider>
  </a-layout>
  <a-layout :style="{ marginLeft: marginLeft }">
    <a-layout-header :style="{ padding: 0 }" />
    <a-layout-content>
      <router-view />
    </a-layout-content>
  </a-layout>
</template>
<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.content {
  padding: 24px 16px;
  min-height: calc(100vh - 64px);
  overflow: initial;
}

.layout-sider {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 64px;
  bottom: 0;
}
</style>
