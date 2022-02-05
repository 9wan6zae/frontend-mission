import { mount, flushPromises } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import CartPage from '@/views/Cart.vue';
import CartItem from '@/components/Cart/CartItem.vue';
import cartAPI from '@/repositories/CartRepository';
import LoadingBlock from '@/components/Loading/LoadingBlock.vue';

library.add(fas, far);

const cartItems = [
  {
    product_no: 'asdf1234',
    name: '핏이 좋은 수트',
    image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
    price: 198000,
    original_price: 298000,
    description: '아주 잘 맞는 수트',
  },
  {
    product_no: 'asdf1235',
    name: '핏이 좋은 수트',
    image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
    price: 198000,
    original_price: 298000,
    description: '아주 잘 맞는 수트',
  },
];

cartAPI.get = jest.fn().mockResolvedValue({
  data: {
    cart_item: cartItems,
  },
});

describe('CartPage', () => {
  it('renders CartPage', () => {
    const wrapper = mount(CartPage, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('#cart-page').exists()).toBe(true);
  });

  describe('렌더링', () => {
    it('전체 체크박스를 렌더링하는지', () => {
      const wrapper = mount(CartPage, {
        global: {
          stubs: { FontAwesomeIcon },
        },
      });

      expect(wrapper.find('[data-test="all-checkbox"]').exists()).toBe(true);
    });

    it('N개의 cartItem이 있으면 N개를 렌더링하는지', async () => {
      const wrapper = mount(CartPage, {
        global: {
          stubs: { FontAwesomeIcon },
        },
      });
      await cartAPI.get();
      await flushPromises();

      expect(wrapper.findAllComponents(CartItem)).toHaveLength(cartItems.length);
    });

    describe('플로팅 버튼', () => {
      it('체크한 것이 없으면 플로팅 버튼을 감추는지', () => {
        const wrapper = mount(CartPage, {
          global: {
            stubs: { FontAwesomeIcon },
          },
          data() {
            return {
              cartItems,
            };
          },
        });

        expect(wrapper.find('[data-test="floating-action-btn"]').isVisible()).toBeFalsy();
      });
      it('하나라도 체크한 것이 있으면 플로팅 버튼을 보이고, 적절한 값이 표시되는지', async () => {
        const wrapper = mount(CartPage, {
          global: {
            stubs: { FontAwesomeIcon },
          },
        });

        await cartAPI.get();
        await flushPromises();

        await wrapper.find('[data-test="all-checkbox"]').trigger('click');

        expect(wrapper.find('[data-test="floating-action-btn"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="floating-action-btn"]').text()).toBe('396,000원 구매');
      });
    });
  });

  describe('선택 기능', () => {
    it('모든 상품이 체크가 안 된 상태에서 전체 체크박스를 클릭하면 모든 상품이 체크로 되는지', async () => {
      const wrapper = mount(CartPage, {
        global: {
          stubs: { FontAwesomeIcon },
        },
      });

      await cartAPI.get();
      await flushPromises();

      await wrapper.find('[data-test="all-checkbox"]').trigger('click');
      const checkboxs = wrapper.findAll('[data-test="cart-item-checkbox"]');

      for (let i = 0; i < checkboxs.length; i += 1) {
        const checkbox = checkboxs[i];
        expect(checkbox.classes()).toContain('checked');
      }
    });
    it('모든 상품이 체크가 된 상태에서 전체 체크박스를 클릭하면 모든 상품의 체크가 해제되는지', async () => {
      const wrapper = mount(CartPage, {
        global: {
          stubs: { FontAwesomeIcon },
        },
      });

      await cartAPI.get();
      await flushPromises();

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
      const wrapper = mount(CartPage, {
        global: {
          stubs: { FontAwesomeIcon },
        },
      });

      await cartAPI.get();
      await flushPromises();

      const checkboxs = wrapper.findAll('[data-test="cart-item-checkbox"]');
      await checkboxs[0].trigger('click');

      expect(wrapper.find('[data-test="all-checkbox"]').classes()).toContain('unchecked');
    });
    it('모든 상품이 체크 상태이면 전체 체크박스 활성화되는지', async () => {
      const wrapper = mount(CartPage, {
        global: {
          stubs: { FontAwesomeIcon },
        },
      });

      await cartAPI.get();
      await flushPromises();

      const checkboxs = wrapper.findAll('[data-test="cart-item-checkbox"]');

      for (let i = 0; i < checkboxs.length; i += 1) {
        checkboxs[i].trigger('click');
      }
      await flushPromises();

      expect(wrapper.find('[data-test="all-checkbox"]').classes()).toContain('checked');
    });
  });
  describe('CartAPI', () => {
    it('cartAPI 호출하는지', async () => {
      await flushPromises();

      expect(cartAPI.get).toHaveBeenCalled();
    });
  });
  describe('Loading', () => {
    it('로딩 중일 때 loading-block이 보이는지', () => {
      const wrapper = mount(CartPage, {
        global: {
          stubs: { FontAwesomeIcon },
        },
      });

      expect(wrapper.findComponent(LoadingBlock).exists()).toBeTruthy();
    });

    it('로딩이 완료되면 loading-block이 보이지 않는지', async () => {
      const wrapper = mount(CartPage, {
        global: {
          stubs: { FontAwesomeIcon },
        },
      });

      await cartAPI.get();
      await flushPromises();

      expect(wrapper.findComponent(LoadingBlock).exists()).toBeFalsy();
    });
  });
});
