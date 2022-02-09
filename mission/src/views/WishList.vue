<template>
  <div id="wish-list-page">
    <ListLayout
      menuName='찜 목록'
      :items="items"
      :loading="loading"
    />
  </div>
</template>

<script>
import ListLayout from '@/components/Layouts/ListLayout.vue';
import Repository from '@/repositories/RepositoryFactory';

const WishRepository = Repository.get('wish');

export default {
  name: 'WishListPage',
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
      const { data } = await WishRepository.get();
      this.items = data.items;
      this.loading = false;
    },
  },
  created() {
    this.getItem();
  },
};
</script>
