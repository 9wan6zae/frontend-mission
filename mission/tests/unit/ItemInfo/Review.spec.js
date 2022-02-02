import { mount } from '@vue/test-utils';
import Review from '@/components/ItemInfo/Review.vue';

describe('Review', () => {
  it('redners ProductInfo', () => {
    const wrapper = mount(Review);

    expect(wrapper.find('[data-test="review-wrapper"]').exists()).toBe(true);
  });

  describe('Review Section', () => {
    describe('renders tag for reveiw section', () => {
      let wrapper;
      const nickname = 'test123';
      const reviewDate = '2021-12-12';
      const title = '매우 만족';
      const content = 'content';
      const reviewImg = 'testImg';

      beforeEach(() => {
        wrapper = mount(Review, {
          props: {
            review: {
              nickname,
              reviewDate,
              title,
              content,
              reviewImg,
            },
          },
        });
      });

      it('renders nickname', () => {
        expect(wrapper.find('[data-test="nickname"]').exists()).toBeTruthy();
      });

      it('displays nickname from data', async () => {
        expect(wrapper.find('[data-test="nickname"]').text()).toEqual('te*****');
      });

      it('renders review-date', () => {
        expect(wrapper.find('[data-test="review-date"]').exists()).toBeTruthy();
      });

      it('displays review-date from data', async () => {
        expect(wrapper.find('[data-test="review-date"]').text()).toEqual(reviewDate);
      });

      it('renders review-title', () => {
        expect(wrapper.find('[data-test="review-title"]').exists()).toBeTruthy();
      });

      it('displays review-title from data', async () => {
        expect(wrapper.find('[data-test="review-title"]').text()).toEqual(title);
      });

      it('renders review-content', () => {
        expect(wrapper.find('[data-test="review-content"]').exists()).toBeTruthy();
      });

      it('displays review-content from data', async () => {
        expect(wrapper.find('[data-test="review-content"]').text()).toEqual(content);
      });

      it('renders review-img', () => {
        expect(wrapper.find('[data-test="review-img"]').exists()).toBeTruthy();
      });

      it('displays review-img from data', async () => {
        expect(wrapper.find('[data-test="review-img"]').attributes().src).toEqual(reviewImg);
      });
    });

    describe('Img Test', () => {
      let wrapper;
      it('displays review-img from data', async () => {
        const reviewImg = 'testImg';
        wrapper = mount(Review, {
          props: {
            review: {
              reviewImg,
            },
          },
        });

        expect(wrapper.find('[data-test="review-img"]').attributes().src).toEqual(reviewImg);
      });

      it('hides a review-img when there is no an image', async () => {
        wrapper = mount(Review, {
          props: {
            review: {
              nickname: 'test',
              createdAt: '2021-12-12',
              title: '매우 만족',
              content: 'content',
            },
          },
        });

        expect(wrapper.find('[data-test="review-img"]').exists()).toBeFalsy();
      });
    });
  });
});
