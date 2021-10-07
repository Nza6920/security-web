import {loginBff} from "@/common/api"
import Vue from "vue";

export function login(obj) {
    return Vue.prototype.$axios.post(`${loginBff}/users/login`, obj)
}

export function logout() {
    return Vue.prototype.$axios.post(`${loginBff}/users/logout`)
}

export function me() {
    return Vue.prototype.$axios.get(`${loginBff}/users/me`)
}

export function refreshToken(obj) {
    return Vue.prototype.$axios.post(`${loginBff}/users/refreshToken`, obj)
}

