<template>
  <div id="app">
    <!--    <Login v-if="showLogin" @toHome="handleToHome"/>-->
    <!--    <Home v-else @toLogin="handleToLogin"/>-->
    <Home @toLogin="handleLogout"/>
  </div>
</template>

<script>
// import Login from './components/Login.vue'
import Home from './components/Home.vue'
import * as constants from "@/common/constant";
import * as userApi from "@/api/user-api";

export default {
  name: 'App',
  components: {
    // Login,
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
      showLogin: true,
      authorization: false
    }
  },
  methods: {
    me() {
      localStorage.removeItem(constants.TOKEN);
      return userApi.me().then((res) => {
        if (res.data) {
          this.authorization = true
          localStorage.setItem(constants.TOKEN, JSON.stringify(res.data))
        }
      })
    },
    handleToHome() {
      this.showLogin = false
    },
    handleToLogin() {
      this.showLogin = true
    },
    handleLogout() {
      console.log('logout')
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
