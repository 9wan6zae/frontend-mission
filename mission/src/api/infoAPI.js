import axios from '@/utils/axios';

const resource = '/info';

export default {
  get() {
    return axios.get(`${resource}`);
  },
};
