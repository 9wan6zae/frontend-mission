import { mount, flushPromises } from '@vue/test-utils';
import WishPage from '@/views/WishList.vue';
import wishAPI from '@/api/wishAPI';

describe('WishPage', () => {
  it('redners WishPage', () => {
    const wrapper = mount(WishPage);

    expect(wrapper.find('#wish-list-page').exists()).toBe(true);
  });

  it('renders item-list-wrapper', () => {
    const wrapper = mount(WishPage);

    expect(wrapper.find('[data-test="item-list-wrapper"]').exists).toBeTruthy();
  });

  describe('wishAPI', () => {
    const items = Array(3).fill({
      product_no: 'asdf1234',
      name: '핏이 좋은 수트',
      image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
      price: 198000,
      original_price: 298000,
      description: '아주 잘 맞는 수트',
    });
    wishAPI.get = jest.fn().mockResolvedValue({
      data: {
        items,
      },
    });
    const wrapper = mount(WishPage);

    it('wishAPI 호출하는지', async () => {
      await flushPromises();

      expect(wishAPI.get).toHaveBeenCalled();
    });
    it('wishAPI 통해 받은 items만큼 렌더링되는지', async () => {
      await wishAPI.get();
      await flushPromises();

      expect(wrapper.findAll('[data-test="item"]').length).toEqual(items.length);
    });
  });
});
