<script setup lang="ts">
import { GlobalOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { type ItemType } from 'ant-design-vue';
import { computed, ref, h, onMounted } from 'vue';
import i18n from '@/locale';
import type { MenuItemType } from 'ant-design-vue/es/menu/src/interface';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/authStore';

const { logout } = useAuthStore();
const { t } = useI18n();
const current = ref<string[]>(['0']);

const languages = computed<MenuItemType[]>(() => {
  const entities: MenuItemType[] = [];
  for (const message of Object.values(i18n.global.messages.value)) {
    entities.push({
      key: message.code,
      label: message.language,
      onClick: () => handleClickLanguage(message.code)
    });
  }
  return entities;
});

const items = computed<ItemType[]>(() => [
  {
    key: 'userMenu',
    icon: () => h(UserOutlined),
    children: [
      {
        key: 'logout',
        label: t('menu.logout'),
        icon: () => h(LogoutOutlined),
        onClick: () => handleLogout()
      }
    ]
  },
  {
    key: 'language',
    icon: () => h(GlobalOutlined),
    children: languages.value
  }
]);

const handleClickLanguage = (code: string) => {
  current.value = [code];
  if (code === i18n.global.locale.value) {
    return;
  }
  i18n.global.locale.value = code;
};

const handleLogout = () => {
  current.value = ['0'];
  logout();
};

onMounted(() => {
  current.value = [i18n.global.locale.value];
});
</script>
<template>
  <a-layout-header class="layout-header">
    <a-menu :selectedKeys="current" :items="items" theme="dark" mode="horizontal" class="menu">
    </a-menu>
  </a-layout-header>
</template>
<style scoped>
.layout-header {
  position: fixed;
  z-index: 1;
  width: 100%;
}
.menu {
  line-height: 64px;
  flex-direction: row-reverse;
}
</style>
