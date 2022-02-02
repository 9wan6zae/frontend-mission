import { mount } from '@vue/test-utils';
import ReviewInfo from '@/components/ItemInfo/ReviewInfo.vue';
import Review from '@/components/ItemInfo/Review.vue';
import message from '@/data/message';

describe('ReviewInfo', () => {
  it('redners ReviewInfo', () => {
    const wrapper = mount(ReviewInfo);

    expect(wrapper.find('[data-test="review-section"]').exists()).toBe(true);
  });

  it('renders N when there are N reviews', () => {
    const arrayLength = 4;
    const reviews = Array(arrayLength).fill({
      writer: 'test123',
      created: '2021-12-12',
      title: '매우 만족',
      content: 'content',
      img: 'testImg',
    });

    const wrapper = mount(ReviewInfo, {
      props: {
        reviews,
      },
    });

    const reviewWrapper = wrapper.findAllComponents(Review);

    expect(reviewWrapper).toHaveLength(arrayLength);
    expect(wrapper.findAll('[data-test="review-wrapper"]').length).toBe(arrayLength);
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
