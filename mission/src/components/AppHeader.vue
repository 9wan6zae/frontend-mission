<template>
  <header :class="appHeaderClass" id="app-header">
    <h1 data-test="header-title">{{ title }}</h1>
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: '9wan6zae\'s Shop',
      scrollY: 0,
      timer: null,
    };
  },
  methods: {
    setScrollY() {
      if (this.timer === null) {
        this.timer = setTimeout(() => {
          this.scrollY = window.pageYOffset || document.documentElement.scrollTop;
          clearTimeout(this.timer);
          this.timer = null;
        }, 200);
      }
    },
  },
  computed: {
    appHeaderClass() {
      return this.scrollY === 0 ? 'app-header--visible' : 'app-header--hidden';
    },
  },
  created() {
    window.addEventListener('scroll', this.setScrollY);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.setScrollY);
  },
};
</script>

<style scoped>
#app-header {
  width: 100%;
  height: var(--appHeaderHeight);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: transform .2s ease-out;
}

#app-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: var(--black);
  text-align: center;
}

.app-header--visible {
  transform: translateY(0);
}

.app-header--hidden {
  transform: translateY(-100%);
}
</style>
