import { mount, flushPromises } from '@vue/test-utils';
import InfoPage from '@/views/Info.vue';
import infoAPI from '@/repositories/InfoRepository';
import LoadingBlock from '@/components/Loading/LoadingBlock.vue';

const info = {
  username: 'test-name',
  id: 'test-id',
  email: 'test@test.com',
};

infoAPI.get = jest.fn().mockResolvedValue({
  data: { ...info },
});

describe('InfoPage', () => {
  it('renders InfoPage', () => {
    const wrapper = mount(InfoPage);

    expect(wrapper.find('[data-test="info-wrapper"]').exists()).toBe(true);
  });

  it('필요한 요소들을 렌더링하는지', async () => {
    const wrapper = mount(InfoPage);

    await infoAPI.get();
    await flushPromises();

    expect(wrapper.find('[data-test="info-username"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="info-email"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="edit-btn"]').exists()).toBeTruthy();
  });

  it('올바른 값을 보여주는지', async () => {
    const wrapper = mount(InfoPage);

    await infoAPI.get();
    await flushPromises();

    expect(wrapper.find('[data-test="info-username"]').text()).toBe('test-name(test-id)');
    expect(wrapper.find('[data-test="info-email"]').text()).toBe('test@test.com');
    expect(wrapper.find('[data-test="edit-btn"]').text()).toBe('편집');
  });

  it('infoAPI를 호출하는지', async () => {
    await flushPromises();

    expect(infoAPI.get).toHaveBeenCalled();
  });
  describe('Loading', () => {
    it('로딩 중일 때 loading-block이 보이는지', () => {
      const wrapper = mount(InfoPage);

      expect(wrapper.findComponent(LoadingBlock).exists()).toBeTruthy();
    });

    it('로딩이 완료되면 loading-block이 보이지 않는지', async () => {
      const wrapper = mount(InfoPage);

      await infoAPI.get();
      await flushPromises();

      expect(wrapper.findComponent(LoadingBlock).exists()).toBeFalsy();
    });
  });
});
