import { createRouter, createWebHistory } from 'vue-router';
import {
  ItemList, ItemInfo, WishList, Cart, Order, Info, Complete,
} from './routes';

const routes = [].concat(ItemList, ItemInfo, WishList, Cart, Order, Info, Complete);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
