import { createRouter, createWebHistory } from 'vue-router';
import ItemListPage from '@/views/ItemList.vue';
import ItemInfoPage from '@/views/ItemInfo.vue';
import WishListPage from '@/views/WishList.vue';
import CartPage from '@/views/Cart.vue';
import InfoPage from '@/views/Info.vue';
import OrderPage from '@/views/Order.vue';
import CompletePage from '@/views/Complete.vue';

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
    props: true,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
  },
  {
    path: '/info',
    name: 'Info',
    component: InfoPage,
  },
  {
    path: '/order',
    name: 'Order',
    component: OrderPage,
  },
  {
    path: '/complete',
    name: 'Complete',
    component: CompletePage,
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
