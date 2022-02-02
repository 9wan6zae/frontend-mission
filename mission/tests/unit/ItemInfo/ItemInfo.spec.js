import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';
import ItemMainImg from '@/components/ItemInfo/ItemMainImg.vue';
import SellerInfo from '@/components/ItemInfo/SellerInfo.vue';
import ProductInfo from '@/components/ItemInfo/ProductInfo.vue';
import ReviewInfo from '@/components/ItemInfo/ReviewInfo.vue';
import PurchaseFloatingActionBtn from '@/components/FloatingActionBtn/PurchaseFloatingActionBtn.vue';
import itemAPI from '@/api/itemAPI';

describe('ItemInfoPage', () => {
  it('redners ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });

  it('renders ItemMainImg', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.findComponent(ItemMainImg)).toBeTruthy();
  });

  it('renders SellerInfo', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.findComponent(SellerInfo)).toBeTruthy();
  });

  it('renders ProductInfo', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.findComponent(ProductInfo)).toBeTruthy();
  });

  it('renders ReviewInfo', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.findComponent(ReviewInfo)).toBeTruthy();
  });

  it('renders PurchaseFloatingActionBtn', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.findComponent(PurchaseFloatingActionBtn)).toBeTruthy();
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
    itemAPI.get = jest.fn().mockResolvedValue({
      data: {
        item,
      },
    });
    const wrapper = mount(ItemInfoPage);

    it('itemAPI 호출하는지', (done) => {
      wrapper.vm.$nextTick(async () => {
        expect(itemAPI.get).toHaveBeenCalled();
        done();
      });
    });
    it('itemAPI를 통해 받은 item을 렌더링되는지', async (done) => {
      wrapper.vm.$nextTick(async () => {
        expect(itemAPI.get).toHaveBeenCalled();
        await itemAPI.get(item.product_no);
        expect(wrapper.find('[data-test="product-name"]').text()).toBe('핏이 좋은 수트');
        expect(wrapper.find('[data-test="discount-rate"]').text()).toBe('34%');
        expect(wrapper.find('[data-test="discount-rate"]').text()).toBe('34%');
        expect(wrapper.find('[data-test="original-price"]').text()).toBe('298,000원');
        expect(wrapper.find('[data-test="sales-price"]').text()).toBe('198,000원');
        done();
      });
    });
  });
});
