export default {
  methods: {
    addComma(number) {
      if (number) return number.toLocaleString('ko-KR');
      return 0;
    },
  },
};
