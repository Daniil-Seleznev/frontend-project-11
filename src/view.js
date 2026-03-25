import i18n from './i18n.js';
import { subscribe } from 'valtio/vanilla';
import state from './state.js';

export default () => {
  const input = document.querySelector('input');
  const form = document.querySelector('.rss-form');
  const feedback = document.querySelector('.feedback');
  const label = document.querySelector('.form-label');
  const button = document.querySelector('button');

  // тексты
  label.textContent = i18n.t('form.label');
  button.textContent = i18n.t('form.submit');

  subscribe(state, () => {
    const { status, error } = state.form;

    input.classList.remove('is-invalid');

    if (status === 'error') {
      input.classList.add('is-invalid');
      feedback.textContent = i18n.t(error);
    }

    if (status === 'valid') {
      form.reset();
      input.focus();
      feedback.textContent = '';
    }
  });
};
