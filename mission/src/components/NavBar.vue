<template>
  <div id="nav-bar">
    <nav data-test="nav-menu-bar" class="flex-space-between">
      <article v-for="menu in navMenu" :key="menu.title" data-test="nav-menu">
        <font-awesome-icon :icon="menu.icon" data-test="nav-menu-icon" />
        <p class="menu-title" data-test="nav-menu-title">{{ menu.title }}</p>
      </article>
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
#nav-bar {
  width: 100%;
  height: var(--navBarHeight);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

#nav-bar nav {
  border-top: 1px solid var(--darkgray);
  text-align: center;
  padding: 10px 20px 20px 20px;
}

#nav-bar nav article{
  width: 80px;
}

#nav-bar nav article .menu-title{
  margin-top: 2px;
  font-size: 14px;
  font-weight: 400;
}
</style>
