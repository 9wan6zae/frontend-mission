<template>
  <div id='item-info-page'>
    <Layout menuName="상품 정보" prev :nav="false">
      <div v-if="!loading" data-test="item-info-content">
        <ItemMainImg :img="item?.image" />
        <SellerInfo v-bind="item?.seller" />
        <ProductInfo
          :name="item?.name"
          :original_price="item?.original_price"
          :price="item?.price"
          :description="item?.description"
        />
        <ReviewInfo :reviews="item?.reviews" />
      </div>
      <LoadingComponent v-else data-test="loading-content" />
      <PurchaseFloatingActionBtn
        v-if="!loading"
        :original_price="item?.original_price"
        :price="item?.price"
      />
    </Layout>
  </div>
</template>

<script>
import LoadingComponent from '@/components/Loading/LoadingContent.vue';
import Layout from '@/components/Layouts/Layout.vue';
import ItemMainImg from '@/components/ItemInfo/ItemMainImg.vue';
import SellerInfo from '@/components/ItemInfo/SellerInfo.vue';
import ProductInfo from '@/components/ItemInfo/ProductInfo.vue';
import ReviewInfo from '@/components/ItemInfo/ReviewInfo.vue';
import PurchaseFloatingActionBtn from '@/components/FloatingActionBtn/PurchaseFloatingActionBtn.vue';
import Repository from '@/repositories/RepositoryFactory';

const ItemRepository = Repository.get('item');

export default {
  name: 'ItemInfoPage',
  components: {
    Layout,
    LoadingComponent,
    ItemMainImg,
    SellerInfo,
    ProductInfo,
    ReviewInfo,
    PurchaseFloatingActionBtn,
  },
  props: {
    product_no: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: true,
      item: {},
    };
  },
  methods: {
    async getItem() {
      this.loading = true;
      const productNo = this.product_no;
      const { data } = await ItemRepository.getItem(productNo);
      this.item = data.item;
      this.loading = false;
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        window.scrollTo(0, 0);
        this.getItem();
      },
      { immediate: true },
    );
  },
};
</script>
