import * as yup from 'yup';
import i18n from './i18n.js';

yup.setLocale({
  mixed: {
    required: () => ({ key: 'errors.required' }),
    notOneOf: () => ({ key: 'errors.duplicate' }),
  },
  string: {
    url: () => ({ key: 'errors.invalidUrl' }),
  },
});

export default (url, existingUrls) => {
  const schema = yup.string()
    .required()
    .url()
    .notOneOf(existingUrls);

  return schema.validate(url)
    .catch((err) => {
      // достаём ключ ошибки
      const errorKey = err.message.key;
      return Promise.reject(new Error(errorKey));
    });
};
