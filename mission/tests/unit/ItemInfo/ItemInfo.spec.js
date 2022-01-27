import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';

describe('ItemInfoPage', () => {
  it('redners ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });

  // describe('Floating Action Button', () => {
  //   const wrapper = mount(ItemInfoPage);
  //   it('renders floating-action-btn', () => {
  //     expect(wrapper.find('[data-test="floating-action-btn"]').exists()).toBeTruthy();
  //   });

  //   it('shows sales-price in floating-action-btn', async () => {
  //     const originalPrice = 58000;
  //     const discountRate = 15;
  //     await wrapper.setData({
  //       itemInfo: {
  //         originalPrice,
  //         discountRate,
  //       },
  //     });

  //     expect(wrapper.find('[data-test="floating-action-btn"]').text()).toContain('49,300원');
  //   });
  // });
});
