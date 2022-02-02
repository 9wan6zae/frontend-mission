<template>
  <div
    class="review-wrapper box-shadow"
    data-test="review-wrapper"
  >
    <div>
      <header>
        <span class="nickname" data-test="nickname">{{ hideNickname(writer) }}</span>
        <time
          class="review-date"
          data-test="review-date"
          :datetime="created"
        >
          {{ created }}
        </time>
      </header>
      <strong class="review-title" data-test="review-title">{{ title }}</strong>
      <p class="review-content" data-test="review-content">{{ content }}</p>
    </div>
    <img
      v-if="img"
      class="review-img"
      :src="img"
      data-test="review-img"
    />
  </div>
</template>

<script>
export default {
  name: 'Review',
  props: {
    review_no: {
      type: Number,
      default: 0,
    },
    writer: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    likes_count: {
      type: Number,
      default: 0,
    },
    created: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/example.jpg',
    },
  },
  methods: {
    hideNickname(nickname) {
      const nicknameLength = nickname?.length;
      return `${nickname?.slice(0, 2)}${('*').repeat(nicknameLength - 2)}`;
    },
  },
};
</script>

<style scoped>
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
</style>
