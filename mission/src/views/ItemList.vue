<template>
  <div id="item-list-page">
    <AppHeader />
    <section class="item-list-wrapper" data-test="item-list-wrapper">
      <div class="item-list">
        <article v-for="item in itemList" :key="item.id" data-test="item-list">
          <ItemListItem :item="item" />
        </article>
      </div>
    </section>
    <NavBar />
  </div>
</template>

<script>
import ItemListItem from '@/components/ItemList/Item.vue';
import AppHeader from '../components/AppHeader.vue';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'ItemListPage',
  components: {
    ItemListItem,
    AppHeader,
    NavBar,
  },
  data() {
    return {
      itemList: [
        {
          id: 1,
          img: 'https://d20s70j9gw443i.cloudfront.net/t_GOODS_THUMB/https://imgb.a-bly.com/data/goods/20220105_1641388925238287s.jpg',
          discountRate: 15,
          originalPrice: 10000,
          name: '엄청 좋은 옷',
          description: '[매진 임박] 엄청 좋아요!',
        },
        {
          id: 2,
          img: 'test-img',
          originalPrice: 10000,
          name: 'test-name2',
          description: 'test-description',
        },
        {
          id: 1,
          img: 'test-img',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-nametest-nametest-nametest-nametest-nametest-nametest-name',
          description: 'test-description',
        },
        {
          id: 2,
          img: 'test-img',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-name2',
          description: 'test-descriptiontest-descriptiontest-descriptiontest-descriptiontest-description',
        },
        {
          id: 1,
          img: 'https://d20s70j9gw443i.cloudfront.net/t_GOODS_THUMB/https://imgb.a-bly.com/data/goods/20220105_1641388925238287s.jpg',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-name',
          description: 'test-description',
        },
        {
          id: 2,
          img: 'test-img',
          originalPrice: 10000,
          name: 'test-name2',
          description: 'test-description',
        },
        {
          id: 1,
          img: 'test-img',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-name',
          description: 'test-description',
        },
        {
          id: 2,
          img: 'test-img',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-name2',
          description: 'test-descriptiontest-descriptiontest-descriptiontest-descriptiontest-description',
        },
        {
          id: 1,
          img: 'https://d20s70j9gw443i.cloudfront.net/t_GOODS_THUMB/https://imgb.a-bly.com/data/goods/20220105_1641388925238287s.jpg',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-name',
          description: 'test-description',
        },
        {
          id: 2,
          img: 'test-img',
          originalPrice: 10000,
          name: 'test-name2',
          description: 'test-description',
        },
        {
          id: 1,
          img: 'test-img',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-name',
          description: 'test-description',
        },
      ],
    };
  },
};
</script>

<style scoped>
.item-list-wrapper {
  padding-top: calc(var(--appHeaderHeight) + 20px);
  padding-bottom: calc(var(--navBarHeight) + 20px);
}
.item-list {
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 20px;
}
</style>
