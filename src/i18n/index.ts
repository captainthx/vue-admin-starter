import { createI18n } from 'vue-i18n';

import enUs from './en_us';
import zhCn from './zh_cn';

const messages = {} as Record<string, any>;

for (const language of [enUs, zhCn]) {
  messages[language.code] = language;
}

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  messages
});

export { i18n as default };
