<template>
  <Modal ref="modal">
    <p v-for="text in content" :key="text">
      {{ text }}
    </p>
    <footer>
      <button class="close-btn" @click="cancel">닫기</button>
    </footer>
  </Modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Modal from '@/teleport/Modal.vue';

export default defineComponent({
  name: 'AlertModal',
  components: {
    Modal,
  },
  props: {
    content: Array,
  },
  setup() {
    const modal = ref(null);

    const show = () => {
      modal.value.open();
    };

    const cancel = () => {
      modal.value.close();
    };
    return {
      modal, show, cancel,
    };
  },
});
</script>
