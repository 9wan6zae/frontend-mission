import { mount, flushPromises } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import cart from '@/store/modules/cart';

import { Cart, Order } from '@/router/routes';
import App from '@/App.vue';
import CartPage from '@/views/Cart.vue';
import CartItem from '@/components/Cart/CartItem.vue';
import message from '@/data/message';

library.add(fas, far);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [].concat(Cart, Order),
});

const customCart = { ...cart };

describe('CartPage', () => {
  it('renders CartPage', () => {
    const items = [
      {
        product_no: 'asdf1234',
        is_check: false,
        quantity: 2,
        name: '핏이 좋은 수트',
        image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
        price: 1000,
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
    ];
    customCart.state.cart_items = items;
    const store = createStore({
      modules: {
        cart: customCart,
      },
    });
    const wrapper = mount(CartPage, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('#cart-page').exists()).toBe(true);
  });

  describe('렌더링', () => {
    let wrapper;
    let items;

    beforeEach(() => {
      items = [
        {
          product_no: 'asdf1234',
          is_check: false,
          quantity: 2,
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 1000,
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
      ];
      customCart.state.cart_items = items;
      const store = createStore({
        modules: {
          cart: customCart,
        },
      });
      wrapper = mount(CartPage, {
        global: {
          plugins: [store],
          stubs: { FontAwesomeIcon },
        },
      });
    });
    it('전체 체크박스를 렌더링하는지', () => {
      expect(wrapper.find('[data-test="all-checkbox"]').exists()).toBe(true);
    });

    it('N개의 cartItem이 있으면 N개를 렌더링하는지', async () => {
      expect(wrapper.findAllComponents(CartItem)).toHaveLength(items.length);
    });

    describe('플로팅 버튼', () => {
      it('체크한 것이 없으면 플로팅 버튼을 감추는지', () => {
        expect(wrapper.find('[data-test="floating-action-btn"]').isVisible()).toBeFalsy();
      });
      it('하나라도 체크한 것이 있으면 플로팅 버튼을 보이고, 적절한 값이 표시되는지', async () => {
        await wrapper.find('[data-test="all-checkbox"]').trigger('click');

        expect(wrapper.find('[data-test="floating-action-btn"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="floating-action-btn"]').text()).toBe('200,000원 구매');
      });
    });
  });

  describe('선택 기능', () => {
    let wrapper;
    let items;

    beforeEach(async () => {
      items = [
        {
          product_no: 'asdf1234',
          is_check: false,
          quantity: 2,
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 1000,
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
      ];
      customCart.state.cart_items = items;
      const store = createStore({
        modules: {
          cart: customCart,
        },
      });
      wrapper = mount(CartPage, {
        global: {
          plugins: [store],
          stubs: { FontAwesomeIcon },
        },
      });
    });
    it('모든 상품이 체크가 안 된 상태에서 전체 체크박스를 클릭하면 모든 상품이 체크로 되는지', async () => {
      const allCheckbox = wrapper.find('[data-test="all-checkbox"]');

      expect(allCheckbox.classes()).toContain('unchecked');

      await wrapper.find('[data-test="all-checkbox"]').trigger('click');

      expect(allCheckbox.classes()).toContain('checked');

      const checkboxs = wrapper.findAll('[data-test="cart-item-checkbox"]');

      for (let i = 0; i < checkboxs.length; i += 1) {
        const checkbox = checkboxs[i];
        expect(checkbox.classes()).toContain('checked');
      }

      // 각 CartItem의 isCheck 값 초기화
      await wrapper.find('[data-test="all-checkbox"]').trigger('click');
    });
    it('모든 상품이 체크가 된 상태에서 전체 체크박스를 클릭하면 모든 상품의 체크가 해제되는지', async () => {
      // 한 번 클릭 시 전체 체크가 상태
      await wrapper.find('[data-test="all-checkbox"]').trigger('click');
      // 다시 클릭했을 때 전체 비활성화가 되는지
      await wrapper.find('[data-test="all-checkbox"]').trigger('click');
      const checkboxs = wrapper.findAll('[data-test="cart-item-checkbox"]');

      for (let i = 0; i < checkboxs.length; i += 1) {
        const checkbox = checkboxs[i];
        expect(checkbox.classes()).toContain('unchecked');
      }
    });
    it('상품이 하나라도 해제되어 있으면 전체 선택이 비활성화인지', async () => {
      const checkboxs = wrapper.findAll('[data-test="cart-item-checkbox"]');
      await checkboxs[0].trigger('click');

      expect(wrapper.find('[data-test="all-checkbox"]').classes()).toContain('unchecked');
    });
    it('모든 상품이 체크 상태이면 전체 체크박스 활성화되는지', async () => {
      const checkboxs = wrapper.findAll('[data-test="cart-item-checkbox"]');

      for (let i = 0; i < checkboxs.length; i += 1) {
        checkboxs[i].trigger('click');
      }
      await flushPromises();

      expect(wrapper.find('[data-test="all-checkbox"]').classes()).toContain('checked');
    });
  });

  it('구매 버튼을 클릭했을 때 order 페이지로 이동하는지', async () => {
    router.push('/cart');
    await router.isReady();

    const items = [
      {
        product_no: 'asdf1234',
        is_check: false,
        quantity: 2,
        name: '핏이 좋은 수트',
        image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
        price: 1000,
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
    ];
    customCart.state.cart_items = items;
    const store = createStore({
      modules: {
        cart: customCart,
      },
    });
    const wrapper = mount(App, {
      global: {
        plugins: [router, store],
      },
    });

    await wrapper.find('[data-test="floating-action-btn"]').trigger('click');
    await flushPromises();

    expect(wrapper.find('#order-page').exists()).toBeTruthy();
  });
  it('장바구니가 비었을 때 적절한 메시지를 보여주는지', () => {
    customCart.state.cart_items = [];

    const store = createStore({
      modules: {
        cart: customCart,
      },
    });
    const wrapper = mount(CartPage, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.html()).toContain(message.emptyCart);
  });
  it('장바구니의 상품의 삭제버튼을 클릭했을 때 지워지는지', async () => {
    customCart.state.cart_items = [
      {
        product_no: 'asdf1234',
        is_check: false,
        quantity: 2,
        name: '핏이 좋은 수트',
        image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
        price: 1000,
        original_price: 298000,
        description: '아주 잘 맞는 수트',
      },
    ];

    const store = createStore({
      modules: {
        cart: customCart,
      },
    });
    const wrapper = mount(CartPage, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
    });
    // 상품 삭제 버튼 클릭
    await wrapper.find('[data-test="remove-btn"]').trigger('click');
    await flushPromises();

    // 상품이 지워져 장바구니가 비었다는 메시지가 출력되었는지
    expect(wrapper.html()).toContain(message.emptyCart);
  });
});
