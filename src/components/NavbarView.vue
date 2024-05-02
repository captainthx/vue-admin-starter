<script setup lang="ts">
import { GlobalOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { type ItemType } from 'ant-design-vue';
import { computed, ref, h, onMounted } from 'vue';
import i18n from '@/i18n';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/authStore';

const { logout } = useAuthStore();
const { t } = useI18n();
const current = ref<string[]>(['0']);

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
    label: i18n.global.locale.value,
    icon: () => h(GlobalOutlined),
    onClick: () => handleClickLanguage()
  }
]);

const handleClickLanguage = () => {
  const currentLocale = i18n.global.locale.value;
  const availableLocales = Object.keys(i18n.global.messages.value);

  let nextLocaleIndex = availableLocales.indexOf(currentLocale) + 1;
  if (nextLocaleIndex === availableLocales.length) {
    nextLocaleIndex = 0;
  }

  const nextLocale = availableLocales[nextLocaleIndex];
  i18n.global.locale.value = nextLocale;
};

const handleLogout = () => {
  current.value = ['0'];
  logout();
};
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
