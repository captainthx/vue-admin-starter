<script setup lang="ts">
import { RouterView } from 'vue-router';
import dayjs from 'dayjs';
import { computed } from 'vue';
import i18n from '@/locale';
import enUS from 'ant-design-vue/es/locale/en_US';
import thTH from 'ant-design-vue/es/locale/th_TH';

const language = computed(() => i18n.global.locale.value.split('-')[0]);
const locale = computed(() => (language.value === 'en' ? enUS : thTH));
dayjs.locale(language.value);

locale.effect.onTrigger = () => {
  dayjs.locale(language.value);
};
</script>

<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
