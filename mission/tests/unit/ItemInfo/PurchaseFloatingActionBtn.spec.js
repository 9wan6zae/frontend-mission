import { mount } from '@vue/test-utils';
import PurchaseFloatingActionBtn from '@/components/FloatingActionBtn/PurchaseFloatingActionBtn.vue';

describe('Floating Action Button', () => {
  const originalPrice = 58000;
  const discountRate = 15;
  const wrapper = mount(PurchaseFloatingActionBtn, {
    props: {
      originalPrice,
      discountRate,
    },
  });
  it('renders floating-action-btn', () => {
    expect(wrapper.find('[data-test="floating-action-btn"]').exists()).toBeTruthy();
  });

  it('shows sales-price in floating-action-btn', () => {
    console.log(wrapper.html());
    expect(wrapper.find('[data-test="floating-action-btn"]').text()).toContain('49,300원');
  });
});