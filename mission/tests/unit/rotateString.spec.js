import { shallowMount, mount } from '@vue/test-utils';
import RotateString from '@/components/RotateString.vue';

describe('RotateString.vue', () => {
  test('문자열 입력', async () => {
    const propsString = 'Projectlion';
    const wrapper = shallowMount(RotateString, {
      props: { propsString },
    });
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.text()).toContain('rojectlionP');
  });
  test('숫자 입력', async () => {
    const propsString = 12345;
    const wrapper = shallowMount(RotateString, {
      props: { propsString },
    });
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.text()).toContain('23451');
  });
  test('반복 클릭', async () => {
    const propsString = 'abcde';
    const wrapper = shallowMount(RotateString, {
      props: { propsString },
    });
    const button = wrapper.find('button');
    await button.trigger('click');
    await button.trigger('click');
    await button.trigger('click');
    await button.trigger('click');
    await button.trigger('click');
    expect(wrapper.text()).toContain('abcde');
  });
  test('모달 값 유효성 테스트', async () => {
    const propsString = 'abcde';
    const wrapper = mount(RotateString, {
      props: { propsString },
    });
    const { vm } = wrapper;
    vm.rotate();
    vm.rotate();
    vm.modalShow();
    vm.modalShow();
    vm.modalShow();
    vm.modalShow();
    expect(vm.modalContent).toEqual([
      '문자열: cdeab',
      '버튼을 누른 횟수: 4',
    ]);
  });
});
