import { mount } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import ItemMainImg from '@/components/ItemInfo/ItemMainImg.vue';

library.add(fas, far);

describe('ItemMainImg', () => {
  it('redners ItemMainImg', () => {
    const wrapper = mount(ItemMainImg, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('.product-img-wrapper').exists()).toBe(true);
  });

  describe('Carousel', () => {
    const wrapper = mount(ItemMainImg, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    it('hides product-img when there is no product-img', async () => {
      await wrapper.setProps({
        img: [],
      });

      expect(wrapper.find('[data-test="product-img"]').exists()).toBeFalsy();
    });

    it('renders product-img when there is product-img', async () => {
      await wrapper.setProps({
        img: [
          'testImg',
        ],
      });

      expect(wrapper.find('[data-test="product-img"]').exists()).toBeTruthy();
    });

    it('displays product-img from data', async () => {
      await wrapper.setProps({
        img: [
          'testImg',
        ],
      });

      expect(wrapper.find('[data-test="product-img"]').attributes().src).toEqual('testImg');
    });

    it('renders N when there are N product-img', async () => {
      const productImg = [
        'testImg',
        'testImg',
        'testImg',
      ];
      await wrapper.setProps({
        img: productImg,
      });

      expect(wrapper.findAll('[data-test="product-img"]').length).toEqual(productImg.length);
    });

    describe('Slide Test', () => {
      describe('When there is only one image,', () => {
        beforeEach(async () => {
          await wrapper.setProps({
            img: [
              'testImg',
            ],
          });
          await wrapper.setData({
            slideIndex: 0,
          });
        });
        it('hides prev-btn', async () => {
          expect(wrapper.find('[data-test="prev-btn"]').exists().isVisible).toBeFalsy();
        });
        it('hides next-btn', async () => {
          expect(wrapper.find('[data-test="next-btn"]').exists().isVisible).toBeFalsy();
        });
      });
      describe('When there are many images', () => {
        beforeEach(async () => {
          await wrapper.setProps({
            img: [
              'testImg',
              'testImg',
              'testImg',
            ],
          });
          await wrapper.setData({
            slideIndex: 0,
          });
        });
        it('hides prev-btn when it is the first image', async () => {
          const prevBtn = wrapper.find('[data-test="prev-btn"]');

          expect(prevBtn.exists().isVisible).toBeFalsy();
        });
        it('hides next-btn when it is the last image', async () => {
          const nextBtn = wrapper.find('[data-test="next-btn"]');

          await nextBtn.trigger('click');
          await nextBtn.trigger('click');

          expect(nextBtn.exists().isVisible).toBeFalsy();
        });
      });
    });
  });
});
