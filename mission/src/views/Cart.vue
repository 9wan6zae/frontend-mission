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
        @click="setCheckAll"
      />
      <p>전체선택</p>
    </section>
    <section class="pa0-20 item-wrapper" v-if="!this.isEmptyCartItems">
      <cart-item
        v-for="(item, index) in getCartItems"
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
import { mapGetters, mapActions } from 'vuex';
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
    ...mapGetters('cart', ['getCartItems', 'getTotalPrice', 'isEmptyCartItems', 'isAllCheck']),
    iconClass() {
      return `checkbox ${this.isAllCheck ? 'checked' : 'unchecked'}`;
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
