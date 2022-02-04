<template>
  <layout
    menuName="마이페이지"
    data-test="info-wrapper"
  >
    <section class="pa0-20">
      <article class="box-shadow flex-space-between flex-align-center">
        <div>
          <strong
            id="username"
            data-test="info-username"
            v-show="info.username"
          >
            {{ info.username }}({{ info.id }})
          </strong>
          <p
            id="email"
            data-test="info-email"
          >{{ info.email }}</p>
        </div>
        <div>
          <button
            data-test="edit-btn"
            id="edit-btn"
          >
            편집
          </button>
        </div>
      </article>
    </section>
  </layout>
</template>

<script>
import infoAPI from '@/api/infoAPI';
import Layout from '../components/Layouts/Layout.vue';

export default {
  name: 'Info',
  components: {
    Layout,
  },
  data() {
    return {
      info: {},
    };
  },
  methods: {
    async getInfo() {
      const response = await infoAPI.get();
      this.info = response.data;
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style scoped>
article {
  border-radius: 10px;
  width: 100%;
  height: 60px;
  padding: 10px;
}

#username {
  font-weight: 600;
  font-size: 16px;
}

#email {
  font-weight: normal;
  font-size: 14px;
}

#edit-btn {
  width: 46px;
  height: 28px;
  background: #FFFFFF;
  border: 1px solid #9E9E9E;
  box-sizing: border-box;
  border-radius: 6px;
  font-weight: bold;
  font-size: 10px;
}
</style>
