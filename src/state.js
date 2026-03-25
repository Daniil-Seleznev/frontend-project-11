import { proxy } from 'valtio';

// Главное состояние приложения
const state = proxy({
  // Форма
  form: {
    status: 'idle', // idle | sending | valid | error
    error: null,    // код ошибки для i18next
  },

  // Список фидов
  feeds: [
    // Каждый объект:
    // {
    //   id: 'uuid',
    //   url: 'https://example.com/rss',
    //   title: 'Название фида',
    //   description: 'Описание фида'
    // }
  ],

  // Список постов
  posts: [
    // Каждый объект:
    // {
    //   id: 'uuid',
    //   feedId: 'uuid-фида',
    //   title: 'Название поста',
    //   link: 'https://example.com/post'
    // }
  ],
});

export default state;
