import { createI18n } from 'vue-i18n';

import enUs from './en_us';
import thTh from './th_th';

const messages = {} as Record<string, any>;

for (const language of [enUs, thTh]) {
  messages[language.code] = language;
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  messages
});

export { i18n as default };
