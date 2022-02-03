import { createRouter, createWebHistory } from 'vue-router';
import ItemListPage from '@/views/ItemList.vue';
import ItemInfoPage from '@/views/ItemInfo.vue';
import WishListPage from '@/views/WishList.vue';
import CartPage from '@/views/Cart.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ItemListPage,
  },
  {
    path: '/wish',
    name: 'WishListPage',
    component: WishListPage,
  },
  {
    path: '/item/:product_no',
    name: 'ItemInfo',
    component: ItemInfoPage,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
