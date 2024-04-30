<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { HomeOutlined, UserOutlined, OrderedListOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ItemType } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);
const items = computed<ItemType[]>(() => [
  {
    key: 'home',
    label: t('menu.home'),
    icon: () => h(HomeOutlined),
    onClick: () => {
      router.push({ name: 'home' });
    }
  },
  {
    key: 'user',
    label: t('menu.user'),
    icon: () => h(UserOutlined),
    children: [
      {
        key: 'loginLog',
        label: t('menu.loginLogs'),
        icon: () => h(OrderedListOutlined),
        onClick: () => {
          router.push({ name: 'loginLogs' });
        }
      }
    ]
  }
]);

onMounted(() => {
  const name = router.currentRoute.value.name;
  if (name) {
    selectedKeys.value = [name as string];
    items.value?.forEach((item: any) => {
      if ('children' in item) {
        item.children.forEach((child: ItemType) => {
          if (child?.key === name) {
            openKeys.value = [item.key as string];
          }
        });
      }
    });
  }
});
</script>
<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    :open-keys="openKeys"
    :items="items"
    theme="dark"
    mode="inline"
  >
  </a-menu>
</template>
