import { mount, flushPromises } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import CartPage from '@/views/Cart.vue';
import CartItem from '@/components/Cart/CartItem.vue';
import cartAPI from '@/api/cartAPI';

library.add(fas, far);

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

    it('N개의 cartItem이 있으면 N개를 렌더링하는지', () => {
      const cartItems = [
        {
          isCheck: false,
          product_no: 'asdf1234',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          original_price: 298000,
          description: '아주 잘 맞는 수트',
        },
        {
          isCheck: true,
          product_no: 'asdf1235',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          description: '아주 잘 맞는 수트',
        },
      ];
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

      expect(wrapper.findAllComponents(CartItem)).toHaveLength(cartItems.length);
    });

    describe('플로팅 버튼', () => {
      it('체크한 것이 없으면 플로팅 버튼을 감추는지', () => {
        const cartItems = [
          {
            isCheck: false,
            product_no: 'asdf1234',
            name: '핏이 좋은 수트',
            image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
            price: 198000,
            original_price: 298000,
            description: '아주 잘 맞는 수트',
          },
          {
            isCheck: false,
            product_no: 'asdf1235',
            name: '핏이 좋은 수트',
            image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
            price: 198000,
            description: '아주 잘 맞는 수트',
          },
        ];
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
      it('하나라도 체크한 것이 있으면 플로팅 버튼을 보이는지', () => {
        const cartItems = [
          {
            isCheck: false,
            product_no: 'asdf1234',
            name: '핏이 좋은 수트',
            image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
            price: 198000,
            original_price: 298000,
            description: '아주 잘 맞는 수트',
          },
          {
            isCheck: true,
            product_no: 'asdf1235',
            name: '핏이 좋은 수트',
            image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
            price: 198000,
            description: '아주 잘 맞는 수트',
          },
        ];
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

        expect(wrapper.find('[data-test="floating-action-btn"]').isVisible()).toBeTruthy();
      });
      it('플로팅 버튼에 적절한 값이 표시되는지', () => {
        const cartItems = [
          {
            isCheck: false,
            product_no: 'asdf1234',
            name: '핏이 좋은 수트',
            image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
            price: 198000,
            original_price: 298000,
            description: '아주 잘 맞는 수트',
          },
          {
            isCheck: true,
            product_no: 'asdf1235',
            name: '핏이 좋은 수트',
            image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
            price: 198000,
            description: '아주 잘 맞는 수트',
          },
        ];
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

        expect(wrapper.find('[data-test="floating-action-btn"]').text()).toBe('198,000원 구매');
      });
    });
  });

  describe('선택 기능', () => {
    it('모든 상품이 체크가 안 된 상태에서 전체 체크박스를 클릭하면 모든 상품이 체크로 되는지', async () => {
      const cartItems = [
        {
          isCheck: false,
          product_no: 'asdf1234',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          original_price: 298000,
          description: '아주 잘 맞는 수트',
        },
        {
          isCheck: false,
          product_no: 'asdf1235',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          description: '아주 잘 맞는 수트',
        },
      ];
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

      await wrapper.find('[data-test="all-checkbox"]').trigger('click');
      const checkboxs = wrapper.findAll('[data-test="cart-item-checkbox"]');

      for (let i = 0; i < checkboxs.length; i += 1) {
        const checkbox = checkboxs[i];
        expect(checkbox.classes()).toContain('checked');
      }
    });
    it('모든 상품이 체크가 된 상태에서 전체 체크박스를 클릭하면 모든 상품의 체크가 해제되는지', async () => {
      const cartItems = [
        {
          isCheck: true,
          product_no: 'asdf1234',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          original_price: 298000,
          description: '아주 잘 맞는 수트',
        },
        {
          isCheck: true,
          product_no: 'asdf1235',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          description: '아주 잘 맞는 수트',
        },
      ];
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

      await wrapper.find('[data-test="all-checkbox"]').trigger('click');
      const checkboxs = wrapper.findAll('[data-test="cart-item-checkbox"]');

      for (let i = 0; i < checkboxs.length; i += 1) {
        const checkbox = checkboxs[i];
        expect(checkbox.classes()).toContain('unchecked');
      }
    });
    it('상품이 하나라도 해제되어 있으면 전체 선택이 비활성화인지', () => {
      const cartItems = [
        {
          isCheck: true,
          product_no: 'asdf1234',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          original_price: 298000,
          description: '아주 잘 맞는 수트',
        },
        {
          isCheck: false,
          product_no: 'asdf1235',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          description: '아주 잘 맞는 수트',
        },
      ];
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

      expect(wrapper.find('[data-test="all-checkbox"]').classes()).toContain('unchecked');
    });
    it('모든 상품이 체크가 된 상태에서 전체 체크박스를 클릭하면 모든 상품의 체크가 해제되는지', () => {
      const cartItems = [
        {
          isCheck: true,
          product_no: 'asdf1234',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          original_price: 298000,
          description: '아주 잘 맞는 수트',
        },
        {
          isCheck: true,
          product_no: 'asdf1235',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          description: '아주 잘 맞는 수트',
        },
      ];
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

      expect(wrapper.find('[data-test="all-checkbox"]').classes()).toContain('checked');
    });
  });
  describe('CartAPI', () => {
    const cartItems = Array(3).fill({
      product_no: 'asdf1234',
      name: '핏이 좋은 수트',
      image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
      price: 198000,
      original_price: 298000,
      description: '아주 잘 맞는 수트',
    });
    cartAPI.get = jest.fn().mockResolvedValue({
      data: {
        cart_item: cartItems,
      },
    });
    const wrapper = mount(CartPage);

    it('cartAPI 호출하는지', async () => {
      await flushPromises();

      expect(cartAPI.get).toHaveBeenCalled();
    });
    it('cartAPI 통해 받은 cartItem만큼 렌더링되는지', async () => {
      await cartAPI.get();
      await flushPromises();

      expect(wrapper.findAllComponents(CartItem)).toHaveLength(cartItems.length);
    });
  });
});
