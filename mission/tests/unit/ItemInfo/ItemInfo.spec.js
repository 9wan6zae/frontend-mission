import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';

describe('ItemInfoPage', () => {
  it('redners ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });
});

describe('Price Section', () => {
  const wrapper = mount(ItemInfoPage);
  it('renders product-name', () => {
    expect(wrapper.find('[data-test="product-name"]').exists()).toBeTruthy();
  });

  it('represents the value entered in product-name', async () => {
    const productName = '핏이 좋은 슈트';
    await wrapper.setData({
      itemInfo: {
        productName,
      },
    });

    expect(wrapper.find('[data-test="product-name"]').text()).toBe(productName);
  });

  describe('원가와 판매가가 같을 경우, discount-rate와 original-price는 보여주지 않는다.', () => {
    const price = 2000;

    beforeEach(async () => {
      await wrapper.setData({
        itemInfo: {
          originalPrice: price,
          salesPrice: price,
        },
      });
    });

    it('renders sales-price', () => {
      expect(wrapper.find('[data-test="sales-price"]').exists()).toBeTruthy();
    });

    it('hides original-price', async () => {
      expect(wrapper.find('[data-test="original-price"]').exists()).toBeFalsy();
    });

    it('hides discount-rate', async () => {
      expect(wrapper.find('[data-test="discount-rate"]').exists()).toBeFalsy();
    });
  });
  describe('원가와 판매가가 다를 경우, discount-rate와 original-price는 보여주고 할인율을 계산한다.', () => {
    const originalPrice = 2000;
    const salesPrice = 1000;
    const discountRate = `${Math.floor((salesPrice / originalPrice) * 100)}%`;

    beforeEach(async () => {
      await wrapper.setData({
        itemInfo: {
          originalPrice,
          salesPrice,
        },
      });
    });
    it('renders sales-price', () => {
      expect(wrapper.find('[data-test="sales-price"]').exists()).toBeTruthy();
    });

    it('renders original-price', () => {
      expect(wrapper.find('[data-test="original-price"]').exists()).toBeTruthy();
    });

    it('renders discount-rate', () => {
      expect(wrapper.find('[data-test="discount-rate"]').exists()).toBeTruthy();
    });

    it('shows original-price', async () => {
      expect(wrapper.find('[data-test="original-price"]').isVisible()).toBeTruthy();
    });

    it('shows discount-rate', async () => {
      expect(wrapper.find('[data-test="discount-rate"]').isVisible()).toBeTruthy();
    });

    it('shows correct discount-rate', () => {
      expect(wrapper.find('[data-test="discount-rate"]').text()).toBe(discountRate);
    });
  });
});
