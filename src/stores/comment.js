// 定义store
import { defineStore } from 'pinia'
import { ref } from 'vue'

/*
    第一个参数：名字，具有唯一性
    第二个参数：函数，函数的内部可以定义状态的所有内容
    返回值：函数
*/
export const commentMapStore = defineStore('commentMap', () => {
    // 定义状态的内容

    // 1.响应式变量
    const data = new Map()

    // 2.定义一个函数，修改Map的值
    const setMap = (key, value) => {
        data.set(key, value)
    }

    // 3.定义一个函数，移除Map的值
    const removeMap = () => {
        data.clear = ''
    }

    return {
        data, setMap, removeMap
    }
}, {
    // 开启持久化存储
    persist: true
});