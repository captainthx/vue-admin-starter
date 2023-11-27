<script setup lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue'
import { Icon } from '@iconify/vue'
import { message, type SelectProps } from 'ant-design-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import router from '@/router'

const i18n = useI18n()

const handleLogout = () => {
  message.success('Logout success')
  router.push('/login')
}

const langoptions = ref<SelectProps['options']>([
  {
    label: 'En',
    value: 'en'
  },
  {
    label: 'Th',
    value: 'th'
  },
  {
    label: 'Ja',
    value: 'ja'
  }
])
</script>

<template>
  <a-layout-header>
    <a-row justify="space-between">
      <a-col span="20">
        <a-menu theme="dark" mode="horizontal">
          <router-link :to="'/'">
            <a-menu-item>
              <HomeOutlined />
            </a-menu-item>
          </router-link>
        </a-menu>
      </a-col>
      <a-menu theme="dark">
        <a-select
          v-model:value="i18n.locale.value"
          :options="langoptions"
          :defaultValue="langoptions?.[0]?.value"
          size="default"
        />
      </a-menu>
      <a-menu theme="dark">
        <!-- <LoginOutlined v-if="authStore.tokenExpire" @click="router.push({ path: '/login' })" /> -->
        <a-dropdown placement="bottom" class="mt-5">
          <Icon icon="ant-design:user-outlined" :width="20" />
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <router-link to="/edit">edit</router-link>
              </a-menu-item>
              <a-menu-item @click="handleLogout">logout</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-menu>
    </a-row>
  </a-layout-header>
</template>

<style>
:where(.css-dev-only-do-not-override-185kyl0).ant-menu-dark .ant-menu-item-selected {
  background-color: transparent;
}
:where(.css-dev-only-do-not-override-1a6jmdy).ant-menu-dark .ant-menu-item-selected {
  background-color: transparent;
}

:where(.css-dev-only-do-not-override-185kyl0) a,
:where(.css-dev-only-do-not-override-1a6jmdy) a {
  color: rgb(177, 155, 155);
  font-size: large;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  -webkit-text-decoration-skip: objects;
}

.router-link-exact-active {
  color: #ffff;
  /* background-color: rgb(211, 199, 211); */
  border-radius: 25px;
  transition: ease-in-out 0.7s;
}
</style>
