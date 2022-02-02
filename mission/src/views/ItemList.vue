<template>
  <div id="item-list-page">
    <Layout menuName="판매 중인 상품">
      <div
        class="item-list flex-justify-center"
        data-test="item-list-wrapper"
      >
        <ItemListItem
          v-for="item in items"
          :key="item.product_no"
          v-bind="item"
          data-test="item"
        />
      </div>
    </Layout>
  </div>
</template>

<script>
import itemAPI from '@/api/itemAPI';
import Layout from '@/components/Layout.vue';
import ItemListItem from '@/components/ItemList/Item.vue';

export default {
  name: 'ItemListPage',
  components: {
    ItemListItem,
    Layout,
  },
  data() {
    return {
      items: [
        {
          product_no: 'asdf1234',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000.0,
          original_price: 298000.0,
          description: '아주 잘 맞는 수트',
        },
      ],
    };
  },
  async created() {
    const response = await itemAPI.get();
    this.items = response.data.items;
  },
};
</script>

<style scoped>
.item-list {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 300px));
  gap: 20px;
}
</style>
