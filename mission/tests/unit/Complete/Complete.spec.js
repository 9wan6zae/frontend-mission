import { flushPromises, mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from '@/App.vue';
import CompletePage from '@/views/Complete.vue';
import ItemInfoPage from '@/views/ItemInfo.vue';
import message from '@/data/message';

library.add(fas, far);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: ItemInfoPage,
    },
    {
      path: '/complete',
      component: CompletePage,
    },
  ],
});

describe('CompletePage', () => {
  it('renders CompletePage', () => {
    const wrapper = mount(CompletePage, {
      global: {
        plugins: [router],
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('#complete-page').exists()).toBeTruthy();
  });
  it('홈으로 버튼을 클릭했을 때 / 으로 이동하는지', async () => {
    router.push('/complete');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('[data-test="home-btn"]').trigger('click');
    await flushPromises();

    expect(wrapper.find('#item-info-page').exists()).toBeTruthy();
  });
  it('필요한 요소들을 렌더링하는지', () => {
    const wrapper = mount(CompletePage, {
      global: {
        plugins: [router],
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('[data-test="check-icon"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="complete-message"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="home-btn"]').exists()).toBeTruthy();
  });

  it('적절한 메시지를 보여주는지', () => {
    const wrapper = mount(CompletePage, {
      global: {
        plugins: [router],
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('[data-test="complete-message"]').text()).toBe(message.complete);
  });
});
