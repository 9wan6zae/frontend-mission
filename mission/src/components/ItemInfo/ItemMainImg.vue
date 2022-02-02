<template>
  <section class="product-img-wrapper">
    <div v-if="img" class="carousel">
      <div class="carousel__content" data-test="carousel-content">
        <div class="carousel__item" v-for="(img, i) in img" :key="i">
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
        v-show="slideIndex !== img.length - 1"
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
</template>

<script>
export default {
  name: 'ItemMainImg',
  props: {
    img: Array,
  },
  data() {
    return {
      slideIndex: 0,
    };
  },
  methods: {
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
      if (this.slideIndex !== this.img?.length - 1) {
        this.slideIndex += 1;
        this.slideAction();
      }
    },
  },
};
</script>

<style scoped>
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

</style>
