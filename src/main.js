import './style.css';
import state from './state.js';
import validate from './validation.js';
import initView from './view.js';
import i18n from './i18n.js';

i18n.then(() => {
  initApp();
});

initView();

const form = document.querySelector('.rss-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const input = form.querySelector('input');
  const url = input.value;

  const existingUrls = state.feeds.map((feed) => feed.url);

  state.form.status = 'sending';

  validate(url, existingUrls)
    .then(() => {
      state.feeds.push({ url });

      state.form.status = 'valid';
      state.form.error = null;
    })
    .catch((err) => {
      state.form.status = 'error';
      state.form.error = err.message;
    });
});
