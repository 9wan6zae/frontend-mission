<template>
  <section class="content-container" data-test="review-section">
    <p class="title">리뷰</p>
    <div
      v-if="doesExistReviews"
    >
      <Review
        data-test="review-wrapper"
        v-bind="review"
        v-for="review in reviews"
        :key="review?.review_no"
      />
    </div>
    <p v-else>{{ notReviewMessage }}</p>
  </section>
</template>

<script>
import Review from './Review.vue';
import message from '@/data/message';

export default {
  name: 'ReviewInfo',
  components: {
    Review,
  },
  props: {
    reviews: Array,
  },
  computed: {
    notReviewMessage() {
      return message.notReview;
    },
    doesExistReviews() {
      return this.reviews && this.reviews?.length > 0;
    },
  },
};
</script>
