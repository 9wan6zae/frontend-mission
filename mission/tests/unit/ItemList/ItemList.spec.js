import { mount } from '@vue/test-utils';
import ItemListPage from '@/views/ItemList.vue';

describe('ItemListPage', () => {
  it('redners ItemListPage', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('#item-list-page').exists()).toBe(true);
  });

  it('renders item-list-wrapper', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('[data-test="item-list-wrapper"]').exists).toBeTruthy();
  });

  it('renders N when there are N item', () => {
    const items = [
      {
        id: 1,
        img: 'test-img',
        discountRate: 15,
        originalPrice: 10000,
        name: 'test-name',
        description: 'test-description',
      },
      {
        id: 2,
        img: 'test-img',
        discountRate: 15,
        originalPrice: 10000,
        name: 'test-name',
        description: 'test-description',
      },
      {
        id: 3,
        img: 'test-img',
        discountRate: 15,
        originalPrice: 10000,
        name: 'test-name',
        description: 'test-description',
      },
    ];
    const wrapper = mount(ItemListPage, {
      data() {
        return {
          items,
        };
      },
    });

    expect(wrapper.findAll('[data-test="item"]').length).toEqual(items.length);
  });
});
