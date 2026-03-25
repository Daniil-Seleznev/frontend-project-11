import i18n from './i18n.js';
import { subscribe } from 'valtio/vanilla';
import state from './state.js';

export default () => {
  const input = document.querySelector('input');
  const form = document.querySelector('.rss-form');
  const feedback = document.querySelector('.feedback');
  const label = document.querySelector('.form-label');
  const button = document.querySelector('button');

  // Тексты формы через i18next
  label.textContent = i18n.t('form.label');
  button.textContent = i18n.t('form.submit');

  const renderFeeds = (feeds) => {
    const container = document.querySelector('.feeds');
    container.innerHTML = '<h2>Фиды</h2>';

    feeds.forEach(({ title, description }) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
      `;
      container.append(div);
    });
  };

  const renderPosts = (posts) => {
    const container = document.querySelector('.posts');
    container.innerHTML = '<h2>Посты</h2>';

    const ul = document.createElement('ul');

    posts.forEach(({ title, link }) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
      ul.append(li);
    });

    container.append(ul);
  };

  // Подписка на изменения состояния
  subscribe(state, () => {
    const { status, error, feeds, posts } = state;

    // Валидация формы
    input.classList.remove('is-invalid');

    if (status.form === 'error') {
      input.classList.add('is-invalid');
      feedback.textContent = i18n.t(error);
    }

    if (status.form === 'valid') {
      form.reset();
      input.focus();
      feedback.textContent = '';
    }

    // Рендер фидов и постов
    renderFeeds(feeds);
    renderPosts(posts);
  });
};
