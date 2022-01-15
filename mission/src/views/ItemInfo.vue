<template>
<div id='item-info-page'>
  <section class="seller-info-wrapper pa0-20 flex-align-center">
    <img
      v-if="itemInfo.profileImg"
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
      <p class="seller-name" data-test="seller-name">{{itemInfo.sellerName}}</p>
      <div style="height: 22px">
        <span
          class="seller-tag"
          v-for="(tag, i) in itemInfo.tags"
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
    <p class="product-name" data-test="product-name">{{itemInfo.productName}}</p>
    <div class="flex-align-center">
      <span
        v-if="isShowDiscountRate"
        class="discount-rate"
        data-test="discount-rate"
      >
        {{ discountRate }}
      </span>
      <span class="sales-price" data-test="sales-price">{{ salesPrice }}</span>
      <span
        v-if="isShowDiscountRate"
        class="original-price"
        data-test="original-price"
      >
        {{ originalPrice }}
      </span>
    </div>
  </section>
  <section class="content-container">
    <p class="title">상품정보</p>
    <span data-test="product-info" v-html="itemInfo.productInfo"></span>
  </section>
  <section class="content-container" data-test="review-section">
    <p class="title">리뷰</p>
    <div v-if="itemInfo.reviews && itemInfo.reviews.length > 0">
      <div
        class="review-wrapper box-shadow"
        v-for="(review, i) in itemInfo.reviews"
        :key="i"
        data-test="review-wrapper"
      >
        <div>
          <header>
            <span class="nickname" data-test="nickname">{{review.nickname}}</span>
            <time
              class="review-date"
              data-test="review-date"
              :datetime="review.reviewDate"
            >
              {{review.reviewDate}}
            </time>
          </header>
          <strong class="review-title" data-test="review-title">{{review.title}}</strong>
          <p class="review-content" data-test="review-content">{{review.content}}</p>
        </div>
        <img
          v-if="review.reviewImg"
          class="review-img"
          :src="review.reviewImg"
          data-test="review-img"
        />
      </div>
    </div>
    <p v-else>{{notReviewMessage}}</p>
  </section>
  <div class="floating-action-btn box-shadow flex-center" data-test="floating-action-btn">
    <p data-test="floating-action-btn-content">{{floatingActionBtnText}}</p>
  </div>
</div>
</template>

<script>
import message from '@/data/message';

export default {
  name: 'ItemInfoPage',
  data() {
    return {
      isFavorite: false,
      itemInfo: {
        originalPrice: 2000,
        salesPrice: 1000,
        productInfo: `
          <h1>Heading</h1>
          <p>test</p>
        `,
        reviews: [
          {
            nickname: 'test',
            reviewDate: '2021-12-12',
            title: '매우 만족',
            content: 'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent',
          },
        ],
      },
    };
  },
  methods: {
    addComma(number) {
      return number.toLocaleString('ko-KR');
    },
    toggleIsFavorite() {
      this.isFavorite = !this.isFavorite;
    },
  },
  computed: {
    discountRate() {
      return `${(Math.floor((this.itemInfo.salesPrice / this.itemInfo.originalPrice) * 100)).toString()}%`;
    },
    originalPrice() {
      return `${this.addComma(this.itemInfo.originalPrice)}원`;
    },
    salesPrice() {
      return `${this.addComma(this.itemInfo.salesPrice)}원`;
    },
    isShowDiscountRate() {
      return this.itemInfo.originalPrice !== this.itemInfo.salesPrice;
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
p, span {
  margin: 0;
  color: var(--black);
}

main {
  margin-bottom: 100px;
}

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
  object-fit: contain;
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
