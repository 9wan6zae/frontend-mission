<template>
  <section class="item-info-wrapper pa0-20 flex-col flex-justify-center">
    <p class="product-name" data-test="product-name">{{ info?.productName }}</p>
    <div class="flex-align-center">
      <span
        v-if="info?.discountRate"
        class="discount-rate"
        data-test="discount-rate"
      >
        {{ info.discountRate }}%
      </span>
      <span class="sales-price" data-test="sales-price">{{ salesPrice }}</span>
      <span
        v-if="info?.discountRate"
        class="original-price"
        data-test="original-price"
      >
        {{ originalPrice }}
      </span>
    </div>
  </section>
  <section class="content-container">
    <p class="title">상품정보</p>
    <span data-test="product-info" v-html="info?.info"></span>
  </section>
</template>

<script>
import usePrice from '@/composables/usePrice';

export default {
  name: 'ItemInfo',
  props: {
    info: Object,
  },
  setup(props) {
    const { originalPrice, salesPrice, isDiscount } = usePrice(
      props.info?.originalPrice,
      props.info?.discountRate,
    );

    return { originalPrice, salesPrice, isDiscount };
  },
};
</script>

<style scoped>
.item-info-wrapper {
  width: 100%;
  height: 80px;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.item-info-wrapper .product-name {
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 4px;
}

.item-info-wrapper span {
  margin-right: 6px;
}

.item-info-wrapper .discount-rate {
  font-weight: 600;
  font-size: 24px;
  color: var(--emphasis);
}

.item-info-wrapper .sales-price {
  font-weight: 600;
  font-size: 24px;
}

.item-info-wrapper .original-price {
  font-weight: 600;
  font-size: 18px;
  text-decoration-line: line-through;
  color: var(--lightgray);
}
</style>
