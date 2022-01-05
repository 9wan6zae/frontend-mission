<template>
  <teleport to='body'>
    <div class="modal" v-show="isShow" @click="isShow = false">
      <div class='modal__container'>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isShow = ref(false);

    const open = () => {
      isShow.value = true;
    };

    const close = () => {
      isShow.value = false;
    };

    return { isShow, open, close };
  },
});
</script>

<style>
.modal {
  z-index: 999;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
}
.modal__container {
  position: relative;
  width: 320px;
  height: 200px;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
}
.modal__container > footer {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
}
button.close-btn {
  background-color: #ff5160;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  border: none;
  outline: none;
  color: white;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
}
</style>
