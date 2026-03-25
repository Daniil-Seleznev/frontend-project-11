import './style.css';
import state from './state.js';
import validate from './validation.js';
import initView, { renderFeeds, renderPosts } from './view.js';
import i18n from './i18n.js';
import loadRSS from './api.js';
import parse from './parser.js';

// Инициализация i18next и View
i18n.then(() => {
  initApp();
});

initView();

// Подписка на изменения состояния для рендера фидов и постов
import { subscribe } from 'valtio/vanilla';
subscribe(state, () => {
  renderFeeds(state.feeds);
  renderPosts(state.posts);
});

// Обработка сабмита формы
const form = document.querySelector('.rss-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = form.querySelector('input');
  const url = input.value;
  const existingUrls = state.feeds.map((f) => f.url);

  state.form.status = 'sending';

  validate(url, existingUrls)
    .then(() => loadRSS(url))
    .then((xml) => parse(xml))
    .then(({ feed, posts }) => {
      const feedId = crypto.randomUUID();

      // Добавляем новый фид
      state.feeds.push({ id: feedId, url, ...feed });

      // Добавляем посты фида
      posts.forEach((post) => {
        state.posts.push({ id: crypto.randomUUID(), feedId, ...post });
      });

      state.form.status = 'valid';
      state.form.error = null;
    })
    .catch((err) => {
      state.form.status = 'error';
      state.form.error = err.message;
    });
});

// ============================
// Автообновление RSS-потоков
// ============================
const updateFeeds = () => {
  const promises = state.feeds.map(async (feed) => {
    try {
      const xml = await loadRSS(feed.url);
      const { posts } = parse(xml);

      // Фильтруем только новые посты
      const existingLinks = state.posts
        .filter((p) => p.feedId === feed.id)
        .map((p) => p.link);

      const newPosts = posts
        .filter((p) => !existingLinks.includes(p.link))
        .map((p) => ({ id: crypto.randomUUID(), feedId: feed.id, ...p }));

      state.posts.push(...newPosts);
    } catch (err) {
      console.error(`Ошибка при обновлении ${feed.url}:`, err.message);
    }
  });

  Promise.all(promises).finally(() => {
    setTimeout(updateFeeds, 5000); // Проверяем снова через 5 секунд
  });
};

// Запускаем автообновление
updateFeeds();
