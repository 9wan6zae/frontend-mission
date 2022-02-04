import { mount, flushPromises } from '@vue/test-utils';
import InfoPage from '@/views/Info.vue';
import infoAPI from '@/api/infoAPI';

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

    console.log(wrapper.html());

    expect(wrapper.find('[data-test="info-username"]').text()).toBe('test-name(test-id)');
    expect(wrapper.find('[data-test="info-email"]').text()).toBe('test@test.com');
    expect(wrapper.find('[data-test="edit-btn"]').text()).toBe('편집');
  });

  it('infoAPI를 호출하는지', async () => {
    await flushPromises();

    expect(infoAPI.get).toHaveBeenCalled();
  });
});
