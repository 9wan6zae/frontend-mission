import { computed } from 'vue';

export default (_originalPrice, _price) => {
  const addComma = (number) => (
    number
      ? number.toLocaleString('ko-KR')
      : 0);

  const discountRate = computed(() => (
    Math.round(((_originalPrice - _price) / _originalPrice) * 100)
  ));

  const originalPrice = computed(() => `${addComma(_originalPrice)}원`);

  const salesPrice = computed(() => `${addComma(_price)}원`);

  const isDiscount = computed(() => _originalPrice);

  return {
    addComma, discountRate, originalPrice, salesPrice, isDiscount,
  };
};
