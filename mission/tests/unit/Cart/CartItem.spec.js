import { mount } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import CartItem from '@/components/Cart/CartItem.vue';

library.add(fas, far);

describe('CartItem', () => {
  it('renders CartItem', () => {
    const wrapper = mount(CartItem, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('[data-test="cart-item"]').exists()).toBe(true);
  });
  it('필요한 요소들을 렌더링하는지', () => {
    const wrapper = mount(CartItem, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('[data-test="cart-item-checkbox"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cart-item-img"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cart-item-name"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cart-item-description"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cart-item-price"]').exists()).toBeTruthy();
  });
  it('원가가 있으면 원가를 렌더링하는지', () => {
    const wrapper = mount(CartItem, {
      global: {
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
        stubs: { FontAwesomeIcon },
      },
      props: {
        original_price: undefined,
      },
    });

    expect(wrapper.find('[data-test="cart-item-original-price"]').exists()).toBeFalsy();
  });
  it('화면에 적절한 값을 표시하는지', () => {
    const props = {
      isCheck: false,
      product_no: 'test',
      name: 'test-name',
      image: 'test-img',
      price: 3000,
      original_price: 4000,
      description: 'test-description',
    };
    const wrapper = mount(CartItem, {
      global: {
        stubs: { FontAwesomeIcon },
      },
      props: { ...props },
    });

    expect(wrapper.find('[data-test="cart-item-checkbox"]').classes()).toContain('unchecked');
    expect(wrapper.find('[data-test="cart-item-img"]').attributes().src).toBe(props.image);
    expect(wrapper.find('[data-test="cart-item-name"]').text()).toBe(props.name);
    expect(wrapper.find('[data-test="cart-item-description"]').text()).toBe(props.description);
    expect(wrapper.find('[data-test="cart-item-price"]').text()).toBe('3,000원');
    expect(wrapper.find('[data-test="cart-item-original-price"]').text()).toBe('4,000원');
  });
});
