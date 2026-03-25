import { proxy } from 'valtio/vanilla';

const state = proxy({
  form: {
    status: 'idle', // idle | sending | error | valid
    error: null,
  },
  feeds: [],
});

export default state;
