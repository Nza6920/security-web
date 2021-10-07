<template>
  <div id="app">
    <Home v-if="authorization" @toLogin="handleLogout"/>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import * as constants from "@/common/constant";
import * as userApi from "@/api/user-api";
import Vue from "vue";

export default {
  name: 'App',
  components: {
    Home
  },
  mounted() {
    this.me().then(() => {
      if (!this.authorization) {
        window.location.href = 'http://auth.niu.com:7046/oauth/authorize?' +
            'client_id=adminService&' +
            'redirect_uri=http://admin.niu.com:17016/login-bff/users/callback&' +
            'response_type=code&' +
            'state=abc'
      }
    })
  },
  data() {
    return {
      authorization: false
    }
  },
  methods: {
    me() {
      console.log(Vue.prototype.$cookies.keys());
      localStorage.removeItem(constants.TOKEN);
      return userApi.me().then((res) => {
        if (res.data) {
          this.authorization = true
          localStorage.setItem(constants.TOKEN, JSON.stringify(res.data))
        }
      })
    },
    handleLogout() {
      this.authorization = false
      // 失效认证服务器的 session
      window.location.href = 'http://auth.niu.com:7046/logout?redirect_uri=http://admin.niu.com:17016'
    },
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
