import {loginBff} from "@/common/api"
import Vue from "vue";

export function login(obj) {
    return Vue.prototype.$axios.post(`${loginBff}/users/login`, obj)
}

export function logout() {
    return Vue.prototype.$axios.post(`${loginBff}/users/logout`)
}

