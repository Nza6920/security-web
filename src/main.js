import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './axios';
import cookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(ElementUI);

// 挂载到$message上
Vue.prototype.$message = ElementUI.Message

Vue.prototype.$axios = axios

Vue.prototype.$cookies = cookies;

new Vue({
  render: h => h(App),
}).$mount('#app')
