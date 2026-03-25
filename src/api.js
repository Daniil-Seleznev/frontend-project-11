import axios from 'axios';

const getProxyUrl = (url) => {
  const proxy = new URL('https://allorigins.hexlet.app/get');
  proxy.searchParams.set('disableCache', 'true');
  proxy.searchParams.set('url', url);
  return proxy.toString();
};

export default (url) => {
  const fullUrl = getProxyUrl(url);

  return axios.get(fullUrl)
    .then((response) => response.data.contents);
};
