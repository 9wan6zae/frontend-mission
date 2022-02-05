import { mount, flushPromises } from '@vue/test-utils';
import ItemListPage from '@/views/ItemList.vue';
import itemAPI from '@/repositories/ItemRepository';

describe('ItemListPage', () => {
  it('redners ItemListPage', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('#item-list-page').exists()).toBe(true);
  });

  it('renders item-list-wrapper', () => {
    const wrapper = mount(ItemListPage);

    expect(wrapper.find('[data-test="item-list-wrapper"]').exists).toBeTruthy();
  });

  describe('ItemAPI', () => {
    const items = Array(3).fill({
      product_no: 'asdf1234',
      name: '핏이 좋은 수트',
      image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
      price: 198000,
      original_price: 298000,
      description: '아주 잘 맞는 수트',
    });
    itemAPI.get = jest.fn().mockResolvedValue({
      data: {
        items,
      },
    });
    const wrapper = mount(ItemListPage);

    it('itemAPI 호출하는지', async () => {
      await flushPromises();

      expect(itemAPI.get).toHaveBeenCalled();
    });
    it('itemAPI를 통해 받은 items만큼 렌더링되는지', async () => {
      await itemAPI.get();
      await flushPromises();

      expect(wrapper.findAll('[data-test="item"]').length).toEqual(items.length);
    });
    it('itemAPI를 통해 받은 데이터를 보여주는지', async () => {
      await itemAPI.get();
      await flushPromises();

      const renderedItems = wrapper.findAll('[data-test="item"]');

      for (let i = 0; i < renderedItems.length; i += 1) {
        const renderedItem = renderedItems[i];
        expect(renderedItem.find('[data-test="item-name"]').text()).toEqual(items[i].name);
        expect(renderedItem.find('[data-test="item-description"]').text()).toEqual(items[i].description);
        expect(renderedItem.find('[data-test="item-img"]').attributes().src).toEqual(items[i].image);
        expect(renderedItem.find('[data-test="price"]').text()).toEqual('198,000원');
        expect(renderedItem.find('[data-test="discount-rate"]').text()).toEqual('34%');
      }
    });
  });
});
