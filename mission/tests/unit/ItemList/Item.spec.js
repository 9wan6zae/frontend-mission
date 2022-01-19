import { mount } from '@vue/test-utils';
import ItemListItem from '@/components/ItemList/Item.vue';

describe('ItemListItem', () => {
  it('redners ItemListItem', () => {
    const wrapper = mount(ItemListItem);

    expect(wrapper.find('.item-list-item').exists()).toBe(true);
  });
});
