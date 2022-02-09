import { mount } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import SellerInfo from '@/components/ItemInfo/SellerInfo.vue';

library.add(fas, far);

describe('SellerInfo', () => {
  it('redners SellerInfo', () => {
    const wrapper = mount(SellerInfo, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find('.seller-info-wrapper').exists()).toBe(true);
  });

  describe('Seller Section', () => {
    const wrapper = mount(SellerInfo, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    describe('Seller Name', () => {
      it('renders seller-name', async () => {
        expect(wrapper.find('[data-test="seller-name"]').exists()).toBeTruthy();
      });

      it('displays seller-name from data', async () => {
        const name = '테스터';
        await wrapper.setProps({
          name,
        });

        expect(wrapper.find('[data-test="seller-name"]').text()).toEqual(name);
      });
    });

    describe('Profile Img', () => {
      const profileImage = 'testImg';
      it('renders profile-img when there is a profile image', async () => {
        await wrapper.setProps({
          profile_image: profileImage,
        });

        expect(wrapper.find('[data-test="profile-img"]').exists()).toBeTruthy();
      });

      it('displays profile-img from data', async () => {
        await wrapper.setProps({
          profile_image: profileImage,
        });

        expect(wrapper.find('[data-test="profile-img"]').attributes().src).toEqual(profileImage);
      });

      it('renders default-profile-img when is there is no profile image', async () => {
        await wrapper.setProps({
          profile_image: undefined,
        });

        expect(wrapper.find('[data-test="default-profile-img"]').exists()).toBeTruthy();
      });
    });

    describe('Tag', () => {
      it('renders tags when there is tags', async () => {
        const tags = ['남성', '의류', '10대'];
        await wrapper.setProps({
          hash_tags: tags,
        });

        expect(wrapper.findAll('[data-test="seller-tag"]').length).toEqual(tags.length);
      });

      it('hides tags when there is no tags', async () => {
        const tags = [];
        await wrapper.setProps({
          hash_tags: tags,
        });

        expect(wrapper.find('[data-test="seller-tag"]').exists()).toBeFalsy();
      });
    });

    describe('Favorite Button', () => {
      beforeEach(async () => {
        await wrapper.setData({
          isFavorite: false,
        });
      });
      it('renders favorite-btn', () => {
        expect(wrapper.find('[data-test="favorite-btn"]').exists()).toBeTruthy();
      });

      it('is initially rendered as regular style', () => {
        expect(wrapper.find('[data-test="favorite-btn"]').html()).toContain('far');
      });

      it('changes to solid style when clicked', async () => {
        const button = wrapper.find('[data-test="favorite-btn"]');

        await button.trigger('click');

        expect(button.html()).toContain('fas');
      });

      it('returns to the original style by double clicking', async () => {
        const button = wrapper.find('[data-test="favorite-btn"]');

        await button.trigger('click');
        await button.trigger('click');

        expect(button.html()).toContain('far');
      });
    });
  });
});
