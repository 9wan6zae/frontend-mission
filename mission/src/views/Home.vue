<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <RotateString />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import RotateString from '@/components/RotateString.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    RotateString,
  },
};
</script>
