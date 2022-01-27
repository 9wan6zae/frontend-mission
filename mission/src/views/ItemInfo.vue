<template>
<div id='item-info-page'>
  <main>
    <ItemMainImg :img="itemInfo?.productImg" />
    <section class="seller-info-wrapper pa0-20 flex-align-center">
      <img
        v-if="itemInfo?.profileImg"
        class="profile-img"
        :src="itemInfo.profileImg"
        data-test="profile-img"
      />
      <img
        v-else
        class="profile-img"
        src="@/assets/svg/defaultProfileImg.svg"
        data-test="default-profile-img"
      />
      <section class="seller-info">
        <p class="seller-name" data-test="seller-name">{{ itemInfo?.sellerName }}</p>
        <div style="height: 22px">
          <span
            class="seller-tag"
            v-for="(tag, i) in itemInfo?.tags"
            :key="i"
            data-test="seller-tag"
          >
            #{{ tag }}
          </span>
        </div>
      </section>
      <font-awesome-icon
        data-test="favorite-btn"
        @click="toggleIsFavorite"
        :icon="isFavorite ? ['fas', 'star'] : ['far', 'star']"
        size="lg"
        :style="{
          color: 'var(--emphasis)'
        }"
      />
    </section>
    <section class="price-wrapper pa0-20 flex-col flex-justify-center">
      <p class="product-name" data-test="product-name">{{ itemInfo?.productName }}</p>
      <div class="flex-align-center">
        <span
          v-if="itemInfo?.discountRate"
          class="discount-rate"
          data-test="discount-rate"
        >
          {{ itemInfo.discountRate }}%
        </span>
        <span class="sales-price" data-test="sales-price">{{ salesPrice }}</span>
        <span
          v-if="itemInfo?.discountRate"
          class="original-price"
          data-test="original-price"
        >
          {{ originalPrice }}
        </span>
      </div>
    </section>
    <section class="content-container">
      <p class="title">상품정보</p>
      <span data-test="product-info" v-html="itemInfo?.productInfo"></span>
    </section>
    <section class="content-container" data-test="review-section">
      <p class="title">리뷰</p>
      <div v-if="itemInfo?.reviews && itemInfo.reviews.length > 0">
        <div
          class="review-wrapper box-shadow"
          v-for="(review, i) in itemInfo.reviews"
          :key="i"
          data-test="review-wrapper"
        >
          <div>
            <header>
              <span class="nickname" data-test="nickname">{{ hideNickname(review.nickname) }}</span>
              <time
                class="review-date"
                data-test="review-date"
                :datetime="review?.reviewDate"
              >
                {{ review.reviewDate }}
              </time>
            </header>
            <strong class="review-title" data-test="review-title">{{ review.title }}</strong>
            <p class="review-content" data-test="review-content">{{ review.content }}</p>
          </div>
          <img
            v-if="review.reviewImg"
            class="review-img"
            :src="review.reviewImg"
            data-test="review-img"
          />
        </div>
      </div>
      <p v-else>{{ notReviewMessage }}</p>
    </section>
  </main>
  <div class="floating-action-btn box-shadow flex-center" data-test="floating-action-btn">
    <p data-test="floating-action-btn-content">{{ floatingActionBtnText }}</p>
  </div>
</div>
</template>

<script>
import message from '@/data/message';
import ItemMainImg from '@/components/ItemInfo/ItemMainImg.vue';

