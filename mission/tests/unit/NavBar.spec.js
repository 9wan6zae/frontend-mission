import { mount } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import NavBar from '@/components/NavBar.vue';

library.add(fas, far);

describe('NavBar', () => {
  it('renders NavBar', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('#nav-bar').exists()).toBe(true);
  });

  it('renders nav-menu-bar', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('[data-test="nav-menu-bar"]').exists()).toBeTruthy();
  });

  it('renders N when there are N nav-menu', () => {
    const navMenu = [
      {
        icon: 'home',
        title: '홈',
      },
      {
        icon: 'heart',
        title: '찜',
      },
      {
        icon: 'shopping-cart',
        title: '장바구니',
      },
      {
        icon: 'user',
        title: '마이페이지',
      },
    ];
    const wrapper = mount(NavBar, {
      global: {
        stubs: { FontAwesomeIcon },
      },
      data() {
        return {
          navMenu,
        };
      },
    });

    expect(wrapper.findAll('[data-test="nav-menu"]').length).toBe(navMenu.length);
  });

  describe('nav-menu', () => {
    const menu = {
      icon: ['fas', 'heart'],
      title: '홈',
    };
    const wrapper = mount(NavBar, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    beforeEach(async () => {
      await wrapper.setData({
        navMenu: [
          menu,
        ],
      });
    });
    it('renders nav-menu-icon', () => {
      expect(wrapper.find('[data-test="nav-menu-icon"]').exists()).toBeTruthy();
    });

    it('renders nav-menu-title', () => {
      expect(wrapper.find('[data-test="nav-menu-title"]').exists()).toBeTruthy();
    });

    it('displays nav-menu-title from data', () => {
      expect(wrapper.find('[data-test="nav-menu-title"]').text()).toBe(menu.title);
    });

    it('displays nav-menu-icon from data', () => {
      expect(wrapper.find('[data-test="nav-menu-icon"]').html()).toContain(menu.icon[1]);
    });
  });

  it('메뉴 버튼을 클릭하면 라우팅되는지', async () => {
    const navMenu = [
      {
        icon: ['fas', 'heart'],
        title: '찜',
        path: '/wish',
      },
    ];
    const mockRouter = {
      push: jest.fn(),
    };
    const wrapper = mount(NavBar, {
      global: {
        stubs: { FontAwesomeIcon },
        mocks: {
          $router: mockRouter,
        },
      },
      data() {
        return {
          navMenu,
        };
      },
    });

    await wrapper.find('[data-test="nav-menu"]').trigger('click');

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/wish');
  });
});
