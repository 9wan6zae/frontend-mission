import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';
import message from '@/data/message';

describe('ItemInfoPage', () => {
  it('redners ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });

  describe('Carousel', () => {
    const wrapper = mount(ItemInfoPage);

    it('hides product-img when there is no product-img', async () => {
      await wrapper.setData({
        itemInfo: {
          productImg: [],
        },
      });

      expect(wrapper.find('[data-test="product-img"]').exists()).toBeFalsy();
    });

    it('renders product-img when there is product-img', async () => {
      await wrapper.setData({
        itemInfo: {
          productImg: [
            'testImg',
          ],
        },
      });

      expect(wrapper.find('[data-test="product-img"]').exists()).toBeTruthy();
    });

    it('displays product-img from data', async () => {
      await wrapper.setData({
        itemInfo: {
          productImg: [
            'testImg',
          ],
        },
      });

      expect(wrapper.find('[data-test="product-img"]').attributes().src).toEqual('testImg');
    });

    it('renders N when there are N product-img', async () => {
      const productImg = [
        'testImg',
        'testImg',
        'testImg',
      ];
      await wrapper.setData({
        itemInfo: {
          productImg,
        },
      });

      expect(wrapper.findAll('[data-test="product-img"]').length).toEqual(productImg.length);
    });

    describe('Slide Test', () => {
      describe('When there is only one image,', () => {
        beforeEach(async () => {
          await wrapper.setData({
            slideIndex: 0,
            itemInfo: {
              productImg: [
                'testImg',
              ],
            },
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
          await wrapper.setData({
            slideIndex: 0,
            itemInfo: {
              productImg: [
                'testImg',
                'testImg',
                'testImg',
              ],
            },
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

  describe('Seller Section', () => {
    const wrapper = mount(ItemInfoPage);

    describe('Seller Name', () => {
      it('renders seller-name', async () => {
        expect(wrapper.find('[data-test="seller-name"]').exists()).toBeTruthy();
      });

      it('displays seller-name from data', async () => {
        const sellerName = '테스터';
        await wrapper.setData({
          itemInfo: {
            sellerName,
          },
        });

        expect(wrapper.find('[data-test="seller-name"]').text()).toEqual(sellerName);
      });
    });

    describe('Profile Img', () => {
      const profileImg = 'testImg';
      it('renders profile-img when there is a profile image', async () => {
        await wrapper.setData({
          itemInfo: {
            profileImg,
          },
        });

        expect(wrapper.find('[data-test="profile-img"]').exists()).toBeTruthy();
      });

      it('displays profile-img from data', async () => {
        await wrapper.setData({
          itemInfo: {
            profileImg,
          },
        });

        expect(wrapper.find('[data-test="profile-img"]').attributes().src).toEqual(profileImg);
      });

      it('renders default-profile-img when is there is no profile image', async () => {
        await wrapper.setData({
          itemInfo: {
            profileImg: undefined,
          },
        });

        expect(wrapper.find('[data-test="default-profile-img"]').exists()).toBeTruthy();
      });
    });

    describe('Tag', () => {
      it('renders tags when there is tags', async () => {
        const tags = ['남성', '의류', '10대'];
        await wrapper.setData({
          itemInfo: {
            tags,
          },
        });

        expect(wrapper.findAll('[data-test="seller-tag"]').length).toEqual(tags.length);
      });

      it('hides tags when there is no tags', async () => {
        const tags = [];
        await wrapper.setData({
          itemInfo: {
            tags,
          },
        });

        expect(wrapper.find('[data-test="seller-tag"]').exists()).toBeFalsy();
      });

      it('renders default-profile-img when is there is no profile image', async () => {
        await wrapper.setData({
          itemInfo: {
            profileImg: undefined,
          },
        });

        expect(wrapper.find('[data-test="default-profile-img"]').exists()).toBeTruthy();
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
        expect(wrapper.find('[data-test="favorite-btn"]').attributes().icon).toContain('far');
      });

      it('changes to solid style when clicked', async () => {
        const button = wrapper.find('[data-test="favorite-btn"]');

        await button.trigger('click');

        expect(button.attributes().icon).toContain('fas');
      });

      it('returns to the original style by double clicking', async () => {
        const button = wrapper.find('[data-test="favorite-btn"]');

        await button.trigger('click');
        await button.trigger('click');

        expect(button.attributes().icon).toContain('far');
      });
    });
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

    describe('원가와 판매가가 같을 경우, discount-rate와 original-price는 보여주지 않는다.', () => {
      const price = 2000;

      beforeEach(async () => {
        await wrapper.setData({
          itemInfo: {
            originalPrice: price,
            salesPrice: price,
          },
        });
      });

      it('renders sales-price', () => {
        expect(wrapper.find('[data-test="sales-price"]').exists()).toBeTruthy();
      });

      it('hides original-price', async () => {
        expect(wrapper.find('[data-test="original-price"]').exists()).toBeFalsy();
      });

      it('hides discount-rate', async () => {
        expect(wrapper.find('[data-test="discount-rate"]').exists()).toBeFalsy();
      });
    });
    describe('원가와 판매가가 다를 경우, discount-rate와 original-price는 보여주고 할인율을 계산한다.', () => {
      const originalPrice = 2000;
      const salesPrice = 1000;
      const discountRate = `${Math.floor((salesPrice / originalPrice) * 100)}%`;

      beforeEach(async () => {
        await wrapper.setData({
          itemInfo: {
            originalPrice,
            salesPrice,
          },
        });
      });
      it('renders sales-price', () => {
        expect(wrapper.find('[data-test="sales-price"]').exists()).toBeTruthy();
      });

      it('renders original-price', () => {
        expect(wrapper.find('[data-test="original-price"]').exists()).toBeTruthy();
      });

      it('renders discount-rate', () => {
        expect(wrapper.find('[data-test="discount-rate"]').exists()).toBeTruthy();
      });

      it('shows original-price', async () => {
        expect(wrapper.find('[data-test="original-price"]').isVisible()).toBeTruthy();
      });

      it('shows discount-rate', async () => {
        expect(wrapper.find('[data-test="discount-rate"]').isVisible()).toBeTruthy();
      });

      it('shows correct discount-rate', () => {
        expect(wrapper.find('[data-test="discount-rate"]').text()).toBe(discountRate);
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
        const nicknameLength = nickname.length;
        const modifiedNickname = `${nickname.slice(0, 2)}${('*').repeat(nicknameLength - 2)}`;

        expect(wrapper.find('[data-test="nickname"]').text()).toEqual(modifiedNickname);
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
      const originalPrice = 2000;
      const salesPrice = 1000;
      await wrapper.setData({
        itemInfo: {
          originalPrice,
          salesPrice,
        },
      });

      expect(wrapper.find('[data-test="floating-action-btn"]').text()).toContain(salesPrice.toLocaleString('ko-KR'));
    });
  });
});
