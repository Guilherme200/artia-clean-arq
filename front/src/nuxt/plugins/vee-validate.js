import {defineRule, configure} from 'vee-validate';
import * as Rules from '@vee-validate/rules';
import {localize, setLocale} from '@vee-validate/i18n'
import pt_BR from '@vee-validate/i18n/dist/locale/pt_BR.json';

export default defineNuxtPlugin(() => {
  for (const [ruleName, rule] of Object.entries(Rules)) {
    if (ruleName && rule) {
      defineRule(ruleName, rule);
    }
  }
});

localize({pt_BR});

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
  generateMessage: localize('pt_BR', {
    names: {
      video: 'vídeo',
      title: 'título',
      description: 'descrição'
    },
  }),
});

setLocale('pt_BR')