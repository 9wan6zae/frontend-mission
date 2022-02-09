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
    <section v-if="!loading" class="pa0-20 item-wrapper">
      <cart-item
        v-for="item in cartItems"
        :key="item.product_no"
        v-bind="item"
        @checkedProductNo="chageIsCheck"
        data-test="cart-item"
      />
    </section>
    <section v-else class="pa0-20 item-wrapper">
      <loading-block
        v-for="i in 2"
        :key="i"
        style="width: 100%; height: 100px; margin-bottom: 20px"
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
import Layout from '../components/Layouts/Layout.vue';
import CartItem from '../components/Cart/CartItem.vue';
import FloatingActionBtn from '../components/FloatingActionBtn/FloatingActionBtn.vue';
import LoadingBlock from '../components/Loading/LoadingBlock.vue';
import Repository from '@/repositories/RepositoryFactory';

const CartRepository = Repository.get('cart');

export default {
  name: 'Cart',
  components: {
    Layout,
    CartItem,
    FloatingActionBtn,
    LoadingBlock,
  },
  data() {
    return {
      loading: true,
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
      return this.cartItems.reduce((acc, cur) => (cur.isCheck ? acc + cur.price : acc), 0);
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
      this.loading = true;
      const { data } = await CartRepository.get();
      const cartItems = data.cart_item;
      for (let i = 0; i < cartItems.length; i += 1) {
        cartItems[i].isCheck = false;
      }
      this.cartItems = cartItems;
      this.loading = false;
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

.item-wrapper {
  padding-bottom: 80px;
}
</style>
