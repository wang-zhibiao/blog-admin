// 引入模块
import axios from "axios"
// import router from '../router'
import {
    debounce
} from "@/utils/common.js";
// var JSONBig = require('json-bigint')({ "storeAsString": true })
import {
    Message
} from 'element-ui'
import store from '@/store'
import cache from '@/utils/cache'
// 是否允许跨域
axios.defaults.withCredentials = true;
// axios初始化：延迟时间，主路由地址
let instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // transformResponse: [function (data) {
    //     /* eslint-disable no-undef */
    //     return JSONBig.parse(data)
    // }],
    timeout: 5000,
});



// 设置拦截器
instance.interceptors.request.use(
    config => {
        if (store.getters.token) {
            //后期自己定义
            config.headers['X-Token'] = cache.getToken()
        }
        return config
    },
    error => {
        //请求错误时做些事
        Promise.reject(error)
    });
//响应拦截器
instance.interceptors.response.use(
    response => {
        //请求结束成功
        if (response.status === 200 || response.status === 304 || response.status === 201) {
            return response.data || response
        }
        return response;
    },
    error => {
        if (error && error.stack.indexOf('timeout') > -1) {
            debounce(() => {
                Message.error("请求超时")
            }, 100)
            return Promise.reject(error.response && error.response.data)
        }
        if (error && error.stack.indexOf('Network Error') > -1) {
            debounce(() => {
                Message.error("请求数据失败")
            }, 100)
            return Promise.reject(error.response && error.response.data)
        }
        //请求错误时做些事
        if (error && error.response) {
            if (error.response.status === 400 || String(error).indexOf('code 400') !== -1) {
                debounce(() => {
                    Message.error(error.response.data.message)
                }, 300)
                return Promise.reject(error.response.data)
            }
            else if (error.response.status === 401 || String(error).indexOf('code 401') !== -1) {
                debounce(() => {
                    Message.error(error.response.data.message)
                    window.location.href = process.env.VUE_APP_BASE_URL
                }, 300)
                // console.dir(error.response.data.message);
                return Promise.reject(error)
                // 函数进入then后面的第二个err函数，如果没有就进入catch函数, 表单提交就可以根据这个重置参数以及重置按钮状态，防止按钮卡滞
                // return Promise.reject(error)
            }
            else if (error.response.status === 422 || String(error).indexOf('code 422') !== -1) {
                debounce(() => {
                    Message.error(error.response.data.message)
                }, 300)
                // console.dir(error.response.data.message);
                return Promise.reject(error.response)
                // 函数进入then后面的第二个err函数，如果没有就进入catch函数, 表单提交就可以根据这个重置参数以及重置按钮状态，防止按钮卡滞
                // return Promise.reject(error)
            }
            else if (error.response.status === 404 || String(error).indexOf('code 4') !== -1) {
                debounce(() => {
                    Message.error(error.response.data.message)
                }, 300)
                // console.dir(error.response.data.message);
                return Promise.reject(error.response)
                // 函数进入then后面的第二个err函数，如果没有就进入catch函数, 表单提交就可以根据这个重置参数以及重置按钮状态，防止按钮卡滞
                // return Promise.reject(error)
            }
            if (String(error).indexOf('code 500') !== -1) {
                if (error.response.data.message) {
                    debounce(() => {
                        Message.error(error.response.data.message)
                    }, 300)
                } else {
                    Message.error('服务器出现问题，请刷新重试')
                }
                return Promise.reject(error)
            }
            if (String(error).indexOf('code 504') !== -1) {
                if (error.response.data.message) {
                    debounce(() => {
                        Message.error(error.response.data.message)
                    }, 300)
                } else {
                    Message.error('服务器出现问题,请求超时')
                }
                return Promise.reject(error)
            }
            // 终止Promise调用链
            return Promise.reject(error.response.data.message)
            // return new Promise(() => {})
        }
    });

// 是否销毁拦截器
// 1.给拦截器起个名称 var myInterceptors = instance.interceptors.requesst.use();
// 2.instance.interceptors.request.eject(myInterceptor);


//模块化导出
export default {
    get(url, params = {}) {
        if (!url) return;
        return instance({
            method: 'get',
            url: url,
            params,
            timeout: 60000
        })
    },
    post(url, data = {}) {
        if (!url) return;
        return instance({
            method: 'post',
            url: url,
            data,
            timeout: 3000000
        })
    },
    postFile(url, data) {
        if (!url) return;
        return instance({
            method: 'post',
            url: url,
            data
        })
    },
    put(url, data) {
        if (!url) return;
        return instance({
            method: 'put',
            url: url,
            data
        })
    },
    patch(url, data) {
        if (!url) return;
        return instance({
            method: 'patch',
            url: url,
            data
        })
    },
    delete(url, data) {
        if (!url) return;
        return instance({
            method: 'delete',
            url: url,
            data,
            timeout: 30000
        })
    },
    query(url, params = {}, options = {
        timeout: 120000
    }) {
        if (!url) return;
        return instance({
            method: 'get',
            url: url,
            params,
            ...options
        })
    },
}