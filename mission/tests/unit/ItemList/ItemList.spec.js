import { mount } from '@vue/test-utils';
import ItemListPage from '@/views/ItemList.vue';

describe('ItemListPage', () => {
  it('redners ItemListPage', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('#item-list-page').exists()).toBe(true);
  });
});
