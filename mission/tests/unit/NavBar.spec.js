import { mount } from '@vue/test-utils';
import NavBar from '@/components/NavBar.vue';

describe('NavBar', () => {
  it('renders NavBar', () => {
    const wrapper = mount(NavBar);

    expect(wrapper.find('#nav-bar').exists()).toBe(true);
  });

  it('renders nav-menu-bar', () => {
    const wrapper = mount(NavBar);

    expect(wrapper.find('[data-test="nav-menu-bar"]').exists()).toBeTruthy();
  });

  it('renders N when there are N nav-menu', () => {
    const navMenu = [
      {
        icon: 'test',
        title: '홈',
      },
      {
        icon: 'test',
        title: '찜',
      },
      {
        icon: 'test',
        title: '장바구니',
      },
      {
        icon: 'test',
        title: '마이페이지',
      },
    ];
    const wrapper = mount(NavBar, {
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
      icon: ['fas', 'star'],
      title: '홈',
    };
    const wrapper = mount(NavBar);

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
      expect(wrapper.find('[data-test="nav-menu-icon"]').attributes().icon).toContain(menu.icon);
    });
  });
});
