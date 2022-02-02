<template>
  <div id="item-list-page">
    <Layout menuName="판매 중인 상품">
      <div
        class="item-list flex-justify-center"
        data-test="item-list-wrapper"
      >
        <ItemListItem
          v-for="item in itemList"
          :key="item.id"
          :item="item"
          data-test="item"
        />
      </div>
    </Layout>
  </div>
</template>

<script>
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
      itemList: [
        {
          id: 1,
          img: 'http://drive.google.com/uc?export=view&id=1NiKKy29GjTEX4ztxhCQjhDqAFJmTzRs8',
          discountRate: 15,
          originalPrice: 10000,
          name: '엄청 좋은 옷',
          description: '[매진 임박] 엄청 좋아요!',
        },
        {
          id: 2,
          img: 'https://drive.google.com/uc?export=view&id=1p7PD6L6WhP_DJK9bsJGtj9ilTzNQuwK9',
          originalPrice: 10000,
          name: 'test-name2',
          description: 'test-description',
        },
        {
          id: 3,
          img: 'https://drive.google.com/uc?export=view&id=1up6VsQnHqeZ87I3URO1Wqqe2KpkMkYHG',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-nametest-nametest-nametest-nametest-nametest-nametest-name',
          description: 'test-description',
        },
        {
          id: 4,
          img: 'https://drive.google.com/uc?export=view&id=1gg7AHyOhvO4IgAJiRbi8iURE8NSrm9M1',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-name2',
          description: 'test-descriptiontest-descriptiontest-descriptiontest-descriptiontest-description',
        },
        {
          id: 5,
          img: 'http://drive.google.com/uc?export=view&id=1NiKKy29GjTEX4ztxhCQjhDqAFJmTzRs8',
          discountRate: 15,
          originalPrice: 10000,
          name: '엄청 좋은 옷',
          description: '[매진 임박] 엄청 좋아요!',
        },
        {
          id: 6,
          img: 'https://drive.google.com/uc?export=view&id=1p7PD6L6WhP_DJK9bsJGtj9ilTzNQuwK9',
          originalPrice: 10000,
          name: 'test-name2',
          description: 'test-description',
        },
        {
          id: 7,
          img: 'https://drive.google.com/uc?export=view&id=1up6VsQnHqeZ87I3URO1Wqqe2KpkMkYHG',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-nametest-nametest-nametest-nametest-nametest-nametest-name',
          description: 'test-description',
        },
        {
          id: 8,
          img: 'https://drive.google.com/uc?export=view&id=1gg7AHyOhvO4IgAJiRbi8iURE8NSrm9M1',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-name2',
          description: 'test-descriptiontest-descriptiontest-descriptiontest-descriptiontest-description',
        },
        {
          id: 9,
          img: 'http://drive.google.com/uc?export=view&id=1NiKKy29GjTEX4ztxhCQjhDqAFJmTzRs8',
          discountRate: 15,
          originalPrice: 10000,
          name: '엄청 좋은 옷',
          description: '[매진 임박] 엄청 좋아요!',
        },
        {
          id: 10,
          img: 'https://drive.google.com/uc?export=view&id=1p7PD6L6WhP_DJK9bsJGtj9ilTzNQuwK9',
          originalPrice: 10000,
          name: 'test-name2',
          description: 'test-description',
        },
        {
          id: 11,
          img: 'https://drive.google.com/uc?export=view&id=1up6VsQnHqeZ87I3URO1Wqqe2KpkMkYHG',
          discountRate: 15,
          originalPrice: 10000,
          name: 'test-nametest-nametest-nametest-nametest-nametest-nametest-name',
          description: 'test-description',
        },
      ],
    };
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
