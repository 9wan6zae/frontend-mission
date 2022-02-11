<template>
  <article class="box-shadow item-wrapper" data-test="cart-item">
    <font-awesome-icon
      @click="toggleIsCheck(this.index)"
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
      <section class="flex-space-between">
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
        <select v-model="thisQuantity" data-test="cart-item-quantity">
          <option v-for="i in 5" :key="i">
            {{i}}
          </option>
        </select>
      </section>
    </section>
    <font-awesome-icon
      @click="removeCartItem(this.product_no)"
      class="removeBtn"
      data-test="remove-btn"
      :icon="['fas', 'trash']"
    />
  </article>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CartItem',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    is_check: {
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
  data() {
    return {
      thisQuantity: this.quantity,
    };
  },
  watch: {
    thisQuantity(val) {
      this.setQuatntity({
        index: this.index,
        quantity: +val,
      });
    },
  },
  methods: {
    ...mapActions('cart', ['setQuatntity', 'toggleIsCheck', 'removeCartItem']),
    addComma(number) {
      return number.toLocaleString('ko-kr');
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
      return `checkbox ${this.is_check ? 'checked' : 'unchecked'}`;
    },
  },
};
</script>

<style scoped>
article {
  position: relative;
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

.removeBtn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
