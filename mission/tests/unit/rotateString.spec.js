import { shallowMount, mount } from '@vue/test-utils';
import RotateString from '@/components/RotateString.vue';

describe('RotateString.vue', () => {
  test('버튼 클릭시 문자열 회전되는지 확인한다.', async () => {
    const wrapper = shallowMount(RotateString);

    await wrapper.get('[data-test="input"]').setValue('Projectlion');

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.text()).toContain('rojectlionP');
  });
  test('반복 클릭시 정상적으로 동작하는지 확인한다.', async () => {
    const wrapper = shallowMount(RotateString);

    await wrapper.get('[data-test="input"]').setValue('abcde');

    await wrapper.get('[data-test="submit"]').trigger('click');
    await wrapper.get('[data-test="submit"]').trigger('click');
    await wrapper.get('[data-test="submit"]').trigger('click');
    await wrapper.get('[data-test="submit"]').trigger('click');
    await wrapper.get('[data-test="submit"]').trigger('click');

    expect(wrapper.text()).toContain('abcde');
  });
  test('모달에 원하는 값이 표시되는지 확인한다.', async () => {
    const wrapper = mount(RotateString);
    const { vm } = wrapper;

    await wrapper.get('[data-test="input"]').setValue('abcde');
    // 제출 버튼 2번 클릭 => abcde -> cdeab
    await wrapper.get('[data-test="submit"]').trigger('click');
    await wrapper.get('[data-test="submit"]').trigger('click');
    // 알림 버튼 4번 클릭 => 버튼을 누른 횟수가 4로 됨
    await wrapper.get('[data-test="alert"]').trigger('click');
    await wrapper.get('[data-test="alert"]').trigger('click');
    await wrapper.get('[data-test="alert"]').trigger('click');
    await wrapper.get('[data-test="alert"]').trigger('click');

    expect(vm.modalContent).toEqual([
      '문자열: cdeab',
      '버튼을 누른 횟수: 4',
    ]);
  });
});
