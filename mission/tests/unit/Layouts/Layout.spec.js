import { mount } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import AppHeader from '@/components/AppHeader.vue';
import NavBar from '@/components/NavBar.vue';
import Layout from '@/components/Layouts/Layout.vue';

library.add(fas, far);

describe('Layout', () => {
  it('renders Layout', () => {
    const wrapper = mount(Layout, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('#layout').exists()).toBe(true);
  });

  describe('App Header', () => {
    it('헤더를 렌더링하는지', () => {
      const wrapper = mount(Layout, {
        global: {
          stubs: { FontAwesomeIcon },
        },
      });

      expect(wrapper.findComponent(AppHeader)).toBeTruthy();
    });

    it('props로 받은 menu-name을 그대로 표시하는지', () => {
      const menuName = 'SomeMenu';
      const wrapper = mount(Layout, {
        global: {
          stubs: { FontAwesomeIcon },
        },
        props: {
          menuName,
        },
      });

      expect(wrapper.find('[data-test="menu-name"]').text()).toBe(menuName);
    });
  });

  describe('Nav Bar', () => {
    it('Nav Bar를 렌더링하는지', () => {
      const wrapper = mount(Layout, {
        global: {
          stubs: { FontAwesomeIcon },
        },
      });

      expect(wrapper.findComponent(NavBar)).toBeTruthy();
    });

    it('Nav Bar를 렌더링하는지', () => {
      const wrapper = mount(Layout, {
        global: {
          stubs: { FontAwesomeIcon },
        },
      });

      expect(wrapper.findComponent(NavBar)).toBeTruthy();
    });

    it('props로 받은 nav가 true일 때 nav를 표시하는지', () => {
      const wrapper = mount(Layout, {
        global: {
          stubs: { FontAwesomeIcon },
        },
        props: {
          nav: true,
        },
      });

      expect(wrapper.find('[data-test="nav-menu-bar"]').exists()).toBeTruthy();
    });

    it('props로 받은 nav가 false일 때 nav를 표시 안하는지', () => {
      const wrapper = mount(Layout, {
        global: {
          stubs: { FontAwesomeIcon },
        },
        props: {
          nav: false,
        },
      });

      expect(wrapper.find('[data-test="nav-menu-bar"]').exists()).toBeFalsy();
    });
  });

  describe('Prev Button', () => {
    it('props로 받은 prev가 true일 때 prev 버튼을 표시 하는지', () => {
      const wrapper = mount(Layout, {
        global: {
          stubs: { FontAwesomeIcon },
        },
        props: {
          prev: true,
        },
      });

      expect(wrapper.find('[data-test="prev-btn"]').exists()).toBeTruthy();
    });

    it('props로 받은 prev가 false일 때 prev 버튼을 표시 안하는지', () => {
      const wrapper = mount(Layout, {
        global: {
          stubs: { FontAwesomeIcon },
        },
        props: {
          prev: false,
        },
      });

      expect(wrapper.find('[data-test="prev-btn"]').exists()).toBeFalsy();
    });

    it('prev 버튼을 클릭했을 때 뒤로가기 동작을 수행하는지', async () => {
      const wrapper = mount(Layout, {
        global: {
          stubs: { FontAwesomeIcon },
        },
        props: {
          prev: true,
        },
      });

      jest.spyOn(window.history, 'back').mockImplementation(() => {});

      await wrapper.get('[data-test="prev-btn"]').trigger('click');

      expect(window.history.back).toBeCalled();
    });
  });
});
