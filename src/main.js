import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './axios'

Vue.config.productionTip = false

Vue.use(ElementUI);

// 挂载到$message上
Vue.prototype.$message = ElementUI.Message

Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
