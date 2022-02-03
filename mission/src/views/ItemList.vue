<template>
  <div id="item-list-page">
    <ListLayout
      menuName="판매 중인 상품"
      :items="items"
      :loading="loading"
    />
  </div>
</template>

<script>
import itemAPI from '@/api/itemAPI';
import ListLayout from '@/components/Layouts/ListLayout.vue';

export default {
  name: 'ItemListPage',
  components: {
    ListLayout,
  },
  data() {
    return {
      loading: true,
      items: [],
    };
  },
  methods: {
    async getItem() {
      this.loading = true;
      const response = await itemAPI.get();
      this.items = response.data.items;
      this.loading = false;
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
