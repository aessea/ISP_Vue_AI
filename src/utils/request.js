import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: '/sqyapi', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'border ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 如果是文件流直接返回
    if (res instanceof Blob) {
      return response
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || '请求出错',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    console.log('status:', error.status)
    let error_message = '请求出错'
    // 网络超时异常处理
    if (error.message.includes('timeout')) {
      error_message = '请求超时，请稍后重试'
    } else if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      error_message = '连接异常，请尝试重新连接'
    } else if (error.message.includes('code 500')) {
      error_message = '服务器内部错误，无法响应 500'
    } else if (error.message.includes('code 502')) {
      error_message = '502 Bad Gateway'
    } else if (error.message.includes('code 404')) {
      error_message = '请求的资源不存在 404'
    } else if (error.message.includes('code 403')) {
      error_message = '服务器拒绝执行请求，请联系技术人员 403'
    } else if (error.message.includes('code 400')) {
      error_message = '客户端发送了一个不正确的请求，服务器无法理解或处理 400'
    } else {
      error_message = '出现未知错误'
    }
    Message({
      message: error_message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(error_message))
  }
)

export default service
