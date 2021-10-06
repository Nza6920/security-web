// 1. 引入
import axios from "axios";
import Vue from "vue";
import * as constants from '../common/constant'

// 3. 配置信息
let config = {
    // 每次请求的协议、IP地址。  设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
    baseURL: "http://admin.niu.com:17016",
    // 请求超时时间
    timeout: 60000
}

// 2. 创建实例
const instance = axios.create(config)

// 1. 请求拦截
instance.interceptors.request.use(
    // 请求之前做些什么
    config => {
        let token = localStorage.getItem(constants.TOKEN)
        if (token) {
            // 符合判断条件，做出响应处理，例如携带token
            config.headers["Authorization"] = `Bearer ${JSON.parse(token).access_token}`
        }
        // 最后返回 config 代表继续发送请求
        return config
    },
    // 处理错误
    error => Promise.reject(error)
)

// 2. 响应拦截
instance.interceptors.response.use(
    // 对于成功响应的处理
    res => {
        console.log("success response: ", res)
        return res;
    },
    // 处理错误响应
    err => {
        console.log("error response: ", err)
        Vue.prototype.$message.error('服务器异常, 请联系管理员.')
        return Promise.reject(err);
    }
);

// 4. 导出
export default instance
