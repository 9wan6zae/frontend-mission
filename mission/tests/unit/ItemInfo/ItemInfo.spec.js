import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';
import message from '@/data/message';

describe('ItemInfoPage', () => {
  it('redners ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });

  describe('Price Section', () => {
    const wrapper = mount(ItemInfoPage);
    it('renders product-name', () => {
      expect(wrapper.find('[data-test="product-name"]').exists()).toBeTruthy();
    });

    it('represents the value entered in product-name', async () => {
      const productName = '핏이 좋은 슈트';
      await wrapper.setData({
        itemInfo: {
          productName,
        },
      });

      expect(wrapper.find('[data-test="product-name"]').text()).toBe(productName);
    });

    describe('원가만 있는 경우, discount-rate를 보여주지 않고 판매가가 원가가 된다.', () => {
      const price = 2000;

      beforeEach(async () => {
        await wrapper.setData({
          itemInfo: {
            originalPrice: price,
            discountRate: undefined,
          },
        });
      });

      it('renders sales-price', () => {
        expect(wrapper.find('[data-test="sales-price"]').exists()).toBeTruthy();
      });

      it('shows original-price for the value of sales-price', () => {
        expect(wrapper.find('[data-test="sales-price"]').text()).toEqual('2,000원');
      });

      it('hides original-price', async () => {
        expect(wrapper.find('[data-test="original-price"]').exists()).toBeFalsy();
      });

      it('hides discount-rate', async () => {
        expect(wrapper.find('[data-test="discount-rate"]').exists()).toBeFalsy();
      });
    });
    describe('원가와 할인율이 있는 경우, discount-rate와 original-price는 보여주고 판매가를 계산한다.', () => {
      const originalPrice = 58000;
      const discountRate = 15;

      beforeEach(async () => {
        await wrapper.setData({
          itemInfo: {
            originalPrice,
            discountRate,
          },
        });
      });
      it('renders sales-price', () => {
        expect(wrapper.find('[data-test="sales-price"]').exists()).toBeTruthy();
      });

      it('shows correct sales-price', () => {
        expect(wrapper.find('[data-test="sales-price"]').text()).toEqual('49,300원');
      });

      it('renders original-price', () => {
        expect(wrapper.find('[data-test="original-price"]').exists()).toBeTruthy();
      });

      it('renders discount-rate', () => {
        expect(wrapper.find('[data-test="discount-rate"]').exists()).toBeTruthy();
      });
    });
  });

  describe('Product Info Section', () => {
    it('shows the entered string in product-info', async () => {
      const wrapper = mount(ItemInfoPage);
      await wrapper.setData({
        itemInfo: {
          productInfo: `
            <h1>Heading</h1>
          `,
        },
      });

      expect(wrapper.find('[data-test="product-info"]').text()).toContain('Heading');
    });
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
