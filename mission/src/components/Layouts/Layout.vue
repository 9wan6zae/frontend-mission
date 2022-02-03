<template>
  <div id="layout">
    <AppHeader :menuName="menuName" />
    <font-awesome-icon
      @click="prevHistory"
      v-if="prev"
      id="prev-btn"
      size="lg"
      :icon="['fas', 'chevron-circle-left']"
      data-test="prev-btn"
    />
    <main data-test="main-content">
      <slot></slot>
    </main>
    <NavBar v-if="nav" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'Layout',
  components: {
    AppHeader,
    NavBar,
  },
  props: {
    prev: {
      type: Boolean,
      default: false,
    },
    nav: {
      type: Boolean,
      default: true,
    },
    menuName: {
      type: String,
      default: '',
    },
  },
  methods: {
    prevHistory() {
      window.history.back();
    },
  },
};
</script>

<style scoped>
#prev-btn {
  z-index: 999;
  position: fixed;
  left: 10px;
  top: 32px;
}

main {
  padding-top: var(--appHeaderHeight);
  padding-bottom: var(--navBarHeight);
  width: 100%;
}
</style>
