<template>
  <div id="app">
      <Login v-if="showLogin" @toHome="handleToHome"/>
      <Home v-else @toLogin="handleToLogin"/>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    Login,
    Home
  },
  data() {
    return {
      showLogin: true,
      authorization: false
    }
  },
  methods: {
    handleToHome() {
      this.showLogin = false
    },
    handleToLogin() {
      this.showLogin = true
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
