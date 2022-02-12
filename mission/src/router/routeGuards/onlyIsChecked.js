import store from '@/store';

export default (to, from, next) => {
  if (!store.getters['cart/getTotalPrice']) {
    next('/');
    return;
  }
  next();
};
