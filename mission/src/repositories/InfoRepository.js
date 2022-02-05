import axios from './Clients/AxiosClient';

const resource = '/info';

export default {
  get() {
    return axios.get(`${resource}`);
  },
};
