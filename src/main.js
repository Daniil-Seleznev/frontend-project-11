import './style.css';
import state from './state.js';
import validate from './validation.js';
import initView from './view.js';
import i18n from './i18n.js';
import loadRSS from './api.js';     // функция загрузки RSS через прокси
import parseRSS from './parser.js'; // функция парсинга RSS

// Инициализация интерфейса и текстов
i18n.then(() => {
  initApp();
});

initView();

function initApp() {
  const form = document.querySelector('.rss-form');
  const input = form.querySelector('input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value;
    const existingUrls = state.feeds.map((f) => f.url);

    // Устанавливаем статус отправки
    state.form.status = 'sending';
    state.form.error = null;

    // Валидация URL
    validate(url, existingUrls)
      .then(() => loadRSS(url))           // загрузка RSS
      .then((xml) => parseRSS(xml))       // парсинг RSS
      .then(({ feed, posts }) => {
        const feedId = crypto.randomUUID();

        // Добавляем фид
        state.feeds.push({
          id: feedId,
          url,
          title: feed.title,
          description: feed.description,
        });

        // Добавляем посты
        posts.forEach((post) => {
          state.posts.push({
            id: crypto.randomUUID(),
            feedId,
            title: post.title,
            link: post.link,
          });
        });

        state.form.status = 'valid';
      })
      .catch((err) => {
        // Ошибка валидации или сети
        state.form.status = 'error';

        // Если ошибка уже имеет код для i18next, используем его
        state.form.error = err.code || 'errors.unknown';
      });
  });
}
