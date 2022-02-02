import { mount } from '@vue/test-utils';
import ItemListItem from '@/components/ItemList/Item.vue';

describe('ItemListItem', () => {
  it('redners ItemListItem', () => {
    const wrapper = mount(ItemListItem);

    expect(wrapper.find('.item-list-item').exists()).toBe(true);
  });

  describe('props', () => {
    const item = {
      id: 1,
      img: 'test-img',
      discountRate: 15,
      originalPrice: 10000,
      name: 'test-name',
      description: 'test-description',
    };
    it('delivers the declared properties', () => {
      const wrapper = mount(ItemListItem, {
        propsData: {
          item,
        },
      });

      expect(wrapper.props().item.id).toBe(item.id);
      expect(wrapper.props().item.img).toBe(item.img);
      expect(wrapper.props().item.discountRate).toBe(item.discountRate);
      expect(wrapper.props().item.originalPrice).toBe(item.originalPrice);
      expect(wrapper.props().item.name).toBe(item.name);
      expect(wrapper.props().item.description).toBe(item.description);
    });
  });

  describe('item-img', () => {
    const img = 'testImg';
    const wrapper = mount(ItemListItem);

    beforeEach(async () => {
      await wrapper.setProps({
        item: {
          img,
        },
      });
    });

    it('renders item-img', () => {
      expect(wrapper.find('[data-test="item-img"]').exists()).toBeTruthy();
    });

    it('displays item-img from props', () => {
      expect(wrapper.find('[data-test="item-img"]').attributes().src).toEqual(img);
    });
  });

  describe('price', () => {
    describe('When there is discount-rate', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(ItemListItem, {
          propsData: {
            item: {
              discountRate: 15,
              originalPrice: 58000,
            },
          },
        });
      });
      it('renders discount-rate', () => {
        expect(wrapper.find('[data-test="discount-rate"]').exists()).toBeTruthy();
      });

      it('renders price', () => {
        expect(wrapper.find('[data-test="price"]').exists()).toBeTruthy();
      });

      it('display discount-rate from props', () => {
        expect(wrapper.find('[data-test="discount-rate"]').text()).toBe('15%');
      });

      it('display price from props', () => {
        expect(wrapper.find('[data-test="price"]').text()).toBe('49,300원');
      });
    });

    describe('When there is no discount-rate', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(ItemListItem, {
          propsData: {
            item: {
              originalPrice: 58000,
            },
          },
        });
      });
      it('renders discount-rate', () => {
        expect(wrapper.find('[data-test="discount-rate"]').exists()).toBeFalsy();
      });

      it('renders price', () => {
        expect(wrapper.find('[data-test="price"]').exists()).toBeTruthy();
      });

      it('display price from props', () => {
        expect(wrapper.find('[data-test="price"]').text()).toBe('58,000원');
      });
    });
  });
  describe('item-name', () => {
    let wrapper;
    const item = {
      name: 'test-name',
    };

    beforeEach(() => {
      wrapper = mount(ItemListItem, {
        propsData: {
          item,
        },
      });
    });

    it('renders item-name', () => {
      expect(wrapper.find('[data-test="item-name"]').exists()).toBeTruthy();
    });

    it('displays item-name from props', () => {
      expect(wrapper.find('[data-test="item-name"]').text()).toBe(item.name);
    });
  });

  describe('item-description', () => {
    let wrapper;
    const item = {
      description: 'test-description',
    };

    beforeEach(() => {
      wrapper = mount(ItemListItem, {
        propsData: {
          item,
        },
      });
    });
    it('renders item-description', () => {
      expect(wrapper.find('[data-test="item-description"]').exists()).toBeTruthy();
    });

    it('displays item-description from props', () => {
      expect(wrapper.find('[data-test="item-description"]').text()).toBe(item.description);
    });
  });
});
