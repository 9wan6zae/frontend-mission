import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import ListLayout from '@/components/Layouts/ListLayout.vue';
import LoadingItem from '@/components/Loading/LoadingItem.vue';
import ItemListPage from '@/views/ItemList.vue';
import ItemInfoPage from '@/views/ItemInfo.vue';
import itemAPI from '@/repositories/ItemRepository';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: ItemListPage,
    },
    {
      path: '/item/:product_no',
      component: ItemInfoPage,
    },
  ],
});

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

  it('상품을 클릭했을 때 ItemInfo.vue로 이동하는지', async () => {
    router.push('/');
    await router.isReady();

    const items = [
      {
        product_no: 'asdf1234',
        name: '핏이 좋은 수트',
        image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
        price: 198000,
        original_price: 298000,
        description: '아주 잘 맞는 수트',
      },
    ];
    itemAPI.get = jest.fn().mockResolvedValue({
      data: {
        items,
      },
    });
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await itemAPI.get();
    await flushPromises();
    // link를 클릭했을 때
    await wrapper.find('[data-test="link"]').trigger('click');
    await flushPromises();

    // item-info로 넘어가는지
    expect(wrapper.find('#item-info-page').exists()).toBeTruthy();
  });
});
