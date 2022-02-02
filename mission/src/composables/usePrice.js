import { computed } from 'vue';

export default (price, discountRate) => {
  const addComma = (number) => (
    number
      ? number.toLocaleString('ko-KR')
      : 0);

  const calcDiscountedPrice = () => Math.ceil(price * ((1 - (discountRate / 100))));

  const originalPrice = computed(() => `${addComma(price)}원`);

  const salesPrice = computed(() => (
    discountRate
      ? `${addComma(calcDiscountedPrice())}원`
      : originalPrice.value));

  const isDiscount = computed(() => discountRate);

  return {
    addComma, calcDiscountedPrice, originalPrice, salesPrice, isDiscount,
  };
};
