<template>
  <article>
    <LoadingBlock style="width: 100%; height: 0px; padding-top: 100%" />
    <main>
      <div style="padding-top: 10px">
        <LoadingBlock
          style="width: 60%; height: 24px; margin-top: 6px; margin-bottom: 10px"
        />
        <LoadingBlock style="width: 50%; height: 20px" />
      </div>
      <div style="padding-top:20px">
        <LoadingBlock
          style="width: 100%; height: 20px; margin-top: 6px; margin-bottom: 20px"
        />
        <LoadingBlock style="width: 100%; height: 30px" />
      </div>
    </main>
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
main {
  padding: 0 20px;
}
</style>
