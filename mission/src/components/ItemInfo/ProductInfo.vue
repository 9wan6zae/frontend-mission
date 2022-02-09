<template>
  <section class="product-info-wrapper pa0-20 flex-col flex-justify-center">
    <p class="product-name" data-test="product-name">{{ name }}</p>
    <div class="flex-align-center">
      <span
        v-if="isDiscount"
        class="discount-rate"
        data-test="discount-rate"
      >
        {{ discountRate }}%
      </span>
      <span class="sales-price" data-test="sales-price">{{ salesPrice }}</span>
      <span
        v-if="isDiscount"
        class="original-price"
        data-test="original-price"
      >
        {{ originalPrice }}
      </span>
    </div>
  </section>
  <section class="content-container">
    <p class="title">상품정보</p>
    <span data-test="product-info" v-html="description"></span>
  </section>
</template>

<script>
import usePrice from '@/composables/usePrice';

export default {
  name: 'ProductInfo',
  props: {
    name: {
      type: String,
      default: '',
    },
    original_price: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const {
      originalPrice, salesPrice, isDiscount, discountRate,
    } = usePrice(
      props.original_price,
      props.price,
    );

    return {
      originalPrice, salesPrice, isDiscount, discountRate,
    };
  },
};
</script>

<style scoped>
.product-info-wrapper {
  width: 100%;
  height: 80px;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.product-info-wrapper .product-name {
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 4px;
}

.product-info-wrapper span {
  margin-right: 6px;
}

.product-info-wrapper .discount-rate {
  font-weight: 600;
  font-size: 24px;
  color: var(--emphasis);
}

.product-info-wrapper .sales-price {
  font-weight: 600;
  font-size: 24px;
}

.product-info-wrapper .original-price {
  font-weight: 600;
  font-size: 18px;
  text-decoration-line: line-through;
  color: var(--lightgray);
}
</style>
