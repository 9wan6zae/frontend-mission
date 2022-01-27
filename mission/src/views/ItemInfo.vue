<template>
<div id='item-info-page'>
  <main>
    <ItemMainImg :img="itemInfo?.productImg" />
    <SellerInfo :seller="itemInfo?.seller" />
    <ProductInfo :info="itemInfo?.itemInfo" />
    <ReviewInfo :reviews="itemInfo?.reviews" />
  </main>
  <div class="floating-action-btn box-shadow flex-center" data-test="floating-action-btn">
    <p data-test="floating-action-btn-content">{{ floatingActionBtnText }}</p>
  </div>
</div>
</template>

<script>
import ItemMainImg from '@/components/ItemInfo/ItemMainImg.vue';
import SellerInfo from '@/components/ItemInfo/SellerInfo.vue';
import ProductInfo from '@/components/ItemInfo/ProductInfo.vue';
import ReviewInfo from '@/components/ItemInfo/ReviewInfo.vue';

export default {
  name: 'ItemInfoPage',
  components: {
    ItemMainImg,
    SellerInfo,
    ProductInfo,
    ReviewInfo,
  },
  data() {
    return {
      itemInfo: {
        productImg: [
          'http://drive.google.com/uc?export=view&id=1NiKKy29GjTEX4ztxhCQjhDqAFJmTzRs8',
          'https://drive.google.com/uc?export=view&id=1p7PD6L6WhP_DJK9bsJGtj9ilTzNQuwK9',
          'https://drive.google.com/uc?export=view&id=1up6VsQnHqeZ87I3URO1Wqqe2KpkMkYHG',
        ],
        seller: {
          profileImg: 'https://drive.google.com/uc?export=view&id=1up6VsQnHqeZ87I3URO1Wqqe2KpkMkYHG',
          sellerName: '테스터',
          tags: ['20대', '남성', '캐쥬얼'],
        },
        itemInfo: {
          productName: '베이지 스웨터',
          originalPrice: 58000,
          discountRate: 12,
          info: `
            <b>Color</b>
            <p>베이지, 브라운, 네이비, 화이트</p>
            <br/>
            <b>장점</b>
            <p>신축성이 좋고 빨래를 하셔도 상하지 않아요!</p>
            <img width="100%" src='https://drive.google.com/uc?export=view&id=1up6VsQnHqeZ87I3URO1Wqqe2KpkMkYHG' />
          `,
        },
        reviews: [
          {
            id: 1,
            nickname: 'abcde',
            reviewData: '2022-01-16',
            title: '신축성이 좋아요',
            content: '색상도 이쁘고 무엇보다 옷감이 잘 상하지 않아서 좋아요! 다음에도 재구매하고 싶습니다!',
            reviewImg: 'https://drive.google.com/uc?export=view&id=1up6VsQnHqeZ87I3URO1Wqqe2KpkMkYHG',
          },
          {
            id: 2,
            nickname: 'tester',
            reviewData: '2022-01-16',
            title: '봄, 가을에 입기 딱!',
            content: '옷감이 적당히 따뜻해서 이너로 입기 정말 좋아요!',
          },
        ],
      },
    };
  },
  computed: {
    floatingActionBtnText() {
      return `${this.salesPrice} 구매`;
    },
  },
};
</script>

<style scoped>
main {
  padding-bottom: 80px;
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
