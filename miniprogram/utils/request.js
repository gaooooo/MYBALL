import {getToken, updateToken, removeToken} from './util-token'
import config from './config.js';
const host_url = config.getHostUrl;
const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

let baseUrl = ''
const interceptors = []


let isRefreshing = false // 是否正在请求refresh_token
// 封装一个promise,下面再需要new一个promise时，直接new Deffered()就可以
class Deffered {
  constructor () {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}
// let token = '' // token值（这里token的值是从sessionStorage里面取的）
let subscribers = [] // 拦截的请求数组
// 将请求放到subscribers数组中
function addSubscriber (callback) {
    subscribers.push(callback)
}
// 1.拦截其他请求，将状态置为pending，若callback调用，就返回一个resolve
// 2.在callback调用时，返回一个resolve，resolve为拦截请求的config
function addPending (config) {
    const defer = new Deffered()
    console.log(999, defer, defer.resolve)
    addSubscriber(() => {
      defer.resolve(request.request(config))
    })
    return defer.promise
  }



class Request {
    /**
     * response interceptor
     */
    intercept(res, resolve, reject, option) {
        return interceptors
            .filter((f) => typeof f === 'function')
            .every((f) => f(res, resolve, reject, option))
    }

    /**
     * request
     */
    request(option) {
      const header = {
        // 'content-type': 'application/x-www-form-urlencoded'
        'content-type': 'application/json'
        }// 当有接口返回401时，拦截正在请求的接口
        // 将token添加到header里面
        let token = getToken()
        console.log(123123123, token)
        if (token) {
            header.Authorization = token;
        }
      const { url, method, data = {} } = option
      option.header = header;
      option.url = baseUrl + url;
      option.method = method || METHOD.GET;
      
      if (isRefreshing) {
        return addPending(option);
      }
     
        return new Promise((resolve, reject) => {
            try {
                wx.request({
                    ...option,
                    success: (res) => this.intercept(res, resolve, reject, option),
                    fail: (err) => {
                        console.log('error', err)
                        if (
                            err &&
                            err.errMsg &&
                            err.errMsg.indexOf('request:fail') !== -1
                        ) {
                            console.error('wx request error: ', err)
                        } else {
                            wx.showToast({
                                title: JSON.stringify(err),
                                icon: 'none',
                                duration: 10000
                            })
                        }
                    }
                })
            } catch (err) {
              console.log('response err:', err)
              wx.showToast({ title: err.message, icon: 'none' })
            }
        })
    }

    get(url, data) {
        return this.request({ url, method: METHOD.GET, data })
    }

    post(url, data) {
        return this.request({ url, method: METHOD.POST, data })
    }

    put(url, data) {
        return this.request({ url, method: METHOD.PUT, data })
    }

    delete(url, data) {
        return this.request({ url, method: METHOD.DELETE, data })
    }

    all(tasks) {
        return Promise.all(tasks)
    }
}

/**
 * 设置base URL
 */
function setBaseUrl(url) {
    baseUrl = url
}

/**
 * 默认response拦截器
 */
function addDefaultInterceptor() {
    const vm = this;
    interceptors.push((res, resolve, reject, option) => {
        console.log(77777, res)
        const status = res.statusCode
        if (status === 401) {
            // 1.当接口返回401时，需要请求新的接口获取access_token
            // 2.若同时触发多个请求，当有一个接口返回401时，就需要去请求新的token，此时，其他接口需要被拦截，并存放起来
            const userId = vm.getUserInfo().id;
            console.log('userId:', userId)
            if (!isRefreshing) {
                isRefreshing = true
                // 请求新的access_token接口
                wx.request({
                url: host_url + '/refresh-token',
                data: {id: userId},
                method: METHOD.GET,
                success: (res) => {
                    updateToken(res.data.data.access_token)
                    // 将放在subscribers里面的请求释放，重新发送请求
                    isRefreshing = false
                    // callback调用addSubscriber方法，
                    subscribers.forEach((callback) => {
                        callback()
                    })
                    subscribers = [];
                    // return request.request(option)
                },
                fail: (err) => {
                    removeToken();
                    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>err_', err)
                    return Promise.reject(err)
                }
             });

            }
            // 将其他的请求拦截
            return addPending(option);
          }
        if (status !== 200) {
            return reject(new Error(`internet error: ${status}`))
        }
        const body = res.data
        if (body.code !== 0) {
            return reject({
                message: body.error,
                body
            })
        }
        const token = body.data.token
        if (token && `Bearer ${token}` !== getToken()) {
            updateToken(token)
            // addRequestInterceptors('Authorization', response.headers.authorization)
          }
        return resolve(body.data)
    })
}

const request = new Request()
export { setBaseUrl, addDefaultInterceptor, request }