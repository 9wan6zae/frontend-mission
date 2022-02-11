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
        @click="setCheckAll(isAllCheck)"
      />
      <p>전체선택</p>
    </section>
    <section class="pa0-20 item-wrapper" v-if="this.cart_items?.length">
      <cart-item
        v-for="(item, index) in cart_items"
        :key="item.product_no"
        v-bind="item"
        :index="index"
        data-test="cart-item"
      />
    </section>
    <section class="pa0-20 item-wrapper" v-else>
      <p>{{ emptyCartMessage }}</p>
    </section>
  </layout>
  <router-link to="/order">
    <floating-action-btn
      v-show="getTotalPrice"
      style="bottom: 100px"
      data-test="floating-action-btn"
    >
      {{ btnText }}
    </floating-action-btn>
  </router-link>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import message from '@/data/message';
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
  computed: {
    ...mapState('cart', ['cart_items']),
    ...mapGetters('cart', ['getTotalPrice']),
    iconClass() {
      return `checkbox ${this.isAllCheck ? 'checked' : 'unchecked'}`;
    },
    isAllCheck() {
      if (!this.cart_items.length) return false;
      for (let i = 0; i < this.cart_items.length; i += 1) {
        const item = this.cart_items[i];
        if (!item.is_check) {
          return false;
        }
      }
      return true;
    },
    btnText() {
      return `${this.getTotalPrice.toLocaleString('ko-kr')}원 구매`;
    },
    emptyCartMessage() {
      return message.emptyCart;
    },
  },
  methods: {
    ...mapActions('cart', ['setCheckAll']),
  },
  created() {

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
