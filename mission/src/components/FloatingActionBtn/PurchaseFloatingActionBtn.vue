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
    originalPrice: Number,
    discountRate: Number,
  },
  setup(props) {
    const { salesPrice } = usePrice(
      props.originalPrice,
      props.discountRate,
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
