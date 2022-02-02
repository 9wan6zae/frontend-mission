import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';
import ItemMainImg from '@/components/ItemInfo/ItemMainImg.vue';
import SellerInfo from '@/components/ItemInfo/SellerInfo.vue';
import ProductInfo from '@/components/ItemInfo/ProductInfo.vue';
import ReviewInfo from '@/components/ItemInfo/ReviewInfo.vue';
import PurchaseFloatingActionBtn from '@/components/FloatingActionBtn/PurchaseFloatingActionBtn.vue';

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
});
