import { mount } from '@vue/test-utils';
import ProductInfo from '@/components/ItemInfo/ProductInfo.vue';

describe('ProductInfo', () => {
  it('redners ProductInfo', () => {
    const wrapper = mount(ProductInfo);

    expect(wrapper.find('.product-info-wrapper').exists()).toBe(true);
  });

  describe('Product Info Section', () => {
    let wrapper = mount(ProductInfo);
    it('renders product-name', () => {
      expect(wrapper.find('[data-test="product-name"]').exists()).toBeTruthy();
    });

    it('represents the value entered in product-name', async () => {
      const name = '핏이 좋은 슈트';
      await wrapper.setProps({
        name,
      });

      expect(wrapper.find('[data-test="product-name"]').text()).toBe(name);
    });

    describe('판매가만 있는 경우, discount-rate를 보여주지 않는다', () => {
      const price = 2000;

      beforeEach(() => {
        wrapper = mount(ProductInfo, {
          props: {
            price,
          },
        });
      });

      it('renders sales-price', () => {
        expect(wrapper.find('[data-test="sales-price"]').exists()).toBeTruthy();
      });

      it('shows original-price for the value of sales-price', () => {
        expect(wrapper.find('[data-test="sales-price"]').text()).toEqual('2,000원');
      });

      it('hides original-price', async () => {
        expect(wrapper.find('[data-test="original-price"]').exists()).toBeFalsy();
      });

      it('hides discount-rate', async () => {
        expect(wrapper.find('[data-test="discount-rate"]').exists()).toBeFalsy();
      });
    });
    describe('원가가 있는 경우, discount-rate와 original-price는 보여주고 할인율을 계산한다', () => {
      const originalPrice = 58000;
      const price = 49300;

      beforeEach(() => {
        wrapper = mount(ProductInfo, {
          props: {
            original_price: originalPrice,
            price,
          },
        });
      });
      it('renders sales-price', () => {
        expect(wrapper.find('[data-test="sales-price"]').exists()).toBeTruthy();
      });

      it('shows correct sales-price', () => {
        expect(wrapper.find('[data-test="sales-price"]').text()).toEqual('49,300원');
      });

      it('renders original-price', () => {
        expect(wrapper.find('[data-test="original-price"]').exists()).toBeTruthy();
      });

      it('renders discount-rate', () => {
        expect(wrapper.find('[data-test="discount-rate"]').exists()).toBeTruthy();
      });

      it('shows correct discount-rate', () => {
        expect(wrapper.find('[data-test="discount-rate"]').text()).toEqual('15%');
      });
    });
  });

  describe('Detail Product Info Section', () => {
    it('shows the entered string in product-info', async () => {
      const wrapper = mount(ProductInfo);
      const description = '<h1>Heading</h1>';
      await wrapper.setProps({
        description,
      });

      expect(wrapper.find('[data-test="product-info"]').html()).toContain(description);
    });
  });
});
