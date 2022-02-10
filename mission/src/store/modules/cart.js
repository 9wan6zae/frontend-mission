const cart = {
  namespaced: true,
  state: {
    items: [
      {
        product_no: 'asdf1234',
        is_check: false,
        quantity: 1,
        name: '핏이 좋은 수트',
        image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
        price: 2000,
        original_price: 298000,
        description: '아주 잘 맞는 수트',
      },
      {
        product_no: 'asdf1235',
        is_check: false,
        quantity: 1,
        name: '핏이 좋은 수트',
        image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
        price: 198000,
        original_price: 298000,
        description: '아주 잘 맞는 수트',
      },
    ],
  },
  getters: {
    totalPrice: (state) => state.items
      .reduce((acc, cur) => (cur.is_check ? acc + cur.price * cur.quantity : acc), 0),
    summary: (state) => state.items
      .filter((item) => item.is_check)
      .map((item) => ({
        product_no: item.product_no,
        name: item.name,
        quantity: `${item.quantity}개`,
        price: `${(item.price * item.quantity).toLocaleString('ko-KR')}원`,
      })),
  },
  mutations: {
    changeQuantity: (state, { index, quantity }) => {
      state.items[index].quantity = quantity;
    },
    toggleIsCheck: (state, index) => {
      state.items[index].is_check = !state.items[index].is_check;
    },
    allCheck: (state, boolean) => {
      for (let i = 0; i < state.items.length; i += 1) {
        const item = state.items[i];
        item.is_check = !boolean;
      }
    },
  },
  actions: {

  },
};

export default cart;
