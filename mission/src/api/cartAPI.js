import axios from '@/utils/axios';

const resource = '/cart';

export default {
  get() {
    return axios.get(`${resource}`);
  },
};
