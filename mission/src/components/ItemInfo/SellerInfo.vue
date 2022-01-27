<template>
  <section class="seller-info-wrapper pa0-20 flex-align-center">
    <img
      v-if="seller?.profileImg"
      class="profile-img"
      :src="seller?.profileImg"
      data-test="profile-img"
    />
    <img
      v-else
      class="profile-img"
      src="@/assets/svg/defaultProfileImg.svg"
      data-test="default-profile-img"
    />
    <section class="seller-info">
      <p class="seller-name" data-test="seller-name">{{ seller?.sellerName }}</p>
      <div style="height: 22px">
        <span
          class="seller-tag"
          v-for="(tag, i) in seller?.tags"
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
</template>

<script>
export default {
  name: 'SellerInfo',
  props: {
    seller: Object,
  },
  data() {
    return {
      isFavorite: false,
    };
  },
  methods: {
    toggleIsFavorite() {
      this.isFavorite = !this.isFavorite;
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
</style>
