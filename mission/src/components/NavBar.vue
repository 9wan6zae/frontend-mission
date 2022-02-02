<template>
    <nav id="nav-bar" data-test="nav-menu-bar">
      <div class="nav-menu-wrapper flex-space-between">
        <article
          v-for="menu in navMenu"
          :key="menu.title"
          data-test="nav-menu"
          @click="redirect(menu.path)"
        >
          <font-awesome-icon
            :icon="menu.icon"
            data-test="nav-menu-icon"
            :style="{
              color: setIconColor(menu.path)
            }"
          />
          <p class="menu-title" data-test="nav-menu-title">{{ menu.title }}</p>
        </article>
      </div>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      navMenu: [
        {
          icon: ['fas', 'home'],
          title: '홈',
          path: '/',
        },
        {
          icon: ['fas', 'heart'],
          title: '찜',
          path: '/wish',
        },
        {
          icon: ['fas', 'shopping-cart'],
          title: '장바구니',
          path: '/cart',
        },
        {
          icon: ['fas', 'user'],
          title: '마이페이지',
          path: '/mypage',
        },
      ],
    };
  },
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
    setIconColor(path) {
      return this.$route?.path === path ? 'var(--emphasis)' : 'var(--black)';
    },
  },
};
</script>

<style scoped>
#nav-bar {
  background: #fff;
  width: 100%;
  height: var(--navBarHeight);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid var(--darkgray);
  text-align: center;
  padding: 10px 10px 20px 10px;
  display: flex;
  justify-content: center;
}

.nav-menu-wrapper {
  width: 100%;
  max-width: 460px;
}

article{
  width: 80px;
}

article .menu-title{
  margin-top: 2px;
  font-size: 14px;
  font-weight: 400;
}
</style>
