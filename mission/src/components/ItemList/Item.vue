<template>
  <div class="item-list-item">
    <img :src="item?.img" data-test="item-img" />
    <p v-if="item?.discountRate" data-test="discount-rate">{{ item?.discountRate }}%</p>
    <p data-test="price">{{ salesPrice }}</p>
    <p data-test="item-name">{{ item?.name }}</p>
    <p data-test="item-description">{{ item?.description }}</p>
  </div>
</template>

<script>
import comma from '@/mixins/comma';

export default {
  name: 'ItemListItem',
  mixins: [comma],
  props: {
    item: Object,
  },
  computed: {
    salesPrice() {
      if (this.item?.discountRate) {
        return `${this.addComma(Math.ceil(this.item?.originalPrice * ((1 - (this.item?.discountRate / 100)))))}원`;
      }
      return `${this.addComma(this.item?.originalPrice)}원`;
    },
  },
};
</script>

<style>
</style>
