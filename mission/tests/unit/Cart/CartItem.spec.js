import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import cart from '@/store/modules/cart';

import CartPage from '@/views/Cart.vue';
import CartItem from '@/components/Cart/CartItem.vue';

library.add(fas, far);

const props = {
  index: 0,
  is_check: true,
  quantity: 1,
  product_no: 'test',
  name: 'test-name',
  image: 'test-img',
  price: 3000,
  original_price: 4000,
  description: 'test-description',
};

const items = [
  {
    product_no: 'asdf1235',
    is_check: true,
    quantity: 1,
    name: '핏이 좋은 수트',
    image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
    price: 3000,
    original_price: 4000,
    description: '아주 잘 맞는 수트',
  },
];

const customCart = { ...cart };
customCart.state.items = items;

const store = createStore({
  modules: {
    cart: customCart,
  },
});

describe('CartItem', () => {
  it('renders CartItem', () => {
    const wrapper = mount(CartItem, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('[data-test="cart-item"]').exists()).toBe(true);
  });
  it('필요한 요소들을 렌더링하는지', () => {
    const wrapper = mount(CartItem, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('[data-test="cart-item-checkbox"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cart-item-img"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cart-item-name"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cart-item-description"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cart-item-price"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cart-item-quantity"]').exists()).toBeTruthy();
  });
  it('원가가 있으면 원가를 렌더링하는지', () => {
    const wrapper = mount(CartItem, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
      props: {
        original_price: 1000,
      },
    });

    expect(wrapper.find('[data-test="cart-item-original-price"]').exists()).toBeTruthy();
  });
  it('원가가 없으면 원가를 렌더링 안하는지', () => {
    const wrapper = mount(CartItem, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
      props: {
        original_price: undefined,
      },
    });

    expect(wrapper.find('[data-test="cart-item-original-price"]').exists()).toBeFalsy();
  });
  it('화면에 적절한 값을 표시하는지', () => {
    const wrapper = mount(CartItem, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
      props: { ...props },
    });

    expect(wrapper.find('[data-test="cart-item-checkbox"]').classes()).toContain('checked');
    expect(wrapper.find('[data-test="cart-item-img"]').attributes().src).toBe(props.image);
    expect(wrapper.find('[data-test="cart-item-name"]').text()).toBe(props.name);
    expect(wrapper.find('[data-test="cart-item-description"]').text()).toBe(props.description);
    expect(wrapper.find('[data-test="cart-item-price"]').text()).toBe('3,000원');
    expect(wrapper.find('[data-test="cart-item-original-price"]').text()).toBe('4,000원');
  });
  it('수량을 변경했을 때 가격이 변경되는지', async () => {
    const cartPageWrapper = mount(CartPage, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
    });
    const wrapper = mount(CartItem, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
      props: { ...props },
    });

    // 상품 가격이 3,000원일 때, 처음엔 수량 한 개일 때의 가격인 '3,000원 구매'가 표시
    expect(cartPageWrapper.find('[data-test="floating-action-btn"]').text()).toBe('3,000원 구매');

    await wrapper.find('[data-test="cart-item-quantity"]').setValue(3);

    // 수량을 3개로 변경했을 때 가격이 9,000원으로 변경되었기 때문에 '9,000원 구매'가 표시
    expect(cartPageWrapper.find('[data-test="floating-action-btn"]').text()).toBe('9,000원 구매');
  });
});
