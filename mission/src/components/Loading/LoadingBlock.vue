<template>
  <div />
</template>

<script>
export default {
  name: 'LoadingBlock',
};
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(90deg, #ddd, #efefef, #ddd, #efefef);
  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}
</style>
