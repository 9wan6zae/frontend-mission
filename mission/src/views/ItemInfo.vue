<template>
<div id='item-info-page'>
  <section class="price-wrapper pa0-20 flex-col flex-justify-center">
    <p class="product-name" data-test="product-name">{{itemInfo.productName}}</p>
    <div class="flex-align-center">
      <span
        v-if="isShowDiscountRate"
        class="discount-rate"
        data-test="discount-rate"
      >
        {{ discountRate }}
      </span>
      <span class="sales-price" data-test="sales-price">{{ salesPrice }}</span>
      <span
        v-if="isShowDiscountRate"
        class="original-price"
        data-test="original-price"
      >
        {{ originalPrice }}
      </span>
    </div>
  </section>
  <section class="content-container">
    <p class="title">상품정보</p>
    <span data-test="product-info" v-html="itemInfo.productInfo"></span>
  </section>
</div>
</template>

<script>
export default {
  name: 'ItemInfoPage',
  data() {
    return {
      itemInfo: {
        originalPrice: 2000,
        salesPrice: 1000,
        productInfo: `
          <h1>Heading</h1>
          <p>test</p>
        `,
      },
    };
  },
  methods: {
    addComma(number) {
      return number.toLocaleString('ko-KR');
    },
  },
  computed: {
    discountRate() {
      return `${(Math.floor((this.itemInfo.salesPrice / this.itemInfo.originalPrice) * 100)).toString()}%`;
    },
    originalPrice() {
      return `${this.addComma(this.itemInfo.originalPrice)}원`;
    },
    salesPrice() {
      return `${this.addComma(this.itemInfo.salesPrice)}원`;
    },
    isShowDiscountRate() {
      return this.itemInfo.originalPrice !== this.itemInfo.salesPrice;
    },
  },
};
</script>

<style scoped>
p, span {
  margin: 0;
  color: var(--black);
}

main {
  margin-bottom: 100px;
}

.price-wrapper {
  width: 100%;
  height: 80px;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.price-wrapper .product-name {
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 4px;
}

.price-wrapper span {
  margin-right: 6px;
}

.price-wrapper .discount-rate {
  font-weight: 600;
  font-size: 24px;
  color: var(--emphasis);
}

.price-wrapper .sales-price {
  font-weight: 600;
  font-size: 24px;
}

.price-wrapper .original-price {
  font-weight: 600;
  font-size: 18px;
  text-decoration-line: line-through;
  color: var(--lightgray);
}

.content-container {
  padding: 30px 20px 0px 20px;
}

.content-container .title {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
