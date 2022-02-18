import ItemInfoPage from '@/views/ItemInfo.vue';

export default {
  path: '/item/:product_no',
  name: 'ItemInfo',
  component: ItemInfoPage,
  props: true,
};
