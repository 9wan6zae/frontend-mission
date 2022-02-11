const cart = {
  namespaced: true,
  state: {
    cart_items: [],
  },
  getters: {
    totalPrice: (state) => state.cart_items
      .reduce((acc, cur) => (cur.is_check ? acc + cur.price * cur.quantity : acc), 0),
    summary: (state) => state.cart_items
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
      state.cart_items[index].quantity = quantity;
    },
    toggleIsCheck: (state, index) => {
      state.cart_items[index].is_check = !state.cart_items[index].is_check;
    },
    allCheck: (state, boolean) => {
      for (let i = 0; i < state.cart_items.length; i += 1) {
        const item = state.cart_items[i];
        item.is_check = !boolean;
      }
    },
    addItem: (state, item) => {
      for (let i = 0; i < state.cart_items.length; i += 1) {
        const sameProductNo = state.cart_items[i].product_no === item.product_no;
        if (sameProductNo) {
          if (state.cart_items[i].quantity < 5) state.cart_items[i].quantity += 1;
          return;
        }
      }
      state.cart_items.push(item);
    },
    removeItem: (state, productNo) => {
      state.cart_items = state.cart_items.filter((item) => item.product_no !== productNo);
    },
    allRemoveItem: (state) => {
      state.cart_items = [];
    },
  },
  actions: {

  },
};

export default cart;
