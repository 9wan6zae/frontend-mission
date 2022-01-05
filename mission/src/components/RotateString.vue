<template>
  <div>
    <input type='text' v-model="string" />
    <button @click="rotate">회전</button>
    <p>{{ string }}</p>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const useRotate = (propsString = '') => {
  const string = ref(`${propsString}`);
  const rotate = () => {
    string.value = string.value.slice(1) + string.value.slice(0, 1);
  };
  return { string, rotate };
};

export default defineComponent({
  name: 'RotateString',
  props: {
    propsString: String,
  },
  setup(props) {
    const { string, rotate } = useRotate(props.propsString);
    return {
      string,
      rotate,
    };
  },
});
</script>
