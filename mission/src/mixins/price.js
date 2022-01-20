export default {
  methods: {
    addComma(number) {
      if (number) return number.toLocaleString('ko-KR');
      return 0;
    },
    calcDiscountedPrice(discountRate, originalPrice) {
      return Math.ceil(originalPrice * ((1 - (discountRate / 100))));
    },
  },
};
