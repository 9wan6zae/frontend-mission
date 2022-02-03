<template>
  <div id='item-info-page'>
    <Layout menuName="상품 정보" prev :nav="false">
      <main>
        <ItemMainImg :img="item?.image" />
        <SellerInfo v-bind="item?.seller" />
        <ProductInfo
          v-if="loaded"
          :name="item?.name"
          :original_price="item?.original_price"
          :price="item?.price"
          :description="item?.description"
        />
        <ReviewInfo :reviews="item?.reviews" />
      </main>
      <PurchaseFloatingActionBtn
        v-if="loaded"
        :original_price="item?.original_price"
        :price="item?.price"
      />
    </Layout>
  </div>
</template>

<script>
import itemAPI from '@/api/itemAPI';
import Layout from '@/components/Layouts/Layout.vue';
import ItemMainImg from '@/components/ItemInfo/ItemMainImg.vue';
import SellerInfo from '@/components/ItemInfo/SellerInfo.vue';
import ProductInfo from '@/components/ItemInfo/ProductInfo.vue';
import ReviewInfo from '@/components/ItemInfo/ReviewInfo.vue';
import PurchaseFloatingActionBtn from '@/components/FloatingActionBtn/PurchaseFloatingActionBtn.vue';

export default {
  name: 'ItemInfoPage',
  components: {
    Layout,
    ItemMainImg,
    SellerInfo,
    ProductInfo,
    ReviewInfo,
    PurchaseFloatingActionBtn,
  },
  data() {
    return {
      loaded: false,
      item: {},
    };
  },
  async created() {
    this.loaded = false;
    window.scrollTo(0, 0);
    const productNo = this.$route?.params.product_no;
    const response = await itemAPI.getItem(productNo);
    this.item = response.data.item;
    this.loaded = true;
  },
};
</script>
