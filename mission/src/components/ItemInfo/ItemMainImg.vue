<template>
  <section class="item-img-wrapper">
    <img
      v-show="img"
      class="item-img" :src="img"
      data-test="item-img"
    />
  </section>
</template>

<script>
export default {
  name: 'ItemMainImg',
  props: {
    img: {
      type: String,
    },
  },
};
</script>

<style scoped>
.item-img-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 100%;
  background: #ddd;
}

.item-img {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
