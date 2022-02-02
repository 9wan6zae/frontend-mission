import { mount } from '@vue/test-utils';
import ReviewInfo from '@/components/ItemInfo/ReviewInfo.vue';
import Review from '@/components/ItemInfo/Review.vue';
import message from '@/data/message';

describe('ReviewInfo', () => {
  it('redners ReviewInfo', () => {
    const wrapper = mount(ReviewInfo);

    expect(wrapper.find('[data-test="review-section"]').exists()).toBe(true);
  });

  it('renders N when there are N reviews', async () => {
    const reviews = [
      {
        nickname: 'test',
        createdAt: '2021-12-12',
        title: '매우 만족',
        content: 'content',
      },
      {
        nickname: 'test',
        createdAt: '2021-12-12',
        title: '매우 만족',
        content: 'content',
      },
      {
        nickname: 'test',
        createdAt: '2021-12-12',
        title: '매우 만족',
        content: 'content',
      },
    ];

    const wrapper = mount(ReviewInfo, {
      props: {
        reviews,
      },
    });

    const reviewWrapper = wrapper.findAllComponents(Review);

    expect(reviewWrapper).toHaveLength(reviews.length);
    expect(wrapper.findAll('[data-test="review-wrapper"]').length).toBe(reviews.length);
  });

  it('renders a custom message when there is no review', async () => {
    const wrapper = mount(ReviewInfo, {
      props: {
        reviews: [],
      },
    });

    expect(wrapper.find('[data-test="review-section"]').text()).toContain(message.notReview);
  });
});
