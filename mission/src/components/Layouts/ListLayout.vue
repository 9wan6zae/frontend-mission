<template>
  <Layout :menuName="menuName">
    <div
      class="item-list flex-justify-center"
      data-test="item-list-wrapper"
    >
      <template v-if="!this.loading">
        <ItemListItem
          v-for="item in items"
          :key="item.product_no"
          v-bind="item"
          data-test="item"
        />
      </template>
      <template v-else>
        <LoadingItem
          v-for="i in 2"
          :key="i"
          data-test="loading-item"
        />
      </template>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layouts/Layout.vue';
import ItemListItem from '@/components/ItemList/Item.vue';
import LoadingItem from '@/components/Loading/LoadingItem.vue';

export default {
  name: 'ItemListPage',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
    },
    menuName: {
      type: String,
      default: '',
    },
  },
  components: {
    ItemListItem,
    Layout,
    LoadingItem,
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
