import axios from 'axios'
import router from '../router'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = '' // 这是调用数据接口

// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
    config => {
      config.data = JSON.stringify(config.data)
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded' // 设置跨域头部
      }
      // if (token) {
      //   config.params = {'token': token} // 后台接收的参数，后面我们将说明后台如何接收
      // }
      return config
    },
    err => {
      return Promise.reject(err)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
      if (response.data.code === 401) {
        console.log('您还没有登录，或登录状态已失效，请重新登录。')
        router.push({
          path: '/login'
        })
      } else if (response.data.code === 500) {
        console.log(response.data.msg)
      }
      return response
    },
    error => {
      console.log('啊哦，好像出现了一点意外，请稍后重试或联系客服。')
      return Promise.reject(error) // .response.data
    })

export default axios

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
    .then(response => {
      resolve(response.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
  })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
