import { mount } from '@vue/test-utils';
import BuyFloatingActionBtn from '@/components/FloatingActionBtn/BuyFloatingActionBtn.vue';

describe('Floating Action Button', () => {
  const originalPrice = 58000;
  const discountRate = 15;
  const wrapper = mount(BuyFloatingActionBtn, {
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
