import CompletePage from '@/views/Complete.vue';
import onlyIsChecked from '../routeGuards/onlyIsChecked';

export default {
  path: '/complete',
  name: 'Complete',
  component: CompletePage,
  beforeEnter: onlyIsChecked,
};
