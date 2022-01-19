import { mount } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader.vue';

describe('AppHeader', () => {
  it('renders AppHeader', () => {
    const wrapper = mount(AppHeader);

    expect(wrapper.find('#app-header').exists()).toBe(true);
  });

  it('renders header-title', () => {
    const wrapper = mount(AppHeader);

    expect(wrapper.find('[data-test="header-title"]').exists()).toBeTruthy();
  });

  it('displays header-title', () => {
    const title = '9wanZae\'s shop';
    const wrapper = mount(AppHeader, {
      data() {
        return {
          title,
        };
      },
    });

    expect(wrapper.find('[data-test="header-title"]').text()).toBe(title);
  });
});
