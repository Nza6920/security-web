// 1. 引入
import axios from "axios";
import Vue from "vue";
import * as constants from '../common/constant'
import * as userApi from '../api/user-api'

// 2. 配置信息
let config = {
    // 每次请求的协议、IP地址。设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
    baseURL: "http://admin.niu.com:17016",
    // 请求超时时间
    timeout: 60000
}

// 3. 创建实例
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
        // 如果 token 失效, 刷新 token
        if (err.response.status === 401) {
            let refreshToken = Vue.prototype.$cookies.get("refresh_token");
            return userApi.refreshToken({refreshToken: refreshToken}).then((res) => {
                // 重新设置 token
                localStorage.setItem(constants.TOKEN, JSON.stringify(res.data))
                err.config.headers["Authorization"] = `Bearer ${res.data.access_token}`
                return instance.request(err.config);
            }).catch(err2 => {
                // refresh token 过期
                Vue.prototype.$cookies.remove("access_token", "/", ".niu.com")
                Vue.prototype.$cookies.remove("refresh_token", "/", ".niu.com")
                localStorage.removeItem(constants.TOKEN)
                // 失效认证服务器的 session
                window.location.href = 'http://auth.niu.com:7046/logout?redirect_uri=http://admin.niu.com:17016'
                return Promise.reject(err2)
            });
        } else {
            Vue.prototype.$message.error('服务器异常, 请联系管理员.')
        }
        return Promise.reject(err);
    }
);

// 3. 导出
export default instance
