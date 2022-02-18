import OrderPage from '@/views/Order.vue';
import onlyIsChecked from '../routeGuards/onlyIsChecked';

export default {
  path: '/order',
  name: 'Order',
  component: OrderPage,
  beforeEnter: onlyIsChecked,
};
