import axios from './Clients/AxiosClient';

const resource = '/item';

export default {
  get() {
    return axios.get(`${resource}`);
  },
  getItem(productNo) {
    return axios.get(`${resource}/${productNo}`);
  },
};
