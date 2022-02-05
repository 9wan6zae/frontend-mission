import axios from './Clients/AxiosClient';

const resource = '/cart';

export default {
  get() {
    return axios.get(`${resource}`);
  },
};
