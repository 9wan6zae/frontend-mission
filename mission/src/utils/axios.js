import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
});

instance.interceptors.request.use((config) => {
  const customConfig = config;
  customConfig.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'abcd1234',
  };

  return customConfig;
});

instance.interceptors.response.use((response) => response, (error) => {
  console.log(error);
});

export default instance;