export default {
  name: 'ItemInfoPage',
  components: {
    ItemMainImg,
  },
  data() {
    return {
      isFavorite: false,
      itemInfo: {
        productImg: [
          'http://drive.google.com/uc?export=view&id=1NiKKy29GjTEX4ztxhCQjhDqAFJmTzRs8',
          'https://drive.google.com/uc?export=view&id=1p7PD6L6WhP_DJK9bsJGtj9ilTzNQuwK9',
          'https://drive.google.com/uc?export=view&id=1up6VsQnHqeZ87I3URO1Wqqe2KpkMkYHG',
        ],
        profileImg: 'https://drive.google.com/uc?export=view&id=1up6VsQnHqeZ87I3URO1Wqqe2KpkMkYHG',
        sellerName: '테스터',
        tags: ['20대', '남성', '캐쥬얼'],
        productName: '베이지 스웨터',
        originalPrice: 58000,
        discountRate: 12,
        productInfo: `
          <b>Color</b>
          <p>베이지, 브라운, 네이비, 화이트</p>
          <br/>
          <b>장점</b>
          <p>신축성이 좋고 빨래를 하셔도 상하지 않아요!</p>
          <img width="100%" src='https://drive.google.com/uc?export=view&id=1up6VsQnHqeZ87I3URO1Wqqe2KpkMkYHG' />
        `,
        reviews: [
          {
            nickname: 'abcde',
            reviewData: '2022-01-16',
            title: '신축성이 좋아요',
            content: '색상도 이쁘고 무엇보다 옷감이 잘 상하지 않아서 좋아요! 다음에도 재구매하고 싶습니다!',
            reviewImg: 'https://drive.google.com/uc?export=view&id=1up6VsQnHqeZ87I3URO1Wqqe2KpkMkYHG',
          },
          {
            nickname: 'tester',
            reviewData: '2022-01-16',
            title: '봄, 가을에 입기 딱!',
            content: '옷감이 적당히 따뜻해서 이너로 입기 정말 좋아요!',
          },
        ],
      },
    };
  },
  methods: {
    addComma(number) {
      if (number) return number.toLocaleString('ko-KR');
      return 0;
    },
    toggleIsFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    hideNickname(nickname) {
      const nicknameLength = nickname.length;
      return `${nickname.slice(0, 2)}${('*').repeat(nicknameLength - 2)}`;
    },
  },
  computed: {
    originalPrice() {
      return `${this.addComma(this.itemInfo?.originalPrice)}원`;
    },
    salesPrice() {
      if (this.itemInfo?.discountRate) {
        return `${this.addComma(Math.ceil(this.itemInfo?.originalPrice * ((1 - (this.itemInfo?.discountRate / 100)))))}원`;
      }
      return this.originalPrice;
    },
    notReviewMessage() {
      return message.notReview;
    },
    floatingActionBtnText() {
      return `${this.salesPrice} 구매`;
    },
  },
};
</script>

<style scoped>
.seller-info-wrapper {
  width: 100%;
  height: 80px;
  background: #fff;
  border-bottom: 1px solid var(--lightgray);
}

.seller-info-wrapper .profile-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.seller-info {
  margin-left: 12px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.seller-info .seller-name {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
}

.seller-tag {
  font-weight: normal;
  font-size: 16px;
  color: var(--darkgray);
  margin-right: 4px;
}

.price-wrapper {
  width: 100%;
  height: 80px;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.price-wrapper .product-name {
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 4px;
}

.price-wrapper span {
  margin-right: 6px;
}

.price-wrapper .discount-rate {
  font-weight: 600;
  font-size: 24px;
  color: var(--emphasis);
}

.price-wrapper .sales-price {
  font-weight: 600;
  font-size: 24px;
}

.price-wrapper .original-price {
  font-weight: 600;
  font-size: 18px;
  text-decoration-line: line-through;
  color: var(--lightgray);
}

.content-container {
  padding: 30px 20px 0px 20px;
}

.content-container .title {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
}

.review-wrapper {
  width: 100%;
  height: 120px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.review-wrapper header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 6px;
}

.review-wrapper header .nickname {
  font-weight: normal;
  font-size: 18px;
  margin-right: 10px;
}

.review-wrapper header .review-date {
  font-weight: normal;
  font-size: 14px;
  color: var(--darkgray)
}

.review-wrapper .review-title {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 4px;
}

.review-wrapper .review-content {
  font-weight: normal;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.review-wrapper .review-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-left: 4px;
}

.floating-action-btn {
  cursor: pointer;
  position: fixed;
  left: 20px;
  right: 20px;
  bottom: 20px;
  height: 60px;
  border-radius: 10px;
  background: var(--emphasis);
  border: none;
  outline: none;
}

.floating-action-btn p {
  color: #fff;
  font-weight: 600;
  font-size: 24px;
}
</style>
