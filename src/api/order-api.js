import { orderApi } from "@/common/api"
import Vue from "vue"

export function getOrderInfo(orderId) {
    return Vue.prototype.$axios.get(`${orderApi}/orders/${orderId}`)
}
