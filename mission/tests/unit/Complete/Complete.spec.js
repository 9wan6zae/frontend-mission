import { flushPromises, mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { ItemList, Complete } from '@/router/routes';
import App from '@/App.vue';
import CompletePage from '@/views/Complete.vue';
import CartPage from '@/views/Cart.vue';
import message from '@/data/message';
import cart from '@/store/modules/cart';

library.add(fas, far);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [].concat(ItemList, Complete),
});

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
    product_no: 'asdf1234',
    is_check: true,
    quantity: 2,
    name: '핏이 좋은 수트',
    image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
    price: 1000,
    original_price: 298000,
    description: '아주 잘 맞는 수트',
  },
];

const customCart = { ...cart };
customCart.state.cart_items = items;

const store = createStore({
  modules: {
    cart: customCart,
  },
});

describe('CompletePage', () => {
  it('renders CompletePage', () => {
    const wrapper = mount(CompletePage, {
      global: {
        plugins: [router, store],
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('#complete-page').exists()).toBeTruthy();
  });
  it('컴포넌트 렌더링 시 선택한 장바구니 상품을 삭제하는지', () => {
    const cartWrapper = mount(CartPage, {
      global: {
        plugins: [router, store],
        stubs: { FontAwesomeIcon },
      },
    });
    const checkboxs = cartWrapper.findAll('[data-test="cart-item-checkbox"]');

    // state에 is_check가 true인 것과 false인 것이 각 1개씩 총 2개인데, true인 것이 제거되어 한 개가 됨
    expect(cartWrapper.findAll('[data-test="cart-item"]')).toHaveLength(1);
    // 남은 cart_item의 is_checked는 false임
    for (let i = 0; i < checkboxs.length; i += 1) {
      const checkbox = checkboxs[i];
      expect(checkbox.classes()).toContain('unchecked');
    }
  });
  it('홈으로 버튼을 클릭했을 때 / 으로 이동하는지', async () => {
    router.push('/complete');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router, store],
      },
    });

    await wrapper.find('[data-test="home-btn"]').trigger('click');
    await flushPromises();

    expect(wrapper.find('#item-list-page').exists()).toBeTruthy();
  });
  it('필요한 요소들을 렌더링하는지', () => {
    const wrapper = mount(CompletePage, {
      global: {
        plugins: [router, store],
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('[data-test="check-icon"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="complete-message"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="home-btn"]').exists()).toBeTruthy();
  });

  it('적절한 메시지를 보여주는지', () => {
    const wrapper = mount(CompletePage, {
      global: {
        plugins: [router, store],
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('[data-test="complete-message"]').text()).toBe(message.complete);
  });
});
