<template>
  <article class="box-shadow" data-test="cart-item" @click="toggleCheck">
    <font-awesome-icon
      :class="iconClass"
      :icon="['fas', 'check-square']"
      data-test="cart-item-checkbox"
    />
    <figure>
      <img :src="image" data-test="cart-item-img" />
    </figure>
    <section id="info-section">
      <div>
        <strong id="name" data-test="cart-item-name">{{ name }}</strong>
        <p
          id="description"
          class="two-line-ellipsis"
          data-test="cart-item-description"
        >
          {{ description }}
        </p>
      </div>
      <div id="price-wrapper">
        <p id="price" data-test="cart-item-price">{{ salesPrice }}</p>
        <p
          v-if="original_price"
          id="original_price"
          data-test="cart-item-original-price"
        >
          {{ originalPrice }}
        </p>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    isCheck: {
      type: Boolean,
      default: false,
    },
    product_no: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    original_price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
  },
  methods: {
    addComma(number) {
      return number.toLocaleString('ko-kr');
    },
    toggleCheck() {
      this.$emit('checkedProductNo', this.product_no);
    },
  },
  computed: {
    originalPrice() {
      return `${this.addComma(this.original_price)}원`;
    },
    salesPrice() {
      return `${this.addComma(this.price)}원`;
    },
    iconClass() {
      return `checkbox ${this.isCheck ? 'checked' : 'unchecked'}`;
    },
  },
};
</script>

<style scoped>
article {
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
}

figure {
  margin: 0;
  background: var(--lightgray);
  min-width: 80px;
  max-width: 80px;
  height: 80px;
  border-radius: 4px;
  margin-right: 10px;
}

img {
  width: 100%;
  object-fit: contain;
}

#info-section {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}

#description {
  font-weight: normal;
  font-size: 14px;
}

#price-wrapper {
  display: flex;
  align-items: flex-start;
}

#price {
  font-weight: 600;
  font-size: 16px;
  margin-right: 4px;
}

#original_price {
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-decoration-line: line-through;
  color: var(--lightgray);
}
</style>
