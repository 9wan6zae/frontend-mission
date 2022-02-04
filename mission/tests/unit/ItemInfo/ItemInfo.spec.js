import { mount, flushPromises } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';
import ItemMainImg from '@/components/ItemInfo/ItemMainImg.vue';
import SellerInfo from '@/components/ItemInfo/SellerInfo.vue';
import ProductInfo from '@/components/ItemInfo/ProductInfo.vue';
import ReviewInfo from '@/components/ItemInfo/ReviewInfo.vue';
import PurchaseFloatingActionBtn from '@/components/FloatingActionBtn/PurchaseFloatingActionBtn.vue';
import itemAPI from '@/api/itemAPI';

const mockRoute = {
  params: {
    id: 1,
  },
};

describe('ItemInfoPage', () => {
  it('redners ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });

  it('renders ItemMainImg', () => {
    const wrapper = mount(ItemInfoPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(wrapper.findComponent(ItemMainImg)).toBeTruthy();
  });

  it('renders SellerInfo', () => {
    const wrapper = mount(ItemInfoPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(wrapper.findComponent(SellerInfo)).toBeTruthy();
  });

  it('renders ProductInfo', () => {
    const wrapper = mount(ItemInfoPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(wrapper.findComponent(ProductInfo)).toBeTruthy();
  });

  it('renders ReviewInfo', () => {
    const wrapper = mount(ItemInfoPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(wrapper.findComponent(ReviewInfo)).toBeTruthy();
  });

  it('renders PurchaseFloatingActionBtn', () => {
    const wrapper = mount(ItemInfoPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    expect(wrapper.findComponent(PurchaseFloatingActionBtn)).toBeTruthy();
  });

  describe('Loading Content', () => {
    it('로딩 중일 때 LoadingContent를 보여준다.', () => {
      const wrapper = mount(ItemInfoPage, {
        global: {
          mocks: {
            $route: mockRoute,
          },
        },
        data() {
          return {
            loading: true,
          };
        },
      });

      expect(wrapper.find('[data-test="item-info-content"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test="loading-content"]').exists()).toBeTruthy();
    });

    it('로딩이 완료되면 원래의 Content를 보여준다.', async () => {
      const item = {
        product_no: 'asdf1234',
        name: '핏이 좋은 수트',
        image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
        price: 198000,
        original_price: 298000,
        description: '아주 잘 맞는 수트',
      };
      itemAPI.getItem = jest.fn().mockResolvedValue({
        data: {
          item,
        },
      });
      const wrapper = mount(ItemInfoPage, {
        global: {
          mocks: {
            $route: mockRoute,
          },
        },
        data() {
          return {
            item: {},
            loading: false,
          };
        },
      });

      await itemAPI.getItem(item.product_no);
      await flushPromises();

      expect(wrapper.find('[data-test="item-info-content"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test="loading-content"]').exists()).toBeFalsy();
    });
  });

  describe('ItemAPI', () => {
    const item = {
      product_no: 'asdf1234',
      name: '핏이 좋은 수트',
      image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
      price: 198000,
      original_price: 298000,
      description: '아주 잘 맞는 수트',
    };
    itemAPI.getItem = jest.fn().mockResolvedValue({
      data: {
        item,
      },
    });
    const wrapper = mount(ItemInfoPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    it('itemAPI 호출하는지', async () => {
      await flushPromises();

      expect(itemAPI.getItem).toHaveBeenCalled();
    });
    it('itemAPI를 통해 받은 item을 렌더링되는지', async () => {
      await itemAPI.getItem(item.product_no);
      await flushPromises();

      expect(wrapper.find('[data-test="product-name"]').text()).toBe('핏이 좋은 수트');
      expect(wrapper.find('[data-test="discount-rate"]').text()).toBe('34%');
      expect(wrapper.find('[data-test="original-price"]').text()).toBe('298,000원');
      expect(wrapper.find('[data-test="sales-price"]').text()).toBe('198,000원');
    });
  });
});
