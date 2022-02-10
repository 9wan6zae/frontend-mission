<template>
  <layout
    id="order-page"
    menuName="주문하기"
    :nav="false"
    :prev="true"
  >
    <section class="pa0-20">
      <section>
        <h3>주문자 정보</h3>
        <article
          data-test="customer-info"
          class="customer-info-article"
          v-for="info in customer"
          :key="info.title"
        >
          <p data-test="customer-info-title">{{info.title}}</p>
          <input
            data-test="customer-info-input"
            class="customer-input"
            v-model="info.value"
          />
        </article>
      </section>

      <section>
        <h3>주문내역</h3>
        <article
          class="summary-wrapper box-shadow flex-space-between"
          data-test="summary-info"
          v-for="item in summary"
          :key="item.product_no"
        >
          <p data-test="summary-name" class="summary-name">{{ item.name }}</p>
          <p data-test="summary-quantity" class="summary-quantity">{{ item.quantity }}</p>
          <p data-test="summary-price" class="summary-price">{{ item.price }}</p>
        </article>
      </section>

      <section v-for="data in methodSelect" :key="data.key">
        <h3>{{ data.title }}</h3>
        <section class="flex-space-between">
          <article
            class="method-wrapper box-shadow"
            data-test="method-wrapper"
            v-for="method in data.methods"
            :key="method.title"
            @click="selectMethod(method.title, data.key)"
          >
            <font-awesome-icon
              :icon="method.icon"
              data-test="method-icon"
              size="lg"
              :style="{
                marginBottom: '14px',
                color: setIconColor(method.title, data.key)
              }"
            />
            <p data-test="method-title">{{ method.title }}</p>
          </article>
        </section>
      </section>
    </section>
    <router-link to="/complete">
      <floating-action-btn v-show="isAllFill" data-test="floating-action-btn">
        {{ btnText }}
      </floating-action-btn>
    </router-link>
  </layout>
</template>

<script>
import { mapGetters } from 'vuex';
import Layout from '../components/Layouts/Layout.vue';
import FloatingActionBtn from '../components/FloatingActionBtn/FloatingActionBtn.vue';

export default {
  name: 'Order',
  components: { Layout, FloatingActionBtn },
  data() {
    return {
      customer: [
        {
          title: '주문자명',
          value: '',
        },
        {
          title: '전화번호',
          value: '',
        },
        {
          title: '수령주소',
          value: '',
        },
      ],
      shipping: '',
      pay: '',
      methodSelect: [
        {
          title: '배송방법',
          key: 'shipping',
          methods: [
            {
              title: '택배',
              icon: ['fas', 'box'],
            },
            {
              title: '퀵 배송',
              icon: ['fas', 'shipping-fast'],
            },
          ],
        },
        {
          title: '결제방법',
          key: 'pay',
          methods: [
            {
              title: '신용/체크카드',
              icon: ['fas', 'credit-card'],
            },
            {
              title: '계좌이체',
              icon: ['fas', 'money-bill'],
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters('cart', ['summary', 'totalPrice']),
    isAllFill() {
      if (!this.pay || !this.shipping) {
        return false;
      }
      for (let i = 0; i < this.customer.length; i += 1) {
        const info = this.customer[i];
        if (!info.value) {
          return false;
        }
      }
      return true;
    },
    btnText() {
      return `${this.totalPrice.toLocaleString('ko-kr')}원 결제`;
    },
  },
  methods: {
    setIconColor(title, flag) {
      if (flag === 'shipping') {
        return this.shipping === title ? 'var(--emphasis)' : 'var(--black)';
      }
      return this.pay === title ? 'var(--emphasis)' : 'var(--black)';
    },
    selectMethod(title, flag) {
      if (flag === 'shipping') {
        this.shipping = title;
      } else {
        this.pay = title;
      }
    },
  },
};
</script>

<style scoped>
.customer-info-article {
  padding-bottom: 10px;
}

.customer-input {
  width: 100%;
  height: 30px;
  border-radius: 10px;
  border: 2px solid var(--black);
  outline: none;
  padding: 0 10px;
}

.summary-wrapper {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
}

.summary-name {
  width: 50%;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.summary-quantity {
  width: 50px;
  text-align: center;
}

.summary-price {
  width: 100px;
  text-align: right;
}

.method-wrapper {
  width: 48%;
  height: 100px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
