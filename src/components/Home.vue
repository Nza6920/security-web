<template>
  <div>
    <h1>This is Home page</h1>
    <el-button type="primary" @click="getOrderInfo">获取订单信息</el-button>
    <div v-if="order">
      <p>order id: {{ order.id }}</p>
      <p>order product id: {{ order.productId }}</p>
    </div>
    <el-button type="primary" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
import * as orderApi from '../api/order-api.js'
import * as userApi from '../api/user-api.js'
import Vue from "vue";

export default {
  name: "Home",
  data() {
    return {
      order: null
    }
  },
  methods: {
    getOrderInfo() {
      const _this = this
      orderApi.getOrderInfo(1).then(data => {
        if (data.data) {
          _this.order = data.data
        }
      })
    },
    logout() {
      const _this = this
      userApi.logout().then(() => {
        Vue.prototype.$cookies.remove("access_token", "/", ".niu.com")
        Vue.prototype.$cookies.remove("refresh_token", "/", ".niu.com")
        _this.$emit('toLogin')
      })
    }
  }
}
</script>

<style scoped>

</style>
