import { flushPromises, mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import cart from '@/store/modules/cart';

import PurchaseFloatingActionBtn from '@/components/FloatingActionBtn/PurchaseFloatingActionBtn.vue';
import CartPage from '@/views/Cart.vue';

const store = createStore({
  modules: {
    cart,
  },
});

const localStorageMock = (() => {
  let session = {};

  return {
    getItem(key) {
      return session[key] || null;
    },
    setItem(key, value) {
      session[key] = value.toString();
    },
    removeItem(key) {
      delete session[key];
    },
    clear() {
      session = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock,
});

describe('Floating Action Button', () => {
  const originalPrice = 58000;
  const price = 49300;
  const wrapper = mount(PurchaseFloatingActionBtn, {
    props: {
      original_price: originalPrice,
      price,
    },
  });
  it('renders floating-action-btn', () => {
    expect(wrapper.find('[data-test="floating-action-btn"]').exists()).toBeTruthy();
  });

  it('shows sales-price in floating-action-btn', () => {
    expect(wrapper.find('[data-test="floating-action-btn"]').text()).toContain('49,300원');
  });

  it('버튼을 클릭했을 때 장바구니에 상품이 추가되는지', async () => {
    const wrapperStore = mount(PurchaseFloatingActionBtn, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          isClick: false,
        };
      },
    });
    const cartWrapper = mount(CartPage, {
      global: {
        plugins: [store],
      },
    });
    const item = {
      description: '관심 받고 싶을 때',
      image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-3.jpg',
      is_check: false,
      name: '우주복 코스튬',
      price: 300000,
      product_no: 'defg5678',
      quantity: 1,
    };
    const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
    window.sessionStorage.setItem('item', JSON.stringify(item));

    // 장바구니 상품이 비어 있는 상태
    expect(cartWrapper.findAll('[data-test="cart-item"]')).toHaveLength(0);

    // 액션 버튼 클릭시 장바구니에 상품 추가 로직 실행
    await wrapperStore.find('[data-test="floating-action-btn"]').trigger('click');
    await flushPromises();

    // sessionStorage 호출했는지
    expect(getItemSpy).toBeCalledWith('item');

    // 장바구니 상품이 하나 추가되었는지
    expect(cartWrapper.findAll('[data-test="cart-item"]')).toHaveLength(1);
  });
  it('버튼을 두 번 눌렀을 때 장바구니 페이지로 이동하는지', async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    const wrapperStore = mount(PurchaseFloatingActionBtn, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
      data() {
        return {
          isClick: false,
        };
      },
    });

    await wrapperStore.find('[data-test="floating-action-btn"]').trigger('click');
    await wrapperStore.find('[data-test="floating-action-btn"]').trigger('click');
    await flushPromises();

    expect(mockRouter.push).toHaveBeenCalledWith('/cart');
  });
});
