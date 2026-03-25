import * as yup from 'yup';

export default (url, existingUrls) => {
  const schema = yup.string()
    .required('Не должно быть пустым')
    .url('Ссылка должна быть валидным URL')
    .notOneOf(existingUrls, 'RSS уже существует');

  return schema.validate(url);
};
