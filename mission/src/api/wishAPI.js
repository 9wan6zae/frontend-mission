import axios from '@/utils/axios';

const resource = '/wish';

export default {
  get() {
    return axios.get(`${resource}`);
  },
};
