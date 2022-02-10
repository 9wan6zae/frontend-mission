const cart = {
  namespaced: true,
  state: {
    items: [],
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
    addCart: (state, item) => {
      for (let i = 0; i < state.items.length; i += 1) {
        const sameProductNo = state.items[i].product_no === item.product_no;
        if (sameProductNo) {
          state.items[i].quantity += 1;
          return;
        }
      }
      state.items.push(item);
    },
    removeItem: (state, productNo) => {
      state.items = state.items.filter((item) => item.product_no !== productNo);
    },
  },
  actions: {

  },
};

export default cart;
