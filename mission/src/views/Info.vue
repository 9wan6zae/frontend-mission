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
            v-if="!loading"
          >
            {{ info.username }}({{ info.id }})
          </strong>
          <loading-block
            v-else
            style="width: 50%; height: 20px"
          />
          <p
            id="email"
            data-test="info-email"
          >{{ info.email }}</p>
        </div>
        <button
          data-test="edit-btn"
          id="edit-btn"
        >
          편집
        </button>
      </article>
    </section>
  </layout>
</template>

<script>
import infoAPI from '@/api/infoAPI';
import Layout from '../components/Layouts/Layout.vue';
import LoadingBlock from '../components/Loading/LoadingBlock.vue';

export default {
  name: 'Info',
  components: {
    Layout,
    LoadingBlock,
  },
  data() {
    return {
      info: {},
      loading: true,
    };
  },
  methods: {
    async getInfo() {
      this.loading = true;
      const response = await infoAPI.get();
      this.info = response.data;
      this.loading = false;
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

div {
  width: 100%;
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
