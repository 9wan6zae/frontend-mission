<template>
  <header :class="appHeaderClass" id="app-header">
    <section id="title-section">
      <p id="title" data-test="header-title">{{ title }}</p>
    </section>
    <section id="info-section">
      <h1 id="menu-name" data-test="menu-name">{{ menuName }}</h1>
    </section>
  </header>
</template>

<script>
export default {
  props: {
    menuName: {
      type: String,
      default: '',
    },
  },
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
  background: #fff;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: transform .2s ease-out;
}

.app-header--visible {
  transform: translateY(0);
}

.app-header--hidden {
  transform: translateY(-100%);
}

#title-section {
  padding-left: 10px;
  height: 24px;
}

#title-section #title {
  font-size: 14px;
  color: var(--black);
  font-weight: 600;
}

#info-section {
  position: relative;
  height: 36px;
  text-align: center;
}

#menu-name {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
}
</style>
