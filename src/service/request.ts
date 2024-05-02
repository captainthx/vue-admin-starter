import axios from 'axios';

const create = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_API
  });
};

const client = create();

export { client as default, create };
