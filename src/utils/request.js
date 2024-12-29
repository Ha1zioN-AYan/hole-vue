//定制请求的实例

// 消息提示
import { ElMessage } from 'element-plus'

//导入axios  npm install axios
import axios from 'axios';
//定义一个变量,记录公共的前缀  ,  baseURL
// const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({ baseURL })

// 导入路由
import router from '@/router/index';


import { userTokenStore } from '@/stores/token';
// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 请求前的回调
        // 添加token
        const tokenStore = userTokenStore()
        // 判断有没有token
        // console.log(tokenStore.token);
        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token
        }
        return config
    },
    (err) => {
        // 请求错误的回调
        Promise.reject(err)
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    result => {
        // console.log(result.data.message)
        // 判断业务状态码
        if (result.data.code === 0) {
            return result.data;
        }
        // alert(result.data.message ? result.data.message : '服务异常');
        ElMessage.error(result.data.message ? result.data.message : '服务异常')
        return Promise.reject(result.data);//异步的状态转化成失败的状态
    },
    err => {
        // console.log('err:服务异常')
        // 判断响应状态码，如果为401，则证明未登录，提示请登录，并跳转到登录界面
        if (err.response.status === 401) {
            ElMessage.error('请先登录')
            router.push('/login')
        } else {
            ElMessage.error('服务异常')

        }
        return Promise.reject(result.data);//异步的状态转化成失败的状态
    }

)

export default instance;