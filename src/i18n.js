import i18next from 'i18next';

const resources = {
  ru: {
    translation: {
      form: {
        label: 'Ссылка RSS',
        submit: 'Добавить',
      },
      errors: {
        required: 'Не должно быть пустым',
        invalidUrl: 'Ссылка должна быть валидным URL',
        duplicate: 'RSS уже существует',
      },
    },
  },
};

export default i18next.createInstance().init({
  lng: 'ru',
  debug: false,
  resources,
});
