<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  UserOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  UserSwitchOutlined
} from '@ant-design/icons-vue'
import { h } from 'vue'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import type { ItemType } from 'ant-design-vue'

const { t } = useI18n()

const item = computed<ItemType[]>(() => [
  {
    key: 'sub1',
    label: t('subMenu.user'),
    icon: () => h(UserOutlined),
    children: [
      {
        key: 'user',
        label: t('menu.user'),
        icon: () => h(OrderedListOutlined),
        onClick: () => {
          router.push('user')
        }
      },
      {
        key: 'loginLogs',
        label: t('menu.loginLogs'),
        icon: () => h(OrderedListOutlined),
        onClick: () => {
          router.push('loginLogs')
        }
      }
    ]
  },
  {
    key: 'sub2',
    label: t('subMenu.orders'),
    icon: () => h(ShoppingCartOutlined),
    children: [
      {
        key: 'orders',
        label: t('menu.orders'),
        icon: () => h(OrderedListOutlined),
        onClick: () => {
          router.push('orders')
        }
      }
    ]
  },
  {
    key: 'sub3',
    label: t('subMenu.product'),
    icon: () => h(ShopOutlined),
    children: [
      {
        key: 'product',
        label: t('menu.product'),
        icon: () => h(OrderedListOutlined),
        onClick: () => {
          router.push('product')
        }
      }
    ]
  },
  {
    key: 'sub4',
    label: t('subMenu.admin'),
    icon: () => h(UserSwitchOutlined),
    children: [
      {
        key: 'admin',
        label: t('menu.admin'),
        icon: () => h(OrderedListOutlined),
        onClick: () => {
          router.push('admin')
        }
      },
      {
        key: 'admin logs',
        label: t('menu.adminLogs'),
        icon: () => h(OrderedListOutlined),
        onClick: () => {
          router.push('adminLogs')
        }
      }
    ]
  }
])
</script>

<template>
  <a-layout-sider class="layout">
    <div>
      <a-menu mode="inline" theme="dark" :items="item" />
    </div>
  </a-layout-sider>
</template>
