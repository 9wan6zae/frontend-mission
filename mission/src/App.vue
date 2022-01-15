<template>
  <router-view />
</template>

<style>
:root {
  --black: #1f1f1f;
  --darkgray: #9E9E9E;
  --lightgray: #ddd;
  --emphasis: #FF5160;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html, body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

.box-shadow {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.pa0-20 {
  padding: 0 20px;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-justify-center {
  display: flex;
  justify-content: center;
}

.flex-align-center {
  display: flex;
  align-items: center;
}
</style>
