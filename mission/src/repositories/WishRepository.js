import axios from './Clients/AxiosClient';

const resource = '/wish';

export default {
  get() {
    return axios.get(`${resource}`);
  },
};
