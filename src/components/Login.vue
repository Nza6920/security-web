<template>
  <div class="wrapper">
    <div class="login-form-wrapper">
      <el-form :model="loginForm" status-icon ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as userApi from '../api/user-api.js'
import * as constants from '../common/constant'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: '',
        password: '',
      },
    }
  },
  created() {
    localStorage.removeItem(constants.TOKEN)
  },
  methods: {
    submitForm() {
      userApi.login({
        username: this.loginForm.account,
        password: this.loginForm.password
      }).then(response => {
        console.log('data: ', response.data)
        // 设置 token
        localStorage.setItem(constants.TOKEN, JSON.stringify(response.data))
        this.$emit('toHome')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .login-form-wrapper {
    width: 500px;
    text-align: center;
    margin: 0 auto;
  }
}
</style>
