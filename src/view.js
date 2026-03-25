import { subscribe } from 'valtio/vanilla';
import state from './state.js';

export default () => {
  const input = document.querySelector('input');
  const form = document.querySelector('.rss-form');

  subscribe(state, () => {
    const { status, error } = state.form;

    input.classList.remove('is-invalid');

    if (status === 'error') {
      input.classList.add('is-invalid');
    }

    if (status === 'valid') {
      form.reset();
      input.focus();
    }

    const feedback = document.querySelector('.feedback');
    feedback.textContent = error || '';
  });
};
