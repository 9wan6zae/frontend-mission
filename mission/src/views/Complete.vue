<template>
  <div id="complete-page" class="flex-center">
    <font-awesome-icon
      :icon="['fas', 'check']"
      data-test="check-icon"
      size="lg"
      :style="{
        color: 'var(--emphasis)',
        margin: '10px'
      }"
    />
    <p data-test="complete-message">{{ completeMessage }}</p>
    <router-link to="/">
      <button data-test="home-btn">홈으로</button>
    </router-link>
  </div>
</template>

<script>
import message from '@/data/message';

export default {
  name: 'Complete',
  computed: {
    completeMessage() {
      return message.complete;
    },
  },
};
</script>

<style scoped>
#complete-page {
  width: 100%;
  height: 100vh;
  flex-direction: column;
}
button {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border: none;
  outline: none;
  margin-top: 20px;
}
</style>
