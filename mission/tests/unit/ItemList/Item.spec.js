import { mount } from '@vue/test-utils';
import ItemListItem from '@/components/ItemList/Item.vue';

jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

describe('ItemListItem', () => {
  it('redners ItemListItem', () => {
    const wrapper = mount(ItemListItem);

    expect(wrapper.find('.item-list-item').exists()).toBe(true);
  });

  describe('item-img', () => {
    const image = 'testImg';
    const wrapper = mount(ItemListItem);

    beforeEach(async () => {
      await wrapper.setProps({
        image,
      });
    });

    it('renders item-img', () => {
      expect(wrapper.find('[data-test="item-img"]').exists()).toBeTruthy();
    });

    it('displays item-img from props', () => {
      expect(wrapper.find('[data-test="item-img"]').attributes().src).toEqual(image);
    });
  });

  describe('price', () => {
    describe('원가와 판매가 둘 다 있을 때', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(ItemListItem, {
          props: {
            price: 49300,
            original_price: 58000,
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

    describe('판매가만 있을 때', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(ItemListItem, {
          props: {
            price: 58000,
          },
        });
      });
      it('doesnt renders discount-rate', () => {
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
        props: { ...item },
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
        props: { ...item },
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
