import { flushPromises, mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import cart from '@/store/modules/cart';

import App from '@/App.vue';
import OrderPage from '@/views/Order.vue';
import CompletePage from '@/views/Complete.vue';

library.add(fas, far);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/order',
      component: OrderPage,
    },
    {
      path: '/complete',
      component: CompletePage,
    },
  ],
});

const customer = [
  {
    title: '주문자명',
    value: '',
  },
  {
    title: '전화번호',
    value: '',
  },
  {
    title: '수령주소',
    value: '',
  },
];

const methodSelect = [
  {
    title: '배송방법',
    key: 'shipping',
    methods: [
      {
        title: 'test',
        icon: ['fas', 'box'],
      },
      {
        title: 'test2',
        icon: ['fas', 'shipping-fast'],
      },
    ],
  },
  {
    title: '결제방법',
    key: 'pay',
    methods: [
      {
        title: 'test',
        icon: ['fas', 'box'],
      },
      {
        title: 'test2',
        icon: ['fas', 'shipping-fast'],
      },
    ],
  },
];

const customCart = { ...cart };
describe('OrderPage', () => {
  it('renders OrderPage', () => {
    customCart.state.cart_items = [{
      product_no: 'asdf1235',
      is_check: true,
      quantity: 2,
      name: '핏이 좋은 수트',
      image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
      price: 3000,
      original_price: 4000,
      description: '아주 잘 맞는 수트',
    }];
    const store = createStore({
      modules: {
        cart: customCart,
      },
    });
    const wrapper = mount(OrderPage, {
      global: {
        plugins: [store, router],
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('#order-page').exists()).toBeTruthy();
  });
  it('결제 버튼을 눌렀을 때 complete page로 이동하는지', async () => {
    customCart.state.cart_items = [{
      product_no: 'asdf1235',
      is_check: true,
      quantity: 2,
      name: '핏이 좋은 수트',
      image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
      price: 3000,
      original_price: 4000,
      description: '아주 잘 맞는 수트',
    }];
    const store = createStore({
      modules: {
        cart: customCart,
      },
    });
    router.push('/order');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router, store],
      },
    });

    await wrapper.find('[data-test="floating-action-btn"]').trigger('click');
    await flushPromises();

    expect(wrapper.find('#complete-page').exists()).toBeTruthy();
  });

  describe('필요한 요소들을 렌더링하는지', () => {
    let wrapper;
    let items;
    beforeEach(() => {
      items = [{
        product_no: 'asdf1235',
        is_check: true,
        quantity: 2,
        name: '핏이 좋은 수트',
        image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
        price: 3000,
        original_price: 4000,
        description: '아주 잘 맞는 수트',
      }];
      customCart.state.cart_items = items;
      const store = createStore({
        modules: {
          cart: customCart,
        },
      });
      wrapper = mount(OrderPage, {
        global: {
          plugins: [store, router],
          stubs: { FontAwesomeIcon },
        },
        data() {
          return {
            customer,
            methodSelect,
          };
        },
      });
    });
    it('주문자 정보 섹션', () => {
      expect(wrapper.findAll('[data-test="customer-info"]')).toHaveLength(customer.length);
      expect(wrapper.findAll('[data-test="customer-info-title"]')).toHaveLength(customer.length);
      expect(wrapper.findAll('[data-test="customer-info-input"]')).toHaveLength(customer.length);
    });
    it('주문 내역 섹션', () => {
      expect(wrapper.findAll('[data-test="summary-info"]')).toHaveLength(items.length);
      expect(wrapper.findAll('[data-test="summary-name"]')).toHaveLength(items.length);
      expect(wrapper.findAll('[data-test="summary-quantity"]')).toHaveLength(items.length);
      expect(wrapper.findAll('[data-test="summary-price"]')).toHaveLength(items.length);
    });
    it('방법 선택 섹션', () => {
      expect(wrapper.findAll('[data-test="method-wrapper"]')).toHaveLength(4);
      expect(wrapper.findAll('[data-test="method-icon"]')).toHaveLength(4);
      expect(wrapper.findAll('[data-test="method-title"]')).toHaveLength(4);
    });
    it('결제 버튼', () => {
      expect(wrapper.find('[data-test="floating-action-btn"]').exists()).toBeTruthy();
    });
  });

  describe('vuex 또는 data로 선언된 값들이 보여지는지', () => {
    let wrapper;
    let items;
    beforeEach(() => {
      items = [{
        product_no: 'asdf1235',
        is_check: true,
        quantity: 2,
        name: '핏이 좋은 수트',
        image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
        price: 3000,
        original_price: 4000,
        description: '아주 잘 맞는 수트',
      }];
      customCart.state.cart_items = items;
      const store = createStore({
        modules: {
          cart: customCart,
        },
      });
      wrapper = mount(OrderPage, {
        global: {
          plugins: [store, router],
          stubs: { FontAwesomeIcon },
        },
        data() {
          return {
            customer,
            methodSelect,
          };
        },
      });
    });

    it('data로 선언된 고객 정보 입력의 제목이 보여지는가', () => {
      const customerTitles = wrapper.findAll('[data-test="customer-info-title"]');

      for (let i = 0; i < customerTitles.length; i += 1) {
        const customerTitle = customerTitles[i];
        expect(customerTitle.text()).toBe(customer[i].title);
      }
    });
    it('vuex로부터 받은 값이 주문내역으로써 보여지는가', () => {
      const names = wrapper.findAll('[data-test="summary-name"]');
      const quantities = wrapper.findAll('[data-test="summary-quantity"]');
      const prices = wrapper.findAll('[data-test="summary-price"]');

      for (let i = 0; i < names.length; i += 1) {
        const name = names[i];
        expect(name.text()).toBe(items[i].name);
      }
      // 수량 뒤에 '개'가 붙은 포맷으로 보여지는가
      for (let i = 0; i < quantities.length; i += 1) {
        const quantity = quantities[i];
        expect(quantity.text()).toBe(`${items[i].quantity}개`);
      }
      // 수량 * 가격을 1000단위 쉼표 붙이는 포맷으로 보여지는가
      for (let i = 0; i < prices.length; i += 1) {
        const price = prices[i];
        expect(price.text()).toBe('6,000원');
      }
    });

    it('data로 선언된 방법 선택 섹션이 보여지는가', () => {
      const icons = wrapper.findAll('[data-test="method-icon"]');
      const titles = wrapper.findAll('[data-test="method-title"]');
      const selectIndex = (i) => Math.floor(i / 2);
      const methodIndex = (i) => (i % 2 === 0 ? 0 : 1);

      for (let i = 0; i < icons.length; i += 1) {
        const icon = icons[i];
        expect(icon.html()).toContain(methodSelect[selectIndex(i)].methods[methodIndex(i)].icon[1]);
      }
      for (let i = 0; i < titles.length; i += 1) {
        const title = titles[i];
        expect(title.text()).toBe(methodSelect[selectIndex(i)].methods[methodIndex(i)].title);
      }
    });
    it('vuex를 통해 받아온 금액이 버튼에 작성되어 있는가', () => {
      expect(wrapper.find('[data-test="floating-action-btn"]').text()).toBe('6,000원 결제');
    });
  });
  describe('정보를 다 입력하면 결제 버튼이 보이는지', () => {
    let wrapper;
    beforeEach(() => {
      customCart.state.cart_items = [{
        product_no: 'asdf1235',
        is_check: true,
        quantity: 2,
        name: '핏이 좋은 수트',
        image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
        price: 3000,
        original_price: 4000,
        description: '아주 잘 맞는 수트',
      }];
      const store = createStore({
        modules: {
          cart: customCart,
        },
      });
      wrapper = mount(OrderPage, {
        global: {
          plugins: [store, router],
          stubs: { FontAwesomeIcon },
        },
        data() {
          return {
            customer,
            methodSelect,
          };
        },
      });
    });
    afterEach(async () => {
      const inputs = wrapper.findAll('[data-test="customer-info-input"]');

      for (let i = 0; i < inputs.length; i += 1) {
        const input = inputs[i];
        input.setValue('');
      }
      await flushPromises();
    });
    it('정보를 입력하지 않아 보이지 않은 상태인가', () => {
      expect(wrapper.find('[data-test="floating-action-btn"]').isVisible()).toBeFalsy();
    });
    it('주문자 정보만 입력했을 때 결제 버튼이 보이지 않는지', async () => {
      const inputs = wrapper.findAll('[data-test="customer-info-input"]');

      for (let i = 0; i < inputs.length; i += 1) {
        const input = inputs[i];
        input.setValue('test');
      }
      await flushPromises();

      expect(wrapper.find('[data-test="floating-action-btn"]').isVisible()).toBeFalsy();
    });
    it('방법 선택만 했을 때 결제 버튼이 보이지 않는지', async () => {
      const methodBtn = wrapper.findAll('[data-test="method-wrapper"]');

      await methodBtn[0].trigger('click');
      await methodBtn[3].trigger('click');
      await flushPromises();

      expect(wrapper.find('[data-test="floating-action-btn"]').isVisible()).toBeFalsy();
    });
    it('모든 정보를 입력했을 때 결제 버튼이 보이는지', async () => {
      const inputs = wrapper.findAll('[data-test="customer-info-input"]');
      const methodBtn = wrapper.findAll('[data-test="method-wrapper"]');

      for (let i = 0; i < inputs.length; i += 1) {
        const input = inputs[i];
        input.setValue('test');
      }
      await flushPromises();
      await methodBtn[0].trigger('click');
      await methodBtn[3].trigger('click');
      await flushPromises();

      expect(wrapper.find('[data-test="floating-action-btn"]').isVisible()).toBeTruthy();
    });
  });
});
