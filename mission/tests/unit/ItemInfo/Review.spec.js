import { mount } from '@vue/test-utils';
import Review from '@/components/ItemInfo/Review.vue';

describe('Review', () => {
  it('redners Review', () => {
    const reviewInfo = {
      writer: 'test123',
      created: '2021-12-12',
      title: '매우 만족',
      content: 'content',
      img: 'testImg',
    };
    const wrapper = mount(Review, {
      props: { ...reviewInfo },
    });

    expect(wrapper.find('[data-test="review-wrapper"]').exists()).toBe(true);
  });

  describe('Review Section', () => {
    describe('renders tag for reveiw section', () => {
      let wrapper;
      const reviewInfo = {
        writer: 'test123',
        created: '2021-12-12',
        title: '매우 만족',
        content: 'content',
        img: 'testImg',
      };

      beforeEach(() => {
        wrapper = mount(Review, {
          props: { ...reviewInfo },
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
        expect(wrapper.find('[data-test="review-date"]').text()).toEqual(reviewInfo.created);
      });

      it('renders review-title', () => {
        expect(wrapper.find('[data-test="review-title"]').exists()).toBeTruthy();
      });

      it('displays review-title from data', async () => {
        expect(wrapper.find('[data-test="review-title"]').text()).toEqual(reviewInfo.title);
      });

      it('renders review-content', () => {
        expect(wrapper.find('[data-test="review-content"]').exists()).toBeTruthy();
      });

      it('displays review-content from data', async () => {
        expect(wrapper.find('[data-test="review-content"]').text()).toEqual(reviewInfo.content);
      });

      it('renders review-img', () => {
        expect(wrapper.find('[data-test="review-img"]').exists()).toBeTruthy();
      });

      it('displays review-img from data', async () => {
        expect(wrapper.find('[data-test="review-img"]').attributes().src).toEqual(reviewInfo.img);
      });
    });

    describe('Img Test', () => {
      let wrapper;
      it('displays review-img from data', async () => {
        const reviewInfo = {
          writer: 'test123',
          created: '2021-12-12',
          title: '매우 만족',
          content: 'content',
          img: 'testImg',
        };
        wrapper = mount(Review, {
          props: { ...reviewInfo },
        });

        expect(wrapper.find('[data-test="review-img"]').attributes().src).toEqual(reviewInfo.img);
      });

      it('hides a review-img when there is no an image', async () => {
        const reviewInfo = {
          writer: 'test123',
          created: '2021-12-12',
          title: '매우 만족',
          content: 'content',
          img: null,
        };
        wrapper = mount(Review, {
          props: { ...reviewInfo },
        });

        expect(wrapper.find('[data-test="review-img"]').exists()).toBeFalsy();
      });
    });
  });
});
