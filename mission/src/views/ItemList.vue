<template>
  <div id="item-list-page">
    <section data-test="item-list-wrapper">
      <article v-for="item in itemList" :key="item.id" data-test="item-list">
        <ItemListItem :item="item" />
      </article>
    </section>
  </div>
</template>

<script>
import ItemListItem from '@/components/ItemList/Item.vue';

export default {
  name: 'ItemListPage',
  components: {
    ItemListItem,
  },
  data() {
    return {
      itemList: [
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
          description: 'test-description',
        },
      ],
    };
  },
};
</script>

<style>
</style>
