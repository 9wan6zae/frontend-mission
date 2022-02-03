import { mount } from '@vue/test-utils';
import ListLayout from '@/components/Layouts/ListLayout.vue';
import LoadingItem from '@/components/Loading/LoadingItem.vue';

describe('ListLayout', () => {
  it('redners ListLayout', () => {
    const wrapper = mount(ListLayout);

    expect(wrapper.find('[data-test="item-list-wrapper"]').exists()).toBe(true);
  });
  it('로딩이 끝냈을 때 items을 items 개수만큼 보여준다', () => {
    const itemsLength = 3;
    const items = Array(itemsLength).fill({
      product_no: 'asdf1234',
      name: '핏이 좋은 수트',
      image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
      price: 198000.0,
      original_price: 298000.0,
      description: '아주 잘 맞는 수트',
    });
    const wrapper = mount(ListLayout, {
      props: {
        items,
        loading: false,
      },
    });

    expect(wrapper.findAll('[data-test="item"]')).toHaveLength(itemsLength);
  });

  it('로딩 중이면 loadingItem을 2개 보여준다.', () => {
    const wrapper = mount(ListLayout, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.findAllComponents(LoadingItem)).toHaveLength(2);
  });
});
