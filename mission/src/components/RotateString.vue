<template>
  <div>
    <input type='text' v-model="string" />
    <button @click="rotate">제출</button>
    <button @click="modalShow">알림</button>
    <p>{{ string }}</p>
    <alert-modal ref="modal" :content="modalContent" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AlertModal from './AlertModal.vue';

const useRotate = (propsString = '') => {
  const string = ref(`${propsString}`);
  const rotate = () => {
    string.value = string.value.slice(1) + string.value.slice(0, 1);
  };
  return { string, rotate };
};

const useModal = (string) => {
  const count = ref(0);
  const modal = ref(null);
  const modalContent = ref([]);

  const modalShow = () => {
    count.value += 1;
    modalContent.value = [
      `문자열: ${string.value}`,
      `버튼을 누른 횟수: ${count.value}`,
    ];
    modal.value.show();
  };
  return {
    modal,
    modalContent,
    modalShow,
  };
};

export default defineComponent({
  components: { AlertModal },
  name: 'RotateString',
  props: {
    propsString: String,
  },
  setup(props) {
    const { string, rotate } = useRotate(props.propsString);
    const { modal, modalContent, modalShow } = useModal(string);

    return {
      string,
      rotate,
      modal,
      modalContent,
      modalShow,
    };
  },
});
</script>
