import axios from '@/utils/axios';

const resource = '/item';

export default {
  get(productNo) {
    const uri = productNo ? `/${productNo}` : '';
    return axios.get(`${resource}${uri}`);
  },
};
