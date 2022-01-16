<template>
<div id='item-info-page'>
  <main>
    <section class="product-img-wrapper">
      <div v-if="itemInfo?.productImg" class="carousel">
        <div class="carousel__content" data-test="carousel-content">
          <div class="carousel__item" v-for="(img, i) in itemInfo.productImg" :key="i">
            <img
              class="product-img" :src="img"
              data-test="product-img"
            />
          </div>
        </div>
        <font-awesome-icon
          v-show="slideIndex !== 0"
          class="floating-arrow-btn"
          icon="arrow-circle-left"
          size="lg"
          :style="{
            color: 'var(--emphasis)'
          }"
          @click="prev"
          data-test="prev-btn"
        />

        <font-awesome-icon
          v-show="slideIndex !== itemInfo.productImg.length - 1"
          class="floating-arrow-btn"
          icon="arrow-circle-right"
          size="lg"
          :style="{
            color: 'var(--emphasis)',
            right: 0,
          }"
          @click="next"
          data-test="next-btn"
        />
      </div>
    </section>
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

export default {
  name: 'ItemInfoPage',
  data() {
    return {
      slideIndex: 0,
      isFavorite: false,
      itemInfo: {
        productImg: [
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9eb18655-8e17-4402-b19d-c59d5935437e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220116T030855Z&X-Amz-Expires=86400&X-Amz-Signature=bae6aa468c52a254ff466f20f2763145add0a006788eb9c12054e78c0afbcc8b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject',
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ed804d0d-49ca-4bb0-a16d-0107a639b311/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220116T030927Z&X-Amz-Expires=86400&X-Amz-Signature=a3beb91a69557f63304fcb7633e72e1279db687cdac46ab9c4cedc2390dda567&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject',
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7d5b05ab-4f09-4591-8f48-c32051c3a827/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220116T030945Z&X-Amz-Expires=86400&X-Amz-Signature=0f72c204a0a912fc62c76be10d655b854b7b0ca09596856cb14f365c1c9dc564&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject',
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/641b8e64-57bb-4933-b777-c800d0ec0a5a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220116T030959Z&X-Amz-Expires=86400&X-Amz-Signature=656570621f027421acafef4f8b8bd34eb2e571a7394cf7feb46ac123740a0ff8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject',
        ],
        profileImg: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ed84454d-65da-4512-8663-8d144354dc5c/A6940C25-3AD9-4F0F-859C-A6BA82A03E96.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220116T031247Z&X-Amz-Expires=86400&X-Amz-Signature=8a38ee9f666216ae8190e6b0403fc670edfdf4a40c86e7e786f42af3634c5440&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22A6940C25-3AD9-4F0F-859C-A6BA82A03E96.jpeg%22&x-id=GetObject',
        sellerName: '테스터',
        tags: ['20대', '남성', '캐쥬얼'],
        productName: '베이지 스웨터',
        originalPrice: 58000,
        productInfo: `
          <b>Color</b>
          <p>베이지, 브라운, 네이비, 화이트</p>
          <br/>
          <b>장점</b>
          <p>신축성이 좋고 빨래를 하셔도 상하지 않아요!</p>
          <img width="100%" src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9eb18655-8e17-4402-b19d-c59d5935437e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220116T030855Z&X-Amz-Expires=86400&X-Amz-Signature=bae6aa468c52a254ff466f20f2763145add0a006788eb9c12054e78c0afbcc8b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject' />
        `,
        reviews: [
          {
            nickname: 'abcde',
            reviewData: '2022-01-16',
            title: '신축성이 좋아요',
            content: '색상도 이쁘고 무엇보다 옷감이 잘 상하지 않아서 좋아요! 다음에도 재구매하고 싶습니다!',
            reviewImg: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9eb18655-8e17-4402-b19d-c59d5935437e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220116T030855Z&X-Amz-Expires=86400&X-Amz-Signature=bae6aa468c52a254ff466f20f2763145add0a006788eb9c12054e78c0afbcc8b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject',
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
    slideAction() {
      const carouselContent = document.querySelector('.carousel__content');
      if (carouselContent) {
        const size = carouselContent.clientWidth;
        carouselContent.style.transform = `translateX(-${this.slideIndex * size}px)`;
      }
    },
    prev() {
      if (this.slideIndex !== 0) {
        this.slideIndex -= 1;
        this.slideAction();
      }
    },
    next() {
      if (this.slideIndex !== this.itemInfo?.productImg.length - 1) {
        this.slideIndex += 1;
        this.slideAction();
      }
    },
  },
  computed: {
    originalPrice() {
      return `${this.addComma(this.itemInfo?.originalPrice)}원`;
    },
    salesPrice() {
      if (this.itemInfo?.discountRate) {
        return `${this.addComma(this.itemInfo?.originalPrice * ((1 - (this.itemInfo?.discountRate / 100))))}원`;
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
p, span {
  margin: 0;
  color: var(--black);
}

main {
  margin-bottom: 100px;
}

.floating-arrow-btn {
  position: absolute;
  margin: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
}

.product-img-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 100%;
  background: #ddd;
}

.carousel {
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.carousel__content {
  display: flex;
  width: 100%;
  height: 100%;
  transition: all .3s ease-out
}

.carousel__item {
  min-width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.product-img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
