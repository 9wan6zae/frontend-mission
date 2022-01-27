import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';
import message from '@/data/message';

describe('ItemInfoPage', () => {
  it('redners ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });

  describe('Review Section', () => {
    const wrapper = mount(ItemInfoPage);

    describe('renders tag for reveiw section', () => {
      const nickname = 'test123';
      const reviewDate = '2021-12-12';
      const title = '매우 만족';
      const content = 'content';
      const reviewImg = 'testImg';
      beforeEach(async () => {
        await wrapper.setData({
          itemInfo: {
            reviews: [
              {
                nickname,
                reviewDate,
                title,
                content,
                reviewImg,
              },
            ],
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
      await wrapper.setData({
        itemInfo: {
          reviews,
        },
      });

      expect(wrapper.findAll('[data-test="review-wrapper"]').length).toBe(reviews.length);
    });

    it('renders a custom message when there is no review', async () => {
      await wrapper.setData({
        itemInfo: {
          reviews: [],
        },
      });

      expect(wrapper.find('[data-test="review-section"]').text()).toContain(message.notReview);
    });

    it('renders a review-img when there is an image', async () => {
      const reviewImg = 'testImg';
      await wrapper.setData({
        itemInfo: {
          reviews: [
            {
              nickname: 'test',
              createdAt: '2021-12-12',
              title: '매우 만족',
              content: 'content',
              reviewImg,
            },
          ],
        },
      });

      expect(wrapper.find('[data-test="review-img"]').exists()).toBeTruthy();
    });

    it('displays review-img from data', async () => {
      const reviewImg = 'testImg';
      await wrapper.setData({
        itemInfo: {
          reviews: [
            {
              nickname: 'test',
              createdAt: '2021-12-12',
              title: '매우 만족',
              content: 'content',
              reviewImg,
            },
          ],
        },
      });

      expect(wrapper.find('[data-test="review-img"]').attributes().src).toEqual(reviewImg);
    });

    it('hides a review-img when there is no an image', async () => {
      await wrapper.setData({
        itemInfo: {
          reviews: [
            {
              nickname: 'test',
              createdAt: '2021-12-12',
              title: '매우 만족',
              content: 'content',
            },
          ],
        },
      });

      expect(wrapper.find('[data-test="review-img"]').exists()).toBeFalsy();
    });
  });

  describe('Floating Action Button', () => {
    const wrapper = mount(ItemInfoPage);
    it('renders floating-action-btn', () => {
      expect(wrapper.find('[data-test="floating-action-btn"]').exists()).toBeTruthy();
    });

    it('shows sales-price in floating-action-btn', async () => {
      const originalPrice = 58000;
      const discountRate = 15;
      await wrapper.setData({
        itemInfo: {
          originalPrice,
          discountRate,
        },
      });

      expect(wrapper.find('[data-test="floating-action-btn"]').text()).toContain('49,300원');
    });
  });
});
