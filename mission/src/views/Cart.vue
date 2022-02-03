<template>
  <layout
    id="cart-page"
    menuName="장바구니"
  >
    <section id="selector" class="flex-align-center">
      <font-awesome-icon
        data-test="all-checkbox"
        :class="iconClass"
        :icon="['fas', 'check-square']"
        @click="allCheck"
      />
      <p>전체선택</p>
    </section>
    <section class="pa0-20">
      <cart-item
        v-for="item in cartItems"
        :key="item.product_no"
        v-bind="item"
        @checkedProductNo="chageIsCheck"
        data-test="cart-item"
      />
    </section>
  </layout>
  <floating-action-btn
    v-show="totalPrice"
    style="bottom: 100px"
    data-test="floating-action-btn"
  >
    {{ btnText }}
  </floating-action-btn>
</template>

<script>
import cartAPI from '@/api/cartAPI';
import Layout from '../components/Layouts/Layout.vue';
import CartItem from '../components/Cart/CartItem.vue';
import FloatingActionBtn from '../components/FloatingActionBtn/FloatingActionBtn.vue';

export default {
  name: 'Cart',
  components: {
    Layout,
    CartItem,
    FloatingActionBtn,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    iconClass() {
      return `checkbox ${this.isAllCheck ? 'checked' : 'unchecked'}`;
    },
    isAllCheck() {
      if (!this.cartItems.length) return false;
      for (let i = 0; i < this.cartItems.length; i += 1) {
        const cartItem = this.cartItems[i];
        if (!cartItem.isCheck) {
          return false;
        }
      }
      return true;
    },
    totalPrice() {
      let price = 0;
      for (let i = 0; i < this.cartItems.length; i += 1) {
        const cartItem = this.cartItems[i];
        if (cartItem.isCheck) {
          price += cartItem.price;
        }
      }
      return price;
    },
    btnText() {
      return `${this.totalPrice.toLocaleString('ko-kr')}원 구매`;
    },
  },
  methods: {
    allCheck() {
      const tempCheck = this.isAllCheck;
      for (let i = 0; i < this.cartItems.length; i += 1) {
        const cartItem = this.cartItems[i];
        cartItem.isCheck = !tempCheck;
      }
    },
    chageIsCheck(productNo) {
      for (let i = 0; i < this.cartItems.length; i += 1) {
        const cartItem = this.cartItems[i];
        if (cartItem.product_no === productNo) {
          cartItem.isCheck = !cartItem.isCheck;
        }
      }
    },
    async getCart() {
      const response = await cartAPI.get();
      const cartItems = response.data.cart_item;
      for (let i = 0; i < cartItems.length; i += 1) {
        cartItems[i].isCheck = false;
      }
      this.cartItems = cartItems;
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style scoped>
#selector {
  width: 100%;
  height: 40px;
  background: #fff;
  padding-left: 30px;
}
</style>
