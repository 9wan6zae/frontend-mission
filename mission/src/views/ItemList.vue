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
import Layout from '@/components/Layouts/Layout.vue';
import ItemListItem from '@/components/ItemList/Item.vue';

export default {
  name: 'ItemListPage',
  components: {
    ItemListItem,
    Layout,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async getItem() {
      const response = await itemAPI.get();
      this.items = response.data.items;
    },
  },
  async created() {
    this.getItem();
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
