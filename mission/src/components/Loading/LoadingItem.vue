<template>
  <article class="loading-item" data-test="link">
    <LoadingBlock style="width: 100%; height: 0px; padding-top: 100%" />
    <LoadingBlock
      style="width: 50%; height: 24px; margin-top: 6px; margin-bottom: 10px"
    />
    <LoadingBlock style="width: 80%; height: 20px" />
  </article>
</template>

<script>
import LoadingBlock from './LoadingBlock.vue';

export default {
  name: 'LoadingItem',
  components: {
    LoadingBlock,
  },
};
</script>

<style scoped>
.loading-item {
  width: 100%;
  min-height: 250px;
}

section {
  margin-top: 6px;
}

.squre-block {
  margin: 0;
  width: 100%;
  padding-top: 100%;
  background: #ddd;
  border-radius: 10px;
}
</style>
