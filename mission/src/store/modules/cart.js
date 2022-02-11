const cart = {
  namespaced: true,
  state: {
    cart_items: [],
  },
  getters: {
    getTotalPrice: (state) => state.cart_items
      .reduce((acc, cur) => (cur.is_check ? acc + cur.price * cur.quantity : acc), 0),
    getSummary: (state) => state.cart_items
      .filter((item) => item.is_check)
      .map((item) => ({
        product_no: item.product_no,
        name: item.name,
        quantity: `${item.quantity}개`,
        price: `${(item.price * item.quantity).toLocaleString('ko-KR')}원`,
      })),
  },
  mutations: {
    SET_QUATNTITY(state, { index, quantity }) {
      state.cart_items[index].quantity = quantity;
    },
    TOGGLE_IS_CHECK(state, index) {
      state.cart_items[index].is_check = !state.cart_items[index].is_check;
    },
    SET_CHECK_ALL(state, boolean) {
      for (let i = 0; i < state.cart_items.length; i += 1) {
        const item = state.cart_items[i];
        item.is_check = !boolean;
      }
    },
    ADD_CART_ITEM(state, item) {
      for (let i = 0; i < state.cart_items.length; i += 1) {
        const sameProductNo = state.cart_items[i].product_no === item.product_no;
        if (sameProductNo) {
          if (state.cart_items[i].quantity < 5) state.cart_items[i].quantity += 1;
          return;
        }
      }
      state.cart_items.push(item);
    },
    REMOVE_CART_ITEM(state, index) {
      state.cart_items.splice(index, 1);
    },
    CLEAR_CART_ITEMS(state) {
      state.cart_items = [];
    },
  },
  actions: {
    addCartItem({ commit }, item) {
      commit('ADD_CART_ITEM', item);
    },
    removeCartItem({ commit }, index) {
      commit('REMOVE_CART_ITEM', index);
    },
    clearCartItems({ commit }) {
      commit('CLEAR_CART_ITEMS');
    },
    setCheckAll({ commit }, boolean) {
      commit('SET_CHECK_ALL', boolean);
    },
    setQuatntity({ commit }, { index, quantity }) {
      commit('SET_QUATNTITY', { index, quantity });
    },
    toggleIsCheck({ commit }, index) {
      commit('TOGGLE_IS_CHECK', index);
    },
  },
};

export default cart;
