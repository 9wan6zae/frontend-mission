<template>
  <div id="nav-bar">
    <nav data-test="nav-menu-bar">
      <div v-for="menu in navMenu" :key="menu.title" data-test="nav-menu">
        <font-awesome-icon :icon="menu.icon" data-test="nav-menu-icon" />
        <p data-test="nav-menu-title">{{ menu.title }}</p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navMenu: [
        {
          icon: ['fas', 'star'],
          title: '홈',
        },
        {
          icon: ['fas', 'car'],
          title: '찜',
        },
        {
          icon: ['fas', 'user'],
          title: '장바구니',
        },
        {
          icon: ['fas', 'star'],
          title: '마이페이지',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
