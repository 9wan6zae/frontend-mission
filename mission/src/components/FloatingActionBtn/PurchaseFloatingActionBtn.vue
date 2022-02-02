<template>
  <FloatingActionBtn>
    {{ floatingActionBtnText }}
  </FloatingActionBtn>
</template>

<script>
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
  setup(props) {
    const { salesPrice } = usePrice(
      props.original_price,
      props.price,
    );

    return { salesPrice };
  },
  computed: {
    floatingActionBtnText() {
      return `${this.salesPrice} 구매`;
    },
  },
};
</script>
