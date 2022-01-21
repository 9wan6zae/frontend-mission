<template>
  <article class="item-list-item">
    <figure>
      <img :src="item?.img" data-test="item-img" />
    </figure>
    <section class="price-section">
      <span
        v-if="isDiscount"
        class="discount-rate"
        data-test="discount-rate"
      >
        {{ item?.discountRate }}%
      </span>
      <span
        class="sales-price"
        data-test="price"
      >
        {{ salesPrice }}
      </span>
    </section>
    <p
      class="item-name one-line-ellipsis"
      data-test="item-name"
    >
      {{ item?.name }}
    </p>
    <p
      class="item-description one-line-ellipsis"
      data-test="item-description"
    >
      {{ item?.description }}
    </p>
  </article>
</template>

<script>
import usePrice from '@/composables/usePrice';

export default {
  name: 'ItemListItem',
  props: {
    item: Object,
  },
  setup(props) {
    const { salesPrice } = usePrice(props.item?.originalPrice, props.item?.discountRate);

    return { salesPrice };
  },
  computed: {
    isDiscount() {
      return this.item?.discountRate;
    },
  },
};
</script>

<style scoped>
.item-list-item {
  width: 100%;
  min-height: 250px;
}

.item-list-item figure {
  margin: 0;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 100%;
  background: #ddd;
  border-radius: 10px;
}

.item-list-item figure img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.price-section {
  margin-top: 6px;
  margin-bottom: 4px;
}

.discount-rate {
  font-size: 18px;
  font-weight: 600;
  color: var(--emphasis);
}

.sales-price {
  font-size: 18px;
  font-weight: 600;
}

.one-line-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-name {
  font-weight: 600;
  font-size: 14px;
}

.item-description {
  font-weight: 400;
  font-size: 14px;
}
</style>
