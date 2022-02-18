<template>
  <div class="flex-space-between">
    <FloatingActionBtn @click="btnAction">
      {{ floatingActionBtnText }}
    </FloatingActionBtn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import usePrice from '@/composables/usePrice';
import FloatingActionBtn from '@/components/FloatingActionBtn/FloatingActionBtn.vue';

export default {
  name: 'PurchaseFloatingActionBtn',
  components: {
    FloatingActionBtn,
  },
  props: {
    original_price: Number,
    price: Number,
  },
  data() {
    return {
      isClick: false,
    };
  },
  setup(props) {
    const { salesPrice } = usePrice(
      props.original_price,
      props.price,
    );

    return { salesPrice };
  },
  computed: {
    floatingActionBtnText() {
      return this.isClick ? '장바구니로 이동' : `${this.salesPrice} 구매`;
    },
  },
  methods: {
    ...mapActions('cart', ['addCartItem']),
    addCartAction() {
      const item = JSON.parse(window.sessionStorage.getItem('item'));
      this.addCartItem(item);
      this.isClick = true;
    },
    goCart() {
      this.$router.push('/cart');
    },
    btnAction() {
      if (this.isClick) {
        this.goCart();
      } else {
        this.addCartAction();
      }
    },
  },
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
}
</style>
